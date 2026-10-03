import Link from "next/link";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-[#6B7280]">
      <div className="max-w-[1200px] mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Marca */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="text-xl">🇨🇭</span>
              <span
                className="text-white font-bold text-xl"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                HispanosEnSuiza
              </span>
            </div>
            <p
              className="text-xs font-medium mb-4"
              style={{ color: "#C8102E", fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            >
              Hecho para la comunidad hispana
            </p>
            <p
              className="text-sm text-[#6B7280] leading-relaxed"
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            >
              La guía real para hispanohablantes que viven o quieren vivir en Suiza. Información verificada con experiencias reales.
            </p>
          </div>

          {/* Contenido */}
          <div>
            <h4
              className="text-white font-semibold mb-4 text-sm uppercase tracking-wider"
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            >
              Contenido
            </h4>
            <ul className="space-y-3 text-sm" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              </li>
              <li>
                <Link href="/historias-reales" className="hover:text-white transition-colors">Historias reales</Link>
              </li>
              <li>
                <Link href="/herramientas" className="hover:text-white transition-colors">Herramientas</Link>
              </li>
            </ul>
          </div>

          {/* Temas */}
          <div>
            <h4
              className="text-white font-semibold mb-4 text-sm uppercase tracking-wider"
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            >
              Temas
            </h4>
            <ul className="space-y-3 text-sm" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}>
              <li><Link href="/categorias/emigrar" className="hover:text-white transition-colors">Emigrar a Suiza</Link></li>
              <li><Link href="/categorias/vivienda" className="hover:text-white transition-colors">Vivienda</Link></li>
              <li><Link href="/categorias/trabajo" className="hover:text-white transition-colors">Trabajo</Link></li>
              <li><Link href="/categorias/banca" className="hover:text-white transition-colors">Banca y Finanzas</Link></li>
              <li><Link href="/categorias/seguros" className="hover:text-white transition-colors">Seguros</Link></li>
              <li><Link href="/categorias/vida-diaria" className="hover:text-white transition-colors">Vida diaria</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4
              className="text-white font-semibold mb-4 text-sm uppercase tracking-wider"
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            >
              Newsletter semanal
            </h4>
            <p
              className="text-sm text-[#6B7280] mb-4 leading-relaxed"
              style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
            >
              Guías, noticias y experiencias reales cada semana.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-[#4B5563]"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
          }}
        >
          <p>© 2026 HispanosEnSuiza · Hecho en Suiza para hispanohablantes</p>
          <div className="flex gap-5">
            <Link href="/aviso-legal" className="hover:text-[#9CA3AF] transition-colors">Aviso legal</Link>
            <Link href="/privacidad" className="hover:text-[#9CA3AF] transition-colors">Privacidad</Link>
            <Link href="/cookies" className="hover:text-[#9CA3AF] transition-colors">Cookies</Link>
            <Link href="/afiliados" className="hover:text-[#9CA3AF] transition-colors">Afiliados</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
