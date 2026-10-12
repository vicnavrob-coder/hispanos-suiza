import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata, breadcrumbSchema, faqSchema, howToSchema, BASE_URL } from "@/lib/seo";

const ACCENT = "#C8102E";

// ── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = buildMetadata({
  title: "Volver a España desde Suiza: todo lo que debes gestionar antes de irte 2026",
  description:
    "Guía completa para volver a España desde Suiza: segundo pilar, AHV, paro exportado (U2), baja municipal, seguro médico LAMal, impuestos y checklist de 20 puntos.",
  path: "/guias/volver-espana-desde-suiza",
  ogType: "article",
  ogImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=85&auto=format&fit=crop",
  keywords: [
    "volver a españa desde suiza",
    "retorno suiza españa trámites",
    "segundo pilar suiza cobrar vuelta españa",
    "paro suiza exportar españa formulario u2",
    "baja municipal suiza salida",
    "AHV convenio españa suiza",
  ],
});

// ── Checklist ────────────────────────────────────────────────────────────────

const CHECKLIST = [
  { grupo: "Antes de salir — Administración", items: [
    "Dar de baja en la Einwohnerkontrolle (oficina de residentes) de tu municipio",
    "Comunicar fecha de salida a la aseguradora LAMal (con 3 meses de antelación al fin de trimestre o 1 mes para el 31 de diciembre)",
    "Notificar a tu Pensionskasse la salida de Suiza y solicitar gestión del segundo pilar",
    "Pedir el formulario U2 en la Kasse de desempleo si estás cobrando el paro",
    "Avisar al banco de tu condición de no residente (o decidir si cierras la cuenta)",
    "Solicitar el Sozialversicherungsausweis (extracto AHV con historial de empleadores)",
    "Pedir certificado de cotizaciones AHV para el convenio bilateral con España",
  ]},
  { grupo: "Antes de salir — Laboral", items: [
    "Guardar copia de todos los recibos de nómina (Lohnausweise) de los últimos años",
    "Obtener carta de referencia laboral (Arbeitszeugnis) — derecho legal en Suiza",
    "Guardar copia del contrato de trabajo y eventuales finiquitos",
    "Si tienes conflicto laboral pendiente, consultar con la UNIA antes de salir",
  ]},
  { grupo: "Gestión fiscal", items: [
    "Presentar la declaración de impuestos suiza del año de salida (por el período vivido allí)",
    "Si pagabas Quellensteuer: verificar si tienes derecho a devolución parcial",
    "Comunicar cambio de domicilio a la autoridad fiscal cantonal",
  ]},
  { grupo: "Al llegar a España", items: [
    "Empadronarse en el ayuntamiento (obligatorio si llevas más de 1 año fuera)",
    "Si exportas el paro: inscribirse en el SEPE antes de 7 días de llegada",
    "Renovar DNI/pasaporte si está próximo a vencer",
    "Inscribirse como emigrante retornado en el IMSERSO si cumples requisitos",
    "Homologar título/experiencia laboral suiza si es necesario para tu sector",
    "Comunicar al banco español la vuelta si tenías cuenta activa",
  ]},
];

