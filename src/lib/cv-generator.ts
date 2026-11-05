/**
 * Generador de CV en formato suizo (PDF)
 * Usa jsPDF para crear un CV profesional
 */

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { CVData } from '@/types/cv';

// Colores del diseño suizo (profesional, minimalista)
const COLORS = {
  primary: '#2C3E50',    // Azul oscuro profesional
  secondary: '#34495E',  // Gris oscuro
  accent: '#3498DB',     // Azul claro para acentos
  text: '#2C3E50',
  lightGray: '#ECF0F1',
  darkGray: '#7F8C8D',
};

export function generateSwissCV(data: CVData): jsPDF {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;

  let yPosition = margin;

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // HEADER - Datos personales
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // Nombre grande y destacado
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(COLORS.primary);
  doc.text(`${data.nombre} ${data.apellidos}`, margin, yPosition);
  yPosition += 10;

  // Línea divisoria
  doc.setDrawColor(COLORS.accent);
  doc.setLineWidth(0.5);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);
  yPosition += 8;

  // Datos de contacto (2 columnas)
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(COLORS.text);

  const contactLeft = [
    `📧 ${data.email}`,
    `📞 ${data.telefono}`,
    `🏠 ${data.direccion}, ${data.ciudad}`,
  ];

  const contactRight = [
    `📅 ${data.fechaNacimiento}`,
    `🌍 ${data.nacionalidad}`,
    data.linkedinUrl ? `🔗 LinkedIn` : '',
  ].filter(Boolean);

  contactLeft.forEach((line, i) => {
    doc.text(line, margin, yPosition + i * 5);
  });

  contactRight.forEach((line, i) => {
    doc.text(line, pageWidth / 2, yPosition + i * 5);
  });

  yPosition += Math.max(contactLeft.length, contactRight.length) * 5 + 8;

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // OBJETIVO PROFESIONAL
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  if (data.objetivoProfesional) {
    addSection(doc, 'PERFIL PROFESIONAL', yPosition);
    yPosition += 8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(COLORS.text);

    const lines = doc.splitTextToSize(data.objetivoProfesional, contentWidth);
    doc.text(lines, margin, yPosition);
    yPosition += lines.length * 5 + 8;
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // EXPERIENCIA LABORAL
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  if (data.experiencia.length > 0) {
    yPosition = checkPageBreak(doc, yPosition, 40);

    addSection(doc, 'EXPERIENCIA PROFESIONAL', yPosition);
    yPosition += 8;

    data.experiencia.forEach((exp, index) => {
      yPosition = checkPageBreak(doc, yPosition, 30);

      // Puesto y empresa
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text(exp.puesto, margin, yPosition);
      yPosition += 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(COLORS.secondary);
      doc.text(`${exp.empresa} | ${exp.ubicacion}`, margin, yPosition);

      // Fechas (alineadas a la derecha)
      const fechaText = `${exp.fechaInicio} - ${exp.fechaFin}`;
      const fechaWidth = doc.getTextWidth(fechaText);
      doc.text(fechaText, pageWidth - margin - fechaWidth, yPosition);
      yPosition += 6;

      // Descripción
      doc.setTextColor(COLORS.text);
      const descLines = doc.splitTextToSize(exp.descripcion, contentWidth - 5);
      doc.text(descLines, margin + 3, yPosition);
      yPosition += descLines.length * 5;

      // Logros (bullets)
      if (exp.logros && exp.logros.length > 0) {
        yPosition += 2;
        exp.logros.forEach(logro => {
          yPosition = checkPageBreak(doc, yPosition, 10);
          doc.text('•', margin + 3, yPosition);
          const logroLines = doc.splitTextToSize(logro, contentWidth - 10);
          doc.text(logroLines, margin + 8, yPosition);
          yPosition += logroLines.length * 5;
        });
      }

      yPosition += 6;
    });
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // FORMACIÓN ACADÉMICA
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  if (data.formacion.length > 0) {
    yPosition = checkPageBreak(doc, yPosition, 30);

    addSection(doc, 'FORMACIÓN ACADÉMICA', yPosition);
    yPosition += 8;

    data.formacion.forEach(edu => {
      yPosition = checkPageBreak(doc, yPosition, 20);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text(edu.titulo, margin, yPosition);
      yPosition += 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(COLORS.secondary);
      doc.text(`${edu.institucion} | ${edu.ubicacion}`, margin, yPosition);

      const fechaText = `${edu.fechaInicio} - ${edu.fechaFin}`;
      const fechaWidth = doc.getTextWidth(fechaText);
      doc.text(fechaText, pageWidth - margin - fechaWidth, yPosition);
      yPosition += 5;

      if (edu.detalles) {
        doc.setTextColor(COLORS.text);
        const detLines = doc.splitTextToSize(edu.detalles, contentWidth - 5);
        doc.text(detLines, margin + 3, yPosition);
        yPosition += detLines.length * 5;
      }

      yPosition += 6;
    });
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // IDIOMAS Y HABILIDADES (2 columnas)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  yPosition = checkPageBreak(doc, yPosition, 40);

  const columnWidth = (contentWidth - 10) / 2;

  // Idiomas (columna izquierda)
  if (data.idiomas.length > 0) {
    addSection(doc, 'IDIOMAS', yPosition);
    yPosition += 8;

    let idiomaY = yPosition;
    data.idiomas.forEach(idioma => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text(idioma.idioma, margin, idiomaY);

      doc.setFont('helvetica', 'normal');
      const nivelText = idioma.certificado
        ? `${idioma.nivel} (${idioma.certificado})`
        : idioma.nivel;
      doc.text(nivelText, margin + 40, idiomaY);
      idiomaY += 5;
    });
  }

  // Habilidades (columna derecha)
  if (data.habilidades.length > 0) {
    const habilidadesX = pageWidth / 2 + 5;
    let habilidadesY = yPosition - 8;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(COLORS.primary);
    doc.text('HABILIDADES', habilidadesX, habilidadesY);
    habilidadesY += 8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(COLORS.text);

    data.habilidades.forEach(hab => {
      doc.text('•', habilidadesX, habilidadesY);
      doc.text(hab, habilidadesX + 5, habilidadesY);
      habilidadesY += 5;
    });
  }

  yPosition = Math.max(
    yPosition + data.idiomas.length * 5,
    yPosition + data.habilidades.length * 5
  ) + 8;

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // INTERESES (muy importante en CVs suizos)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  if (data.intereses && data.intereses.length > 0) {
    yPosition = checkPageBreak(doc, yPosition, 20);

    addSection(doc, 'INTERESES', yPosition);
    yPosition += 8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(data.intereses.join(' • '), margin, yPosition);
    yPosition += 8;
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // REFERENCIAS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  if (data.referencias && data.referencias.length > 0) {
    yPosition = checkPageBreak(doc, yPosition, 30);

    addSection(doc, 'REFERENCIAS', yPosition);
    yPosition += 8;

    data.referencias.forEach(ref => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text(ref.nombre, margin, yPosition);
      yPosition += 5;

      doc.setFont('helvetica', 'normal');
      doc.text(`${ref.puesto} - ${ref.empresa}`, margin, yPosition);
      yPosition += 5;

      if (ref.email) {
        doc.text(`📧 ${ref.email}`, margin + 3, yPosition);
        yPosition += 5;
      }

      if (ref.telefono) {
        doc.text(`📞 ${ref.telefono}`, margin + 3, yPosition);
        yPosition += 5;
      }

      yPosition += 3;
    });
  }

  // Footer en todas las páginas
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(COLORS.darkGray);
    doc.text(
      `CV ${data.nombre} ${data.apellidos} - Página ${i}/${totalPages}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
  }

  return doc;
}

// Helper: Añadir sección con título
function addSection(doc: jsPDF, title: string, y: number) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(COLORS.primary);
  doc.text(title, 20, y);
}

// Helper: Verificar si necesita nueva página
function checkPageBreak(doc: jsPDF, currentY: number, requiredSpace: number): number {
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;

  if (currentY + requiredSpace > pageHeight - margin) {
    doc.addPage();
    return margin + 10;
  }

  return currentY;
}
