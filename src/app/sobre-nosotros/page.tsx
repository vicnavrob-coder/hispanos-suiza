import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata, BASE_URL, breadcrumbSchema, organizationSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Sobre nosotros — Hispanohablantes que viven en Suiza",
  description: "HispanosEnSuiza es un proyecto creado por hispanohablantes que viven en Suiza. Información real, verificada y en español sobre cómo vivir, trabajar y prosperar en Suiza.",
  path: "/sobre-nosotros",
  ogImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85&auto=format&fit=crop",
  keywords: [
    "hispanohablantes suiza", "comunidad hispana suiza", "guía española suiza",
    "hispanosensuiza proyecto", "información vivir suiza español",
    "recursos expatriados suiza", "quienes somos hispanosensuiza",
  ],
});

export default function SobreNosotrosPage() {
  const schemas = [
    breadcrumbSchema([
      { name: "Inicio", url: BASE_URL },
      { name: "Sobre nosotros", url: `${BASE_URL}/sobre-nosotros` },
    ]),
    organizationSchema(),
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Sobre nosotros</h1>

      <div className="bg-red-50 border border-red-100 rounded-2xl p-6 mb-8">
        <p className="text-gray-700 leading-relaxed">
          <strong>HispanosEnSuiza</strong> nació porque cuando llegamos a Suiza no encontramos
          información fiable en español. Encontramos guías genéricas, artículos sin fecha y
          consejos de hace diez años que ya no funcionaban.
        </p>
      </div>

      <div className="prose max-w-none text-gray-700">
        <h2>Por qué somos diferentes</h2>
        <p>
          No somos un blog de viajes ni una agencia de relocation. Somos hispanohablantes
          que vivimos en Suiza y escribimos sobre lo que realmente nos costó entender:
          el sistema de seguros, cómo encontrar piso siendo extranjero, qué bancos aceptan
          a recién llegados y qué trampas evitar.
        </p>
        <p>
          Toda la información que publicamos está verificada, fechada y contrastada con
          experiencias reales de la comunidad.
        </p>

        <h2>Transparencia sobre afiliados</h2>
        <p>
          Algunos de los enlaces en esta web son de afiliado: si contratas un seguro,
          abres una cuenta bancaria o compras un curso a través de nuestros links, recibimos
          una comisión sin coste adicional para ti. Esto nos permite mantener el sitio gratuito.
        </p>
        <p>
          Nunca recomendamos algo que no usaríamos nosotros mismos. Las comparativas son
          honestas aunque el producto mejor posicionado no sea el que más comisión nos da.
        </p>

        <h2>Contacto</h2>
        <p>
          ¿Quieres compartir tu historia, corregir un error o colaborar?
          Escríbenos a <a href="mailto:hola@hispanosensuiza.com">hola@hispanosensuiza.com</a>
        </p>
      </div>

      <div className="mt-10 flex gap-3">
        <Link
          href="/blog"
          style={{ background: "#C0392B" }}
          className="text-white font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity text-sm"
        >
          Ver todas las guías
        </Link>
        <Link
          href="/historias-reales"
          className="border border-gray-300 text-gray-700 font-semibold px-5 py-2.5 rounded-full hover:border-red-300 transition-colors text-sm"
        >
          Historias reales
        </Link>
      </div>
    </div>
  );
}
