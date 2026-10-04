import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ciudades, getCiudad } from "@/lib/ciudades";
import { allPosts } from "@/lib/posts";
import { BASE_URL, buildMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";

type Props = PageProps<"/ciudades/[ciudad]">;

export async function generateStaticParams() {
  return ciudades.map((c) => ({ ciudad: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ciudad } = await params;
  const c = getCiudad(ciudad);
  if (!c) return {};
  return buildMetadata({
    title: `Vivir en ${c.nombre} — Guía para hispanohablantes ${new Date().getFullYear()}`,
    description: `Todo lo que necesitas saber para vivir en ${c.nombre}: alquiler, salarios, trabajo, barrios y comunidad hispanohablante. Guía actualizada ${new Date().getFullYear()}.`,
    path: `/ciudades/${ciudad}`,
    keywords: c.keywords,
  });
}

const COSTE_LABEL: Record<string, string> = {
  "muy-alto": "Muy alto",
  "alto": "Alto",
  "moderado": "Moderado",
};
const COSTE_COLOR: Record<string, string> = {
  "muy-alto": "bg-red-100 text-red-700",
  "alto": "bg-amber-100 text-amber-700",
  "moderado": "bg-green-100 text-green-700",
};

export default async function CiudadPage({ params }: Props) {
  const { ciudad } = await params;
  const c = getCiudad(ciudad);
  if (!c) notFound();

  // Artículos relacionados con esta ciudad
  const articulosRelacionados = allPosts.filter(
    (p) =>
      p.slug.includes(ciudad) ||
      (p.palabrasClave ?? []).some((k) => k.toLowerCase().includes(c.nombre.toLowerCase()))
  ).slice(0, 6);

  // FAQs específicas de la ciudad
  const faqs = [
    {
      pregunta: `¿Qué idioma se habla en ${c.nombre}?`,
      respuesta: `En ${c.nombre} se habla ${c.idioma}. Es el idioma que necesitarás para el día a día, buscar piso, y en muchos trabajos locales.`,
    },
    {
      pregunta: `¿Cuánto cuesta un piso en ${c.nombre}?`,
      respuesta: `Un estudio en ${c.nombre} cuesta entre ${c.alquilerEstudio} al mes. Un piso de 3 habitaciones está entre ${c.alquiler3hab}. Los precios varían mucho según el barrio.`,
    },
    {
      pregunta: `¿Cuál es el salario medio en ${c.nombre}?`,
      respuesta: `El salario medio bruto en ${c.nombre} es de aproximadamente ${c.salarioMedio}. Varía mucho según el sector: finanzas y tech pagan más, el sector público algo menos.`,
    },
    {
      pregunta: `¿Hay comunidad hispanohablante en ${c.nombre}?`,
      respuesta: `Sí, hay aproximadamente ${c.hispanohablantes} hispanohablantes en ${c.nombre}. Existen grupos de WhatsApp, asociaciones culturales y eventos regulares para la comunidad.`,
    },
  ];

  const schemas = [
    breadcrumbSchema([
      { name: "Inicio", url: BASE_URL },
      { name: "Ciudades", url: `${BASE_URL}/ciudades` },
      { name: c.nombre, url: `${BASE_URL}/ciudades/${ciudad}` },
    ]),
    faqSchema(faqs),
    {
      "@context": "https://schema.org",
      "@type": "Place",
      name: c.nombre,
      description: c.descripcion,
      url: `${BASE_URL}/ciudades/${ciudad}`,
      containedInPlace: {
        "@type": "Country",
        name: "Suiza",
      },
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-red-700">Inicio</Link>
        <span aria-hidden>›</span>
        <Link href="/ciudades" className="hover:text-red-700">Ciudades</Link>
        <span aria-hidden>›</span>
        <span className="text-gray-600">{c.nombre}</span>
      </nav>

      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden mb-8 h-64 md:h-80">
        <Image
          src={c.imagen}
          alt={`Vista de ${c.nombre}, Suiza`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-3xl">{c.emoji}</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${COSTE_COLOR[c.costeVida]}`}>
              Coste de vida: {COSTE_LABEL[c.costeVida]}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">Vivir en {c.nombre}</h1>
          <p className="text-gray-200 text-sm mt-1">{c.canton} · {c.idioma}</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Main */}
        <div className="flex-1 min-w-0">

          {/* Resumen rápido — optimizado para featured snippet */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
            <h2 className="font-bold text-gray-800 mb-1 text-base">Resumen rápido</h2>
            <p className="text-gray-700 text-sm leading-relaxed">{c.descripcion}</p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {[
              { label: "Población", value: c.poblacion },
              { label: "Hispanohablantes", value: c.hispanohablantes },
              { label: "Idioma", value: c.idioma },
              { label: "Alquiler estudio", value: c.alquilerEstudio },
              { label: "Alquiler 3 hab.", value: c.alquiler3hab },
              { label: "Salario medio bruto", value: c.salarioMedio },
            ].map((stat) => (
              <div key={stat.label} className="bg-white border border-gray-100 rounded-xl p-4 text-center">
                <div className="text-xs text-gray-400 mb-1">{stat.label}</div>
                <div className="font-bold text-gray-800 text-sm">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Descripción larga */}
          <div className="prose max-w-none mb-8">
            {c.descripcionLarga.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Pros y contras */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 border border-green-100 rounded-xl p-5">
              <h2 className="font-bold text-gray-800 mb-3">✅ Ventajas de {c.nombre}</h2>
              <ul className="space-y-2">
                {c.pros.map((pro, i) => (
                  <li key={i} className="text-sm text-gray-700 flex gap-2">
                    <span className="text-green-600 flex-shrink-0">+</span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-xl p-5">
              <h2 className="font-bold text-gray-800 mb-3">⚠️ Inconvenientes</h2>
              <ul className="space-y-2">
                {c.contras.map((con, i) => (
                  <li key={i} className="text-sm text-gray-700 flex gap-2">
                    <span className="text-red-500 flex-shrink-0">–</span>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Barrios */}
          <h2 className="text-xl font-bold text-gray-800 mb-4">Barrios y zonas donde vivir en {c.nombre}</h2>
          <div className="space-y-3 mb-8">
            {c.barrios.map((b) => (
              <div key={b.nombre} className="bg-white border border-gray-100 rounded-xl p-4 flex gap-3">
                <span className="text-lg flex-shrink-0">🏘️</span>
                <div>
                  <div className="font-semibold text-gray-800 text-sm">{b.nombre}</div>
                  <div className="text-gray-600 text-sm">{b.descripcion}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Transporte */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-8">
            <h2 className="font-bold text-gray-800 mb-1 text-base">🚌 Transporte público</h2>
            <p className="text-sm text-gray-700">{c.transportePublico}</p>
          </div>

          {/* Herramientas CTA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <Link
              href="/herramientas/salario-neto"
              className="flex items-center gap-3 bg-white border border-gray-200 hover:border-red-300 rounded-xl p-4 transition-colors group"
            >
              <span className="text-2xl">🧮</span>
              <div>
                <div className="font-semibold text-gray-800 text-sm group-hover:text-red-700">Calculadora de salario neto</div>
                <div className="text-xs text-gray-500">Cuánto te quedará en mano en {c.nombre}</div>
              </div>
            </Link>
            <Link
              href="/herramientas/comparador-ciudades"
              className="flex items-center gap-3 bg-white border border-gray-200 hover:border-red-300 rounded-xl p-4 transition-colors group"
            >
              <span className="text-2xl">⚖️</span>
              <div>
                <div className="font-semibold text-gray-800 text-sm group-hover:text-red-700">Comparador de ciudades</div>
                <div className="text-xs text-gray-500">Compara {c.nombre} con otra ciudad</div>
              </div>
            </Link>
          </div>

          {/* FAQs */}
          <h2 className="text-xl font-bold text-gray-800 mb-4">Preguntas frecuentes sobre vivir en {c.nombre}</h2>
          <div className="space-y-4 mb-8">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-5">
                <h3 className="font-semibold text-gray-800 mb-2">{faq.pregunta}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.respuesta}</p>
              </div>
            ))}
          </div>

          {/* Artículos relacionados */}
          {articulosRelacionados.length > 0 && (
            <>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Guías sobre {c.nombre}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {articulosRelacionados.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="bg-white border border-gray-100 hover:border-red-200 rounded-xl p-4 transition-colors group"
                  >
                    <div className="font-semibold text-gray-800 text-sm group-hover:text-red-700 mb-1">{post.titulo}</div>
                    <div className="text-xs text-gray-500">{post.tiempoLectura} min · {post.descripcion.slice(0, 80)}…</div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          {/* Otras ciudades */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-6 sticky top-4">
            <h3 className="font-bold text-gray-800 mb-3 text-sm">Otras ciudades</h3>
            <ul className="space-y-2">
              {ciudades
                .filter((x) => x.slug !== ciudad)
                .map((x) => (
                  <li key={x.slug}>
                    <Link
                      href={`/ciudades/${x.slug}`}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-700 transition-colors py-1"
                    >
                      <span>{x.emoji}</span>
                      <span>{x.nombre}</span>
                    </Link>
                  </li>
                ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Link href="/ciudades" className="text-xs text-red-700 font-semibold hover:underline">
                Ver todas las ciudades →
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
