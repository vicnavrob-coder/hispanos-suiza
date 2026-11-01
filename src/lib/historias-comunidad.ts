/**
 * CRUD para historias de la comunidad
 * Almacenadas en GitHub Gist (archivo: historias-comunidad.json)
 */

const GIST_ID = process.env.GIST_ID ?? "7313e3a55b8f6b3c74d19427fb1f30a2";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? "";
const FILE_NAME = "historias-comunidad.json";

export interface HistoriaComunidad {
  id: string;
  slug: string;

  // Autor
  autorEmail: string;
  autorNombre: string;
  autorPais?: string;
  autorAvatar?: string;

  // Contenido
  titulo: string;
  contenido: string;

  // Metadata
  ciudadSuiza?: string;
  tema?: string;

  // Estado
  createdAt: string;
  publishedAt: string;

  // Redes sociales
  socialPosts?: {
    facebook?: { postId: string; url: string };
    instagram?: { postId: string; url: string };
  };

  // Engagement (fase futura)
  likes?: number;
  views?: number;
}

interface HistoriasData {
  historias: HistoriaComunidad[];
  stats: {
    total: number;
    lastUpdated: string;
  };
}

// ─────────────────────────────────────────────────────────────
// Lectura
// ─────────────────────────────────────────────────────────────

export async function getHistorias(): Promise<HistoriaComunidad[] | null> {
  if (!GITHUB_TOKEN) {
    console.error("[historias] No GITHUB_TOKEN");
    return null;
  }

  try {
    const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 300 }, // Cache por 5 minutos, permite static generation
    });

    if (!res.ok) {
      console.error("[historias] Gist fetch failed:", res.status);
      return null;
    }

    const gist = await res.json();
    const content = gist.files?.[FILE_NAME]?.content;

    if (!content) {
      // Archivo no existe aún, devolver array vacío (no null)
      return [];
    }

    const data = JSON.parse(content) as HistoriasData;
    return data.historias ?? [];
  } catch (e) {
    console.error("[historias] Error reading Gist:", e);
    return null;
  }
}

export async function getHistoriaBySlug(slug: string): Promise<HistoriaComunidad | null> {
  const historias = await getHistorias();
  if (!historias) return null;
  return historias.find((h) => h.slug === slug) ?? null;
}

export async function getHistoriasByAutor(email: string): Promise<HistoriaComunidad[]> {
  const historias = await getHistorias();
  if (!historias) return [];
  return historias.filter((h) => h.autorEmail.toLowerCase() === email.toLowerCase());
}

// ─────────────────────────────────────────────────────────────
// Escritura
// ─────────────────────────────────────────────────────────────

async function saveHistorias(historias: HistoriaComunidad[]): Promise<boolean> {
  if (!GITHUB_TOKEN) return false;

  const data: HistoriasData = {
    historias,
    stats: {
      total: historias.length,
      lastUpdated: new Date().toISOString(),
    },
  };

  try {
    const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      method: "PATCH",
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3+json",
      },
      body: JSON.stringify({
        files: {
          [FILE_NAME]: {
            content: JSON.stringify(data, null, 2),
          },
        },
      }),
    });

    return res.ok;
  } catch (e) {
    console.error("[historias] Error saving Gist:", e);
    return false;
  }
}

// ─────────────────────────────────────────────────────────────
// Crear historia
// ─────────────────────────────────────────────────────────────

