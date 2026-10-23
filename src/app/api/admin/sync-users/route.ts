import { NextRequest, NextResponse } from "next/server";
import { getSubscribers } from "@/lib/subscribers";
import { getUsers, trackUser } from "@/lib/users";

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || process.env.CRON_SECRET || "hispanos-admin-2026";

/**
 * GET /api/admin/sync-users?token=XXX
 * Sincroniza usuarios de subscribers.json a users.json
 * (para usuarios que se registraron antes de que existiera users.json)
 */
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (token !== ADMIN_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const subscribers = await getSubscribers();
  const usersData = await getUsers();

  if (!subscribers || !usersData) {
    return NextResponse.json({ error: "Failed to read data" }, { status: 500 });
  }

  const userEmails = new Set(usersData.users.map((u) => u.email.toLowerCase()));
  const missing = subscribers.filter((s) => !userEmails.has(s.email.toLowerCase()));

  if (missing.length === 0) {
    return NextResponse.json({
      ok: true,
      message: "Todos los usuarios ya están sincronizados",
      subscribers: subscribers.length,
      users: usersData.users.length,
      synced: 0
    });
  }

  let synced = 0;
  const errors: string[] = [];

  for (const sub of missing) {
    // Determinar provider basado en source
    const provider = sub.source?.includes("google") ? "google" : "email";

    const result = await trackUser(
      sub.email,
      sub.nombre,
      provider as "google" | "email",
      undefined, // pais
      sub.source
    );

    if (result.ok) {
      synced++;
      console.log(`[sync] Añadido: ${sub.email}`);
    } else {
      errors.push(sub.email);
      console.error(`[sync] Error: ${sub.email}`);
    }
  }

  return NextResponse.json({
    ok: true,
    message: `Sincronización completada`,
    subscribers: subscribers.length,
    users: usersData.users.length + synced,
    synced,
    errors,
  });
}
