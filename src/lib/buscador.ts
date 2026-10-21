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
    description: "Empresas tecnológicas: desarrolladores, DevOps, ingenieros de datos, administradores de sistemas.",
    terms: [
      // Inglés (principal en IT)
      "software developer", "software engineer", "backend developer", "frontend developer",
      "fullstack developer", "devops engineer", "data engineer", "cloud engineer",
      "web developer", "java developer", "python developer", "react developer",
      // Alemán
      "Softwareentwickler", "Informatiker", "Programmierer", "IT Support",
      // Genéricos
      "developer", "engineer IT", "programmer",
    ],
  },
  {
    slug: "sanidad",
    label: "Sanidad / Cuidados",
    icono: "🏥",
    salarioMin: 5800, salarioMax: 8000,
    description: "Residencias, clínicas, hospitales: enfermeros, auxiliares, cuidadores, fisioterapeutas.",
    terms: [
      // Alemán (prioritario)
      "Pflegefachfrau", "Pflegefachmann", "Krankenschwester", "Krankenpfleger",
      "Fachfrau Gesundheit", "Fachmann Gesundheit", "FaGe", "Altenpfleger",
      "Spitex", "Physiotherapeut", "Pflegeassistent", "Betreuung",
      // Francés
      "infirmier", "infirmière", "aide-soignant", "soins",
      // Inglés
      "nurse", "caregiver", "healthcare assistant", "physiotherapist",
    ],
  },
  {
    slug: "electricidad",
    label: "Electricidad",
    icono: "⚡",
    salarioMin: 5200, salarioMax: 6800,
    description: "Instalaciones eléctricas: electricistas industriales, instaladores, técnicos, automatistas.",
    terms: [
      // Alemán (prioritario)
      "Elektriker", "Elektromonteur", "Elektroinstallateur", "Elektroniker",
      "Elektrotechniker", "Automatiker", "Montage-Elektriker", "Servicetechniker Elektro",
      // Francés
      "électricien", "monteur électricien", "installateur électricien",
      // Inglés
      "electrician", "electrical installer", "automation technician",
    ],
  },
  {
    slug: "fontaneria",
    label: "Fontanería / HVAC",
    icono: "🔧",
    salarioMin: 5200, salarioMax: 6800,
    description: "Fontanería, calefacción, climatización: instaladores sanitarios, técnicos HVAC.",
    terms: [
      // Alemán (prioritario)
      "Sanitärinstallateur", "Sanitärmonteur", "Heizungsinstallateur", "Heizungsmonteur",
      "Lüftungsmonteur", "Klimatechniker", "HLKS", "Gebäudetechniker",
      "Spengler", "Servicemonteur Heizung",
      // Francés
      "plombier", "installateur sanitaire", "chauffagiste", "frigoriste",
      // Inglés
      "plumber", "HVAC technician", "heating installer",
    ],
  },
  {
    slug: "soldadura",
    label: "Soldadura / Metal",
    icono: "🔩",
    salarioMin: 5000, salarioMax: 6500,
    description: "Talleres metalúrgicos: soldadores TIG/MIG/MAG, caldereros, chapistas, montadores.",
    terms: [
      // Alemán (prioritario)
      "Schweisser", "Metallbauer", "Schlosser", "Konstruktionsschlosser",
      "Anlagebauer", "Stahlbaumonteur", "Spengler", "Blechbearbeiter",
      "Polymechaniker", "Produktionsmechaniker",
      // Francés
      "soudeur", "métallier", "chaudronnier", "serrurier",
      // Inglés
      "welder", "metal worker", "steel fixer",
    ],
  },
  {
    slug: "mecanica",
    label: "Mecánica / Automoción",
    icono: "🚗",
    salarioMin: 5000, salarioMax: 6500,
    description: "Talleres mecánicos: mecánicos de coches, técnicos automoción, carroceros.",
    terms: [
      // Alemán (prioritario)
      "Automechaniker", "Automobil-Mechatroniker", "KFZ-Mechaniker", "Fahrzeugmechaniker",
      "Carrossier", "Lackierer", "Servicetechniker Auto", "Landmaschinenmechaniker",
      // Francés
      "mécanicien automobile", "carrossier", "garagiste",
      // Inglés
      "car mechanic", "automotive technician",
    ],
  },
  {
    slug: "construccion",
    label: "Construcción",
    icono: "🏗️",
    salarioMin: 4800, salarioMax: 6500,
    description: "Obra civil y edificación: albañiles, encofradores, peones, gruistas, soladores.",
    terms: [
      // Alemán (prioritario)
      "Maurer", "Bauarbeiter", "Polier", "Bauleiter", "Vorarbeiter Bau",
      "Schalungsbauer", "Betonbauer", "Eisenleger", "Bodenleger",
      "Plattenleger", "Gipser", "Maler", "Dachdecker", "Zimmermann",
      "Hilfsarbeiter Bau", "Bauhelfer", "Fassadenbauer",
      // Francés
      "maçon", "coffreur", "carreleur", "plâtrier", "peintre en bâtiment",
      // Inglés
      "construction worker", "bricklayer", "site manager",
    ],
  },
  {
    slug: "logistica",
    label: "Logística / Transporte",
    icono: "🚛",
    salarioMin: 4800, salarioMax: 6200,
    description: "Transporte y almacén: conductores, carretilleros, mozos de almacén, repartidores.",
    terms: [
      // Alemán (prioritario)
      "Chauffeur", "LKW-Fahrer", "Lastwagenchauffeur", "Staplerfahrer",
      "Logistiker", "Lagerist", "Kommissionierer", "Lagermitarbeiter",
      "Kurier", "Lieferfahrer", "Versandmitarbeiter", "Paketbote",
      // Francés
      "chauffeur poids lourd", "cariste", "magasinier", "livreur",
      // Inglés
      "truck driver", "forklift operator", "warehouse worker", "delivery driver",
    ],
  },
  {
    slug: "hosteleria",
    label: "Hostelería / Restauración",
    icono: "🍽️",
    salarioMin: 4200, salarioMax: 5800,
    description: "Restaurantes, hoteles, catering: cocineros, camareros, recepcionistas.",
    terms: [
      // Alemán (prioritario)
      "Koch", "Köchin", "Küchenchef", "Sous Chef", "Commis de Cuisine",
      "Servicefachangestellter", "Servicemitarbeiter", "Kellner", "Barkeeper",
      "Hotelfachmann", "Rezeptionist", "Hauswirtschaft", "Küchenhilfe",
      // Francés
      "cuisinier", "chef de cuisine", "commis", "serveur", "serveuse", "réceptionniste",
      // Inglés
      "chef", "cook", "waiter", "waitress", "bartender", "hotel receptionist",
    ],
  },
  {
    slug: "limpieza",
    label: "Limpieza / Mantenimiento",
    icono: "🧹",
    salarioMin: 3800, salarioMax: 4800,
    description: "Limpieza de edificios, mantenimiento: operarios, técnicos, conserjes.",
    terms: [
      // Alemán (prioritario)
      "Reinigungskraft", "Reiniger", "Raumpfleger", "Gebäudereiniger",
      "Hauswart", "Hausmeister", "Facility Manager", "Haustechniker",
      "Unterhaltsreinigung", "Reinigungsmitarbeiter",
      // Francés
      "agent de nettoyage", "technicien de surface", "concierge",
      // Inglés
      "cleaner", "cleaning staff", "janitor", "maintenance worker",
    ],
  },
  {
    slug: "agricultura",
    label: "Agricultura / Campo",
    icono: "🌾",
    salarioMin: 3800, salarioMax: 4800,
    description: "Explotaciones agrícolas: temporeros, recolectores, tractoristas, jardineros.",
    terms: [
      // Alemán (prioritario)
      "Landwirt", "Landwirtschaftshelfer", "Erntehelfer", "Gärtner",
      "Traktorfahrer", "Winzer", "Obstbauer", "Gemüsebauer",
      "Landschaftsgärtner", "Tierpfleger",
      // Francés
      "agriculteur", "ouvrier agricole", "jardinier", "viticulteur",
      // Inglés
      "farm worker", "agricultural worker", "gardener", "vineyard worker",
    ],
  },
];

