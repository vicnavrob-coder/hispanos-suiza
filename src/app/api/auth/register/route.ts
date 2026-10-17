import { NextRequest, NextResponse } from "next/server";
import { addSubscriber } from "@/lib/subscribers";

/**
 * POST /api/auth/register
 * Recibe los datos de un nuevo usuario registrado y los guarda como suscriptor.
 */
export async function POST(req: NextRequest) {
  try {
    const { email, nombre, pais, provider } = await req.json();

    if (!email || !nombre) {
      return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
    }

    const source = `registro-${provider || "email"}${pais ? `-${pais}` : ""}`;
    const { ok, already } = await addSubscriber(email, nombre, source);

    if (!ok) {
      console.error(`[registro] Error al guardar ${email}`);
      return NextResponse.json({ ok: true, saved: false });
    }

    console.log(`[registro] ${already ? "existente" : "nuevo"}: ${email} | ${nombre} | ${pais || "—"}`);
    return NextResponse.json({ ok: true, saved: true });
  } catch (err) {
    console.error("[registro] Error inesperado:", err);
    return NextResponse.json({ ok: true, saved: false });
  }
}
