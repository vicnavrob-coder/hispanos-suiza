/**
 * Subscriber storage backed by a private GitHub Gist.
 * Zero dependencies beyond fetch (built-in).
 * Works on Vercel serverless — no filesystem writes.
 */

const GIST_ID = "7313e3a55b8f6b3c74d19427fb1f30a2";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? "";
const FILE_NAME = "subscribers.json";

export interface Subscriber {
  email: string;
  nombre: string;
  source: string;
  welcomeStep: number;      // 0 = not started, 1-5 = email sent
  welcomeStart: string;     // YYYY-MM-DD
  createdAt: string;        // ISO string
  blacklisted: boolean;
}

/** Read all subscribers from the Gist */
export async function getSubscribers(): Promise<Subscriber[]> {
  const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("[subscribers] Failed to read gist:", res.status);
    return [];
  }

  const gist = await res.json();
  const content = gist.files?.[FILE_NAME]?.content ?? "[]";

  try {
    return JSON.parse(content) as Subscriber[];
  } catch {
    console.error("[subscribers] Failed to parse gist content");
    return [];
  }
}

/** Write all subscribers back to the Gist */
export async function saveSubscribers(subs: Subscriber[]): Promise<boolean> {
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
          content: JSON.stringify(subs, null, 2),
        },
      },
    }),
  });

  if (!res.ok) {
    console.error("[subscribers] Failed to save gist:", res.status);
    return false;
  }
  return true;
}

/** Add a new subscriber (returns false if already exists) */
export async function addSubscriber(
  email: string,
  nombre: string,
  source = "footer-hispanosensuiza",
): Promise<{ ok: boolean; already: boolean }> {
  const subs = await getSubscribers();
  const existing = subs.find((s) => s.email === email);

  if (existing) {
    return { ok: true, already: true };
  }

  const today = new Date().toISOString().split("T")[0];

  subs.push({
    email,
    nombre,
    source,
    welcomeStep: 1,
    welcomeStart: today,
    createdAt: new Date().toISOString(),
    blacklisted: false,
  });

  const saved = await saveSubscribers(subs);
  return { ok: saved, already: false };
}

/** Update a subscriber's welcome step */
export async function updateWelcomeStep(
  email: string,
  step: number,
): Promise<boolean> {
  const subs = await getSubscribers();
  const sub = subs.find((s) => s.email === email);
  if (!sub) return false;

  sub.welcomeStep = step;
  return saveSubscribers(subs);
}
