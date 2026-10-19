"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import UniaAppointmentModal from "@/components/UniaAppointmentModal";

const ACCENT = "#C8102E";

// ── datos CCT por sector ─────────────────────────────────────────────────────
const CCT_SECTORES = [
  { sector: "Construcción",        salMin: "CHF 5.585–6.765/mes", vacaciones: "25 días",    nota: "Según categoría profesional" },
  { sector: "Hostelería (L-GAV)",  salMin: "CHF 4.350/mes",       vacaciones: "20–25 días", nota: "Servicio incluido → propinas reguladas" },
  { sector: "Limpieza",            salMin: "CHF 4.623–5.290/mes", vacaciones: "20–25 días", nota: "Tarifa nocturna +25%" },
  { sector: "Comercio minorista",  salMin: "CHF 4.200–4.700/mes", vacaciones: "20 días",    nota: "Varía por cantón y función" },
  { sector: "Industria / Metal",   salMin: "CHF 4.800+/mes",      vacaciones: "20–25 días", nota: "Según formación y experiencia" },
  { sector: "Logística",           salMin: "CHF 4.400–5.000/mes", vacaciones: "20 días",    nota: "Horas extras a 125%" },
];

// ── beneficios concretos ─────────────────────────────────────────────────────
const BENEFICIOS = [
  {
    icono: "⚖️",
    titulo: "Asesoramiento jurídico laboral",
    desc: "Consultas ilimitadas con abogados laboralistas de la UNIA, en persona u online. Incluye revisión de contratos, cartas de despido y cálculo de liquidaciones.",
  },
  {
    icono: "🔍",
    titulo: "Control del CCT",
    desc: "La UNIA inspecciona que tu empleador pague los salarios mínimos del sector y respete las condiciones del convenio. Si detectan incumplimiento, actúan por ti.",
  },
  {
    icono: "🚑",
    titulo: "Accidentes laborales",
    desc: "Te acompañan en el proceso con SUVA (seguro de accidentes suizo) si tienes un accidente en el trabajo. Aseguran que recibas la indemnización correcta.",
  },
  {
    icono: "📋",
    titulo: "Conflictos con el empleador",
    desc: "Desde horas extra no pagadas hasta despidos. La UNIA negocia con tu empleador antes de llegar a juicio. Si hace falta, te representa en el Tribunal Laboral.",
  },
  {
    icono: "💰",
    titulo: "Negociación salarial colectiva",
    desc: "Los CCT se renuevan cada año o cada dos años. La UNIA negocia aumentos salariales para todo el sector, aunque no seas consciente de ello.",
  },
  {
    icono: "🎓",
    titulo: "Formación y cursos",
    desc: "Acceso a cursos de alemán, formación profesional y talleres de derechos laborales con descuento o gratuitos para afiliados.",
  },
];

// ── FAQ ───────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "¿Qué es la UNIA y para qué sirve?",
    a: "La UNIA es el sindicato más grande de Suiza, con más de 180.000 afiliados en sectores como construcción, hostelería, comercio, industria y servicios. Te protege frente a incumplimientos del empleador, te asesora jurídicamente y negocia condiciones laborales mejores para todo tu sector.",
  },
  {
    q: "¿Cuánto cuesta afiliarse a la UNIA?",
    a: "Aproximadamente el 1% del salario bruto mensual. Para CHF 5.000 brutos pagarías ~CHF 50/mes. El mínimo es CHF 15/mes y el máximo CHF 120/mes. La cuota es deducible fiscalmente en la declaración de impuestos suiza, así que el coste real es entre un 15% y un 30% menor.",
  },
  {
    q: "¿Existe un período de espera?",
    a: "Sí: 3 meses para conflictos preexistentes al afiliarte. Si te incorporas a un trabajo nuevo y te afilias desde el primer día, la protección es inmediata. Lo más inteligente es afiliarse antes de que surja cualquier problema.",
  },
  {
    q: "¿Puedo afiliarse con permiso B o si vengo de España?",
    a: "Sí, cualquier trabajador en Suiza puede afiliarse: con permiso B, L, C o G (fronterizo). La UNIA protege a todos los trabajadores en territorio suizo sin importar la nacionalidad ni el tipo de permiso.",
  },
  {
    q: "¿Qué es el CCT y me afecta aunque no esté en la UNIA?",
    a: "El CCT (Convenio Colectivo de Trabajo, GAV en alemán) es el acuerdo que fija salarios mínimos, vacaciones y condiciones por sector. En muchos sectores es de aplicación obligatoria (Allgemeinverbindlichkeit) para todos los trabajadores, estén o no afiliados. Afiliarte a la UNIA te permite ejercer ese derecho activamente.",
  },
  {
    q: "¿Hay atención en español?",
    a: "La UNIA tiene oficinas en toda Suiza y mediadores multilingüe en las regiones con más hispanohablantes (Zúrich, Ginebra, Basilea). HispanosEnSuiza puede conectarte con asesores que hablan español a través de nuestro Pack Aterrizaje Suiza.",
  },
  {
    q: "¿La UNIA ayuda con el desempleo?",
    a: "La UNIA no gestiona el desempleo directamente (eso lo hace la RAV/ORP). Pero te asesora si hay irregularidades en tu despido, si no te pagan el preaviso correcto o si tu empleador no ha cotizado correctamente a la caja de paro.",
  },
  {
    q: "¿Qué pasa si tengo un conflicto y no estoy afiliado?",
    a: "Sin sindicato tendrás que asumir los costes de un abogado laboral privado (CHF 300–500/hora) o ir a la Oficina de Conciliación cantonal. La UNIA cubre ese coste para sus afiliados. Un solo conflicto bien resuelto puede valer más de 10 años de cuotas.",
  },
];

