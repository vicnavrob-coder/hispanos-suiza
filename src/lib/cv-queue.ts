/**
 * CV Translation Queue - stores CVs pending translation in Gist
 * CVs are processed by Nexus (Claude) manually, not via API
 */

const GIST_ID = process.env.GIST_ID ?? "7313e3a55b8f6b3c74d19427fb1f30a2";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? "";
const FILE_NAME = "cv-queue.json";

export type CVStatus = "pending" | "processing" | "completed" | "error";

export interface CVQueueItem {
  id: string;
  email: string;
  fileName: string;
  fileType: "pdf" | "docx";
  // Base64 encoded file content (for processing)
  fileContent: string;
  status: CVStatus;
  createdAt: string;
  processedAt?: string;
  // Result after translation (JSON structure)
  result?: {
    cv: import("@/app/api/cv-translator/route").CVData;
    translatedAt: string;
  };
  error?: string;
}

interface CVQueueData {
  items: CVQueueItem[];
  stats: {
    totalSubmitted: number;
    totalCompleted: number;
    lastProcessed?: string;
  };
}

async function getQueueData(): Promise<CVQueueData | null> {
  if (!GITHUB_TOKEN) {
    console.error("[cv-queue] GITHUB_TOKEN not set");
    return null;
  }

  try {
    const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("[cv-queue] Failed to read gist:", res.status);
      return null;
    }

    const gist = await res.json();
    const content = gist.files?.[FILE_NAME]?.content;

    if (!content) {
      return {
        items: [],
        stats: { totalSubmitted: 0, totalCompleted: 0 },
      };
    }

    return JSON.parse(content) as CVQueueData;
  } catch (e) {
    console.error("[cv-queue] Gist read error:", e);
    return null;
  }
}

async function saveQueueData(data: CVQueueData): Promise<boolean> {
  if (!GITHUB_TOKEN) return false;

  try {
    const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      method: "PATCH",
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3+json",
      },
      body: JSON.stringify({
        files: {
          [FILE_NAME]: {
            content: JSON.stringify(data, null, 2),
          },
        },
      }),
    });

    return res.ok;
  } catch (e) {
    console.error("[cv-queue] Gist write error:", e);
    return false;
  }
}

/**
 * Add a CV to the processing queue
 */
export async function addToQueue(
  email: string,
  fileName: string,
  fileType: "pdf" | "docx",
  fileContent: Buffer
): Promise<{ ok: boolean; id?: string }> {
  const data = await getQueueData();
  if (!data) {
    return { ok: false };
  }

  const id = `cv_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

  const item: CVQueueItem = {
    id,
    email,
    fileName,
    fileType,
    fileContent: fileContent.toString("base64"),
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  data.items.push(item);
  data.stats.totalSubmitted++;

  const saved = await saveQueueData(data);

  if (saved) {
    console.log(`[cv-queue] Added CV ${id} for ${email}`);
  }

  return { ok: saved, id: saved ? id : undefined };
}

/**
 * Get status of a CV translation
 */
export async function getQueueItem(id: string): Promise<CVQueueItem | null> {
  const data = await getQueueData();
  if (!data) return null;

  return data.items.find((item) => item.id === id) ?? null;
}

/**
 * Get all pending CVs (for processing by Nexus)
 */
export async function getPendingItems(): Promise<CVQueueItem[]> {
  const data = await getQueueData();
  if (!data) return [];

  return data.items.filter((item) => item.status === "pending");
}

/**
 * Mark a CV as completed with translation result
 */
export async function markCompleted(
  id: string,
  result: CVQueueItem["result"]
): Promise<boolean> {
  const data = await getQueueData();
  if (!data) return false;

  const item = data.items.find((i) => i.id === id);
  if (!item) return false;

  item.status = "completed";
  item.processedAt = new Date().toISOString();
  item.result = result;
  // Clear file content to save space after processing
  item.fileContent = "";

  data.stats.totalCompleted++;
  data.stats.lastProcessed = new Date().toISOString();

  return saveQueueData(data);
}

/**
 * Mark a CV as error
 */
export async function markError(id: string, error: string): Promise<boolean> {
  const data = await getQueueData();
  if (!data) return false;

  const item = data.items.find((i) => i.id === id);
  if (!item) return false;

  item.status = "error";
  item.processedAt = new Date().toISOString();
  item.error = error;
  item.fileContent = "";

  return saveQueueData(data);
}

/**
 * Clean up old completed/error items (keep last 50)
 */
export async function cleanupOldItems(): Promise<number> {
  const data = await getQueueData();
  if (!data) return 0;

  const completed = data.items.filter(
    (i) => i.status === "completed" || i.status === "error"
  );

  if (completed.length <= 50) return 0;

  // Sort by processedAt and keep only last 50
  completed.sort(
    (a, b) =>
      new Date(b.processedAt ?? "").getTime() -
      new Date(a.processedAt ?? "").getTime()
  );

  const toRemove = completed.slice(50).map((i) => i.id);
  data.items = data.items.filter((i) => !toRemove.includes(i.id));

  await saveQueueData(data);
  return toRemove.length;
}
