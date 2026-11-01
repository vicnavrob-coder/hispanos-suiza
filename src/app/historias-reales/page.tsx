import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, BASE_URL, breadcrumbSchema, itemListSchema } from "@/lib/seo";
import { getHistorias } from "@/lib/historias-comunidad";
import HistoriaCard from "@/components/HistoriaCard";

export const metadata: Metadata = buildMetadata({
  title: "Historias reales — Experiencias sin filtros de hispanohablantes en Suiza",
  description: "Historias reales de españoles y latinoamericanos que viven en Suiza. Lo que nadie te cuenta: errores, sorpresas, consejos prácticos de quienes ya lo vivieron.",
  path: "/historias-reales",
  ogImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=85&auto=format&fit=crop",
  keywords: [
    "historias reales suiza", "experiencias españoles suiza", "vivir en suiza testimonios",
    "comunidad hispana suiza", "expatriados suiza experiencias",
    "testimonio vivir suiza", "consejos emigrar suiza", "retos vivir suiza",
  ],
});

// Historias hardcodeadas (legado)
const historiasLegacy = [
  {
    nombre: "Carlos G.",
    origen: "Valencia, España",
    ciudad: "Zúrich",
    trabajo: "Ingeniero de software",
    anio: "2024",
    resumen: "Llegué sin hablar alemán, con un contrato de trabajo y €2.000 en el bolsillo. Lo que nadie me contó sobre los primeros 3 meses.",
    extracto: "El mayor error fue no contratar el seguro médico la primera semana. Pensé que tenía 3 meses, y técnicamente los tienes, pero si tienes cualquier problema de salud en ese tiempo y luego contratas, la aseguradora aplica retroactividad y pagas todo de golpe.",
    tags: ["seguro médico", "Zúrich", "ingeniero"],
  },
  {
    nombre: "María F.",
    origen: "Bogotá, Colombia",
    ciudad: "Ginebra",
    trabajo: "Traductora freelance",
    anio: "2023",
    resumen: "Vine con visa de turista, conseguí trabajo en 6 semanas y regularicé mi situación. Cómo lo hice siendo latinoamericana.",
    extracto: "Muchos me decían que era imposible regularizarse una vez dentro. No es verdad, pero hay que hacerlo muy bien. Encontré trabajo a través de LinkedIn, la empresa tramitó el permiso B y el proceso tardó 3 meses.",
    tags: ["latinoamericana", "Ginebra", "visado", "freelance"],
  },
  {
    nombre: "Alejandro & Lucía",
    origen: "Buenos Aires, Argentina",
    ciudad: "Basilea",
    trabajo: "Farmacéuticos",
    anio: "2025",
    resumen: "Nos mudamos los dos juntos con dos hijos. El proceso de escolarización, el alemán y por qué elegimos Basilea y no Zúrich.",
    extracto: "Basilea era más barata que Zúrich (un 20% menos en alquiler), más pequeña y con mucho trabajo en farmacéuticas. Con dos hijos en edad escolar, el sistema suizo fue una sorpresa: excelente, gratuito y muy diferente al argentino.",
    tags: ["familia", "Basilea", "educación", "farmacia"],
  },
  {
    nombre: "Elena R.",
    origen: "Lima, Perú",
    ciudad: "Lausana",
    trabajo: "Hostelería",
    anio: "2024",
    resumen: "Empecé en hostelería, ahorré, saqué un curso de cocina suizo y ahora gano 4.500 CHF/mes. Mi camino en 18 meses.",
    extracto: "La hostelería es la puerta más fácil de entrada en Suiza para latinoamericanos sin título homologado. El trabajo es duro pero los sueldos son reales: 3.200 CHF limpios de entrada. En 18 meses subí a jefe de cocina.",
    tags: ["hostelería", "Lausana", "latinoamericana", "ascenso"],
  },
];

