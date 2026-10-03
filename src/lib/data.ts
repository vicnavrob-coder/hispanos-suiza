// Datos reales extraídos y verificados — base de conocimiento del proyecto

// ─────────────────────────────────────────────────────────────
// COMPARADOR DE CIUDADES — datos verificados 2026
// ─────────────────────────────────────────────────────────────

export type CiudadData = {
  slug: string;
  nombre: string;
  emoji: string;
  idioma: string;
  region: string;
  sector: string;
  tasa: number;           // tasa impositiva fuente ESTV
  salarioMedio: number;   // CHF/mes bruto
  seguroMedico: number;   // KVG básico CHF/mes adulto
  // Vivienda CHF/mes
  alquiler1HabCentro: number;
  alquiler1HabPeriferia: number;
  habitacionCompartida: number;
  // Día a día CHF
  transporte: number;     // abono mensual transporte público
  alimentacion: number;   // cesta de la compra mensual 1 persona
  restauranteMedio: number; // precio medio menú por persona
  cafe: number;
  ocio: number;           // estimación ocio mensual (gym, salidas)
  // Valoraciones para hispanohablantes (1–5)
  nivelEspanol: number;   // facilidad de encontrar hispanohablantes
  empleabilidad: number;  // facilidad de encontrar trabajo
  calidadVida: number;    // calidad de vida general
  // Info cualitativa
  pros: string[];
  contras: string[];
  // Color identidad
  color: string;
  colorLight: string;
};

