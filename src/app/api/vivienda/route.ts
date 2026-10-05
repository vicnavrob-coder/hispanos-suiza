import { NextResponse } from "next/server";

export type ViviendaItem = {
  title: string;
  price: number | null;
  rooms: number | null;
  size: number | null;
  location: string;
  url: string;
  thumbnail: string | null;
  source: string;
};

export type PortalInfo = {
  nombre: string;
  url: string;
  logo: string;
  desc: string;
};

// Mapeo ciudad UI → query que flatfox y portales entienden
const CITY_QUERY: Record<string, string> = {
  "Zürich":     "Zürich",
  "Geneva":     "Genf",
  "Basel":      "Basel",
  "Bern":       "Bern",
  "Lausanne":   "Lausanne",
  "Lugano":     "Lugano",
  "Winterthur": "Winterthur",
  "St. Gallen": "St. Gallen",
  "Lucerne":    "Luzern",
  "Zug":        "Zug",
};

// Mapeo ciudad UI → query para portales en español/inglés
const CITY_PORTALS: Record<string, string> = {
  "Toda Suiza":  "Schweiz",
  "Zürich":      "Zürich",
  "Geneva":      "Genf",
  "Basel":       "Basel",
  "Bern":        "Bern",
  "Lausanne":    "Lausanne",
  "Lugano":      "Lugano",
  "Winterthur":  "Winterthur",
  "St. Gallen":  "St. Gallen",
  "Lucerne":     "Luzern",
  "Zug":         "Zug",
};

// tipo → filtros de habitaciones en flatfox
const ROOMS_MAP: Record<string, { min?: number; max?: number }> = {
  "estudio":        { max: 1.5 },
  "1-habitacion":   { min: 1.5, max: 2.5 },
  "2-habitaciones": { min: 2.5, max: 3.5 },
  "wg-habitacion":  { max: 2 },
  "3-habitaciones": { min: 3 },
};

// tipo → referencia de precio máximo para flatfox (CHF/mes)
const PRICE_MAX_MAP: Record<string, number> = {
  "estudio":        2500,
  "1-habitacion":   3200,
  "2-habitaciones": 4000,
  "wg-habitacion":  1600,
  "3-habitaciones": 5500,
};

const PORTALES_VIVIENDA = [
  { nombre: "Homegate",     logo: "🏠", desc: "Mayor portal inmobiliario suizo",
    url: (city: string) => `https://www.homegate.ch/mieten/immobilien?q=${encodeURIComponent(city)}` },
  { nombre: "ImmoScout24",  logo: "🔍", desc: "Gran selección en toda Suiza",
    url: (city: string) => `https://www.immoscout24.ch/de/wohnen/mieten?q=${encodeURIComponent(city)}` },
  { nombre: "Comparis",     logo: "📊", desc: "Agrega varios portales a la vez",
    url: (city: string) => `https://www.comparis.ch/immobilien/suche?q=${encodeURIComponent(city)}` },
  { nombre: "Flatfox",      logo: "🟣", desc: "Propietarios directos — suele ser más barato",
    url: (city: string) => `https://flatfox.ch/de/search/?query=${encodeURIComponent(city)}` },
  { nombre: "Anibis",       logo: "📋", desc: "Clasificados locales, toda Suiza",
    url: (city: string) => `https://www.anibis.ch/de/immobilien--c16?q=${encodeURIComponent(city)}` },
  { nombre: "Ricardo.ch",   logo: "🟠", desc: "Clasificados populares — muchos pisos",
    url: (city: string) => `https://www.ricardo.ch/de/s/immobilien/?q=${encodeURIComponent(city)}` },
];