export default function UniaPage() {
  const { user, openModal: openAuthModal } = useAuth();
  const [citaModalOpen, setCitaModalOpen] = useState(false);

  const handleRequestCita = () => {
    if (!user) {
      openAuthModal(() => setCitaModalOpen(true));
    } else {
      setCitaModalOpen(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      {/* ── Breadcrumb ── */}
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-red-700">Inicio</Link>
        <span>›</span>
        <Link href="/trabajo" className="hover:text-red-700">Trabajo</Link>
        <span>›</span>
        <span className="text-gray-600">UNIA Suiza</span>
      </nav>

      {/* ── Hero ── */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-semibold px-3 py-1 rounded-full"
            style={{ background: "#FEE2E2", color: ACCENT }}>
            ⚖️ Derechos laborales
          </span>
          <span className="text-sm text-gray-400">Guía actualizada 2026</span>
        </div>
        <h1 className="text-4xl font-black text-gray-900 leading-tight mb-4">
          UNIA Suiza: qué es, cuánto cuesta<br />
          <span style={{ color: ACCENT }}>y cómo protege tus derechos</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl">
          La UNIA es el sindicato más grande de Suiza. Con 180.000 afiliados, negocia salarios,
          te asesora en conflictos con el empleador y controla que se cumpla el convenio colectivo
          en tu sector — aunque trabajes con permiso B y lleves solo un mes en el país.
        </p>

        {/* CTA: Solicitar cita */}
        <button
          onClick={handleRequestCita}
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold text-sm hover:opacity-90 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
          style={{ background: ACCENT }}
        >
          <span>📅</span>
          <span>Solicitar cita gratuita con UNIA</span>
          <span>→</span>
        </button>
      </div>

      {/* ── Cuadro resumen rápido ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Afiliados",       valor: "180.000+",      icono: "👥" },
          { label: "Coste mensual",   valor: "~1% salario",   icono: "💶" },
          { label: "Período espera",  valor: "3 meses",        icono: "⏳" },
          { label: "Oficinas Suiza",  valor: "40+",            icono: "📍" },
        ].map(({ label, valor, icono }) => (
          <div key={label} className="bg-white rounded-2xl p-4 text-center border border-gray-100 shadow-sm">
            <div className="text-2xl mb-1">{icono}</div>
            <div className="text-xl font-black text-gray-900">{valor}</div>
            <div className="text-xs text-gray-400 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* ── Qué es la UNIA ── */}
      <section className="mb-10">
        <h2 className="text-2xl font-black text-gray-900 mb-4">¿Qué es la UNIA?</h2>
        <div className="prose max-w-none text-gray-600">
          <p>
            La <strong>UNIA</strong> (fundada en 2004 por fusión del FTMH y GBI) es el mayor sindicato privado de Suiza,
            integrado en la Unión Sindical Suiza (USS/SGB). Cubre principalmente los sectores de
            <strong> construcción, industria, hostelería, comercio, logística y servicios</strong>.
          </p>
          <p className="mt-3">
            A diferencia de España, los sindicatos suizos no hacen huelgas con frecuencia — su poder está en la
            <strong> negociación colectiva (CCT)</strong>: acuerdos vinculantes con las asociaciones empresariales
            que fijan salarios mínimos, horas extra y condiciones de trabajo para sectores enteros.
            Esos acuerdos te protegen aunque no seas miembro, pero afiliarte te da acceso al
            asesoramiento jurídico y la representación individual.
          </p>
          <p className="mt-3">
            Para los hispanohablantes recién llegados, la UNIA es especialmente útil porque muchos
            trabajan en sectores donde el abuso laboral es más frecuente: hostelería, construcción,
            limpieza y comercio.
          </p>
        </div>
      </section>

      {/* ── Beneficios ── */}
      <section className="mb-10">
        <h2 className="text-2xl font-black text-gray-900 mb-6">¿Qué te cubre la UNIA?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BENEFICIOS.map(({ icono, titulo, desc }) => (
            <div key={titulo} className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{icono}</span>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{titulo}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Coste ── */}
      <section className="mb-10">
        <h2 className="text-2xl font-black text-gray-900 mb-4">¿Cuánto cuesta afiliarse?</h2>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <p className="text-sm text-gray-500">
              La cuota es el <strong>~1% del salario bruto mensual</strong>, deducible en la declaración de impuestos.
            </p>
          </div>
          <div className="divide-y divide-gray-100">
            {[
              { salario: "CHF 3.500",  cuota: "CHF 35/mes",  anual: "CHF 420" },
              { salario: "CHF 5.000",  cuota: "CHF 50/mes",  anual: "CHF 600" },
              { salario: "CHF 6.500",  cuota: "CHF 65/mes",  anual: "CHF 780" },
              { salario: "CHF 8.000",  cuota: "CHF 80/mes",  anual: "CHF 960" },
              { salario: "CHF 10.000+", cuota: "CHF 100–120/mes (máx.)", anual: "CHF 1.200–1.440" },
            ].map(({ salario, cuota, anual }) => (
              <div key={salario} className="grid grid-cols-3 px-6 py-3.5 text-sm hover:bg-gray-50 transition-colors">
                <span className="font-semibold text-gray-800">{salario}</span>
                <span className="text-gray-600">{cuota}</span>
                <span className="text-gray-400">{anual}/año</span>
              </div>
            ))}
          </div>
          <div className="px-6 py-3 bg-green-50 border-t border-green-100">
            <p className="text-sm text-green-700">
              <strong>Deducción fiscal:</strong> La cuota UNIA es deducible en la declaración de impuestos suiza.
              Con un tipo marginal del 25%, CHF 600/año de cuota te cuesta realmente ~CHF 450 netos.
            </p>
          </div>
        </div>
      </section>

      {/* ── Período de espera ── */}
      <section className="mb-10">
        <div className="rounded-2xl p-6 border-l-4" style={{ background: "#FFF7ED", borderColor: "#F97316" }}>
          <h2 className="text-xl font-black text-gray-900 mb-2">⏳ El período de espera: lo que debes saber</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            Si ya tienes un conflicto laboral activo cuando te afilias, la UNIA aplica un
            <strong> período de espera de 3 meses</strong> antes de intervenir en ese caso concreto.
            Esto existe para evitar que la gente se afilie solo cuando ya tiene un problema.
          </p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex gap-2">
              <span className="text-green-600 font-bold flex-shrink-0">✓</span>
              <span>Si te afilias <strong>antes de que surja un conflicto</strong>, la protección es inmediata desde el día 1.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-600 font-bold flex-shrink-0">✓</span>
              <span>El asesoramiento general (revisión de contratos, dudas sobre CCT) está disponible desde el primer día.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-orange-500 font-bold flex-shrink-0">!</span>
              <span>Para un <strong>conflicto ya abierto</strong> (despido en curso, denuncia de horas extra, etc.) hay que esperar 3 meses.</span>
            </li>
          </ul>
          <p className="mt-4 text-sm font-semibold text-orange-700">
            Recomendación: afíliate el primer día de trabajo en Suiza. Es como el seguro del coche — no esperes al accidente.
          </p>
        </div>
      </section>

      {/* ── CCT ── */}
      <section className="mb-10">
        <h2 className="text-2xl font-black text-gray-900 mb-2">El CCT: el convenio que ya te protege</h2>
        <p className="text-gray-500 text-sm mb-5">
          El <strong>Gesamtarbeitsvertrag (GAV)</strong> — o CCT en español — es el convenio colectivo que fija
          salarios mínimos y condiciones por sector. En muchos sectores es de aplicación obligatoria
          para <em>todos</em> los trabajadores, aunque no sean miembros de ningún sindicato.
        </p>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-4 px-5 py-3 text-xs font-bold uppercase tracking-wider bg-gray-50 border-b border-gray-100 text-gray-400">
            <span>Sector</span>
            <span>Salario mínimo</span>
            <span>Vacaciones</span>
            <span className="hidden md:block">Nota</span>
          </div>
          <div className="divide-y divide-gray-100">
            {CCT_SECTORES.map(({ sector, salMin, vacaciones, nota }) => (
              <div key={sector} className="grid grid-cols-4 px-5 py-3.5 text-sm hover:bg-gray-50 transition-colors">
                <span className="font-semibold text-gray-800">{sector}</span>
                <span className="text-gray-700">{salMin}</span>
                <span className="text-gray-600">{vacaciones}</span>
                <span className="hidden md:block text-gray-400 text-xs">{nota}</span>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
            <p className="text-xs text-gray-400">* Datos 2025–2026. Verificar el CCT específico de tu sector en unia.ch</p>
          </div>
        </div>
      </section>

      {/* ── Cómo afiliarse ── */}
      <section className="mb-10">
        <h2 className="text-2xl font-black text-gray-900 mb-6">Cómo afiliarse paso a paso</h2>
        <div className="space-y-4">
          {[
            {
              n: "01",
              titulo: "Reúne tu información",
              desc: "Ten a mano tu nombre, dirección en Suiza, número de AHV (la seguridad social suiza, en tu tarjeta de seguro), empleador actual y salario bruto.",
            },
            {
              n: "02",
              titulo: "Entra en unia.ch y busca 'Mitglied werden'",
              desc: "El formulario está en alemán, francés e italiano. Selecciona tu sector y cantón. La cuota se calcula automáticamente.",
            },
            {
              n: "03",
              titulo: "Completa el formulario online (10–15 min)",
              desc: "Introduce tus datos laborales. Si prefieres hacerlo en persona, puedes ir a cualquier oficina UNIA de tu cantón — llevan un mediador si no hablas el idioma local.",
            },
            {
              n: "04",
              titulo: "Confirma y guarda tu número de miembro",
              desc: "Recibirás un email de confirmación con tu número de afiliado. Descarga la app UNIA — desde allí puedes pedir cita y contactar con tu sección local.",
            },
            {
              n: "05",
              titulo: "Si ya tienes un conflicto, avisa desde el primer día",
              desc: "Aunque hay 3 meses de espera para conflictos activos, notificarlo desde el inicio queda registrado. El asesoramiento general (revisión de contrato, dudas) es inmediato.",
            },
          ].map(({ n, titulo, desc }) => (
            <div key={n} className="flex gap-4 bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-black text-sm text-white"
                style={{ background: ACCENT }}>
                {n}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{titulo}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── UNIA vs alternativas ── */}
      <section className="mb-10">
        <h2 className="text-2xl font-black text-gray-900 mb-4">UNIA vs otros sindicatos suizos</h2>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-4 px-5 py-3 text-xs font-bold uppercase tracking-wider bg-gray-50 border-b border-gray-100 text-gray-400">
            <span>Sindicato</span>
            <span>Afiliados</span>
            <span>Sectores</span>
            <span>Para ti si…</span>
          </div>
          <div className="divide-y divide-gray-100">
            {[
              { nombre: "UNIA ⭐", miembros: "180.000", sector: "Industria, construcción, hostelería, comercio, servicios", para: "Trabajas en sector manual o servicios" },
              { nombre: "Syna",    miembros: "35.000",  sector: "Industria, artesanía, comercio, transporte",               para: "Prefieres orientación cristiana-social" },
              { nombre: "Kfm. Verband", miembros: "40.000", sector: "Empleados de oficina, comercio, seguros",             para: "Trabajo administrativo o financiero" },
              { nombre: "SEV",     miembros: "40.000",  sector: "Transporte (SBB/FFS, buses, tranvías)",                   para: "Trabajas en transporte público" },
              { nombre: "Transfair", miembros: "13.000", sector: "Sector público federal, correos, telecomunicaciones",    para: "Empleado de la Confederación o SwissPost" },
            ].map(({ nombre, miembros, sector, para }) => (
              <div key={nombre} className={`grid grid-cols-4 px-5 py-3.5 text-sm ${nombre.includes("⭐") ? "bg-red-50" : "hover:bg-gray-50"} transition-colors`}>
                <span className="font-semibold text-gray-800">{nombre}</span>
                <span className="text-gray-600">{miembros}</span>
                <span className="text-gray-500 text-xs leading-relaxed">{sector}</span>
                <span className="text-gray-500 text-xs">{para}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Para hispanohablantes ── */}
      <section className="mb-10">
        <div className="rounded-2xl p-6 text-white" style={{ background: "#0A0A0A" }}>
          <h2 className="text-xl font-black mb-3">🇪🇸 UNIA para hispanohablantes: lo que no te contará nadie</h2>
          <div className="space-y-3 text-white/80 text-sm leading-relaxed">
            <p>
              Los hispanohablantes trabajan principalmente en los sectores con mayor incidencia de abusos laborales en Suiza:
              hostelería, construcción, limpieza y logística. Son exactamente los sectores con CCT más fuertes y donde la UNIA
              tiene más presencia inspectora.
            </p>
            <p>
              En ciudades como <strong>Ginebra, Zúrich y Basilea</strong> hay mediadores de la UNIA que hablan español.
              En regiones más pequeñas puede ser más difícil, pero la atención por teléfono o app está disponible en francés e italiano,
              idiomas más accesibles para muchos latinoamericanos.
            </p>
            <p>
              Si acabas de llegar y tienes dudas sobre tu contrato, las primeras semanas son cruciales: muchos contratos
              temporales en hostelería y construcción tienen cláusulas que vulneran el CCT y que un asesor UNIA puede
              detectar en 15 minutos.
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/trabajo"
              className="px-4 py-2 rounded-full text-sm font-bold text-white hover:opacity-90 transition-opacity"
              style={{ background: ACCENT }}>
              Buscar trabajo en Suiza →
            </Link>
            <Link href="/herramientas/salario-neto"
              className="px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/10 transition-colors"
              style={{ border: "1px solid rgba(255,255,255,0.25)", color: "white" }}>
              Calcular salario neto →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="mb-10">
        <h2 className="text-2xl font-black text-gray-900 mb-6">Preguntas frecuentes sobre la UNIA</h2>
        <div className="space-y-4">
          {FAQS.map(({ q, a }) => (
            <div key={q} className="bg-white rounded-2xl p-5 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-2">{q}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Pack ── */}
      <section className="mb-10">
        <div className="rounded-2xl p-7 border-2 text-center" style={{ borderColor: ACCENT, background: "#FFF5F5" }}>
          <h2 className="text-xl font-black text-gray-900 mb-2">
            ¿Quieres que te gestionemos la afiliación a la UNIA?
          </h2>
          <p className="text-gray-500 text-sm mb-5 max-w-lg mx-auto">
            Con nuestro <strong>Pack Aterrizaje Suiza</strong> nos encargamos del registro en la UNIA,
            creamos tu CV adaptado al mercado suizo y te conectamos con un asesor de seguros médicos
            en español. Pago único, sin sorpresas.
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
            { href: "/herramientas/salario-neto",         label: "🧮 Calculadora salario neto" },
            { href: "/herramientas/comparador-ciudades",  label: "🏙️ Comparador de ciudades" },
            { href: "/seguros",                           label: "🛡️ Seguros médicos en Suiza" },
          ].map(({ href, label }) => (
            <Link key={href} href={href}
              className="flex items-center gap-2 bg-white rounded-xl p-4 border border-gray-100 text-sm font-semibold text-gray-700 hover:text-red-700 hover:border-red-100 transition-colors">
              {label}
            </Link>
          ))}
        </div>
      </section>

      {/* ── Modal de cita UNIA ── */}
      <UniaAppointmentModal
        open={citaModalOpen}
        onClose={() => setCitaModalOpen(false)}
      />
    </div>
  );
}