function generateSlug(titulo: string, nombre: string): string {
  const base = `${nombre.split(" ")[0]}-${titulo}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quitar acentos
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);

  const suffix = Math.random().toString(36).slice(2, 6);
  return `${base}-${suffix}`;
}

function generateId(): string {
  const ts = Date.now();
  const rand = Math.random().toString(36).slice(2, 8);
  return `hc_${ts}_${rand}`;
}

export interface CreateHistoriaInput {
  autorEmail: string;
  autorNombre: string;
  autorPais?: string;
  autorAvatar?: string;
  titulo: string;
  contenido: string;
  ciudadSuiza?: string;
  tema?: string;
}

export interface CreateHistoriaResult {
  ok: boolean;
  historia?: HistoriaComunidad;
  error?: string;
}

export async function createHistoria(input: CreateHistoriaInput): Promise<CreateHistoriaResult> {
  // Validaciones
  if (!input.titulo?.trim() || input.titulo.length > 100) {
    return { ok: false, error: "Título requerido (máx 100 caracteres)" };
  }

  if (!input.contenido?.trim() || input.contenido.length < 200) {
    return { ok: false, error: "La historia debe tener al menos 200 caracteres" };
  }

  if (input.contenido.length > 5000) {
    return { ok: false, error: "La historia no puede superar 5000 caracteres" };
  }

  // Leer historias existentes
  const historias = await getHistorias();
  if (historias === null) {
    return { ok: false, error: "Error al acceder a la base de datos" };
  }

  // Verificar límite de spam (1 historia por usuario cada 24h)
  const ahora = new Date();
  const hace24h = new Date(ahora.getTime() - 24 * 60 * 60 * 1000);
  const historiaReciente = historias.find(
    (h) =>
      h.autorEmail.toLowerCase() === input.autorEmail.toLowerCase() &&
      new Date(h.createdAt) > hace24h
  );

  if (historiaReciente) {
    return { ok: false, error: "Solo puedes publicar una historia cada 24 horas" };
  }

  // Crear la historia
  const now = new Date().toISOString();
  const historia: HistoriaComunidad = {
    id: generateId(),
    slug: generateSlug(input.titulo, input.autorNombre),
    autorEmail: input.autorEmail,
    autorNombre: input.autorNombre,
    autorPais: input.autorPais,
    autorAvatar: input.autorAvatar,
    titulo: input.titulo.trim(),
    contenido: input.contenido.trim(),
    ciudadSuiza: input.ciudadSuiza,
    tema: input.tema,
    createdAt: now,
    publishedAt: now,
    likes: 0,
    views: 0,
  };

  // Guardar (más recientes primero)
  historias.unshift(historia);
  const saved = await saveHistorias(historias);

  if (!saved) {
    return { ok: false, error: "Error al guardar la historia" };
  }

  return { ok: true, historia };
}

// ─────────────────────────────────────────────────────────────
// Actualizar redes sociales
// ─────────────────────────────────────────────────────────────

export async function updateSocialPosts(
  id: string,
  socialPosts: HistoriaComunidad["socialPosts"]
): Promise<boolean> {
  const historias = await getHistorias();
  if (!historias) return false;

  const idx = historias.findIndex((h) => h.id === id);
  if (idx === -1) return false;

  historias[idx].socialPosts = socialPosts;
  return saveHistorias(historias);
}

// ─────────────────────────────────────────────────────────────
// Incrementar vistas
// ─────────────────────────────────────────────────────────────

export async function incrementViews(slug: string): Promise<boolean> {
  const historias = await getHistorias();
  if (!historias) return false;

  const idx = historias.findIndex((h) => h.slug === slug);
  if (idx === -1) return false;

  historias[idx].views = (historias[idx].views ?? 0) + 1;
  return saveHistorias(historias);
}

// ─────────────────────────────────────────────────────────────
// Ciudades y temas disponibles
// ─────────────────────────────────────────────────────────────

export const CIUDADES_SUIZA = [
  "Zúrich",
  "Ginebra",
  "Basilea",
  "Berna",
  "Lausana",
  "Lucerna",
  "St. Gallen",
  "Lugano",
  "Winterthur",
  "Otra",
] as const;

export const TEMAS_HISTORIA = [
  { value: "llegada", label: "Mi llegada a Suiza" },
  { value: "trabajo", label: "Experiencia laboral" },
  { value: "vivienda", label: "Encontrar piso" },
  { value: "idiomas", label: "Aprender el idioma" },
  { value: "familia", label: "Vida en familia" },
  { value: "burocracia", label: "Trámites y burocracia" },
  { value: "vida-diaria", label: "Vida diaria" },
  { value: "consejos", label: "Consejos" },
  { value: "otro", label: "Otro" },
] as const;
