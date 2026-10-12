import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { paises, getPais } from "@/lib/latinoamericanos";
import { BASE_URL, buildMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";

type Props = {
  params: Promise<{ pais: string }>;
};

export async function generateStaticParams() {
  return paises.map((p) => ({ pais: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pais: paisSlug } = await params;
  const pais = getPais(paisSlug);
  if (!pais) return {};
  const extraHreflang: Record<string, Record<string, string>> = {
    venezuela: { "es-VE": `${BASE_URL}/latinoamericanos/venezuela` },
    peru:      { "es-PE": `${BASE_URL}/latinoamericanos/peru` },
    ecuador:   { "es-EC": `${BASE_URL}/latinoamericanos/ecuador` },
  };
  return buildMetadata({
    title: `Emigrar a Suiza desde ${pais.nombre}: visado, permiso y proceso ${new Date().getFullYear()}`,
    description: `Guía ${new Date().getFullYear()} para emigrar a Suiza desde ${pais.nombre}: permiso de trabajo, sistema de cuotas, cantones más abiertos y profesiones en demanda.`,
    path: `/latinoamericanos/${pais.slug}`,
    ogImage: pais.imagen,
    keywords: pais.keywords,
    extraLanguages: extraHreflang[pais.slug] ?? {},
  });
}

const DIFICULTAD_LABEL: Record<string, string> = {
  "muy-alto": "Muy alta",
  "alto": "Alta",
};
const DIFICULTAD_COLOR: Record<string, string> = {
  "muy-alto": "bg-red-100 text-red-700",
  "alto": "bg-amber-100 text-amber-700",
};

export default async function PaisPage({ params }: Props) {
  const { pais: paisSlug } = await params;
  const pais = getPais(paisSlug);
  if (!pais) notFound();

  const schemas = [
    breadcrumbSchema([
      { name: "Inicio", url: BASE_URL },
      { name: "Latinoamericanos", url: `${BASE_URL}/latinoamericanos` },
      { name: pais.nombre, url: `${BASE_URL}/latinoamericanos/${pais.slug}` },
    ]),
    faqSchema(pais.faqs),
  ];

  const otrosPaises = paises.filter((p) => p.slug !== pais.slug);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-[#C8102E]">Inicio</Link>
        <span aria-hidden>›</span>
        <Link href="/latinoamericanos" className="hover:text-[#C8102E]">Latinoamericanos</Link>
        <span aria-hidden>›</span>
        <span className="text-gray-600">{pais.nombre}</span>
      </nav>

      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden mb-8 h-64 md:h-80">
        <Image
          src={pais.imagen}
          alt={`Emigrar a Suiza desde ${pais.nombre}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-4xl">{pais.emoji}</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${DIFICULTAD_COLOR[pais.nivelDificultad]}`}>
              Dificultad: {DIFICULTAD_LABEL[pais.nivelDificultad]}
            </span>
            <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">
              {pais.poblacionEnSuiza}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>
            Emigrar a Suiza desde {pais.nombre}
          </h1>
          <p className="text-gray-200 text-sm mt-1">Visado, permiso de trabajo y proceso completo 2026</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Main content */}
        <div className="flex-1 min-w-0">

          {/* Resumen rápido */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
            <h2 className="font-bold text-gray-800 mb-1 text-base">Resumen del proceso</h2>
            <p className="text-gray-700 text-sm leading-relaxed">{pais.descripcion}</p>
          </div>

          {/* Stats clave */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {[
              { label: "Residentes en Suiza", value: pais.poblacionEnSuiza },
              { label: "Permiso principal", value: pais.permisoPrincipal.split("(")[0].trim() },
              { label: "Plazo estimado", value: pais.plazosEstimados },
              { label: "Salario esperado", value: pais.salarioMedioEsperado.split("(")[0].trim() },
              { label: "Dificultad proceso", value: DIFICULTAD_LABEL[pais.nivelDificultad] },
              { label: "Mejor cantón", value: pais.cantonesMasAbiertos[0] },
            ].map((stat) => (
              <div key={stat.label} className="bg-white border border-gray-100 rounded-xl p-4 text-center">
                <div className="text-xs text-gray-400 mb-1">{stat.label}</div>
                <div className="font-bold text-gray-800 text-sm leading-tight">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Descripción larga */}
          <div className="prose max-w-none mb-8 text-gray-700 leading-relaxed">
            {pais.descripcionLarga.split("\n\n").map((para, i) => (
              <p key={i} className="mb-4 text-sm md:text-base">{para}</p>
            ))}
          </div>

          {/* Requisitos clave */}
          <h2 className="text-xl font-bold text-gray-800 mb-4">Requisitos clave para {pais.nombre}</h2>
          <div className="bg-white border border-gray-100 rounded-xl p-5 mb-8">
            <ul className="space-y-2">
              {pais.requisitosClave.map((req, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-[#C8102E]/10 text-[#C8102E] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {/* Pasos detallados — timeline */}
          <h2 className="text-xl font-bold text-gray-800 mb-4">Proceso paso a paso desde {pais.nombre}</h2>
          <div className="space-y-6 mb-8">
            {pais.pasosDetallados.map((paso, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-[#C8102E] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </div>
                  {i < pais.pasosDetallados.length - 1 && (
                    <div className="w-px flex-1 bg-gray-200 mt-2" style={{ minHeight: "2rem" }} />
                  )}
                </div>
                <div className="bg-white border border-gray-100 rounded-xl p-4 flex-1 mb-2">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-gray-800 text-sm">{paso.titulo}</h3>
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full flex-shrink-0">{paso.duracion}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{paso.descripcion}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Cantones más abiertos */}
          <h2 className="text-xl font-bold text-gray-800 mb-4">Cantones más accesibles para ciudadanos de {pais.nombre}</h2>
          <div className="bg-white border border-gray-100 rounded-xl p-5 mb-8">
            <p className="text-gray-500 text-sm mb-4">
              Estos cantones han tenido históricamente mayor disponibilidad de cuota o mayor demanda laboral en sectores accesibles para tu perfil. No garantizan el permiso, pero aumentan las probabilidades.
            </p>
            <div className="flex flex-wrap gap-2">
              {pais.cantonesMasAbiertos.map((canton) => (
                <span key={canton} className="bg-[#C8102E]/5 border border-[#C8102E]/20 text-[#C8102E] text-sm font-medium px-3 py-1 rounded-full">
                  📍 {canton}
                </span>
              ))}
            </div>
          </div>

          {/* Profesiones en demanda */}
          <h2 className="text-xl font-bold text-gray-800 mb-4">Profesiones en demanda para {pais.nombre}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {pais.profesionesEnDemanda.map((prof, i) => (
              <div key={i} className="flex gap-2 items-start bg-white border border-gray-100 rounded-xl p-3">
                <span className="text-[#C8102E] font-bold text-sm flex-shrink-0 mt-0.5">→</span>
                <span className="text-sm text-gray-700">{prof}</span>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 rounded-xl p-4 mb-8">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-800">Salario esperado:</span> {pais.salarioMedioEsperado}
            </p>
          </div>

          {/* Advertencias */}
          <h2 className="text-xl font-bold text-gray-800 mb-4">Errores comunes y cosas a evitar</h2>
          <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-8">
            <ul className="space-y-3">
              {pais.advertencias.map((adv, i) => (
                <li key={i} className="flex gap-3 text-sm text-red-800">
                  <span className="flex-shrink-0 text-red-500 font-bold mt-0.5">!</span>
                  <span className="leading-relaxed">{adv}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recursos oficiales */}
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recursos oficiales y útiles</h2>
          <div className="space-y-3 mb-8">
            {pais.recursos.map((rec, i) => (
              <a
                key={i}
                href={rec.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 items-start bg-white border border-gray-100 hover:border-[#C8102E]/30 rounded-xl p-4 transition-colors group"
              >
                <span className="text-lg flex-shrink-0">🔗</span>
                <div>
                  <div className="font-semibold text-gray-800 text-sm group-hover:text-[#C8102E] transition-colors">{rec.nombre}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{rec.descripcion}</div>
                </div>
              </a>
            ))}
          </div>

          {/* CTAs herramientas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <Link
              href="/herramientas/salario-neto"
              className="flex items-center gap-3 bg-white border border-gray-200 hover:border-[#C8102E]/40 rounded-xl p-4 transition-colors group"
            >
              <span className="text-2xl">🧮</span>
              <div>
                <div className="font-semibold text-gray-800 text-sm group-hover:text-[#C8102E]">Calculadora de salario neto</div>
                <div className="text-xs text-gray-500">Cuánto cobrarías realmente en Suiza</div>
              </div>
            </Link>
            <Link
              href="/trabajo/buscador"
              className="flex items-center gap-3 bg-white border border-gray-200 hover:border-[#C8102E]/40 rounded-xl p-4 transition-colors group"
            >
              <span className="text-2xl">🔍</span>
              <div>
                <div className="font-semibold text-gray-800 text-sm group-hover:text-[#C8102E]">Buscador de trabajo en Suiza</div>
                <div className="text-xs text-gray-500">Ofertas de empleo en todos los sectores</div>
              </div>
            </Link>
          </div>

          {/* FAQs del país */}
          <h2 className="text-xl font-bold text-gray-800 mb-4">Preguntas frecuentes — {pais.nombre}</h2>
          <div className="space-y-4">
            {pais.faqs.map((faq, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-5">
                <h3 className="font-semibold text-gray-800 mb-2 text-sm md:text-base">{faq.pregunta}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.respuesta}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-6 sticky top-4">
            {/* Resumen de datos clave */}
            <h3 className="font-bold text-gray-800 mb-3 text-sm">Datos clave</h3>
            <div className="space-y-3 mb-5">
              <div className="text-xs text-gray-500">
                <span className="font-semibold text-gray-700 block">Permiso</span>
                {pais.permisoPrincipal}
              </div>
              <div className="text-xs text-gray-500">
                <span className="font-semibold text-gray-700 block">Plazo</span>
                {pais.plazosEstimados}
              </div>
              <div className="text-xs text-gray-500">
                <span className="font-semibold text-gray-700 block">Dificultad</span>
                <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mt-1 ${DIFICULTAD_COLOR[pais.nivelDificultad]}`}>
                  {DIFICULTAD_LABEL[pais.nivelDificultad]}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                <span className="font-semibold text-gray-700 block">Salario esperado</span>
                {pais.salarioMedioEsperado}
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 mb-4">
              <h3 className="font-bold text-gray-800 mb-3 text-sm">Otros países</h3>
              <ul className="space-y-2">
                {otrosPaises.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/latinoamericanos/${p.slug}`}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#C8102E] transition-colors py-1"
                    >
                      <span>{p.emoji}</span>
                      <span>{p.nombre}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <Link href="/latinoamericanos" className="text-xs text-[#C8102E] font-semibold hover:underline">
                ← Guía general Latinoamérica
              </Link>
            </div>
          </div>

          {/* CTA herramientas sidebar */}
          <div className="bg-[#0A0A0A] rounded-2xl p-5 text-white">
            <h3 className="font-bold text-sm mb-2">¿Cuánto cobrarías en Suiza?</h3>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
              Calcula tu salario neto real en Suiza descontando impuestos, seguro de salud y cotizaciones.
            </p>
            <Link
              href="/herramientas/salario-neto"
              className="block text-center bg-[#C8102E] hover:bg-red-700 text-white text-sm font-semibold rounded-lg py-2 px-3 transition-colors"
            >
              Calcular ahora →
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
