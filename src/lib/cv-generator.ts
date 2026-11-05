/**
 * Generador de CV en formato suizo profesional (PDF)
 * Diseño mejorado, foto incluida, sin emojis
 */

import jsPDF from 'jspdf';
import type { CVData } from '@/types/cv';

// Colores profesionales para CV suizo
const COLORS = {
  primary: '#1a365d',      // Azul oscuro profesional
  secondary: '#2d3748',    // Gris oscuro
  accent: '#3182ce',       // Azul profesional
  text: '#2d3748',
  lightGray: '#e2e8f0',
  mediumGray: '#718096',
  white: '#ffffff',
};

export function generateSwissCV(data: CVData): jsPDF {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;

  let yPosition = margin;

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // HEADER - Nombre y foto
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const photoSize = 35; // mm
  const photoMargin = 5;
  const hasPhoto = !!data.foto;
  const nameAreaWidth = hasPhoto ? contentWidth - photoSize - photoMargin : contentWidth;

  // Foto en la esquina superior derecha
  if (hasPhoto) {
    try {
      const photoX = pageWidth - margin - photoSize;
      const photoY = yPosition;
      doc.addImage(data.foto!, 'JPEG', photoX, photoY, photoSize, photoSize);
    } catch (error) {
      console.error('Error al añadir foto:', error);
    }
  }

  // Nombre y apellidos
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(COLORS.primary);
  doc.text(`${data.nombre} ${data.apellidos}`, margin, yPosition + 8);

  yPosition += 14;

  // Línea profesional debajo del nombre
  doc.setDrawColor(COLORS.accent);
  doc.setLineWidth(1.5);
  doc.line(margin, yPosition, margin + nameAreaWidth, yPosition);
  yPosition += 8;

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // DATOS DE CONTACTO (sección compacta, profesional)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(COLORS.text);

  const contactInfo: string[] = [
    `${data.direccion}, ${data.ciudad}`,
    data.telefono,
    data.email,
  ];

  if (data.linkedinUrl) {
    contactInfo.push(data.linkedinUrl);
  }

  const contactY = yPosition;
  const lineHeight = 4.5;

  contactInfo.forEach((info, idx) => {
    doc.text(info, margin, contactY + idx * lineHeight);
  });

  yPosition = contactY + contactInfo.length * lineHeight + 6;

  // Datos personales adicionales (derecha)
  const personalY = contactY;
  const personalX = pageWidth / 2;

  doc.text(`Fecha de nacimiento: ${formatDate(data.fechaNacimiento)}`, personalX, personalY);
  doc.text(`Nacionalidad: ${data.nacionalidad}`, personalX, personalY + lineHeight);

  yPosition = Math.max(yPosition, personalY + 2 * lineHeight + 6);

  // Si hay foto, ajustar yPosition para que el contenido no se solape
  if (hasPhoto) {
    yPosition = Math.max(yPosition, margin + photoSize + 10);
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PERFIL PROFESIONAL
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  if (data.objetivoProfesional) {
    yPosition = checkPageBreak(doc, yPosition, 30);

    addSectionHeader(doc, 'PERFIL PROFESIONAL', yPosition);
    yPosition += 7;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(COLORS.text);

    const lines = doc.splitTextToSize(data.objetivoProfesional, contentWidth);
    doc.text(lines, margin, yPosition);
    yPosition += lines.length * 4.5 + 8;
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // EXPERIENCIA PROFESIONAL
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  if (data.experiencia.length > 0) {
    yPosition = checkPageBreak(doc, yPosition, 40);

    addSectionHeader(doc, 'EXPERIENCIA PROFESIONAL', yPosition);
    yPosition += 7;

    data.experiencia.forEach((exp) => {
      yPosition = checkPageBreak(doc, yPosition, 35);

      // Puesto (negrita, destacado)
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(COLORS.primary);
      doc.text(exp.puesto, margin, yPosition);
      yPosition += 5;

      // Empresa y ubicación
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(COLORS.text);
      doc.text(`${exp.empresa} | ${exp.ubicacion}`, margin, yPosition);

      // Fechas (alineadas a la derecha)
      const fechaText = `${exp.fechaInicio} - ${exp.fechaFin}`;
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(COLORS.mediumGray);
      const fechaWidth = doc.getTextWidth(fechaText);
      doc.text(fechaText, pageWidth - margin - fechaWidth, yPosition);
      yPosition += 5;

      // Descripción
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(COLORS.text);
      const descLines = doc.splitTextToSize(exp.descripcion, contentWidth - 5);
      doc.text(descLines, margin + 2, yPosition);
      yPosition += descLines.length * 4 + 2;

      // Logros (bullets)
      if (exp.logros && exp.logros.length > 0) {
        exp.logros.forEach(logro => {
          yPosition = checkPageBreak(doc, yPosition, 8);
          // Bullet point profesional
          doc.setFontSize(8);
          doc.text('•', margin + 3, yPosition);
          const logroLines = doc.splitTextToSize(logro, contentWidth - 10);
          doc.setFontSize(9);
          doc.text(logroLines, margin + 7, yPosition);
          yPosition += logroLines.length * 4;
        });
      }

      yPosition += 5;
    });
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // FORMACIÓN ACADÉMICA
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  if (data.formacion.length > 0) {
    yPosition = checkPageBreak(doc, yPosition, 35);

    addSectionHeader(doc, 'FORMACIÓN ACADÉMICA', yPosition);
    yPosition += 7;

    data.formacion.forEach(edu => {
      yPosition = checkPageBreak(doc, yPosition, 25);

      // Título
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(COLORS.primary);
      doc.text(edu.titulo, margin, yPosition);
      yPosition += 5;

      // Institución y ubicación
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(COLORS.text);
      doc.text(`${edu.institucion}, ${edu.ubicacion}`, margin, yPosition);

      // Fechas
      const fechaText = `${edu.fechaInicio} - ${edu.fechaFin}`;
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(COLORS.mediumGray);
      const fechaWidth = doc.getTextWidth(fechaText);
      doc.text(fechaText, pageWidth - margin - fechaWidth, yPosition);
      yPosition += 5;

      if (edu.detalles) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(COLORS.text);
        const detLines = doc.splitTextToSize(edu.detalles, contentWidth - 5);
        doc.text(detLines, margin + 2, yPosition);
        yPosition += detLines.length * 4;
      }

      yPosition += 5;
    });
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // IDIOMAS Y HABILIDADES (2 columnas)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  yPosition = checkPageBreak(doc, yPosition, 40);

  const startY = yPosition;
  const columnWidth = (contentWidth - 10) / 2;

  // Idiomas (columna izquierda)
  if (data.idiomas.length > 0) {
    addSectionHeader(doc, 'IDIOMAS', yPosition);
    yPosition += 7;

    let idiomaY = yPosition;
    data.idiomas.forEach(idioma => {
      idiomaY = checkPageBreak(doc, idiomaY, 8);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(COLORS.text);
      doc.text(idioma.idioma, margin, idiomaY);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(COLORS.mediumGray);
      const nivelText = idioma.certificado
        ? `${idioma.nivel} (${idioma.certificado})`
        : idioma.nivel;
      doc.text(nivelText, margin + 45, idiomaY);
      idiomaY += 4.5;
    });

    yPosition = idiomaY + 5;
  }

  // Habilidades (columna derecha)
  if (data.habilidades.length > 0) {
    const habilidadesX = pageWidth / 2 + 5;
    let habilidadesY = startY;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(COLORS.primary);
    doc.text('HABILIDADES', habilidadesX, habilidadesY);
    habilidadesY += 7;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(COLORS.text);

    data.habilidades.forEach(hab => {
      habilidadesY = checkPageBreak(doc, habilidadesY, 8);
      doc.setFontSize(8);
      doc.text('•', habilidadesX, habilidadesY);
      doc.setFontSize(9);
      const habLines = doc.splitTextToSize(hab, columnWidth - 5);
      doc.text(habLines, habilidadesX + 4, habilidadesY);
      habilidadesY += habLines.length * 4.5;
    });

    yPosition = Math.max(yPosition, habilidadesY + 5);
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // INTERESES
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  if (data.intereses && data.intereses.length > 0) {
    yPosition = checkPageBreak(doc, yPosition, 20);

    addSectionHeader(doc, 'INTERESES', yPosition);
    yPosition += 7;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(COLORS.text);
    doc.text(data.intereses.join(' • '), margin, yPosition);
    yPosition += 8;
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // REFERENCIAS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  if (data.referencias && data.referencias.length > 0) {
    yPosition = checkPageBreak(doc, yPosition, 30);

    addSectionHeader(doc, 'REFERENCIAS', yPosition);
    yPosition += 7;

    data.referencias.forEach(ref => {
      yPosition = checkPageBreak(doc, yPosition, 20);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(COLORS.text);
      doc.text(ref.nombre, margin, yPosition);
      yPosition += 4.5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text(`${ref.puesto}, ${ref.empresa}`, margin, yPosition);
      yPosition += 4;

      if (ref.email) {
        doc.setTextColor(COLORS.mediumGray);
        doc.text(`Email: ${ref.email}`, margin + 2, yPosition);
        yPosition += 4;
      }

      if (ref.telefono) {
        doc.setTextColor(COLORS.mediumGray);
        doc.text(`Teléfono: ${ref.telefono}`, margin + 2, yPosition);
        yPosition += 4;
      }

      yPosition += 3;
    });
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // FOOTER en todas las páginas
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);

    // Línea superior del footer
    doc.setDrawColor(COLORS.lightGray);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);

    // Texto del footer
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLORS.mediumGray);
    doc.text(
      `CV ${data.nombre} ${data.apellidos}`,
      margin,
      pageHeight - 10
    );
    doc.text(
      `Página ${i}/${totalPages}`,
      pageWidth - margin - 15,
      pageHeight - 10
    );
  }

  return doc;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// HELPER FUNCTIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function addSectionHeader(doc: jsPDF, title: string, y: number) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(COLORS.primary);
  doc.text(title, 20, y);

  // Línea debajo del título de sección
  const textWidth = doc.getTextWidth(title);
  doc.setDrawColor(COLORS.accent);
  doc.setLineWidth(0.8);
  doc.line(20, y + 1, 20 + textWidth, y + 1);
}

function checkPageBreak(doc: jsPDF, currentY: number, requiredSpace: number): number {
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;

  if (currentY + requiredSpace > pageHeight - 25) {
    doc.addPage();
    return margin + 10;
  }

  return currentY;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '';

  try {
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  } catch {
    return dateStr;
  }
}
