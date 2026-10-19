import { redirect } from "next/navigation";
import { getCitas, type UniaCita, type CitaStatus } from "@/lib/unia-citas";

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || process.env.CRON_SECRET || "hispanos-admin-2026";

const statusLabels: Record<CitaStatus, string> = {
  solicitud: "Pendiente",
  propuesta: "Horarios enviados",
  confirmada: "Confirmada",
  completada: "Completada",
  cancelada: "Cancelada",
};

const statusColors: Record<CitaStatus, { bg: string; text: string }> = {
  solicitud: { bg: "#FEF3C7", text: "#92400E" },
  propuesta: { bg: "#DBEAFE", text: "#1E40AF" },
  confirmada: { bg: "#DCFCE7", text: "#166534" },
  completada: { bg: "#F3F4F6", text: "#374151" },
  cancelada: { bg: "#FEE2E2", text: "#991B1B" },
};

function formatDateTime(isoString: string | undefined): string {
  if (!isoString) return "—";
  try {
    const date = new Date(isoString);
    return date.toLocaleString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Zurich",
    });
  } catch {
    return isoString;
  }
}

function formatDate(isoString: string | undefined): string {
  if (!isoString) return "—";
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "Europe/Zurich",
    });
  } catch {
    return isoString;
  }
}

