/**
 * Script para generar un CV de ejemplo y ver el resultado
 */

import { generateSwissCV } from '../src/lib/cv-generator';
import type { CVData } from '../src/types/cv';
import fs from 'fs';
import path from 'path';

const exampleCV: CVData = {
  // Datos personales
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

  // Foto (placeholder - en producción sería una imagen real)
  foto: undefined, // Sin foto para el ejemplo en consola

  // Objetivo profesional
  objetivoProfesional: "Ingeniera de Software Senior con más de 8 años de experiencia en desarrollo full-stack y liderazgo de equipos. Especializada en arquitecturas cloud, microservicios y desarrollo ágil. Busco nuevos desafíos en el sector tecnológico suizo donde pueda aportar mi experiencia internacional y habilidades técnicas avanzadas.",

  // Experiencia laboral
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
        "Optimicé rendimiento de API REST reduciendo tiempo de respuesta en 70%",
        "Implementé testing automatizado aumentando coverage del 40% al 85%"
      ]
    },
    {
      puesto: "Software Developer",
      empresa: "StartupTech",
      ubicacion: "Barcelona, España",
      fechaInicio: "06/2016",
      fechaFin: "02/2019",
      descripcion: "Desarrollador full-stack en startup fintech, trabajando en el desarrollo del MVP y posteriores iteraciones del producto.",
      logros: [
        "Contribuí al lanzamiento exitoso del MVP en 6 meses",
        "Implementé integraciones con APIs de pagos (Stripe, PayPal)",
        "Participé en captación de inversión Serie A presentando demos técnicas"
      ]
    }
  ],

  // Formación académica
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

  // Idiomas
  idiomas: [
    {
      idioma: "Español",
      nivel: "Nativo",
    },
    {
      idioma: "Alemán",
      nivel: "C1",
      certificado: "Goethe-Zertifikat C1"
    },
    {
      idioma: "Inglés",
      nivel: "C2",
      certificado: "Cambridge CPE"
    },
    {
      idioma: "Francés",
      nivel: "B1",
    }
  ],

  // Habilidades técnicas
  habilidades: [
    "JavaScript/TypeScript (React, Node.js, Next.js)",
    "Python (Django, FastAPI)",
    "Cloud: AWS (ECS, Lambda, S3, RDS), Azure",
    "Bases de datos: PostgreSQL, MongoDB, Redis",
    "DevOps: Docker, Kubernetes, GitLab CI/CD",
    "Arquitecturas: Microservicios, Event-Driven, Serverless",
    "Testing: Jest, Pytest, Cypress",
    "Metodologías ágiles: Scrum, Kanban",
  ],

  // Intereses
  intereses: [
    "Senderismo y montañismo en los Alpes suizos",
    "Contribución a proyectos open-source",
    "Fotografía de naturaleza",
    "Voluntariado en Women in Tech Zürich"
  ],

  // Referencias
  referencias: [
    {
      nombre: "Dr. Thomas Müller",
      puesto: "CTO",
      empresa: "Tech Solutions AG",
      email: "thomas.mueller@techsolutions.ch",
      telefono: "+41 44 123 45 67"
    },
    {
      nombre: "Sarah Schmidt",
      puesto: "Engineering Manager",
      empresa: "Digital Innovation GmbH",
      email: "sarah.schmidt@digitalinnovation.ch",
    }
  ]
};

// Generar el PDF
console.log('🔧 Generando CV de ejemplo...\n');

try {
  const pdf = generateSwissCV(exampleCV);

  // Guardar el PDF
  const outputPath = path.join(__dirname, '..', 'CV_Ejemplo_Maria_Garcia.pdf');
  const pdfBuffer = Buffer.from(pdf.output('arraybuffer'));
  fs.writeFileSync(outputPath, pdfBuffer);

  console.log('✅ CV generado exitosamente!\n');
  console.log('📄 Archivo guardado en:');
  console.log(`   ${outputPath}\n`);
  console.log('👤 Datos del CV:');
  console.log(`   Nombre: ${exampleCV.nombre} ${exampleCV.apellidos}`);
  console.log(`   Email: ${exampleCV.email}`);
  console.log(`   Teléfono: ${exampleCV.telefono}`);
  console.log(`   Ubicación: ${exampleCV.ciudad}, ${exampleCV.canton}`);
  console.log(`   Experiencia: ${exampleCV.experiencia.length} trabajos`);
  console.log(`   Formación: ${exampleCV.formacion.length} títulos`);
  console.log(`   Idiomas: ${exampleCV.idiomas.length} idiomas`);
  console.log(`   Habilidades: ${exampleCV.habilidades.length} skills`);
  console.log('\n🎨 Características del diseño:');
  console.log('   ✓ Sin emojis (100% profesional)');
  console.log('   ✓ Colores corporativos (azul oscuro)');
  console.log('   ✓ Headers con líneas subrayadas');
  console.log('   ✓ Fechas en formato suizo (DD.MM.YYYY)');
  console.log('   ✓ Footer profesional en todas las páginas');
  console.log('   ✓ Bullets profesionales (•)');
  console.log('   ✓ Layout optimizado para ATS');
  console.log('\n💡 Abre el PDF para ver el resultado final!\n');

} catch (error) {
  console.error('❌ Error al generar el CV:', error);
  process.exit(1);
}
