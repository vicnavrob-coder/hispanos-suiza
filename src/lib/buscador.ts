// Datos del buscador de empleo — extraídos del proyecto job-search-suiza

export type JobCategory = {
  slug: string;
  label: string;
  icono: string;
  description: string;
  terms: string[];
  salarioMin: number;
  salarioMax: number;
};

export const JOB_CATEGORIES: JobCategory[] = [
  {
    slug: "informatica",
    label: "Informática / IT",
    icono: "💻",
    salarioMin: 7000, salarioMax: 10000,
    description: "Empresas tecnológicas que pueden necesitar: desarrolladores backend/frontend/fullstack, DevOps, ingenieros de datos, administradores de sistemas y analistas de ciberseguridad.",
    terms: ["software developer", "backend developer", "frontend developer", "devops engineer", "data engineer", "fullstack developer", "cloud engineer", "cybersecurity analyst"],
  },
  {
    slug: "sanidad",
    label: "Sanidad / Cuidados",
    icono: "🏥",
    salarioMin: 5800, salarioMax: 8000,
    description: "Residencias, clínicas y servicios de atención domiciliaria que pueden buscar: enfermeros, auxiliares de enfermería, cuidadores de ancianos, fisioterapeutas y técnicos sanitarios.",
    terms: ["enfermero", "auxiliar de enfermería", "cuidador de ancianos", "fisioterapeuta", "técnico sanitario", "asistente sanitario"],
  },
  {
    slug: "electricidad",
    label: "Electricidad",
    icono: "⚡",
    salarioMin: 5200, salarioMax: 6800,
    description: "Empresas de instalaciones eléctricas que pueden buscar: electricistas industriales, instaladores, técnicos de mantenimiento eléctrico y automatistas.",
    terms: ["electricista", "técnico electricista", "instalador eléctrico", "electricista industrial", "electricista de mantenimiento", "automatista"],
  },
  {
    slug: "fontaneria",
    label: "Fontanería / Instalaciones",
    icono: "🔧",
    salarioMin: 5200, salarioMax: 6800,
    description: "Empresas de fontanería, calefacción y gas que pueden necesitar: fontaneros, técnicos sanitarios, calefactores e instaladores de climatización (HVAC).",
    terms: ["fontanero", "instalador de fontanería", "técnico sanitario", "calefactor", "instalador HVAC", "instalador de gas"],
  },
  {
    slug: "soldadura",
    label: "Soldadura / Metal",
    icono: "🔩",
    salarioMin: 5000, salarioMax: 6500,
    description: "Talleres y empresas metalúrgicas que pueden buscar: soldadores TIG/MIG/MAG, caldereros, chapistas y montadores de estructuras metálicas.",
    terms: ["soldador", "soldador TIG", "soldador MIG", "calderero", "chapista", "montador metálico"],
  },
  {
    slug: "mecanica",
    label: "Mecánica / Automoción",
    icono: "🚗",
    salarioMin: 5000, salarioMax: 6500,
    description: "Talleres mecánicos y concesionarios que pueden necesitar: mecánicos de coches, técnicos de automoción, chapistas pintores y electricistas de vehículos.",
    terms: ["mecánico", "mecánico de coches", "técnico de automoción", "chapista pintor", "electricista de vehículos"],
  },
  {
    slug: "construccion",
    label: "Construcción",
    icono: "🏗️",
    salarioMin: 4800, salarioMax: 6500,
    description: "Empresas de obra civil y edificación que pueden necesitar: albañiles, encofradores, peones, gruistas, ferrallistas, soladores y yeseros.",
    terms: ["albañil", "peón de construcción", "encofrador", "ferrallista", "solador", "gruista", "oficial de construcción"],
  },
  {
    slug: "logistica",
    label: "Logística / Transporte",
    icono: "🚛",
    salarioMin: 4800, salarioMax: 6200,
    description: "Empresas de transporte y almacén que pueden buscar: conductores de camión, carretilleros, mozos de almacén, repartidores y preparadores de pedidos.",
    terms: ["conductor de camión", "chófer", "repartidor", "carretillero", "mozo de almacén", "preparador de pedidos"],
  },
  {
    slug: "hosteleria",
    label: "Hostelería / Restauración",
    icono: "🍽️",
    salarioMin: 4200, salarioMax: 5800,
    description: "Restaurantes, hoteles y caterings que pueden necesitar: cocineros, ayudantes de cocina, camareros, barmans y recepcionistas de hotel.",
    terms: ["cocinero", "ayudante de cocina", "jefe de cocina", "camarero", "barman", "recepcionista de hotel", "pastelero"],
  },
  {
    slug: "limpieza",
    label: "Limpieza / Mantenimiento",
    icono: "🧹",
    salarioMin: 3800, salarioMax: 4800,
    description: "Empresas de limpieza y mantenimiento de edificios que pueden buscar: operarios de limpieza, técnicos de mantenimiento y conserjes.",
    terms: ["limpiador", "operario de limpieza", "técnico de mantenimiento", "conserje", "auxiliar de mantenimiento"],
  },
  {
    slug: "agricultura",
    label: "Agricultura / Campo",
    icono: "🌾",
    salarioMin: 3800, salarioMax: 4800,
    description: "Explotaciones agrícolas y viveros que pueden necesitar: temporeros, recolectores, tractoristas, jardineros y viñadores.",
    terms: ["temporero agrícola", "recolector", "operario agrícola", "tractorista", "jardinero", "viñador"],
  },
];

