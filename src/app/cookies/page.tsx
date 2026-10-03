import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Política de Cookies",
  description: "Política de cookies de HispanosEnSuiza. Qué cookies utilizamos, para qué y cómo gestionarlas.",
  path: "/cookies",
  noIndex: false,
});

const COOKIES = [
  {
    nombre: "hs_user",
    tipo: "Esencial",
    finalidad: "Mantiene tu sesión iniciada. Almacena nombre, email y país. Sin esta cookie no puedes usar las herramientas.",
    duracion: "Indefinida (localStorage)",
    tercero: "No",
  },
  {
    nombre: "hs_accounts",
    tipo: "Esencial",
    finalidad: "Almacena los datos de registro de forma hasheada para el login.",
    duracion: "Indefinida (localStorage)",
    tercero: "No",
  },
  {
    nombre: "hs_cookie_consent",
    tipo: "Esencial",
    finalidad: "Recuerda tu elección sobre cookies para no mostrarte el banner en cada visita.",
    duracion: "365 días",
    tercero: "No",
  },
  {
    nombre: "_ga, _ga_*",
    tipo: "Analítica",
    finalidad: "Google Analytics 4. Mide visitas, páginas más populares y comportamiento de usuarios de forma anónima. Solo activa con tu consentimiento.",
    duracion: "2 años",
    tercero: "Google LLC (EE.UU.)",
  },
];

export default function CookiesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <nav className="text-xs text-[#9CA3AF] mb-4 flex items-center gap-1.5">
          <Link href="/" className="hover:text-[#C8102E] transition-colors">Inicio</Link>
          <span>›</span>
          <span>Cookies</span>
        </nav>
        <h1 className="text-3xl font-black text-[#0A0A0A] mb-2" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
          Política de Cookies
        </h1>
        <p className="text-sm text-[#9CA3AF]">Última actualización: 2 de octubre de 2026</p>
      </div>

      <div className="prose max-w-none" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}>

        <h2>¿Qué son las cookies?</h2>
        <p>
          Las cookies son pequeños archivos de texto que los sitios web guardan en tu dispositivo cuando los visitas. Sirven para que el sitio funcione correctamente, recordar tus preferencias y, con tu consentimiento, obtener estadísticas de uso.
        </p>
        <p>
          En HispanosEnSuiza utilizamos principalmente <strong>localStorage</strong> del navegador en lugar de cookies tradicionales para los datos de sesión, ya que nunca se transmiten al servidor. Aun así, aplicamos los mismos principios de transparencia y consentimiento.
        </p>

        <h2>Cookies que utilizamos</h2>
      </div>

      {/* Tabla de cookies */}
      <div className="rounded-2xl overflow-hidden my-6" style={{ border: "1px solid #E8E5E0" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}>
            <thead>
              <tr style={{ background: "#F8F6F3", borderBottom: "1px solid #E8E5E0" }}>
                <th className="text-left px-4 py-3 font-semibold text-[#374151]">Nombre</th>
                <th className="text-left px-4 py-3 font-semibold text-[#374151]">Tipo</th>
                <th className="text-left px-4 py-3 font-semibold text-[#374151]">Finalidad</th>
                <th className="text-left px-4 py-3 font-semibold text-[#374151] hidden md:table-cell">Duración</th>
                <th className="text-left px-4 py-3 font-semibold text-[#374151] hidden md:table-cell">Tercero</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "#F0EDEA" }}>
              {COOKIES.map((c) => (
                <tr key={c.nombre}>
                  <td className="px-4 py-3">
                    <code className="text-xs bg-[#F8F6F3] px-1.5 py-0.5 rounded text-[#C8102E]">{c.nombre}</code>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        background: c.tipo === "Esencial" ? "#F0FDF4" : "#FFF1F3",
                        color: c.tipo === "Esencial" ? "#15803d" : "#C8102E",
                      }}
                    >
                      {c.tipo}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#374151] text-xs leading-relaxed">{c.finalidad}</td>
                  <td className="px-4 py-3 text-[#6B7280] text-xs hidden md:table-cell">{c.duracion}</td>
                  <td className="px-4 py-3 text-[#6B7280] text-xs hidden md:table-cell">{c.tercero}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="prose max-w-none" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}>

        <h2>Gestión de cookies</h2>
        <p>
          Al entrar por primera vez en nuestra web, te mostramos un banner para que elijas:
        </p>
        <ul>
          <li><strong>Aceptar todo:</strong> activa las cookies esenciales y de analítica.</li>
          <li><strong>Solo esenciales:</strong> activa únicamente las cookies necesarias para que el sitio funcione. No se cargará Google Analytics.</li>
        </ul>
        <p>
          Puedes cambiar tu elección en cualquier momento desde el enlace "Gestionar cookies" en el pie de página.
        </p>

        <h2>Cómo eliminar las cookies</h2>
        <p>
          Puedes eliminar o bloquear las cookies desde la configuración de tu navegador:
        </p>
        <ul>
          <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
          <li><strong>Firefox:</strong> Opciones → Privacidad y seguridad → Cookies</li>
          <li><strong>Safari:</strong> Preferencias → Privacidad → Cookies</li>
          <li><strong>Edge:</strong> Configuración → Privacidad → Cookies</li>
        </ul>
        <p>
          Ten en cuenta que bloquear las cookies esenciales puede impedir el funcionamiento correcto del sitio (p. ej., no podrás iniciar sesión).
        </p>

        <h2>Cookies de terceros — Google Analytics</h2>
        <p>
          Google Analytics 4 (GA4) está sujeto a la política de privacidad de Google. Hemos configurado GA4 con <strong>anonimización de IP</strong> y sin compartir datos con Google para publicidad. Puedes optar por no ser rastreado por Google Analytics mediante el complemento de inhabilitación de Google Analytics:{" "}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#C8102E]">
            tools.google.com/dlpage/gaoptout
          </a>.
        </p>

        <h2>Más información</h2>
        <p>
          Para cualquier consulta sobre cookies, escríbenos a <strong>privacidad@hispanosensuiza.com</strong> o consulta nuestra{" "}
          <Link href="/privacidad" className="text-[#C8102E] hover:underline">Política de privacidad</Link>.
        </p>

      </div>

      <div className="mt-10 pt-6 flex flex-wrap gap-4 text-sm" style={{ borderTop: "1px solid #E8E5E0" }}>
        <Link href="/privacidad" className="text-[#C8102E] hover:underline">Política de privacidad</Link>
        <Link href="/aviso-legal" className="text-[#C8102E] hover:underline">Aviso legal</Link>
        <Link href="/afiliados" className="text-[#C8102E] hover:underline">Política de afiliados</Link>
      </div>
    </div>
  );
}