export const CIUDADES: CiudadData[] = [
  {
    slug: "zurich",
    nombre: "Zúrich",
    emoji: "🏔️",
    idioma: "Alemán (Zürichdeutsch)",
    region: "Suiza alemana",
    sector: "Tech, banca, seguros, startups",
    tasa: 0.118,
    salarioMedio: 7200,
    seguroMedico: 435,
    alquiler1HabCentro: 2300,
    alquiler1HabPeriferia: 1700,
    habitacionCompartida: 950,
    transporte: 94,
    alimentacion: 600,
    restauranteMedio: 35,
    cafe: 4.8,
    ocio: 400,
    nivelEspanol: 4,
    empleabilidad: 5,
    calidadVida: 5,
    pros: ["Mayor mercado laboral de Suiza", "Comunidad hispanohablante grande", "Transporte público excelente", "Muchas empresas internacionales en inglés"],
    contras: ["La ciudad más cara de Suiza", "Alemán difícil (dialecto)", "Alquiler muy competitivo"],
    color: "#1d4ed8",
    colorLight: "#EFF6FF",
  },
  {
    slug: "ginebra",
    nombre: "Ginebra",
    emoji: "🌊",
    idioma: "Francés",
    region: "Suiza francesa (Romandie)",
    sector: "Org. internacionales, banca privada, lujo, ONG",
    tasa: 0.132,
    salarioMedio: 7500,
    seguroMedico: 510,
    alquiler1HabCentro: 2100,
    alquiler1HabPeriferia: 1600,
    habitacionCompartida: 850,
    transporte: 70,
    alimentacion: 580,
    restauranteMedio: 32,
    cafe: 4.5,
    ocio: 380,
    nivelEspanol: 4,
    empleabilidad: 4,
    calidadVida: 5,
    pros: ["Francés más fácil para hispanohablantes", "Salarios más altos de Suiza", "ONU, OMS y decenas de org. internacionales", "Comunidad latina muy activa"],
    contras: ["Seguro médico más caro de Suiza", "Impuestos altos", "Mercado de pisos muy difícil"],
    color: "#C8102E",
    colorLight: "#FFF1F3",
  },
  {
    slug: "berna",
    nombre: "Berna",
    emoji: "🐻",
    idioma: "Alemán (Berndeutsch)",
    region: "Suiza alemana",
    sector: "Administración pública, IT gubernamental, salud",
    tasa: 0.124,
    salarioMedio: 6600,
    seguroMedico: 400,
    alquiler1HabCentro: 1700,
    alquiler1HabPeriferia: 1300,
    habitacionCompartida: 750,
    transporte: 85,
    alimentacion: 550,
    restauranteMedio: 28,
    cafe: 4.5,
    ocio: 320,
    nivelEspanol: 3,
    empleabilidad: 3,
    calidadVida: 4,
    pros: ["Ciudad más asequible que Zúrich o Ginebra", "Capital federal — estabilidad laboral", "Tamaño manejable, muy habitable", "Naturaleza a 20 minutos"],
    contras: ["Mercado laboral más pequeño", "Menos oportunidades internacionales", "Comunidad hispanohablante pequeña"],
    color: "#b45309",
    colorLight: "#FFFBEB",
  },
  {
    slug: "basilea",
    nombre: "Basilea",
    emoji: "🏛️",
    idioma: "Alemán (Baseldeutsch)",
    region: "Suiza alemana (frontera FR/DE)",
    sector: "Farmacéutica, química, biotecnología (Novartis, Roche)",
    tasa: 0.115,
    salarioMedio: 7000,
    seguroMedico: 370,
    alquiler1HabCentro: 1600,
    alquiler1HabPeriferia: 1200,
    habitacionCompartida: 700,
    transporte: 82,
    alimentacion: 530,
    restauranteMedio: 27,
    cafe: 4.4,
    ocio: 300,
    nivelEspanol: 3,
    empleabilidad: 3,
    calidadVida: 4,
    pros: ["Seguro médico y alquiler más baratos", "Impuestos bajos (mejores de Suiza)", "Frontera — puedes vivir en Francia o Alemania", "Gran sector pharma con contratos internacionales"],
    contras: ["Ciudad pequeña, menos ofertas laborales", "Muy especializada (farma/biotech)", "Poca vida nocturna"],
    color: "#15803d",
    colorLight: "#F0FDF4",
  },
  {
    slug: "lausana",
    nombre: "Lausana",
    emoji: "🎓",
    idioma: "Francés",
    region: "Suiza francesa (Vaud)",
    sector: "EPFL/investigación, startups tech, deportes internacionales (COI)",
    tasa: 0.128,
    salarioMedio: 6800,
    seguroMedico: 490,
    alquiler1HabCentro: 1800,
    alquiler1HabPeriferia: 1400,
    habitacionCompartida: 780,
    transporte: 75,
    alimentacion: 560,
    restauranteMedio: 29,
    cafe: 4.5,
    ocio: 340,
    nivelEspanol: 4,
    empleabilidad: 3,
    calidadVida: 5,
    pros: ["Francés — más fácil para hispanohablantes", "Junto al lago Lemán, calidad de vida alta", "EPFL — hub de startups y tech", "Más joven y dinámica que Ginebra"],
    contras: ["Ciudad en cuesta — cansada para el día a día", "Mercado laboral más pequeño que Zúrich/Ginebra", "Cara para su tamaño"],
    color: "#7c3aed",
    colorLight: "#F5F3FF",
  },
  {
    slug: "lugano",
    nombre: "Lugano",
    emoji: "☀️",
    idioma: "Italiano",
    region: "Ticino (Suiza italiana)",
    sector: "Finanzas, turismo, comercio, servicios",
    tasa: 0.121,
    salarioMedio: 5800,
    seguroMedico: 350,
    alquiler1HabCentro: 1500,
    alquiler1HabPeriferia: 1100,
    habitacionCompartida: 680,
    transporte: 65,
    alimentacion: 500,
    restauranteMedio: 26,
    cafe: 4.2,
    ocio: 280,
    nivelEspanol: 5,
    empleabilidad: 2,
    calidadVida: 5,
    pros: ["El italiano es lo más cercano al español", "La ciudad más asequible", "Clima mediterráneo — inviernos suaves", "Comunidad italiana muy similar culturalmente"],
    contras: ["Salarios más bajos", "Mercado laboral pequeño y limitado", "Aislada geográficamente del resto de Suiza"],
    color: "#0891b2",
    colorLight: "#ECFEFF",
  },
  {
    slug: "lucerna",
    nombre: "Lucerna",
    emoji: "🌉",
    idioma: "Alemán (Luzernerdeutsch)",
    region: "Suiza central",
    sector: "Turismo, hostelería, finanzas, servicios",
    tasa: 0.124,
    salarioMedio: 6400,
    seguroMedico: 395,
    alquiler1HabCentro: 1650,
    alquiler1HabPeriferia: 1280,
    habitacionCompartida: 720,
    transporte: 80,
    alimentacion: 540,
    restauranteMedio: 28,
    cafe: 4.5,
    ocio: 310,
    nivelEspanol: 3,
    empleabilidad: 3,
    calidadVida: 5,
    pros: ["Ciudad junto al lago — calidad de vida altísima", "Más asequible que Zúrich o Ginebra", "Centro geográfico de Suiza — fácil viajar a todas partes", "Mucha demanda en hostelería y turismo"],
    contras: ["Mercado laboral limitado vs Zúrich", "Turismo masivo en verano", "Alemán difícil (dialecto central)"],
    color: "#0369a1",
    colorLight: "#F0F9FF",
  },
  {
    slug: "zug",
    nombre: "Zug",
    emoji: "💼",
    idioma: "Alemán (Zuger Deutsch)",
    region: "Cantón Zug (Suiza central)",
    sector: "Finanzas, holding companies, crypto, farmacéutica",
    tasa: 0.115,
    salarioMedio: 8200,
    seguroMedico: 388,
    alquiler1HabCentro: 2400,
    alquiler1HabPeriferia: 1900,
    habitacionCompartida: 1000,
    transporte: 88,
    alimentacion: 580,
    restauranteMedio: 36,
    cafe: 4.9,
    ocio: 390,
    nivelEspanol: 2,
    empleabilidad: 4,
    calidadVida: 5,
    pros: ["Impuestos más bajos de Suiza", "Salarios muy altos (finanzas/crypto)", "Junto al lago, ciudad pequeña y segura", "Sede de muchas multinacionales y holdings"],
    contras: ["Alquiler muy caro — entre los más altos de Suiza", "Ciudad pequeña, poco ambiente", "Comunidad hispanohablante casi inexistente"],
    color: "#6d28d9",
    colorLight: "#F5F3FF",
  },
  {
    slug: "winterthur",
    nombre: "Winterthur",
    emoji: "🌿",
    idioma: "Alemán (Winterthurer Deutsch)",
    region: "Cantón Zúrich (Suiza alemana)",
    sector: "Industria, tecnología, servicios, salud (ZHAW)",
    tasa: 0.123,
    salarioMedio: 6900,
    seguroMedico: 428,
    alquiler1HabCentro: 1700,
    alquiler1HabPeriferia: 1380,
    habitacionCompartida: 750,
    transporte: 88,
    alimentacion: 560,
    restauranteMedio: 28,
    cafe: 4.7,
    ocio: 310,
    nivelEspanol: 3,
    empleabilidad: 4,
    calidadVida: 4,
    pros: ["15 min en tren a Zúrich — salarios de Zúrich, costes menores", "Ciudad universitaria (ZHAW) — joven y dinámica", "Más asequible que Zúrich con las mismas oportunidades laborales", "Buena calidad de vida, menos ajetreada"],
    contras: ["Menos vida cultural que Zúrich", "Alemán difícil", "Comunidad hispanohablante pequeña"],
    color: "#16a34a",
    colorLight: "#F0FDF4",
  },
  {
    slug: "baar",
    nombre: "Baar",
    emoji: "🏘️",
    idioma: "Alemán",
    region: "Cantón Zug (Suiza central)",
    sector: "Finanzas, holdings, comercio (sede de Glencore y otras)",
    tasa: 0.115,
    salarioMedio: 7800,
    seguroMedico: 388,
    alquiler1HabCentro: 1900,
    alquiler1HabPeriferia: 1500,
    habitacionCompartida: 820,
    transporte: 75,
    alimentacion: 545,
    restauranteMedio: 31,
    cafe: 4.7,
    ocio: 290,
    nivelEspanol: 2,
    empleabilidad: 3,
    calidadVida: 4,
    pros: ["Impuestos muy bajos (cantón Zug)", "Sede de multinacionales importantes (Glencore)", "Más asequible que Zug ciudad", "Conexión fácil a Zúrich (30 min en tren)"],
    contras: ["Ciudad residencial — poca vida social", "Comunidad hispanohablante prácticamente inexistente", "Poco ambiente para recién llegados"],
    color: "#ca8a04",
    colorLight: "#FFFBEB",
  },
  {
    slug: "cham",
    nombre: "Cham",
    emoji: "🌊",
    idioma: "Alemán",
    region: "Cantón Zug (Suiza central)",
    sector: "Industria, logística, servicios (Lindt & Sprüngli tiene sede aquí)",
    tasa: 0.115,
    salarioMedio: 7400,
    seguroMedico: 388,
    alquiler1HabCentro: 1750,
    alquiler1HabPeriferia: 1350,
    habitacionCompartida: 750,
    transporte: 72,
    alimentacion: 530,
    restauranteMedio: 29,
    cafe: 4.6,
    ocio: 270,
    nivelEspanol: 2,
    empleabilidad: 3,
    calidadVida: 4,
    pros: ["Impuestos muy bajos (cantón Zug)", "Junto al lago Zug — naturaleza privilegiada", "Más barato que Zug o Baar", "Buena conexión a Zúrich (35 min)"],
    contras: ["Pueblo pequeño — vida social muy limitada", "Sin comunidad hispanohablante", "Depende de Zug o Zúrich para trabajo y ocio"],
    color: "#0e7490",
    colorLight: "#ECFEFF",
  },
];

