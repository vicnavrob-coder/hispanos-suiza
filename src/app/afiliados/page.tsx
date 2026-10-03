import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Política de Afiliados — Transparencia total",
  description: "Política de afiliados de HispanosEnSuiza. Cómo ganamos dinero, qué productos recomendamos y cómo garantizamos nuestra independencia editorial.",
  path: "/afiliados",
  noIndex: false,
});

const PARTNERS = [
  {
    categoria: "Seguros médicos",
    partners: ["Moneyland.ch", "Comparis.ch", "Expat Savvy"],
    comision: "CHF 50–500 por contratación",
    nota: "Comparadores independientes. La comisión varía según el tipo de seguro (básico o suplementario).",
    color: "#7c3aed",
    colorLight: "#F5F3FF",
  },
  {
    categoria: "Vivienda",
    partners: ["ImmoScout24", "Homegate", "flatfox"],
    comision: "CHF 20–50 por lead cualificado",
    nota: "Solo enlazamos a portales que usamos o usaríamos nosotros mismos.",
    color: "#1d4ed8",
    colorLight: "#EFF6FF",
  },
  {
    categoria: "Banca y finanzas",
    partners: ["Wise", "Revolut", "N26"],
    comision: "Variable según producto",
    nota: "Comisiones por apertura de cuenta. No influyen en la comparativa de cuentas bancarias.",
    color: "#15803d",
    colorLight: "#F0FDF4",
  },
];

export default function AfiliadosPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <nav className="text-xs text-[#9CA3AF] mb-4 flex items-center gap-1.5">
          <Link href="/" className="hover:text-[#C8102E] transition-colors">Inicio</Link>
          <span>›</span>
          <span>Afiliados</span>
        </nav>
        <h1 className="text-3xl font-black text-[#0A0A0A] mb-2" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
          Política de Afiliados
        </h1>
        <p className="text-sm text-[#9CA3AF]">Última actualización: 2 de octubre de 2026</p>
      </div>

      <div
        className="rounded-2xl p-5 mb-8"
        style={{ background: "#F8F6F3", border: "1px solid #E8E5E0" }}
      >
        <p className="text-sm text-[#374151] leading-relaxed">
          <strong>HispanosEnSuiza es gratuito para los usuarios.</strong> Para mantenerlo así, algunos enlaces de este sitio son de afiliado: si contratas un servicio a través de ellos, podemos recibir una comisión. Esto <strong>nunca tiene coste adicional para ti</strong> y no influye en nuestras valoraciones editoriales.
        </p>
      </div>

      <div className="prose max-w-none mb-8" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}>
        <h2>Qué son los enlaces de afiliado</h2>
        <p>
          Un enlace de afiliado es un enlace normal con un identificador que permite al proveedor saber que el usuario llegó desde nuestro sitio. Si el usuario contrata un servicio o realiza una acción (abrir una cuenta, solicitar un presupuesto), el proveedor nos paga una comisión.
        </p>
        <p>
          Esta comisión <strong>no modifica el precio que tú pagas</strong>. En muchos casos, los precios son los mismos o incluso mejores que en la web oficial, ya que los proveedores ofrecen condiciones especiales a través de afiliados.
        </p>

        <h2>Nuestros principios</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { icon: "🎯", titulo: "Independencia editorial", texto: "Ningún pago de afiliado influye en nuestras recomendaciones. Si un producto no nos convence, no lo recomendamos aunque tenga alta comisión." },
          { icon: "🔍", titulo: "Transparencia total", texto: "Marcamos claramente los enlaces de afiliado con el atributo rel='sponsored'. Esta página detalla todos los acuerdos de afiliación vigentes." },
          { icon: "✅", titulo: "Solo lo que usaríamos", texto: "Solo recomendamos productos que hemos probado o que usaríamos si estuviéramos en la situación del lector." },
        ].map((p) => (
          <div key={p.titulo} className="rounded-2xl p-5 bg-white" style={{ border: "1px solid #E8E5E0" }}>
            <div className="text-2xl mb-2">{p.icon}</div>
            <div className="font-bold text-[#0A0A0A] text-sm mb-1">{p.titulo}</div>
            <p className="text-xs text-[#6B7280] leading-relaxed">{p.texto}</p>
          </div>
        ))}
      </div>

      <div className="prose max-w-none mb-6" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}>
        <h2>Programas de afiliación actuales</h2>
      </div>

      <div className="space-y-4 mb-8">
        {PARTNERS.map((p) => (
          <div key={p.categoria} className="rounded-2xl p-5" style={{ border: `1px solid ${p.color}33`, background: p.colorLight }}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                {p.categoria}
              </h3>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-white" style={{ background: p.color }}>
                {p.comision}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {p.partners.map((name) => (
                <span key={name} className="text-xs bg-white px-2.5 py-1 rounded-full font-medium text-[#374151]"
                  style={{ border: "1px solid #E8E5E0" }}>
                  {name}
                </span>
              ))}
            </div>
            <p className="text-xs text-[#6B7280]">{p.nota}</p>
          </div>
        ))}
      </div>

      <div className="prose max-w-none" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}>
        <h2>Marco legal</h2>
        <p>
          Esta política cumple con los requisitos de transparencia de la <strong>FTC</strong> (Federal Trade Commission de EE.UU.), las directrices de la <strong>Comisión Europea</strong> sobre prácticas comerciales desleales y las recomendaciones de la <strong>IAB Europe</strong> para publicidad digital.
        </p>
        <p>
          Los enlaces de afiliado se identifican técnicamente con el atributo <code>rel="sponsored"</code> en el HTML, conforme a las directrices de Google.
        </p>

        <h2>¿Tienes preguntas?</h2>
        <p>
          Si tienes dudas sobre algún enlace específico o quieres saber si una recomendación tiene interés económico, escríbenos a <strong>hola@hispanosensuiza.com</strong>. Responderemos con total transparencia.
        </p>
      </div>

      <div className="mt-10 pt-6 flex flex-wrap gap-4 text-sm" style={{ borderTop: "1px solid #E8E5E0" }}>
        <Link href="/privacidad" className="text-[#C8102E] hover:underline">Política de privacidad</Link>
        <Link href="/aviso-legal" className="text-[#C8102E] hover:underline">Aviso legal</Link>
        <Link href="/cookies" className="text-[#C8102E] hover:underline">Política de cookies</Link>
      </div>
    </div>
  );
}
