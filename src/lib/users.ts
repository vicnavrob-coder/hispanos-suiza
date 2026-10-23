/**
 * User tracking backed by GitHub Gist.
 * Tracks ALL registered users (not just email subscribers).
 * Stores registration source, provider, and timestamps.
 */

const GIST_ID = "7313e3a55b8f6b3c74d19427fb1f30a2";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? "";
const FILE_NAME = "users.json";

export interface User {
  email: string;
  nombre: string;
  pais?: string;
  provider: "google" | "email";
  source?: string;
  createdAt: string;
  lastLoginAt?: string;
  loginCount: number;
}

export interface UsersData {
  users: User[];
  stats: {
    totalUsers: number;
    googleUsers: number;
    emailUsers: number;
    lastUpdated: string;
  };
}

/**
 * Read all users from the Gist.
 */
export async function getUsers(): Promise<UsersData | null> {
  if (!GITHUB_TOKEN) {
    console.error("[users] GITHUB_TOKEN not set");
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
      console.error("[users] Failed to read gist:", res.status);
      return null;
    }

    const gist = await res.json();
    const content = gist.files?.[FILE_NAME]?.content;

    if (!content) {
      // File doesn't exist yet, return empty structure
      return {
        users: [],
        stats: {
          totalUsers: 0,
          googleUsers: 0,
          emailUsers: 0,
          lastUpdated: new Date().toISOString(),
        },
      };
    }

    return JSON.parse(content) as UsersData;
  } catch (e) {
    console.error("[users] Gist read error:", e);
    return null;
  }
}

/** Write users data to the Gist */
async function saveUsers(data: UsersData): Promise<boolean> {
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

    if (!res.ok) {
      console.error("[users] Failed to save gist:", res.status);
      return false;
    }
    return true;
  } catch (e) {
    console.error("[users] Gist write error:", e);
    return false;
  }
}

/**
 * Track a user registration or login.
 * If user exists, updates lastLoginAt and increments loginCount.
 * If new user, adds to the list.
 */
export async function trackUser(
  email: string,
  nombre: string,
  provider: "google" | "email",
  pais?: string,
  source?: string,
): Promise<{ ok: boolean; isNew: boolean }> {
  const data = await getUsers();

  if (data === null) {
    return { ok: false, isNew: false };
  }

  const normalizedEmail = email.toLowerCase().trim();
  const existing = data.users.find((u) => u.email === normalizedEmail);
  const now = new Date().toISOString();

  if (existing) {
    // Update existing user
    existing.lastLoginAt = now;
    existing.loginCount += 1;
    if (nombre && nombre !== existing.nombre) {
      existing.nombre = nombre;
    }

    // Update stats timestamp
    data.stats.lastUpdated = now;

    const saved = await saveUsers(data);
    return { ok: saved, isNew: false };
  }

  // New user
  const newUser: User = {
    email: normalizedEmail,
    nombre,
    pais,
    provider,
    source,
    createdAt: now,
    loginCount: 1,
  };

  data.users.push(newUser);

  // Update stats
  data.stats.totalUsers = data.users.length;
  data.stats.googleUsers = data.users.filter((u) => u.provider === "google").length;
  data.stats.emailUsers = data.users.filter((u) => u.provider === "email").length;
  data.stats.lastUpdated = now;

  const saved = await saveUsers(data);
  return { ok: saved, isNew: true };
}

/**
 * Get user statistics
 */
export async function getUserStats(): Promise<{
  total: number;
  google: number;
  email: number;
  today: number;
  thisWeek: number;
  thisMonth: number;
} | null> {
  const data = await getUsers();
  if (!data) return null;

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(todayStart);
  weekStart.setDate(weekStart.getDate() - 7);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const today = data.users.filter((u) => new Date(u.createdAt) >= todayStart).length;
  const thisWeek = data.users.filter((u) => new Date(u.createdAt) >= weekStart).length;
  const thisMonth = data.users.filter((u) => new Date(u.createdAt) >= monthStart).length;

  return {
    total: data.stats.totalUsers,
    google: data.stats.googleUsers,
    email: data.stats.emailUsers,
    today,
    thisWeek,
    thisMonth,
  };
}
