import { NextResponse } from "next/server";

export type JobItem = {
  title: string;
  company: string;
  location: string;
  url: string;
  description: string;       // extracto corto (220 chars)
  descriptionFull?: string;  // descripción completa
  pubDate: string;
  source: "jobs.ch" | "LinkedIn" | "Tempservice" | "tempoX";
  contractType?: string;
  workload?: string;
  salary?: string;
  languageRequired?: string;
  isEtt?: boolean;
  titleEs?: string;
  sectorEs?: string;
  // ── Contacto directo ──────────────────────────────────────────────────────
  applyEmail?: string;      // email directo para aplicar
  applyPhone?: string;      // teléfono directo
  companyWebsite?: string;  // web de la empresa
  requirements?: string[];  // lista de requisitos extraídos
  startDate?: string;       // fecha de inicio
};

// ── Mapeos ciudad UI → portales ───────────────────────────────────────────────

const CITY_SEARCH: Record<string, string> = {
  "Zürich":       "Zurich",
  "Geneva":       "Geneva",
  "Basel":        "Basel",
  "Bern":         "Bern",
  "Lausanne":     "Lausanne",
  "Lugano":       "Lugano",
  "Winterthur":   "Winterthur",
  "St. Gallen":   "St. Gallen",
  "Lucerne":      "Lucerne",
  "Zug":          "Zug",
  "Aarau":        "Aarau",
  "Biel/Bienne":  "Biel",
  "Fribourg":     "Fribourg",
  "Solothurn":    "Solothurn",
  "Neuchâtel":    "Neuchatel",
  "Sion":         "Sion",
  "Chur":         "Chur",
  "Bellinzona":   "Bellinzona",
  "Thun":         "Thun",
  "Schaffhausen": "Schaffhausen",
  "Olten":        "Olten",
  "Baden":        "Baden",
  "Frauenfeld":   "Frauenfeld",
  "Herisau":      "Herisau",
};

// Alias para compatibilidad interna
const JOBS_CH_CITY = CITY_SEARCH;

const LINKEDIN_CITY: Record<string, string> = Object.fromEntries([
  ["Toda Suiza", "Switzerland"],
  ...Object.entries(CITY_SEARCH).map(([k, v]) => [k, `${v}, Switzerland`]),
]);

// Mapeo código ISO idioma → nombre en español
const LANG_NAMES: Record<string, string> = {
  de: "Alemán", fr: "Francés", it: "Italiano",
  en: "Inglés", es: "Español", pt: "Portugués",
  rm: "Romanche", nl: "Holandés",
};

// ── Motor de traducción de títulos (Alemán/Inglés → Español) ─────────────────

// Cada entrada: [palabras clave a detectar en el título], título ES, sector ES
type TitlePattern = { kw: string[]; es: string; sector: string };

