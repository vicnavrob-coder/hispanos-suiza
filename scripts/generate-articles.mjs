/**
 * generate-articles.mjs
 * Genera automáticamente artículos SEO para HispanosEnSuiza usando la API de Anthropic.
 * Se ejecuta semanalmente via GitHub Actions.
 *
 * Uso: node scripts/generate-articles.mjs [--count N] [--dry-run]
 */

import Anthropic from "@anthropic-ai/sdk";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// ── Config ───────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const COUNT = parseInt(args.find(a => a.startsWith("--count="))?.split("=")[1] ?? "2", 10);

const POSTS_AUTO_FILE = resolve(ROOT, "src/lib/posts-auto.ts");
const QUEUE_FILE = resolve(ROOT, "scripts/topics-queue.json");
const DONE_FILE = resolve(ROOT, "scripts/topics-done.json");

// ── Helpers ──────────────────────────────────────────────────────────────────
function loadJson(path, fallback = []) {
  try { return JSON.parse(readFileSync(path, "utf8")); }
  catch { return fallback; }
}

function escapeTemplate(str) {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${");
}

// ── Cargar estado ────────────────────────────────────────────────────────────
const queue = loadJson(QUEUE_FILE);
const done = loadJson(DONE_FILE);
const doneSet = new Set(done.map(d => d.slug));

// Posts ya publicados en posts.ts y posts-auto.ts
const existingContent = existsSync(resolve(ROOT, "src/lib/posts.ts"))
  ? readFileSync(resolve(ROOT, "src/lib/posts.ts"), "utf8")
  : "";
const existingAuto = existsSync(POSTS_AUTO_FILE)
  ? readFileSync(POSTS_AUTO_FILE, "utf8")
  : "";

// Filtrar temas pendientes (no generados aún)
const pending = queue
  .filter(t => !doneSet.has(t.slug))
  .filter(t => !existingContent.includes(`slug: "${t.slug}"`))
  .filter(t => !existingAuto.includes(`slug: "${t.slug}"`))
  .sort((a, b) => a.prioridad - b.prioridad)
  .slice(0, COUNT);

if (pending.length === 0) {
  console.log("✅ No hay temas pendientes en la cola. Nada que generar.");
  process.exit(0);
}

console.log(`📝 Generando ${pending.length} artículo(s): ${pending.map(t => t.slug).join(", ")}`);

if (DRY_RUN) {
  console.log("🧪 Dry run — no se escribe nada.");
  process.exit(0);
}

// ── Anthropic client ─────────────────────────────────────────────────────────
const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN,
});

// ── Prompt de generación ─────────────────────────────────────────────────────
function buildPrompt(topic) {
  return `Eres el redactor SEO de HispanosEnSuiza (hispanosensuiza.ch), el sitio de referencia en español sobre vivir, trabajar y emigrar a Suiza.

Escribe un artículo SEO completo para el siguiente tema:

SLUG: ${topic.slug}
TÍTULO: ${topic.titulo}
DESCRIPCIÓN: ${topic.descripcion}
CATEGORÍA: ${topic.categoria}
PALABRAS CLAVE: ${topic.palabrasClave.join(", ")}

REQUISITOS DEL ARTÍCULO:
- Contenido en HTML (solo el body, sin <html>/<body>/<head>)
- Usa <h2> para secciones principales, <h3> para subsecciones
- Mínimo 1.500 palabras de contenido real y útil
- Datos específicos y actualizados de Suiza en 2026 (CHF, cantones, leyes, empresas reales)
- Tono cercano y práctico, como si lo escribiera alguien que vive en Suiza
- Incluye al menos 1 blockquote con testimonio real de un hispanohablante
- Al menos una lista <ul> o <ol> con datos concretos
- Al menos 1 enlace interno a herramientas del sitio usando estos slugs exactos:
  * /herramientas/salario-neto (calculadora de salario neto suizo)
  * /herramientas/comparador-ciudades (comparador de ciudades suizas)
  * /trabajo/buscador (buscador de trabajo en Suiza)
  * /seguros (herramienta de seguros médicos)
- Termina con una llamada a la acción sutil hacia una de las herramientas
- NO uses el dominio hispanosensuiza.ch en los enlaces, usa rutas relativas

FORMATO DE RESPUESTA:
Responde ÚNICAMENTE con un objeto JSON válido con esta estructura exacta:
{
  "contenido": "<h2>...</h2>...",
  "tiempoLectura": 8,
  "faq": [
    {"pregunta": "...", "respuesta": "..."},
    {"pregunta": "...", "respuesta": "..."},
    {"pregunta": "...", "respuesta": "..."}
  ]
}

El campo "contenido" debe ser HTML válido en una sola línea (sin saltos de línea literales, usa \\n si necesitas).
El campo "tiempoLectura" es un número entero (minutos).
El campo "faq" debe tener entre 3 y 5 preguntas frecuentes sobre el tema.`;
}

// ── Generar artículos ─────────────────────────────────────────────────────────
const newPosts = [];
const newDone = [...done];

