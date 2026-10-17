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
  welcomeStep: number;      // 0 = not started, 1 = welcome sent, 2-5 = follow-ups
  welcomeStart: string;     // YYYY-MM-DD
  createdAt: string;        // ISO string
  blacklisted: boolean;
  lastEmailAt?: string;     // ISO string — prevents duplicate sends
}

/** Read all subscribers from the Gist */
export async function getSubscribers(): Promise<Subscriber[]> {
  if (!GITHUB_TOKEN) {
    console.error("[subscribers] GITHUB_TOKEN not set");
    return [];
  }

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
  if (!GITHUB_TOKEN) return false;

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

/** Add a new subscriber. Returns already:true if exists. Does NOT add duplicates. */
export async function addSubscriber(
  email: string,
  nombre: string,
  source = "footer-hispanosensuiza",
): Promise<{ ok: boolean; already: boolean }> {
  const subs = await getSubscribers();

  // Guard: if read failed (empty token, network error), don't create a "new" sub
  // that would overwrite all existing data on save
  if (subs.length === 0 && !GITHUB_TOKEN) {
    return { ok: false, already: false };
  }

  const existing = subs.find((s) => s.email === email);
  if (existing) {
    return { ok: true, already: true };
  }

  const now = new Date();
  subs.push({
    email,
    nombre,
    source,
    welcomeStep: 1,
    welcomeStart: now.toISOString().split("T")[0],
    createdAt: now.toISOString(),
    blacklisted: false,
    lastEmailAt: now.toISOString(),
  });

  const saved = await saveSubscribers(subs);
  return { ok: saved, already: false };
}

/**
 * Atomically update a single subscriber's step AFTER sending an email.
 * Re-reads from Gist to avoid overwriting concurrent changes.
 * Returns false if save failed (email will NOT be re-sent thanks to time guard).
 */
export async function markEmailSent(
  email: string,
  step: number,
): Promise<boolean> {
  // Fresh read to avoid stale data
  const subs = await getSubscribers();
  const sub = subs.find((s) => s.email === email);
  if (!sub) return false;

  sub.welcomeStep = step;
  sub.lastEmailAt = new Date().toISOString();
  return saveSubscribers(subs);
}

/** Check if enough time has passed since last email to prevent duplicates */
export function canSendEmail(sub: Subscriber): boolean {
  if (!sub.lastEmailAt) return true;
  const hoursSinceLastEmail = (Date.now() - new Date(sub.lastEmailAt).getTime()) / 3_600_000;
  return hoursSinceLastEmail >= 20; // Minimum 20 hours between emails
}
