import { MetadataRoute } from 'next';
import { posts } from '@/lib/posts';

const BASE_URL = 'https://hispanosensuiza.ch';

export default function sitemap(): MetadataRoute.Sitemap {
  // Páginas estáticas principales
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/herramientas`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/trabajo`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/vivienda`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/seguros`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Herramientas (high priority - estas son las que convierten)
    {
      url: `${BASE_URL}/herramientas/generador-cv`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/herramientas/salario-neto`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/herramientas/comparador-ciudades`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/herramientas/comparador-salarios`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/herramientas/impuesto-fuente`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/herramientas/permiso-trabajo`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/herramientas/seguros-medicos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    // Recursos (lead magnets)
    {
      url: `${BASE_URL}/recursos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/recursos/primer-mes`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/recursos/guia-salarios`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/recursos/checklist-emigrar`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Trabajo
    {
      url: `${BASE_URL}/trabajo/buscador`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/trabajo/unia`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/trabajo/esqui-suiza`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Productos
    {
      url: `${BASE_URL}/productos/template-emigrar-suiza`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/precios`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Guías destacadas
    {
      url: `${BASE_URL}/guias`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/guias/rav-paro-suiza`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/guias/divorcio-suiza`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/guias/volver-espana-desde-suiza`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    // Ciudades
    {
      url: `${BASE_URL}/ciudades`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Latinoamericanos
    {
      url: `${BASE_URL}/latinoamericanos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Historias reales
    {
      url: `${BASE_URL}/historias-reales`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    // Planes
    {
      url: `${BASE_URL}/planes`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    // Legal
    {
      url: `${BASE_URL}/sobre-nosotros`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/privacidad`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/cookies`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/aviso-legal`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Posts dinámicos del blog
  const blogPosts: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.fecha ? new Date(post.fecha) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: post.destacado ? 0.8 : 0.6,
  }));

  // Ciudades dinámicas
  const ciudades = ['zurich', 'ginebra', 'basilea', 'berna', 'lucerna', 'lausana', 'lugano', 'winterthur', 'san-galo', 'biel', 'thun'];
  const ciudadesPosts: MetadataRoute.Sitemap = ciudades.map((ciudad) => ({
    url: `${BASE_URL}/ciudades/${ciudad}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Países latinoamericanos
  const paises = ['argentina', 'colombia', 'mexico', 'chile', 'peru', 'venezuela', 'ecuador', 'uruguay', 'bolivia', 'paraguay'];
  const paisesPosts: MetadataRoute.Sitemap = paises.map((pais) => ({
    url: `${BASE_URL}/latinoamericanos/${pais}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Categorías
  const categorias = ['trabajo', 'vivienda', 'banca', 'seguros', 'impuestos', 'permisos', 'educacion', 'vida-diaria'];
  const categoriasPosts: MetadataRoute.Sitemap = categorias.map((cat) => ({
    url: `${BASE_URL}/categorias/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPosts, ...ciudadesPosts, ...paisesPosts, ...categoriasPosts];
}
