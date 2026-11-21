/**
 * Automated Social Media Publishing
 * Genera y programa posts automáticamente para Instagram, Facebook y LinkedIn
 *
 * Requisitos:
 * - Buffer account (free o paid)
 * - Variables de entorno: BUFFER_ACCESS_TOKEN, BUFFER_PROFILE_IDS
 *
 * Uso:
 * - npm run social:generate -- --count 10  # Genera 10 posts
 * - npm run social:publish                  # Publica posts pendientes a Buffer
 */

import * as fs from 'fs';
import * as path from 'path';

// Tipos
interface SocialPost {
  platform: 'instagram' | 'facebook' | 'linkedin';
  content: string;
  link?: string;
  imageUrl?: string;
  scheduledFor?: string;
  hashtags: string[];
  status: 'draft' | 'scheduled' | 'published';
  createdAt: string;
  publishedAt?: string;
}

// Buffer API config
const BUFFER_API_URL = 'https://api.bufferapp.com/1';
const BUFFER_ACCESS_TOKEN = process.env.BUFFER_ACCESS_TOKEN || '';

// Profile IDs (obtener de Buffer > Settings > API)
const BUFFER_PROFILES = {
  instagram: process.env.BUFFER_INSTAGRAM_ID || '',
  facebook: process.env.BUFFER_FACEBOOK_ID || '',
  linkedin: process.env.BUFFER_LINKEDIN_ID || '',
};

// Plantillas de contenido
const POST_TEMPLATES = [
  {
    type: 'salary_calculator',
    content: `¿Cuánto ganas REALMENTE en Suiza?

Un salario de {amount} CHF brutos NO es lo que recibes en tu cuenta. Después de:

✅ Impuestos ({tax}%)
✅ AVS/Seguridad Social ({avs}%)
✅ Seguro de desempleo
✅ Pensiones obligatorias
✅ Seguro médico ({insurance} CHF/mes)

Te quedan aproximadamente {net} CHF netos.

🧮 Usa nuestra calculadora GRATIS para saber tu salario real:
👉 Link en bio

#HispanosSuiza #TrabajarEnSuiza #SalariosSuiza #VivirEnSuiza #EmigraraSwiss`,
    variables: ['amount', 'tax', 'avs', 'insurance', 'net'],
    link: 'https://hispanosensuiza.ch/herramientas/salario-neto',
  },
  {
    type: 'city_comparison',
    content: `{city1} vs {city2} — ¿Dónde vivir en Suiza?

{city1}:
{emoji1} Alquiler: {rent1} CHF/mes (2 hab)
{emoji1} Salario medio: {salary1} CHF/año
{emoji1} Idioma: {language1}

{city2}:
{emoji2} Alquiler: {rent2} CHF/mes (2 hab)
{emoji2} Salario medio: {salary2} CHF/año
{emoji2} Idioma: {language2}

📊 Compara todas las ciudades de Suiza con datos reales 2026:
👉 Link en bio

#SuizaCiudades #VivirEnSuiza #Zurich #Geneva #Basel`,
    variables: ['city1', 'city2', 'emoji1', 'emoji2', 'rent1', 'rent2', 'salary1', 'salary2', 'language1', 'language2'],
    link: 'https://hispanosensuiza.ch/herramientas/comparador-ciudades',
  },
  {
    type: 'cost_of_living',
    content: `💰 El VERDADERO coste de vida en Suiza (2026)

Estos son los gastos REALES mensuales para 1 persona en {city}:

🏠 Alquiler (1 hab centro): {rent} CHF
🛒 Supermercado: {food} CHF
🏥 Seguro médico: {insurance} CHF
🚉 Transporte: {transport} CHF
📱 Internet + móvil: {telecom} CHF
💪 Gym: {gym} CHF

TOTAL: {total} CHF/mes

¿Sorprendido? Los salarios también son proporcionales 💪

👉 Calcula tu presupuesto en nuestro comparador (link en bio)

#CosteDeVida #SuizaRealidades #VivirEnSuiza`,
    variables: ['city', 'rent', 'food', 'insurance', 'transport', 'telecom', 'gym', 'total'],
    link: 'https://hispanosensuiza.ch/herramientas/comparador-ciudades',
  },
  {
    type: 'cv_tips',
    content: `❌ Los 3 errores MÁS COMUNES en un CV suizo:

1️⃣ FOTO: En Suiza SÍ se pone foto (profesional, fondo neutro)

2️⃣ FORMATO: El formato español/latino NO funciona aquí
   → Necesitas: Lebenslauf (DE), CV (FR), Curriculum Vitae (IT)

3️⃣ IDIOMAS: Debes especificar nivel exacto (A1-C2)
   → "Inglés fluido" = ❌
   → "Inglés C1 certificado" = ✅

🎁 Genera tu CV suizo GRATIS en 5 minutos:
👉 Link en bio

#CVSuizo #TrabajarEnSuiza #EmpleoSuiza`,
    variables: [],
    link: 'https://hispanosensuiza.ch/herramientas/generador-cv',
  },
  {
    type: 'permits',
    content: `🇨🇭 ¿Qué permiso de trabajo necesitas para Suiza?

Permiso L → Corta duración (<1 año)
Permiso B → Residencia temporal (5 años)
Permiso C → Residencia permanente (después de 5-10 años)
Permiso G → Fronterizo (vives fuera, trabajas en Suiza)

¿Eres español/UE?
✅ Tienes ventaja: libre circulación
✅ Proceso más simple
✅ Mismo acceso al mercado laboral

¿Eres latinoamericano?
⚠️ Necesitas oferta de trabajo confirmada
⚠️ Empresa debe demostrar que no hay candidato local
⚠️ Cuota anual limitada

👉 Guía completa de permisos en nuestra web (link bio)

#PermisosTrabajoSuiza #VivirEnSuiza #InmigracionSuiza`,
    variables: [],
    link: 'https://hispanosensuiza.ch/herramientas/permiso-trabajo',
  },
];

