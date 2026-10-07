import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cantones } from "@/lib/planes";
import { BASE_URL, buildMetadata, breadcrumbSchema, itemListSchema } from "@/lib/seo";

type Props = { params: Promise<{ canton: string }> };

export async function generateStaticParams() {
  return cantones.map(c => ({ canton: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { canton } = await params;
  const c = cantones.find(x => x.slug === canton);
  if (!c) return {};
  // Build dynamic keywords from actual activities
  const tiposUnicos = [...new Set(c.actividades.map(a => a.tipo))];
  const actDestacadas = c.actividades.filter(a => a.destacado).slice(0, 3).map(a => a.nombre);
  const dynamicKeywords = [
    `planes ${c.nombre}`,
    `excursiones ${c.nombre}`,
    `que hacer ${c.nombre} suiza`,
    `rutas ${c.nombre}`,
    ...tiposUnicos.map(t => `${t} ${c.nombre}`),
    ...actDestacadas.map(n => n.toLowerCase()),
    `visitar ${c.nombre}`,
    `turismo ${c.nombre}`,
  ];
  return buildMetadata({
    title: `Planes y excursiones en ${c.nombre} — Qué hacer y ver`,
    description: `${c.actividades.length} planes en ${c.nombre}: ${tiposUnicos.slice(0, 4).join(", ")} y más. Guía completa para hispanohablantes con precios, rutas y cómo llegar en transporte público.`,
    path: `/planes/${canton}`,
    ogImage: c.imagen,
    keywords: dynamicKeywords,
  });
}

const TIPO_EMOJI: Record<string, string> = {
  senderismo: "🥾", teleferico: "🚡", esqui: "⛷️", lago: "🏊",
  naturaleza: "🌿", cultura: "🏛️", gastronomia: "🧀", urbano: "🏙️",
  nieve: "❄️", ciclismo: "🚴", familia: "👨‍👩‍👧",
};
const TIPO_LABEL: Record<string, string> = {
  senderismo: "Senderismo", teleferico: "Teleférico", esqui: "Esquí", lago: "Lagos",
  naturaleza: "Naturaleza", cultura: "Cultura", gastronomia: "Gastronomía", urbano: "Ciudad",
  nieve: "Nieve", ciclismo: "Ciclismo", familia: "Familia",
};
const DIFICULTAD_COLOR: Record<string, string> = {
  facil: "bg-green-100 text-green-700",
  moderada: "bg-yellow-100 text-yellow-700",
  dificil: "bg-orange-100 text-orange-700",
  "muy-dificil": "bg-red-100 text-red-700",
};
const DIFICULTAD_LABEL: Record<string, string> = {
  facil: "Fácil", moderada: "Moderada", dificil: "Difícil", "muy-dificil": "Muy difícil",
};
const REGION_LABEL: Record<string, string> = {
  alemana: "🇩🇪 Región alemana",
  francesa: "🇫🇷 Región francesa",
  italiana: "🇮🇹 Región italiana",
  romanche: "🏔️ Región romanche",
};

export default async function CantonPlanesPage({ params }: Props) {
  const { canton } = await params;
  const c = cantones.find(x => x.slug === canton);
  if (!c) notFound();

  const destacados = c.actividades.filter(a => a.destacado);
  const gratuitos  = c.actividades.filter(a => (a as any).gratuito);
  const paraFamilias = c.actividades.filter(a => (a as any).aptoNinos);

  const porTipo = c.actividades.reduce((acc, a) => {
    if (!acc[a.tipo]) acc[a.tipo] = [];
    acc[a.tipo].push(a);
    return acc;
  }, {} as Record<string, typeof c.actividades>);

  const schemas = [
    breadcrumbSchema([
      { name: "Inicio", url: BASE_URL },
      { name: "Planes", url: `${BASE_URL}/planes` },
      { name: c.nombre, url: `${BASE_URL}/planes/${canton}` },
    ]),
    itemListSchema(
      c.actividades.slice(0, 20).map(a => ({
        name: a.nombre,
        url: `${BASE_URL}/planes/${canton}/${a.slug}`,
        description: a.descripcion,
      }))
    ),
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-red-700">Inicio</Link>
        <span>›</span>
        <Link href="/planes" className="hover:text-red-700">Planes</Link>
        <span>›</span>
        <span className="text-gray-600">{c.nombre}</span>
      </nav>

      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden mb-8 h-64 md:h-80">
        <Image src={c.imagen} alt={`Planes en ${c.nombre}, Suiza`} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <div className="text-sm text-gray-300 mb-1">{REGION_LABEL[c.region]}</div>
          <h1 className="text-3xl md:text-4xl font-bold">Planes en {c.nombre}</h1>
          <p className="text-gray-200 text-sm mt-1">
            {c.actividades.length} planes · {destacados.length} imprescindibles
            {gratuitos.length > 0 && ` · ${gratuitos.length} gratuitos`}
          </p>
        </div>
      </div>

      {/* Stats rápidas */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-8">
        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <div className="text-xl">🎯</div>
          <div className="font-bold text-gray-800">{c.actividades.length}</div>
          <div className="text-xs text-gray-500">planes</div>
        </div>
        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <div className="text-xl">⭐</div>
          <div className="font-bold text-gray-800">{destacados.length}</div>
          <div className="text-xs text-gray-500">imprescindibles</div>
        </div>
        {gratuitos.length > 0 && (
          <div className="bg-green-50 rounded-xl p-3 text-center">
            <div className="text-xl">🆓</div>
            <div className="font-bold text-gray-800">{gratuitos.length}</div>
            <div className="text-xs text-gray-500">gratuitos</div>
          </div>
        )}
        {paraFamilias.length > 0 && (
          <div className="bg-blue-50 rounded-xl p-3 text-center">
            <div className="text-xl">👶</div>
            <div className="font-bold text-gray-800">{paraFamilias.length}</div>
            <div className="text-xs text-gray-500">para niños</div>
          </div>
        )}
      </div>

      <p className="text-gray-600 mb-8 text-base">{c.descripcion}</p>

      {/* Imprescindibles */}
      {destacados.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">⭐ Imprescindibles en {c.nombre}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {destacados.map(a => (
              <ActividadCard key={a.slug} a={a} cantonSlug={canton} />
            ))}
          </div>
        </div>
      )}

      {/* Para familias */}
      {paraFamilias.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">👨‍👩‍👧 Ideales para familias</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {paraFamilias.slice(0, 4).map(a => (
              <CompactCard key={a.slug} a={a} cantonSlug={canton} />
            ))}
          </div>
        </div>
      )}

      {/* Por tipo */}
      {Object.entries(porTipo).map(([tipo, actividades]) => (
        <div key={tipo} className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-3">
            {TIPO_EMOJI[tipo] || "📍"} {TIPO_LABEL[tipo] || tipo}
            <span className="text-sm font-normal text-gray-400 ml-2">{actividades.length} planes</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {actividades.map(a => (
              <CompactCard key={a.slug} a={a} cantonSlug={canton} />
            ))}
          </div>
        </div>
      ))}

      {/* Otros cantones */}
      <div className="bg-gray-50 rounded-2xl p-6 mt-6">
        <h3 className="font-bold text-gray-800 mb-3 text-sm">Explorar otros cantones</h3>
        <div className="flex flex-wrap gap-2">
          {cantones.filter(x => x.slug !== canton).map(x => (
            <Link key={x.slug} href={`/planes/${x.slug}`}
              className="text-sm px-3 py-1.5 bg-white border border-gray-200 rounded-full text-gray-600 hover:border-red-300 hover:text-red-700 transition-colors">
              {x.nombre}
            </Link>
          ))}
        </div>
        <Link href="/planes" className="block mt-3 text-xs text-red-700 hover:underline font-medium">
          ← Volver a todos los planes
        </Link>
      </div>
    </div>
  );
}