export const CIUDADES_SUIZA = [
  "Zürich", "Geneva", "Basel", "Bern", "Lausanne",
  "Lugano", "Winterthur", "St. Gallen", "Lucerne", "Zug",
];

export const PORTALES_EMPLEO_BUSQUEDA = [
  { nombre: "jobs.ch",      url: "https://www.jobs.ch/de/stellenangebote/?term={term}&location={city}",                   tipo: "general",  logo: "🔍" },
  { nombre: "jobup.ch",     url: "https://www.jobup.ch/fr/offres-emploi/?term={term}&regionName={city}",                  tipo: "general",  logo: "🔍" },
  { nombre: "indeed.ch",    url: "https://ch.indeed.com/jobs?q={term}&l={city}",                                          tipo: "general",  logo: "🔍" },
  { nombre: "LinkedIn",     url: "https://www.linkedin.com/jobs/search/?keywords={term}&location={city}%2C%20Switzerland",tipo: "general",  logo: "💼" },
  { nombre: "RAV / job-room", url: "https://www.job-room.ch/#/jobsearch?term={term}&location={city}&radius=30",           tipo: "oficial",  logo: "🏛️" },
  { nombre: "local.ch",     url: "https://www.local.ch/de/q/{term}/{city}",                                               tipo: "empresas", logo: "🏢" },
];

export const AGENCIAS_ETT = [
  { nombre: "Adecco",       url: "https://www.adecco.ch/de-ch/jobs/?q={term}&l={city}",                logo: "🔵" },
  { nombre: "Randstad",     url: "https://www.randstad.ch/jobs/?q={term}&location={city}",             logo: "🔴" },
  { nombre: "Manpower",     url: "https://www.manpower.ch/de/jobsuche?q={term}&location={city}",       logo: "🟠" },
  { nombre: "Gi Group",     url: "https://www.gigroup.ch/stellenangebote/?q={term}&location={city}",   logo: "🟣" },
  { nombre: "Kelly Services",url: "https://www.kellyservices.ch/jobs?keywords={term}&location={city}", logo: "🟢" },
  { nombre: "Tempservice",  url: "https://www.tempservice.ch/de/jobs?q={term}&location={city}",        logo: "⚪" },
];

export const PORTALES_PUBLICOS = [
  { nombre: "Confederación (admin.ch)", url: "https://www.stelle.admin.ch/stelle/de/home/findstelle.html?q={term}", desc: "Empleos federales — gobierno y ministerios" },
  { nombre: "SBB / Ferrocarriles",      url: "https://jobs.sbb.ch/de/jobs?q={term}",                               desc: "Red ferroviaria nacional" },
  { nombre: "RAV — Oficina de Empleo",  url: "https://www.job-room.ch/#/jobsearch?term={term}&location={city}&radius=30", desc: "Ofertas oficiales de todos los cantones" },
  { nombre: "Kanton Zürich",            url: "https://jobs.zh.ch/de/Stellen?Suchbegriff={term}",                   desc: "Empleos del cantón de Zúrich" },
  { nombre: "Canton de Genève",         url: "https://www.ge.ch/travailler-dans-administration-cantonale",         desc: "Administración de Ginebra" },
];

export function buildUrl(template: string, term: string, city: string): string {
  return template
    .replace("{term}", encodeURIComponent(term))
    .replace("{city}", encodeURIComponent(city))
    .replace("{city_lower}", encodeURIComponent(city.toLowerCase()));
}

// ─── VIVIENDA ────────────────────────────────────────────────────────────────

export type TipoVivienda = {
  slug: string;
  label: string;
  icono: string;
  description: string;
  precioMin: number;
  precioMax: number;
};