export const SALARY_DATA: Record<string, { min: number; max: number; icono: string }> = {
  "Informática / IT":           { min: 7000,  max: 10000, icono: "💻" },
  "Sanidad / Cuidados":         { min: 5800,  max: 8000,  icono: "🏥" },
  "Electricidad":               { min: 5200,  max: 6800,  icono: "⚡" },
  "Fontanería / Instalaciones": { min: 5200,  max: 6800,  icono: "🔧" },
  "Soldadura / Metal":          { min: 5000,  max: 6500,  icono: "🔩" },
  "Mecánica / Automoción":      { min: 5000,  max: 6500,  icono: "🚗" },
  "Construcción":               { min: 4800,  max: 6500,  icono: "🏗️" },
  "Logística / Transporte":     { min: 4800,  max: 6200,  icono: "🚛" },
  "Hostelería / Restauración":  { min: 4200,  max: 5800,  icono: "🍽️" },
  "Limpieza / Mantenimiento":   { min: 3800,  max: 4800,  icono: "🧹" },
  "Agricultura / Campo":        { min: 3800,  max: 4800,  icono: "🌾" },
};

// Salarios IT (anuales, de recursos/suiza.md)
export const SALARY_IT_ANUAL = {
  Desarrollador: { junior: "80K–95K", mid: "100K–130K", senior: "130K–170K" },
  "Data Engineer": { junior: "85K–100K", mid: "110K–140K", senior: "140K–180K" },
  DevOps: { junior: "85K–95K", mid: "105K–130K", senior: "130K–160K" },
};