const PORTALES_WG = [
  { nombre: "WGzimmer.ch",  logo: "🏡", desc: "El más popular para pisos compartidos en Suiza",
    url: (city: string) => {
      // WGzimmer usa slug de ciudad, no query
      const slugs: Record<string, string> = {
        "Zürich": "zuerich", "Geneva": "genf", "Basel": "basel",
        "Bern": "bern", "Lausanne": "lausanne", "Lugano": "lugano",
        "Winterthur": "winterthur", "St. Gallen": "st-gallen",
        "Lucerne": "luzern", "Zug": "zug", "Toda Suiza": "ch",
      };
      const slug = slugs[city] ?? "ch";
      return `https://www.wgzimmer.ch/wohnungssuche/${slug}.html`;
    }
  },
  { nombre: "WG-Gesucht",   logo: "🔵", desc: "Muy activo en ciudades de habla alemana",
    url: (city: string) => {
      if (city === "Toda Suiza") return "https://www.wg-gesucht.de/wg-zimmer-in-Schweiz.html";
      return `https://www.wg-gesucht.de/wg-zimmer-in-${encodeURIComponent(city.toLowerCase().replace(/ /g, "-"))}.html`;
    }
  },
  { nombre: "Flatfox WG",   logo: "🟣", desc: "Habitaciones individuales",
    url: (city: string) => `https://flatfox.ch/de/search/?query=${encodeURIComponent(CITY_PORTALS[city] ?? city)}&rooms-from=1&rooms-to=1` },
  { nombre: "Homegate WG",  logo: "🏠", desc: "Habitaciones en Homegate",
    url: (city: string) => `https://www.homegate.ch/mieten/wohngemeinschaft?q=${encodeURIComponent(CITY_PORTALS[city] ?? city)}` },
];

async function fetchFlatfox(city: string, tipoSlug: string, priceMax?: number): Promise<ViviendaItem[]> {
  const params = new URLSearchParams({
    active: "true",
    ordering: "-date_inserted",
    limit: "24",
  });

  // Solo añadir query de ciudad si no es "Toda Suiza"
  if (city !== "Toda Suiza") {
    const query = CITY_QUERY[city] ?? city;
    params.set("query", query);
  }

  // Filtros de habitaciones
  const roomFilter = ROOMS_MAP[tipoSlug] ?? {};
  if (roomFilter.min !== undefined) params.set("rooms_from", String(roomFilter.min));
  if (roomFilter.max !== undefined) params.set("rooms_to",   String(roomFilter.max));

  // Precio máximo orientativo para no saturar de resultados caros
  const maxPrice = priceMax ?? PRICE_MAX_MAP[tipoSlug];
  if (maxPrice) params.set("rent_gross_to", String(maxPrice));

  try {
    const res = await fetch(`https://flatfox.ch/api/v1/listing/?${params}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        Accept: "application/json",
        Referer: "https://flatfox.ch/",
      },
      next: { revalidate: 600 },
    });
    if (!res.ok) return [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = await res.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const raw: any[] = Array.isArray(data.results) ? data.results : [];
    return raw.map((item) => ({
      title:     item.application_title ?? item.description ?? "Sin título",
      price:     item.rent_gross ?? item.rent_net ?? null,
      rooms:     item.number_of_rooms ?? null,
      size:      item.living_area ?? null,
      location:  [item.street, item.city].filter(Boolean).join(", ") || city,
      url:       `https://flatfox.ch/de/flat/${item.slug ?? item.pk}/`,
      thumbnail: item.thumbnails?.x480 ?? item.thumbnails?.x240 ?? null,
      source:    "flatfox",
    }));
  } catch { return []; }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ciudad   = searchParams.get("city")     ?? "Zürich";
  const tipoSlug = searchParams.get("tipo")     ?? "";
  const priceMax = searchParams.get("priceMax") ? Number(searchParams.get("priceMax")) : undefined;

  const esWG         = tipoSlug === "wg-habitacion";
  const portalesBase = esWG ? PORTALES_WG : PORTALES_VIVIENDA;
  const cityLabel    = CITY_PORTALS[ciudad] ?? ciudad;

  // Listados reales de flatfox
  const listings = await fetchFlatfox(ciudad, tipoSlug, priceMax);

  // Portales con URLs pre-rellenadas
  const portales: PortalInfo[] = portalesBase.map((p) => ({
    nombre: p.nombre,
    url:    p.url(ciudad),
    logo:   p.logo,
    desc:   p.desc,
  }));

  return NextResponse.json({
    listings,
    portales,
    ciudad,
    cityLabel,
    hasRealListings: listings.length > 0,
  });
}
