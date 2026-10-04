import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/auth/register
 * Recibe los datos de un nuevo usuario registrado y los guarda en Brevo.
 * Si BREVO_API_KEY no está configurada, solo loguea (no falla).
 */
export async function POST(req: NextRequest) {
  try {
    const { email, nombre, pais, provider } = await req.json();

    if (!email || !nombre) {
      return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
    }

    const brevoKey = process.env.BREVO_API_KEY;

    if (!brevoKey) {
      // Sin clave configurada — solo log. No bloquear el registro.
      console.log(`[registro] ${email} | ${nombre} | ${pais || "—"} | ${provider || "email"}`);
      return NextResponse.json({ ok: true, saved: false });
    }

    // Añadir contacto a Brevo con lista "HispanosEnSuiza Registros"
    const resp = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": brevoKey,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        email,
        attributes: {
          NOMBRE: nombre,
          PAIS: pais || "",
          PROVIDER: provider || "email",
          SITIO: "hispanosensuiza.ch",
          REGISTRO: new Date().toISOString().split("T")[0],
        },
        listIds: [2],          // Lista por defecto en Brevo (ID 2 = "Mis contactos")
        updateEnabled: true,   // Si ya existe, actualizar en vez de error
      }),
    });

    if (resp.status === 201 || resp.status === 204) {
      return NextResponse.json({ ok: true, saved: true });
    }

    const body = await resp.json().catch(() => ({}));

    // 400 con "Contact already exist" → no es un error real
    if (resp.status === 400 && body?.message?.includes("already exist")) {
      return NextResponse.json({ ok: true, saved: true });
    }

    console.error("[brevo] Error al guardar contacto:", resp.status, body);
    return NextResponse.json({ ok: true, saved: false }); // No bloquear el registro
  } catch (err) {
    console.error("[registro] Error inesperado:", err);
    return NextResponse.json({ ok: true, saved: false });
  }
}
