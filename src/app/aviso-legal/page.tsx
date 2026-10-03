import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Aviso Legal",
  description: "Aviso legal e información legal de HispanosEnSuiza conforme a la normativa suiza y europea.",
  path: "/aviso-legal",
  noIndex: false,
});

export default function AvisoLegalPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <nav className="text-xs text-[#9CA3AF] mb-4 flex items-center gap-1.5">
          <Link href="/" className="hover:text-[#C8102E] transition-colors">Inicio</Link>
          <span>›</span>
          <span>Aviso legal</span>
        </nav>
        <h1 className="text-3xl font-black text-[#0A0A0A] mb-2" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
          Aviso Legal
        </h1>
        <p className="text-sm text-[#9CA3AF]">Última actualización: 2 de octubre de 2026</p>
      </div>

      <div className="prose max-w-none" style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}>

        <h2>1. Titular del sitio web</h2>
        <p>
          <strong>HispanosEnSuiza</strong><br />
          Sitio web: www.hispanosensuiza.com<br />
          Correo electrónico: hola@hispanosensuiza.com
        </p>

        <h2>2. Objeto y ámbito de aplicación</h2>
        <p>
          El presente aviso legal regula el acceso y uso del sitio web <strong>hispanosensuiza.com</strong>, titularidad de HispanosEnSuiza, cuya finalidad es proporcionar información, guías y herramientas sobre vida en Suiza dirigidas a hispanohablantes.
        </p>
        <p>
          El acceso al sitio web es gratuito. El uso de determinadas herramientas (buscador de trabajo, comparador de vivienda, calculadoras) requiere registro previo, también gratuito.
        </p>

        <h2>3. Propiedad intelectual</h2>
        <p>
          Todos los contenidos del sitio web (textos, imágenes, gráficos, código, diseño, logotipos y demás elementos) son propiedad de HispanosEnSuiza o de sus respectivos autores y están protegidos por la legislación suiza e internacional sobre propiedad intelectual.
        </p>
        <p>
          Queda expresamente prohibida la reproducción, distribución, comunicación pública o transformación total o parcial de los contenidos sin autorización expresa y escrita de HispanosEnSuiza, salvo que:
        </p>
        <ul>
          <li>Se trate de uso personal y no comercial.</li>
          <li>Se cite la fuente con enlace al artículo original.</li>
        </ul>

        <h2>4. Exclusión de garantías y responsabilidad</h2>
        <p>
          HispanosEnSuiza elabora los contenidos con rigor y diligencia, pero <strong>no garantiza la exactitud, completitud o actualidad</strong> de la información publicada. Los contenidos tienen carácter informativo y no constituyen asesoramiento legal, fiscal, financiero ni de ningún otro tipo.
        </p>
        <p>
          En particular:
        </p>
        <ul>
          <li>Las calculadoras (salario neto, seguros) ofrecen <strong>estimaciones orientativas</strong>, no cálculos oficiales. Para decisiones económicas importantes, consulta a un profesional.</li>
          <li>La información sobre permisos de residencia, visados o trámites administrativos puede quedar desactualizada. Verifica siempre con fuentes oficiales (SEM, SECO, cantones).</li>
          <li>Los enlaces a sitios de terceros (portales de empleo, aseguradoras, portales inmobiliarios) son responsabilidad exclusiva de dichos terceros.</li>
        </ul>
        <p>
          HispanosEnSuiza no se responsabiliza de los daños o perjuicios derivados del uso de la información contenida en este sitio.
        </p>

        <h2>5. Relaciones de afiliación y publicidad</h2>
        <p>
          Algunos enlaces de este sitio son enlaces de afiliado. Esto significa que si contratas un producto o servicio a través de dichos enlaces, HispanosEnSuiza puede recibir una comisión sin coste adicional para ti. Esta práctica nos ayuda a mantener el sitio gratuito para los usuarios.
        </p>
        <p>
          Los productos y servicios recomendados son seleccionados de forma independiente. Las comisiones de afiliado no influyen en las valoraciones ni en los contenidos editoriales. Para más información, consulta nuestra{" "}
          <Link href="/afiliados" className="text-[#C8102E] hover:underline">Política de afiliados</Link>.
        </p>

        <h2>6. Ley aplicable y jurisdicción</h2>
        <p>
          El presente aviso legal se rige por la <strong>legislación suiza</strong>. Para cualquier controversia derivada del acceso o uso de este sitio web, las partes se someten a los tribunales competentes de Suiza, sin perjuicio de los derechos que la normativa de protección al consumidor reconozca al usuario en su país de residencia.
        </p>

        <h2>7. Modificaciones</h2>
        <p>
          HispanosEnSuiza se reserva el derecho de modificar el presente aviso legal en cualquier momento. Los cambios entrarán en vigor desde su publicación en esta página.
        </p>

      </div>

      <div className="mt-10 pt-6 flex flex-wrap gap-4 text-sm" style={{ borderTop: "1px solid #E8E5E0" }}>
        <Link href="/privacidad" className="text-[#C8102E] hover:underline">Política de privacidad</Link>
        <Link href="/cookies" className="text-[#C8102E] hover:underline">Política de cookies</Link>
        <Link href="/afiliados" className="text-[#C8102E] hover:underline">Política de afiliados</Link>
      </div>
    </div>
  );
}
