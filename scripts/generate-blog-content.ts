/**
 * Generador automático de contenido para blog
 * Usa Claude API para generar artículos de alta calidad
 *
 * Requisitos:
 * - ANTHROPIC_API_KEY en .env
 *
 * Uso:
 * - npm run blog:generate -- --topic "salarios" --count 3
 */

import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'fs';
import * as path from 'path';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

interface BlogPost {
  title: string;
  slug: string;
  description: string;
  content: string;
  keywords: string[];
  category: string;
  createdAt: string;
  author: string;
}

// Tópicos predefinidos
const TOPICS = {
  salarios: {
    keywords: ['salarios', 'sueldos', 'remuneración', 'trabajo'],
    category: 'Trabajo',
  },
  vivienda: {
    keywords: ['alquiler', 'vivienda', 'apartamento', 'piso'],
    category: 'Vivienda',
  },
  impuestos: {
    keywords: ['impuestos', 'fiscalidad', 'quellensteuer', 'deduciones'],
    category: 'Finanzas',
  },
  ciudades: {
    keywords: ['ciudades', 'zurich', 'ginebra', 'basilea', 'berna'],
    category: 'Ciudades',
  },
  salud: {
    keywords: ['seguro médico', 'salud', 'helsana', 'swica'],
    category: 'Salud',
  },
  idiomas: {
    keywords: ['alemán', 'francés', 'italiano', 'idiomas'],
    category: 'Idiomas',
  },
  permisos: {
    keywords: ['permisos', 'visa', 'permiso B', 'permiso C', 'residencia'],
    category: 'Trámites',
  },
};

/**
 * Genera un artículo de blog usando Claude
 */
async function generateArticle(topic: keyof typeof TOPICS): Promise<BlogPost> {
  const topicInfo = TOPICS[topic];

  const prompt = `Eres un experto en emigración a Suiza y escribes para HispanosEnSuiza, un blog para hispanohablantes.

Escribe un artículo completo y detallado sobre: ${topic} en Suiza

Requisitos:
- Título atractivo y SEO-friendly (máximo 60 caracteres)
- Descripción meta (máximo 160 caracteres)
- Artículo completo de 1500-2000 palabras
- Tono cercano pero profesional
- Información práctica y actualizada (2026)
- Incluir datos concretos, números, ejemplos
- Formato Markdown con encabezados (##, ###)
- Incluir secciones: introducción, desarrollo, consejos prácticos, conclusión
- Lenguaje dirigido a hispanohablantes (español, latinoamericanos)
- Evitar clickbait, ser honesto y útil
- Incluir llamadas a acción a herramientas de hispanosensuiza.ch cuando sea relevante

Responde en este formato JSON:
{
  "title": "título del artículo",
  "description": "descripción meta",
  "content": "contenido completo en markdown",
  "keywords": ["keyword1", "keyword2", "keyword3"]
}`;

  const response = await anthropic.messages.create({
    model: 'claude-opus-4-5-20251101',
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const textContent = response.content.find((c) => c.type === 'text');
  if (!textContent || textContent.type !== 'text') {
    throw new Error('No text content in response');
  }

  // Extraer JSON del response (puede venir con markdown code blocks)
  let jsonText = textContent.text;
  const jsonMatch = jsonText.match(/```json\n?([\s\S]*?)\n?```/);
  if (jsonMatch) {
    jsonText = jsonMatch[1];
  }

  const data = JSON.parse(jsonText);

  // Generar slug
  const slug = data.title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return {
    title: data.title,
    slug,
    description: data.description,
    content: data.content,
    keywords: [...data.keywords, ...topicInfo.keywords],
    category: topicInfo.category,
    createdAt: new Date().toISOString(),
    author: 'HispanosEnSuiza',
  };
}

/**
 * Genera un archivo MDX para el blog post
 */
function generateMDXFile(post: BlogPost): string {
  return `---
title: "${post.title}"
description: "${post.description}"
publishedAt: "${post.createdAt.split('T')[0]}"
author: "${post.author}"
category: "${post.category}"
keywords: ${JSON.stringify(post.keywords)}
---

${post.content}
`;
}

/**
 * Guarda el post en el directorio de blog
 */
function savePost(post: BlogPost) {
  const blogDir = path.join(process.cwd(), 'src', 'app', 'blog', '(posts)');

  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
  }

  const postDir = path.join(blogDir, post.slug);

  if (!fs.existsSync(postDir)) {
    fs.mkdirSync(postDir, { recursive: true });
  }

  const filePath = path.join(postDir, 'page.mdx');
  const content = generateMDXFile(post);

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ Post guardado: ${filePath}`);
}

/**
 * Guarda metadata del post en JSON
 */
function savePostMetadata(post: BlogPost) {
  const metadataDir = path.join(process.cwd(), 'scripts', 'generated-posts');

  if (!fs.existsSync(metadataDir)) {
    fs.mkdirSync(metadataDir, { recursive: true });
  }

  const filePath = path.join(
    metadataDir,
    `${post.slug}-${Date.now()}.json`
  );
  fs.writeFileSync(filePath, JSON.stringify(post, null, 2), 'utf-8');
  console.log(`📝 Metadata guardada: ${filePath}`);
}

// CLI
async function main() {
  const args = process.argv.slice(2);

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('❌ ANTHROPIC_API_KEY no configurado');
    process.exit(1);
  }

  // Parsear argumentos
  const topicIndex = args.indexOf('--topic');
  const countIndex = args.indexOf('--count');

  const topic = topicIndex !== -1 ? args[topicIndex + 1] : 'salarios';
  const count = countIndex !== -1 ? parseInt(args[countIndex + 1]) : 1;

  if (!TOPICS[topic as keyof typeof TOPICS]) {
    console.error(`❌ Tópico inválido: ${topic}`);
    console.log('Tópicos disponibles:', Object.keys(TOPICS).join(', '));
    process.exit(1);
  }

  console.log(`📝 Generando ${count} artículo(s) sobre: ${topic}`);

  for (let i = 0; i < count; i++) {
    console.log(`\n🔄 Generando artículo ${i + 1}/${count}...`);

    try {
      const post = await generateArticle(topic as keyof typeof TOPICS);
      console.log(`✅ Título: "${post.title}"`);
      console.log(`📄 Slug: ${post.slug}`);

      // Guardar post
      savePost(post);
      savePostMetadata(post);

      console.log('✅ Post generado correctamente\n');

      // Delay para evitar rate limiting
      if (i < count - 1) {
        console.log('⏳ Esperando 5 segundos...');
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    } catch (error) {
      console.error('❌ Error generando artículo:', error);
    }
  }

  console.log('\n🎉 ¡Proceso completado!');
}

main();