// Datos para rellenar templates
const TEMPLATE_DATA = {
  cities: [
    { name: 'Zúrich', rent: 1800, salary: 95000, language: 'Alemán', emoji: '🏔️' },
    { name: 'Ginebra', rent: 1950, salary: 92000, language: 'Francés', emoji: '🌊' },
    { name: 'Basilea', rent: 1600, salary: 88000, language: 'Alemán', emoji: '🎨' },
    { name: 'Berna', rent: 1500, salary: 85000, language: 'Alemán', emoji: '🐻' },
    { name: 'Lausana', rent: 1700, salary: 86000, language: 'Francés', emoji: '🎓' },
  ],
  salaries: [
    { amount: 80000, tax: 12, avs: 5.3, insurance: 420, net: 5300 },
    { amount: 100000, tax: 15, avs: 5.3, insurance: 450, net: 6500 },
    { amount: 120000, tax: 18, avs: 5.3, insurance: 500, net: 7700 },
  ],
  costs: {
    'Zúrich': { rent: 1800, food: 600, insurance: 450, transport: 85, telecom: 80, gym: 90, total: 3105 },
    'Ginebra': { rent: 1950, food: 650, insurance: 480, transport: 70, telecom: 75, gym: 95, total: 3320 },
    'Berna': { rent: 1500, food: 550, insurance: 400, transport: 90, telecom: 70, gym: 70, total: 2680 },
  },
};

/**
 * Genera posts automáticamente usando los templates
 */
