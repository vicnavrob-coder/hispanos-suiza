import type { Metadata } from "next";
import Link from "next/link";
import { SEGUROS_ASEGURADORAS, SEGUROS_FRANQUICIAS, SEGUROS_MODELOS } from "@/lib/data";
import { buildMetadata, BASE_URL, breadcrumbSchema, webAppSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Guía del seguro médico suizo (KVG/LAMal) 2026",
  description: "Todo sobre el seguro de salud obligatorio en Suiza: cómo elegir aseguradora, franquicia, modelo y cuánto pagarás. Guía en español.",
  path: "/herramientas/seguros-medicos",
  keywords: [
    "guia seguro medico suiza", "kvg lamal suiza", "como contratar seguro suiza",
    "elegir aseguradora suiza", "franquicia seguro suiza", "modelo hmo telmed suiza",
  ],
});

const schemas = [
  breadcrumbSchema([
    { name: "Inicio",           url: BASE_URL },
    { name: "Herramientas",     url: `${BASE_URL}/herramientas` },
    { name: "Guía seguros KVG", url: `${BASE_URL}/herramientas/seguros-medicos` },
  ]),
  webAppSchema({
    name: "Guía del seguro médico suizo KVG/LAMal",
    description: "Guía completa sobre el seguro médico obligatorio en Suiza: aseguradoras, franquicias y modelos.",
    path: "/herramientas/seguros-medicos",
    applicationCategory: "HealthApplication",
  }),
];

const PASOS = [
  {
    n: "1", icono: "🏛️", titulo: "Regístrate en la comuna",
    cuerpo: "Primero empadrórate (Anmeldung) en el Einwohnerkontrolle de tu ciudad. Necesitas: pasaporte, contrato de alquiler y permiso de residencia.",
  },
  {
    n: "2", icono: "📊", titulo: "Compara seguros",
    cuerpo: "Usa la herramienta oficial del gobierno suizo en priminfo.admin.ch. También puedes usar comparis.ch. Filtra por tu cantón, edad y franquicia para ver primas exactas.",
    link: { texto: "Ir a priminfo.admin.ch →", url: "https://www.priminfo.admin.ch/de/praemien" },
  },
  {
    n: "3", icono: "✅", titulo: "Contrata online",
    cuerpo: "Ve a la web de la aseguradora elegida. Necesitarás: pasaporte o permiso de residencia, dirección suiza, fecha de llegada y número AHV. La tarjeta llega en 1-2 semanas.",
  },
  {
    n: "4", icono: "💼", titulo: "Si estás empleado",
    cuerpo: "Si trabajas 8+ horas/semana para el mismo empleador, los accidentes laborales están cubiertos por el seguro del trabajo. Puedes desactivar la cobertura de accidentes en tu seguro médico y ahorrar ~15-30 CHF/mes.",
  },
];

