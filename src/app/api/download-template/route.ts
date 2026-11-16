import { NextResponse } from "next/server";

export async function GET() {
  // Redirect to static file instead of reading with fs
  // This is more compatible with Vercel's serverless functions
  return NextResponse.redirect(new URL("/downloads/template-emigrar-suiza.zip", process.env.NEXT_PUBLIC_BASE_URL || "https://hispanosensuiza.ch"));
}