const TITLE_PATTERNS: TitlePattern[] = [
  // ── Construcción ────────────────────────────────────────────────────────
  { kw: ["maurer"],                           es: "Albañil",                 sector: "Construcción" },
  { kw: ["encofrador", "schalungsbauer", "schaler"], es: "Encofrador",      sector: "Construcción" },
  { kw: ["ferrallista", "eisenbieger", "armador"], es: "Ferrallista",        sector: "Construcción" },
  { kw: ["tiefbau", "civil engineer", "obra civil"], es: "Técnico obra civil", sector: "Construcción" },
  { kw: ["bauführer", "bauleiter", "site manager", "polier"], es: "Jefe de obra", sector: "Construcción" },
  { kw: ["hilfsarbeiter", "hilfskraft", "helper", "peón", "bauhelfer"], es: "Peón / Ayudante de obra", sector: "Construcción" },
  { kw: ["gipser", "gips", "stuckateur"],     es: "Yesero / Estucador",      sector: "Construcción" },
  { kw: ["soleur", "bodenleger", "fliesenleger", "carreleur"], es: "Solador / Alicatador", sector: "Construcción" },
  { kw: ["zimmermann", "zimmerer", "charpentier"], es: "Carpintero de estructuras", sector: "Construcción" },
  { kw: ["dachdecker", "couvreur"],           es: "Tejador / Cubiertas",     sector: "Construcción" },

  // ── Electricidad ────────────────────────────────────────────────────────
  { kw: ["elektriker", "electrician", "elektromonteur", "elektroinstallateur", "electrical"],
                                              es: "Electricista",            sector: "Electricidad" },
  { kw: ["automatiker", "automation", "automatisierung"], es: "Automatista", sector: "Electricidad" },
  { kw: ["elektroniker", "electronics"],     es: "Técnico electrónico",     sector: "Electricidad" },

  // ── Fontanería y HVAC ────────────────────────────────────────────────────
  { kw: ["sanitärinstallateur", "sanitär", "plumber", "plombier"], es: "Fontanero / Instalador sanitario", sector: "Fontanería" },
  { kw: ["heizung", "hvac", "chauffagiste", "klimatechniker", "lüftung"], es: "Técnico climatización (HVAC)", sector: "Fontanería" },

  // ── Metal / Soldadura ────────────────────────────────────────────────────
  { kw: ["schlosser", "schlosserei"],        es: "Cerrajero industrial",     sector: "Metal" },
  { kw: ["schweisser", "welder", "soudeur", "soldeur", "soldad"], es: "Soldador",  sector: "Metal" },
  { kw: ["polymechaniker", "polyméchanick"], es: "Polimecánico",            sector: "Metal" },
  { kw: ["metallbauer", "metal worker", "metalúrgico"], es: "Metalúrgico",  sector: "Metal" },
  { kw: ["dreher", "fräser", "cnc", "werkzeugmacher"], es: "Operador CNC / Tornero", sector: "Metal" },
  { kw: ["mechaniker", "mechanic"],          es: "Mecánico",                sector: "Mecánica" },

  // ── Madera / Carpintería ─────────────────────────────────────────────────
  { kw: ["schreiner", "menuisier", "carpenter", "tischler"], es: "Carpintero / Ebanista", sector: "Carpintería" },
  { kw: ["maler", "painter", "peintre", "lackierer", "lacador"],
                                             es: "Pintor / Lacador",          sector: "Pintura" },

  // ── Hostelería / Restauración ────────────────────────────────────────────
  { kw: ["küchenchef", "chefkoch", "chef de cuisine", "executive chef", "head chef", "responsable de cuisine", "responsable cuisine"],
                                             es: "Jefe/a de cocina",        sector: "Hostelería" },
  { kw: ["sous-chef", "sous chef", "second de cuisine", "second cuisine"],
                                             es: "Segundo de cocina",       sector: "Hostelería" },
  { kw: ["chef de partie", "chef partie", "küchenchef de partie"],
                                             es: "Chef de partida",         sector: "Hostelería" },
  { kw: ["pâtissier", "patissier", "konditor", "pastry chef", "pastelero"],
                                             es: "Pastelero/a",             sector: "Hostelería" },
  { kw: ["sommelier", "cave", "caviste"],    es: "Sumiller / Sommelier",    sector: "Hostelería" },
  { kw: ["koch", "köchin", "cuisinier", "cuisi", "cook"],
                                             es: "Cocinero/a",              sector: "Hostelería" },
  { kw: ["hilfskoch", "küchenhilfe", "commis", "kitchen help", "aide de cuisine"],
                                             es: "Ayudante de cocina",      sector: "Hostelería" },
  { kw: ["kellner", "kelln", "waiter", "waitress", "serveur", "serveuse", "service mitarbeiter", "servicefachkraft"],
                                             es: "Camarero/a",              sector: "Hostelería" },
  { kw: ["barkeeper", "barman", "bartender", "barista"],
                                             es: "Barman / Barista",        sector: "Hostelería" },
  { kw: ["restaurant manager", "responsable de restaurant", "restaurantleiter", "directeur restaur"],
                                             es: "Director/a de restaurante", sector: "Hostelería" },
  { kw: ["f&b manager", "food and beverage", "food & beverage"],
                                             es: "Director F&B",            sector: "Hostelería" },
  { kw: ["réceptionniste", "rezeptionist", "receptionist", "front office", "portier hotel"],
                                             es: "Recepcionista de hotel",  sector: "Hostelería" },
  { kw: ["hotel manager", "directeur hôtel", "hotelmanager", "hoteldirektor"],
                                             es: "Director/a de hotel",     sector: "Hostelería" },
  { kw: ["hauswirtschaft", "housekeeping", "gouvernant", "linge", "room attendant", "zimmermädchen", "wäscherei"],
                                             es: "Gobernanta / Camarera de pisos", sector: "Hostelería" },
  { kw: ["spülkraft", "plongeur", "dishwasher", "plonge"],
                                             es: "Lavaplatos",              sector: "Hostelería" },
  { kw: ["concierge", "conciergerie"],       es: "Conserje de hotel",       sector: "Hostelería" },

  // ── Logística / Transporte ───────────────────────────────────────────────
  { kw: ["chauffeur", "fahrer", "driver", "lkw", "transport"], es: "Conductor / Chófer", sector: "Logística" },
  { kw: ["gabelstapler", "forklift", "carretillero"],  es: "Carretillero",   sector: "Logística" },
  { kw: ["lager", "warehouse", "magasinier", "lagerarbeiter"], es: "Operario de almacén", sector: "Logística" },
  { kw: ["kurier", "zustellung", "delivery", "repartidor"], es: "Repartidor",  sector: "Logística" },
  { kw: ["logistik coordinator", "dispatcher", "spedition"], es: "Coordinador logístico", sector: "Logística" },

  // ── Limpieza / Mantenimiento ─────────────────────────────────────────────
  { kw: ["reinigungskraft", "reinigung", "cleaner", "nettoyeur", "nettoyage", "hausdienst", "nettoyage de bureau"],
                                             es: "Operario/a de limpieza",  sector: "Limpieza" },
  { kw: ["hauswart", "hausmeister", "conserge", "janitor"], es: "Conserje / Mantenimiento", sector: "Limpieza" },
  { kw: ["wartung", "maintenance", "entretien", "betriebsunterhalt", "kanalunterhalt", "gebäudetechnik"],
                                             es: "Técnico de mantenimiento", sector: "Mantenimiento" },
  { kw: ["facility manager", "facility management", "gebäudemanagement"],
                                             es: "Facility Manager / Gestión instalaciones", sector: "Mantenimiento" },

  // ── Sanidad / Cuidados ───────────────────────────────────────────────────
  { kw: ["pflegefachfrau", "pflegefachmann", "krankenpflege", "soins infirmiers", "nurse", "enfermero"],
                                             es: "Enfermero/a",             sector: "Sanidad" },
  { kw: ["fachfrau gesundheit", "fage", "auxiliar", "soignant", "betreuung"],
                                             es: "Auxiliar de enfermería",  sector: "Sanidad" },
  { kw: ["arzt", "ärztin", "médecin", "doctor", "physician"], es: "Médico/a",   sector: "Sanidad" },
  { kw: ["zahnarzt", "dentist", "dentiste"], es: "Dentista",                sector: "Sanidad" },
  { kw: ["physiotherapeut", "physiothérapeute", "physio"], es: "Fisioterapeuta", sector: "Sanidad" },
  { kw: ["pharmazeut", "apotheker", "pharmacien", "pharmacist"], es: "Farmacéutico", sector: "Sanidad" },
  { kw: ["sanitäter", "rettungssanitäter", "paramedic"], es: "Sanitario / Auxiliar emergencias", sector: "Sanidad" },

  // ── Informática / IT ─────────────────────────────────────────────────────
  { kw: ["frontend developer", "front-end developer", "frontend engineer"],
                                             es: "Desarrollador Frontend",  sector: "Informática" },
  { kw: ["backend developer", "back-end developer", "backend engineer"],
                                             es: "Desarrollador Backend",   sector: "Informática" },
  { kw: ["fullstack", "full stack", "full-stack"],
                                             es: "Desarrollador Fullstack", sector: "Informática" },
  { kw: ["devops", "site reliability", "sre"],
                                             es: "Ingeniero DevOps / SRE",  sector: "Informática" },
  { kw: ["data engineer", "data scientist", "machine learning", "ml engineer"],
                                             es: "Ingeniero de datos / ML", sector: "Informática" },
  { kw: ["cloud engineer", "cloud architect", "aws", "azure architect"],
                                             es: "Arquitecto Cloud",        sector: "Informática" },
  { kw: ["software developer", "softwareentwickler", "entwickler", "programmer"],
                                             es: "Desarrollador de software", sector: "Informática" },
  { kw: ["software engineer"],               es: "Ingeniero de software",   sector: "Informática" },
  { kw: ["system administrator", "sysadmin", "it administrator", "systemadministrator"],
                                             es: "Administrador de sistemas", sector: "Informática" },
  { kw: ["cyber", "security engineer", "penetration"],
                                             es: "Técnico ciberseguridad",  sector: "Informática" },

  // ── Administración / Oficina ─────────────────────────────────────────────
  { kw: ["buchhalter", "buchhalting", "accountant", "comptable", "accounting"],
                                             es: "Contable / Contabilidad", sector: "Administración" },
  { kw: ["kaufmännisch", "sachbearbeiter", "administrateur", "assistant administratif"],
                                             es: "Administrativo/a",        sector: "Administración" },
  { kw: ["project manager", "projektleiter", "chef de projet"],
                                             es: "Jefe de proyecto",        sector: "Administración" },
  { kw: ["hr", "human resources", "recruiting", "recruiter", "personalberatung"],
                                             es: "RRHH / Selección de personal", sector: "Administración" },
  { kw: ["verkäufer", "salesperson", "sales", "commercial", "vertrieb"],
                                             es: "Comercial / Ventas",      sector: "Ventas" },

  // ── Agricultura ──────────────────────────────────────────────────────────
  { kw: ["landwirt", "agriculture", "bauer", "farm", "recolect", "harvest"],
                                             es: "Trabajador agrícola",     sector: "Agricultura" },
  { kw: ["gärtner", "jardinier", "gardener", "jardinero"],
                                             es: "Jardinero",               sector: "Agricultura" },

  // ── Educación ────────────────────────────────────────────────────────────
  { kw: ["lehrer", "lehrerin", "teacher", "enseignant", "profesor"],
                                             es: "Profesor/a",              sector: "Educación" },
  { kw: ["erzieher", "erzieherin", "educateur", "kita", "kinderpfleger"],
                                             es: "Educador/a infantil",     sector: "Educación" },

  // ── Instalaciones y fachadas ─────────────────────────────────────────────
  { kw: ["fassade", "façade", "verkleidung", "isolier"],
                                             es: "Instalador de fachadas",  sector: "Construcción" },
  { kw: ["gerüstbauer", "échafaudeur", "scaffolder"],
                                             es: "Montador de andamios",    sector: "Construcción" },
  { kw: ["monteur", "montage", "installateur", "poseur"],
                                             es: "Montador / Instalador",   sector: "Instalaciones" },

  // ── RRHH / Consultoría ───────────────────────────────────────────────────
  { kw: ["personalberater", "personalberatung", "consultant rh", "conseiller rh"],
                                             es: "Consultor/a de RRHH",     sector: "Administración" },
  { kw: ["unternehmensberater", "berater", "consultant"],
                                             es: "Consultor/a",             sector: "Administración" },

  // ── Finanzas ─────────────────────────────────────────────────────────────
  { kw: ["finanzberater", "financial advisor", "conseiller financier"],
                                             es: "Asesor financiero",       sector: "Finanzas" },
  { kw: ["controller", "controlling"],       es: "Controller financiero",   sector: "Finanzas" },
  { kw: ["steuerberater", "fiscaliste", "tax advisor"],
                                             es: "Asesor fiscal",           sector: "Finanzas" },

  // ── Marketing ────────────────────────────────────────────────────────────
  { kw: ["marketing manager", "marketing specialist"],
                                             es: "Responsable de marketing", sector: "Marketing" },
  { kw: ["content manager", "redakteur", "rédacteur", "copywriter"],
                                             es: "Redactor/a de contenidos", sector: "Marketing" },
];