export const CIUDADES_SUIZA = [
  "Toda Suiza",
  // ── Top 10 ciudades (más empleo) ──────────────────────────────────────
  "Zürich", "Geneva", "Basel", "Bern", "Lausanne",
  "Winterthur", "Lucerne", "St. Gallen", "Lugano", "Zug",
  // ── Ciudades medianas con mucho empleo ────────────────────────────────
  "Biel/Bienne", "Thun", "Köniz", "La Chaux-de-Fonds", "Fribourg",
  "Schaffhausen", "Chur", "Neuchâtel", "Sion", "Uster",
  // ── Zonas industriales importantes ────────────────────────────────────
  "Aarau", "Baden", "Olten", "Solothurn", "Wetzikon",
  "Dübendorf", "Dietikon", "Wädenswil", "Horgen", "Rapperswil",
  // ── Regiones francófonas ──────────────────────────────────────────────
  "Montreux", "Vevey", "Yverdon", "Nyon", "Morges",
  // ── Ticino (italiano) ─────────────────────────────────────────────────
  "Bellinzona", "Locarno", "Mendrisio", "Chiasso",
  // ── Otras ciudades con empleo ─────────────────────────────────────────
  "Frauenfeld", "Kreuzlingen", "Wil", "Gossau", "Herisau",
  "Langenthal", "Burgdorf", "Emmen", "Kriens", "Schwyz",
  "Grenchen", "Delémont", "Martigny", "Sierre",
];