for (const topic of pending) {
  console.log(`\n🔄 Generando: ${topic.titulo}`);

  try {
    const message = await client.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 4096,
      messages: [{ role: "user", content: buildPrompt(topic) }],
    });

    const raw = message.content[0].text.trim();

    // Extraer JSON de la respuesta
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No se encontró JSON en la respuesta");

    const generated = JSON.parse(jsonMatch[0]);

    const post = {
      slug: topic.slug,
      titulo: topic.titulo,
      descripcion: topic.descripcion,
      categoria: topic.categoria,
      fecha: new Date().toISOString().split("T")[0],
      tiempoLectura: generated.tiempoLectura || 8,
      imagen: `/images/${topic.slug.split("-")[1] || "suiza"}.jpg`,
      destacado: false,
      palabrasClave: topic.palabrasClave,
      faq: generated.faq || [],
      contenido: generated.contenido,
    };

    newPosts.push(post);
    newDone.push({ slug: topic.slug, fecha: post.fecha });
    console.log(`  ✅ Generado (${generated.tiempoLectura} min, ${generated.faq?.length || 0} FAQs)`);

  } catch (err) {
    console.error(`  ❌ Error generando ${topic.slug}:`, err.message);
  }
}

if (newPosts.length === 0) {
  console.log("⚠️ No se generó ningún artículo.");
  process.exit(1);
}

// ── Cargar posts auto existentes ─────────────────────────────────────────────
let existingPosts = [];
if (existsSync(POSTS_AUTO_FILE)) {
  // Extraer posts del archivo existente (simple: parseamos entre los arrays)
  try {
    const match = existingAuto.match(/export const postsAuto: Post\[\] = \[([\s\S]*)\];/);
    if (match) {
      // Los posts están como objetos TS — no podemos parsearlos fácilmente.
      // En su lugar, siempre escribimos el archivo completo con todos los posts.
      // Extraemos los slugs ya presentes para no duplicar.
      const slugMatches = [...existingAuto.matchAll(/slug: "([^"]+)"/g)];
      const existingSlugs = new Set(slugMatches.map(m => m[1]));
      // Los posts del archivo existente los preservamos tal cual en el archivo
    }
  } catch {}
}

// ── Escribir posts-auto.ts ───────────────────────────────────────────────────
// Leer el archivo existente para preservar posts anteriores
let previousContent = "";
if (existsSync(POSTS_AUTO_FILE)) {
  const existing = readFileSync(POSTS_AUTO_FILE, "utf8");
  // Extraer el bloque de posts existentes
  const endMarker = "\n];\n";
  const lastEnd = existing.lastIndexOf(endMarker);
  if (lastEnd > -1) {
    previousContent = existing.substring(0, lastEnd);
  }
}

// Construir entradas para nuevos posts
function postToTs(post) {
  const faqStr = post.faq.map(f =>
    `    { pregunta: ${JSON.stringify(f.pregunta)}, respuesta: ${JSON.stringify(f.respuesta)} }`
  ).join(",\n");

  const kwStr = post.palabrasClave.map(k => JSON.stringify(k)).join(", ");

  return `  {
    slug: ${JSON.stringify(post.slug)},
    titulo: ${JSON.stringify(post.titulo)},
    descripcion: ${JSON.stringify(post.descripcion)},
    categoria: ${JSON.stringify(post.categoria)},
    fecha: ${JSON.stringify(post.fecha)},
    tiempoLectura: ${post.tiempoLectura},
    imagen: ${JSON.stringify(post.imagen)},
    destacado: false,
    palabrasClave: [${kwStr}],
    faq: [
${faqStr}
    ],
    contenido: ${JSON.stringify(post.contenido)},
  }`;
}

let fileContent;
if (previousContent) {
  // Añadir nuevos posts al final del array existente
  fileContent = previousContent +
    ",\n\n  // ── AUTO-GENERADO " + new Date().toISOString().split("T")[0] + " ──\n" +
    newPosts.map(postToTs).join(",\n\n") +
    "\n];\n";
} else {
  // Crear archivo desde cero
  fileContent = `// ⚠️ ARCHIVO AUTO-GENERADO — No editar manualmente
// Generado por scripts/generate-articles.mjs
// Última actualización: ${new Date().toISOString().split("T")[0]}

import type { Post } from "./posts";

export const postsAuto: Post[] = [
  // ── AUTO-GENERADO ${new Date().toISOString().split("T")[0]} ──
${newPosts.map(postToTs).join(",\n\n")}
];\n`;
}

writeFileSync(POSTS_AUTO_FILE, fileContent, "utf8");
console.log(`\n✅ Escrito: src/lib/posts-auto.ts (${newPosts.length} artículos nuevos)`);

// ── Actualizar topics-done.json ───────────────────────────────────────────────
writeFileSync(DONE_FILE, JSON.stringify(newDone, null, 2), "utf8");
console.log(`✅ Actualizado: scripts/topics-done.json`);

// ── Enviar a IndexNow (Bing / DuckDuckGo / Yahoo) ─────────────────────────────
const INDEXNOW_KEY = "93e450c5f126c54d558cb653f05991e6";
const BASE_URL = "https://hispanosensuiza.ch";
const newUrls = newPosts.map(p => `${BASE_URL}/blog/${p.slug}`);

try {
  const resp = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: "hispanosensuiza.ch",
      key: INDEXNOW_KEY,
      keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: newUrls,
    }),
  });
  console.log(`\n🔍 IndexNow: ${resp.status} — ${newUrls.join(", ")}`);
} catch (e) {
  console.warn("  ⚠️ IndexNow falló:", e.message);
}

// ── Resumen ───────────────────────────────────────────────────────────────────
console.log(`\n📊 Resumen:`);
console.log(`  Artículos generados: ${newPosts.length}`);
console.log(`  Slugs: ${newPosts.map(p => p.slug).join(", ")}`);
console.log(`  Temas restantes en cola: ${queue.length - newDone.length}`);
