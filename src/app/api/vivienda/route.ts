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

// Mapeo ciudad → query que cada portal entiende
const CITY_MAP: Record<string, string> = {
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

// tipo → filtros de habitaciones orientativo en flatfox
const ROOMS_MAP: Record<string, { min?: number; max?: number }> = {
  "estudio":         { max: 1.5 },
  "1-habitacion":    { min: 1.5, max: 2.5 },
  "2-habitaciones":  { min: 2.5, max: 3.5 },
  "wg-habitacion":   { max: 2 },
  "3-habitaciones":  { min: 3 },
};

const PORTALES_VIVIENDA = [
  { nombre: "Homegate",    logo: "🏠", desc: "Mayor portal inmobiliario suizo",
    url: (city: string) => `https://www.homegate.ch/mieten/immobilien?q=${encodeURIComponent(city)}` },
  { nombre: "ImmoScout24", logo: "🔍", desc: "Gran selección en toda Suiza",
    url: (city: string) => `https://www.immoscout24.ch/de/wohnen/mieten?q=${encodeURIComponent(city)}` },
  { nombre: "Comparis",    logo: "📊", desc: "Agrega varios portales",
    url: (city: string) => `https://www.comparis.ch/immobilien/suche?q=${encodeURIComponent(city)}` },
  { nombre: "Flatfox",     logo: "🟣", desc: "Propietarios directos — más barato",
    url: (city: string) => `https://flatfox.ch/de/search/?query=${encodeURIComponent(city)}` },
  { nombre: "Anibis",      logo: "📋", desc: "Clasificados locales, toda Suiza",
    url: (city: string) => `https://www.anibis.ch/de/immobilien--c16?q=${encodeURIComponent(city)}` },
  { nombre: "Tutti.ch",    logo: "🔵", desc: "Alternativa popular con muchas ofertas",
    url: (city: string) => `https://www.tutti.ch/de/immobilien?query=${encodeURIComponent(city)}` },
];

const PORTALES_WG = [
  { nombre: "WGzimmer.ch", logo: "🏡", desc: "El más popular para pisos compartidos",
    url: (city: string) => `https://www.wgzimmer.ch/wohnungssuche/ch.html?city=${encodeURIComponent(city)}` },
  { nombre: "WG-Gesucht",  logo: "🔵", desc: "Muy activo en ciudades alemanas de Suiza",
    url: (city: string) => `https://www.wg-gesucht.de/wg-zimmer-in-${encodeURIComponent(city.toLowerCase())}.html` },
  { nombre: "Homegate WG", logo: "🏠", desc: "Habitaciones en Homegate",
    url: (city: string) => `https://www.homegate.ch/mieten/wohngemeinschaft?q=${encodeURIComponent(city)}` },
  { nombre: "Flatfox WG",  logo: "🟣", desc: "Habitaciones individuales",
    url: (city: string) => `https://flatfox.ch/de/search/?query=${encodeURIComponent(city)}&rooms-from=1&rooms-to=1` },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ciudad   = searchParams.get("city")   ?? "Zürich";
  const tipoSlug = searchParams.get("tipo")   ?? "";

  const query = CITY_MAP[ciudad] ?? ciudad;
  const esWG = tipoSlug === "wg-habitacion";
  const portalesBase = esWG ? PORTALES_WG : PORTALES_VIVIENDA;

  // Intentar flatfox primero (única fuente con API JSON)
  const roomFilter = ROOMS_MAP[tipoSlug] ?? {};
  const params = new URLSearchParams({
    query, active: "true", ordering: "-date_inserted", limit: "24",
  });
  if (roomFilter.min !== undefined) params.set("rooms_from", String(roomFilter.min));
  if (roomFilter.max !== undefined) params.set("rooms_to", String(roomFilter.max));

  let listings: ViviendaItem[] = [];

  try {
    const res = await fetch(`https://flatfox.ch/api/v1/listing/?${params}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        Accept: "application/json",
        Referer: "https://flatfox.ch/",
      },
      next: { revalidate: 600 },
    });

    if (res.ok) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = await res.json();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const raw: any[] = Array.isArray(data.results) ? data.results : [];
      listings = raw.map((item) => ({
        title:     item.application_title ?? item.description ?? "Sin título",
        price:     item.rent_gross ?? item.rent_net ?? null,
        rooms:     item.number_of_rooms ?? null,
        size:      item.living_area ?? null,
        location:  [item.street, item.city].filter(Boolean).join(", ") || ciudad,
        url:       `https://flatfox.ch/de/flat/${item.slug ?? item.pk}/`,
        thumbnail: item.thumbnails?.x480 ?? item.thumbnails?.x240 ?? null,
        source:    "flatfox",
      }));
    }
  } catch {
    // flatfox no disponible — usamos portales como fallback
  }

  // Construir lista de portales con URLs pre-rellenadas
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
    hasRealListings: listings.length > 0,
  });
}
