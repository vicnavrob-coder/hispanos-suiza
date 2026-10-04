/**
 * SEO utility — HispanosEnSuiza
 * Centraliza metadata, schemas JSON-LD y helpers SEO.
 * Usar en todas las páginas para consistencia automática.
 */

import type { Metadata } from "next";

export const BASE_URL = "https://hispanosensuiza.ch";
export const SITE_NAME = "HispanosEnSuiza";
export const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;
export const TWITTER_HANDLE = "@hispanosensuiza";

// ─────────────────────────────────────────────
// Tipos
// ─────────────────────────────────────────────

export interface SeoOptions {
  title: string;
  description: string;
  path: string;                        // e.g. "/blog/mi-articulo"
  ogImage?: string;
  ogType?: "website" | "article";
  publishedTime?: string;
  keywords?: string[];
  noIndex?: boolean;
}

// ─────────────────────────────────────────────
// buildMetadata — genera Metadata de Next.js completo
// ─────────────────────────────────────────────

export function buildMetadata(opts: SeoOptions): Metadata {
  const url = `${BASE_URL}${opts.path}`;
  const image = opts.ogImage ?? DEFAULT_OG_IMAGE;

  return {
    title: opts.title,
    description: opts.description,
    ...(opts.keywords?.length ? { keywords: opts.keywords } : {}),
    alternates: {
      canonical: url,
      languages: {
        "es":    url,
        "es-ES": url,
        "es-MX": url,
        "es-AR": url,
        "es-CO": url,
        "x-default": url,
      },
    },
    openGraph: {
      title: opts.title,
      description: opts.description,
      type: opts.ogType ?? "website",
      locale: "es_ES",
      alternateLocale: ["es_MX", "es_AR", "es_CO"],
      siteName: SITE_NAME,
      url,
      images: [{ url: image, width: 1200, height: 630, alt: opts.title }],
      ...(opts.publishedTime ? { publishedTime: opts.publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      title: opts.title,
      description: opts.description,
      images: [image],
    },
    robots: opts.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  };
}

// ─────────────────────────────────────────────
// Schemas JSON-LD
// ─────────────────────────────────────────────

/** Organization — poner en homepage */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/logo.png`,
      width: 200,
      height: 200,
    },
    description: "La guía real para hispanohablantes que viven o quieren vivir en Suiza.",
    inLanguage: "es",
    sameAs: [
      "https://twitter.com/hispanosensuiza",
      "https://instagram.com/hispanosensuiza",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      availableLanguage: "Spanish",
    },
  };
}

/** WebSite — poner en homepage, habilita sitelinks search box */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: BASE_URL,
    description: "Guías y experiencias reales para hispanohablantes en Suiza",
    inLanguage: "es",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/** BreadcrumbList — poner en todas las páginas internas */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** BlogPosting — artículos de blog */
export function articleSchema(opts: {
  titulo: string;
  descripcion: string;
  slug: string;
  fecha: string;
  fechaModificada?: string;
  categoria?: string;
  tiempoLectura?: number;
  imagen?: string;
  autor?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.titulo,
    description: opts.descripcion,
    datePublished: opts.fecha,
    dateModified: opts.fechaModificada ?? opts.fecha,
    inLanguage: "es",
    url: `${BASE_URL}/blog/${opts.slug}`,
    image: opts.imagen
      ? { "@type": "ImageObject", url: opts.imagen, width: 1200, height: 630 }
      : { "@type": "ImageObject", url: DEFAULT_OG_IMAGE, width: 1200, height: 630 },
    author: {
      "@type": "Person",
      name: opts.autor ?? "Equipo HispanosEnSuiza",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: BASE_URL,
      logo: { "@type": "ImageObject", url: `${BASE_URL}/logo.png` },
    },
    ...(opts.categoria ? { articleSection: opts.categoria } : {}),
    ...(opts.tiempoLectura ? { timeRequired: `PT${opts.tiempoLectura}M` } : {}),
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/blog/${opts.slug}` },
  };
}

/** FAQPage — genera featured snippets en Google. Incluir en artículos con preguntas frecuentes */
export function faqSchema(faqs: { pregunta: string; respuesta: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.pregunta,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.respuesta,
      },
    })),
  };
}

/** ItemList — listas de artículos (blog, categorías) */
export function itemListSchema(items: { name: string; url: string; description?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url,
      ...(item.description ? { description: item.description } : {}),
    })),
  };
}

/** WebApplication — herramientas/calculadoras */
export function webAppSchema(opts: {
  name: string;
  description: string;
  path: string;
  applicationCategory?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: opts.name,
    description: opts.description,
    url: `${BASE_URL}${opts.path}`,
    applicationCategory: opts.applicationCategory ?? "FinanceApplication",
    inLanguage: "es",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "CHF" },
    operatingSystem: "Web Browser",
    creator: { "@type": "Organization", name: SITE_NAME, url: BASE_URL },
  };
}

/** HowTo — guías paso a paso */
export function howToSchema(opts: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
  totalTime?: string;       // ISO 8601, e.g. "PT2H"
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    description: opts.description,
    inLanguage: "es",
    ...(opts.totalTime ? { totalTime: opts.totalTime } : {}),
    step: opts.steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

// ─────────────────────────────────────────────
// Helper — renderiza múltiples schemas en un <script>
// ─────────────────────────────────────────────

export function jsonLdScripts(schemas: object[]) {
  return schemas.map((s) => JSON.stringify(s));
}
