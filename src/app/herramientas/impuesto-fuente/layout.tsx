import type { Metadata } from "next";
import { buildMetadata, BASE_URL, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Calculadora impuesto a la fuente Suiza 2026 — Quellensteuer por cantón",
  description:
    "Calcula el Quellensteuer (impuesto a la fuente) según tu cantón, estado civil, número de hijos y salario bruto. Herramienta gratuita para extranjeros sin permiso C en Suiza.",
  path: "/herramientas/impuesto-fuente",
  ogImage:
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=85&auto=format&fit=crop",
  keywords: [
    "impuesto a la fuente suiza",
    "quellensteuer calculadora",
    "calculadora quellensteuer suiza",
    "impuesto fuente extranjeros suiza",
    "quellensteuer canton zurich",
    "quellensteuer canton ginebra",
    "impuesto retencion suiza 2026",
    "quellensteuer espanoles suiza",
    "permiso b impuesto suiza",
    "calculo impuesto fuente suiza",
  ],
});

const breadcrumb = breadcrumbSchema([
  { name: "Inicio", url: BASE_URL },
  { name: "Herramientas", url: `${BASE_URL}/herramientas` },
  {
    name: "Calculadora impuesto a la fuente",
    url: `${BASE_URL}/herramientas/impuesto-fuente`,
  },
]);

const webApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Calculadora impuesto a la fuente Suiza 2026",
  url: `${BASE_URL}/herramientas/impuesto-fuente`,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description:
    "Calcula el Quellensteuer según cantón, estado civil, hijos y salario bruto.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "CHF",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApp) }}
      />
      {children}
    </>
  );
}