/**
 * Intenta traducir el título al español usando el diccionario.
 * Retorna { titleEs, sectorEs } si hay match, undefined si no.
 */
function translateTitle(title: string): { titleEs: string; sectorEs: string } | undefined {
  const t = title.toLowerCase();
  for (const p of TITLE_PATTERNS) {
    if (p.kw.some((kw) => t.includes(kw))) {
      return { titleEs: p.es, sectorEs: p.sector };
    }
  }
  return undefined;
}

/** Limpia sufijos de género alemanes y porcentajes del título */
function cleanTitle(title: string): string {
  return title
    .replace(/\s*\(m\/w\/d\)/gi, "")
    .replace(/\s*\(m\/f\/d\)/gi, "")
    .replace(/\s*\(m\/w\)/gi, "")
    .replace(/\s*\(all genders\)/gi, "")
    .replace(/\s*\(gn\*\)/gi, "")
    .replace(/\s*\d{1,3}[–-]\d{1,3}%/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Extrae email y teléfono de un texto libre */
function extractContact(text: string): { email?: string; phone?: string } {
  const emailM = text.match(/\b[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,6}\b/);
  // Teléfonos suizos: +41 44 123 45 67 / 044 123 45 67 / 0041 44 …
  const phoneM = text.match(/(\+41|0041|0\d{2})[\s.\-]?\d{3}[\s.\-]?\d{2}[\s.\-]?\d{2}/);
  return {
    email: emailM?.[0],
    phone: phoneM?.[0]?.trim(),
  };
}

/** Extrae hasta 5 requisitos de bullet points en texto estructurado (con \n) */
function extractRequirements(text: string): string[] {
  // Busca frases cortas precedidas de • – ✓ ▸ * o números al comienzo de línea
  const bullets = [...text.matchAll(/(?:^|[\n\r])[\s]*[•\-–*✓▸►\d\.]+[\s]+([^\n\r]{15,100})/gm)]
    .map((m) => m[1].trim())
    .filter(Boolean)
    .slice(0, 5);
  return bullets;
}

/**
 * Convierte HTML en texto estructurado:
 * - <li> → "\n• " (para que extractRequirements pueda detectarlos)
 * - <br>, </p> → "\n"
 * - resto de tags eliminados
 */
function htmlToStructured(html: string): string {
  return html
    .replace(/<li[^>]*>/gi, "\n• ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ").replace(/&#\d+;/g, "")
    // Normalizar bullets emoji (🔹 🔸 ✅ ▶ etc.) a • para que extractRequirements los detecte
    .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{27BF}]/gu, "•")
    .replace(/[▶◆◉●▸►✔✓→]/g, "•")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Aplica traducción + extracción de contacto a un JobItem */
function enrichJob(job: JobItem): JobItem {
  const cleaned = cleanTitle(job.title);
  const translation = translateTitle(cleaned);
  return {
    ...job,
    title:    cleaned,
    titleEs:  translation?.titleEs,
    sectorEs: translation?.sectorEs,
  };
}

const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "es-ES,es;q=0.9,en;q=0.8",
};

// ── jobs.ch — JSON-LD embebido ───────────────────────────────────────────────

type JsonLdJobPosting = {
  "@type": string;
  title?: string;
  description?: string;
  datePosted?: string;
  validThrough?: string;
  url?: string;
  employmentType?: string | string[];
  hiringOrganization?: {
    name?: string;
    sameAs?: string;
    url?: string;
    "@type"?: string;
  };
  jobLocation?: { address?: { addressLocality?: string; addressCountry?: string } };
  baseSalary?: { value?: { minValue?: number; maxValue?: number; unitText?: string } };
  applicationContact?: {
    email?: string;
    telephone?: string;
    "@type"?: string;
  };
  directApply?: boolean;
  jobStartDate?: string;
};

function mapEmploymentType(raw: string | string[] | undefined): string | undefined {
  if (!raw) return undefined;
  const type = Array.isArray(raw) ? raw[0] : raw;
  const map: Record<string, string> = {
    FULL_TIME: "Jornada completa", PART_TIME: "Media jornada",
    CONTRACTOR: "Temporal", TEMPORARY: "Temporal",
    INTERN: "Prácticas", VOLUNTEER: "Voluntario",
  };
  return map[type.toUpperCase()] ?? type;
}

function parseJobsChHTML(html: string): JobItem[] {
  const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  for (const [, content] of scripts) {
    try {
      const parsed: unknown = JSON.parse(content);
      const arr = Array.isArray(parsed) ? parsed : [parsed];
      for (const item of arr as Record<string, unknown>[]) {
        if (item["@type"] === "ItemList" && Array.isArray(item.itemListElement)) {
          const jobs: JobItem[] = [];
          for (const el of item.itemListElement as Record<string, unknown>[]) {
            const j = el.item as JsonLdJobPosting | undefined;
            if (!j || j["@type"] !== "JobPosting") continue;
            const addr = j.jobLocation?.address;
            const sal  = j.baseSalary?.value;
            let salaryStr: string | undefined;
            if (sal?.minValue && sal?.maxValue) {
              salaryStr = `${Math.round(sal.minValue / 100) * 100}–${Math.round(sal.maxValue / 100) * 100} CHF/mes`;
            }
            const rawDesc = j.description ?? "";
            // Texto estructurado (con \n) para extraer requisitos
            const descFull = htmlToStructured(rawDesc);
            // Texto plano para el extracto corto de la tarjeta
            const descShort = rawDesc.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
            // Contacto: primero del JSON-LD, luego extraído del texto
            const ctJson  = j.applicationContact;
            const ctText  = extractContact(descFull);
            const email   = ctJson?.email   || ctText.email;
            const phone   = ctJson?.telephone || ctText.phone;
            const website = j.hiringOrganization?.sameAs || j.hiringOrganization?.url;
            jobs.push({
              title:           j.title ?? "",
              company:         j.hiringOrganization?.name ?? "",
              location:        addr?.addressLocality ?? addr?.addressCountry ?? "Suiza",
              url:             j.url ?? "",
              description:     descShort.slice(0, 280),
              descriptionFull: descFull,
              pubDate:         j.datePosted ?? "",
              source:          "jobs.ch",
              contractType:    mapEmploymentType(j.employmentType),
              salary:          salaryStr,
              applyEmail:      email,
              applyPhone:      phone,
              companyWebsite:  website,
              startDate:       j.jobStartDate,
              requirements:    extractRequirements(descFull),
            });
          }
          return jobs.filter((j) => j.title && j.url);
        }
      }
    } catch { /* siguiente bloque */ }
  }
  return [];
}

async function fetchJobsCh(term: string, city: string): Promise<JobItem[]> {
  const cityParam = city === "Toda Suiza" ? "" : (JOBS_CH_CITY[city] ?? city);
  const url = cityParam
    ? `https://www.jobs.ch/en/vacancies/?term=${encodeURIComponent(term)}&location=${encodeURIComponent(cityParam)}&sort=date`
    : `https://www.jobs.ch/en/vacancies/?term=${encodeURIComponent(term)}&sort=date`;
  try {
    const res = await fetch(url, { headers: HEADERS, next: { revalidate: 600 } });
    if (!res.ok) return [];
    return parseJobsChHTML(await res.text()).slice(0, 20);
  } catch { return []; }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function workloadStr(min: number | undefined, max: number | undefined): string | undefined {
  if (!min && !max) return undefined;
  if (min === max || !min) return `${max}%`;
  return `${min}–${max}%`;
}

// ── Tempservice.ch — API JSON propia ─────────────────────────────────────────

type TempserviceJob = {
  title?: string;
  job_title?: string;
  name?: string;
  company?: string;
  employer?: string;
  location?: string;
  city?: string;
  url?: string;
  link?: string;
  permalink?: string;
  date?: string;
  published?: string;
  description?: string;
  excerpt?: string;
  employment_type?: string;
  workload?: string;
  workload_min?: number;
  workload_max?: number;
};

async function fetchTempservice(term: string, city: string): Promise<JobItem[]> {
  // Tempservice tiene un endpoint de búsqueda JSON
  const url = `https://www.tempservice.ch/tools/search/search-result.php?search=${encodeURIComponent(term)}&searchlang=de`;
  try {
    const res = await fetch(url, {
      headers: { ...HEADERS, Accept: "application/json, text/javascript, */*" },
      next: { revalidate: 600 },
    });
    if (!res.ok) return [];
    const text = await res.text();
    if (!text.trim().startsWith("{") && !text.trim().startsWith("[")) return [];
    const data: unknown = JSON.parse(text);
    const arr: TempserviceJob[] = Array.isArray(data)
      ? (data as TempserviceJob[])
      : ((data as Record<string, unknown>).jobs as TempserviceJob[] ?? (data as Record<string, unknown>).results as TempserviceJob[] ?? []);
    if (!Array.isArray(arr)) return [];

    const cityLower = city.toLowerCase();
    return arr
      .map((j): JobItem => {
        const wMin = j.workload_min;
        const wMax = j.workload_max;
        return {
          title:        j.title ?? j.job_title ?? j.name ?? "",
          company:      j.company ?? j.employer ?? "Tempservice",
          location:     j.location ?? j.city ?? "Suiza",
          url:          j.url ?? j.link ?? j.permalink ?? "https://www.tempservice.ch",
          description:  (j.description ?? j.excerpt ?? "").replace(/<[^>]+>/g, "").slice(0, 220),
          pubDate:      j.date ?? j.published ?? "",
          source:       "Tempservice",
          isEtt:        true,
          contractType: j.employment_type,
          workload:     j.workload ?? (wMin || wMax ? workloadStr(wMin, wMax) : undefined),
        };
      })
      .filter((j) => j.title && j.url)
      .filter((j) => city === "Toda Suiza" || j.location.toLowerCase().includes(cityLower) || j.location === "Suiza")
      .slice(0, 15);
  } catch { return []; }
}

// ── tempoX.ch — WordPress REST API ───────────────────────────────────────────

type WPJob = {
  id?: number;
  link?: string;
  title?: { rendered?: string };
  excerpt?: { rendered?: string };
  content?: { rendered?: string };
  date?: string;
  meta?: Record<string, unknown>;
  acf?: Record<string, unknown>;
};

async function fetchTempoX(_term: string, _city: string): Promise<JobItem[]> {
  // WordPress REST API — trae los últimos 20 trabajos (títulos en alemán, sin filtro por término)
  const url = `https://tempox.ch/wp-json/wp/v2/job_listing?per_page=20&orderby=date&order=desc`;
  try {
    const res = await fetch(url, {
      headers: { ...HEADERS, Accept: "application/json" },
      next: { revalidate: 3600 }, // cache 1h — listado general sin term
    });
    if (!res.ok) return [];
    const data: WPJob[] = await res.json();
    return parseWPJobs(data, "tempoX");
  } catch { return []; }
}

function parseWPJobs(data: WPJob[], company: string): JobItem[] {
  if (!Array.isArray(data)) return [];
  return data
    .map((j): JobItem => {
      const rawContent = j.content?.rendered ?? j.excerpt?.rendered ?? "";
      // Texto estructurado (con \n) para extraer requisitos de <li>
      const fullText = htmlToStructured(rawContent);
      // Texto plano para el extracto corto de la tarjeta
      const shortText = rawContent.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      const ct = extractContact(fullText);
      // tempoX es una ETT — su contacto siempre es tempoX directamente
      return {
        title:           (j.title?.rendered ?? "").replace(/<[^>]+>/g, "").trim(),
        company:         company,
        location:        "Suiza",
        url:             j.link ?? "https://tempox.ch",
        description:     shortText.slice(0, 280),
        descriptionFull: fullText,
        pubDate:         j.date ?? "",
        source:          "tempoX",
        isEtt:           true,
        applyEmail:      ct.email || "jobs@tempox.ch",
        applyPhone:      ct.phone || "+41 44 388 83 00",
        companyWebsite:  "https://tempox.ch",
        requirements:    extractRequirements(fullText),
      };
    })
    .filter((j) => j.title && j.url);
}

// ── LinkedIn ─────────────────────────────────────────────────────────────────

function extractAll(html: string, pattern: RegExp): string[] {
  const results: string[] = [];
  let m: RegExpExecArray | null;
  const re = new RegExp(pattern.source, "g");
  while ((m = re.exec(html)) !== null) {
    results.push(m[1].trim().replace(/\s+/g, " "));
  }
  return results;
}

function parseLinkedInHTML(html: string): JobItem[] {
  const titles    = extractAll(html, /class="base-search-card__title"[^>]*>\s*([^<]+)\s*</);
  const locations = extractAll(html, /class="job-search-card__location"[^>]*>\s*([^<]+)\s*</);
  const urls      = extractAll(html, /href="(https:\/\/[^"]+\/jobs\/view\/[^"?]+)[?"]/);
  const dates     = extractAll(html, /datetime="([^"]+)"/);

  const companies: string[] = [];
  const compRegex = /class="base-search-card__subtitle"[^>]*>[\s\S]*?>\s*([A-Za-zÀ-ÿ][^<\n]{1,60}?)\s*<\/a>[\s\S]*?<\/h4>/g;
  let cm: RegExpExecArray | null;
  while ((cm = compRegex.exec(html)) !== null) {
    companies.push(cm[1].trim().replace(/\s+/g, " "));
  }

  const jobs: JobItem[] = [];
  for (let i = 0; i < titles.length; i++) {
    if (!titles[i] || !urls[i]) continue;
    jobs.push({
      title:    titles[i],
      company:  companies[i] ?? "",
      location: locations[i] ?? "",
      url:      urls[i].split("?")[0],
      description: "",
      pubDate:  dates[i]     ?? "",
      source:   "LinkedIn",
    });
  }
  return jobs.slice(0, 20);
}

