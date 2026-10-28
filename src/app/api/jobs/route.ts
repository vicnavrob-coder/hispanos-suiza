import { NextResponse } from "next/server";

export type JobItem = {
  title: string;
  company: string;
  location: string;
  url: string;
  description: string;       // extracto corto (220 chars)
  descriptionFull?: string;  // descripción completa
  pubDate: string;
  source: "jobs.ch" | "LinkedIn" | "Tempservice" | "tempoX" | "JobScout24" | "Jobup" | "Indeed" | "job-room" | "Adzuna" | "Jobchannel";
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
  // ── Top 10 ciudades ───────────────────────────────────────────────────────
  "Zürich":       "Zurich",
  "Geneva":       "Geneva",
  "Basel":        "Basel",
  "Bern":         "Bern",
  "Lausanne":     "Lausanne",
  "Winterthur":   "Winterthur",
  "Lucerne":      "Lucerne",
  "St. Gallen":   "St. Gallen",
  "Lugano":       "Lugano",
  "Zug":          "Zug",
  // ── Ciudades medianas ─────────────────────────────────────────────────────
  "Biel/Bienne":  "Biel",
  "Thun":         "Thun",
  "Köniz":        "Koniz",
  "La Chaux-de-Fonds": "La Chaux-de-Fonds",
  "Fribourg":     "Fribourg",
  "Schaffhausen": "Schaffhausen",
  "Chur":         "Chur",
  "Neuchâtel":    "Neuchatel",
  "Sion":         "Sion",
  "Uster":        "Uster",
  // ── Zonas industriales ────────────────────────────────────────────────────
  "Aarau":        "Aarau",
  "Baden":        "Baden",
  "Olten":        "Olten",
  "Solothurn":    "Solothurn",
  "Wetzikon":     "Wetzikon",
  "Dübendorf":    "Dubendorf",
  "Dietikon":     "Dietikon",
  "Wädenswil":    "Wadenswil",
  "Horgen":       "Horgen",
  "Rapperswil":   "Rapperswil",
  // ── Regiones francófonas ──────────────────────────────────────────────────
  "Montreux":     "Montreux",
  "Vevey":        "Vevey",
  "Yverdon":      "Yverdon",
  "Nyon":         "Nyon",
  "Morges":       "Morges",
  // ── Ticino ────────────────────────────────────────────────────────────────
  "Bellinzona":   "Bellinzona",
  "Locarno":      "Locarno",
  "Mendrisio":    "Mendrisio",
  "Chiasso":      "Chiasso",
  // ── Otras ciudades ────────────────────────────────────────────────────────
  "Frauenfeld":   "Frauenfeld",
  "Kreuzlingen":  "Kreuzlingen",
  "Wil":          "Wil",
  "Gossau":       "Gossau",
  "Herisau":      "Herisau",
  "Langenthal":   "Langenthal",
  "Burgdorf":     "Burgdorf",
  "Emmen":        "Emmen",
  "Kriens":       "Kriens",
  "Schwyz":       "Schwyz",
  "Grenchen":     "Grenchen",
  "Delémont":     "Delemont",
  "Martigny":     "Martigny",
  "Sierre":       "Sierre",
};

// Alias para compatibilidad interna
const JOBS_CH_CITY = CITY_SEARCH;

