import { NextRequest, NextResponse } from "next/server";
import { jsPDF } from "jspdf";
import type { CVData } from "../route";

export const runtime = "nodejs";

// Color palette
const COLORS = {
  primary: "#1e40af",
  secondary: "#64748b",
  text: "#333333",
  lightText: "#666666",
  border: "#e2e8f0",
  accent: "#2563eb",
};

function generateSwissCV(cv: CVData): jsPDF {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;
  let y = margin;

  // Helper functions
  const addText = (
    text: string,
    x: number,
    yPos: number,
    options: {
      fontSize?: number;
      color?: string;
      fontStyle?: "normal" | "bold" | "italic";
      maxWidth?: number;
    } = {}
  ) => {
    const { fontSize = 10, color = COLORS.text, fontStyle = "normal", maxWidth } = options;
    doc.setFontSize(fontSize);
    doc.setTextColor(color);
    doc.setFont("helvetica", fontStyle);

    if (maxWidth) {
      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, x, yPos);
      return lines.length * fontSize * 0.4;
    } else {
      doc.text(text, x, yPos);
      return fontSize * 0.4;
    }
  };

  const addLine = (yPos: number, color: string = COLORS.border) => {
    doc.setDrawColor(color);
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, pageWidth - margin, yPos);
  };

  const checkNewPage = (needed: number) => {
    if (y + needed > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage();
      y = margin;
      return true;
    }
    return false;
  };

  // === HEADER ===
  addText(cv.personalInfo.fullName, margin, y, {
    fontSize: 22,
    color: COLORS.primary,
    fontStyle: "bold",
  });
  y += 10;

  // Personal info line
  const personalItems: string[] = [];
  if (cv.personalInfo.email) personalItems.push(cv.personalInfo.email);
  if (cv.personalInfo.phone) personalItems.push(cv.personalInfo.phone);
  if (cv.personalInfo.address) personalItems.push(cv.personalInfo.address);

  if (personalItems.length > 0) {
    addText(personalItems.join("  |  "), margin, y, {
      fontSize: 9,
      color: COLORS.secondary,
    });
    y += 5;
  }

  // Second personal info line (Swiss-specific)
  const personalItems2: string[] = [];
  if (cv.personalInfo.dateOfBirth) personalItems2.push(`Geburtsdatum: ${cv.personalInfo.dateOfBirth}`);
  if (cv.personalInfo.nationality) personalItems2.push(`Nationalität: ${cv.personalInfo.nationality}`);
  if (cv.personalInfo.maritalStatus) personalItems2.push(`Familienstand: ${cv.personalInfo.maritalStatus}`);

  if (personalItems2.length > 0) {
    addText(personalItems2.join("  |  "), margin, y, {
      fontSize: 9,
      color: COLORS.secondary,
    });
    y += 5;
  }

  // Header line
  y += 2;
  doc.setDrawColor(COLORS.accent);
  doc.setLineWidth(1);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  // === PROFESSIONAL SUMMARY ===
  if (cv.professionalSummary) {
    addText("PROFIL", margin, y, {
      fontSize: 11,
      color: COLORS.primary,
      fontStyle: "bold",
    });
    y += 6;

    const summaryHeight = addText(cv.professionalSummary, margin, y, {
      fontSize: 10,
      color: COLORS.lightText,
      maxWidth: contentWidth,
    });
    y += summaryHeight + 8;
  }

  // === WORK EXPERIENCE ===
  if (cv.workExperience && cv.workExperience.length > 0) {
    checkNewPage(30);

    addText("BERUFSERFAHRUNG", margin, y, {
      fontSize: 11,
      color: COLORS.primary,
      fontStyle: "bold",
    });
    y += 2;
    addLine(y, COLORS.border);
    y += 6;

    for (const exp of cv.workExperience) {
      checkNewPage(25);

      // Position and dates
      addText(exp.position, margin, y, {
        fontSize: 10,
        fontStyle: "bold",
      });

      const dateText = `${exp.startDate} – ${exp.endDate}`;
      const dateWidth = doc.getTextWidth(dateText);
      addText(dateText, pageWidth - margin - dateWidth, y, {
        fontSize: 9,
        color: COLORS.secondary,
      });
      y += 5;

      // Company
      const companyText = exp.location ? `${exp.company}, ${exp.location}` : exp.company;
      addText(companyText, margin, y, {
        fontSize: 9,
        color: COLORS.secondary,
      });
      y += 5;

      // Responsibilities
      if (exp.responsibilities && exp.responsibilities.length > 0) {
        for (const resp of exp.responsibilities) {
          checkNewPage(8);
          addText("•", margin + 2, y, { fontSize: 9 });
          const respHeight = addText(resp, margin + 6, y, {
            fontSize: 9,
            maxWidth: contentWidth - 6,
          });
          y += Math.max(respHeight, 4) + 1;
        }
      }
      y += 4;
    }
    y += 4;
  }

  // === EDUCATION ===
  if (cv.education && cv.education.length > 0) {
    checkNewPage(25);

    addText("AUSBILDUNG", margin, y, {
      fontSize: 11,
      color: COLORS.primary,
      fontStyle: "bold",
    });
    y += 2;
    addLine(y, COLORS.border);
    y += 6;

    for (const edu of cv.education) {
      checkNewPage(15);

      addText(edu.degree, margin, y, {
        fontSize: 10,
        fontStyle: "bold",
      });

      const dateText = edu.startDate ? `${edu.startDate} – ${edu.endDate}` : edu.endDate;
      const dateWidth = doc.getTextWidth(dateText);
      addText(dateText, pageWidth - margin - dateWidth, y, {
        fontSize: 9,
        color: COLORS.secondary,
      });
      y += 5;

      const instText = edu.location ? `${edu.institution}, ${edu.location}` : edu.institution;
      addText(instText, margin, y, {
        fontSize: 9,
        color: COLORS.secondary,
      });
      y += 5;

      if (edu.details) {
        addText(edu.details, margin, y, {
          fontSize: 9,
          color: COLORS.lightText,
          maxWidth: contentWidth,
        });
        y += 4;
      }
      y += 3;
    }
    y += 4;
  }

  // === TWO COLUMN SECTION (Languages & Skills) ===
  const colWidth = (contentWidth - 10) / 2;

  // Languages
  if (cv.skills?.languages && cv.skills.languages.length > 0) {
    checkNewPage(20);
    const langStartY = y;

    addText("SPRACHEN", margin, y, {
      fontSize: 11,
      color: COLORS.primary,
      fontStyle: "bold",
    });
    y += 6;

    for (const lang of cv.skills.languages) {
      addText(`${lang.language}:`, margin, y, { fontSize: 9, fontStyle: "bold" });
      addText(lang.level, margin + 25, y, { fontSize: 9, color: COLORS.secondary });
      y += 5;
    }

    // Technical skills (right column)
    if (cv.skills?.technical && cv.skills.technical.length > 0) {
      let rightY = langStartY;
      const rightX = margin + colWidth + 10;

      addText("FACHKENNTNISSE", rightX, rightY, {
        fontSize: 11,
        color: COLORS.primary,
        fontStyle: "bold",
      });
      rightY += 6;

      const techText = cv.skills.technical.join("  •  ");
      addText(techText, rightX, rightY, {
        fontSize: 9,
        maxWidth: colWidth,
      });
    }
    y += 8;
  }

  // === CERTIFICATIONS ===
  if (cv.certifications && cv.certifications.length > 0) {
    checkNewPage(20);

    addText("ZERTIFIKATE", margin, y, {
      fontSize: 11,
      color: COLORS.primary,
      fontStyle: "bold",
    });
    y += 2;
    addLine(y, COLORS.border);
    y += 6;

    for (const cert of cv.certifications) {
      let certText = cert.name;
      if (cert.issuer) certText += ` – ${cert.issuer}`;
      if (cert.date) certText += ` (${cert.date})`;

      addText(certText, margin, y, { fontSize: 9 });
      y += 5;
    }
    y += 4;
  }

  // === INTERESTS ===
  if (cv.interests && cv.interests.length > 0) {
    checkNewPage(15);

    addText("INTERESSEN", margin, y, {
      fontSize: 11,
      color: COLORS.primary,
      fontStyle: "bold",
    });
    y += 2;
    addLine(y, COLORS.border);
    y += 6;

    addText(cv.interests.join("  •  "), margin, y, {
      fontSize: 9,
      maxWidth: contentWidth,
    });
    y += 8;
  }

  // === FOOTER ===
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(COLORS.secondary);
    doc.text(
      "Erstellt mit HispanosEnSuiza.ch",
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: "center" }
    );
  }

  return doc;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const cv = body.cv as CVData;

    if (!cv || !cv.personalInfo?.fullName) {
      return NextResponse.json(
        { error: "Invalid CV data" },
        { status: 400 }
      );
    }

    // Generate PDF
    const doc = generateSwissCV(cv);
    const pdfBuffer = Buffer.from(doc.output("arraybuffer"));

    // Return PDF
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Lebenslauf_${cv.personalInfo.fullName.replace(/\s+/g, "_")}.pdf"`,
      },
    });
  } catch (e) {
    console.error("PDF generation error:", e);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