function ActividadCard({ a, cantonSlug }: { a: any; cantonSlug: string }) {
  return (
    <Link href={`/planes/${cantonSlug}/${a.slug}`}
      className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-44">
        <Image src={a.imagen} alt={a.nombre} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {a.dificultad && (
          <div className="absolute top-3 left-3">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${DIFICULTAD_COLOR[a.dificultad]}`}>
              {DIFICULTAD_LABEL[a.dificultad]}
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3 flex gap-1">
          {a.gratuito && <span className="text-xs font-bold bg-green-600 text-white px-2 py-0.5 rounded-full">🆓</span>}
          {a.aptoNinos && <span className="text-xs font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">👶</span>}
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <div className="font-bold text-white text-sm leading-tight">{a.nombre}</div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-2 line-clamp-2">{a.descripcion}</p>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          {a.duracion && <span>⏱ {a.duracion}</span>}
          {a.distancia && <span>📏 {a.distancia}</span>}
          {a.precio
            ? <span className="font-semibold text-gray-700 ml-auto">💰 {a.precio}</span>
            : a.gratuito && <span className="text-green-600 font-semibold ml-auto">🆓 Gratis</span>}
        </div>
      </div>
    </Link>
  );
}

function CompactCard({ a, cantonSlug }: { a: any; cantonSlug: string }) {
  return (
    <Link href={`/planes/${cantonSlug}/${a.slug}`}
      className="group flex gap-3 bg-white border border-gray-100 rounded-xl p-3 hover:border-red-200 hover:shadow-sm transition-all">
      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
        <Image src={a.imagen} alt={a.nombre} fill className="object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-gray-800 text-sm group-hover:text-red-700 leading-snug mb-1">{a.nombre}</div>
        <p className="text-xs text-gray-500 line-clamp-2 mb-2">{a.descripcion}</p>
        <div className="flex items-center gap-2 flex-wrap">
          {a.dificultad && (
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${DIFICULTAD_COLOR[a.dificultad]}`}>
              {DIFICULTAD_LABEL[a.dificultad]}
            </span>
          )}
          {a.duracion && <span className="text-xs text-gray-400">⏱ {a.duracion}</span>}
          {a.precio
            ? <span className="text-xs font-semibold text-gray-700">💰 {a.precio}</span>
            : a.gratuito && <span className="text-xs text-green-600 font-semibold">🆓 Gratis</span>}
          {a.aptoNinos && <span className="text-xs">👶</span>}
        </div>
      </div>
    </Link>
  );
}