export const TIPOS_VIVIENDA: TipoVivienda[] = [
  {
    slug: "estudio",
    label: "Estudio / Studio",
    icono: "🛏️",
    description: "Piso pequeño de 1 ambiente — ideal para comenzar solo en Suiza. Incluye cocina integrada y baño propio.",
    precioMin: 1400,
    precioMax: 2200,
  },
  {
    slug: "1-habitacion",
    label: "Piso 1 habitación",
    icono: "🏠",
    description: "La opción más común para solteros o parejas. Salón + dormitorio separado + cocina + baño.",
    precioMin: 1700,
    precioMax: 2800,
  },
  {
    slug: "2-habitaciones",
    label: "Piso 2 habitaciones",
    icono: "🏡",
    description: "Para parejas o para tener despacho en casa. Espacio cómodo y alquiler repartido.",
    precioMin: 2200,
    precioMax: 3500,
  },
  {
    slug: "wg-habitacion",
    label: "Habitación en WG (piso compartido)",
    icono: "👥",
    description: "La opción más económica para recién llegados. Se comparte cocina y baño con otros inquilinos.",
    precioMin: 700,
    precioMax: 1400,
  },
  {
    slug: "3-habitaciones",
    label: "Piso 3+ habitaciones",
    icono: "🏘️",
    description: "Para familias o grupos. Amplio espacio, generalmente fuera del centro de la ciudad.",
    precioMin: 2800,
    precioMax: 4500,
  },
];

export const PORTALES_VIVIENDA_BUSQUEDA = [
  { nombre: "Homegate",    url: "https://www.homegate.ch/mieten/immobilien?q={city}",                        logo: "🏠", desc: "Mayor portal inmobiliario suizo" },
  { nombre: "ImmoScout24", url: "https://www.immoscout24.ch/de/wohnen/mieten?q={city}",                      logo: "🔍", desc: "Gran selección en toda Suiza" },
  { nombre: "Comparis",    url: "https://www.comparis.ch/immobilien/suche?q={city}",                         logo: "📊", desc: "Agrega varios portales a la vez" },
  { nombre: "Flatfox",     url: "https://flatfox.ch/de/search/?query={city}",                                logo: "🟣", desc: "Propietarios directos — más barato" },
  { nombre: "Anibis",      url: "https://www.anibis.ch/de/immobilien--c16?q={city}",                         logo: "📋", desc: "Clasificados locales, toda Suiza" },
  { nombre: "Tutti.ch",    url: "https://www.tutti.ch/de/immobilien?query={city}",                           logo: "🔵", desc: "Alternativa a Anibis, muchas ofertas" },
];

export const PORTALES_WG_BUSQUEDA = [
  { nombre: "WGzimmer.ch", url: "https://www.wgzimmer.ch/wohnungssuche/ch.html?city={city}",                 logo: "🏡", desc: "El más popular para pisos compartidos" },
  { nombre: "WG-Gesucht",  url: "https://www.wg-gesucht.de/wg-zimmer-in-{city}.html",                        logo: "🔵", desc: "Muy activo en ciudades de habla alemana" },
  { nombre: "Homegate WG", url: "https://www.homegate.ch/mieten/wohngemeinschaft?q={city}",                   logo: "🏠", desc: "Habitaciones en Homegate" },
  { nombre: "Flatfox WG",  url: "https://flatfox.ch/de/search/?query={city}&rooms-from=1&rooms-to=1",         logo: "🟣", desc: "Habitaciones individuales en Flatfox" },
];

// ─── SEGUROS ─────────────────────────────────────────────────────────────────

export type GrupoEdad = {
  slug: string;
  label: string;
  primaRef: number; // CHF/mes base canton Zürich, franquicia 300
};

export const GRUPOS_EDAD: GrupoEdad[] = [
  { slug: "0-18",  label: "0–18 años (hijo/a)",  primaRef: 115  },
  { slug: "19-25", label: "19–25 años",           primaRef: 320  },
  { slug: "26-35", label: "26–35 años",           primaRef: 395  },
  { slug: "36-45", label: "36–45 años",           primaRef: 450  },
  { slug: "46-55", label: "46–55 años",           primaRef: 510  },
  { slug: "56-65", label: "56–65 años",           primaRef: 600  },
  { slug: "66+",   label: "66 años o más",        primaRef: 680  },
];

// Factores por cantón vs Zürich (aproximados)
export const CANTON_FACTOR: Record<string, number> = {
  "Zürich":     1.00,
  "Geneva":     1.18,
  "Basel":      1.12,
  "Bern":       1.08,
  "Lausanne":   1.15,
  "Lugano":     0.95,
  "Winterthur": 0.98,
  "St. Gallen": 0.92,
  "Lucerne":    0.96,
  "Zug":        0.85,
};

// Factores por franquicia
export const FRANQUICIA_FACTOR: Record<number, number> = {
  300:  1.00,
  500:  0.93,
  1000: 0.82,
  1500: 0.74,
  2000: 0.68,
  2500: 0.62,
};
