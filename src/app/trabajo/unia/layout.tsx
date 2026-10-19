import type { Metadata } from "next";
import { buildMetadata, BASE_URL, breadcrumbSchema, faqSchema, howToSchema, serviceSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "UNIA Suiza: qué es, cuánto cuesta, cómo afiliarse y pedir cita 2026",
  description:
    "Guía completa UNIA, el principal sindicato de Suiza. Solicita cita gratuita con asesor, conoce precios (~1% salario), derechos laborales, CCT y cómo afiliarte desde España o Latinoamérica.",
  path: "/trabajo/unia",
  ogImage:
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=85&auto=format&fit=crop",
  keywords: [
    "unia suiza",
    "sindicato suiza",
    "unia afiliarse suiza",
    "unia suiza precio",
    "derechos laborales suiza",
    "convenio colectivo suiza",
    "unia suiza español",
    "despido suiza derechos",
    "horas extra suiza ley",
    "salario minimo suiza por sector",
    "unia suiza que cubre",
    "sindicato suiza hispanohablantes",
    "unia periodo espera",
    "cct suiza convenio colectivo trabajo",
    "cita unia suiza",
    "consulta sindical suiza",
    "asesoramiento laboral suiza gratis",
    "abogado laboral suiza español",
    "ayuda despido suiza",
    "reclamar salario suiza",
  ],
});

const faqs = [
  {
    pregunta: "¿Cómo puedo pedir una cita con UNIA en español?",
    respuesta:
      "En HispanosEnSuiza facilitamos citas gratuitas con asesores de UNIA que hablan español. Solo tienes que registrarte en nuestra web, clicar en 'Solicitar cita con UNIA' y en 24-48h recibirás propuestas de horarios. Eliges el que mejor te convenga y recibes confirmación inmediata. Es gratis y sin compromiso.",
  },
  {
    pregunta: "¿Qué es la UNIA y para qué sirve en Suiza?",
    respuesta:
      "La UNIA es el sindicato más grande de Suiza, con más de 180.000 afiliados. Protege tus derechos laborales: te asesora en conflictos con el empleador, controla el cumplimiento del convenio colectivo (CCT), te representa en casos de despido y negocia mejores salarios y condiciones para tu sector.",
  },
  {
    pregunta: "¿Cuánto cuesta afiliarse a la UNIA?",
    respuesta:
      "La cuota es aproximadamente el 1% de tu salario bruto mensual, con un mínimo de CHF 15 y un máximo de CHF 120 al mes. Para un salario de CHF 5.000 pagarías unos CHF 50/mes. La cuota es deducible en la declaración de impuestos suiza.",
  },
  {
    pregunta: "¿Cuánto tiempo hay que esperar para recibir ayuda de la UNIA?",
    respuesta:
      "Existe un período de espera de 3 meses desde la afiliación para conflictos laborales preexistentes. Si te afilias antes de que surja el problema, la protección es inmediata. Por eso se recomienda afiliarse al empezar a trabajar en Suiza.",
  },
  {
    pregunta: "¿Qué es el CCT (Convenio Colectivo de Trabajo) en Suiza?",
    respuesta:
      "El CCT (Gesamtarbeitsvertrag o GAV en alemán) es un acuerdo entre sindicatos y empleadores que fija salarios mínimos, horas de trabajo, vacaciones y otras condiciones por sector. En sectores como construcción, hostelería o limpieza es de obligado cumplimiento aunque no seas miembro de la UNIA.",
  },
  {
    pregunta: "¿Puede afiliarse a la UNIA alguien con permiso B?",
    respuesta:
      "Sí, cualquier trabajador en Suiza puede afiliarse independientemente de su permiso de residencia (B, L, C, G). La UNIA protege a todos los trabajadores en territorio suizo, incluidos los fronterizos con permiso G.",
  },
  {
    pregunta: "¿Qué diferencia hay entre la UNIA y otros sindicatos suizos?",
    respuesta:
      "La UNIA es el sindicato más grande (180.000 miembros) y cubre industria, construcción, hostelería, comercio y servicios. Syna (35.000 miembros) tiene orientación cristiana. El Kaufmännischer Verband está especializado en empleados de oficina. Transfair se centra en el sector público. La UNIA es la opción más completa para trabajadores manuales y de servicios.",
  },
];

const howToSteps = [
  {
    name: "Reúne tu información",
    text: "Ten a mano tu nombre completo, dirección en Suiza, número de AHV (seguridad social), empleador actual y salario bruto mensual.",
  },
  {
    name: "Accede al formulario online",
    text: "Ve a unia.ch y haz clic en 'Mitglied werden' (Hacerse miembro). Está disponible en alemán, francés e italiano.",
  },
  {
    name: "Completa el formulario",
    text: "Indica tu sector laboral, cantón de trabajo y salario. La cuota se calcula automáticamente (~1% del salario bruto).",
  },
  {
    name: "Confirma por email",
    text: "Recibirás un email de confirmación con tu número de miembro. Guárdalo: lo necesitarás para cualquier consulta.",
  },
  {
    name: "Espera 3 meses si ya tienes un conflicto",
    text: "Para problemas laborales preexistentes hay un período de espera de 3 meses. Para situaciones nuevas la protección es inmediata.",
  },
];

export default function UniaLayout({ children }: { children: React.ReactNode }) {
  const schemas = [
    breadcrumbSchema([
      { name: "Inicio",          url: BASE_URL },
      { name: "Trabajo",         url: `${BASE_URL}/trabajo` },
      { name: "UNIA Suiza",      url: `${BASE_URL}/trabajo/unia` },
    ]),
    faqSchema(faqs),
    howToSchema({
      name: "Cómo afiliarse a la UNIA en Suiza",
      description: "Proceso paso a paso para afiliarte al principal sindicato suizo y proteger tus derechos laborales.",
      steps: howToSteps,
      totalTime: "PT15M",
    }),
    serviceSchema({
      name: "Citas gratuitas con asesores UNIA en español",
      description: "Servicio gratuito de coordinación de citas con asesores sindicales de UNIA para hispanohablantes en Suiza. Asesoramiento laboral, revisión de contratos, defensa ante despidos y reclamaciones salariales.",
      provider: "HispanosEnSuiza",
      serviceType: "LegalService",
      url: `${BASE_URL}/trabajo/unia`,
    }),
  ];

  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      {children}
    </>
  );
}