export const CANTONES = [
  { slug: "zurich",   nombre: "Zúrich",         tasa: 0.118, idioma: "Alemán",  sector: "Tech, finanzas, seguros" },
  { slug: "ginebra",  nombre: "Ginebra",         tasa: 0.132, idioma: "Francés", sector: "Org. internacionales, finanzas, lujo" },
  { slug: "berna",    nombre: "Berna",           tasa: 0.124, idioma: "Alemán",  sector: "Adm. pública, IT" },
  { slug: "basilea",  nombre: "Basilea-Ciudad",  tasa: 0.115, idioma: "Alemán",  sector: "Farmacéutica, química" },
  { slug: "lausana",  nombre: "Lausana (Vaud)",  tasa: 0.128, idioma: "Francés", sector: "Investigación, startups" },
  { slug: "lugano",   nombre: "Lugano (Ticino)", tasa: 0.121, idioma: "Italiano",sector: "Finanzas, turismo" },
];

export const COSTE_VIDA_ZURICH = [
  { concepto: "Alquiler 1 hab. centro",    min: 2000, max: 2800 },
  { concepto: "Alquiler 1 hab. periferia", min: 1500, max: 2000 },
  { concepto: "Transporte público",        min: 85,   max: 100  },
  { concepto: "Alimentación",              min: 500,  max: 700  },
];

export const PORTALES_EMPLEO = [
  { nombre: "jobs.ch",        url: "https://www.jobs.ch",        desc: "Principal portal suizo de empleo" },
  { nombre: "jobup.ch",       url: "https://www.jobup.ch",       desc: "Muy usado en Suiza romanda (francófona)" },
  { nombre: "LinkedIn",       url: "https://www.linkedin.com",   desc: "Imprescindible — muchos reclutadores suizos activos" },
  { nombre: "indeed.ch",      url: "https://www.indeed.ch",      desc: "Agregador internacional" },
  { nombre: "topjobs.ch",     url: "https://www.topjobs.ch",     desc: "Puestos de nivel medio-alto" },
  { nombre: "glassdoor.ch",   url: "https://www.glassdoor.ch",   desc: "Empresas + salarios + reviews" },
];

