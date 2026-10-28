import { NextRequest, NextResponse } from "next/server";
import { getQueueItem } from "@/lib/cv-queue";
import mammoth from "mammoth";

/**
 * GET /api/cv-translator/admin/extract?key=...&id=...
 *
 * Extract text content from a queued CV for manual translation
 * Requires CV_ADMIN_KEY environment variable to be set
 */
export async function GET(req: NextRequest) {
  const adminKey = process.env.CV_ADMIN_KEY;

  if (!adminKey) {
    console.error("[cv-admin] CV_ADMIN_KEY environment variable not set");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  const key = req.nextUrl.searchParams.get("key");
  const id = req.nextUrl.searchParams.get("id");

  if (!key || key !== adminKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  const item = await getQueueItem(id);

  if (!item) {
    return NextResponse.json({ error: "CV not found" }, { status: 404 });
  }

  if (!item.fileContent) {
    return NextResponse.json(
      { error: "File content not available" },
      { status: 400 }
    );
  }

  try {
    const buffer = Buffer.from(item.fileContent, "base64");
    let text = "";

    if (item.fileType === "pdf") {
      // Dynamic import for pdf-parse
      const { PDFParse } = await import("pdf-parse");
      const pdfParser = new PDFParse({ data: buffer });
      const result = await pdfParser.getText();
      text = result.text;
    } else if (item.fileType === "docx") {
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    }

    return NextResponse.json({
      id: item.id,
      email: item.email,
      fileName: item.fileName,
      fileType: item.fileType,
      createdAt: item.createdAt,
      text: text.trim(),
    });
  } catch (e) {
    console.error("Extract error:", e);
    return NextResponse.json(
      { error: "Failed to extract text from file" },
      { status: 500 }
    );
  }
}
