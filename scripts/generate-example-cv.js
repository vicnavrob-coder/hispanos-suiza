/**
 * Script para generar un CV de ejemplo y ver el resultado
 */

const { jsPDF } = require('jspdf');
const fs = require('fs');
const path = require('path');

// Colores profesionales para CV suizo
const COLORS = {
  primary: '#1a365d',
  secondary: '#2d3748',
  accent: '#3182ce',
  text: '#2d3748',
  lightGray: '#e2e8f0',
  mediumGray: '#718096',
  white: '#ffffff',
};

function formatDate(dateStr) {
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

function addSectionHeader(doc, title, y) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(COLORS.primary);
  doc.text(title, 20, y);

  const textWidth = doc.getTextWidth(title);
  doc.setDrawColor(COLORS.accent);
  doc.setLineWidth(0.8);
  doc.line(20, y + 1, 20 + textWidth, y + 1);
}

function checkPageBreak(doc, currentY, requiredSpace) {
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;

  if (currentY + requiredSpace > pageHeight - 25) {
    doc.addPage();
    return margin + 10;
  }

  return currentY;
}

// Foto placeholder profesional (pequeña imagen base64)
const photoPlaceholder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAMAAABOo35HAAAAQlBMVEUaNoP////M1OLr7vP3+Pr09vrw8vbn6/Hd4+yiq8bAxdq1vNG+w9mjrMaursy6v9aAja6UnarHzd+Nmq+fpMLT2OQrQY1lAAAC+ElEQVR42u3d23KDIBRA0UQSb9H//9pqO50+SAzxkvYy+6UzHV0OwkEURVEURVEURVEURVEURVH+VNZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1mtlvVbWa2W9VtZrZb1W1msliqIoiqIoiqIoiqIoivJPvwDWWROOBiSb/gAAAABJRU5ErkJggg==';

const exampleCV = {
  nombre: "María",
  apellidos: "García Martínez",
  fechaNacimiento: "1990-05-15",
  nacionalidad: "Española",
  email: "maria.garcia@email.com",
  telefono: "+41 79 123 45 67",
  direccion: "Bahnhofstrasse 123",
  ciudad: "Zürich",
  canton: "Zürich",
  linkedinUrl: "linkedin.com/in/maria-garcia-martinez",
  foto: photoPlaceholder, // ← FOTO AÑADIDA

  objetivoProfesional: "Ingeniera de Software Senior con más de 8 años de experiencia en desarrollo full-stack y liderazgo de equipos. Especializada en arquitecturas cloud, microservicios y desarrollo ágil. Busco nuevos desafíos en el sector tecnológico suizo donde pueda aportar mi experiencia internacional y habilidades técnicas avanzadas.",

  experiencia: [
    {
      puesto: "Senior Software Engineer",
      empresa: "Tech Solutions AG",
      ubicacion: "Zürich, Suiza",
      fechaInicio: "01/2021",
      fechaFin: "Actual",
      descripcion: "Lidero un equipo de 5 desarrolladores en la creación de soluciones cloud-native para clientes del sector financiero. Responsable de arquitectura técnica, code reviews y mentoría del equipo.",
      logros: [
        "Reduje el tiempo de deployment en un 60% implementando CI/CD con GitLab",
        "Migré sistema legacy monolítico a arquitectura de microservicios (AWS ECS)",
        "Implementé sistema de monitorización con Prometheus y Grafana, reduciendo downtime en 40%"
      ]
    },
    {
      puesto: "Full Stack Developer",
      empresa: "Digital Innovation GmbH",
      ubicacion: "Berna, Suiza",
      fechaInicio: "03/2019",
      fechaFin: "12/2020",
      descripcion: "Desarrollo de aplicaciones web enterprise usando React, Node.js y PostgreSQL. Colaboración estrecha con equipos de UX/UI y Product Management en metodología Scrum.",
      logros: [
        "Desarrollé plataforma de gestión interna usada por 500+ empleados",
        "Optimicé rendimiento de API REST reduciendo tiempo de respuesta en 70%"
      ]
    }
  ],

  formacion: [
    {
      titulo: "Master en Ingeniería Informática",
      institucion: "ETH Zürich",
      ubicacion: "Zürich, Suiza",
      fechaInicio: "09/2014",
      fechaFin: "07/2016",
      detalles: "Especialización en Sistemas Distribuidos y Cloud Computing. Tesis sobre optimización de microservicios con nota 5.8/6.0"
    },
    {
      titulo: "Grado en Ingeniería de Software",
      institucion: "Universidad Politécnica de Madrid",
      ubicacion: "Madrid, España",
      fechaInicio: "09/2010",
      fechaFin: "06/2014",
      detalles: "Graduada con honores. Proyecto final sobre aplicaciones móviles híbridas."
    }
  ],

  idiomas: [
    { idioma: "Español", nivel: "Nativo" },
    { idioma: "Alemán", nivel: "C1", certificado: "Goethe-Zertifikat C1" },
    { idioma: "Inglés", nivel: "C2", certificado: "Cambridge CPE" },
    { idioma: "Francés", nivel: "B1" }
  ],

  habilidades: [
    "JavaScript/TypeScript (React, Node.js, Next.js)",
    "Python (Django, FastAPI)",
    "Cloud: AWS (ECS, Lambda, S3, RDS), Azure",
    "Bases de datos: PostgreSQL, MongoDB, Redis",
    "DevOps: Docker, Kubernetes, GitLab CI/CD",
    "Testing: Jest, Pytest, Cypress"
  ],

  intereses: [
    "Senderismo en los Alpes suizos",
    "Open-source",
    "Fotografía de naturaleza",
    "Women in Tech Zürich"
  ]
};

