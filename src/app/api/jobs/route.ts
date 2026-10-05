import { NextResponse } from "next/server";

export type JobItem = {
  title: string;
  company: string;
  location: string;
  url: string;
  description: string;
  pubDate: string;
  source: "jobs.ch" | "LinkedIn";
};

// Mapeo ciudad UI → jobs.ch (sin umlauts en su buscador)
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

// Mapeo ciudad UI → LinkedIn
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

const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "es-ES,es;q=0.9,en;q=0.8",
};

// ── jobs.ch — extrae JobPosting del JSON-LD embebido en el HTML ──────────────

type JsonLdJobPosting = {
  "@type": string;
  title?: string;
  description?: string;
  datePosted?: string;
  url?: string;
  hiringOrganization?: { name?: string };
  jobLocation?: { address?: { addressLocality?: string; addressCountry?: string } };
};

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
            jobs.push({
              title:       j.title ?? "",
              company:     j.hiringOrganization?.name ?? "",
              location:    addr?.addressLocality ?? addr?.addressCountry ?? "Suiza",
              url:         j.url ?? "",
              description: j.description ?? "",
              pubDate:     j.datePosted ?? "",
              source:      "jobs.ch",
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
    ? `https://www.jobs.ch/en/vacancies/rss/?term=${encodeURIComponent(term)}&location=${encodeURIComponent(cityParam)}`
    : `https://www.jobs.ch/en/vacancies/?term=${encodeURIComponent(term)}`;

  try {
    const res = await fetch(url, {
      headers: HEADERS,
      next: { revalidate: 600 },
    });
    if (!res.ok) return [];
    const html = await res.text();
    return parseJobsChHTML(html).slice(0, 20);
  } catch { return []; }
}

// ── LinkedIn — scrape HTML del guest API ─────────────────────────────────────

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
      title:       titles[i],
      company:     companies[i]  ?? "",
      location:    locations[i]  ?? "",
      url:         urls[i].split("?")[0],
      description: "",
      pubDate:     dates[i]      ?? "",
      source:      "LinkedIn",
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
    const html = await res.text();
    return parseLinkedInHTML(html);
  } catch { return []; }
}

// ── Handler ──────────────────────────────────────────────────────────────────

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const term  = searchParams.get("term")  ?? "";
  const city  = searchParams.get("city")  ?? "Zürich";
  // terms2: segundo término para enriquecer resultados cuando hay pocos
  const term2 = searchParams.get("term2") ?? "";

  if (!term) return NextResponse.json({ jobs: [], total: 0 });

  // Lanzar jobs.ch y LinkedIn en paralelo con el término principal
  const [jobsChResult, linkedInResult] = await Promise.allSettled([
    fetchJobsCh(term, city),
    fetchLinkedIn(term, city),
  ]);

  const jobsCh   = jobsChResult.status   === "fulfilled" ? jobsChResult.value   : [];
  const linkedin = linkedInResult.status === "fulfilled" ? linkedInResult.value : [];

  // Si hay pocos resultados y hay un segundo término, buscarlo también en jobs.ch
  let jobsCh2: JobItem[] = [];
  if (term2 && jobsCh.length < 5) {
    try {
      jobsCh2 = await fetchJobsCh(term2, city);
    } catch { /* ignorar */ }
  }

  // Merge: jobs.ch primero, luego LinkedIn (deduplicar por título+empresa)
  const seen   = new Set<string>();
  const merged: JobItem[] = [];
  for (const job of [...jobsCh, ...jobsCh2, ...linkedin]) {
    const key = `${job.title.toLowerCase().slice(0, 40)}|${job.company.toLowerCase().slice(0, 20)}`;
    if (!seen.has(key)) {
      seen.add(key);
      merged.push(job);
    }
  }

  return NextResponse.json({
    jobs:    merged.slice(0, 25),
    total:   merged.length,
    sources: { jobsCh: jobsCh.length + jobsCh2.length, linkedin: linkedin.length },
  });
}