export default async function CitasAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; filter?: string }>;
}) {
  const params = await searchParams;
  if (params.token !== ADMIN_TOKEN) {
    redirect("/admin/citas?token=");
  }

  const allCitas = (await getCitas()) ?? [];
  const filter = params.filter || "all";

  // Filter citas
  let citas = allCitas;
  if (filter !== "all") {
    citas = allCitas.filter((c) => c.status === filter);
  }

  // Sort by createdAt descending (newest first)
  citas.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Stats
  const stats = {
    total: allCitas.length,
    solicitud: allCitas.filter((c) => c.status === "solicitud").length,
    propuesta: allCitas.filter((c) => c.status === "propuesta").length,
    confirmada: allCitas.filter((c) => c.status === "confirmada").length,
    completada: allCitas.filter((c) => c.status === "completada").length,
    cancelada: allCitas.filter((c) => c.status === "cancelada").length,
  };

  const now = new Date().toLocaleString("es-ES", { timeZone: "Europe/Zurich" });

  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Citas UNIA · Admin · HispanosEnSuiza</title>
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                 background: #f1f5f9; color: #1e293b; font-size: 14px; }
          .header { background: linear-gradient(135deg, #c8102e 0%, #0032a0 100%);
                    color: white; padding: 16px 20px; }
          .header h1 { font-size: 18px; font-weight: 700; }
          .header .ts { font-size: 11px; opacity: 0.75; margin-top: 2px; }
          .container { max-width: 1200px; margin: 0 auto; padding: 16px; }
          .nav { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
          .nav a { display: inline-block; padding: 8px 16px; border-radius: 8px; font-size: 13px;
                   font-weight: 600; text-decoration: none; background: white; color: #374151;
                   border: 1px solid #e2e8f0; transition: all 0.15s; }
          .nav a:hover { background: #f8fafc; }
          .nav a.active { background: #c8102e; color: white; border-color: #c8102e; }
          .stats { display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; margin-bottom: 16px; }
          .stat { background: white; border-radius: 10px; padding: 12px 14px;
                  box-shadow: 0 1px 3px rgba(0,0,0,.06); text-align: center; }
          .stat-val { font-size: 24px; font-weight: 800; }
          .stat-lbl { font-size: 10px; color: #94a3b8; margin-top: 2px; text-transform: uppercase; }
          table { width: 100%; border-collapse: collapse; background: white; border-radius: 10px;
                  overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,.06); }
          th { background: #f8fafc; padding: 10px 12px; text-align: left; font-size: 10px;
               color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: .5px;
               border-bottom: 1px solid #e2e8f0; }
          td { padding: 12px; border-top: 1px solid #f1f5f9; font-size: 13px;
               vertical-align: top; }
          tr:hover td { background: #f8fafc; }
          .badge { display: inline-block; padding: 4px 10px; border-radius: 6px; font-size: 11px;
                   font-weight: 600; }
          .empty { text-align: center; padding: 40px; color: #94a3b8; }
          .link { color: #c8102e; text-decoration: none; font-weight: 600; }
          .link:hover { text-decoration: underline; }
          .horario-box { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px;
                         padding: 8px 10px; font-size: 12px; color: #166534; margin-top: 4px; }
          @media (max-width: 900px) {
            .stats { grid-template-columns: repeat(3, 1fr); }
            .hide-mobile { display: none; }
          }
          @media (max-width: 600px) {
            .stats { grid-template-columns: repeat(2, 1fr); }
          }
        `}</style>
      </head>
      <body>
        <div className="header">
          <h1>🇨🇭 HispanosEnSuiza — Citas UNIA</h1>
          <div className="ts">
            Actualizado: {now} · {stats.total} citas totales
          </div>
        </div>
        <div className="container">
          {/* Navigation */}
          <div className="nav">
            <a href={`/admin?token=${ADMIN_TOKEN}`}>← Suscriptores</a>
            <a href={`/admin/citas?token=${ADMIN_TOKEN}`} className={filter === "all" ? "active" : ""}>
              Todas ({stats.total})
            </a>
            <a
              href={`/admin/citas?token=${ADMIN_TOKEN}&filter=solicitud`}
              className={filter === "solicitud" ? "active" : ""}
            >
              Pendientes ({stats.solicitud})
            </a>
            <a
              href={`/admin/citas?token=${ADMIN_TOKEN}&filter=propuesta`}
              className={filter === "propuesta" ? "active" : ""}
            >
              Esperando usuario ({stats.propuesta})
            </a>
            <a
              href={`/admin/citas?token=${ADMIN_TOKEN}&filter=confirmada`}
              className={filter === "confirmada" ? "active" : ""}
            >
              Confirmadas ({stats.confirmada})
            </a>
          </div>

          {/* Stats */}
          <div className="stats">
            <div className="stat">
              <div className="stat-val" style={{ color: "#6366f1" }}>{stats.total}</div>
              <div className="stat-lbl">Total</div>
            </div>
            <div className="stat">
              <div className="stat-val" style={{ color: "#f59e0b" }}>{stats.solicitud}</div>
              <div className="stat-lbl">Pendientes</div>
            </div>
            <div className="stat">
              <div className="stat-val" style={{ color: "#3b82f6" }}>{stats.propuesta}</div>
              <div className="stat-lbl">Esperando</div>
            </div>
            <div className="stat">
              <div className="stat-val" style={{ color: "#16a34a" }}>{stats.confirmada}</div>
              <div className="stat-lbl">Confirmadas</div>
            </div>
            <div className="stat">
              <div className="stat-val" style={{ color: "#64748b" }}>{stats.completada}</div>
              <div className="stat-lbl">Completadas</div>
            </div>
            <div className="stat">
              <div className="stat-val" style={{ color: "#ef4444" }}>{stats.cancelada}</div>
              <div className="stat-lbl">Canceladas</div>
            </div>
          </div>

          {/* Table */}
          {citas.length === 0 ? (
            <div className="empty">No hay citas{filter !== "all" ? ` con estado "${filter}"` : ""}</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th className="hide-mobile">País</th>
                  <th>Estado</th>
                  <th>Horario</th>
                  <th className="hide-mobile">Creada</th>
                </tr>
              </thead>
              <tbody>
                {citas.map((c: UniaCita) => (
                  <tr key={c.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{c.userName}</div>
                      <div style={{ fontSize: 12, color: "#64748b" }}>{c.userEmail}</div>
                      {c.userTelefono && (
                        <div style={{ fontSize: 11, color: "#94a3b8" }}>📞 {c.userTelefono}</div>
                      )}
                    </td>
                    <td className="hide-mobile">{c.userPais || "—"}</td>
                    <td>
                      <span
                        className="badge"
                        style={{
                          background: statusColors[c.status].bg,
                          color: statusColors[c.status].text,
                        }}
                      >
                        {statusLabels[c.status]}
                      </span>
                    </td>
                    <td>
                      {c.horarioConfirmado ? (
                        <div className="horario-box">
                          ✅ {formatDateTime(c.horarioConfirmado)}
                          <div style={{ fontSize: 11, marginTop: 2 }}>
                            {c.formato === "videollamada" && "📹 Videollamada"}
                            {c.formato === "telefono" && "📞 Teléfono"}
                            {c.formato === "presencial" && "🏢 Presencial"}
                          </div>
                        </div>
                      ) : c.status === "solicitud" ? (
                        <span style={{ color: "#f59e0b", fontSize: 12 }}>⏳ UNIA debe proponer</span>
                      ) : c.status === "propuesta" ? (
                        <span style={{ color: "#3b82f6", fontSize: 12 }}>⏳ Usuario debe elegir</span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="hide-mobile">{formatDate(c.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div style={{ marginTop: 16, fontSize: 11, color: "#94a3b8", textAlign: "center" }}>
            Almacenamiento: GitHub Gist · Emails: Gmail SMTP
          </div>
        </div>
      </body>
    </html>
  );
}