async function fetchLinkedIn(term: string, city: string): Promise<JobItem[]> {
  const location = LINKEDIN_CITY[city] ?? `${city}, Switzerland`;
  const url = `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=${encodeURIComponent(term)}&location=${encodeURIComponent(location)}&start=0&count=25`;
  try {
    const res = await fetch(url, {
      headers: { ...HEADERS, Referer: "https://www.linkedin.com/jobs/" },
      next: { revalidate: 600 },
    });
    if (!res.ok) return [];
    return parseLinkedInHTML(await res.text());
  } catch { return []; }
}

// ── Relevancia y filtrado ─────────────────────────────────────────────────────

/**
 * Mapeo slug de categoría → sectores esperados en sectorEs.
 */
const SLUG_TO_SECTORS: Record<string, string[]> = {
  "limpieza":     ["Limpieza", "Mantenimiento"],
  "hosteleria":   ["Hostelería"],
  "electricidad": ["Electricidad"],
  "construccion": ["Construcción", "Carpintería", "Pintura", "Instalaciones"],
  "soldadura":    ["Metal", "Mecánica"],
  "mecanica":     ["Mecánica", "Metal"],
  "logistica":    ["Logística"],
  "sanidad":      ["Sanidad"],
  "informatica":  ["Informática"],
  "fontaneria":   ["Fontanería"],
  "agricultura":  ["Agricultura"],
};

