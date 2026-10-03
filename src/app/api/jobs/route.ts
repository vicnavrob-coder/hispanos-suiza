import { NextResponse } from "next/server";

export type JobItem = {
  title: string;
  company: string;
  location: string;
  url: string;
  description: string;
  pubDate: string;
  source: "LinkedIn";
};

// Mapeo de ciudades suizas al formato que LinkedIn entiende mejor
const CITY_LOCATION: Record<string, string> = {
  "Zürich":     "Zurich, Switzerland",
  "Geneva":     "Geneva, Switzerland",
  "Basel":      "Basel, Switzerland",
  "Bern":       "Bern, Switzerland",
  "Lausanne":   "Lausanne, Switzerland",
  "Lugano":     "Lugano, Switzerland",
  "Winterthur": "Winterthur, Switzerland",
  "St. Gallen": "St. Gallen, Switzerland",
  "Lucerne":    "Lucerne, Switzerland",
  "Zug":        "Zug, Switzerland",
};

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

  // Company está dentro de <a> anidado en base-search-card__subtitle
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get("term") ?? "";
  const city = searchParams.get("city") ?? "Zürich";

  const location = CITY_LOCATION[city] ?? `${city}, Switzerland`;

  // LinkedIn Jobs Guest API — no requiere autenticación
  const apiUrl = `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=${encodeURIComponent(term)}&location=${encodeURIComponent(location)}&start=0&count=25`;

  try {
    const res = await fetch(apiUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "es-ES,es;q=0.9,en;q=0.8",
        Referer: "https://www.linkedin.com/jobs/",
      },
      next: { revalidate: 600 }, // cache 10 minutos
    });

    if (!res.ok) {
      return NextResponse.json(
        { jobs: [], error: `LinkedIn devolvió ${res.status}` },
        { status: 200 }
      );
    }

    const html = await res.text();
    const jobs = parseLinkedInHTML(html);

    return NextResponse.json({ jobs, source: "LinkedIn", total: jobs.length });
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.error("[api/jobs]", err);
    return NextResponse.json({ jobs: [], error: String(err) }, { status: 200 });
  }
}
