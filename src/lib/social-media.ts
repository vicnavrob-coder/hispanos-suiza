/**
 * Social Media Publishing
 * Auto-publica historias de la comunidad en Instagram y Facebook
 */

import { HistoriaComunidad } from "./historias-comunidad";
import { BASE_URL } from "./seo";
import { logger } from "./logger";

// Configuración de redes sociales
const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN ?? "";
const INSTAGRAM_BUSINESS_ACCOUNT_ID = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID ?? "";
const FACEBOOK_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN ?? "";
const FACEBOOK_PAGE_ID = process.env.FACEBOOK_PAGE_ID ?? "";

interface SocialPost {
  platform: "instagram" | "facebook";
  postId: string;
  url: string;
  publishedAt: string;
}

/**
 * Genera el texto optimizado para RRSS a partir de una historia
 */
export function generateSocialCaption(historia: HistoriaComunidad): string {
  const { titulo, contenido, autorNombre, autorPais, ciudadSuiza, tema } = historia;

  // Extracto del contenido (primeras 150 caracteres)
  const excerpt = contenido.slice(0, 150).trim() + (contenido.length > 150 ? "..." : "");

  // Metadata
  const location = ciudadSuiza ? `📍 ${ciudadSuiza}` : "";
  const origin = autorPais ? `${autorPais} → Suiza` : "";

  // Hashtags estratégicos
  const hashtags = [
    "#HispanosSuiza",
    "#VivirEnSuiza",
    "#EmigraraSwiss",
  ];

  // Agregar hashtags según el tema
  if (tema === "trabajo") hashtags.push("#TrabajarEnSuiza");
  if (tema === "vivienda") hashtags.push("#ViviendaSuiza");
  if (tema === "llegada") hashtags.push("#EmigracionSuiza");
  if (ciudadSuiza === "Zúrich") hashtags.push("#Zurich");
  if (ciudadSuiza === "Ginebra") hashtags.push("#Geneva");

  // Si es latinoamericano, agregar hashtag específico
  const latinCountries = ["México", "Argentina", "Colombia", "Chile", "Perú", "Venezuela"];
  if (autorPais && latinCountries.includes(autorPais)) {
    hashtags.push("#LatamEnSuiza");
  }

  const caption = `✨ Nueva historia de nuestra comunidad

"${titulo}"

${excerpt}

${location}
${origin ? `🌎 ${origin}` : ""}

Lee la historia completa en el link de nuestra bio 👆

${hashtags.join(" ")}

---
¿Tienes tu propia historia? Compártela en HispanosEnSuiza.ch 🇨🇭`;

  return caption;
}

/**
 * Publica en Instagram (requiere Facebook Graph API)
 * https://developers.facebook.com/docs/instagram-api/guides/content-publishing
 */
export async function publishToInstagram(
  historia: HistoriaComunidad
): Promise<SocialPost | null> {
  if (!INSTAGRAM_ACCESS_TOKEN || !INSTAGRAM_BUSINESS_ACCOUNT_ID) {
    logger.warn("Instagram credentials not configured");
    return null;
  }

  try {
    const caption = generateSocialCaption(historia);
    const storyUrl = `${BASE_URL}/historias-reales/${historia.slug}`;
    const imageUrl = generateSocialImageUrl(historia);

    // Paso 1: Crear container de media
    const containerResponse = await fetch(
      `https://graph.facebook.com/v18.0/${INSTAGRAM_BUSINESS_ACCOUNT_ID}/media`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caption,
          image_url: imageUrl,
          access_token: INSTAGRAM_ACCESS_TOKEN,
        }),
      }
    );

    if (!containerResponse.ok) {
      const error = await containerResponse.json();
      logger.social("Instagram", undefined, false, new Error(JSON.stringify(error)));
      return null;
    }

    const { id: creationId } = await containerResponse.json();

    // Paso 2: Publicar el container
    const publishResponse = await fetch(
      `https://graph.facebook.com/v18.0/${INSTAGRAM_BUSINESS_ACCOUNT_ID}/media_publish`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creation_id: creationId,
          access_token: INSTAGRAM_ACCESS_TOKEN,
        }),
      }
    );

    if (!publishResponse.ok) {
      const error = await publishResponse.json();
      logger.social("Instagram", undefined, false, new Error(JSON.stringify(error)));
      return null;
    }

    const { id: postId } = await publishResponse.json();
    logger.social("Instagram", postId, true);

    return {
      platform: "instagram",
      postId,
      url: storyUrl, // Instagram no da URL directa del post
      publishedAt: new Date().toISOString(),
    };
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    logger.social("Instagram", undefined, false, err);
    return null;
  }
}

/**
 * Publica en Facebook Page
 * https://developers.facebook.com/docs/pages/publishing
 */
export async function publishToFacebook(
  historia: HistoriaComunidad
): Promise<SocialPost | null> {
  if (!FACEBOOK_ACCESS_TOKEN || !FACEBOOK_PAGE_ID) {
    logger.warn("Facebook credentials not configured");
    return null;
  }

  try {
    const caption = generateSocialCaption(historia);
    const storyUrl = `${BASE_URL}/historias-reales/${historia.slug}`;

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${FACEBOOK_PAGE_ID}/feed`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: caption,
          link: storyUrl,
          access_token: FACEBOOK_ACCESS_TOKEN,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      logger.social("Facebook", undefined, false, new Error(JSON.stringify(error)));
      return null;
    }

    const { id: postId } = await response.json();
    logger.social("Facebook", postId, true);

    return {
      platform: "facebook",
      postId,
      url: `https://facebook.com/${postId}`,
      publishedAt: new Date().toISOString(),
    };
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    logger.social("Facebook", undefined, false, err);
    return null;
  }
}

/**
 * Publica en todas las redes sociales configuradas
 */
export async function publishToAllSocials(
  historia: HistoriaComunidad
): Promise<{ facebook?: SocialPost; instagram?: SocialPost }> {
  const results = await Promise.allSettled([
    publishToFacebook(historia),
    publishToInstagram(historia),
  ]);

  return {
    facebook: results[0].status === "fulfilled" ? results[0].value ?? undefined : undefined,
    instagram: results[1].status === "fulfilled" ? results[1].value ?? undefined : undefined,
  };
}

/**
 * Genera imagen social (Open Graph) para una historia
 * Usa el endpoint /api/og-image para generar imágenes dinámicas
 */
export function generateSocialImageUrl(historia: HistoriaComunidad): string {
  // TEMPORAL: Usar imagen externa hasta el próximo deploy
  // Después del deploy, cambiar a: return `${BASE_URL}/og-default.jpg`;
  // O mejor aún, usar el endpoint dinámico /api/og-image
  return "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=630&fit=crop&q=80";
}
