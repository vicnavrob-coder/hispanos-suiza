import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Anunciantes y Partners — HispanosEnSuiza.ch",
  description: "Llega a más de 15.000 hispanos en Suiza cada mes. Afiliados, contenido patrocinado y acuerdos de referidos para seguros, bancos y servicios expat.",
  robots: { index: true, follow: true },
};

const STATS = [
  { label: "Lectores mensuales", value: "15.000+", icon: "👥" },
  { label: "Artículos publicados", value: "120+", icon: "📄" },
  { label: "Nicho", value: "Hispanos en Suiza", icon: "🇨🇭" },
  { label: "Canales", value: "Web + Newsletter", icon: "📧" },
];

const AUDIENCE = [
  { label: "Idioma", value: "Español (nativo)" },
  { label: "País", value: "Suiza (CH, LI)" },
  { label: "Perfil", value: "Profesionales, familias y autónomos" },
  { label: "Intereses", value: "Seguros, banca, trabajo, vivienda, idiomas" },
  { label: "Poder adquisitivo", value: "Medio-alto (salarios suizos)" },
];

const FORMATS = [
  {
    title: "Programa de afiliados",
    desc: "Enlazamos tus productos desde artículos relevantes. Cobramos comisión por lead o venta confirmada. Sin coste fijo.",
    icon: "🔗",
  },
  {
    title: "Contenido patrocinado",
    desc: "Artículo en profundidad sobre tu servicio, integrado en nuestra línea editorial. Permanente en el site.",
    icon: "✍️",
  },
  {
    title: "Acuerdo de referidos directo",
    desc: "Para seguros, bancos y servicios con ticket alto (CHF 200+). Negociamos CPA o revenue share.",
    icon: "🤝",
  },
  {
    title: "Newsletter",
    desc: "Mención en nuestra newsletter mensual a lectores activos. Ideal para lanzamientos y ofertas puntuales.",
    icon: "📬",
  },
];

export default function AnunciantesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <nav className="text-xs text-[#9CA3AF] mb-6 flex items-center gap-1.5">
        <Link href="/" className="hover:text-[#C8102E] transition-colors">Inicio</Link>
        <span>›</span>
        <span>Anunciantes</span>
      </nav>

      {/* Hero */}
      <div className="mb-12">
        <h1 className="text-4xl font-black text-[#0A0A0A] mb-4" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
          Llega a los hispanohablantes<br />que viven en Suiza
        </h1>
        <p className="text-lg text-[#374151] leading-relaxed max-w-2xl">
          HispanosEnSuiza.ch es el principal recurso en español para expats en Suiza.
          Más de <strong>15.000 lectores mensuales</strong> que toman decisiones activas
          sobre seguros, banca, vivienda y trabajo.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-xl p-4 text-center" style={{ background: "#F8F6F3", border: "1px solid #E8E5E0" }}>
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-2xl font-black text-[#C8102E]">{s.value}</div>
            <div className="text-xs text-[#6B7280] mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Audience */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-[#0A0A0A] mb-4">Perfil de audiencia</h2>
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #E8E5E0" }}>
          {AUDIENCE.map((a, i) => (
            <div key={a.label} className={`flex items-center justify-between px-5 py-3 ${i % 2 === 0 ? "bg-white" : ""}`} style={{ borderBottom: i < AUDIENCE.length - 1 ? "1px solid #E8E5E0" : "none" }}>
              <span className="text-sm text-[#6B7280] font-medium">{a.label}</span>
              <span className="text-sm text-[#0A0A0A] font-semibold">{a.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Formats */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-[#0A0A0A] mb-4">Formatos de colaboración</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {FORMATS.map((f) => (
            <div key={f.title} className="rounded-xl p-5" style={{ background: "#F8F6F3", border: "1px solid #E8E5E0" }}>
              <div className="text-2xl mb-2">{f.icon}</div>
              <h3 className="font-bold text-[#0A0A0A] mb-1">{f.title}</h3>
              <p className="text-sm text-[#374151] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-2xl p-8 text-center" style={{ background: "#C8102E" }}>
        <h2 className="text-2xl font-black text-white mb-2">¿Interesado en colaborar?</h2>
        <p className="text-white/80 mb-6 text-sm">Cuéntanos tu producto y te proponemos el formato más adecuado.</p>
        <a
          href="mailto:VNR.IAsolutions@gmail.com?subject=Colaboración%20HispanosEnSuiza"
          className="inline-block bg-white text-[#C8102E] font-bold px-8 py-3 rounded-full text-sm hover:bg-gray-50 transition-colors"
        >
          Escríbenos → VNR.IAsolutions@gmail.com
        </a>
      </div>

      {/* Networks note */}
      <p className="text-xs text-[#9CA3AF] text-center mt-6">
        También disponibles en redes de afiliados: <strong>Awin</strong> · <strong>Impact</strong> · acuerdos directos CPA
      </p>
    </div>
  );
}

