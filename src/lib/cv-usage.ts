/**
 * CV Translator usage tracking backed by GitHub Gist.
 * Tracks how many CVs each user has translated (free vs paid).
 */

const GIST_ID = process.env.GIST_ID ?? "";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? "";
const FILE_NAME = "cv-usage.json";

export interface CVUsageRecord {
  email: string;
  translations: Array<{
    id: string;
    createdAt: string;
    paid: boolean; // false = free tier, true = paid/subscription
  }>;
  // Subscription info (filled when connected to Stripe)
  subscription?: {
    stripeCustomerId?: string;
    status: "active" | "cancelled" | "expired" | "none";
    plan?: "monthly" | "yearly";
    expiresAt?: string;
  };
}

interface CVUsageData {
  users: CVUsageRecord[];
  stats: {
    totalTranslations: number;
    freeTranslations: number;
    paidTranslations: number;
    lastUpdated: string;
  };
}

async function getUsageData(): Promise<CVUsageData | null> {
  if (!GITHUB_TOKEN || !GIST_ID) {
    console.error("[cv-usage] GITHUB_TOKEN or GIST_ID not set");
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
      console.error("[cv-usage] Failed to read gist:", res.status);
      return null;
    }

    const gist = await res.json();
    const content = gist.files?.[FILE_NAME]?.content;

    if (!content) {
      // File doesn't exist yet, return empty structure
      return {
        users: [],
        stats: {
          totalTranslations: 0,
          freeTranslations: 0,
          paidTranslations: 0,
          lastUpdated: new Date().toISOString(),
        },
      };
    }

    return JSON.parse(content) as CVUsageData;
  } catch (e) {
    console.error("[cv-usage] Gist read error:", e);
    return null;
  }
}

async function saveUsageData(data: CVUsageData): Promise<boolean> {
  if (!GITHUB_TOKEN || !GIST_ID) return false;

  try {
    data.stats.lastUpdated = new Date().toISOString();

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

    if (!res.ok) {
      console.error("[cv-usage] Failed to save gist:", res.status);
      return false;
    }
    return true;
  } catch (e) {
    console.error("[cv-usage] Gist write error:", e);
    return false;
  }
}

/**
 * Check if user can translate (has free credit or active subscription)
 */
export async function canUserTranslate(email: string): Promise<{
  allowed: boolean;
  reason: "free" | "subscription" | "limit_reached";
  freeUsed: number;
  hasSubscription: boolean;
}> {
  const data = await getUsageData();

  if (!data) {
    // If we can't read data, allow (fail open for better UX)
    return { allowed: true, reason: "free", freeUsed: 0, hasSubscription: false };
  }

  const user = data.users.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    // New user, first translation is free
    return { allowed: true, reason: "free", freeUsed: 0, hasSubscription: false };
  }

  // Check subscription
  const hasActiveSubscription =
    user.subscription?.status === "active" &&
    (!user.subscription.expiresAt || new Date(user.subscription.expiresAt) > new Date());

  if (hasActiveSubscription) {
    return {
      allowed: true,
      reason: "subscription",
      freeUsed: user.translations.filter((t) => !t.paid).length,
      hasSubscription: true,
    };
  }

  // Check free tier (1 free translation per email)
  const freeTranslations = user.translations.filter((t) => !t.paid);

  if (freeTranslations.length === 0) {
    return { allowed: true, reason: "free", freeUsed: 0, hasSubscription: false };
  }

  // Already used free translation
  return {
    allowed: false,
    reason: "limit_reached",
    freeUsed: freeTranslations.length,
    hasSubscription: false,
  };
}

/**
 * Record a CV translation
 */
export async function recordTranslation(
  email: string,
  paid: boolean = false
): Promise<{ ok: boolean; translationId?: string }> {
  const data = await getUsageData();

  if (!data) {
    return { ok: false };
  }

  const translationId = `cv_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

  let user = data.users.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    user = {
      email: email.toLowerCase(),
      translations: [],
    };
    data.users.push(user);
  }

  user.translations.push({
    id: translationId,
    createdAt: new Date().toISOString(),
    paid,
  });

  // Update stats
  data.stats.totalTranslations++;
  if (paid) {
    data.stats.paidTranslations++;
  } else {
    data.stats.freeTranslations++;
  }

  const saved = await saveUsageData(data);

  if (saved) {
    console.log(`[cv-usage] Recorded translation ${translationId} for ${email} (paid: ${paid})`);
  }

  return { ok: saved, translationId: saved ? translationId : undefined };
}

/**
 * Activate subscription for user (called from Stripe webhook)
 */
export async function activateSubscription(
  email: string,
  stripeCustomerId: string,
  plan: "monthly" | "yearly",
  expiresAt: string
): Promise<boolean> {
  const data = await getUsageData();

  if (!data) {
    return false;
  }

  let user = data.users.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    user = {
      email: email.toLowerCase(),
      translations: [],
    };
    data.users.push(user);
  }

  user.subscription = {
    stripeCustomerId,
    status: "active",
    plan,
    expiresAt,
  };

  return saveUsageData(data);
}

/**
 * Cancel subscription for user
 */
export async function cancelSubscription(email: string): Promise<boolean> {
  const data = await getUsageData();

  if (!data) {
    return false;
  }

  const user = data.users.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (user?.subscription) {
    user.subscription.status = "cancelled";
  }

  return saveUsageData(data);
}

/**
 * Get usage stats (for dashboard)
 */
export async function getUsageStats(): Promise<CVUsageData["stats"] | null> {
  const data = await getUsageData();
  return data?.stats ?? null;
}
