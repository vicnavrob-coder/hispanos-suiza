import { Octokit } from "@octokit/rest";

const USERS_GIST_ID = process.env.USERS_GIST_ID || "";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";

const octokit = new Octokit({ auth: GITHUB_TOKEN });

export interface PremiumUser {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  isPremium: boolean;
  stripeCustomerId?: string;
  subscriptionId?: string;
  subscriptionStatus?: "active" | "canceled" | "past_due" | "unpaid" | "trialing";
  createdAt: string;
  premiumSince?: string;
  premiumUntil?: string;
}

/**
 * Get all users from Gist
 */
async function getUsersFromGist(): Promise<PremiumUser[]> {
  try {
    const { data } = await octokit.gists.get({ gist_id: USERS_GIST_ID });
    const content = data.files?.["users.json"]?.content;
    return content ? JSON.parse(content) : [];
  } catch (error) {
    console.error("Error reading users from Gist:", error);
    return [];
  }
}

/**
 * Save users to Gist
 */
async function saveUsersToGist(users: PremiumUser[]): Promise<void> {
  try {
    await octokit.gists.update({
      gist_id: USERS_GIST_ID,
      files: {
        "users.json": {
          content: JSON.stringify(users, null, 2),
        },
      },
    });
  } catch (error) {
    console.error("Error saving users to Gist:", error);
    throw error;
  }
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string): Promise<PremiumUser | null> {
  const users = await getUsersFromGist();
  return users.find((u) => u.email === email) || null;
}

/**
 * Activate premium subscription for a user
 */
export async function activatePremium(
  email: string,
  stripeCustomerId: string,
  subscriptionId: string,
  subscriptionStatus: PremiumUser["subscriptionStatus"] = "active"
): Promise<void> {
  const users = await getUsersFromGist();
  const userIndex = users.findIndex((u) => u.email === email);

  if (userIndex >= 0) {
    users[userIndex].isPremium = true;
    users[userIndex].stripeCustomerId = stripeCustomerId;
    users[userIndex].subscriptionId = subscriptionId;
    users[userIndex].subscriptionStatus = subscriptionStatus;
    users[userIndex].premiumSince = users[userIndex].premiumSince || new Date().toISOString();
  } else {
    // User doesn't exist, create them
    users.push({
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email,
      name: null,
      image: null,
      isPremium: true,
      stripeCustomerId,
      subscriptionId,
      subscriptionStatus,
      createdAt: new Date().toISOString(),
      premiumSince: new Date().toISOString(),
    });
  }

  await saveUsersToGist(users);
  console.log(`Premium activated for ${email}`);
}

/**
 * Cancel premium subscription for a user
 */
export async function cancelPremium(email: string): Promise<void> {
  const users = await getUsersFromGist();
  const userIndex = users.findIndex((u) => u.email === email);

  if (userIndex >= 0) {
    users[userIndex].isPremium = false;
    users[userIndex].subscriptionStatus = "canceled";
    users[userIndex].premiumUntil = new Date().toISOString();
    await saveUsersToGist(users);
    console.log(`Premium cancelled for ${email}`);
  }
}

/**
 * Update subscription status for a user
 */
export async function updateSubscriptionStatus(
  email: string,
  status: PremiumUser["subscriptionStatus"]
): Promise<void> {
  const users = await getUsersFromGist();
  const userIndex = users.findIndex((u) => u.email === email);

  if (userIndex >= 0) {
    users[userIndex].subscriptionStatus = status;
    users[userIndex].isPremium = status === "active" || status === "trialing";
    await saveUsersToGist(users);
    console.log(`Subscription status updated for ${email}: ${status}`);
  }
}

/**
 * Check if user has premium access
 */
export async function hasPremiumAccess(email: string): Promise<boolean> {
  const user = await getUserByEmail(email);
  return user?.isPremium || false;
}
