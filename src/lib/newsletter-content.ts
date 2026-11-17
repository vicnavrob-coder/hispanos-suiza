/**
 * Content aggregator for weekly newsletter
 * Fetches top jobs, latest stories, blog posts, and featured tools
 */

import { getHistorias, type HistoriaComunidad } from "./historias-comunidad";
import { postsAuto } from "./posts-auto";
import { posts } from "./posts";
import type { Post } from "./posts";

const SITE = "https://hispanosensuiza.ch";

// ─────────────────────────────────────────────────────────────
// JOBS
// ─────────────────────────────────────────────────────────────

export interface JobItem {
  title: string;
  titleEs?: string;
  company: string;
  location: string;
  url: string;
  salary?: string;
  contractType?: string;
  workload?: string;
}

/**
 * Get top N recent jobs from major Swiss cities
 * Prioritizes jobs with salary info and Spanish-friendly locations
 */
export async function getTopJobs(limit = 3): Promise<JobItem[]> {
  try {
    // Fetch from internal API
    const res = await fetch(`${SITE}/api/jobs?limit=50`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("[newsletter-content] Jobs API failed:", res.status);
      return [];
    }

    const data = await res.json();
    const allJobs = data.jobs ?? [];

    // Filter and prioritize
    const prioritized = allJobs
      .filter((job: any) => {
        // Must have basic fields
        if (!job.title || !job.company || !job.location) return false;

        // Prefer jobs with salary
        if (job.salary) return true;

        // Prefer major cities where hispanohablantes are
        const majorCities = ["Zürich", "Zurich", "Genève", "Geneva", "Basel", "Bern", "Lausanne"];
        return majorCities.some(city => job.location.includes(city));
      })
      .slice(0, limit)
      .map((job: any) => ({
        title: job.titleEs || job.title,
        titleEs: job.titleEs,
        company: job.company,
        location: job.location,
        url: job.url,
        salary: job.salary,
        contractType: job.contractType,
        workload: job.workload,
      }));

    return prioritized.length > 0 ? prioritized : allJobs.slice(0, limit).map((job: any) => ({
      title: job.titleEs || job.title,
      titleEs: job.titleEs,
      company: job.company,
      location: job.location,
      url: job.url,
      salary: job.salary,
      contractType: job.contractType,
      workload: job.workload,
    }));
  } catch (e) {
    console.error("[newsletter-content] Error fetching jobs:", e);
    return [];
  }
}

// ─────────────────────────────────────────────────────────────
// COMMUNITY STORIES
// ─────────────────────────────────────────────────────────────

/**
 * Get latest published community story
 */
export async function getLatestStory(): Promise<HistoriaComunidad | null> {
  try {
    const historias = await getHistorias();
    if (!historias || historias.length === 0) return null;

    // Sort by publishedAt descending (most recent first)
    const sorted = [...historias].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    return sorted[0];
  } catch (e) {
    console.error("[newsletter-content] Error fetching stories:", e);
    return null;
  }
}

// ─────────────────────────────────────────────────────────────
// BLOG POSTS
// ─────────────────────────────────────────────────────────────

/**
 * Get latest blog post (auto + manual combined)
 */
export function getLatestBlogPost(): Post | null {
  try {
    const allPosts = [...postsAuto, ...posts];

    if (allPosts.length === 0) return null;

    // Sort by fecha descending
    const sorted = [...allPosts].sort(
      (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
    );

    return sorted[0];
  } catch (e) {
    console.error("[newsletter-content] Error fetching blog posts:", e);
    return null;
  }
}

// ─────────────────────────────────────────────────────────────
// TOOLS
// ─────────────────────────────────────────────────────────────

export interface FeaturedTool {
  name: string;
  description: string;
  icon: string;
  url: string;
  cta: string;
}

const TOOLS: FeaturedTool[] = [
  {
    name: "Calculadora de Salario Neto",
    description: "Calcula tu salario neto en Suiza después de impuestos, seguros y cotizaciones. Actualizada 2026 para los 26 cantones.",
    icon: "🧮",
    url: `${SITE}/herramientas/salario-neto`,
    cta: "Calcular mi salario →",
  },
  {
    name: "Generador de CV Suizo",
    description: "Traduce tu CV al formato estándar suizo (Lebenslauf). Optimizado para ATS con estructura profesional en alemán.",
    icon: "📝",
    url: `${SITE}/herramientas/cv-suizo`,
    cta: "Generar mi CV →",
  },
  {
    name: "Comparador de Ciudades",
    description: "Compara coste de vida, salarios, impuestos y calidad de vida entre las principales ciudades suizas.",
    icon: "⚖️",
    url: `${SITE}/herramientas/comparador-ciudades`,
    cta: "Comparar ciudades →",
  },
  {
    name: "Calculadora Impuesto Fuente",
    description: "Si tienes permiso B o L, calcula cuánto te retienen con el Quellensteuer (impuesto en origen) según tu cantón.",
    icon: "💰",
    url: `${SITE}/herramientas/impuesto-fuente`,
    cta: "Calcular impuesto →",
  },
];

/**
 * Get featured tool based on week number (rotates every 4 weeks)
 */
export function getFeaturedTool(weekNumber: number): FeaturedTool {
  const index = (weekNumber - 1) % TOOLS.length;
  return TOOLS[index];
}

/**
 * Get week number of the year (ISO 8601)
 */
export function getWeekNumber(date = new Date()): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

// ─────────────────────────────────────────────────────────────
// FEATURED CONTENT SELECTION
// ─────────────────────────────────────────────────────────────

export type FeaturedType = "job" | "story" | "blog" | "tool";

/**
 * Determine what should be featured this week (rotates every 4 weeks)
 */
export function getFeaturedType(weekNumber: number): FeaturedType {
  const types: FeaturedType[] = ["job", "story", "blog", "tool"];
  const index = (weekNumber - 1) % types.length;
  return types[index];
}

// ─────────────────────────────────────────────────────────────
// AGGREGATOR
// ─────────────────────────────────────────────────────────────

export interface NewsletterContent {
  weekNumber: number;
  featuredType: FeaturedType;
  jobs: JobItem[];
  story: HistoriaComunidad | null;
  blogPost: Post | null;
  tool: FeaturedTool;
}

/**
 * Aggregate all content for the weekly newsletter
 */
export async function aggregateNewsletterContent(): Promise<NewsletterContent> {
  const weekNumber = getWeekNumber();
  const featuredType = getFeaturedType(weekNumber);

  const [jobs, story] = await Promise.all([
    getTopJobs(3),
    getLatestStory(),
  ]);

  const blogPost = getLatestBlogPost();
  const tool = getFeaturedTool(weekNumber);

  return {
    weekNumber,
    featuredType,
    jobs,
    story,
    blogPost,
    tool,
  };
}
