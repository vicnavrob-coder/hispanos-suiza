/**
 * latinoamericanos.ts
 * Datos de los principales países latinoamericanos para emigrar a Suiza.
 * Basado en el sistema real suizo de permisos de trabajo para no-UE (contingente anual).
 */

export type Pais = {
  slug: string;
  nombre: string;
  emoji: string;
  poblacionEnSuiza: string;
  nivelDificultad: "alto" | "muy-alto";
  permisoPrincipal: string;
  plazosEstimados: string;
  requisitosClave: string[];
  pasosDetallados: { titulo: string; descripcion: string; duracion: string }[];
  cantonesMasAbiertos: string[];
  profesionesEnDemanda: string[];
  salarioMedioEsperado: string;
  descripcion: string;
  descripcionLarga: string;
  advertencias: string[];
  recursos: { nombre: string; url: string; descripcion: string }[];
  imagen: string;
  keywords: string[];
  faqs: { pregunta: string; respuesta: string }[];
};

export const paises: Pais[] = [
  // ─────────────────────────────────────────
  // COLOMBIA
  // ─────────────────────────────────────────
  {
    slug: "colombia",
    nombre: "Colombia",
    emoji: "🇨🇴",
    poblacionEnSuiza: "~28.000 residentes",
    nivelDificultad: "muy-alto",
    permisoPrincipal: "Permiso de trabajo B (contingente anual)",
    plazosEstimados: "4–8 meses desde solicitud empresarial",
    requisitosClave: [
      "Oferta de trabajo de empresa suiza registrada",
      "El empleador debe demostrar que no encontró candidato en Suiza ni en la UE/AELC",
      "Título universitario o formación profesional reconocida (equivalencia)",
      "Sin antecedentes penales (apostillado)",
      "Certificado médico de algunos cantones",
      "Seguro de salud contratado desde el primer día de residencia",
    ],
    pasosDetallados: [
      {
        titulo: "Encontrar empresa suiza dispuesta a patrocinar",
        descripcion:
          "La empresa suiza debe querer contratarte y estar dispuesta a gestionar el permiso. Sin oferta firme, el proceso no puede iniciarse. Busca en portales como jobs.ch, LinkedIn Suiza, Indeed.ch. Sectores con más apertura: hostelería de lujo, construcción especializada, cuidados de salud.",
        duracion: "1–6 meses (variable)",
      },
      {
        titulo: "Empresa solicita el permiso al cantón",
        descripcion:
          "Una vez aceptado el candidato, la empresa presenta la solicitud a la Oficina de Trabajo Cantonal (AWA o equivalente). Debe justificar que hizo una búsqueda exhaustiva en el mercado local y europeo sin éxito. El cantón verifica que la cuota anual disponible no está agotada.",
        duracion: "4–12 semanas",
      },
      {
        titulo: "Aprobación cantonal y federal (SEM)",
        descripcion:
          "Si el cantón aprueba, la solicitud pasa a la Secretaría de Estado de Migraciones (SEM) para validación federal. Es la instancia que emite la autorización formal. Pueden solicitar documentación adicional.",
        duracion: "2–6 semanas adicionales",
      },
      {
        titulo: "Solicitud de visado en la Embajada suiza en Colombia",
        descripcion:
          "Con la autorización del SEM, solicitas el visado nacional (tipo D) en la Embajada de Suiza en Bogotá. Necesitas: autorización SEM, contrato de trabajo, pasaporte vigente, fotos, seguro de salud y el formulario de solicitud.",
        duracion: "2–4 semanas",
      },
      {
        titulo: "Llegada y registro en el municipio suizo",
        descripcion:
          "Al llegar a Suiza tienes 14 días para registrarte en la Einwohnerkontrolle (control de residentes) de tu municipio. Recibes el permiso físico (tarjeta B). A partir de aquí debes contratar el seguro de salud obligatorio (KVG/LAMal) si no lo tenías.",
        duracion: "1–2 semanas tras llegada",
      },
      {
        titulo: "Renovación y camino hacia la estabilidad",
        descripcion:
          "El permiso B inicial suele ser de 1 año, renovable anualmente mientras mantengas el empleo. Tras 5 años continuados puedes solicitar el permiso C (establecimiento), que es casi equivalente a ser residente permanente.",
        duracion: "A partir del 5º año",
      },
    ],
    cantonesMasAbiertos: ["Zúrich", "Vaud", "Ginebra", "Aargau", "Berna"],
    profesionesEnDemanda: [
      "Cocinero/chef (hostelería de lujo)",
      "Auxiliar de enfermería y cuidadores",
      "Técnico de construcción y obras",
      "Desarrollador de software (perfil senior)",
      "Ingeniero industrial",
      "Personal de limpieza y mantenimiento (grandes hoteles)",
    ],
    salarioMedioEsperado: "3.800–5.500 CHF brutos/mes según sector",
    descripcion:
      "Colombia es el país latinoamericano con más residentes en Suiza (~28.000). Fuerte presencia en hostelería, cuidados y construcción. El proceso requiere una empresa suiza que patrocine el permiso dentro del contingente anual.",
    descripcionLarga: `Colombia es, con diferencia, el país latinoamericano mejor representado en Suiza. Con cerca de 28.000 residentes registrados, la comunidad colombiana lleva décadas asentada y tiene una presencia notable en cantones como Vaud, Ginebra y Zúrich. Esta diáspora establecida es una ventaja real: hay redes de apoyo, grupos de WhatsApp activos y asociaciones culturales que pueden ayudarte en los primeros meses.

El proceso para emigrar desde Colombia a Suiza es, técnicamente, uno de los más exigentes del mundo desarrollado. Suiza no es miembro de la UE y gestiona la inmigración de países terceros mediante un sistema de contingentes anuales: cada año se asigna un número fijo de nuevos permisos de trabajo por cantón, y una vez agotados, no hay más plazas hasta enero siguiente. Esto significa que incluso con una oferta de trabajo en mano, puede que tengas que esperar.

El sector que más colombianos absorbe es la hostelería de alto nivel. Suiza tiene una industria hotelera y gastronómica de categoría mundial —especialmente en los Alpes y en ciudades como Ginebra, Lausana o St. Moritz— y una demanda constante de cocineros, pasteleros, camareros y personal de sala con experiencia. Si tienes formación y experiencia en hostelería, tienes una ventaja real. También hay demanda en el sector del cuidado de mayores y en la construcción, aunque en este último los requerimientos de titulación formal son más exigentes.

Económicamente, incluso los salarios más bajos del mercado suizo superan ampliamente lo que se gana en Colombia. Un auxiliar de hostelería puede ganar entre 3.500 y 4.500 CHF brutos al mes, lo que después de impuestos y cotizaciones sociales deja un neto de 2.800–3.600 CHF. Los gastos de vida en Suiza son elevados, especialmente el alquiler (1.500–2.500 CHF para un estudio), pero la capacidad de ahorro es real si se gestiona bien.`,
    advertencias: [
      "No pagues a ningún intermediario que prometa «conseguirte» el permiso — el proceso lo gestiona exclusivamente la empresa suiza y las autoridades. Las estafas de visado suizo desde Colombia son frecuentes.",
      "No viajes a Suiza con visado de turista esperando encontrar trabajo allí — es ilegal trabajar con visado de turista y puede resultar en expulsión y veto de entrada.",
      "El contingente anual se agota rápido en cantones pequeños. Si la empresa está en un cantón con pocas plazas, el proceso puede bloquearse aunque todo lo demás esté en orden.",
      "La equivalencia de títulos universitarios colombianos no es automática. Algunos sectores regulados (enfermería, ingeniería) requieren un proceso formal de reconocimiento que puede tardar meses.",
      "No confundas el permiso B (trabajo) con la reagrupación familiar — esta última tiene su propio proceso y requiere demostrar ingresos suficientes.",
    ],
    recursos: [
      {
        nombre: "Embajada de Suiza en Colombia",
        url: "https://www.eda.admin.ch/bogota",
        descripcion: "Solicitud de visado nacional, información oficial de requisitos y citas consulares.",
      },
      {
        nombre: "SEM — Secretaría de Estado de Migraciones (Suiza)",
        url: "https://www.sem.admin.ch",
        descripcion: "Portal oficial suizo para permisos de residencia y trabajo. Estadísticas de contingentes.",
      },
      {
        nombre: "ch.ch — Portal oficial de Suiza",
        url: "https://www.ch.ch/es/trabajar-en-suiza/",
        descripcion: "Guía oficial en español sobre trabajar en Suiza para ciudadanos de terceros países.",
      },
      {
        nombre: "Cancillería de Colombia — Trámites en el exterior",
        url: "https://www.cancilleria.gov.co",
        descripcion: "Apostilla de documentos, antecedentes penales para el exterior y registro consular.",
      },
    ],
    imagen:
      "https://images.unsplash.com/photo-1622737133809-d95047b9e673?w=1200&q=85&auto=format&fit=crop",
    keywords: [
      "emigrar a suiza desde colombia",
      "colombianos en suiza",
      "permiso de trabajo suiza colombia",
      "visa suiza para colombianos",
      "trabajar en suiza desde colombia",
      "visado suiza colombiano",
      "proceso emigrar suiza colombia 2026",
    ],
    faqs: [
      {
        pregunta: "¿Puedo ir a Suiza a buscar trabajo como turista y luego regularizarme?",
        respuesta:
          "No. Los ciudadanos colombianos necesitan un visado Schengen para entrar como turistas, pero trabajar con visado de turista es ilegal. El permiso de trabajo debe gestionarse desde Colombia, antes de entrar. Si te descubren trabajando sin permiso, puedes ser expulsado y vetado de entrada durante años.",
      },
      {
        pregunta: "¿Cuánto tiempo tarda todo el proceso desde que encuentro trabajo hasta que llego a Suiza?",
        respuesta:
          "El proceso completo suele durar entre 4 y 8 meses desde que la empresa inicia la solicitud. El cuello de botella principal es la aprobación cantonal (que depende de la disponibilidad de contingente) y la emisión del visado en Bogotá.",
      },
      {
        pregunta: "¿Necesito hablar alemán, francés o italiano para trabajar en Suiza?",
        respuesta:
          "Depende del cantón y el sector. En hostelería de lujo (donde hay mucho colombiano) el inglés es frecuentemente suficiente, especialmente en zonas turísticas. Pero aprender el idioma local (alemán en el 65% del país, francés en el 20%) mejora enormemente tus perspectivas laborales y tu integración.",
      },
      {
        pregunta: "¿Puedo traer a mi familia?",
        respuesta:
          "Sí, mediante la reagrupación familiar. Una vez tengas el permiso B y puedas demostrar ingresos suficientes para mantener a tu familia (la autoridad cantonal evalúa si el salario cubre los gastos sin depender de ayudas sociales), puedes solicitarla. El proceso suele tardar 2–4 meses adicionales.",
      },
    ],
  },

  // ─────────────────────────────────────────
  // MÉXICO
  // ─────────────────────────────────────────
  {
    slug: "mexico",
    nombre: "México",
    emoji: "🇲🇽",
    poblacionEnSuiza: "~8.000 residentes",
    nivelDificultad: "alto",
    permisoPrincipal: "Permiso de trabajo B (contingente) o L (estacional)",
    plazosEstimados: "3–7 meses desde solicitud",
    requisitosClave: [
      "Oferta de trabajo de empresa u organización suiza",
      "Demostración de búsqueda fallida en mercado local y europeo",
      "Título universitario o certificación técnica avanzada reconocida",
      "Sin antecedentes penales (con apostilla)",
      "Contrato de trabajo firmado antes del visado",
      "Seguro médico privado válido en Suiza",
    ],
    pasosDetallados: [
      {
        titulo: "Obtener oferta de trabajo en Suiza",
        descripcion:
          "El perfil mexicano más demandado en Suiza es el de profesional altamente cualificado: tech, organismos internacionales, finanzas, investigación. Busca en portales especializados como jobs.ch, LinkedIn Switzerland, Indeed.ch y los portales de empleo de la ONU/OMS (para Ginebra). Muchos mexicanos entran vía organismos internacionales o empresas multinacionales con sede suiza.",
        duracion: "1–6 meses",
      },
      {
        titulo: "Empresa o institución solicita permiso al cantón",
        descripcion:
          "El empleador inicia el proceso ante la Autoridad Cantonal de Migración. Debe adjuntar el contrato propuesto, el CV del candidato y la justificación de por qué no se encontró candidato en el mercado europeo. Para perfiles altamente especializados (tech senior, ciencia, diplomacia), la aprobación suele ser más rápida.",
        duracion: "3–8 semanas",
      },
      {
        titulo: "Aprobación del SEM (Secretaría de Estado de Migraciones)",
        descripcion:
          "La solicitud cantonal sube al SEM federal para autorización definitiva. Esta etapa puede implicar solicitud de documentos adicionales.",
        duracion: "2–5 semanas",
      },
      {
        titulo: "Solicitud de visado en Embajada suiza en México",
        descripcion:
          "Con la autorización SEM, solicitas el visado D (nacional) en la Embajada de Suiza en Ciudad de México. Documentos: autorización SEM original, pasaporte vigente mínimo 6 meses, contrato, fotos, formulario de solicitud y seguro de salud.",
        duracion: "2–4 semanas",
      },
      {
        titulo: "Llegada a Suiza y registro municipal",
        descripcion:
          "Tienes 14 días para registrarte en el Einwohnerkontrolle del municipio. Recibes el permiso físico. Contrata el seguro de salud obligatorio (Krankenkasse) antes de que expire el seguro temporal.",
        duracion: "Primera semana",
      },
      {
        titulo: "Integración y renovación anual",
        descripcion:
          "El permiso B se renueva anualmente mientras mantengas el empleo. Algunos cantones exigen prueba de asistencia a cursos de idioma. Tras 5 años obtienes el permiso C.",
        duracion: "Renovación anual",
      },
    ],
    cantonesMasAbiertos: ["Ginebra", "Zúrich", "Vaud", "Basilea-Ciudad", "Berna"],
    profesionesEnDemanda: [
      "Desarrollador de software y data scientist",
      "Funcionario o técnico de organismos internacionales (ONU, OMS, CICR)",
      "Investigador y docente universitario",
      "Gestor financiero y auditor",
      "Especialista en marketing digital",
      "Consultor de gestión y estrategia",
    ],
    salarioMedioEsperado: "5.500–9.000 CHF brutos/mes (perfil profesional)",
    descripcion:
      "México tiene una comunidad pequeña pero muy cualificada en Suiza (~8.000). Fuerte presencia en organismos internacionales de Ginebra, sector tech de Zúrich y entornos académicos. El proceso para perfiles cualificados es relativamente más ágil.",
    descripcionLarga: `La comunidad mexicana en Suiza es relativamente pequeña en número —unas 8.000 personas— pero con un perfil particularmente cualificado. Ginebra concentra la mayor parte gracias a los organismos internacionales: la ONU, la OMS, la OMC, la UNCTAD y decenas de ONGs internacionales tienen su sede allí y contratan regularmente perfiles latinoamericanos con inglés y español nativos. México tiene una tradición diplomática y multilateral muy sólida, y muchos mexicanos llegan a Suiza inicialmente en misiones diplomáticas o como técnicos de agencias onusianas.

Zúrich atrae al perfil tech y financiero. Las empresas como Google, UBS, Credit Suisse, Zurich Insurance y cientos de fintech y startups buscan talento global, y el perfil de desarrollador senior o analista financiero mexicano (con frecuencia formado en el Tec de Monterrey, la UNAM o con máster en Estados Unidos) es reconocido y valorado.

El sistema de contingentes suizo se aplica igual para México que para cualquier otro país no-UE, pero hay una diferencia práctica importante: cuando el perfil es muy específico y difícil de encontrar en Europa, la autoridad cantonal tiene más margen para aprobar más rápido. Un perfil de ingeniero de machine learning o un investigador con publicaciones en revistas indexadas puede tener el permiso en 8–10 semanas, mientras que un perfil más genérico puede esperar meses.

El idioma no es tan barrera para los mexicanos que llegan a entornos internacionales: en la ONU o en multinacionales, el inglés es el idioma de trabajo. Sin embargo, integrarse en la vida cotidiana suiza —alquiler, sanidad, burocracia— requiere francés (en Ginebra/Vaud) o alemán (en Zúrich/Berna). Las escuelas de idiomas suizas son muy buenas y muchos empleadores grandes pagan cursos de idioma en los primeros meses.`,
    advertencias: [
      "Los organismos internacionales de Ginebra tienen sus propios procesos de contratación y sus empleados reciben un estatuto especial (AT/OI) diferente al permiso B normal. Infórmate bien de qué tipo de contrato te ofrecen.",
      "El costo de vida en Ginebra (donde hay más mexicanos) es el más alto de Suiza. Un salario de CHF 5.000 netos en Ginebra da menos calidad de vida que el mismo salario en Berna o Basilea.",
      "La apostilla de documentos mexicanos puede tardar semanas — empieza el proceso con antelación. Necesitarás al menos el acta de nacimiento y el certificado de antecedentes penales de la FGR.",
      "No confundas el visado Schengen de turista (90 días) con el permiso de trabajo. Son trámites completamente diferentes.",
      "Si llegas vía organismo internacional, el seguro de salud puede ser el del organismo (distinto al Krankenkasse obligatorio). Verifica con tu empleador cuál aplica.",
    ],
    recursos: [
      {
        nombre: "Embajada de Suiza en México",
        url: "https://www.eda.admin.ch/mexico",
        descripcion: "Solicitud de visado nacional, información sobre permisos de trabajo y citas consulares.",
      },
      {
        nombre: "SEM — Secretaría de Estado de Migraciones (Suiza)",
        url: "https://www.sem.admin.ch",
        descripcion: "Portal oficial suizo. Estadísticas de contingentes y formularios oficiales.",
      },
      {
        nombre: "Portal de empleo de Naciones Unidas — Ginebra",
        url: "https://careers.un.org",
        descripcion: "Vacantes en todos los organismos de la ONU con sede en Ginebra.",
      },
      {
        nombre: "SRE México — Apostilla y documentos",
        url: "https://www.gob.mx/sre",
        descripcion: "Información sobre apostillado de documentos mexicanos para uso en el extranjero.",
      },
    ],
    imagen:
      "https://images.unsplash.com/photo-1518638150340-f706e86654de?w=1200&q=85&auto=format&fit=crop",
    keywords: [
      "emigrar a suiza desde mexico",
      "mexicanos en suiza",
      "permiso de trabajo suiza mexico",
      "visa suiza para mexicanos",
      "trabajar en suiza desde mexico",
      "vivir en suiza siendo mexicano",
      "suiza organismos internacionales mexico",
    ],
    faqs: [
      {
        pregunta: "¿Los mexicanos en la ONU en Ginebra necesitan el mismo permiso de trabajo?",
        respuesta:
          "No exactamente. Los empleados de organismos internacionales (ONU, OMS, OMC...) tienen un estatuto especial llamado AT/OI (Agentes y Titulares de Organismos Internacionales). No cuentan dentro del contingente de permisos B y el proceso lo gestiona el propio organismo. Sin embargo, los familiares que quieran trabajar localmente sí necesitan tramitar permiso ordinario.",
      },
      {
        pregunta: "¿Qué idioma necesito para trabajar en Ginebra?",
        respuesta:
          "En entornos internacionales (ONU, multinacionales) el inglés es el idioma de trabajo. Para la vida cotidiana y trabajos locales necesitas francés. Ginebra es la ciudad más francófona de Suiza y la más parecida a una metrópolis latinoamericana en cuanto a ambiente y gastronomía.",
      },
      {
        pregunta: "¿El título universitario mexicano es válido en Suiza?",
        respuesta:
          "Suiza no tiene un sistema de reconocimiento automático de títulos de países no-UE. Para profesiones reguladas (medicina, enfermería, derecho, ingeniería de obras) necesitas un proceso formal de reconocimiento ante la autoridad competente. Para profesiones no reguladas (tech, finanzas, marketing), el empleador evalúa directamente el título — en la práctica, los títulos de universidades mexicanas reconocidas son bien valorados.",
      },
      {
        pregunta: "¿Puedo hacer home office desde México para una empresa suiza?",
        respuesta:
          "Sí, es posible contractualmente, pero no te da derecho a residir en Suiza. Si quieres vivir en Suiza, necesitas el permiso de trabajo y residencia. Trabajar en remoto desde México para una empresa suiza es una situación laboral diferente, sujeta a la legislación laboral y fiscal mexicana.",
      },
    ],
  },

  // ─────────────────────────────────────────
  // VENEZUELA
  // ─────────────────────────────────────────
  {
    slug: "venezuela",
    nombre: "Venezuela",
    emoji: "🇻🇪",
    poblacionEnSuiza: "~15.000 residentes",
    nivelDificultad: "muy-alto",
    permisoPrincipal: "Permiso de trabajo B (contingente anual)",
    plazosEstimados: "4–9 meses desde solicitud empresarial",
    requisitosClave: [
      "Oferta de trabajo de empresa suiza registrada",
      "Documentación completa y apostillada (Venezuela tiene limitaciones con apostilla)",
      "Título universitario o formación técnica con reconocimiento",
      "Antecedentes penales del CICPC y del Ministerio Público venezolano",
      "Pasaporte vigente (factor crítico: pasaportes venezolanos con frecuentes problemas de renovación)",
      "Seguro médico antes del visado",
    ],
    pasosDetallados: [
      {
        titulo: "Resolver la documentación venezolana con antelación",
        descripcion:
          "Este es el paso más crítico para venezolanos. El pasaporte venezolano tiene problemas sistémicos de renovación y puede tardar meses en obtenerse. Los antecedentes penales del CICPC deben apostillarse. Empieza SIEMPRE por la documentación antes de buscar trabajo — es el cuello de botella real.",
        duracion: "2–6 meses (variable)",
      },
      {
        titulo: "Obtener oferta de trabajo",
        descripcion:
          "Venezuela tiene una diáspora global reciente y muy cualificada. Muchos venezolanos llegan a Suiza con formación en ingeniería de petróleos, medicina, derecho o finanzas. Usa esa formación: Suiza tiene demanda de ingenieros, médicos y perfiles técnicos. También hay demanda en hostelería y cuidados.",
        duracion: "1–6 meses",
      },
      {
        titulo: "Empresa solicita permiso cantonal",
        descripcion:
          "La empresa suiza inicia el proceso ante la autoridad cantonal. Importante: como venezolano probablemente ya estés en un tercer país (Colombia, Perú, Chile, España) — informa a la empresa de dónde residirás durante el proceso, ya que el visado se solicita en el consulado suizo del país donde resides legalmente.",
        duracion: "4–10 semanas",
      },
      {
        titulo: "Aprobación SEM",
        descripcion:
          "Validación federal del permiso. Para venezolanos pueden surgir preguntas adicionales sobre la situación del país de origen — es un trámite estándar.",
        duracion: "2–5 semanas",
      },
      {
        titulo: "Solicitud de visado en el consulado suizo correspondiente",
        descripcion:
          "Si resides en Venezuela: Embajada suiza en Caracas. Si estás en otro país: el consulado suizo del país donde tienes residencia legal. La embajada en Caracas opera con cita previa y tiempos variables.",
        duracion: "2–5 semanas",
      },
      {
        titulo: "Llegada y registro en Suiza",
        descripcion:
          "Registro municipal en 14 días. Contratación del Krankenkasse. Si tienes familia en Venezuela, el proceso de reagrupación es separado y puede complicarse por la situación documental venezolana.",
        duracion: "Primera semana",
      },
    ],
    cantonesMasAbiertos: ["Ginebra", "Zúrich", "Vaud", "Valais", "Tesino"],
    profesionesEnDemanda: [
      "Ingeniero de petróleo y gas (nicho muy específico)",
      "Médico y profesional sanitario",
      "Ingeniero de software y sistemas",
      "Economista y analista financiero",
      "Abogado con especialización internacional",
      "Cocinero y personal de hostelería",
    ],
    salarioMedioEsperado: "4.200–7.500 CHF brutos/mes según perfil",
    descripcion:
      "Venezuela tiene una diáspora reciente y muy cualificada en Suiza (~15.000). La crisis venezolana ha expulsado un talento enorme que Suiza absorbe cuando hay oferta de trabajo. La principal barrera es la documentación venezolana, no el proceso suizo en sí.",
    descripcionLarga: `La emigración venezolana a Suiza es un fenómeno reciente y acelerado. En menos de una década, la comunidad venezolana en Suiza ha crecido hasta alcanzar unos 15.000 residentes, con una concentración notable en Ginebra (atractivo por los organismos internacionales y el ambiente francófono), Zúrich y el cantón de Vaud. Esta emigración es, en términos de perfil, una de las más cualificadas: venezolanos con carreras universitarias completas, muchos con posgrados, que encontraron en la crisis de su país el impulso para buscar oportunidades en el exterior.

El proceso para llegar a Suiza desde Venezuela tiene una particularidad importante: la documentación venezolana. Mientras que para otros latinoamericanos el principal cuello de botella es el contingente suizo, para venezolanos hay un problema previo — el pasaporte venezolano. Renovarlo desde Venezuela puede tardar entre 3 y 18 meses, con costes elevados y procesos burocráticos complejos. Si estás en otro país (Colombia, Perú, Chile, España, que son los principales destinos intermedios de la diáspora venezolana), verifica qué opciones tienes a través del consulado venezolano del país donde resides.

En cuanto al mercado laboral suizo, hay sectores con demanda específica de perfiles venezolanos. El sector energético (aunque Suiza no extrae petróleo, hay muchas empresas de trading y tecnología energética con sede en Ginebra y Zúrich) valora ingenieros de petróleos. El sector sanitario tiene escasez crónica de médicos y enfermeros cualificados — el reconocimiento del título médico venezolano es un proceso largo pero posible. Los perfiles de ingeniería de software, economía y análisis financiero se mueven bien en el mercado suizo si van acompañados de inglés fluido.

Una ventaja que los venezolanos han ido construyendo: la red. La comunidad venezolana en Suiza es muy activa en redes sociales, con grupos de WhatsApp y Telegram específicos para venezolanos en cada cantón. El boca a boca funciona — empresas que han tenido buenas experiencias con un trabajador venezolano suelen ser más abiertas a contratar a otro.`,
    advertencias: [
      "El pasaporte venezolano es el problema más frecuente. Empieza el proceso de renovación con meses de antelación, incluso antes de tener oferta de trabajo. Sin pasaporte vigente no hay visado.",
      "Si estás en tránsito en otro país (Colombia, Perú, España), el visado suizo lo debes solicitar en el consulado suizo del país donde tienes residencia legal o estatus migratorio regularizado — no en el de Venezuela si no resides allí.",
      "El reconocimiento del título médico venezolano en Suiza es un proceso separado que gestiona la Cruz Roja Suiza (SRK) y tarda entre 12 y 24 meses. No cuentas con el título reconocido desde el primer día.",
      "Algunas empresas suizas son más cautelosas por la situación en Venezuela — prepara tu documentación de forma impecable y ten referencias profesionales verificables.",
      "Las estafas de visado dirigidas a venezolanos son muy frecuentes. Desconfía de cualquier persona o agencia que pida dinero por adelantado para «gestionar» tu visado.",
    ],
    recursos: [
      {
        nombre: "Embajada de Suiza en Venezuela",
        url: "https://www.eda.admin.ch/caracas",
        descripcion: "Información de visados y permisos de trabajo. Verifica horarios y disponibilidad de citas.",
      },
      {
        nombre: "SEM — Secretaría de Estado de Migraciones",
        url: "https://www.sem.admin.ch",
        descripcion: "Portal oficial suizo de migraciones. Formularios y requisitos actualizados.",
      },
      {
        nombre: "SRK — Reconocimiento de títulos sanitarios",
        url: "https://www.redcross.ch/es/ayuda/reconocimiento-de-diplomas",
        descripcion: "Cruz Roja Suiza: proceso de reconocimiento de títulos de médicos, enfermeros y otros sanitarios.",
      },
      {
        nombre: "SAIME — Pasaportes venezolanos",
        url: "https://saime.gob.ve",
        descripcion: "Información oficial para renovación de pasaporte venezolano desde el exterior.",
      },
    ],
    imagen:
      "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=1200&q=85&auto=format&fit=crop",
    keywords: [
      "emigrar a suiza desde venezuela",
      "venezolanos en suiza",
      "permiso de trabajo suiza venezolanos",
      "visa suiza para venezolanos",
      "trabajar en suiza venezuela",
      "vivir en suiza siendo venezolano",
      "pasaporte venezolano visa suiza",
    ],
    faqs: [
      {
        pregunta: "¿Puedo solicitar el visado suizo si estoy viviendo en Colombia o Perú de forma temporal?",
        respuesta:
          "Depende de tu situación migratoria en ese país. Generalmente, debes solicitar el visado en el consulado suizo del país donde tienes residencia legal. Si tienes residencia temporal regularizada en Colombia o Perú, ese es el consulado que debes contactar. Si no tienes estatus migratorio regularizado, la situación es más compleja — consulta directamente con el consulado.",
      },
      {
        pregunta: "¿Cuánto tarda renovar el pasaporte venezolano?",
        respuesta:
          "Varía enormemente. En Venezuela directamente puede tardar entre 6 meses y 2 años. Desde consulados venezolanos en el exterior (especialmente en Panamá, Colombia o España) el proceso suele ser más ágil pero también tiene esperas. Empieza el trámite lo antes posible — es el factor más impredecible de todo el proceso.",
      },
      {
        pregunta: "¿Los médicos venezolanos pueden ejercer en Suiza?",
        respuesta:
          "Sí, pero necesitan el reconocimiento formal del título, que en Suiza gestiona la Cruz Roja Suiza (SRK). El proceso implica verificación de equivalencias y puede requerir un período de práctica supervisada. El proceso tarda entre 12 y 24 meses. Sin embargo, muchos médicos venezolanos trabajan en Suiza primero en roles auxiliares mientras tramitan el reconocimiento.",
      },
      {
        pregunta: "¿Hay ayudas o programas especiales para venezolanos en Suiza?",
        respuesta:
          "Suiza no tiene un programa de asilo o protección temporal específico para venezolanos similar al que existe en algunos países de la UE. El proceso es el estándar de permiso de trabajo. Aunque el ACNUR tiene sede en Ginebra, esto no facilita directamente los permisos de trabajo. La vía principal sigue siendo la oferta de trabajo de una empresa suiza.",
      },
    ],
  },

  // ─────────────────────────────────────────
  // ARGENTINA
  // ─────────────────────────────────────────
  {
    slug: "argentina",
    nombre: "Argentina",
    emoji: "🇦🇷",
    poblacionEnSuiza: "~20.000 residentes",
    nivelDificultad: "muy-alto",
    permisoPrincipal: "Permiso de trabajo B (contingente anual)",
    plazosEstimados: "4–8 meses desde solicitud empresarial",
    requisitosClave: [
      "Oferta de trabajo firmada de empresa suiza",
      "Búsqueda infructuosa en mercado europeo documentada por la empresa",
      "Título universitario o formación técnica reconocida",
      "Antecedentes penales del RENAR y Registro Nacional (apostillados)",
      "Pasaporte argentino vigente (mínimo 6 meses)",
      "Seguro médico internacional antes del visado",
    ],
    pasosDetallados: [
      {
        titulo: "Búsqueda de empleo y oferta formal",
        descripcion:
          "El perfil argentino más valorado en Suiza es el financiero/contable, el de profesiones liberales (arquitectura, derecho, consultoría) y el tech. Muchos argentinos también llegan vía estudio de posgrado, lo que después puede derivar en oferta de trabajo. Usa LinkedIn Switzerland, jobs.ch y redes de la comunidad argentina en Suiza.",
        duracion: "1–6 meses",
      },
      {
        titulo: "La empresa solicita el permiso al cantón",
        descripcion:
          "La empresa presenta la solicitud de autorización previa al trabajo ante la Autoridad Cantonal de Migración, adjuntando contrato propuesto, justificación de búsqueda en mercado local y tu documentación. Los cantones de Ginebra y Zúrich tienen más cuota histórica.",
        duracion: "3–8 semanas",
      },
      {
        titulo: "Aprobación federal (SEM)",
        descripcion:
          "El Secretaría de Estado de Migraciones revisa y aprueba la solicitud cantonal. Es la autorización definitiva que habilita el visado.",
        duracion: "2–5 semanas",
      },
      {
        titulo: "Visado en la Embajada suiza en Buenos Aires",
        descripcion:
          "Con la autorización SEM, solicitas el visado D en la Embajada de Suiza en Buenos Aires. Documentación: autorización SEM, contrato de trabajo, pasaporte, fotos, certificado de antecedentes, formulario de solicitud y seguro de salud. Las citas suelen darse en 2–3 semanas.",
        duracion: "2–4 semanas",
      },
      {
        titulo: "Llegada a Suiza y registro",
        descripcion:
          "Registro municipal obligatorio en los 14 días siguientes a la llegada. Contratación del seguro de salud obligatorio (Krankenkasse). Apertura de cuenta bancaria — en Suiza los bancos son rigurosos con la documentación de nuevos residentes.",
        duracion: "Primera semana",
      },
      {
        titulo: "Renovación y permiso C",
        descripcion:
          "El permiso B se renueva anualmente. Tras 5 años consecutivos con permiso válido puedes solicitar el C (establezimiento). Los argentinos con doble ciudadanía italiana o española acceden a un proceso diferente (libre circulación UE) que es mucho más sencillo.",
        duracion: "Renovación anual, C a los 5 años",
      },
    ],
    cantonesMasAbiertos: ["Ginebra", "Zúrich", "Vaud", "Basilea-Ciudad", "Zug"],
    profesionesEnDemanda: [
      "Contador y auditor financiero",
      "Abogado especialista en derecho internacional o corporativo",
      "Arquitecto e ingeniero civil",
      "Desarrollador de software (backend, full-stack)",
      "Consultor de gestión y estrategia",
      "Analista de riesgos financieros",
    ],
    salarioMedioEsperado: "5.000–8.500 CHF brutos/mes (perfil profesional)",
    descripcion:
      "Argentina tiene una comunidad histórica y consolidada en Suiza (~20.000). Fuerte presencia en finanzas, profesiones liberales y consultoría. Muchos argentinos llegan vía doble ciudadanía italiana/española, lo que simplifica enormemente el proceso.",
    descripcionLarga: `La comunidad argentina en Suiza tiene una historia larga, que se remonta a las migraciones de los años 60 y 70, con un refuerzo importante durante la crisis de 2001 y de nuevo en los últimos años. Hoy son unos 20.000 argentinos los que residen legalmente en Suiza, con una distribución bastante equilibrada entre Ginebra, Zúrich, Vaud y Basilea.

Una característica única de la emigración argentina a Suiza —y a Europa en general— es el acceso a la ciudadanía europea. Una proporción significativa de argentinos tiene abuelos o padres italianos o españoles, lo que les permite obtener la ciudadanía italiana o española por descendencia. Si tienes esa opción, el proceso cambia radicalmente: como ciudadano UE/AELC puedes vivir y trabajar en Suiza con el Acuerdo de Libre Circulación de Personas, que es mucho más sencillo que el contingente para no-UE. Investiga esta posibilidad antes de nada — puede ahorrarte meses de trámites.

Para quienes no tienen ciudadanía europea, el proceso es el estándar de contingente no-UE. El perfil argentino más demandado en Suiza es el profesional cualificado. Los contadores y auditores argentinos —con formación en universidades como UBA, UTDT o UP— son bien valorados en el sector financiero suizo (Zúrich, Zug y Basilea). Los abogados con inglés fluido y especialización en derecho corporativo o internacional tienen oportunidades en los despachos internacionales de Ginebra. Los desarrolladores de software con 5+ años de experiencia y portfolio sólido pueden encontrar trabajo en las empresas tech de Zúrich.

El cantón de Zug merece mención especial: es el cantón con los impuestos más bajos de Suiza y alberga a decenas de holding y empresas de gestión patrimonial. El perfil financiero y legal es muy demandado allí, y Zug es relativamente pequeño, lo que significa que la red de contactos funciona bien.`,
    advertencias: [
      "Si tienes derecho a ciudadanía italiana o española por descendencia, tramítala antes de emigrar a Suiza. Es el camino mucho más sencillo y evita todo el proceso de contingente.",
      "El reconocimiento del título universitario argentino para profesiones reguladas (medicina, farmacia, ingeniería de obras) requiere proceso formal. Para abogacía, el título argentino no habilita directamente a ejercer en Suiza — necesitas revalidación.",
      "La situación fiscal argentina puede generar complicaciones al salir: asegúrate de resolver tu situación impositiva en Argentina antes de emigrar, especialmente si tienes bienes o ingresos en Argentina.",
      "El mercado de alquiler en Ginebra y Zúrich es extremadamente competitivo. Llegar sin piso asegurado es habitual y pueden pasar 2–4 meses hasta encontrar alojamiento permanente. Presupuesta alojamiento temporal (habitación, airbnb corporativo).",
      "No dependas solo de portales de empleo en inglés o español — muchas ofertas en Suiza están en alemán o francés. Aprende a leer ofertas en el idioma local aunque todavía no hables el idioma.",
    ],
    recursos: [
      {
        nombre: "Embajada de Suiza en Argentina",
        url: "https://www.eda.admin.ch/buenosaires",
        descripcion: "Visados, información consular y requisitos para emigrar a Suiza desde Argentina.",
      },
      {
        nombre: "SEM — Migraciones Suiza",
        url: "https://www.sem.admin.ch",
        descripcion: "Portal oficial de migraciones. Contingentes, formularios y estadísticas.",
      },
      {
        nombre: "Registro Nacional de Reincidencia — Argentina",
        url: "https://www.jus.gob.ar/reincidencia",
        descripcion: "Antecedentes penales argentinos para uso en el exterior, con apostilla.",
      },
      {
        nombre: "Consulado Italiano — Ciudadanía por descendencia",
        url: "https://www.esteri.it",
        descripcion: "Si tienes abuelos o bisabuelos italianos, infórmate sobre la ciudadanía italiana jure sanguinis.",
      },
    ],
    imagen:
      "https://images.unsplash.com/photo-1612295025595-5c2b3b07b85e?w=1200&q=85&auto=format&fit=crop",
    keywords: [
      "emigrar a suiza desde argentina",
      "argentinos en suiza",
      "permiso de trabajo suiza argentinos",
      "visa suiza para argentinos",
      "trabajar en suiza argentina",
      "ciudadania italiana argentina suiza",
      "vivir en suiza siendo argentino",
    ],
    faqs: [
      {
        pregunta: "Tengo abuelos italianos. ¿Eso me facilita emigrar a Suiza?",
        respuesta:
          "Enormemente. Si obtienes la ciudadanía italiana (o española), puedes acogerte al Acuerdo de Libre Circulación de Personas entre Suiza y la UE/AELC. Con ese acuerdo, no necesitas el permiso contingentado: puedes entrar a Suiza, buscar trabajo libremente y registrarte con mucho menos burocracia. El proceso de ciudadanía italiana por descendencia tarda entre 1 y 4 años según el consulado, pero vale la pena si planeas una emigración a largo plazo.",
      },
      {
        pregunta: "¿Los títulos universitarios argentinos son válidos en Suiza?",
        respuesta:
          "Para profesiones no reguladas (finanzas, tech, consultoría, marketing), el empleador evalúa el título directamente y los de universidades argentinas reconocidas (UBA, UTDT, Austral, UP) son bien valorados. Para profesiones reguladas (medicina, farmacia, ingeniería de obras civiles, arquitectura con visado de proyectos), se necesita reconocimiento formal ante las autoridades competentes suizas.",
      },
      {
        pregunta: "¿Cuánto cuesta vivir en Suiza para un argentino recién llegado?",
        respuesta:
          "Los gastos fijos mensuales en una ciudad como Zúrich o Ginebra rondan los 3.000–3.800 CHF para una persona: alquiler de estudio (1.500–2.200), seguro de salud (~350–450), comida (~600–800), transporte (~100–150). En ciudades más pequeñas (Berna, Basilea, Lausana) los gastos bajan un 10–20%.",
      },
      {
        pregunta: "¿Puedo trabajar como freelance o autónomo en Suiza?",
        respuesta:
          "El trabajo autónomo en Suiza para no-UE es posible pero más complejo que el empleo por cuenta ajena. Necesitas demostrar que tienes clientes, ingresos suficientes y que tu actividad es viable. El proceso de permiso para autónomos es diferente al de asalariados y la autoridad cantonal tiene más discrecionalidad. Es un camino viable especialmente en tech, diseño y consultoría.",
      },
    ],
  },

  // ─────────────────────────────────────────
  // PERÚ
  // ─────────────────────────────────────────
  {
    slug: "peru",
    nombre: "Perú",
    emoji: "🇵🇪",
    poblacionEnSuiza: "~12.000 residentes",
    nivelDificultad: "muy-alto",
    permisoPrincipal: "Permiso de trabajo B (contingente anual)",
    plazosEstimados: "4–8 meses desde solicitud",
    requisitosClave: [
      "Oferta de trabajo firmada de empresa suiza",
      "Justificación empresarial de búsqueda fallida en mercado local y europeo",
      "Título o certificación técnica con validación",
      "Antecedentes penales del Poder Judicial peruano (apostillados)",
      "Pasaporte peruano vigente",
      "Seguro de salud privado internacional",
    ],
    pasosDetallados: [
      {
        titulo: "Documentación peruana: empezar cuanto antes",
        descripcion:
          "Los antecedentes penales peruanos (del Poder Judicial, la Policía Nacional y el INPE) deben obtenerse, apostillarse y traducirse al alemán, francés o inglés. Este proceso puede tomar 4–8 semanas en Lima. Hazlo en paralelo con la búsqueda de empleo.",
        duracion: "4–8 semanas (en paralelo)",
      },
      {
        titulo: "Búsqueda de empleo en sectores con demanda",
        descripcion:
          "Los sectores con más demanda para peruanos son hostelería de lujo (chefs, pasteleros, personal de sala), cuidados y asistencia personal, construcción y obras, y limpieza industrial. Perú tiene una tradición gastronómica mundial reconocida — un chef peruano con experiencia en cocina de autor tiene excelentes perspectivas en Suiza.",
        duracion: "2–6 meses",
      },
      {
        titulo: "Empresa solicita permiso al cantón",
        descripcion:
          "Una vez la empresa suiza acepta contratarte y confirma que el proceso puede avanzar, presenta la solicitud a la Autoridad Cantonal de Trabajo. El cantón verifica que hay cuota disponible y que la empresa ha buscado en el mercado local sin éxito.",
        duracion: "4–10 semanas",
      },
      {
        titulo: "Aprobación federal SEM",
        descripcion:
          "La Secretaría de Estado de Migraciones da la autorización definitiva. Con esta autorización en mano, el proceso en Perú puede comenzar.",
        duracion: "2–5 semanas",
      },
      {
        titulo: "Visado en Embajada de Suiza en Lima",
        descripcion:
          "La Embajada de Suiza en Lima gestiona las solicitudes de visado para residentes en Perú. Documentos requeridos: autorización SEM, contrato, pasaporte, fotos, antecedentes apostillados, formulario de solicitud y seguro. Solicita cita con antelación.",
        duracion: "2–4 semanas",
      },
      {
        titulo: "Llegada y primeros trámites en Suiza",
        descripcion:
          "Registro municipal en 14 días. Alta en el seguro de salud (Krankenkasse) — obligatorio desde el primer mes de residencia. Apertura de cuenta bancaria. Inscripción en la AHV/AVS (seguro de vejez y supervivencia).",
        duracion: "Primeras 2–3 semanas",
      },
    ],
    cantonesMasAbiertos: ["Vaud", "Ginebra", "Valais", "Graubünden", "Zúrich"],
    profesionesEnDemanda: [
      "Chef y cocinero de alta cocina peruana/internacional",
      "Pastelero y repostero",
      "Auxiliar de enfermería y asistente de personas mayores",
      "Técnico de construcción y albañilería especializada",
      "Personal de limpieza e higiene industrial",
      "Camarero y sumiller",
    ],
    salarioMedioEsperado: "3.500–5.500 CHF brutos/mes según sector",
    descripcion:
      "Perú tiene una comunidad creciente en Suiza (~12.000), especialmente fuerte en hostelería, cuidados y construcción. La gastronomía peruana es mundialmente reconocida, lo que abre puertas en la industria hotelera suiza. El proceso requiere oferta de trabajo y paciencia con los contingentes.",
    descripcionLarga: `La comunidad peruana en Suiza ha crecido de forma constante en los últimos 20 años hasta alcanzar unos 12.000 residentes. La mayor concentración está en los cantones de habla francesa — Vaud, Ginebra, Valais — donde la industria hotelera y turística tiene mayor demanda de mano de obra. Lausana, Montreux, Verbier, Zermatt y Crans-Montana son destinos conocidos dentro de la comunidad peruana en Suiza.

La gastronomía es la puerta de entrada más sólida para peruanos. La cocina peruana es reconocida internacionalmente como una de las más ricas del mundo, y los hoteles de 5 estrellas y los restaurantes de alta cocina en Suiza lo saben. Un chef peruano con experiencia demostrable en cocina de autor, ceviche, nikkei o pastelería tiene un perfil que escasea en el mercado europeo y que justifica la solicitud de un contingente no-UE. Varios restaurantes suizos tienen en su menú productos y técnicas peruanas, y algunos llevan años contratando personal especializado directamente de Lima.

El sector de cuidados es la segunda vía más relevante. Suiza tiene un envejecimiento demográfico acelerado y una demanda crónica de auxiliares de geriatría y asistentes personales de personas mayores. Los cantones de habla francesa (donde muchas peruanas ya tienen redes establecidas) son el punto de entrada más habitual. La titulación en auxiliar de enfermería o cuidados (en Perú es el Técnico en Enfermería) puede validarse en Suiza, aunque puede requerir un período de formación complementario.

La construcción en Suiza es otro sector con demanda. Los especialistas en acabados, alicatado, fontanería o electricidad industrial tienen salarios altos y demanda sostenida, aunque los requerimientos de certificación formal son más estrictos que en hostelería.`,
    advertencias: [
      "El proceso de apostilla en Perú para documentos judiciales puede ser lento. El Poder Judicial y la Policía Nacional tienen sus propios plazos — empieza este trámite antes de tener la oferta de trabajo.",
      "En hostelería, los contratos estacionales (permiso L, de duración fija hasta 12 meses) son habituales. El permiso L no es un camino directo al permiso B — cada temporada puede requerir una nueva solicitud.",
      "Algunos cantones turísticos (Valais, Graubünden) tienen cuotas estacionales adicionales para hostelería, pero estas se agotan muy rápido en primavera. El timing de la solicitud importa.",
      "La reagrupación familiar desde Perú puede complicarse si el titular del permiso tiene aún permiso B de primer año — algunos cantones exigen haber renovado al menos una vez.",
      "Cuidado con agencias de reclutamiento en Lima que cobran comisiones por «colocar» en empresas suizas. Las agencias legítimas no cobran al candidato.",
    ],
    recursos: [
      {
        nombre: "Embajada de Suiza en Perú",
        url: "https://www.eda.admin.ch/lima",
        descripcion: "Solicitud de visados de trabajo, información consular y citas para Lima.",
      },
      {
        nombre: "SEM — Secretaría de Estado de Migraciones",
        url: "https://www.sem.admin.ch",
        descripcion: "Portal oficial suizo. Requisitos, formularios y estadísticas de permisos.",
      },
      {
        nombre: "Poder Judicial del Perú — Antecedentes penales",
        url: "https://www.pj.gob.pe",
        descripcion: "Certificado de antecedentes penales con apostilla para uso en el exterior.",
      },
      {
        nombre: "Cancillería del Perú — Apostilla",
        url: "https://www.gob.pe/mre",
        descripcion: "Trámite de apostilla para documentos peruanos destinados al extranjero.",
      },
    ],
    imagen:
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=1200&q=85&auto=format&fit=crop",
    keywords: [
      "emigrar a suiza desde peru",
      "peruanos en suiza",
      "permiso de trabajo suiza peruanos",
      "visa suiza para peruanos",
      "trabajar en suiza peru",
      "chef peruano suiza",
      "vivir en suiza siendo peruano",
    ],
    faqs: [
      {
        pregunta: "¿Un chef peruano tiene más facilidad para conseguir el permiso?",
        respuesta:
          "Sí, relativamente. La demanda de cocina peruana en Suiza es real y específica, y un perfil de chef con formación y experiencia demostrable en cocina peruana de autor cubre una necesidad que es difícil de encontrar en el mercado europeo. Esto facilita que la empresa justifique ante el cantón la necesidad de contratar fuera de la UE. No es automático, pero el argumento es sólido.",
      },
      {
        pregunta: "¿Qué es el permiso L y en qué se diferencia del B?",
        respuesta:
          "El permiso L (estancia de corta duración) es un permiso de trabajo temporal de hasta 12 meses, renovable una vez por el mismo período. Es habitual en el sector hotelero estacional (temporada de esquí, temporada de verano). El permiso B es de residencia temporal renovable anualmente, sin límite de tiempo mientras mantengas el empleo. Para estabilidad, el objetivo es el permiso B. Después de 5 años de B continuo puedes solicitar el C (establecimiento).",
      },
      {
        pregunta: "¿Cuánto cobra un auxiliar de geriatría peruano en Suiza?",
        respuesta:
          "Un auxiliar de geriatría (Pflegehilfe o aide-soignant en francés) gana entre 3.500 y 4.800 CHF brutos al mes en Suiza, dependiendo del cantón y si es en el sector público o privado. Deducidos impuestos, seguro de salud y cotizaciones sociales, el neto suele ser entre 2.700 y 3.800 CHF. En los cantones de habla francesa los salarios tienden a ser ligeramente superiores.",
      },
      {
        pregunta: "¿Hay comunidad peruana organizada en Suiza?",
        respuesta:
          "Sí. Existen asociaciones culturales peruanas en varios cantones, grupos en redes sociales y eventos gastronómicos y culturales regulares. La Fiestas Patrias del 28 de julio suele congregar a cientos de peruanos en ciudades como Ginebra y Lausana. Estas redes son también redes de empleo informal — muchas oportunidades laborales circulan primero entre la comunidad.",
      },
    ],
  },

  // ─────────────────────────────────────────
  // ECUADOR
  // ─────────────────────────────────────────
  {
    slug: "ecuador",
    nombre: "Ecuador",
    emoji: "🇪🇨",
    poblacionEnSuiza: "~10.000 residentes",
    nivelDificultad: "muy-alto",
    permisoPrincipal: "Permiso de trabajo B (contingente anual)",
    plazosEstimados: "4–8 meses desde solicitud empresarial",
    requisitosClave: [
      "Oferta de trabajo de empresa suiza (condición indispensable)",
      "Documentación completa del empleador (búsqueda fallida en mercado europeo)",
      "Título o certificación técnica con validación suiza",
      "Antecedentes penales del Ministerio del Interior ecuatoriano (apostillados)",
      "Pasaporte ecuatoriano vigente",
      "Seguro de salud internacional vigente",
    ],
    pasosDetallados: [
      {
        titulo: "Obtener los documentos ecuatorianos con apostilla",
        descripcion:
          "Los antecedentes penales emitidos por el Ministerio del Interior del Ecuador deben apostillarse. El proceso puede hacerse presencialmente en Quito o Guayaquil o vía representante. También necesitarás el título universitario o de formación técnica legalizado y apostillado si lo tienes. Empieza con esto en paralelo con la búsqueda de trabajo.",
        duracion: "3–6 semanas",
      },
      {
        titulo: "Búsqueda de empleo",
        descripcion:
          "Los sectores más accesibles para ecuatorianos en Suiza son la construcción (especialmente acabados, yesos, alicatado), la hostelería (cocina y sala), la limpieza industrial y el cuidado de personas mayores. En tech y finanzas también hay demanda si el perfil es senior. Usa portales suizos (jobs.ch, jobup.ch) y la red de la comunidad ecuatoriana ya establecida.",
        duracion: "2–6 meses",
      },
      {
        titulo: "La empresa inicia el proceso de permiso",
        descripcion:
          "Una vez comprometida la empresa, presenta la solicitud de autorización previa al cantón. Debe incluir el contrato propuesto, justificación de la búsqueda fallida en el mercado local y europeo, y tu documentación. El cantón verifica la disponibilidad de cuota.",
        duracion: "4–10 semanas",
      },
      {
        titulo: "Aprobación del SEM federal",
        descripcion:
          "La Secretaría de Estado de Migraciones valida la solicitud cantonal. Con su autorización, el proceso consular puede comenzar.",
        duracion: "2–4 semanas",
      },
      {
        titulo: "Visado en la Embajada suiza en Ecuador",
        descripcion:
          "La Embajada de Suiza en Quito tramita los visados nacionales (tipo D) de trabajo para residentes en Ecuador. Documentos: autorización SEM, contrato de trabajo, pasaporte, fotos, antecedentes apostillados, formulario y seguro de salud. Solicita cita con 3–4 semanas de antelación.",
        duracion: "2–4 semanas",
      },
      {
        titulo: "Llegada, registro y primeros trámites",
        descripcion:
          "Registro municipal obligatorio en 14 días. Alta en el Krankenkasse (seguro obligatorio). Inscripción en la AHV/AVS. Los primeros meses son los más exigentes logísticamente: piso, banco, seguro — todos a la vez.",
        duracion: "Primeras 2–3 semanas",
      },
    ],
    cantonesMasAbiertos: ["Vaud", "Zúrich", "Aargau", "Solothurn", "Ginebra"],
    profesionesEnDemanda: [
      "Técnico de construcción (yesista, alicatador, pintor industrial)",
      "Cocinero y personal de cocina",
      "Auxiliar de geriatría y cuidador/a a domicilio",
      "Técnico de limpieza industrial",
      "Fontanero y técnico de instalaciones",
      "Conductor de maquinaria pesada (con carnet suizo equivalente)",
    ],
    salarioMedioEsperado: "3.500–5.000 CHF brutos/mes según sector",
    descripcion:
      "Ecuador tiene una comunidad de unos 10.000 residentes en Suiza, fuerte en construcción, hostelería y cuidados. El proceso es el estándar de contingente no-UE y requiere una empresa suiza dispuesta a patrocinar. Los cantones de habla alemana (Aargau, Zúrich) tienen más demanda en construcción.",
    descripcionLarga: `La comunidad ecuatoriana en Suiza ronda los 10.000 residentes y tiene una distribución interesante: a diferencia de colombianos o venezolanos que se concentran más en los cantones francófonos, los ecuatorianos tienen una presencia notable en los cantones alemanes industriales como Aargau, Zúrich y Solothurn. Esta distribución refleja en parte el perfil laboral: construcción e industria, más presentes en la Suiza alemana.

La industria de la construcción suiza tiene una demanda estructural de mano de obra especializada que el mercado europeo no puede cubrir completamente. Suiza construye más per cápita que cualquier otro país europeo — infraestructura ferroviaria, túneles, edificios residenciales de alta gama, rehabilitaciones— y necesita constantemente yesistas, pintores industriales, alicatadores, fontaneros y electricistas. El perfil ecuatoriano con formación técnica en estas áreas y experiencia demostrable tiene opciones reales.

En hostelería, aunque la comunidad ecuatoriana es menos numerosa que la peruana o colombiana, hay demanda constante de cocineros y personal de cocina en los grandes hoteles de los Alpes y en las ciudades principales. El sector de cuidados —especialmente asistencia domiciliaria a personas mayores— es otra vía de entrada, sobre todo en los cantones francófonos.

Una particularidad del mercado suizo que conviene conocer: los sueldos en construcción tienen mínimos sectoriales muy altos fijados por convenio colectivo (Gesamtarbeitsvertrag). Un albañil en Suiza puede ganar entre 4.200 y 5.500 CHF brutos mensuales — comparativamente mucho más que en cualquier otro país europeo. Las condiciones laborales también son exigentes en cuanto a seguridad y certificaciones, pero los convenios protegen bien a los trabajadores.`,
    advertencias: [
      "En construcción, los cantones exigen que las certificaciones técnicas sean reconocidas. Un título ecuatoriano de formación técnica en construcción puede necesitar validación. Infórmate con la empresa antes de avanzar.",
      "Los contratos en construcción son frecuentemente por obra — lo que significa que si la obra termina, el contrato puede no renovarse. El camino al permiso B estable es más largo en este sector.",
      "Cuidado con empresas de subcontratación de trabajo en construcción. Algunas prácticas de subcontratación en este sector son abusivas — el permiso de trabajo debe vincularse a la empresa que realmente te emplea, no a una empresa interpuesta.",
      "La apostilla en Ecuador para documentos del Ministerio del Interior puede tardar semanas. No dejes este trámite para el final.",
      "Muchos ecuatorianos llegan a Suiza con visado de reagrupación familiar (como pareja o familiar de alguien ya residente) — este no es el proceso descrito aquí, pero es una vía real si tienes familia en Suiza.",
    ],
    recursos: [
      {
        nombre: "Embajada de Suiza en Ecuador",
        url: "https://www.eda.admin.ch/quito",
        descripcion: "Solicitud de visado de trabajo, información consular para Quito y Guayaquil.",
      },
      {
        nombre: "SEM — Secretaría de Estado de Migraciones",
        url: "https://www.sem.admin.ch",
        descripcion: "Portal oficial suizo. Tipos de permisos, formularios y contingentes actuales.",
      },
      {
        nombre: "Ministerio del Interior Ecuador — Antecedentes",
        url: "https://www.ministeriodegobierno.gob.ec",
        descripcion: "Certificado de antecedentes penales con apostilla para trámites en el exterior.",
      },
      {
        nombre: "Secretaría General de la SENESCYT — Títulos",
        url: "https://www.senescyt.gob.ec",
        descripcion: "Información sobre legalización y apostilla de títulos universitarios ecuatorianos.",
      },
    ],
    imagen:
      "https://images.unsplash.com/photo-1593642702909-dec73df255d7?w=1200&q=85&auto=format&fit=crop",
    keywords: [
      "emigrar a suiza desde ecuador",
      "ecuatorianos en suiza",
      "permiso de trabajo suiza ecuatorianos",
      "visa suiza para ecuatorianos",
      "trabajar en suiza ecuador",
      "construccion suiza ecuatorianos",
      "vivir en suiza siendo ecuatoriano",
    ],
    faqs: [
      {
        pregunta: "¿Es cierto que en construcción los sueldos en Suiza son muy altos?",
        respuesta:
          "Sí. Los convenios colectivos sectoriales en la construcción suiza fijan salarios mínimos muy superiores a la media europea. Un oficial de construcción puede ganar entre 4.200 y 5.500 CHF brutos al mes (3.200–4.300 CHF netos). Es uno de los sectores mejor pagados para trabajadores con formación técnica sin título universitario.",
      },
      {
        pregunta: "¿Puedo llevar a mi familia a Suiza si consigo permiso de trabajo?",
        respuesta:
          "Sí, mediante reagrupación familiar. Después de obtener el permiso B y demostrar que tienes ingresos suficientes para sostener a tu familia (el baremo lo fija el cantón, pero generalmente 4.000–5.000 CHF netos para una familia de 3–4 personas), puedes solicitarla. El proceso tarda 2–4 meses adicionales. Los hijos menores de 18 tienen derecho a escolarización gratuita.",
      },
      {
        pregunta: "¿Hay comunidad ecuatoriana activa en Suiza?",
        respuesta:
          "Sí, especialmente en Zúrich, Aargau y Ginebra. Hay asociaciones culturales, grupos en WhatsApp y Telegram organizados por cantón, y celebraciones de las fiestas nacionales ecuatorianas. Como en el caso de otras comunidades latinas, la red es también una red de empleo — muchas oportunidades laborales circulan primero dentro de la comunidad.",
      },
      {
        pregunta: "¿El proceso es diferente si ya tengo familiares viviendo en Suiza?",
        respuesta:
          "Si tienes familiares con permiso B o C en Suiza (pareja, hijos, padres), puedes solicitar reagrupación familiar en lugar del permiso de trabajo. Este proceso es diferente y en algunos casos más ágil. La reagrupación familiar te da un permiso de residencia que, si después encuentras trabajo, puede convertirse en permiso de trabajo sin tener que usar el contingente.",
      },
    ],
  },
];

export function getPais(slug: string): Pais | undefined {
  return paises.find((p) => p.slug === slug);
}
