import { Metadata } from "next";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  noindex?: boolean;
  keywords?: string[];
  structuredData?: Record<string, unknown>;
}

const BASE_URL = "https://hispanosensuiza.ch";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

/**
 * Genera metadata optimizada para SEO
 * Uso en páginas de Next.js App Router:
 *
 * export const metadata = generateMetadata({
 *   title: "Tu título",
 *   description: "Tu descripción",
 * });
 */
export function generateMetadata({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  article,
  noindex = false,
  keywords = [],
  structuredData,
}: SEOProps): Metadata {
  const fullTitle = title.includes("HispanosEnSuiza")
    ? title
    : `${title} | HispanosEnSuiza`;

  const canonicalUrl = canonical || BASE_URL;

  // Palabras clave por defecto
  const defaultKeywords = [
    "vivir en suiza",
    "trabajar en suiza",
    "emigrar a suiza",
    "hispanos en suiza",
    "españoles en suiza",
    "latinoamericanos en suiza",
  ];

  const allKeywords = [...defaultKeywords, ...keywords].join(", ");

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: allKeywords,
    authors: [{ name: "HispanosEnSuiza", url: BASE_URL }],
    creator: "HispanosEnSuiza",
    publisher: "HispanosEnSuiza",
    robots: noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: "HispanosEnSuiza",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "es_ES",
      type: ogType,
      ...(article && ogType === "article"
        ? {
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime,
            authors: article.author ? [article.author] : undefined,
            section: article.section,
            tags: article.tags,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
      creator: "@HispanosSuiza",
      site: "@HispanosSuiza",
    },
    viewport: {
      width: "device-width",
      initialScale: 1,
      maximumScale: 5,
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    },
  };

  // Añadir structured data si se proporciona
  if (structuredData) {
    metadata.other = {
      "application/ld+json": JSON.stringify(structuredData),
    };
  }

  return metadata;
}

/**
 * Genera JSON-LD para Schema.org
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "HispanosEnSuiza",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description:
      "Guías prácticas, herramientas y recursos para hispanohablantes que viven o quieren vivir en Suiza.",
    sameAs: [
      "https://www.facebook.com/HispanosSuiza",
      "https://www.instagram.com/hispanossuiza",
      "https://www.linkedin.com/company/hispanos-suiza",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      availableLanguage: ["Spanish", "English"],
    },
  };
}

/**
 * Genera JSON-LD para un artículo de blog
 */
export function generateArticleSchema({
  title,
  description,
  url,
  imageUrl,
  publishedAt,
  modifiedAt,
  author = "HispanosEnSuiza",
}: {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  publishedAt: string;
  modifiedAt?: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image: imageUrl,
    url,
    datePublished: publishedAt,
    dateModified: modifiedAt || publishedAt,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "HispanosEnSuiza",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

/**
 * Genera JSON-LD para un FAQ
 */
export function generateFAQSchema(
  questions: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}

/**
 * Genera JSON-LD para breadcrumbs
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Genera JSON-LD para un producto
 */
export function generateProductSchema({
  name,
  description,
  image,
  price,
  currency = "CHF",
  url,
  rating,
  reviewCount,
}: {
  name: string;
  description: string;
  image: string;
  price: number;
  currency?: string;
  url: string;
  rating?: number;
  reviewCount?: number;
}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    url,
    offers: {
      "@type": "Offer",
      price: price.toString(),
      priceCurrency: currency,
      availability: "https://schema.org/InStock",
      url,
    },
  };

  if (rating && reviewCount) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: rating.toString(),
      reviewCount: reviewCount.toString(),
    };
  }

  return schema;
}