export default function SegurosMedicosPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
    <div className="max-w-4xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-red-700">Inicio</Link>
        <span>›</span>
        <Link href="/herramientas" className="hover:text-red-700">Herramientas</Link>
        <span>›</span>
        <span className="text-gray-600">Seguros médicos</span>
      </nav>

      {/* Alert */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-8 flex gap-4">
        <span className="text-2xl flex-shrink-0">⚠️</span>
        <div>
          <h2 className="font-bold text-red-800 mb-1">Obligatorio — Tienes 3 meses desde tu llegada</h2>
          <p className="text-red-700 text-sm leading-relaxed">
            Todo residente en Suiza debe tener seguro médico básico (Grundversicherung / LAMal).
            Si no lo contratas, la autoridad cantonal te asigna uno automáticamente — suele ser más caro.
            La cobertura es <strong>retroactiva desde tu fecha de llegada</strong>.
          </p>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-2">Guía completa del seguro médico en Suiza</h1>
      <p className="text-gray-500 mb-10 text-sm">Actualizada 2026 · Para españoles y latinoamericanos recién llegados</p>

      {/* Pasos */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-800 mb-5">Cómo contratar el seguro: 4 pasos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PASOS.map((paso) => (
            <div key={paso.n} className="bg-white border border-gray-100 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <div style={{ background: "#C0392B" }} className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {paso.n}
                </div>
                <span className="text-lg">{paso.icono}</span>
                <h3 className="font-bold text-gray-800">{paso.titulo}</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed ml-11">{paso.cuerpo}</p>
              {paso.link && (
                <a href={paso.link.url} target="_blank" rel="noopener noreferrer"
                  className="ml-11 mt-2 inline-block text-sm font-semibold text-red-700 hover:underline">
                  {paso.link.texto}
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Franquicias */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Elige tu franquicia (deducible)</h2>
        <p className="text-gray-500 text-sm mb-5">
          A mayor franquicia, menor prima mensual. Máximo que pagarás al año = franquicia + 700 CHF (Selbstbehalt).
        </p>
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Franquicia (CHF/año)</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700">Ahorro en prima</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-700 hidden md:table-cell">Cuándo elegirla</th>
              </tr>
            </thead>
            <tbody>
              {SEGUROS_FRANQUICIAS.map((f, i) => (
                <tr key={f.chf} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-3 font-bold text-gray-800">CHF {f.chf}</td>
                  <td className="px-4 py-3 text-green-700 font-semibold">{f.ahorro}</td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{f.nota || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Modelos de acceso */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Modelos de acceso al médico</h2>
        <p className="text-gray-500 text-sm mb-5">Reducir el modelo puede ahorrarte un 20-25% en prima.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SEGUROS_MODELOS.map((m) => (
            <div key={m.nombre} className={`bg-white border rounded-xl p-4 ${m.recomendado ? "border-green-200 bg-green-50" : "border-gray-100"}`}>
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-gray-800">{m.nombre}</h3>
                {m.recomendado && <span className="text-xs bg-green-700 text-white px-2 py-0.5 rounded-full">Recomendado</span>}
              </div>
              <p className="text-gray-600 text-sm">{m.desc}</p>
              <p className="text-green-700 text-sm font-semibold mt-1">{m.precio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Aseguradoras */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Las aseguradoras principales</h2>
        <p className="text-gray-500 text-sm mb-5">
          El seguro básico es <strong>idéntico en todas</strong> — solo cambia el precio y el servicio. Compara siempre por cantón en priminfo.admin.ch.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SEGUROS_ASEGURADORAS.map((a) => (
            <a key={a.nombre} href={a.web} target="_blank" rel="noopener noreferrer sponsored"
              className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-sm hover:border-red-200 transition-all flex items-start justify-between group">
              <div>
                <div className="font-bold text-gray-800 group-hover:text-red-700">{a.nombre}</div>
                <div className="text-xs text-gray-500 mt-0.5">{a.nota}</div>
              </div>
              <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-1 rounded-full whitespace-nowrap ml-2">{a.precio}</span>
            </a>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3">* Los precios son orientativos y varían por cantón, edad y franquicia. Siempre compara antes de contratar.</p>
      </section>

      {/* CTA */}
      <div style={{ background: "linear-gradient(135deg, #C0392B, #96281B)" }} className="text-white rounded-2xl p-6 text-center">
        <h2 className="font-bold text-lg mb-2">Compara precios en menos de 5 minutos</h2>
        <p className="text-red-100 text-sm mb-4">La herramienta oficial del gobierno suizo. Gratuita, sin registro.</p>
        <a href="https://www.priminfo.admin.ch/de/praemien" target="_blank" rel="noopener noreferrer"
          className="inline-block bg-white text-red-700 font-bold px-6 py-2.5 rounded-full hover:bg-red-50 transition-colors">
          Comparar en priminfo.admin.ch →
        </a>
      </div>
    </div>
    </>
  );
}