export const PORTALES_EMPLEO_BUSQUEDA = [
  { nombre: "jobs.ch",        url: "https://www.jobs.ch/en/vacancies/?term={term}&location={city}",                          tipo: "general",  logo: "🔍" },
  { nombre: "jobup.ch",       url: "https://www.jobup.ch/en/jobs/?term={term}&location={city}",                              tipo: "general",  logo: "🔍" },
  { nombre: "indeed.ch",      url: "https://ch.indeed.com/jobs?q={term}&l={city}",                                           tipo: "general",  logo: "🔍" },
  { nombre: "LinkedIn",       url: "https://www.linkedin.com/jobs/search/?keywords={term}&location={city}%2C%20Switzerland", tipo: "general",  logo: "💼" },
  { nombre: "RAV / job-room", url: "https://www.job-room.ch/#/jobsearch?term={term}&location={city}&radius=30",              tipo: "oficial",  logo: "🏛️" },
  { nombre: "Xing",           url: "https://www.xing.com/jobs/search?q={term}&location={city}",                             tipo: "general",  logo: "🟢" },
];

export type AgenciaETT = {
  nombre: string;
  url: string;
  logo: string;
  sector?: string;
  desc?: string;
};

export const AGENCIAS_ETT: AgenciaETT[] = [
  // ── Construcción y oficios ────────────────────────────────────────────────
  { nombre: "ICM Bau",       url: "https://www.icmbau.ch/jobs",                                             logo: "🏗️", sector: "construccion", desc: "Especialistas en construcción" },
  { nombre: "tempoX",        url: "https://tempox.ch/job-list/?filter-title={term}",                        logo: "🔨", sector: "construccion", desc: "Obras, oficios, industria" },
  { nombre: "PEMSA",         url: "https://www.pemsa.ch/offres-demploi/",                                   logo: "🏛️", sector: "construccion", desc: "Suiza romanda" },
  // ── Hostelería y servicios ────────────────────────────────────────────────
  { nombre: "Adia",          url: "https://www.adia.ch/jobs?lang=de",                                       logo: "🍽️", sector: "hosteleria",   desc: "Hostelería, catering, eventos" },
  { nombre: "Alps Staffing", url: "https://jobs.alpsstaffing.ch/?keywords={term}",                          logo: "⛰️", sector: "hosteleria",   desc: "Turismo, esquí, hostelería" },
  // ── Generalistas grandes ──────────────────────────────────────────────────
  { nombre: "Adecco",        url: "https://www.adecco.ch/de-ch/jobs/?q={term}&l={city}",                    logo: "🔵", sector: "general",      desc: "Mayor ETT multinacional" },
  { nombre: "Randstad",      url: "https://www.randstad.ch/jobs/q-{term}/",                                 logo: "🔴", sector: "general",      desc: "Todos los sectores" },
  { nombre: "Manpower",      url: "https://www.manpower.ch/de/jobsuche?q={term}&location={city}",           logo: "🟠", sector: "general",      desc: "Oficina, industria, IT" },
  { nombre: "Gi Group",      url: "https://www.gigroup.ch/stellenangebote/?q={term}&location={city}",       logo: "🟣", sector: "general",      desc: "Industria y logística" },
  { nombre: "Tempservice",   url: "https://www.tempservice.ch/de/suche.php?id={term}",                      logo: "⚪", sector: "general",      desc: "Convenios colectivos CH" },
  { nombre: "Flexsis",       url: "https://www.flexsis.ch/recherche-offres-emploi/?s={term}",               logo: "🟤", sector: "general",      desc: "Técnico y comercial" },
  // ── ETT locales ───────────────────────────────────────────────────────────
  { nombre: "Activaperson",  url: "https://www.activaperson.ch/jobs",                                       logo: "👤", sector: "general",      desc: "ETT local suiza" },
  { nombre: "Inovus",        url: "https://www.inovus.ch/jobs",                                             logo: "⭐", sector: "general",      desc: "ETT local suiza" },
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