export default async function HistoriasRealesPage() {
  // Cargar historias de la comunidad del Gist
  const historiasComunidad = await getHistorias() ?? [];

  const schemas = [
    breadcrumbSchema([
      { name: "Inicio", url: BASE_URL },
      { name: "Historias reales", url: `${BASE_URL}/historias-reales` },
    ]),
    itemListSchema([
      // Historias de la comunidad primero
      ...historiasComunidad.map((h) => ({
        name: `${h.autorNombre} — ${h.titulo}`,
        url: `${BASE_URL}/historias-reales/${h.slug}`,
        description: h.contenido.slice(0, 120),
      })),
      // Luego las legacy
      ...historiasLegacy.map((h, i) => ({
        name: `${h.nombre} — ${h.resumen.slice(0, 60)}`,
        url: `${BASE_URL}/historias-reales#historia-legacy-${i + 1}`,
        description: h.extracto.slice(0, 120),
      })),
    ]),
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Historias reales</h1>
            <p className="text-gray-500">
              Lo que no encuentras en ninguna guía. Experiencias sin filtros de hispanohablantes que ya viven en Suiza.
            </p>
          </div>
          <Link
            href="/historias-reales/nueva"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2.5 rounded-full transition-colors whitespace-nowrap"
          >
            <span>+</span>
            <span>Compartir historia</span>
          </Link>
        </div>
      </div>

      {/* Por qué importa */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8 flex gap-4">
        <span className="text-3xl flex-shrink-0">💡</span>
        <div>
          <h2 className="font-bold text-gray-800 mb-1">Por qué creamos esta sección</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Las guías genéricas te dicen qué documentos necesitas. Las historias reales te dicen lo que nadie te avisó,
            los errores que costaron dinero, y los atajos que nadie publica. Google premia el contenido con experiencia real —
            nosotros lo priorizamos porque es lo que realmente ayuda.
          </p>
        </div>
      </div>

      {/* Historias de la comunidad (nuevas) */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-2xl">💬</span>
            Historias de la comunidad
          </h2>
          <span className="text-sm text-gray-500">{historiasComunidad.length} publicadas</span>
        </div>

        {historiasComunidad.length > 0 ? (
          <div className="flex flex-col gap-4">
            {historiasComunidad.map((historia) => (
              <HistoriaCard key={historia.id} historia={historia} />
            ))}
          </div>
        ) : (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">✍️</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              ¡Sé el primero en compartir tu historia!
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Tu experiencia viviendo en Suiza puede ayudar a miles de hispanohablantes.
              Cuéntanos cómo fue tu llegada, qué aprendiste, qué consejos darías.
            </p>
            <Link
              href="/historias-reales/nueva"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition-colors"
            >
              <span>+</span>
              <span>Escribir mi historia</span>
            </Link>
            <p className="text-xs text-gray-400 mt-4">
              Se publicará en la web y en nuestras redes sociales
            </p>
          </div>
        )}
      </div>

      {/* Historias destacadas (legacy) */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Historias destacadas
        </h2>
        <div className="flex flex-col gap-4">
          {historiasLegacy.map((historia, i) => (
            <HistoriaCard key={`legacy-${i}`} historia={historia} />
          ))}
        </div>
      </div>

      {/* CTA para compartir historia */}
      <div style={{ background: "linear-gradient(135deg, #C0392B, #96281B)" }} className="text-white rounded-2xl p-8 mt-10 text-center">
        <h2 className="text-xl font-bold mb-2">¿Vives en Suiza? Comparte tu historia</h2>
        <p className="text-red-100 text-sm mb-5">
          Tu experiencia puede ayudar a miles de personas que están donde tú estabas. Se publicará con tu nombre en la web y en nuestras redes sociales.
        </p>
        <Link
          href="/historias-reales/nueva"
          className="inline-block bg-white text-red-700 font-bold px-6 py-2.5 rounded-full hover:bg-red-50 transition-colors"
        >
          Compartir mi historia →
        </Link>
      </div>
    </div>
  );
}
// cache bust 1793500016