const LINKEDIN_CITY: Record<string, string> = Object.fromEntries([
  ["Toda Suiza", "Switzerland"],
  ...Object.entries(CITY_SEARCH).map(([k, v]) => [k, `${v}, Switzerland`]),
]);

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
  { kw: ["human resources", "recruiting", "recruiter", "personalberatung", "personalvermittlung", "personal manager"],
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
  { kw: ["social media", "community manager"],
                                             es: "Social Media Manager",    sector: "Marketing" },
  { kw: ["seo", "sem", "digital marketing"], es: "Especialista SEO/SEM",    sector: "Marketing" },

  // ── Oficios adicionales ─────────────────────────────────────────────────
  { kw: ["bäcker", "boulanger", "baker"],    es: "Panadero/a",              sector: "Hostelería" },
  { kw: ["metzger", "fleischer", "boucher", "butcher"], es: "Carnicero/a",  sector: "Hostelería" },
  { kw: ["friseur", "coiffeur", "hairdresser"], es: "Peluquero/a",          sector: "Servicios" },
  { kw: ["kosmetiker", "estheticien"],       es: "Esteticista",             sector: "Servicios" },
  { kw: ["schneider", "couturier", "tailor"],es: "Sastre/Modista",          sector: "Textil" },
  { kw: ["optiker", "opticien"],             es: "Óptico",                  sector: "Sanidad" },
  { kw: ["zahntechniker", "dental techniker"], es: "Técnico dental",        sector: "Sanidad" },
  { kw: ["laborant", "laborassistent"],      es: "Técnico de laboratorio",  sector: "Sanidad" },
  { kw: ["tierarzt", "vétérinaire"],         es: "Veterinario",             sector: "Sanidad" },

  // ── Retail / Comercio ───────────────────────────────────────────────────
  { kw: ["kassierer", "caissier", "cashier"],es: "Cajero/a",                sector: "Comercio" },
  { kw: ["verkäufer", "vendeur", "sales assistant", "retail"],
                                             es: "Dependiente/a",           sector: "Comercio" },
  { kw: ["filialleiter", "store manager"],   es: "Encargado/a de tienda",   sector: "Comercio" },

  // ── Producción / Industria ──────────────────────────────────────────────
  { kw: ["produktionsmitarbeiter", "production worker", "opérateur"],
                                             es: "Operario de producción",  sector: "Industria" },
  { kw: ["qualitätsprüfer", "quality", "contrôleur"],
                                             es: "Control de calidad",      sector: "Industria" },
  { kw: ["verpackung", "emballage", "packaging"],
                                             es: "Operario de empaquetado", sector: "Logística" },

  // ── Seguridad ───────────────────────────────────────────────────────────
  { kw: ["sicherheitsmitarbeiter", "security", "wachmann"],
                                             es: "Vigilante de seguridad",  sector: "Seguridad" },
  { kw: ["empfang", "réception", "front desk"],
                                             es: "Recepcionista",           sector: "Administración" },

  // ── Call Center / Atención al cliente ───────────────────────────────────
  { kw: ["call center", "callcenter", "kundendienst", "customer service"],
                                             es: "Atención al cliente",     sector: "Servicios" },
  { kw: ["helpdesk", "it support", "support technician"],
                                             es: "Soporte técnico",         sector: "Servicios" },

  // ── Transporte especializado ────────────────────────────────────────────
  { kw: ["busfahrer", "bus driver", "chauffeur bus"],
                                             es: "Conductor de autobús",    sector: "Transporte" },
  { kw: ["taxifahrer", "taxi driver"],       es: "Taxista",                 sector: "Transporte" },
  { kw: ["kranführer", "grutier", "crane operator"],
                                             es: "Gruista",                 sector: "Construcción" },
  { kw: ["baggerfahrer", "excavator"],       es: "Operador de excavadora",  sector: "Construcción" },

  // ── Alimentación ────────────────────────────────────────────────────────
  { kw: ["lebensmittel", "food production"], es: "Industria alimentaria",   sector: "Alimentación" },
  { kw: ["traiteur", "caterer", "catering"], es: "Catering / Banquetes",    sector: "Hostelería" },
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

/** Extrae email, teléfono, persona de contacto y web de la empresa */
function extractContact(text: string): {
  email?: string;
  phone?: string;
  contactPerson?: string;
  companyWeb?: string;
} {
  // ── Email mejorado ──────────────────────────────────────────────────────────
  // Captura todos los formatos: nombre@empresa.ch, rrhh@corp.com, etc.
  const emails = text.match(/[\w.+-]+@[\w.-]+\.[a-z]{2,10}/gi) ?? [];
  // Filtrar emails genéricos de job boards (no queremos noreply@jobs.ch)
  const validEmail = emails.find(
    (e) =>
      !e.includes("noreply") &&
      !e.includes("jobs.ch") &&
      !e.includes("jobscout") &&
      !e.includes("linkedin") &&
      !e.includes("indeed")
  );

  // ── Teléfonos suizos mejorados ──────────────────────────────────────────────
  // Formatos: +41 44 123 45 67, 0041 44 123 45 67, 044 123 45 67, 044-123-45-67
  // También números con 9 dígitos: +41 79 123 45 67 (móvil)
  const phonePatterns = [
    // +41 o 0041 seguido de número
    /(?:\+41|0041)[\s.\-]?(\d{2})[\s.\-]?(\d{3})[\s.\-]?(\d{2})[\s.\-]?(\d{2})/g,
    // 0XX XXX XX XX (formato local suizo)
    /\b0(\d{2})[\s.\-]?(\d{3})[\s.\-]?(\d{2})[\s.\-]?(\d{2})\b/g,
    // Móvil suizo: 076, 077, 078, 079
    /\b0(7[6-9])[\s.\-]?(\d{3})[\s.\-]?(\d{2})[\s.\-]?(\d{2})\b/g,
  ];
  let phone: string | undefined;
  for (const pattern of phonePatterns) {
    const match = text.match(pattern);
    if (match?.[0]) {
      phone = match[0].trim();
      break;
    }
  }

  // ── Persona de contacto ─────────────────────────────────────────────────────
  // "Contacto: María García", "Ansprechpartner: Hans Müller", "Contact: John Smith"
  const contactPatterns = [
    /(?:contact[oa]?|ansprechpartner|kontakt|referent|référent)[:\s]+([A-ZÄÖÜ][a-zäöüéèê]+(?:\s+[A-ZÄÖÜ][a-zäöüéèê]+){1,2})/i,
    /(?:Frau|Herr|Ms\.?|Mr\.?|Mme\.?|M\.)\s+([A-ZÄÖÜ][a-zäöüéèê]+(?:\s+[A-ZÄÖÜ][a-zäöüéèê]+)?)/,
  ];
  let contactPerson: string | undefined;
  for (const pattern of contactPatterns) {
    const match = text.match(pattern);
    if (match?.[1]) {
      contactPerson = match[1].trim();
      break;
    }
  }

  // ── Web de la empresa ───────────────────────────────────────────────────────
  // Extraer URLs que no sean de job boards
  const urlMatch = text.match(
    /https?:\/\/(?:www\.)?([a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,10})(?:\/[^\s"'<>)}\]]*)?/gi
  );
  const companyWeb = urlMatch?.find(
    (u) =>
      !u.includes("jobs.ch") &&
      !u.includes("linkedin.com") &&
      !u.includes("indeed.com") &&
      !u.includes("jobscout") &&
      !u.includes("jobup.ch") &&
      !u.includes("job-room")
  );

  return {
    email: validEmail,
    phone,
    contactPerson,
    companyWeb,
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

/** Detecta idioma requerido desde texto de la oferta */
function detectLanguage(text: string): string | undefined {
  const t = text.toLowerCase();
  const langs: [string, RegExp][] = [
    ["Alemán",   /\b(deutsch|german|allemand|tedesco)\b/],
    ["Francés",  /\b(français|french|französ|francese)\b/],
    ["Inglés",   /\b(english|anglais|englisch|inglese)\b/],
    ["Italiano", /\b(italiano|italian|italienisch)\b/],
  ];
  const found = langs.filter(([, re]) => re.test(t)).map(([name]) => name);
  if (found.length === 0) return undefined;
  // Try to detect level
  const levelM = text.match(/\b([ABC][12]|fluent|basic|muttersprache|native|verhandlungssicher|grundkenntnisse|courant|bilingue)\b/i);
  if (found.length === 1 && levelM) return `${found[0]} (${levelM[1]})`;
  return found.join(", ");
}

/** Aplica traducción + extracción de contacto a un JobItem */
function enrichJob(job: JobItem): JobItem {
  const cleaned = cleanTitle(job.title);
  const translation = translateTitle(cleaned);
  const textForLang = job.descriptionFull ?? job.description ?? "";
  return {
    ...job,
    title:            cleaned,
    titleEs:          translation?.titleEs,
    sectorEs:         translation?.sectorEs,
    languageRequired: job.languageRequired ?? (textForLang ? detectLanguage(textForLang) : undefined),
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
            const website = j.hiringOrganization?.sameAs || j.hiringOrganization?.url || ctText.companyWeb;
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
    return parseJobsChHTML(await res.text()).slice(0, 30);
  } catch { return []; }
}

async function fetchJobScout24(term: string, city: string): Promise<JobItem[]> {
  const cityParam = city === "Toda Suiza" ? "" : (CITY_SEARCH[city] ?? city);
  const url = cityParam
    ? `https://www.jobscout24.ch/en/jobs?q=${encodeURIComponent(term)}&region=${encodeURIComponent(cityParam)}`
    : `https://www.jobscout24.ch/en/jobs?q=${encodeURIComponent(term)}`;
  try {
    const res = await fetch(url, { headers: HEADERS, next: { revalidate: 600 } });
    if (!res.ok) return [];
    const jobs = parseJobsChHTML(await res.text());
    return jobs.map(j => ({ ...j, source: "JobScout24" as const })).slice(0, 25);
  } catch { return []; }
}

async function fetchJobup(term: string, city: string): Promise<JobItem[]> {
  const cityParam = city === "Toda Suiza" ? "" : (CITY_SEARCH[city] ?? city);
  const url = cityParam
    ? `https://www.jobup.ch/en/jobs/?term=${encodeURIComponent(term)}&location=${encodeURIComponent(cityParam)}`
    : `https://www.jobup.ch/en/jobs/?term=${encodeURIComponent(term)}`;
  try {
    const res = await fetch(url, { headers: HEADERS, next: { revalidate: 600 } });
    if (!res.ok) return [];
    const jobs = parseJobsChHTML(await res.text());
    return jobs.map(j => ({ ...j, source: "Jobup" as const })).slice(0, 25);
  } catch { return []; }
}

type JobRoomItem = {
  jobId?: string;
  title?: string;
  employer?: { name?: string };
  place?: { city?: string; communalCode?: string };
  publicationDate?: string;
  jobDescription?: string;
  languageSkills?: Array<{ language?: string; spokenLevel?: string; writtenLevel?: string }>;
  workingTimePercentageFrom?: number;
  workingTimePercentageTo?: number;
  url?: string;
};

async function fetchJobRoom(term: string, city: string): Promise<JobItem[]> {
  const cityParam = city === "Toda Suiza" ? "" : (CITY_SEARCH[city] ?? city);
  const params = new URLSearchParams({
    searchText: term,
    ...(cityParam ? { locationKeyword: cityParam } : {}),
    page: "0",
    pageSize: "30",
    sort: "date",
  });
  const url = `https://www.job-room.ch/jobsearch/api/v1/jobs?${params}`;
  try {
    const res = await fetch(url, {
      headers: { ...HEADERS, Accept: "application/json" },
      next: { revalidate: 600 },
    });
    if (!res.ok) return [];
    const data: unknown = await res.json();
    const items: JobRoomItem[] = (data as Record<string, unknown>)?.content as JobRoomItem[] ?? [];
    if (!Array.isArray(items)) return [];
    return items.map((j): JobItem => {
      const rawDesc = j.jobDescription ?? "";
      const descFull = htmlToStructured(rawDesc);
      const ct = extractContact(descFull);
      const langSkills = j.languageSkills?.map(l => l.language).filter(Boolean).join(", ");
      const workload = j.workingTimePercentageFrom && j.workingTimePercentageTo
        ? workloadStr(j.workingTimePercentageFrom, j.workingTimePercentageTo)
        : undefined;
      return {
        title:           j.title ?? "",
        company:         j.employer?.name ?? "",
        location:        j.place?.city ?? "Suiza",
        url:             j.url ?? `https://www.job-room.ch/jobsearch/job-detail/${j.jobId}`,
        description:     descFull.replace(/\n/g, " ").slice(0, 280),
        descriptionFull: descFull,
        pubDate:         j.publicationDate ?? "",
        source:          "job-room",
        workload,
        languageRequired: langSkills || undefined,
        requirements:    extractRequirements(descFull),
        applyEmail:      ct.email,
        applyPhone:      ct.phone,
        companyWebsite:  ct.companyWeb,
      };
    }).filter(j => j.title && j.url).slice(0, 25);
  } catch { return []; }
}

// ── Adzuna.ch — API oficial con datos de salario ────────────────────────────

type AdzunaJob = {
  id?: string;
  title?: string;
  description?: string;
  redirect_url?: string;
  location?: { display_name?: string; area?: string[] };
  company?: { display_name?: string };
  created?: string;
  category?: { label?: string };
  salary_min?: number;
  salary_max?: number;
  salary_is_predicted?: string;
  contract_type?: string;
  contract_time?: string;
};

type AdzunaResponse = {
  results?: AdzunaJob[];
  count?: number;
};

async function fetchAdzuna(term: string, city: string): Promise<JobItem[]> {
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;

  // Si no hay credenciales, no intentar llamar a la API
  if (!appId || !appKey) return [];

  const cityParam = city === "Toda Suiza" ? "Switzerland" : (CITY_SEARCH[city] ?? city);
  const url = `https://api.adzuna.com/v1/api/jobs/ch/search/1?app_id=${appId}&app_key=${appKey}&what=${encodeURIComponent(term)}&where=${encodeURIComponent(cityParam)}&results_per_page=30&content-type=application/json`;

  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: 600 },
    });
    if (!res.ok) return [];

    const data = (await res.json()) as AdzunaResponse;
    const results = data.results ?? [];
    if (!Array.isArray(results)) return [];

    return results.map((j): JobItem => {
      const rawDesc = j.description ?? "";
      const descFull = htmlToStructured(rawDesc);
      const ct = extractContact(descFull);

      // Formatear salario si existe
      let salaryStr: string | undefined;
      if (j.salary_min || j.salary_max) {
        const min = j.salary_min ? Math.round(j.salary_min / 100) * 100 : undefined;
        const max = j.salary_max ? Math.round(j.salary_max / 100) * 100 : undefined;
        if (min && max && min !== max) {
          salaryStr = `${min.toLocaleString("de-CH")}–${max.toLocaleString("de-CH")} CHF/año`;
        } else if (max || min) {
          salaryStr = `${(max ?? min)?.toLocaleString("de-CH")} CHF/año`;
        }
        // Indicar si es estimado
        if (j.salary_is_predicted === "1" && salaryStr) {
          salaryStr += " (estimado)";
        }
      }

      // Tipo de contrato
      let contractType: string | undefined;
      if (j.contract_type === "permanent") contractType = "Indefinido";
      else if (j.contract_type === "contract") contractType = "Temporal";
      if (j.contract_time === "part_time") {
        contractType = contractType ? `${contractType}, parcial` : "Parcial";
      }

      return {
        title:           j.title ?? "",
        company:         j.company?.display_name ?? "",
        location:        j.location?.display_name ?? j.location?.area?.[0] ?? "Suiza",
        url:             j.redirect_url ?? "",
        description:     descFull.replace(/\n/g, " ").slice(0, 280),
        descriptionFull: descFull,
        pubDate:         j.created ?? "",
        source:          "Adzuna",
        salary:          salaryStr,
        contractType,
        applyEmail:      ct.email,
        applyPhone:      ct.phone,
        companyWebsite:  ct.companyWeb,
      };
    }).filter(j => j.title && j.url).slice(0, 30);
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
        const rawDesc = j.description ?? j.excerpt ?? "";
        const descFull = htmlToStructured(rawDesc);
        const ct = extractContact(descFull);
        return {
          title:           j.title ?? j.job_title ?? j.name ?? "",
          company:         j.company ?? j.employer ?? "Tempservice",
          location:        j.location ?? j.city ?? "Suiza",
          url:             j.url ?? j.link ?? j.permalink ?? "https://www.tempservice.ch",
          description:     descFull.replace(/\n/g, " ").slice(0, 220),
          descriptionFull: descFull,
          pubDate:         j.date ?? j.published ?? "",
          source:          "Tempservice",
          isEtt:           true,
          contractType:    j.employment_type,
          workload:        j.workload ?? (wMin || wMax ? workloadStr(wMin, wMax) : undefined),
          applyEmail:      ct.email || "info@tempservice.ch",
          applyPhone:      ct.phone || "+41 31 380 09 09",
          companyWebsite:  ct.companyWeb || "https://www.tempservice.ch",
        };
      })
      .filter((j) => j.title && j.url)
      .filter((j) => city === "Toda Suiza" || j.location.toLowerCase().includes(cityLower) || j.location === "Suiza")
      .slice(0, 25);
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
  // WordPress REST API — trae los últimos 30 trabajos (títulos en alemán, sin filtro por término)
  const url = `https://tempox.ch/wp-json/wp/v2/job_listing?per_page=30&orderby=date&order=desc`;
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

// ── Indeed.ch — HTML scraping ─────────────────────────────────────────────────

async function fetchIndeed(term: string, city: string): Promise<JobItem[]> {
  const cityParam = city === "Toda Suiza" ? "Switzerland" : (CITY_SEARCH[city] ?? city);
  const url = `https://ch.indeed.com/jobs?q=${encodeURIComponent(term)}&l=${encodeURIComponent(cityParam)}&sort=date&limit=30`;
  try {
    const res = await fetch(url, {
      headers: { ...HEADERS, Accept: "text/html" },
      next: { revalidate: 600 },
    });
    if (!res.ok) return [];
    const html = await res.text();
    return parseIndeedHTML(html);
  } catch { return []; }
}

function parseIndeedHTML(html: string): JobItem[] {
  const jobs: JobItem[] = [];

  // Indeed usa JSON-LD en algunos casos
  const ldMatches = html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
  for (const [, content] of ldMatches) {
    try {
      const parsed: unknown = JSON.parse(content);
      if (Array.isArray(parsed)) {
        for (const item of parsed as Record<string, unknown>[]) {
          if (item["@type"] === "JobPosting") {
            const j = item as JsonLdJobPosting;
            const rawDesc = String(j.description ?? "");
            const descFull = htmlToStructured(rawDesc);
            const ct = extractContact(descFull);
            jobs.push({
              title: String(j.title ?? ""),
              company: j.hiringOrganization?.name ?? "",
              location: j.jobLocation?.address?.addressLocality ?? "Suiza",
              url: String(j.url ?? ""),
              description: descFull.replace(/\n/g, " ").slice(0, 280),
              descriptionFull: descFull,
              pubDate: String(j.datePosted ?? ""),
              source: "Indeed",
              contractType: mapEmploymentType(j.employmentType),
              applyEmail: ct.email,
              applyPhone: ct.phone,
              companyWebsite: ct.companyWeb,
              requirements: extractRequirements(descFull),
            });
          }
        }
      }
    } catch { /* continuar */ }
  }

  // Fallback: HTML parsing si no hay JSON-LD
  if (jobs.length === 0) {
    // Patrón para extraer ofertas de Indeed HTML
    const titleMatches = [...html.matchAll(/class="[^"]*jobTitle[^"]*"[^>]*>[\s\S]*?<span[^>]*>([^<]+)<\/span>/g)];
    const companyMatches = [...html.matchAll(/data-testid="company-name"[^>]*>([^<]+)</g)];
    const locationMatches = [...html.matchAll(/data-testid="text-location"[^>]*>([^<]+)</g)];
    const linkMatches = [...html.matchAll(/href="(\/rc\/clk\?jk=[^"]+)"/g)];

    const minLen = Math.min(titleMatches.length, linkMatches.length);
    for (let i = 0; i < minLen && i < 30; i++) {
      const title = titleMatches[i]?.[1]?.trim() ?? "";
      const company = companyMatches[i]?.[1]?.trim() ?? "";
      const location = locationMatches[i]?.[1]?.trim() ?? "Suiza";
      const relUrl = linkMatches[i]?.[1] ?? "";
      if (title && relUrl) {
        jobs.push({
          title,
          company,
          location,
          url: `https://ch.indeed.com${relUrl}`,
          description: "",
          pubDate: "",
          source: "Indeed",
        });
      }
    }
  }

  return jobs.filter(j => j.title && j.url).slice(0, 30);
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
  return jobs.slice(0, 30);
}

async function fetchLinkedIn(term: string, city: string): Promise<JobItem[]> {
  const location = LINKEDIN_CITY[city] ?? `${city}, Switzerland`;
  const url = `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=${encodeURIComponent(term)}&location=${encodeURIComponent(location)}&start=0&count=35`;
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
 * Usamos términos amplios que capturen más ofertas del sector.
 * IMPORTANTE: múltiples sinónimos para maximizar resultados.
 */
const SLUG_TERM_DE: Record<string, string> = {
  "limpieza":     "Reinigung Hauswart Gebäudereinigung",
  "hosteleria":   "Koch Küche Service Restaurant",
  "electricidad": "Elektriker Elektro Elektroinstallateur",
  "construccion": "Bau Maurer Bauarbeiter Baustelle",
  "soldadura":    "Schweisser Metallbau Schlosser MIG MAG",
  "mecanica":     "Mechaniker Auto KFZ Werkstatt",
  "logistica":    "Chauffeur Lager Logistik Transport",
  "sanidad":      "Pflege Gesundheit Spitex Krankenhaus",
  "informatica":  "Software Developer IT Programmierer",
  "fontaneria":   "Sanitär Heizung HLKS Installation",
  "agricultura":  "Gärtner Landwirt Landwirtschaft",
};

/**
 * Términos alternativos alemán para segunda búsqueda (term2).
 * Oficios específicos adicionales para ampliar cobertura.
 */
const SLUG_TERM_DE_ALT: Record<string, string> = {
  "limpieza":     "Facility Putzfrau Reinigungsmitarbeiter",
  "hosteleria":   "Hotel Gastro Kellner Barkeeper",
  "electricidad": "Montage-Elektriker Automatiker Telematiker",
  "construccion": "Polier Zimmermann Gipser Dachdecker Maler",
  "soldadura":    "Polymechaniker Anlagebauer CNC Dreher",
  "mecanica":     "Carrossier Fahrzeug Servicetechniker",
  "logistica":    "LKW Staplerfahrer Kommissionierer Kurier",
  "sanidad":      "Krankenpfleger FaGe Betreuung Arzt",
  "informatica":  "Entwickler DevOps Cloud Backend Frontend",
  "fontaneria":   "Installateur Klima Spengler Lüftung",
  "agricultura":  "Winzer Landschaftsgärtner Erntehelfer",
};

/**
 * Tercer conjunto de términos alemanes para búsquedas adicionales.
 */
const SLUG_TERM_DE_ALT2: Record<string, string> = {
  "limpieza":     "Unterhaltsreinigung Fensterreinigung",
  "hosteleria":   "Sous-Chef Küchenhilfe Bäcker Konditor",
  "electricidad": "Netzwerktechniker Servicemonteur",
  "construccion": "Bodenleger Fassadenbauer Tiefbau",
  "soldadura":    "WIG TIG Rohrschlosser Konstrukteur",
  "mecanica":     "Landmaschinenmechaniker Nutzfahrzeug",
  "logistica":    "Spedition Versand Lagerist",
  "sanidad":      "Physiotherapeut Zahnarzt Altenpflege",
  "informatica":  "Systemadministrator Data Engineer",
  "fontaneria":   "Wärmepumpe Solar Kälteanlagen",
  "agricultura":  "Tierpfleger Forstwirt Bauer",
};

/**
 * Términos en inglés para buscar en LinkedIn (internacional).
 * Ampliado con más variaciones.
 */
const SLUG_TERM_EN: Record<string, string> = {
  "limpieza":     "cleaner facility maintenance janitor",
  "hosteleria":   "chef cook hospitality hotel restaurant",
  "electricidad": "electrician electrical technician installer",
  "construccion": "construction worker builder carpenter mason",
  "soldadura":    "welder metal fabrication metalworker",
  "mecanica":     "mechanic automotive technician service",
  "logistica":    "driver logistics warehouse forklift",
  "sanidad":      "nurse healthcare caregiver medical",
  "informatica":  "software developer engineer programmer",
  "fontaneria":   "plumber HVAC technician installer",
  "agricultura":  "agriculture farm gardener landscaping",
};

/**
 * Términos alternativos en inglés para segunda búsqueda LinkedIn.
 */
const SLUG_TERM_EN_ALT: Record<string, string> = {
  "limpieza":     "housekeeping cleaning service office",
  "hosteleria":   "kitchen waiter bartender catering",
  "electricidad": "automation control systems",
  "construccion": "site manager scaffolding roofing",
  "soldadura":    "CNC machinist fabricator",
  "mecanica":     "diesel heavy equipment repair",
  "logistica":    "supply chain shipping courier",
  "sanidad":      "physiotherapy pharmacy dentist",
  "informatica":  "DevOps cloud backend frontend data",
  "fontaneria":   "heating ventilation air conditioning",
  "agricultura":  "vineyard forestry horticulture",
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
  const termJobsCh     = sectorFilter ? (SLUG_TERM_DE[sectorFilter] ?? term) : term;
  const termJobsChAlt  = sectorFilter ? (SLUG_TERM_DE_ALT[sectorFilter] ?? "") : "";
  const termJobsChAlt2 = sectorFilter ? (SLUG_TERM_DE_ALT2[sectorFilter] ?? "") : "";
  const termLinkedIn   = sectorFilter ? (SLUG_TERM_EN[sectorFilter] ?? term) : term;
  const termLinkedInAlt = sectorFilter ? (SLUG_TERM_EN_ALT[sectorFilter] ?? "") : "";

  // Lanzar TODAS las fuentes en paralelo para maximizar resultados
  // 10 fuentes principales + búsquedas alternativas
  const searches: Promise<JobItem[]>[] = [
    // Fuentes principales (0-9)
    fetchJobsCh(termJobsCh, city),         // 0
    fetchLinkedIn(termLinkedIn, city),     // 1
    fetchTempservice(termJobsCh, city),    // 2
    fetchTempoX(term, city),               // 3
    fetchJobScout24(termJobsCh, city),     // 4
    fetchJobup(termLinkedIn, city),        // 5
    fetchJobRoom(termJobsCh, city),        // 6
    fetchAdzuna(termLinkedIn, city),       // 7
    fetchIndeed(termJobsCh, city),         // 8 - NUEVO: Indeed alemán
    fetchIndeed(termLinkedIn, city),       // 9 - NUEVO: Indeed inglés
  ];

  // Búsquedas alternativas para ampliar cobertura (10+)
  if (sectorFilter) {
    // Términos alternativos alemanes
    if (termJobsChAlt) {
      searches.push(
        fetchJobsCh(termJobsChAlt, city),      // 10
        fetchJobScout24(termJobsChAlt, city),  // 11
        fetchJobRoom(termJobsChAlt, city),     // 12
      );
    }
    if (termJobsChAlt2) {
      searches.push(
        fetchJobsCh(termJobsChAlt2, city),     // 13
        fetchJobRoom(termJobsChAlt2, city),    // 14
      );
    }
    // Términos alternativos ingleses
    if (termLinkedInAlt) {
      searches.push(
        fetchLinkedIn(termLinkedInAlt, city), // 15
        fetchAdzuna(termLinkedInAlt, city),   // 16
      );
    }
  }

  const results = await Promise.allSettled(searches);

  // Extraer resultados de fuentes principales
  const jobsCh      = results[0].status === "fulfilled" ? results[0].value : [];
  const linkedin    = results[1].status === "fulfilled" ? results[1].value : [];
  const tempservice = results[2].status === "fulfilled" ? results[2].value : [];
  const tempoXRaw   = results[3].status === "fulfilled" ? results[3].value : [];
  const jobScout24  = results[4].status === "fulfilled" ? results[4].value : [];
  const jobup       = results[5].status === "fulfilled" ? results[5].value : [];
  const jobRoom     = results[6].status === "fulfilled" ? results[6].value : [];
  const adzuna      = results[7].status === "fulfilled" ? results[7].value : [];
  const indeedDe    = results[8].status === "fulfilled" ? results[8].value : [];
  const indeedEn    = results[9].status === "fulfilled" ? results[9].value : [];

  // Extraer resultados alternativos (índices 10+)
  const altResults: JobItem[][] = [];
  for (let i = 10; i < results.length; i++) {
    if (results[i]?.status === "fulfilled") {
      altResults.push((results[i] as PromiseFulfilledResult<JobItem[]>).value);
    }
  }

  // Bug fix: tempoX siempre devuelve los últimos trabajos sin filtrar por término.
  // Enriquecer y filtrar por relevancia ANTES del merge para evitar resultados irrelevantes.
  const termLower = term.toLowerCase();
  const termJobsChLower = termJobsCh.toLowerCase();
  const tempoX = tempoXRaw.map(enrichJob).filter(j =>
    (j.titleEs  ?? "").toLowerCase().includes(termLower) ||
    (j.sectorEs ?? "").toLowerCase().includes(termLower) ||
    j.title.toLowerCase().includes(termLower) ||
    j.title.toLowerCase().includes(termJobsChLower) ||
    (j.descriptionFull ?? j.description ?? "").toLowerCase().includes(termLower)
  );

  // Segundo término adicional si se pasó explícitamente
  let jobsCh2: JobItem[] = [];
  if (term2 && jobsCh.length < 20) {
    try { jobsCh2 = await fetchJobsCh(term2, city); } catch { /* ignorar */ }
  }

  // Merge: ETT primero (más especializadas), luego portales principales, luego LinkedIn
  // tempoX ya está enriquecido + filtrado; el resto se enriquece aquí.
  // Incluir todos los resultados de búsquedas alternativas para máxima cobertura.
  const seen   = new Set<string>();
  const merged: JobItem[] = [];
  const preEnrichedSet = new Set(tempoX); // evitar double-enrichment

  // Combinar todas las fuentes principales + Indeed + alternativas
  const allJobs = [
    // ETTs primero
    ...tempservice, ...tempoX,
    // Portales con datos de salario/contacto
    ...adzuna, ...indeedDe, ...indeedEn,
    // Portales principales suizos
    ...jobsCh, ...jobsCh2,
    ...jobScout24,
    ...jobup,
    ...jobRoom,
    // LinkedIn al final (menos datos de contacto)
    ...linkedin,
    // Resultados de búsquedas alternativas
    ...altResults.flat(),
  ];
  for (const job of allJobs) {
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
    jobs:    filtered.slice(0, 100), // Aumentado de 60 a 100 resultados
    total:   filtered.length,
    sources: {
      jobsCh:      jobsCh.length + jobsCh2.length,
      linkedin:    linkedin.length,
      tempservice: tempservice.length,
      tempoX:      tempoX.length,
      jobScout24:  jobScout24.length,
      jobup:       jobup.length,
      jobRoom:     jobRoom.length,
      adzuna:      adzuna.length,
      indeed:      indeedDe.length + indeedEn.length,
      alternative: altResults.flat().length,
    },
  });
}