// ── FAQ ───────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    pregunta: "¿Puedo recuperar el dinero del segundo pilar al volver a España?",
    respuesta:
      "Solo parcialmente. Como ciudadano UE/EEE que vuelve a un país del Espacio Económico Europeo (España sí lo es), la parte obligatoria del segundo pilar (BVG) queda bloqueada en Suiza hasta los 65 años. Solo la parte sobreobligatoria (lo cotizado por encima del mínimo legal) puede ser reembolsada al salir. Contacta con tu Pensionskasse para conocer exactamente qué parte es reembolsable en tu caso.",
  },
  {
    pregunta: "¿Cuánto tiempo tengo para reclamar el segundo pilar después de salir?",
    respuesta:
      "Tienes hasta 6 meses desde que sales de Suiza para contactar con tu Pensionskasse y gestionar el reembolso de la parte sobreobligatoria. Pasado ese plazo, el dinero sigue en tu cuenta de la Pensionskasse pero puede ser más complicado tramitarlo.",
  },
  {
    pregunta: "¿Las cotizaciones a la AHV (seguridad social suiza) cuentan para la pensión en España?",
    respuesta:
      "Sí. El convenio bilateral de seguridad social entre España y Suiza (1969, actualizado) permite sumar los años cotizados en ambos países para determinar el derecho a pensión. Sin embargo, cada país paga la parte proporcional a sus propios años cotizados. Informa a la Seguridad Social española de tus años trabajados en Suiza.",
  },
  {
    pregunta: "¿Qué hago con el seguro médico LAMal al irme?",
    respuesta:
      "Debes cancelar la póliza LAMal comunicándolo a tu aseguradora. El plazo estándar es 3 meses de antelación al final de un trimestre (marzo, junio, septiembre, diciembre). Si la baja es a 31 de diciembre, el plazo se reduce a 1 mes (30 de noviembre). La aseguradora pedirá prueba de tu salida de Suiza (formulario de baja municipal).",
  },
  {
    pregunta: "¿Puedo mantener la cuenta bancaria suiza estando en España?",
    respuesta:
      "Depende del banco. Los grandes bancos suizos (UBS, Credit Suisse/UBS fusionado, Cantonal Banks) generalmente permiten mantener la cuenta notificando el cambio de residencia, pero pueden cambiar las condiciones. Los neobancos como Neon o Yuh cierran la cuenta obligatoriamente a no residentes. Consulta con tu banco antes de salir.",
  },
  {
    pregunta: "¿Tengo que hacer la declaración de la renta suiza el año que me voy?",
    respuesta:
      "Sí. El año de salida debes presentar la declaración de impuestos cantonal por el período que residiste en Suiza (de enero hasta la fecha de baja municipal). Si pagabas Quellensteuer (retención directa en nómina), puede que tengas derecho a una devolución parcial ya que la retención se calcula para un año completo.",
  },
];

// ── JSON-LD ───────────────────────────────────────────────────────────────────

const breadcrumb = breadcrumbSchema([
  { name: "Inicio", url: BASE_URL },
  { name: "Guías",  url: `${BASE_URL}/guias` },
  { name: "Volver a España desde Suiza", url: `${BASE_URL}/guias/volver-espana-desde-suiza` },
]);

const faq = faqSchema(FAQS);

const howTo = howToSchema({
  name: "Cómo volver a España desde Suiza paso a paso",
  description: "Todo lo que debes gestionar antes y después de dejar Suiza para volver a España: segundo pilar, AHV, baja municipal, LAMal e impuestos.",
  steps: [
    { name: "Gestiona el segundo pilar (Pensionskasse)", text: "Contacta con tu Pensionskasse para conocer qué parte del segundo pilar es reembolsable. Como ciudadano UE/EEE solo puedes retirar la parte sobreobligatoria." },
    { name: "Gestiona las cotizaciones AHV", text: "Solicita el certificado de cotizaciones AHV para poder sumar esos años al cómputo de pensión español según el convenio bilateral." },
    { name: "Cancela el seguro médico LAMal", text: "Comunica la baja a tu aseguradora con 3 meses de antelación al final de trimestre, adjuntando prueba de salida del municipio." },
    { name: "Date de baja en el municipio suizo (Einwohnerkontrolle)", text: "Obligatorio antes o inmediatamente después de salir. Te cancelan el permiso de residencia y el seguro médico." },
    { name: "Activa el formulario U2 si cobras el paro", text: "Si estás cobrando el paro suizo, solicita el U2 antes de salir para poder exportar la prestación hasta 3 meses en España." },
    { name: "Empadrónat en España", text: "Al llegar, empadrónate en tu ayuntamiento y si exportas el paro, inscríbete en el SEPE antes de 7 días." },
  ],
});

// ── Componente ────────────────────────────────────────────────────────────────

