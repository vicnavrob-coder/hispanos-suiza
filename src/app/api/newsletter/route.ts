import { NextRequest, NextResponse } from "next/server";

const BREVO_API_KEY = process.env.BREVO_API_KEY ?? "";
const BREVO_LIST_ID = parseInt(process.env.BREVO_LIST_ID ?? "1", 10);

export async function POST(req: NextRequest) {
  let email: string;

  try {
    const body = await req.json();
    email = (body.email ?? "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "Petición inválida" }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }

  if (!BREVO_API_KEY) {
    // Dev mode sin API key: simulamos éxito
    console.warn("[newsletter] BREVO_API_KEY no configurada — modo simulación");
    return NextResponse.json({ ok: true, simulated: true });
  }

  try {
    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        email,
        listIds: [BREVO_LIST_ID],
        updateEnabled: true,
        attributes: {
          DOUBLE_OPT_IN: false,
          SOURCE: "footer-hispanosensuiza",
        },
      }),
    });

    if (res.ok || res.status === 204) {
      return NextResponse.json({ ok: true });
    }

    if (res.status === 400) {
      const data = await res.json().catch(() => ({}));
      // code 17 = contacto ya existe → lo tratamos como éxito
      if (data.code === "duplicate_parameter" || data.code === 17) {
        return NextResponse.json({ ok: true, already: true });
      }
    }

    return NextResponse.json({ error: "Error al suscribir" }, { status: 502 });
  } catch {
    return NextResponse.json({ error: "Error de red" }, { status: 502 });
  }
}
