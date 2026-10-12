import { NextResponse } from "next/server";

export type JobItem = {
  title: string;
  company: string;
  location: string;
  url: string;
  description: string;
  pubDate: string;
  source: "jobs.ch" | "LinkedIn" | "Tempservice" | "tempoX";
  contractType?: string;  // "Jornada completa" | "Temporal" | "Prácticas"
  workload?: string;      // "100%" | "80–100%" | "50–80%"
  salary?: string;        // "5 000 CHF/mes"
  languageRequired?: string; // "Alemán" | "Francés" | "Inglés"
  isEtt?: boolean;        // resultado de agencia de trabajo temporal
};

// ── Mapeos ciudad UI ─────────────────────────────────────────────────────────

const JOBS_CH_CITY: Record<string, string> = {
  "Zürich":     "Zurich",
  "Geneva":     "Geneva",
  "Basel":      "Basel",
  "Bern":       "Bern",
  "Lausanne":   "Lausanne",
  "Lugano":     "Lugano",
  "Winterthur": "Winterthur",
  "St. Gallen": "St. Gallen",
  "Lucerne":    "Lucerne",
  "Zug":        "Zug",
};

const LINKEDIN_CITY: Record<string, string> = {
  "Zürich":      "Zurich, Switzerland",
  "Geneva":      "Geneva, Switzerland",
  "Basel":       "Basel, Switzerland",
  "Bern":        "Bern, Switzerland",
  "Lausanne":    "Lausanne, Switzerland",
  "Lugano":      "Lugano, Switzerland",
  "Winterthur":  "Winterthur, Switzerland",
  "St. Gallen":  "St. Gallen, Switzerland",
  "Lucerne":     "Lucerne, Switzerland",
  "Zug":         "Zug, Switzerland",
  "Toda Suiza":  "Switzerland",
};

// Mapeo código ISO idioma → nombre en español
const LANG_NAMES: Record<string, string> = {
  de: "Alemán", fr: "Francés", it: "Italiano",
  en: "Inglés", es: "Español", pt: "Portugués",
  rm: "Romanche", nl: "Holandés",
};

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
  url?: string;
  employmentType?: string | string[];
  hiringOrganization?: { name?: string };
  jobLocation?: { address?: { addressLocality?: string; addressCountry?: string } };
  baseSalary?: { value?: { minValue?: number; maxValue?: number; unitText?: string } };
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
            jobs.push({
              title:        j.title ?? "",
              company:      j.hiringOrganization?.name ?? "",
              location:     addr?.addressLocality ?? addr?.addressCountry ?? "Suiza",
              url:          j.url ?? "",
              description:  (j.description ?? "").replace(/<[^>]+>/g, "").slice(0, 220),
              pubDate:      j.datePosted ?? "",
              source:       "jobs.ch",
              contractType: mapEmploymentType(j.employmentType),
              salary:       salaryStr,
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
    .map((j): JobItem => ({
      title:       (j.title?.rendered ?? "").replace(/<[^>]+>/g, "").trim(),
      company:     company,
      location:    "Suiza",
      url:         j.link ?? `https://tempox.ch`,
      description: (j.excerpt?.rendered ?? j.content?.rendered ?? "").replace(/<[^>]+>/g, "").slice(0, 220),
      pubDate:     j.date ?? "",
      source:      "tempoX",
      isEtt:       true,
    }))
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

// ── Handler ──────────────────────────────────────────────────────────────────

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const term  = searchParams.get("term")  ?? "";
  const city  = searchParams.get("city")  ?? "Zürich";
  const term2 = searchParams.get("term2") ?? "";

  if (!term) return NextResponse.json({ jobs: [], total: 0 });

  // Lanzar las 4 fuentes en paralelo
  // (job-room.ch requiere auth, Indeed bloquea scrapers — se mantienen como links de portal)
  const [jobsChRes, linkedInRes, tempserviceRes, tempoXRes] = await Promise.allSettled([
    fetchJobsCh(term, city),
    fetchLinkedIn(term, city),
    fetchTempservice(term, city),
    fetchTempoX(term, city),
  ]);

  const jobsCh      = jobsChRes.status      === "fulfilled" ? jobsChRes.value      : [];
  const linkedin    = linkedInRes.status    === "fulfilled" ? linkedInRes.value    : [];
  const tempservice = tempserviceRes.status === "fulfilled" ? tempserviceRes.value : [];
  const tempoX      = tempoXRes.status      === "fulfilled" ? tempoXRes.value      : [];

  // Segundo término para enrichment si hay pocos resultados en jobs.ch
  let jobsCh2: JobItem[] = [];
  if (term2 && jobsCh.length < 8) {
    try { jobsCh2 = await fetchJobsCh(term2, city); } catch { /* ignorar */ }
  }

  // Merge: ETT primero (más especializadas y exclusivas), luego portales, luego LinkedIn
  const seen   = new Set<string>();
  const merged: JobItem[] = [];
  for (const job of [...tempservice, ...tempoX, ...jobsCh, ...jobsCh2, ...linkedin]) {
    const key = `${job.title.toLowerCase().slice(0, 40)}|${job.company.toLowerCase().slice(0, 20)}`;
    if (!seen.has(key)) {
      seen.add(key);
      merged.push(job);
    }
  }

  return NextResponse.json({
    jobs:    merged.slice(0, 50),
    total:   merged.length,
    sources: {
      jobsCh:      jobsCh.length + jobsCh2.length,
      linkedin:    linkedin.length,
      tempservice: tempservice.length,
      tempoX:      tempoX.length,
    },
  });
}
