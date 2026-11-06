import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { Octokit } from "@octokit/rest";

// GitHub Gist para almacenar usuarios (simple, usando el mismo sistema que ya tienes)
const USERS_GIST_ID = process.env.USERS_GIST_ID || "";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";

const octokit = new Octokit({ auth: GITHUB_TOKEN });

interface User {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  isPremium: boolean;
  stripeCustomerId?: string;
  subscriptionId?: string;
  subscriptionStatus?: string;
  createdAt: string;
}

// Funciones helper para gestionar usuarios en Gist
async function getUsersFromGist(): Promise<User[]> {
  try {
    const { data } = await octokit.gists.get({ gist_id: USERS_GIST_ID });
    const content = data.files?.["users.json"]?.content;
    return content ? JSON.parse(content) : [];
  } catch (error) {
    console.error("Error reading users from Gist:", error);
    return [];
  }
}

async function saveUsersToGist(users: User[]): Promise<void> {
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
  }
}

async function getUserByEmail(email: string): Promise<User | null> {
  const users = await getUsersFromGist();
  return users.find((u) => u.email === email) || null;
}

async function createOrUpdateUser(
  email: string,
  name: string | null,
  image: string | null
): Promise<User> {
  const users = await getUsersFromGist();
  const existingUser = users.find((u) => u.email === email);

  if (existingUser) {
    // Actualizar nombre e imagen si cambiaron
    if (name) existingUser.name = name;
    if (image) existingUser.image = image;
    await saveUsersToGist(users);
    return existingUser;
  }

  // Crear nuevo usuario
  const newUser: User = {
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    email,
    name,
    image,
    isPremium: false,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  await saveUsersToGist(users);
  return newUser;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST || "smtp.gmail.com",
        port: 587,
        auth: {
          user: process.env.NEWSLETTER_GMAIL_USER || "",
          pass: process.env.NEWSLETTER_GMAIL_PASS || "",
        },
      },
      from: process.env.EMAIL_FROM || "noreply@hispanosensuiza.ch",
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify-request",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) return false;

      // Crear o actualizar usuario en Gist
      await createOrUpdateUser(user.email, user.name || null, user.image || null);
      return true;
    },
    async session({ session, token }) {
      if (session.user && token.email) {
        const user = await getUserByEmail(token.email);
        if (user) {
          session.user.id = user.id;
          session.user.isPremium = user.isPremium;
          session.user.email = user.email;
        }
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