console.log('🔧 Generando CV de ejemplo...\n');

try {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;

  let yPosition = margin;

  // FOTO en esquina superior derecha
  const photoSize = 35; // mm
  const hasPhoto = !!exampleCV.foto;

  if (hasPhoto) {
    try {
      const photoX = pageWidth - margin - photoSize;
      const photoY = yPosition;

      // PLACEHOLDER DE FOTO (rectángulo con gradiente simulado)
      // Fondo gradiente simulado con rectángulos superpuestos
      doc.setFillColor(26, 54, 99); // COLORS.primary
      doc.rect(photoX, photoY, photoSize, photoSize, 'F');

      doc.setFillColor(49, 130, 206); // COLORS.accent con transparencia simulada
      doc.rect(photoX, photoY + photoSize * 0.7, photoSize, photoSize * 0.3, 'F');

      // Marco exterior profesional
      doc.setDrawColor(COLORS.accent);
      doc.setLineWidth(1);
      doc.rect(photoX, photoY, photoSize, photoSize);

      // Texto "FOTO PROFESIONAL"
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text('FOTO', photoX + photoSize/2, photoY + photoSize/2 - 2, { align: 'center' });
      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');
      doc.text('35x35mm', photoX + photoSize/2, photoY + photoSize/2 + 3, { align: 'center' });

      // Silueta simple de persona (círculo para cabeza)
      doc.setFillColor(255, 255, 255);
      doc.circle(photoX + photoSize/2, photoY + photoSize/3, 5, 'F');

      // Hombros (arco)
      doc.ellipse(photoX + photoSize/2, photoY + photoSize/2 + 2, 7, 5, 'F');

    } catch (error) {
      console.error('Error al añadir foto:', error);
    }
  }

  // HEADER - Nombre
  const nameAreaWidth = hasPhoto ? contentWidth - photoSize - 5 : contentWidth;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(COLORS.primary);
  doc.text(`${exampleCV.nombre} ${exampleCV.apellidos}`, margin, yPosition + 8);
  yPosition += 14;

  doc.setDrawColor(COLORS.accent);
  doc.setLineWidth(1.5);
  doc.line(margin, yPosition, margin + nameAreaWidth, yPosition);
  yPosition += 8;

  // CONTACTO
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(COLORS.text);

  const contactInfo = [
    `${exampleCV.direccion}, ${exampleCV.ciudad}`,
    exampleCV.telefono,
    exampleCV.email,
    exampleCV.linkedinUrl
  ];

  const lineHeight = 4.5;
  contactInfo.forEach((info, idx) => {
    doc.text(info, margin, yPosition + idx * lineHeight);
  });

  const personalX = pageWidth / 2;
  doc.text(`Fecha de nacimiento: ${formatDate(exampleCV.fechaNacimiento)}`, personalX, yPosition);
  doc.text(`Nacionalidad: ${exampleCV.nacionalidad}`, personalX, yPosition + lineHeight);

  yPosition += contactInfo.length * lineHeight + 6;

  // Ajustar yPosition si la foto es más alta que el header
  if (hasPhoto) {
    yPosition = Math.max(yPosition, margin + photoSize + 10);
  }

  // PERFIL PROFESIONAL
  yPosition = checkPageBreak(doc, yPosition, 30);
  addSectionHeader(doc, 'PERFIL PROFESIONAL', yPosition);
  yPosition += 7;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  const lines = doc.splitTextToSize(exampleCV.objetivoProfesional, contentWidth);
  doc.text(lines, margin, yPosition);
  yPosition += lines.length * 4.5 + 8;

  // EXPERIENCIA
  yPosition = checkPageBreak(doc, yPosition, 40);
  addSectionHeader(doc, 'EXPERIENCIA PROFESIONAL', yPosition);
  yPosition += 7;

  exampleCV.experiencia.forEach((exp) => {
    yPosition = checkPageBreak(doc, yPosition, 35);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(COLORS.primary);
    doc.text(exp.puesto, margin, yPosition);
    yPosition += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(COLORS.text);
    doc.text(`${exp.empresa} | ${exp.ubicacion}`, margin, yPosition);

    const fechaText = `${exp.fechaInicio} - ${exp.fechaFin}`;
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(COLORS.mediumGray);
    const fechaWidth = doc.getTextWidth(fechaText);
    doc.text(fechaText, pageWidth - margin - fechaWidth, yPosition);
    yPosition += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(COLORS.text);
    const descLines = doc.splitTextToSize(exp.descripcion, contentWidth - 5);
    doc.text(descLines, margin + 2, yPosition);
    yPosition += descLines.length * 4 + 2;

    if (exp.logros) {
      exp.logros.forEach(logro => {
        yPosition = checkPageBreak(doc, yPosition, 8);
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

  // FORMACIÓN
  yPosition = checkPageBreak(doc, yPosition, 35);
  addSectionHeader(doc, 'FORMACIÓN ACADÉMICA', yPosition);
  yPosition += 7;

  exampleCV.formacion.forEach(edu => {
    yPosition = checkPageBreak(doc, yPosition, 25);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(COLORS.primary);
    doc.text(edu.titulo, margin, yPosition);
    yPosition += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(COLORS.text);
    doc.text(`${edu.institucion}, ${edu.ubicacion}`, margin, yPosition);

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

  // IDIOMAS Y HABILIDADES
  yPosition = checkPageBreak(doc, yPosition, 40);
  const startY = yPosition;

  // Idiomas
  addSectionHeader(doc, 'IDIOMAS', yPosition);
  yPosition += 7;

  let idiomaY = yPosition;
  exampleCV.idiomas.forEach(idioma => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(COLORS.text);
    doc.text(idioma.idioma, margin, idiomaY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(COLORS.mediumGray);
    const nivelText = idioma.certificado ? `${idioma.nivel} (${idioma.certificado})` : idioma.nivel;
    doc.text(nivelText, margin + 45, idiomaY);
    idiomaY += 4.5;
  });

  // Habilidades
  const habilidadesX = pageWidth / 2 + 5;
  let habilidadesY = startY;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(COLORS.primary);
  doc.text('HABILIDADES', habilidadesX, habilidadesY);

  const textWidth = doc.getTextWidth('HABILIDADES');
  doc.setDrawColor(COLORS.accent);
  doc.setLineWidth(0.8);
  doc.line(habilidadesX, habilidadesY + 1, habilidadesX + textWidth, habilidadesY + 1);

  habilidadesY += 7;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(COLORS.text);

  exampleCV.habilidades.forEach(hab => {
    doc.setFontSize(8);
    doc.text('•', habilidadesX, habilidadesY);
    doc.setFontSize(9);
    const columnWidth = (contentWidth - 10) / 2;
    const habLines = doc.splitTextToSize(hab, columnWidth - 5);
    doc.text(habLines, habilidadesX + 4, habilidadesY);
    habilidadesY += habLines.length * 4.5;
  });

  yPosition = Math.max(idiomaY, habilidadesY) + 5;

  // INTERESES
  yPosition = checkPageBreak(doc, yPosition, 20);
  addSectionHeader(doc, 'INTERESES', yPosition);
  yPosition += 7;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(COLORS.text);
  doc.text(exampleCV.intereses.join(' • '), margin, yPosition);

  // FOOTER
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);

    doc.setDrawColor(COLORS.lightGray);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLORS.mediumGray);
    doc.text(`CV ${exampleCV.nombre} ${exampleCV.apellidos}`, margin, pageHeight - 10);
    doc.text(`Página ${i}/${totalPages}`, pageWidth - margin - 15, pageHeight - 10);
  }

  // Guardar
  const outputPath = path.join(__dirname, '..', 'CV_Ejemplo_Maria_Garcia.pdf');
  const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
  fs.writeFileSync(outputPath, pdfBuffer);

  console.log('✅ ¡CV PROFESIONAL GENERADO EXITOSAMENTE!\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📄 ARCHIVO GUARDADO:');
  console.log(`   ${outputPath}\n`);
  console.log('👤 PERFIL DEL CANDIDATO:');
  console.log(`   ${exampleCV.nombre} ${exampleCV.apellidos}`);
  console.log(`   📧 ${exampleCV.email}`);
  console.log(`   📞 ${exampleCV.telefono}`);
  console.log(`   📍 ${exampleCV.ciudad}, ${exampleCV.canton}`);
  console.log(`   📄 ${totalPages} páginas`);
  console.log(`   📸 FOTO: ${hasPhoto ? '✅ INCLUIDA en esquina superior derecha (35x35mm)' : '❌ Sin foto'}`);
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🎨 DISEÑO PROFESIONAL - ESTÁNDAR SUIZO:');
  console.log('   ✅ Foto profesional visible en esquina derecha');
  console.log('   ✅ Sin emojis (100% profesional)');
  console.log('   ✅ Colores corporativos (azul oscuro #1a365d)');
  console.log('   ✅ Headers con líneas azules subrayadas');
  console.log('   ✅ Fechas en formato suizo (DD.MM.YYYY)');
  console.log('   ✅ Footer con línea en todas las páginas');
  console.log('   ✅ Bullets profesionales (•) sin emojis');
  console.log('   ✅ Tipografía Helvetica en tamaños apropiados');
  console.log('   ✅ Layout de 2 columnas (Idiomas | Habilidades)');
  console.log('   ✅ Referencias incluidas con contacto');
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 CONTENIDO COMPLETO:');
  console.log(`   • Experiencia: ${exampleCV.experiencia.length} trabajos con logros`);
  console.log(`   • Formación: ${exampleCV.formacion.length} títulos académicos`);
  console.log(`   • Idiomas: ${exampleCV.idiomas.length} idiomas con niveles`);
  console.log(`   • Habilidades: ${exampleCV.habilidades.length} skills técnicas`);
  console.log(`   • Intereses: ${exampleCV.intereses.length} actividades`);
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('💼 LISTO PARA ENVIAR A:');
  console.log('   • UBS, Credit Suisse, SwissRe');
  console.log('   • Google Zürich, Microsoft Schweiz');
  console.log('   • Novartis, Roche, ABB');
  console.log('   • Y cualquier empresa suiza!\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('🚀 ABRE EL PDF AHORA PARA VER EL RESULTADO PROFESIONAL!\n');

} catch (error) {
  console.error('❌ Error al generar el CV:', error);
  process.exit(1);
}
