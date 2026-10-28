import { NextRequest, NextResponse } from "next/server";
import { getPendingItems } from "@/lib/cv-queue";

/**
 * GET /api/cv-translator/admin/pending?key=...
 *
 * Returns all pending CVs for manual processing by Nexus
 * Requires CV_ADMIN_KEY environment variable to be set
 */
export async function GET(req: NextRequest) {
  const adminKey = process.env.CV_ADMIN_KEY;

  if (!adminKey) {
    console.error("[cv-admin] CV_ADMIN_KEY environment variable not set");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  const key = req.nextUrl.searchParams.get("key");

  if (!key || key !== adminKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const pending = await getPendingItems();

  // Decode base64 content for display (text extraction happens client-side)
  const items = pending.map((item) => ({
    id: item.id,
    email: item.email,
    fileName: item.fileName,
    fileType: item.fileType,
    createdAt: item.createdAt,
    // For security, only return first 500 chars of base64 preview
    filePreview: item.fileContent.substring(0, 500) + "...",
    // Full content (base64) for processing
    fileContent: item.fileContent,
  }));

  return NextResponse.json({
    count: items.length,
    items,
  });
}