/**
 * Términos en alemán para buscar en jobs.ch (portal principalmente alemán).
 * Enviamos el término nativo del portal para obtener resultados precisos.
 */
const SLUG_TERM_DE: Record<string, string> = {
  "limpieza":     "Reinigung",
  "hosteleria":   "Koch",
  "electricidad": "Elektriker",
  "construccion": "Maurer",
  "soldadura":    "Schweisser",
  "mecanica":     "Mechaniker",
  "logistica":    "Chauffeur Lager",
  "sanidad":      "Pflegefachfrau",
  "informatica":  "Software Developer",
  "fontaneria":   "Sanitärinstallateur",
  "agricultura":  "Gärtner",
};

/**
 * Términos en inglés para buscar en LinkedIn.
 */
const SLUG_TERM_EN: Record<string, string> = {
  "limpieza":     "cleaner maintenance",
  "hosteleria":   "cook chef waiter",
  "electricidad": "electrician",
  "construccion": "construction worker",
  "soldadura":    "welder",
  "mecanica":     "mechanic",
  "logistica":    "driver warehouse",
  "sanidad":      "nurse caregiver",
  "informatica":  "software developer",
  "fontaneria":   "plumber HVAC",
  "agricultura":  "farm worker",
};

/**
 * Alias de ciudad para filtrar resultados por ubicación.
 * Los portales devuelven ubicaciones en diferentes idiomas/formatos.
 */
