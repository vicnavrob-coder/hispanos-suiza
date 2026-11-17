import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  getHistorias,
  createHistoria,
  updateSocialPosts,
} from "@/lib/historias-comunidad";
import { publishToAllSocials } from "@/lib/social-media";
import { CreateHistoriaSchema, validateData, getValidationErrorMessage } from "@/lib/validation-schemas";
import { emailHistoriaPublicada } from "@/lib/email-templates";

const GMAIL_USER = process.env.NEWSLETTER_GMAIL_USER ?? "";
const GMAIL_PASS = process.env.NEWSLETTER_GMAIL_PASS ?? "";

// ─────────────────────────────────────────────────────────────
// GET /api/historias - Listar todas las historias
// ─────────────────────────────────────────────────────────────

export async function GET() {
  try {
    const historias = await getHistorias();

    if (historias === null) {
      return NextResponse.json(
        { error: "Error al obtener historias" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      historias,
      total: historias.length,
    });
  } catch (error) {
    console.error("[api/historias] GET error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// ─────────────────────────────────────────────────────────────
// POST /api/historias - Crear nueva historia
// ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validar datos con Zod
    const validation = validateData(CreateHistoriaSchema, body);

    if (!validation.success) {
      return NextResponse.json(
        { error: getValidationErrorMessage(validation.errors) },
        { status: 400 }
      );
    }

    // Crear la historia con datos validados
    const result = await createHistoria(validation.data);

    if (!result.ok) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    // Enviar email de bienvenida al autor
    // Se ejecuta en background para no bloquear la respuesta
    if (result.historia && GMAIL_USER && GMAIL_PASS) {
      const historia = result.historia;

      // Email de agradecimiento
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: GMAIL_USER, pass: GMAIL_PASS },
      });

      transporter.sendMail({
        from: `"HispanosEnSuiza" <${GMAIL_USER}>`,
        to: historia.autorEmail,
        subject: `¡Tu historia "${historia.titulo}" está publicada! 🎉`,
        html: emailHistoriaPublicada(historia.autorNombre, historia.titulo, historia.slug),
      })
        .then(() => {
          console.log(`[historias] ✅ Email de bienvenida enviado a ${historia.autorEmail}`);
        })
        .catch((err) => {
          console.error("[historias] ❌ Error enviando email de bienvenida:", err);
          // No bloqueamos la respuesta si falla el email
        });

      // Publicar en redes sociales
      publishToAllSocials(historia)
        .then(async (socialPosts) => {
          // Guardar referencias a los posts en redes sociales
          if (socialPosts.facebook || socialPosts.instagram) {
            await updateSocialPosts(historia.id, {
              facebook: socialPosts.facebook ? {
                postId: socialPosts.facebook.postId,
                url: socialPosts.facebook.url,
              } : undefined,
              instagram: socialPosts.instagram ? {
                postId: socialPosts.instagram.postId,
                url: socialPosts.instagram.url,
              } : undefined,
            });
          }
        })
        .catch((err) => {
          console.error("[historias] ❌ Social media publish failed:", err);
          // No bloqueamos la respuesta si falla RRSS
        });
    }

    return NextResponse.json({
      ok: true,
      historia: result.historia,
      message: "Historia publicada correctamente",
    });
  } catch (error) {
    console.error("[api/historias] POST error:", error);
    return NextResponse.json(
      { error: "Error al publicar la historia" },
      { status: 500 }
    );
  }
}
