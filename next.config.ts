import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Public env vars — baked into client bundle at build time.
  // These are NOT secret (they appear in the HTML source anyway).
  env: {
    NEXT_PUBLIC_GOOGLE_CLIENT_ID:
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ??
      "1078110424464-2eo6o3cu0cs5gr8kon21vtravu627a7r.apps.googleusercontent.com",
    NEXT_PUBLIC_GA_ID:
      process.env.NEXT_PUBLIC_GA_ID ?? "G-J2HJB1FRKD",
  },
};

export default nextConfig;
