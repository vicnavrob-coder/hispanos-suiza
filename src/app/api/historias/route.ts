import { NextRequest, NextResponse } from "next/server";
import {
  getHistorias,
  createHistoria,
  type CreateHistoriaInput,
} from "@/lib/historias-comunidad";

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

    // Validar campos requeridos
    const { autorEmail, autorNombre, titulo, contenido, ciudadSuiza, tema, autorPais, autorAvatar } =
      body as Partial<CreateHistoriaInput>;

    if (!autorEmail || !autorNombre) {
      return NextResponse.json(
        { error: "Debes iniciar sesión para publicar una historia" },
        { status: 401 }
      );
    }

    if (!titulo?.trim()) {
      return NextResponse.json(
        { error: "El título es obligatorio" },
        { status: 400 }
      );
    }

    if (!contenido?.trim()) {
      return NextResponse.json(
        { error: "El contenido es obligatorio" },
        { status: 400 }
      );
    }

    // Crear la historia
    const result = await createHistoria({
      autorEmail,
      autorNombre,
      autorPais,
      autorAvatar,
      titulo,
      contenido,
      ciudadSuiza,
      tema,
    });

    if (!result.ok) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    // TODO: Publicar en redes sociales (Fase 2)
    // await publishToSocialMedia(result.historia);

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
