import type { MetadataRoute } from "next";
import { allPosts as posts, categorias } from "@/lib/posts";
import { ciudades } from "@/lib/ciudades";
import { cantones } from "@/lib/planes";
import { paises } from "@/lib/latinoamericanos";
import { BASE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Páginas estáticas principales
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                         lastModified: now, changeFrequency: "daily",   priority: 1.0 },
    { url: `${BASE_URL}/blog`,               lastModified: now, changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE_URL}/historias-reales`,   lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/herramientas`,       lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/trabajo`,            lastModified: now, changeFrequency: "daily",   priority: 0.8 },
    { url: `${BASE_URL}/vivienda`,           lastModified: now, changeFrequency: "daily",   priority: 0.8 },
    { url: `${BASE_URL}/seguros`,            lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/sobre-nosotros`,     lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/privacidad`,         lastModified: now, changeFrequency: "yearly",  priority: 0.2 },
    { url: `${BASE_URL}/aviso-legal`,        lastModified: now, changeFrequency: "yearly",  priority: 0.2 },
    { url: `${BASE_URL}/cookies`,            lastModified: now, changeFrequency: "yearly",  priority: 0.2 },
    { url: `${BASE_URL}/afiliados`,          lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE_URL}/precios`,            lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/ciudades`,           lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  // Herramientas (alto valor SEO — keywords de intención de uso)
  const toolPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/herramientas/salario-neto`,          lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/herramientas/comparador-ciudades`,   lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/herramientas/seguros-medicos`,       lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/herramientas/comparador-salarios`,   lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/herramientas/permiso-trabajo`,       lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/herramientas/impuesto-fuente`,       lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/herramientas/traductor-cv`,          lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/trabajo/buscador`,                   lastModified: now, changeFrequency: "daily",   priority: 0.8 },
    { url: `${BASE_URL}/trabajo/unia`,                       lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/trabajo/esqui-suiza`,                lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  // Sección latinoamericanos
  const latinoPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/latinoamericanos`,                   lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...paises.map((p) => ({
      url: `${BASE_URL}/latinoamericanos/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];

  // Guías prácticas
  const guiasPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/guias`,                              lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guias/rav-paro-suiza`,               lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/guias/divorcio-suiza`,               lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/guias/volver-espana-desde-suiza`,    lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  // Recursos descargables (lead magnets)
  const recursosPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/recursos`,                           lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/recursos/primer-mes`,                lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/recursos/guia-salarios`,             lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ];

  // Artículos del blog (prioridad por destacado)
  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.fechaModificada ?? post.fecha),
    changeFrequency: "weekly" as const,
    priority: post.destacado ? 0.9 : 0.7,
  }));

  // Páginas de categoría
  const categoriaPages: MetadataRoute.Sitemap = categorias.map((cat) => ({
    url: `${BASE_URL}/categorias/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Páginas hub de ciudades
  const ciudadPages: MetadataRoute.Sitemap = ciudades.map((c) => ({
    url: `${BASE_URL}/ciudades/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Planes: índice + itinerarios + cantones + actividades individuales
  const planesPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/planes`,             lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE_URL}/planes/itinerarios`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...cantones.map((c) => ({
      url: `${BASE_URL}/planes/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...cantones.flatMap((c) =>
      c.actividades.map((a) => ({
        url: `${BASE_URL}/planes/${c.slug}/${a.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: a.destacado ? 0.8 : 0.7,
      }))
    ),
  ];

  return [...staticPages, ...toolPages, ...latinoPages, ...guiasPages, ...recursosPages, ...postPages, ...categoriaPages, ...ciudadPages, ...planesPages];
}