export const PORTALES_VIVIENDA = [
  { nombre: "Homegate",       url: "https://www.homegate.ch",    desc: "Mayor portal inmobiliario suizo. Todos los cantones", color: "#0077b6" },
  { nombre: "ImmoScout24",    url: "https://www.immoscout24.ch", desc: "Gran selección en toda Suiza", color: "#e63946" },
  { nombre: "Comparis",       url: "https://www.comparis.ch",    desc: "Agrega varias plataformas a la vez + comparador de seguros", color: "#e63946" },
  { nombre: "wgzimmer.ch",    url: "https://www.wgzimmer.ch",    desc: "Pisos compartidos (WG) — ideal para recién llegados", color: "#2d6a4f" },
  { nombre: "flatfox.ch",     url: "https://flatfox.ch",         desc: "Moderno, muchos propietarios directos", color: "#7c3aed" },
];

export const SEGUROS_ASEGURADORAS = [
  { nombre: "Assura",     web: "https://www.assura.ch",    precio: "Más barata",  nota: "Sin atención telefónica premium — ideal para sanos" },
  { nombre: "Sympany",    web: "https://www.sympany.ch",   precio: "Muy barata",  nota: "Digital, buena app" },
  { nombre: "Atupri",     web: "https://www.atupri.ch",    precio: "Barata",      nota: "Digital-first, moderna" },
  { nombre: "KPT",        web: "https://www.kpt.ch",       precio: "Barata",      nota: "Fuerte en Berna y alrededores" },
  { nombre: "CSS",        web: "https://www.css.ch",       precio: "Media",       nota: "Gran red, buena app, buena relación calidad-precio" },
  { nombre: "Concordia",  web: "https://www.concordia.ch", precio: "Media",       nota: "Buena valoración en servicio" },
  { nombre: "Visana",     web: "https://www.visana.ch",    precio: "Media",       nota: "Fuerte en Berna y Suiza central" },
  { nombre: "Sanitas",    web: "https://www.sanitas.com",  precio: "Media-alta",  nota: "App excelente, buena atención" },
];

export const SEGUROS_FRANQUICIAS = [
  { chf: 300,  ahorro: "—",           nota: "Máxima cobertura desde el primer CHF" },
  { chf: 500,  ahorro: "~25 CHF/mes", nota: "Buen equilibrio si vas pocas veces al médico" },
  { chf: 1000, ahorro: "~55 CHF/mes", nota: "Popular entre jóvenes sanos" },
  { chf: 1500, ahorro: "~75 CHF/mes", nota: "" },
  { chf: 2000, ahorro: "~90 CHF/mes", nota: "" },
  { chf: 2500, ahorro: "~110 CHF/mes",nota: "Máximo ahorro — solo si raramente vas al médico" },
];

export const SEGUROS_MODELOS = [
  { nombre: "Estándar",  desc: "Libre elección de médico",               precio: "Más caro",    recomendado: false },
  { nombre: "Hausarzt",  desc: "Siempre al mismo médico de cabecera primero", precio: "Más barato", recomendado: false },
  { nombre: "HMO",       desc: "Centro médico fijo asignado",            precio: "~20% menos",  recomendado: true  },
  { nombre: "Telmed",    desc: "Llamada previa obligatoria antes de ir", precio: "~25% menos",  recomendado: true  },
];

export const PERMISOS = [
  { tipo: "L", nombre: "Permiso de corta duración", duracion: "Hasta 1 año", perfil: "Contratos temporales o estacionales" },
  { tipo: "B", nombre: "Permiso de residencia",     duracion: "1–5 años (renovable)", perfil: "Trabajadores con contrato +1 año. El más común para recién llegados" },
  { tipo: "C", nombre: "Permiso de establecimiento", duracion: "Permanente",  perfil: "Tras 5–10 años según nacionalidad. Españoles: 5 años" },
  { tipo: "G", nombre: "Permiso de frontera",       duracion: "Renovable",    perfil: "Trabajadores que viven en el país vecino y trabajan en Suiza" },
];