const CITY_ALIASES: Record<string, string[]> = {
  "Lucerne":      ["luzern", "lucerne", "lucerna"],
  "Zürich":       ["zürich", "zurich", "zurigo"],
  "Geneva":       ["genf", "geneva", "genève", "geneve", "ginebra"],
  "Basel":        ["basel", "bâle", "basilea"],
  "Bern":         ["bern", "berne", "berna"],
  "Lausanne":     ["lausanne", "lausana"],
  "Lugano":       ["lugano"],
  "Winterthur":   ["winterthur"],
  "St. Gallen":   ["st. gallen", "st.gallen", "saint gallen"],
  "Zug":          ["zug", "zoug"],
  "Aarau":        ["aarau"],
  "Biel/Bienne":  ["biel", "bienne"],
  "Fribourg":     ["fribourg", "freiburg"],
  "Solothurn":    ["solothurn", "soleura"],
  "Neuchâtel":    ["neuchâtel", "neuchatel", "neenburg"],
  "Sion":         ["sion", "sitten"],
  "Chur":         ["chur", "coire"],
  "Bellinzona":   ["bellinzona"],
  "Thun":         ["thun"],
  "Schaffhausen": ["schaffhausen"],
  "Olten":        ["olten"],
  "Baden":        ["baden"],
  "Frauenfeld":   ["frauenfeld"],
  "Herisau":      ["herisau"],
};

