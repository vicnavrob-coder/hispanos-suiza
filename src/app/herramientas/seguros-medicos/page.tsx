import type { Metadata } from "next";
import Link from "next/link";
import { SEGUROS_ASEGURADORAS, SEGUROS_FRANQUICIAS } from "@/lib/data";
import { buildMetadata, BASE_URL, breadcrumbSchema, webAppSchema, faqSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Guía del seguro médico suizo (KVG/LAMal) 2026",
  description: "Todo sobre el seguro de salud obligatorio en Suiza: cómo elegir aseguradora, franquicia, modelo y cuánto pagarás. Comparativa de 8 aseguradoras reales. Guía en español.",
  path: "/herramientas/seguros-medicos",
  ogImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=85&auto=format&fit=crop",
  keywords: [
    "guia seguro medico suiza", "kvg lamal suiza", "como contratar seguro suiza",
    "elegir aseguradora suiza", "franquicia seguro suiza", "modelo hmo telmed suiza",
    "aseguradoras suiza baratas", "comparar kvg suiza 2026", "assura helsana css suiza",
    "seguro medico expat suiza",
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
  faqSchema([
    {
      pregunta: "¿El seguro médico es obligatorio desde el primer día?",
      respuesta: "Tienes un margen de 3 meses desde tu llegada para contratarlo, pero la cobertura es retroactiva desde tu fecha de llegada. Si no lo contratas tú, la autoridad cantonal te asignará uno automáticamente — que suele ser más caro.",
    },
    {
      pregunta: "¿Pueden negarme el seguro LAMal?",
      respuesta: "No. El seguro básico LAMal es de obligatoria aceptación para todas las aseguradoras acreditadas. No pueden rechazarte por edad, estado de salud o historial médico. Es un derecho legal.",
    },
    {
      pregunta: "¿Puedo cambiar de aseguradora?",
      respuesta: "Sí, una vez al año. Para cambiar al 1 de enero, debes comunicárselo a tu aseguradora actual antes del 30 de noviembre. Si las primas suben más de un cierto porcentaje, puedes cambiar con solo un mes de preaviso.",
    },
    {
      pregunta: "¿Hay subsidios para el seguro médico?",
      respuesta: "Sí. Si tus ingresos son bajos, puedes solicitar la Prämienverbilligung (reducción de prima) en el cantón donde resides. Se llama IPT en la Suiza francesa. Cada cantón tiene sus criterios. Solicítalo al llegar si tus ingresos son modestos.",
    },
    {
      pregunta: "¿Cuál es la diferencia entre LAMal y complementario?",
      respuesta: "El LAMal (Grundversicherung) es el básico obligatorio y cubre visitas al médico, hospitalización estándar, medicamentos y urgencias. El complementario (Zusatzversicherung) añade habitación individual, medicina alternativa, gafas, fisioterapia extendida, etc. Es opcional.",
    },
    {
      pregunta: "Si trabajo 8h/semana o más, ¿necesito seguro de accidentes en el LAMal?",
      respuesta: "No necesariamente. Si trabajas 8 o más horas semanales para el mismo empleador, los accidentes laborales y de trayecto los cubre la seguridad social del trabajo (SUVA). Puedes entonces desactivar la cobertura de accidentes en tu LAMal y ahorrar 15–30 CHF/mes.",
    },
  ]),
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

const MODELOS_EXPLICADOS = [
  {
    nombre: "Estándar",
    codigo: "standard" as const,
    ahorro: "Sin descuento",
    icono: "🏥",
    descripcion: "Libertad total de médico. Puedes ir directamente a cualquier especialista sin derivación previa. La opción más cara, pero la más flexible.",
    para: "Personas con médicos de confianza ya establecidos o necesidades médicas frecuentes.",
    color: "#6b7280",
    colorLight: "#F9FAFB",
  },
  {
    nombre: "Telmed",
    codigo: "telmed" as const,
    ahorro: "10–15% menos",
    icono: "📞",
    descripcion: "Consultar siempre por teléfono o app antes de ir a urgencias (Medgate, Medi24, Santé24). Si la consulta telefónica determina que debes ir, te derivan. Muy eficiente para consultas menores.",
    para: "Jóvenes sanos y recién llegados que quieren ahorrar sin sacrificar mucho.",
    color: "#2563eb",
    colorLight: "#EFF6FF",
  },
  {
    nombre: "HMO",
    codigo: "hmo" as const,
    ahorro: "20–25% menos",
    icono: "🏢",
    descripcion: "Médico de cabecera en un centro HMO (grupo médico) asignado. Solo puedes ir a ese centro; para especialistas necesitas derivación interna. Amplia red en ciudades grandes.",
    para: "Familias y residentes en ciudades con buenos centros HMO cercanos.",
    color: "#15803d",
    colorLight: "#F0FDF4",
  },
  {
    nombre: "Hausarzt",
    codigo: "hausarzt" as const,
    ahorro: "10–20% menos",
    icono: "👨‍⚕️",
    descripcion: "Médico de cabecera fijo (puede ser cualquier médico de tu elección). Siempre consultas con él primero antes de ir a especialistas. Relación continua con tu médico.",
    para: "Personas con un médico de cabecera de confianza que quieren bajar la prima.",
    color: "#b45309",
    colorLight: "#FFFBEB",
  },
];

const RATING_STARS = (n: number) => "★".repeat(n) + "☆".repeat(5 - n);

export default function SegurosMedicosPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* Breadcrumb */}
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
        <p className="text-gray-500 mb-10 text-sm">
          Actualizada 2026 · Para españoles y latinoamericanos recién llegados · 8 aseguradoras comparadas
        </p>

        {/* Stats rápidos */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {[
            { valor: "~420–510",  label: "CHF/mes prima media (adulto, ZH, fr. 300)",  icono: "💶" },
            { valor: "300–2.500", label: "CHF franquicia anual (tú eliges)",            icono: "🎚️" },
            { valor: "3 meses",   label: "Plazo para contratar desde tu llegada",       icono: "⏳" },
            { valor: "8 aseg.",   label: "Aseguradoras comparadas en esta guía",        icono: "🏦" },
          ].map(({ valor, label, icono }) => (
            <div key={label} className="bg-white rounded-2xl p-4 text-center border border-gray-100 shadow-sm">
              <div className="text-2xl mb-1">{icono}</div>
              <div className="text-xl font-black text-gray-900">{valor}</div>
              <div className="text-xs text-gray-400 mt-0.5 leading-tight">{label}</div>
            </div>
          ))}
        </div>

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

        {/* Modelos */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Modelos de acceso al médico</h2>
          <p className="text-gray-500 text-sm mb-5">
            Elegir el modelo correcto puede ahorrarte entre un 10% y un 25% en tu prima mensual.
            El seguro básico LAMal es idéntico en todos los modelos — solo cambia cómo accedes al médico.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MODELOS_EXPLICADOS.map((m) => (
              <div
                key={m.nombre}
                className="rounded-2xl p-5 border"
                style={{ background: m.colorLight, borderColor: m.color + "33" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{m.icono}</span>
                    <h3 className="font-bold text-gray-900">{m.nombre}</h3>
                  </div>
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: m.color, color: "white" }}
                  >
                    {m.ahorro}
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-2">{m.descripcion}</p>
                <p className="text-xs text-gray-500">
                  <strong>Ideal para:</strong> {m.para}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
            <strong>Consejo para recién llegados:</strong> Si no tienes médico establecido aún,
            el modelo <strong>Telmed</strong> suele ser el mejor punto de partida. Ahorras 10–15%
            sin perder cobertura real y luego puedes cambiar en la próxima renovación anual.
          </div>
        </section>

        {/* Franquicias */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Elige tu franquicia (deducible)</h2>
          <p className="text-gray-500 text-sm mb-5">
            La franquicia es el importe que pagas tú de tu bolsillo antes de que la aseguradora empiece a cubrir.
            A mayor franquicia, menor prima mensual. Además de la franquicia, pagas el 10% de los gastos
            hasta un máximo de 700 CHF adicionales al año (Selbstbehalt).
          </p>

          {/* Calculadora visual */}
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden mb-5">
            <div className="px-5 py-4 bg-gray-50 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-700">
                ¿Cómo funciona? Ejemplo con franquicia 300 CHF vs 2.500 CHF:
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
              <div className="p-5">
                <div className="text-sm font-bold text-gray-900 mb-3">Franquicia baja (300 CHF)</div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Pagas los primeros <strong>300 CHF</strong> del año</li>
                  <li>Después, aseguradora cubre <strong>90%</strong> de cada gasto</li>
                  <li>Tú pagas el 10% hasta un máximo de <strong>700 CHF</strong> adicionales</li>
                  <li className="text-green-700 font-semibold">Máximo que pagarás al año: 1.000 CHF (300+700)</li>
                  <li className="text-red-600">Prima mensual más alta (~420–510 CHF según aseguradora)</li>
                </ul>
                <p className="text-xs text-gray-400 mt-3">Recomendada si tienes enfermedades crónicas o visitas frecuentes</p>
              </div>
              <div className="p-5">
                <div className="text-sm font-bold text-gray-900 mb-3">Franquicia alta (2.500 CHF)</div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Pagas los primeros <strong>2.500 CHF</strong> del año</li>
                  <li>Después, aseguradora cubre <strong>90%</strong> de cada gasto</li>
                  <li>Tú pagas el 10% hasta un máximo de <strong>700 CHF</strong> adicionales</li>
                  <li className="text-green-700 font-semibold">Prima mensual ~38% más barata (~110 CHF/mes menos)</li>
                  <li className="text-red-600">Máximo en el peor caso: 3.200 CHF (2.500+700)</li>
                </ul>
                <p className="text-xs text-gray-400 mt-3">Recomendada si eres sano y apenas vas al médico</p>
              </div>
            </div>
          </div>

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

        {/* Aseguradoras */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Comparativa de aseguradoras 2026</h2>
          <p className="text-gray-500 text-sm mb-5">
            El seguro básico LAMal es <strong>idéntico en todas</strong> — solo cambia el precio y el
            servicio. Las primas indicadas son orientativas para un adulto en Zúrich con franquicia 300 CHF.
            Compara siempre por cantón en{" "}
            <a href="https://www.priminfo.admin.ch/de/praemien" target="_blank" rel="noopener noreferrer"
              className="text-red-700 font-semibold hover:underline">
              priminfo.admin.ch
            </a>.
          </p>
          <div className="space-y-3">
            {SEGUROS_ASEGURADORAS.map((a) => (
              <div
                key={a.nombre}
                className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-sm hover:border-red-200 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-2xl">{a.logo}</span>
                      <div>
                        <h3 className="font-bold text-gray-900">{a.nombre}</h3>
                        <span className="text-xs text-amber-500 tracking-wider">{RATING_STARS(a.rating)}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{a.nota}</p>
                    <p className="text-xs text-gray-400">
                      <span className="font-semibold text-gray-600">Recomendado para:</span> {a.recomendadoPara}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {a.modelosDisponibles.map((m) => (
                        <span key={m} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <div className="text-right">
                      <div className="text-lg font-black text-gray-900">~{a.primaMediaMensual} CHF</div>
                      <div className="text-xs text-gray-400">prima/mes (ZH, fr. 300)</div>
                    </div>
                    <a
                      href={a.web}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="text-xs font-semibold text-red-700 hover:underline"
                    >
                      Ver aseguradora →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">
            * Los precios son orientativos y varían por cantón, edad y franquicia. Siempre compara antes de contratar.
            Las primas 2026 están pendientes de actualización oficial en octubre 2025.
          </p>
        </section>

        {/* CTA José - Asesor de seguros */}
        <section className="mb-12" id="asesor">
          <div
            className="rounded-2xl p-6 text-white relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #059669, #047857)" }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative flex flex-col md:flex-row items-start gap-5">
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-4xl flex-shrink-0 border-2 border-white/30">
                🧑‍💼
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-full">ASESOR EN ESPAÑOL</span>
                  <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2.5 py-1 rounded-full">GRATIS</span>
                </div>
                <h2 className="font-bold text-xl mb-2">¿Prefieres que te lo explique una persona?</h2>
                <p className="text-green-100 text-sm mb-4 leading-relaxed">
                  <strong>José</strong> es español, vive en Suiza y lleva años ayudando a hispanohablantes
                  a entender y elegir su seguro médico. Reserva una videollamada gratuita de 15 minutos
                  para resolver todas tus dudas: qué aseguradora elegir, qué franquicia te conviene,
                  cómo ahorrar en la prima, y si necesitas seguro complementario.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://calendar.app.google/pZrPbwRThpDsRW3z5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white text-green-700 font-bold px-6 py-3 rounded-full text-sm hover:bg-green-50 transition-colors shadow-lg"
                  >
                    <span>📅</span>
                    <span>Reservar cita con José</span>
                  </a>
                  <div className="flex items-center gap-2 text-green-200 text-xs">
                    <span>✓ Sin compromiso</span>
                    <span>·</span>
                    <span>✓ 15 min videollamada</span>
                    <span>·</span>
                    <span>✓ En español</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Expat Savvy afiliado */}
        <section className="mb-12">
          <div
            className="rounded-2xl p-6 text-white"
            style={{ background: "linear-gradient(135deg, #1e3a5f, #2563eb)" }}
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl flex-shrink-0">🌍</span>
              <div>
                <h2 className="font-bold text-lg mb-2">¿Quieres comparar con tu perfil exacto?</h2>
                <p className="text-blue-100 text-sm mb-4">
                  Para comparar todas las aseguradoras con tu perfil exacto (cantón, edad, ingresos,
                  número de personas), usa <strong>Expat Savvy</strong> — el comparador oficial
                  recomendado para expatriados en Suiza. Gratuito, en español.
                </p>
                <a
                  href="https://www.expatsavvy.ch/es/health-insurance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-blue-700 font-bold px-6 py-2.5 rounded-full text-sm hover:bg-blue-50 transition-colors"
                >
                  Comparar en Expat Savvy →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ ampliado */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-800 mb-5">Preguntas frecuentes</h2>
          <div className="space-y-4">
            {[
              {
                q: "¿El seguro médico es obligatorio desde el primer día?",
                a: "Tienes un margen de 3 meses desde tu llegada para contratarlo, pero la cobertura es retroactiva desde tu fecha de llegada. Si no lo contratas tú, la autoridad cantonal te asignará uno automáticamente — que suele ser más caro. Mejor contratarlo cuanto antes.",
              },
              {
                q: "¿Pueden negarme el seguro LAMal?",
                a: "No. El seguro básico LAMal es de obligatoria aceptación para todas las aseguradoras acreditadas. No pueden rechazarte por edad, estado de salud o historial médico. Es un derecho legal garantizado por la ley suiza.",
              },
              {
                q: "¿Puedo cambiar de aseguradora?",
                a: "Sí, una vez al año. Para cambiar al 1 de enero, debes comunicárselo a tu aseguradora actual antes del 30 de noviembre mediante carta certificada. Si las primas suben significativamente, la ley permite cambiar con un mes de preaviso.",
              },
              {
                q: "¿Hay subsidios para el seguro médico?",
                a: "Sí. Si tus ingresos son bajos o medios, puedes solicitar la Prämienverbilligung (reducción de prima) en el cantón donde resides — en la Suiza francesa se llama IPT. Cada cantón gestiona los criterios de forma independiente. Solicítalo al llegar si tus ingresos son modestos.",
              },
              {
                q: "¿Cuál es la diferencia entre el LAMal básico y el seguro complementario?",
                a: "El LAMal (Grundversicherung) es el básico obligatorio y cubre visitas al médico, hospitalización estándar, medicamentos y urgencias. El complementario (Zusatzversicherung) añade habitación individual, medicina alternativa, gafas, fisioterapia extendida, cobertura en el extranjero, etc. Es completamente opcional.",
              },
              {
                q: "Si trabajo 8h/semana o más, ¿necesito seguro de accidentes en el LAMal?",
                a: "No. Si trabajas 8 o más horas semanales para el mismo empleador, los accidentes laborales y de trayecto los cubre la seguridad social del trabajo (SUVA). Puedes entonces desactivar la cobertura de accidentes en tu LAMal y ahorrar 15–30 CHF/mes.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="bg-white rounded-2xl p-5 border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-2">{q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA priminfo */}
        <div style={{ background: "linear-gradient(135deg, #C0392B, #96281B)" }} className="text-white rounded-2xl p-6 text-center mb-8">
          <h2 className="font-bold text-lg mb-2">Compara precios en menos de 5 minutos</h2>
          <p className="text-red-100 text-sm mb-4">La herramienta oficial del gobierno suizo. Gratuita, sin registro.</p>
          <a href="https://www.priminfo.admin.ch/de/praemien" target="_blank" rel="noopener noreferrer"
            className="inline-block bg-white text-red-700 font-bold px-6 py-2.5 rounded-full hover:bg-red-50 transition-colors">
            Comparar en priminfo.admin.ch →
          </a>
        </div>

        {/* Links relacionados */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4">También te puede interesar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { href: "/herramientas/salario-neto",          label: "🧮 Calculadora de salario neto" },
              { href: "/trabajo/esqui-suiza",                label: "🎿 Trabajo en estaciones de esquí" },
              { href: "/herramientas/comparador-ciudades",   label: "🏙️ Comparador de ciudades suizas" },
            ].map(({ href, label }) => (
              <Link key={href} href={href}
                className="flex items-center gap-2 bg-white rounded-xl p-4 border border-gray-100 text-sm font-semibold text-gray-700 hover:text-red-700 hover:border-red-100 transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
