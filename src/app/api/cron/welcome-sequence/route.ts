import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const BREVO_KEY = process.env.BREVO_API_KEY ?? "";

// Días de espera entre cada email (desde WELCOME_START)
const SCHEDULE: Record<number, number> = {
  2: 3,   // Email 2 → día 3
  3: 7,   // Email 3 → día 7
  4: 14,  // Email 4 → día 14
  5: 21,  // Email 5 → día 21
};

// Template IDs en Brevo (creados previamente)
const TEMPLATE_IDS: Record<number, number> = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
};

function daysSince(dateStr: string): number {
  const start = new Date(dateStr).getTime();
  return Math.floor((Date.now() - start) / 86_400_000);
}

async function brevo(path: string, method = "GET", body?: unknown) {
  const res = await fetch(`https://api.brevo.com/v3${path}`, {
    method,
    headers: { "api-key": BREVO_KEY, "content-type": "application/json" },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  return res.json().catch(() => ({}));
}

export async function GET(req: NextRequest) {
  // Proteger con secret para que no lo llame nadie externo
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!BREVO_KEY) {
    return NextResponse.json({ error: "BREVO_API_KEY not set" }, { status: 500 });
  }

  let page = 0;
  let totalSent = 0;
  const errors: string[] = [];

  // Paginar contactos de la lista con WELCOME_STEP < 5
  while (true) {
    const data = await brevo(
      `/contacts?limit=50&offset=${page * 50}&sort=asc`,
    ) as { contacts?: Array<{ email: string; attributes: Record<string, string> }> };

    const contacts = data.contacts ?? [];
    if (contacts.length === 0) break;

    for (const contact of contacts) {
      const step  = parseInt(contact.attributes?.WELCOME_STEP ?? "0", 10);
      const start = contact.attributes?.WELCOME_START ?? "";

      // Saltar si la secuencia está completa o no ha empezado
      if (!start || step === 0 || step >= 5) continue;

      const nextStep = step + 1;
      const minDays  = SCHEDULE[nextStep];
      if (!minDays) continue;

      if (daysSince(start) < minDays) continue;

      const templateId = TEMPLATE_IDS[nextStep];
      if (!templateId) continue;

      try {
        // Enviar email
        const sendRes = await brevo("/smtp/email", "POST", {
          templateId,
          to: [{ email: contact.email }],
        }) as { messageId?: string; message?: string };

        if (sendRes.messageId) {
          // Actualizar WELCOME_STEP en el contacto
          await brevo(`/contacts/${encodeURIComponent(contact.email)}`, "PUT", {
            attributes: { WELCOME_STEP: String(nextStep) },
          });
          totalSent++;
        } else {
          errors.push(`${contact.email}: ${sendRes.message ?? "unknown error"}`);
        }
      } catch (e) {
        errors.push(`${contact.email}: ${String(e)}`);
      }
    }

    if (contacts.length < 50) break;
    page++;
  }

  console.log(`[welcome-cron] Sent: ${totalSent}, Errors: ${errors.length}`);
  return NextResponse.json({ sent: totalSent, errors });
}
