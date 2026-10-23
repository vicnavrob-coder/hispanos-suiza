import { NextRequest, NextResponse } from "next/server";
import { addSubscriber } from "@/lib/subscribers";
import { trackUser } from "@/lib/users";

/**
 * POST /api/auth/register
 * Recibe los datos de un nuevo usuario registrado y los guarda:
 * 1. En users.json (tracking de todos los usuarios)
 * 2. En subscribers.json (para la secuencia de emails)
 */
export async function POST(req: NextRequest) {
  try {
    const { email, nombre, pais, provider } = await req.json();

    if (!email || !nombre) {
      return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
    }

    const providerType = provider === "google" ? "google" : "email";
    const source = `registro-${providerType}${pais ? `-${pais}` : ""}`;

    // 1. Track user (todos los usuarios registrados)
    const userResult = await trackUser(email, nombre, providerType, pais, source);

    // 2. Add to subscribers (para emails de bienvenida)
    const { ok, already } = await addSubscriber(email, nombre, source);

    if (!userResult.ok) {
      console.error(`[registro] Error al trackear usuario ${email}`);
    }

    if (!ok) {
      console.error(`[registro] Error al guardar suscriptor ${email}`);
    }

    const status = userResult.isNew ? "NUEVO" : "existente";
    console.log(`[registro] ${status}: ${email} | ${nombre} | ${providerType} | ${pais || "—"}`);

    return NextResponse.json({
      ok: true,
      saved: ok || userResult.ok,
      isNew: userResult.isNew,
      alreadySubscriber: already,
    });
  } catch (err) {
    console.error("[registro] Error inesperado:", err);
    return NextResponse.json({ ok: false, saved: false, error: "Error interno" });
  }
}