/** Comprueba si la ubicación de una oferta corresponde a la ciudad seleccionada */
function matchesCity(location: string, city: string): boolean {
  if (city === "Toda Suiza") return true;
  const loc = location.toLowerCase().trim();
  // Aceptar ofertas nacionales / sin ciudad específica
  // IMPORTANTE: usar match exacto para "ch" ya que es substring de muchas ciudades (zürich, etc.)
  const NATIONAL = ["ch", "suiza", "switzerland", "schweiz", "svizzera", "suisse"];
  if (NATIONAL.some((g) => loc === g)) return true;
  // También aceptar si empieza con "ch " / "ch," o lo contiene como token
  if (/\bch\b/.test(loc)) return true;
  // Verificar con aliases de ciudad
  const aliases = CITY_ALIASES[city] ?? [city.toLowerCase()];
  return aliases.some((a) => loc.includes(a));
}

/**
 * Calcula una puntuación de relevancia (mayor = más relevante).
 * Criterios, en orden de peso:
 *   1. El sector del trabajo coincide con los sectores esperados (+20)
 *   2. El sector del trabajo es incorrecto pero reconocido (-8)
 *   3. Palabras del término aparecen en el título o sector (+4–6 c/u)
 *   4. Coincidencia exacta de ciudad (+3) / ETT nationwide (+1) / ciudad diferente (-2)
 *   5. Tiene datos de contacto directo (+2)
 */
function scoreJob(
  job: JobItem,
  termLower: string,
  cityLower: string,
  expectedSectors: string[],
): number {
  let score = 0;
  const titleLower  = (job.titleEs ?? job.title).toLowerCase();
  const sectorLower = (job.sectorEs ?? "").toLowerCase();
  const locLower    = job.location.toLowerCase();

  // ── Sector match ──────────────────────────────────────────────────────────
  if (expectedSectors.length > 0) {
    if (expectedSectors.some((s) => sectorLower.includes(s.toLowerCase()))) {
      score += 20;
    } else if (job.sectorEs) {
      // Tiene sector reconocido pero no es el esperado
      score -= 8;
    }
  }

  // ── Palabras del término en título/sector ──────────────────────────────────
  if (titleLower.includes(termLower))  score += 8;
  if (sectorLower.includes(termLower)) score += 5;
  const words = termLower.split(/\s+/).filter((w) => w.length > 3);
  for (const w of words) {
    if (titleLower.includes(w))  score += 4;
    if (sectorLower.includes(w)) score += 2;
  }

  // ── Coincidencia de ciudad ────────────────────────────────────────────────
  if (cityLower && cityLower !== "toda suiza") {
    if (locLower.includes(cityLower))  score += 3;
    else if (job.location === "Suiza") score += 1; // ETT: a nivel nacional, puede ser
    else                               score -= 2; // ciudad diferente
  }

  // ── Calidad de la oferta ──────────────────────────────────────────────────
  if (job.applyEmail || job.applyPhone) score += 2;
  if (job.isEtt)                        score += 1;

  return score;
}

