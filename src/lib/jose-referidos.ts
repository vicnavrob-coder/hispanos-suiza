/**
 * José referrals storage backed by a private GitHub Gist.
 * Tracks users who click to schedule a call with José (insurance advisor).
 * Works on Vercel serverless — no filesystem writes.
 */

// Use the same Gist as subscribers, different file
const GIST_ID = "7313e3a55b8f6b3c74d19427fb1f30a2";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? "";
const FILE_NAME = "jose-referidos.json";

export interface JoseReferido {
  id: string;
  // Usuario (si está logueado)
  userEmail?: string;
  userName?: string;
  // Metadata
  source: string;         // Página de origen: "asesoria", "seguros", "calculadora"
  createdAt: string;
  // IP anonimizada (últimos octetos removidos)
  ipHash?: string;
}

/**
 * Read all referrals from the Gist.
 */
export async function getReferidos(): Promise<JoseReferido[] | null> {
  if (!GITHUB_TOKEN || !GIST_ID) {
    console.error("[jose-referidos] GITHUB_TOKEN or GIST_ID not set");
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
      console.error("[jose-referidos] Failed to read gist:", res.status);
      return null;
    }

    const gist = await res.json();
    const content = gist.files?.[FILE_NAME]?.content ?? "[]";
    return JSON.parse(content) as JoseReferido[];
  } catch (e) {
    console.error("[jose-referidos] Gist read error:", e);
    return null;
  }
}

/** Write all referrals back to the Gist */
export async function saveReferidos(referidos: JoseReferido[]): Promise<boolean> {
  if (!GITHUB_TOKEN || !GIST_ID) return false;

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
            content: JSON.stringify(referidos, null, 2),
          },
        },
      }),
    });

    if (!res.ok) {
      console.error("[jose-referidos] Failed to save gist:", res.status);
      return false;
    }
    return true;
  } catch (e) {
    console.error("[jose-referidos] Gist write error:", e);
    return false;
  }
}

export interface AddReferidoInput {
  userEmail?: string;
  userName?: string;
  source: string;
  ipHash?: string;
}

/**
 * Add a new referral.
 * Returns { ok: false } if Gist read fails.
 */
export async function addJoseReferido(data: AddReferidoInput): Promise<{ ok: boolean; id?: string }> {
  const referidos = await getReferidos();

  // If read failed, refuse to write (would destroy existing data)
  if (referidos === null) {
    return { ok: false };
  }

  const newReferido: JoseReferido = {
    id: `ref_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
    userEmail: data.userEmail,
    userName: data.userName,
    source: data.source,
    ipHash: data.ipHash,
    createdAt: new Date().toISOString(),
  };

  referidos.push(newReferido);
  const saved = await saveReferidos(referidos);

  if (saved) {
    console.log(`[jose-referidos] New referral: ${newReferido.id} from ${data.source}${data.userEmail ? ` (${data.userEmail})` : ""}`);
  }

  return { ok: saved, id: saved ? newReferido.id : undefined };
}

/**
 * Get count of referrals by source
 */
export async function getReferidosStats(): Promise<{
  total: number;
  bySource: Record<string, number>;
  today: number;
  thisWeek: number;
  withEmail: number;
} | null> {
  const referidos = await getReferidos();
  if (referidos === null) return null;

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const bySource: Record<string, number> = {};
  let today = 0;
  let thisWeek = 0;
  let withEmail = 0;

  for (const r of referidos) {
    bySource[r.source] = (bySource[r.source] || 0) + 1;
    if (r.createdAt >= todayStart) today++;
    if (r.createdAt >= weekAgo) thisWeek++;
    if (r.userEmail) withEmail++;
  }

  return {
    total: referidos.length,
    bySource,
    today,
    thisWeek,
    withEmail,
  };
}
