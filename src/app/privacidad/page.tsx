import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Política de Privacidad",
  description: "Política de privacidad de HispanosEnSuiza. Cómo recopilamos, usamos y protegemos tus datos personales conforme al RGPD y la Ley Federal Suiza de Protección de Datos (DSG).",
  path: "/privacidad",
  noIndex: false,
});

const LAST_UPDATE = "2 de octubre de 2026";

export default function PrivacidadPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <nav className="text-xs text-[#9CA3AF] mb-4 flex items-center gap-1.5">
          <Link href="/" className="hover:text-[#C8102E] transition-colors">Inicio</Link>
          <span>›</span>
          <span>Privacidad</span>
        </nav>
        <h1 className="text-3xl font-black text-[#0A0A0A] mb-2" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
          Política de Privacidad
        </h1>
        <p className="text-sm text-[#9CA3AF]">Última actualización: {LAST_UPDATE}</p>
      </div>

      <div
        className="rounded-2xl p-5 mb-8 text-sm"
        style={{ background: "#FFF1F3", border: "1px solid #FECDD3", color: "#9F1239" }}
      >
        Esta política explica qué datos recopilamos, para qué los usamos y cuáles son tus derechos conforme al <strong>Reglamento General de Protección de Datos (RGPD)</strong> de la Unión Europea y la <strong>Ley Federal Suiza de Protección de Datos (nDSG)</strong>, vigente desde septiembre de 2023.
      </div>

      <div className="prose max-w-none" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}>

        <h2>1. Responsable del tratamiento</h2>
        <p>
          El responsable del tratamiento de los datos personales recogidos a través de este sitio web es:
        </p>
        <p>
          <strong>HispanosEnSuiza</strong><br />
          Sitio web: www.hispanosensuiza.com<br />
          Contacto: privacidad@hispanosensuiza.com
        </p>

        <h2>2. Datos que recopilamos</h2>
        <p>Recopilamos únicamente los datos que tú nos proporcionas voluntariamente:</p>
        <ul>
          <li><strong>Registro de cuenta:</strong> nombre, país de origen, dirección de correo electrónico y contraseña (almacenada de forma hasheada, nunca en texto plano).</li>
          <li><strong>Suscripción al newsletter:</strong> dirección de correo electrónico.</li>
          <li><strong>Datos de uso:</strong> páginas visitadas, herramientas utilizadas y tiempo de sesión, recopilados de forma anónima mediante cookies de analítica (solo con tu consentimiento previo).</li>
        </ul>
        <p>
          <strong>No recopilamos</strong> datos sensibles (salud, ideología política, religión), datos de tarjetas de crédito ni información financiera.
        </p>

        <h2>3. Base legal del tratamiento</h2>
        <ul>
          <li><strong>Consentimiento explícito</strong> (Art. 6.1.a RGPD): para el registro de cuenta, newsletter y cookies de analítica.</li>
          <li><strong>Interés legítimo</strong> (Art. 6.1.f RGPD): para la seguridad del sitio y la prevención de fraudes.</li>
        </ul>

        <h2>4. Finalidad del tratamiento</h2>
        <p>Utilizamos tus datos para:</p>
        <ul>
          <li>Gestionar tu cuenta de usuario y permitirte acceder a las herramientas del sitio.</li>
          <li>Enviarte el newsletter semanal (solo si te has suscrito expresamente).</li>
          <li>Mejorar el funcionamiento del sitio mediante estadísticas de uso anónimas.</li>
          <li>Comunicarnos contigo en respuesta a consultas o incidencias.</li>
        </ul>
        <p>
          <strong>No cedemos ni vendemos tus datos</strong> a terceros con fines comerciales.
        </p>

        <h2>5. Almacenamiento de datos</h2>
        <p>
          Los datos de registro de cuenta se almacenan <strong>localmente en tu navegador</strong> (localStorage) y no se transmiten a ningún servidor externo. Esto significa que los datos son accesibles únicamente desde el dispositivo donde te registraste.
        </p>
        <p>
          Los datos del newsletter se almacenan en los servidores de <strong>Brevo (Sendinblue)</strong>, nuestro proveedor de email marketing, ubicados en la Unión Europea. Puedes consultar su política de privacidad en brevo.com/legal/privacypolicy.
        </p>

        <h2>6. Conservación de los datos</h2>
        <ul>
          <li><strong>Cuenta de usuario:</strong> hasta que la elimines manualmente desde tu navegador o solicites la eliminación por email.</li>
          <li><strong>Newsletter:</strong> hasta que te des de baja (cada email incluye un enlace de baja) o solicites la eliminación.</li>
          <li><strong>Cookies de analítica:</strong> según la duración configurada en cada cookie (ver Política de Cookies).</li>
        </ul>

        <h2>7. Tus derechos</h2>
        <p>Conforme al RGPD y la nDSG suiza, tienes derecho a:</p>
        <ul>
          <li><strong>Acceso:</strong> solicitar qué datos tenemos sobre ti.</li>
          <li><strong>Rectificación:</strong> corregir datos inexactos.</li>
          <li><strong>Supresión:</strong> solicitar la eliminación de tus datos ("derecho al olvido").</li>
          <li><strong>Portabilidad:</strong> recibir tus datos en formato estructurado.</li>
          <li><strong>Oposición:</strong> oponerte al tratamiento de tus datos.</li>
          <li><strong>Retirada del consentimiento:</strong> en cualquier momento, sin que ello afecte a la licitud del tratamiento previo.</li>
        </ul>
        <p>
          Para ejercer cualquiera de estos derechos, escríbenos a <strong>privacidad@hispanosensuiza.com</strong>. Responderemos en un plazo máximo de 30 días.
        </p>
        <p>
          También tienes derecho a presentar una reclamación ante la autoridad supervisora competente. En Suiza: <strong>Comisionado Federal de Protección de Datos (PFPDT)</strong> — edoeb.admin.ch. En la UE: la autoridad de protección de datos de tu país de residencia.
        </p>

        <h2>8. Cookies</h2>
        <p>
          Utilizamos cookies técnicas (necesarias para el funcionamiento del sitio) y cookies de analítica (solo con tu consentimiento). Para más información, consulta nuestra{" "}
          <Link href="/cookies" className="text-[#C8102E] hover:underline">Política de Cookies</Link>.
        </p>

        <h2>9. Menores de edad</h2>
        <p>
          Este sitio no está dirigido a menores de 16 años. No recopilamos conscientemente datos de menores. Si detectamos que hemos recopilado datos de un menor, los eliminaremos inmediatamente.
        </p>

        <h2>10. Cambios en esta política</h2>
        <p>
          Nos reservamos el derecho a actualizar esta política para adaptarla a cambios legales o en nuestros servicios. Te notificaremos los cambios relevantes por email si estás suscrito al newsletter. La versión vigente siempre estará disponible en esta página con la fecha de última actualización.
        </p>

        <h2>11. Contacto</h2>
        <p>
          Para cualquier consulta sobre privacidad: <strong>privacidad@hispanosensuiza.com</strong>
        </p>

      </div>

      <div className="mt-10 pt-6 flex flex-wrap gap-4 text-sm" style={{ borderTop: "1px solid #E8E5E0" }}>
        <Link href="/aviso-legal" className="text-[#C8102E] hover:underline">Aviso legal</Link>
        <Link href="/cookies" className="text-[#C8102E] hover:underline">Política de cookies</Link>
        <Link href="/afiliados" className="text-[#C8102E] hover:underline">Política de afiliados</Link>
      </div>
    </div>
  );
}