// ── Handler ───────────────────────────────────────────────────────────────────

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const term         = searchParams.get("term")         ?? "";
  const city         = searchParams.get("city")         ?? "Zürich";
  const term2        = searchParams.get("term2")        ?? "";
  const sectorFilter = searchParams.get("sectorFilter") ?? "";

  if (!term) return NextResponse.json({ jobs: [], total: 0 });

  const expectedSectors = SLUG_TO_SECTORS[sectorFilter] ?? [];

  // Usar términos nativos del portal cuando se busca por categoría:
  //   jobs.ch es portal alemán → buscar en alemán
  //   LinkedIn es portal inglés → buscar en inglés
  //   Si es búsqueda libre (sin sectorFilter) usar el término tal cual
  const termJobsCh  = sectorFilter ? (SLUG_TERM_DE[sectorFilter] ?? term) : term;
  const termLinkedIn = sectorFilter ? (SLUG_TERM_EN[sectorFilter] ?? term) : term;

  // Lanzar las 4 fuentes en paralelo
  const [jobsChRes, linkedInRes, tempserviceRes, tempoXRes] = await Promise.allSettled([
    fetchJobsCh(termJobsCh, city),
    fetchLinkedIn(termLinkedIn, city),
    fetchTempservice(term, city),
    fetchTempoX(term, city),
  ]);

  const jobsCh      = jobsChRes.status      === "fulfilled" ? jobsChRes.value      : [];
  const linkedin    = linkedInRes.status    === "fulfilled" ? linkedInRes.value    : [];
  const tempservice = tempserviceRes.status === "fulfilled" ? tempserviceRes.value : [];
  const tempoXRaw   = tempoXRes.status      === "fulfilled" ? tempoXRes.value      : [];

  // Bug fix: tempoX siempre devuelve los 20 últimos trabajos sin filtrar por término.
  // Enriquecer y filtrar por relevancia ANTES del merge para evitar resultados irrelevantes.
  const termLower = term.toLowerCase();
  const tempoX = tempoXRaw.map(enrichJob).filter(j =>
    (j.titleEs  ?? "").toLowerCase().includes(termLower) ||
    (j.sectorEs ?? "").toLowerCase().includes(termLower) ||
    j.title.toLowerCase().includes(termLower) ||
    (j.descriptionFull ?? j.description ?? "").toLowerCase().includes(termLower)
  );

  // Segundo término para enrichment si hay pocos resultados en jobs.ch
  let jobsCh2: JobItem[] = [];
  if (term2 && jobsCh.length < 8) {
    try { jobsCh2 = await fetchJobsCh(term2, city); } catch { /* ignorar */ }
  }

  // Merge: ETT primero (más especializadas y exclusivas), luego portales, luego LinkedIn
  // tempoX ya está enriquecido + filtrado; el resto se enriquece aquí.
  const seen   = new Set<string>();
  const merged: JobItem[] = [];
  const preEnrichedSet = new Set(tempoX); // evitar double-enrichment
  for (const job of [...tempservice, ...tempoX, ...jobsCh, ...jobsCh2, ...linkedin]) {
    const enriched = preEnrichedSet.has(job) ? job : enrichJob(job);
    const key = `${enriched.title.toLowerCase().slice(0, 40)}|${enriched.company.toLowerCase().slice(0, 20)}`;
    if (!seen.has(key)) {
      seen.add(key);
      merged.push(enriched);
    }
  }

  // ── Filtrado preciso cuando hay sectorFilter ─────────────────────────────
  // 1. Eliminar ofertas cuyo sector reconocido NO corresponde al buscado
  // 2. Eliminar ofertas en ciudades equivocadas (excepto ofertas nacionales)
  let filtered = merged;

  if (expectedSectors.length > 0) {
    filtered = merged.filter((j) => {
      // Si el trabajo tiene sector reconocido, debe coincidir con los esperados
      if (j.sectorEs) {
        return expectedSectors.some((s) => (j.sectorEs ?? "").includes(s));
      }
      // Sin sector reconocido: incluir solo si el título contiene alguna palabra del término
      const titleLower = (j.titleEs ?? j.title).toLowerCase();
      const words = termLower.split(/\s+/).filter((w) => w.length > 3);
      return words.some((w) => titleLower.includes(w));
    });
  }

  // Filtro de ciudad: eliminar resultados claramente de otra ciudad
  if (city !== "Toda Suiza") {
    filtered = filtered.filter((j) => matchesCity(j.location, city));
  }

  // Ordenar por relevancia: mayor puntuación primero
  const cityLower = city.toLowerCase();
  filtered.sort(
    (a, b) =>
      scoreJob(b, termLower, cityLower, expectedSectors) -
      scoreJob(a, termLower, cityLower, expectedSectors),
  );

  return NextResponse.json({
    jobs:    filtered.slice(0, 50),
    total:   filtered.length,
    sources: {
      jobsCh:      jobsCh.length + jobsCh2.length,
      linkedin:    linkedin.length,
      tempservice: tempservice.length,
      tempoX:      tempoX.length,
    },
  });
}