function generatePosts(count: number = 10): SocialPost[] {
  const posts: SocialPost[] = [];

  for (let i = 0; i < count; i++) {
    const template = POST_TEMPLATES[i % POST_TEMPLATES.length];
    let content = template.content;

    // Rellenar variables según el tipo de template
    if (template.type === 'salary_calculator') {
      const salary = TEMPLATE_DATA.salaries[i % TEMPLATE_DATA.salaries.length];
      content = content
        .replace('{amount}', salary.amount.toString())
        .replace('{tax}', salary.tax.toString())
        .replace('{avs}', salary.avs.toString())
        .replace('{insurance}', salary.insurance.toString())
        .replace('{net}', salary.net.toString());
    } else if (template.type === 'city_comparison') {
      const city1 = TEMPLATE_DATA.cities[i % TEMPLATE_DATA.cities.length];
      const city2 = TEMPLATE_DATA.cities[(i + 1) % TEMPLATE_DATA.cities.length];
      content = content
        .replace('{city1}', city1.name)
        .replace('{city2}', city2.name)
        .replace(/{emoji1}/g, city1.emoji)
        .replace(/{emoji2}/g, city2.emoji)
        .replace('{rent1}', city1.rent.toString())
        .replace('{rent2}', city2.rent.toString())
        .replace('{salary1}', city1.salary.toString())
        .replace('{salary2}', city2.salary.toString())
        .replace('{language1}', city1.language)
        .replace('{language2}', city2.language);
    } else if (template.type === 'cost_of_living') {
      const cityName = Object.keys(TEMPLATE_DATA.costs)[i % Object.keys(TEMPLATE_DATA.costs).length];
      const costs = TEMPLATE_DATA.costs[cityName as keyof typeof TEMPLATE_DATA.costs];
      content = content
        .replace('{city}', cityName)
        .replace('{rent}', costs.rent.toString())
        .replace('{food}', costs.food.toString())
        .replace('{insurance}', costs.insurance.toString())
        .replace('{transport}', costs.transport.toString())
        .replace('{telecom}', costs.telecom.toString())
        .replace('{gym}', costs.gym.toString())
        .replace('{total}', costs.total.toString());
    }

    // Extraer hashtags
    const hashtags = content.match(/#\w+/g) || [];

    posts.push({
      platform: 'instagram', // Cambiar según necesidades
      content,
      link: template.link,
      hashtags,
      status: 'draft',
      createdAt: new Date().toISOString(),
    });
  }

  return posts;
}

/**
 * Publica un post a Buffer
 */
async function publishToBuffer(post: SocialPost): Promise<boolean> {
  if (!BUFFER_ACCESS_TOKEN) {
    console.error('❌ BUFFER_ACCESS_TOKEN no configurado');
    return false;
  }

  const profileId = BUFFER_PROFILES[post.platform];
  if (!profileId) {
    console.error(`❌ No hay profile ID configurado para ${post.platform}`);
    return false;
  }

  try {
    const response = await fetch(`${BUFFER_API_URL}/updates/create.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token: BUFFER_ACCESS_TOKEN,
        profile_ids: [profileId],
        text: post.content,
        media: post.imageUrl ? { link: post.imageUrl } : undefined,
        scheduled_at: post.scheduledFor,
        shorten: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`Buffer API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`✅ Post programado en ${post.platform}: ${data.id}`);
    return true;
  } catch (error) {
    console.error(`❌ Error publicando en Buffer:`, error);
    return false;
  }
}

/**
 * Guarda posts en archivo JSON
 */
function savePosts(posts: SocialPost[], filename: string = 'social-posts.json') {
  const filePath = path.join(process.cwd(), 'scripts', filename);
  fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
  console.log(`✅ ${posts.length} posts guardados en ${filePath}`);
}

/**
 * Carga posts desde archivo JSON
 */
function loadPosts(filename: string = 'social-posts.json'): SocialPost[] {
  const filePath = path.join(process.cwd(), 'scripts', filename);
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

// CLI
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (command === 'generate') {
    const count = parseInt(args[2]) || 10;
    console.log(`📝 Generando ${count} posts...`);
    const posts = generatePosts(count);
    savePosts(posts);
    console.log('✅ Posts generados correctamente');
  } else if (command === 'publish') {
    console.log('📤 Publicando posts a Buffer...');
    const posts = loadPosts();
    const draftPosts = posts.filter(p => p.status === 'draft');

    if (draftPosts.length === 0) {
      console.log('ℹ️ No hay posts pendientes de publicar');
      return;
    }

    console.log(`📊 ${draftPosts.length} posts pendientes`);

    for (const post of draftPosts) {
      const success = await publishToBuffer(post);
      if (success) {
        post.status = 'scheduled';
        post.publishedAt = new Date().toISOString();
      }

      // Delay para evitar rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    savePosts(posts);
    console.log('✅ Publicación completada');
  } else {
    console.log(`
Uso:
  npm run social:generate -- --count 10  # Genera 10 posts
  npm run social:publish                  # Publica posts pendientes a Buffer

Variables de entorno requeridas:
  BUFFER_ACCESS_TOKEN
  BUFFER_INSTAGRAM_ID
  BUFFER_FACEBOOK_ID
  BUFFER_LINKEDIN_ID
    `);
  }
}

main();
