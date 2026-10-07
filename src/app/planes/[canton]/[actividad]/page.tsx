import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cantones } from "@/lib/planes";
import { BASE_URL, buildMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";

type Props = { params: Promise<{ canton: string; actividad: string }> };

export async function generateStaticParams() {
  return cantones.flatMap(c =>
    c.actividades.map(a => ({ canton: c.slug, actividad: a.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { canton, actividad } = await params;
  const c = cantones.find(x => x.slug === canton);
  const a = c?.actividades.find(x => x.slug === actividad);
  if (!a || !c) return {};
  return buildMetadata({
    title: `${a.nombre} — ${c.nombre}, Suiza`,
    description: a.descripcion,
    path: `/planes/${canton}/${actividad}`,
    ogImage: a.imagen,
    ogType: "article",
    keywords: a.keywords,
  });
}

const TIPO_LABEL: Record<string, string> = {
  senderismo: "Senderismo", teleferico: "Teleférico", esqui: "Esquí", lago: "Lago / Agua",
  naturaleza: "Naturaleza", cultura: "Cultura", gastronomia: "Gastronomía", urbano: "Urbano",
  nieve: "Nieve", ciclismo: "Ciclismo", familia: "Familiar",
};
const TIPO_EMOJI: Record<string, string> = {
  senderismo: "🥾", teleferico: "🚡", esqui: "⛷️", lago: "🏊",
  naturaleza: "🌿", cultura: "🏛️", gastronomia: "🧀", urbano: "🏙️",
  nieve: "❄️", ciclismo: "🚴", familia: "👨‍👩‍👧",
};
const DIFICULTAD_LABEL: Record<string, string> = {
  facil: "Fácil", moderada: "Moderada", dificil: "Difícil", "muy-dificil": "Muy difícil",
};
const DIFICULTAD_COLOR: Record<string, string> = {
  facil: "bg-green-100 text-green-700",
  moderada: "bg-yellow-100 text-yellow-700",
  dificil: "bg-orange-100 text-orange-700",
  "muy-dificil": "bg-red-100 text-red-700",
};
const TEMPORADA_LABEL: Record<string, string> = {
  primavera: "🌸 Primavera", verano: "☀️ Verano", otono: "🍂 Otoño", invierno: "❄️ Invierno",
};

export default async function ActividadPage({ params }: Props) {
  const { canton, actividad } = await params;
  const c = cantones.find(x => x.slug === canton);
  const a = c?.actividades.find(x => x.slug === actividad);
  if (!a || !c) notFound();

  const relacionadas = c.actividades
    .filter(x => x.slug !== a.slug)
    .sort((x, y) => (y.destacado ? 1 : 0) - (x.destacado ? 1 : 0))
    .slice(0, 3);

  const faqs = [
    {
      pregunta: `¿Cuánto cuesta ${a.nombre}?`,
      respuesta: a.precio
        ? `El precio aproximado es de ${a.precio}. Te recomendamos verificar los precios actuales en el momento de tu visita.`
        : `${a.nombre} es gratuito o de acceso libre. Solo necesitas transporte para llegar.`,
    },
    {
      pregunta: `¿Cuándo es la mejor época para ${a.nombre}?`,
      respuesta: `Las mejores épocas son: ${a.temporada.map(t => TEMPORADA_LABEL[t]).join(", ")}. ${a.tipo === "esqui" || a.tipo === "nieve" ? "Fuera de temporada de nieve puede estar cerrado." : ""}`,
    },
    {
      pregunta: `¿Cómo llegar a ${a.nombre}?`,
      respuesta: a.comoLlegar,
    },
    ...(a.dificultad ? [{
      pregunta: `¿Qué nivel físico se necesita para ${a.nombre}?`,
      respuesta: `La dificultad es ${DIFICULTAD_LABEL[a.dificultad]}. ${
        a.dificultad === "facil" ? "Apto para toda la familia, incluidos niños y personas mayores." :
        a.dificultad === "moderada" ? "Recomendable tener algo de forma física. Calzado deportivo adecuado." :
        "Se recomienda experiencia previa y equipamiento adecuado."
      }`,
    }] : []),
    ...((a as any).aptoNinos ? [{
      pregunta: `¿Es ${a.nombre} apto para niños?`,
      respuesta: `Sí, ${a.nombre} es apto para familias con niños. ${a.dificultad === "facil" ? "El acceso es fácil y no requiere esfuerzo físico especial." : "Recomendable para niños a partir de 6-8 años con buena condición física."}`,
    }] : []),
  ];

  const schemas = [
    breadcrumbSchema([
      { name: "Inicio", url: BASE_URL },
      { name: "Planes", url: `${BASE_URL}/planes` },
      { name: c.nombre, url: `${BASE_URL}/planes/${canton}` },
      { name: a.nombre, url: `${BASE_URL}/planes/${canton}/${actividad}` },
    ]),
    faqSchema(faqs),
    {
      "@context": "https://schema.org",
      "@type": "TouristAttraction",
      name: a.nombre,
      description: a.descripcion,
      url: `${BASE_URL}/planes/${canton}/${actividad}`,
      image: { "@type": "ImageObject", url: a.imagen, width: 1200, height: 630 },
      touristType: TIPO_LABEL[a.tipo],
      availableLanguage: "Spanish",
      containedInPlace: { "@type": "State", name: c.nombre },
      isAccessibleForFree: (a as any).gratuito ?? !a.precio,
      ...(a.precio ? {
        offers: {
          "@type": "Offer",
          price: a.precio.replace(/[^0-9.,–-]/g, "").split(/[–-]/)[0].trim(),
          priceCurrency: "CHF",
          availability: "https://schema.org/InStock",
          description: `Precio aproximado: ${a.precio}`,
        },
      } : {}),
      ...((a as any).coordenadas ? {
        geo: {
          "@type": "GeoCoordinates",
          latitude: (a as any).coordenadas.lat,
          longitude: (a as any).coordenadas.lng,
        }
      } : {}),
    },
  ];

  const actividadExt = a as any;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2 flex-wrap" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-red-700">Inicio</Link>
        <span>›</span>
        <Link href="/planes" className="hover:text-red-700">Planes</Link>
        <span>›</span>
        <Link href={`/planes/${canton}`} className="hover:text-red-700">{c.nombre}</Link>
        <span>›</span>
        <span className="text-gray-600">{a.nombre}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* ── Main content ──────────────────────────────────── */}
        <div className="flex-1 min-w-0">

          {/* Hero image */}
          <div className="relative rounded-2xl overflow-hidden mb-6 h-72 md:h-96">
            <Image src={a.imagen} alt={a.nombre} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
              <span className="text-xs font-bold bg-red-700 text-white px-3 py-1 rounded-full">
                {TIPO_EMOJI[a.tipo]} {TIPO_LABEL[a.tipo]}
              </span>
              {a.dificultad && (
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${DIFICULTAD_COLOR[a.dificultad]}`}>
                  {DIFICULTAD_LABEL[a.dificultad]}
                </span>
              )}
              {actividadExt.gratuito && (
                <span className="text-xs font-bold bg-green-600 text-white px-3 py-1 rounded-full">🆓 Gratis</span>
              )}
            </div>
            {/* Badges en la parte inferior de la imagen */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              {actividadExt.aptoNinos && (
                <span className="text-xs font-bold bg-blue-600 text-white px-2 py-1 rounded-full">👶 Niños</span>
              )}
              {actividadExt.aptoPerros && (
                <span className="text-xs font-bold bg-amber-600 text-white px-2 py-1 rounded-full">🐕 Perros</span>
              )}
            </div>
          </div>

          {/* Título */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{a.nombre}</h1>
            <p className="text-gray-500 text-lg">{a.descripcion}</p>
          </div>

          {/* Datos rápidos */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {[
              a.duracion   && { label: "Duración",  value: a.duracion,           emoji: "⏱️" },
              a.distancia  && { label: "Distancia", value: a.distancia,          emoji: "📏" },
              a.desnivel   && { label: "Desnivel",  value: a.desnivel,           emoji: "📈" },
              actividadExt.altitud && { label: "Altitud",   value: actividadExt.altitud, emoji: "⛰️" },
              a.precio     && { label: "Precio",    value: a.precio,             emoji: "💰" },
              (!a.precio && actividadExt.gratuito) && { label: "Precio",    value: "Gratuito",           emoji: "🆓" },
            ].filter(Boolean).slice(0, 4).map((stat: any) => (
              <div key={stat.label} className="bg-gray-50 rounded-xl p-3 text-center">
                <div className="text-xl mb-1">{stat.emoji}</div>
                <div className="font-bold text-gray-800 text-sm">{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Temporadas */}
          <div className="mb-6">
            <h2 className="font-bold text-gray-800 mb-2 text-base">Mejor época</h2>
            <div className="flex flex-wrap gap-2">
              {a.temporada.map((t: string) => (
                <span key={t} className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100">
                  {TEMPORADA_LABEL[t]}
                </span>
              ))}
            </div>
          </div>

          {/* Equipamiento necesario */}
          {actividadExt.equipamiento && actividadExt.equipamiento.length > 0 && (
            <div className="bg-green-50 border border-green-100 rounded-xl p-5 mb-6">
              <h2 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span>🎒</span> Qué llevar
              </h2>
              <div className="flex flex-wrap gap-2">
                {actividadExt.equipamiento.map((item: string, i: number) => (
                  <span key={i} className="text-sm bg-white text-gray-700 px-3 py-1.5 rounded-lg border border-green-200 flex items-center gap-1.5">
                    <span className="text-green-500">✓</span> {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Cómo llegar + SBB */}
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
              <span>🚉</span> Cómo llegar
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed mb-3">{a.comoLlegar}</p>
            {a.cercaDe && (
              <p className="text-xs text-gray-500 mb-3">📍 Referencia: {a.cercaDe}</p>
            )}
            <a
              href={actividadExt.urlSBB || "https://www.sbb.ch/es/horarios.html"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-700 hover:bg-red-600 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors"
            >
              🚆 Ver horarios de tren SBB →
            </a>
          </div>

          {/* Mapa mini si hay coordenadas */}
          {actividadExt.coordenadas && (
            <div className="mb-6">
              <h2 className="font-bold text-gray-800 mb-2 text-base">📍 Ubicación</h2>
              <a
                href={`https://www.openstreetmap.org/?mlat=${actividadExt.coordenadas.lat}&mlon=${actividadExt.coordenadas.lng}&zoom=13`}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gray-100 rounded-xl overflow-hidden hover:opacity-90 transition-opacity"
              >
                <img
                  src={`https://staticmap.openstreetmap.de/staticmap.php?center=${actividadExt.coordenadas.lat},${actividadExt.coordenadas.lng}&zoom=12&size=800x200&markers=${actividadExt.coordenadas.lat},${actividadExt.coordenadas.lng},red`}
                  alt={`Mapa de ${a.nombre}`}
                  className="w-full h-40 object-cover"
                  loading="lazy"
                />
                <div className="p-2 text-xs text-gray-500 text-center">
                  Abrir en OpenStreetMap →
                </div>
              </a>
            </div>
          )}

          {/* Consejos */}
          <div className="mb-8">
            <h2 className="font-bold text-gray-800 mb-3 text-base">💡 Consejos prácticos</h2>
            <ul className="space-y-2">
              {a.consejos.map((consejo: string, i: number) => (
                <li key={i} className="flex gap-3 text-sm text-gray-700 bg-white border border-gray-100 rounded-lg p-3">
                  <span className="text-green-500 flex-shrink-0 font-bold">{i + 1}.</span>
                  {consejo}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA planes */}
          <div className="rounded-2xl p-6 mb-8 text-white"
               style={{ background: "linear-gradient(135deg, #C8102E, #A00D24)" }}>
            <h3 className="font-bold text-lg mb-2">¿Buscas más planes en Suiza?</h3>
            <p className="text-red-100 text-sm mb-4">
              Explora excursiones, rutas de senderismo y actividades en los 26 cantones. Guías en español para hispanohablantes.
            </p>
            <div className="flex flex-wrap gap-2">
              <Link href="/planes"
                className="inline-block bg-white text-red-700 font-bold px-5 py-2.5 rounded-full hover:bg-red-50 transition-colors text-sm">
                Ver todos los planes →
              </Link>
              <Link href="/planes/itinerarios"
                className="inline-block bg-red-600 text-white font-bold px-5 py-2.5 rounded-full hover:bg-red-500 transition-colors text-sm border border-red-400">
                Ver itinerarios →
              </Link>
            </div>
          </div>

          {/* FAQs */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Preguntas frecuentes</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-5">
                  <h3 className="font-semibold text-gray-800 mb-1 text-sm">{faq.pregunta}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.respuesta}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Sidebar ──────────────────────────────────────── */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="sticky top-4 space-y-4">

            {/* Info rápida */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-800 mb-3 text-sm">Información rápida</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span>{TIPO_EMOJI[a.tipo]}</span>
                  <span className="text-gray-600">{TIPO_LABEL[a.tipo]}</span>
                </div>
                {a.dificultad && (
                  <div className="flex items-center gap-2">
                    <span>🧗</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${DIFICULTAD_COLOR[a.dificultad]}`}>
                      {DIFICULTAD_LABEL[a.dificultad]}
                    </span>
                  </div>
                )}
                {a.duracion && (
                  <div className="flex items-center gap-2">
                    <span>⏱️</span>
                    <span className="text-gray-600">{a.duracion}</span>
                  </div>
                )}
                {a.precio ? (
                  <div className="flex items-center gap-2">
                    <span>💰</span>
                    <span className="text-gray-700 font-medium">{a.precio}</span>
                  </div>
                ) : actividadExt.gratuito && (
                  <div className="flex items-center gap-2">
                    <span>🆓</span>
                    <span className="text-green-700 font-medium">Gratuito</span>
                  </div>
                )}
                {actividadExt.altitud && (
                  <div className="flex items-center gap-2">
                    <span>⛰️</span>
                    <span className="text-gray-600">{actividadExt.altitud}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span>🗺️</span>
                  <Link href={`/planes/${canton}`} className="text-red-700 hover:underline">{c.nombre}</Link>
                </div>
              </div>

              {/* Aptitudes */}
              <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-50">
                {actividadExt.aptoNinos && (
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full border border-blue-100">👶 Apto niños</span>
                )}
                {actividadExt.aptoPerros && (
                  <span className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full border border-amber-100">🐕 Perros OK</span>
                )}
              </div>
            </div>

            {/* Más planes en este cantón */}
            {relacionadas.length > 0 && (
              <div className="bg-white border border-gray-100 rounded-2xl p-5">
                <h3 className="font-bold text-gray-800 mb-3 text-sm">Más planes en {c.nombre}</h3>
                <ul className="space-y-3">
                  {relacionadas.map(r => (
                    <li key={r.slug}>
                      <Link href={`/planes/${canton}/${r.slug}`}
                        className="text-sm text-gray-700 hover:text-red-700 transition-colors block leading-snug">
                        {TIPO_EMOJI[r.tipo]} {r.nombre}
                      </Link>
                      {r.precio && <span className="text-xs text-gray-400">{r.precio}</span>}
                      {!r.precio && (r as any).gratuito && <span className="text-xs text-green-600">Gratis</span>}
                    </li>
                  ))}
                </ul>
                <Link href={`/planes/${canton}`}
                  className="block mt-3 text-xs text-red-700 hover:underline font-semibold">
                  Ver todos en {c.nombre} →
                </Link>
              </div>
            )}

            {/* Herramientas */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-800 mb-1 text-sm">🧮 Planifica tu viaje</h3>
              <p className="text-xs text-gray-500 mb-3">Calcula cuánto te cuesta vivir cerca de aquí.</p>
              <Link href="/herramientas/comparador-ciudades"
                className="inline-block text-sm font-semibold text-blue-700 hover:underline">
                Comparar ciudades →
              </Link>
            </div>

            {/* Itinerarios */}
            <div className="bg-gray-800 rounded-2xl p-5 text-white">
              <h3 className="font-bold mb-1 text-sm">🗓️ Itinerarios curados</h3>
              <p className="text-xs text-gray-400 mb-3">¿No sabes por dónde empezar? Tenemos rutas completas.</p>
              <Link href="/planes/itinerarios"
                className="inline-block text-sm font-semibold text-red-400 hover:text-red-300">
                Ver itinerarios →
              </Link>
            </div>

            {/* Todos los cantones */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-800 mb-3 text-sm">Otros cantones</h3>
              <div className="flex flex-wrap gap-1.5">
                {cantones.filter(x => x.slug !== canton).slice(0, 12).map(x => (
                  <Link key={x.slug} href={`/planes/${x.slug}`}
                    className="text-xs px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 hover:border-red-300 hover:text-red-700 transition-colors">
                    {x.nombre}
                  </Link>
                ))}
              </div>
              <Link href="/planes" className="block mt-2 text-xs text-red-700 hover:underline font-semibold">
                Ver todos →
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