export default function VolverEspanaDesdeSuizaPage() {
  return (
    <>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }} />

      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* ── Breadcrumb ── */}
        <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-red-700">Inicio</Link>
          <span>›</span>
          <Link href="/guias" className="hover:text-red-700">Guías</Link>
          <span>›</span>
          <span className="text-gray-600">Volver a España desde Suiza</span>
        </nav>

        {/* ── Hero ── */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-sm font-semibold px-3 py-1 rounded-full" style={{ background: "#FEE2E2", color: ACCENT }}>
              ✈️ Retorno a España
            </span>
            <span className="text-sm text-gray-400">Guía actualizada 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-4">
            Volver a España desde Suiza:<br />
            <span style={{ color: ACCENT }}>todo lo que debes gestionar antes de irte 2026</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl">
            Volver no es tan fácil como hacer la maleta. Hay trámites con plazos que, si se pierden,
            pueden costarte miles de francos o años de cotización perdidos. Esta guía cubre todo lo que
            nadie te cuenta antes de dejar Suiza.
          </p>
        </div>

        {/* ── Resumen en 30 segundos ── */}
        <div className="rounded-2xl p-6 mb-10 border-l-4" style={{ background: "#F0FDF4", borderColor: "#16A34A" }}>
          <h2 className="text-lg font-black text-gray-900 mb-3">Resumen en 30 segundos</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex gap-2"><span className="text-green-600 font-bold flex-shrink-0">✓</span><span><strong>Segundo pilar:</strong> parte sobreobligatoria reembolsable. La obligatoria, bloqueada hasta los 65</span></li>
            <li className="flex gap-2"><span className="text-green-600 font-bold flex-shrink-0">✓</span><span><strong>AHV:</strong> años cotizados en Suiza cuentan para la pensión española (convenio bilateral)</span></li>
            <li className="flex gap-2"><span className="text-green-600 font-bold flex-shrink-0">✓</span><span><strong>Paro:</strong> exportable a España 3 meses máximo con el formulario U2</span></li>
            <li className="flex gap-2"><span className="text-amber-500 font-bold flex-shrink-0">!</span><span><strong>LAMal:</strong> avisa con <strong>3 meses de antelación</strong> al fin de trimestre</span></li>
            <li className="flex gap-2"><span className="text-amber-500 font-bold flex-shrink-0">!</span><span><strong>Baja municipal:</strong> obligatoria. Sin ella tu permiso sigue "activo" en el sistema</span></li>
            <li className="flex gap-2"><span className="text-green-600 font-bold flex-shrink-0">✓</span><span>Al llegar a España: empadronarse + inscribirse en SEPE (si exportas paro) en los 7 primeros días</span></li>
          </ul>
        </div>

        {/* ── Segundo pilar ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-gray-900 mb-4">1. El segundo pilar (pensión profesional / BVG)</h2>
          <div className="prose max-w-none">
            <p>
              El <strong>segundo pilar</strong> (BVG en alemán, LPP en francés) es la pensión profesional que
              tu empresa descuenta de tu nómina y complementa con su propia aportación. En el recibo de sueldo
              aparece como "BVG" o "Pensionskasse". Es dinero que en teoría es tuyo, pero su retirada tiene reglas.
            </p>
          </div>
          <div className="space-y-3 mt-4">
            <div className="rounded-2xl p-5 border border-blue-200 bg-blue-50">
              <h3 className="font-bold text-blue-900 mb-2">Parte obligatoria (BVG mínimo legal)</h3>
              <p className="text-sm text-blue-800 leading-relaxed">
                Como ciudadano de la UE/EEE que vuelve a España (país del EEE), la parte obligatoria del segundo
                pilar <strong>no puede ser retirada</strong>. Queda bloqueada en tu cuenta de la Pensionskasse
                hasta los 65 años. Cuando llegue la jubilación, puedes elegir recibirla como renta mensual o capital.
              </p>
            </div>
            <div className="rounded-2xl p-5 border border-green-200 bg-green-50">
              <h3 className="font-bold text-green-900 mb-2">Parte sobreobligatoria (cotizado por encima del mínimo)</h3>
              <p className="text-sm text-green-800 leading-relaxed">
                La parte cotizada por encima del mínimo legal puede ser reembolsada al salir de Suiza hacia un país
                del EEE. El importe varía según tu pensionskasse y los años cotizados. Muchas pensionskassen tienen
                una parte sobreobligatoria significativa para salarios altos.
              </p>
            </div>
          </div>
          <div className="rounded-2xl p-4 border border-amber-200 bg-amber-50 mt-4 text-sm text-amber-800">
            <strong>Plazo:</strong> tienes hasta 6 meses después de salir de Suiza para gestionar el reembolso
            de la parte sobreobligatoria con tu Pensionskasse. Pasado ese tiempo el dinero sigue ahí, pero
            el trámite puede complicarse.
          </div>
        </section>

        {/* ── Primer pilar AHV ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-gray-900 mb-4">2. El primer pilar (AHV/AVS — seguridad social)</h2>
          <div className="prose max-w-none">
            <p>
              La <strong>AHV</strong> (Alters- und Hinterlassenenversicherung) es la seguridad social suiza —
              el equivalente a la Seguridad Social española. Aparece en tu nómina como "AHV/IV/EO".
            </p>
            <p>
              Al contrario que el segundo pilar, las cotizaciones a la AHV <strong>no se pueden retirar</strong>.
              Quedan registradas en tu historial y se pueden sumar a los años cotizados en España para el cálculo
              de la pensión de jubilación, gracias al <strong>Convenio de Seguridad Social España-Suiza</strong>
              (firmado en 1969 y actualizado).
            </p>
            <p>
              Lo que debes hacer antes de irte: solicitar el <strong>Sozialversicherungsausweis</strong>
              (extracto del historial AHV) y un certificado de cotizaciones. Con esos documentos, informas
              a la Seguridad Social española al solicitar la pensión en el futuro.
            </p>
          </div>
        </section>

        {/* ── Paro exportable ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-gray-900 mb-4">3. ¿Puedo cobrar el paro suizo si vuelvo a España?</h2>
          <div className="rounded-2xl p-6 border-l-4" style={{ background: "#EFF6FF", borderColor: "#1D4ED8" }}>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              Sí, mediante el <strong>formulario U2</strong> (antes E303). Permite exportar el paro suizo a
              España durante un máximo de <strong>3 meses</strong> mientras buscas trabajo allí.
              Cobras exactamente la misma cantidad que cobrarías en Suiza, pero en España.
            </p>
            <div className="space-y-2 text-sm">
              {[
                "Solicita el U2 en tu Kasse de desempleo antes de salir de Suiza",
                "Al llegar a España, inscríbete en el SEPE antes de 7 días de llegada",
                "El SEPE valida tu prestación; sigues cobrando la misma cantidad",
                "Máximo 3 meses. Pasado ese plazo, debes volver a Suiza o renunciar a la prestación",
                "Si vuelves a Suiza antes de los 3 meses, puedes continuar cobrando allí",
              ].map((item, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-blue-600 font-bold flex-shrink-0">{i + 1}.</span>
                  <span className="text-blue-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl p-4 border border-red-200 bg-red-50 mt-3 text-sm text-red-800">
            <strong>Atención:</strong> si no te inscribes en el SEPE antes de 7 días de llegar a España,
            puedes perder el derecho a la exportación del paro. No lo dejes para después.
          </div>
        </section>

        {/* ── Baja municipal ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-gray-900 mb-4">4. Darse de baja en el municipio suizo (Einwohnerkontrolle)</h2>
          <div className="prose max-w-none">
            <p>
              La baja en la <strong>Einwohnerkontrolle</strong> (oficina de control de residentes) es
              obligatoria cuando dejas Suiza. Debes comunicar tu fecha de salida y el país de destino.
              El plazo es antes de salir o en los días inmediatamente posteriores.
            </p>
            <p>
              Consecuencias de no hacerlo: tu permiso de residencia sigue "activo" en el sistema, lo que
              puede generar reclamaciones de seguro médico LAMal o problemas al intentar obtener un nuevo
              permiso si vuelves a Suiza en el futuro.
            </p>
            <p>
              Con el formulario de baja municipal recibirás un documento que te pedirán tanto la aseguradora
              LAMal para cancelar el seguro como la Pensionskasse para tramitar el segundo pilar.
            </p>
          </div>
        </section>

        {/* ── LAMal ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-gray-900 mb-4">5. Cancelar el seguro médico LAMal</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-2">Plazo estándar</h3>
              <p className="text-sm text-gray-500">
                3 meses de antelación al final de un trimestre (31 de marzo, 30 de junio, 30 de septiembre,
                31 de diciembre). Si quieres cancelar al 31 de marzo, avisa antes del 31 de diciembre del año anterior.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-2">Caso especial: salida en diciembre</h3>
              <p className="text-sm text-gray-500">
                Si cancelas para el 31 de diciembre (fin de año), el plazo se reduce a 1 mes de antelación
                (30 de noviembre). Es la única excepción al plazo trimestral.
              </p>
            </div>
          </div>
          <div className="rounded-2xl p-4 border border-amber-200 bg-amber-50 text-sm text-amber-800">
            <strong>Documentación necesaria:</strong> la aseguradora pedirá el formulario de baja municipal
            (Abmeldebestätigung) como prueba de que realmente abandonas Suiza. Sin ese documento,
            puede negarse a cancelar la póliza antes de plazo.
          </div>
        </section>

        {/* ── Cuenta bancaria ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-gray-900 mb-4">6. La cuenta bancaria suiza</h2>
          <div className="prose max-w-none">
            <p>
              Antes de salir, consulta con tu banco si permite mantener la cuenta siendo no residente.
              Las respuestas varían:
            </p>
          </div>
          <div className="space-y-3 mt-4">
            {[
              {
                banco: "Grandes bancos (UBS, ZKB, PostFinance…)",
                situacion: "Generalmente permiten mantener la cuenta. Notifica el cambio de residencia por escrito. Pueden cambiar las condiciones o comisiones.",
                ok: true,
              },
              {
                banco: "Bancos cantonales (Kantonalbanken)",
                situacion: "Varía por cantón. Algunos cierran la cuenta a no residentes; otros no. Consulta antes de salir.",
                ok: null,
              },
              {
                banco: "Neobancos (Neon, Yuh, Revolut CH…)",
                situacion: "Cierre obligatorio al salir de Suiza. Asegúrate de transferir el saldo y cancelar pagos recurrentes.",
                ok: false,
              },
            ].map(({ banco, situacion, ok }) => (
              <div key={banco} className={`flex gap-3 rounded-2xl p-4 border ${ok === true ? "border-green-200 bg-green-50" : ok === false ? "border-red-200 bg-red-50" : "border-gray-200 bg-gray-50"}`}>
                <span className={`flex-shrink-0 font-bold text-lg mt-0.5 ${ok === true ? "text-green-600" : ok === false ? "text-red-600" : "text-amber-500"}`}>
                  {ok === true ? "✓" : ok === false ? "✗" : "?"}
                </span>
                <div>
                  <h3 className={`font-bold mb-1 ${ok === true ? "text-green-900" : ok === false ? "text-red-900" : "text-gray-900"}`}>{banco}</h3>
                  <p className={`text-sm leading-relaxed ${ok === true ? "text-green-800" : ok === false ? "text-red-800" : "text-gray-600"}`}>{situacion}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Mantener la cuenta suiza puede ser útil para recibir el reembolso del segundo pilar o
            eventuales devoluciones fiscales después de salir.
          </p>
        </section>

        {/* ── Impuestos ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-gray-900 mb-4">7. Declaración de impuestos del año de salida</h2>
          <div className="prose max-w-none">
            <p>
              El año en que sales de Suiza debes presentar la declaración de impuestos cantonal
              <strong> solo por el período en que residiste</strong> (p. ej., de enero a septiembre si te
              fuiste en octubre). La declaración se presenta el año siguiente, igual que siempre.
            </p>
            <p>
              Si eras trabajador con <strong>Quellensteuer</strong> (retención en nómina directa, habitual
              para permisos B), puede que la retención anual se haya calculado para un año completo aunque
              te hayas ido antes. En ese caso tienes derecho a una devolución parcial. Pide a tu cantón
              la regularización.
            </p>
          </div>
        </section>

        {/* ── Volver a España ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-gray-900 mb-4">8. Trámites al llegar a España</h2>
          <div className="space-y-3">
            {[
              {
                titulo: "Empadronarse en el ayuntamiento",
                desc: "Obligatorio si llevas más de 1 año fuera. Con DNI/pasaporte en vigor en cualquier ayuntamiento. El empadronamiento activa el acceso a la sanidad pública española.",
              },
              {
                titulo: "Inscribirse en el SEPE (si exportas el paro)",
                desc: "Si tienes el formulario U2, debes inscribirte en la oficina del SEPE antes de 7 días de llegar. Lleva el U2, el DNI, el NIE si lo tienes, y el número de cuenta bancaria español.",
              },
              {
                titulo: "Comunicar a la Seguridad Social española tus años en Suiza",
                desc: "Para el cómputo de pensión futura, comunica a la Seguridad Social tus años cotizados en Suiza con el certificado de cotizaciones AHV. Se suman en virtud del convenio bilateral.",
              },
              {
                titulo: "Valorar la homologación de experiencia laboral",
                desc: "El trabajo en Suiza está muy bien valorado en el mercado laboral español. El Sozialversicherungsausweis (registro AHV) sirve para acreditar tu historial de empleadores ante futuros empleadores o para homologar experiencia profesional.",
              },
            ].map(({ titulo, desc }) => (
              <div key={titulo} className="flex gap-4 bg-white rounded-2xl p-5 border border-gray-100">
                <span className="text-green-600 font-bold text-lg flex-shrink-0 mt-0.5">✓</span>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{titulo}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Checklist ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Checklist completo antes de dejar Suiza</h2>
          <div className="space-y-6">
            {CHECKLIST.map(({ grupo, items }) => (
              <div key={grupo} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
                  <h3 className="font-bold text-gray-800 text-sm">{grupo}</h3>
                </div>
                <div className="divide-y divide-gray-50">
                  {items.map((item, i) => (
                    <div key={i} className="flex gap-3 px-5 py-3 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                      <span className="flex-shrink-0 w-5 h-5 rounded border border-gray-200 mt-0.5 bg-white" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3 text-center">
            Imprime esta lista o guárdala. Cada punto puede suponer tiempo o dinero.
          </p>
        </section>

        {/* ── FAQ ── */}
        <section className="mb-10">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Preguntas frecuentes sobre volver a España desde Suiza</h2>
          <div className="space-y-4">
            {FAQS.map(({ pregunta, respuesta }) => (
              <div key={pregunta} className="bg-white rounded-2xl p-5 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2">{pregunta}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{respuesta}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="mb-10">
          <div className="rounded-2xl p-7 border-2 text-center" style={{ borderColor: ACCENT, background: "#FFF5F5" }}>
            <h2 className="text-xl font-black text-gray-900 mb-2">
              ¿Tienes dudas sobre tu situación concreta?
            </h2>
            <p className="text-gray-500 text-sm mb-5 max-w-lg mx-auto">
              Nuestros asesores en español pueden ayudarte a planificar tu salida de Suiza, gestionar
              los trámites del segundo pilar y orientarte sobre el paro exportable.
            </p>
            <Link
              href="/planes"
              className="inline-block px-8 py-3 rounded-full text-white font-bold text-sm hover:opacity-90 transition-opacity"
              style={{ background: ACCENT }}
            >
              Ver Pack Aterrizaje Suiza →
            </Link>
          </div>
        </section>

        {/* ── Links relacionados ── */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4">También te puede interesar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { href: "/guias/rav-paro-suiza",   label: "📋 Cobrar el paro en Suiza" },
              { href: "/guias/divorcio-suiza",    label: "⚖️ Divorcio en Suiza" },
              { href: "/herramientas/salario-neto", label: "🧮 Calculadora salario neto" },
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
