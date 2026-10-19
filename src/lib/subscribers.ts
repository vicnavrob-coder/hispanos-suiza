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
  welcomeStep: number;      // 0 = signed up but no email sent yet, 1-5 = email N sent
  welcomeStart: string;     // YYYY-MM-DD
  createdAt: string;        // ISO string
  blacklisted: boolean;
  lastEmailAt?: string;     // ISO string — prevents duplicate sends
}

/**
 * Read all subscribers from the Gist.
 * Returns null on error (NOT empty array) so callers can distinguish
 * "no subscribers" from "read failed".
 */
export async function getSubscribers(): Promise<Subscriber[] | null> {
  if (!GITHUB_TOKEN) {
    console.error("[subscribers] GITHUB_TOKEN not set");
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
      console.error("[subscribers] Failed to read gist:", res.status);
      return null;
    }

    const gist = await res.json();
    const content = gist.files?.[FILE_NAME]?.content ?? "[]";
    return JSON.parse(content) as Subscriber[];
  } catch (e) {
    console.error("[subscribers] Gist read error:", e);
    return null;
  }
}

/** Write all subscribers back to the Gist */
export async function saveSubscribers(subs: Subscriber[]): Promise<boolean> {
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
  } catch (e) {
    console.error("[subscribers] Gist write error:", e);
    return false;
  }
}

/**
 * Add a new subscriber. Sets welcomeStep: 0 (email NOT yet sent).
 * The newsletter route sends the email and then calls markEmailSent.
 * Returns { ok: false } if Gist read fails — NEVER overwrites existing data.
 */
export async function addSubscriber(
  email: string,
  nombre: string,
  source = "footer-hispanosensuiza",
): Promise<{ ok: boolean; already: boolean }> {
  const subs = await getSubscribers();

  // If read failed, refuse to write (would destroy existing data)
  if (subs === null) {
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
    welcomeStep: 0,             // NOT yet sent — cron or route will send and update
    welcomeStart: now.toISOString().split("T")[0],
    createdAt: now.toISOString(),
    blacklisted: false,
  });

  const saved = await saveSubscribers(subs);
  return { ok: saved, already: false };
}

/**
 * Atomically update a single subscriber's step AFTER sending an email.
 * Re-reads from Gist to avoid overwriting concurrent changes.
 */
export async function markEmailSent(
  email: string,
  step: number,
): Promise<boolean> {
  const subs = await getSubscribers();
  if (subs === null) return false;

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
