#!/usr/bin/env node
/**
 * scripts/generate-search-index.js
 * Genera el índice de búsqueda estático en build-time
 * Se ejecuta automáticamente antes de cada build
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM workaround para __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Función para importar módulos ESM dinámicamente
async function importData() {
  const postsModule = await import('../src/lib/posts.js');
  const postsAutoModule = await import('../src/lib/posts-auto.js');
  const ciudadesModule = await import('../src/lib/ciudades.js');
  const planesModule = await import('../src/lib/planes.js');
  const latinoamericanosModule = await import('../src/lib/latinoamericanos.js');

  return {
    posts: postsModule.postsManual || [],
    postsAuto: postsAutoModule.postsAuto || [],
    ciudades: ciudadesModule.ciudades || [],
    cantones: planesModule.cantones || [],
    paises: latinoamericanosModule.paises || [],
  };
}

// Función para truncar contenido HTML a texto plano
function stripHtmlAndTruncate(html, maxLength) {
  if (!html) return '';
  const text = html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > maxLength ? text.slice(0, maxLength) : text;
}

async function generateSearchIndex() {
  console.log('🔍 Generando índice de búsqueda...');

  const { posts, postsAuto, ciudades, cantones, paises } = await importData();

  const allPosts = [...posts, ...postsAuto];
  const index = [];

  // ────────────────────────────────────────────────────────────
  // 1. BLOG POSTS
  // ────────────────────────────────────────────────────────────
  console.log(`  📝 Indexando ${allPosts.length} posts...`);
  allPosts.forEach(post => {
    if (post.noIndex) return; // Skip posts marcados como noIndex

    index.push({
      id: `post-${post.slug}`,
      type: 'post',
      titulo: post.titulo,
      descripcion: post.descripcion,
      contenido: stripHtmlAndTruncate(post.contenido, 500),
      url: `/blog/${post.slug}`,
      categoria: post.categoria,
      keywords: post.palabrasClave || [],
      relevancia: post.destacado ? 15 : 5,
      imagen: post.imagen,
    });
  });

  // ────────────────────────────────────────────────────────────
  // 2. CIUDADES
  // ────────────────────────────────────────────────────────────
  console.log(`  🏙️  Indexando ${ciudades.length} ciudades...`);
  ciudades.forEach(ciudad => {
    index.push({
      id: `ciudad-${ciudad.slug}`,
      type: 'ciudad',
      titulo: ciudad.nombre,
      descripcion: ciudad.descripcion,
      contenido: ciudad.descripcionLarga.slice(0, 500),
      url: `/ciudades/${ciudad.slug}`,
      keywords: ciudad.keywords,
      relevancia: 10,
      imagen: ciudad.imagen,
    });
  });

  // ────────────────────────────────────────────────────────────
  // 3. ACTIVIDADES / PLANES
  // ────────────────────────────────────────────────────────────
  let actividadesCount = 0;
  cantones.forEach(canton => {
    canton.actividades.forEach(actividad => {
      index.push({
        id: `actividad-${canton.slug}-${actividad.slug}`,
        type: 'actividad',
        titulo: actividad.nombre,
        descripcion: actividad.descripcion,
        url: `/planes/${canton.slug}/${actividad.slug}`,
        categoria: actividad.tipo,
        keywords: actividad.keywords,
        relevancia: actividad.destacado ? 8 : 3,
        imagen: actividad.imagen,
      });
      actividadesCount++;
    });
  });
  console.log(`  🏔️  Indexando ${actividadesCount} actividades...`);

  // ────────────────────────────────────────────────────────────
  // 4. PAÍSES
  // ────────────────────────────────────────────────────────────
  console.log(`  🌎 Indexando ${paises.length} países...`);
  paises.forEach(pais => {
    index.push({
      id: `pais-${pais.slug}`,
      type: 'pais',
      titulo: `${pais.emoji} ${pais.nombre}`,
      descripcion: pais.descripcion,
      contenido: pais.descripcionLarga.slice(0, 500),
      url: `/latinoamericanos/${pais.slug}`,
      keywords: pais.keywords,
      relevancia: 7,
      imagen: pais.imagen,
    });
  });

  // ────────────────────────────────────────────────────────────
  // 5. HERRAMIENTAS (hardcoded)
  // ────────────────────────────────────────────────────────────
  const herramientas = [
    {
      slug: 'comparador-ciudades',
      nombre: 'Comparador de Ciudades',
      descripcion: 'Compara Zúrich, Ginebra, Basilea, Berna, Lausana y Lugano en salarios, alquileres y coste de vida.',
      keywords: ['comparar ciudades', 'zurich ginebra', 'coste vida', 'salarios suiza'],
    },
    {
      slug: 'salario-neto',
      nombre: 'Calculadora de Salario Neto',
      descripcion: 'Calcula tu salario neto en Suiza después de impuestos y deducciones según tu cantón.',
      keywords: ['salario neto', 'impuestos suiza', 'calculadora salario', 'neto bruto'],
    },
    {
      slug: 'seguros-medicos',
      nombre: 'Comparador de Seguros Médicos',
      descripcion: 'Compara precios de seguros médicos obligatorios (KVG/LAMal) por cantón, edad y franquicia.',
      keywords: ['seguro medico', 'kvg', 'lamal', 'franquicia', 'seguro salud'],
    },
    {
      slug: 'generador-cv',
      nombre: 'Generador de CV Suizo',
      descripcion: 'Adapta tu CV español al formato suizo con nuestro generador automático.',
      keywords: ['cv suizo', 'curriculum', 'cv formato suiza', 'lebenslauf'],
    },
    {
      slug: 'comparador-salarios',
      nombre: 'Comparador de Salarios',
      descripcion: 'Compara salarios por sector y ciudad en Suiza para hispanohablantes.',
      keywords: ['comparar salarios', 'salario sector', 'cuanto ganan suiza'],
    },
    {
      slug: 'permiso-trabajo',
      nombre: 'Guía de Permisos de Trabajo',
      descripcion: 'Información sobre permisos L, B, C y G según tu nacionalidad y situación.',
      keywords: ['permiso trabajo', 'permiso b', 'permiso c', 'permiso l'],
    },
    {
      slug: 'impuesto-fuente',
      nombre: 'Calculadora de Impuesto de Fuente',
      descripcion: 'Calcula la retención en origen (Quellensteuer) según tu cantón y salario.',
      keywords: ['impuesto fuente', 'quellensteuer', 'retención origen'],
    },
  ];

  console.log(`  🔧 Indexando ${herramientas.length} herramientas...`);
  herramientas.forEach(h => {
    index.push({
      id: `herramienta-${h.slug}`,
      type: 'herramienta',
      titulo: h.nombre,
      descripcion: h.descripcion,
      url: `/herramientas/${h.slug}`,
      keywords: h.keywords,
      relevancia: 6,
    });
  });

  // ────────────────────────────────────────────────────────────
  // 6. RECURSOS (hardcoded)
  // ────────────────────────────────────────────────────────────
  const recursos = [
    {
      slug: 'checklist-emigrar',
      nombre: 'Checklist para Emigrar a Suiza',
      descripcion: 'Checklist completa con 50 pasos para emigrar a Suiza sin olvidar nada.',
      keywords: ['checklist emigrar', 'pasos emigrar', 'mudarse suiza'],
    },
    {
      slug: 'guia-salarios',
      nombre: 'Guía de Salarios por Sector',
      descripcion: 'Guía completa de salarios reales en Suiza por sector y experiencia.',
      keywords: ['salarios suiza', 'cuanto se gana', 'salarios por sector'],
    },
    {
      slug: 'primer-mes',
      nombre: 'Guía del Primer Mes en Suiza',
      descripcion: 'Todo lo que debes hacer en tu primer mes: empadronamiento, seguros, banco.',
      keywords: ['primer mes suiza', 'primeros pasos', 'recien llegado'],
    },
  ];

  console.log(`  📋 Indexando ${recursos.length} recursos...`);
  recursos.forEach(r => {
    index.push({
      id: `recurso-${r.slug}`,
      type: 'recurso',
      titulo: r.nombre,
      descripcion: r.descripcion,
      url: `/recursos/${r.slug}`,
      keywords: r.keywords,
      relevancia: 7,
    });
  });

  // ────────────────────────────────────────────────────────────
  // 7. GUÍAS Y PÁGINAS IMPORTANTES (hardcoded)
  // ────────────────────────────────────────────────────────────
  const guias = [
    {
      titulo: 'Cobrar el RAV (Paro) en Suiza',
      descripcion: 'Guía completa sobre el sistema de desempleo suizo: requisitos, cuánto pagan y cómo solicitarlo.',
      url: '/blog/rav-paro-suiza',
      keywords: ['rav', 'paro', 'desempleo', 'subsidio desempleo', 'cobrar paro suiza'],
    },
    {
      titulo: 'Trabajar en Suiza',
      descripcion: 'Portal de empleo para hispanohablantes: buscador de trabajo, sectores, salarios y permisos.',
      url: '/trabajo',
      keywords: ['trabajar suiza', 'empleo suiza', 'trabajo hispanohablantes'],
    },
    {
      titulo: 'Vivienda en Suiza',
      descripcion: 'Busca pisos de alquiler en todos los portales suizos: Homegate, ImmoScout24, Comparis.',
      url: '/vivienda',
      keywords: ['alquiler suiza', 'buscar piso', 'vivienda', 'homegate'],
    },
    {
      titulo: 'Seguros en Suiza',
      descripcion: 'Todo sobre el seguro médico obligatorio y seguros complementarios en Suiza.',
      url: '/seguros',
      keywords: ['seguros suiza', 'seguro medico', 'kvg', 'lamal'],
    },
    {
      titulo: 'Trabajar en Estaciones de Esquí',
      descripcion: 'Cómo conseguir trabajo en temporada de esquí en Suiza: requisitos, salarios y mejores estaciones.',
      url: '/trabajo/esqui-suiza',
      keywords: ['trabajo esqui', 'temporada esqui', 'estaciones esqui suiza'],
    },
  ];

  console.log(`  📖 Indexando ${guias.length} guías...`);
  guias.forEach((g, i) => {
    index.push({
      id: `guia-${i}`,
      type: 'guia',
      titulo: g.titulo,
      descripcion: g.descripcion,
      url: g.url,
      keywords: g.keywords,
      relevancia: 8,
    });
  });

  // ────────────────────────────────────────────────────────────
  // GENERAR OUTPUT
  // ────────────────────────────────────────────────────────────
  const output = {
    version: new Date().toISOString().split('T')[0].replace(/-/g, ''),
    generatedAt: new Date().toISOString(),
    items: index,
  };

  const outputPath = path.join(__dirname, '../public/search-index.json');

  // Crear directorio public si no existe
  const publicDir = path.join(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');

  console.log(`\n✅ Índice de búsqueda generado exitosamente`);
  console.log(`   📊 Total de items: ${index.length}`);
  console.log(`   📁 Ubicación: /public/search-index.json`);
  console.log(`   💾 Tamaño: ${(fs.statSync(outputPath).size / 1024).toFixed(2)} KB\n`);
}

// Ejecutar
generateSearchIndex().catch(err => {
  console.error('❌ Error generando índice de búsqueda:', err);
  process.exit(1);
});
