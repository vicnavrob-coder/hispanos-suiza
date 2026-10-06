import { BASE_URL } from "@/lib/seo";

// ── Auth ─────────────────────────────────────────────────────────────────────

const ADMIN_SECRET = process.env.ADMIN_SECRET ?? "";

// ── Brevo helpers ─────────────────────────────────────────────────────────────

const BREVO_KEY    = process.env.BREVO_API_KEY  ?? "";
const BREVO_LIST   = process.env.BREVO_LIST_ID  ?? "2";
const BREVO_HEADERS = {
  "api-key": BREVO_KEY,
  accept: "application/json",
};

type BrevoContact = {
  id: number;
  email: string;
  attributes?: Record<string, string | number>;
  createdAt: string;
};

async function getBrevoStats() {
  if (!BREVO_KEY) return null;

  try {
    const [totalRes, recentRes, last7Res, last30Res] = await Promise.all([
      // Total en la lista
      fetch(`https://api.brevo.com/v3/contacts?limit=1&listId=${BREVO_LIST}`, {
        headers: BREVO_HEADERS, next: { revalidate: 300 },
      }),
      // Últimos 20 registros
      fetch(`https://api.brevo.com/v3/contacts?limit=20&sort=desc&listId=${BREVO_LIST}`, {
        headers: BREVO_HEADERS, next: { revalidate: 300 },
      }),
      // Últimos 7 días
      fetch(`https://api.brevo.com/v3/contacts?limit=500&sort=desc&listId=${BREVO_LIST}&createdSince=${new Date(Date.now() - 7 * 86400000).toISOString()}`, {
        headers: BREVO_HEADERS, next: { revalidate: 300 },
      }),
      // Últimos 30 días
      fetch(`https://api.brevo.com/v3/contacts?limit=1000&sort=desc&listId=${BREVO_LIST}&createdSince=${new Date(Date.now() - 30 * 86400000).toISOString()}`, {
        headers: BREVO_HEADERS, next: { revalidate: 300 },
      }),
    ]);

    const [totalData, recentData, last7Data, last30Data] = await Promise.all([
      totalRes.json(), recentRes.json(), last7Res.json(), last30Res.json(),
    ]);

    return {
      total:          totalData.count  ?? 0,
      last7:          last7Data.count  ?? 0,
      last30:         last30Data.count ?? 0,
      recent:         (recentData.contacts ?? []) as BrevoContact[],
      last30Contacts: (last30Data.contacts ?? []) as BrevoContact[],
    };
  } catch { return null; }
}

// ── System health ─────────────────────────────────────────────────────────────

type HealthCheck = { name: string; url: string; ok: boolean; ms: number };

async function checkHealth(): Promise<HealthCheck[]> {
  const checks = [
    { name: "jobs.ch (buscador trabajo)", url: "https://www.jobs.ch/en/vacancies/rss/?term=developer&location=Zurich" },
    { name: "flatfox.ch (buscador vivienda)", url: "https://flatfox.ch/api/v1/listing/?limit=1&active=true" },
    { name: "Brevo API", url: "https://api.brevo.com/v3/account" },
  ];

  const results = await Promise.all(
    checks.map(async (c) => {
      const t0 = Date.now();
      try {
        const res = await fetch(c.url, {
          headers: c.name.startsWith("Brevo") ? BREVO_HEADERS : {},
          next: { revalidate: 60 },
          signal: AbortSignal.timeout(5000),
        });
        return { name: c.name, url: c.url, ok: res.ok, ms: Date.now() - t0 };
      } catch {
        return { name: c.name, url: c.url, ok: false, ms: Date.now() - t0 };
      }
    })
  );

  return results;
}

// ── Helpers UI ────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return new Intl.NumberFormat("es-ES").format(n);
}

function timeAgo(iso: string) {
  try {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60)  return `hace ${mins}m`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24)   return `hace ${hrs}h`;
    const days = Math.floor(hrs / 24);
    return `hace ${days}d`;
  } catch { return "—"; }
}

function fmtDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "2-digit" });
  } catch { return "—"; }
}

// Agrupa contactos por día (sparkline)
function buildSparkline(contacts: BrevoContact[]): number[] {
  const days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(Date.now() - (29 - i) * 86400000);
    return d.toISOString().slice(0, 10);
  });
  const counts: Record<string, number> = {};
  for (const c of contacts) {
    const day = c.createdAt?.slice(0, 10);
    if (day) counts[day] = (counts[day] ?? 0) + 1;
  }
  return days.map((d) => counts[d] ?? 0);
}

// ── Dashboard components (JSX) ────────────────────────────────────────────────

function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data, 1);
  const W = 300, H = 48, PAD = 2;
  const pts = data.map((v, i) => {
    const x = PAD + (i / (data.length - 1)) * (W - PAD * 2);
    const y = H - PAD - (v / max) * (H - PAD * 2);
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 48 }}>
      <polyline
        points={pts}
        fill="none"
        stroke="#7c3aed"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {data.map((v, i) => v > 0 && (
        <circle
          key={i}
          cx={PAD + (i / (data.length - 1)) * (W - PAD * 2)}
          cy={H - PAD - (v / max) * (H - PAD * 2)}
          r={2}
          fill="#7c3aed"
        />
      ))}
    </svg>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

type Props = { searchParams: Promise<{ key?: string }> };

export default async function AdminPage({ searchParams }: Props) {
  const params = await searchParams;
  const isAuth = ADMIN_SECRET && params.key === ADMIN_SECRET;

  // ── Login form ──────────────────────────────────────────────────────────────
  if (!isAuth) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-sm text-center">
          <div className="text-3xl mb-4">🔐</div>
          <h1 className="text-white font-bold text-xl mb-2">Panel de control</h1>
          <p className="text-gray-400 text-sm mb-6">HispanosEnSuiza — acceso restringido</p>
          <form method="GET" className="space-y-3">
            <input
              name="key"
              type="password"
              placeholder="Contraseña de administrador"
              autoComplete="current-password"
              className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl text-sm transition-colors"
            >
              Entrar →
            </button>
          </form>
          {!ADMIN_SECRET && (
            <p className="text-amber-400 text-xs mt-4">⚠ ADMIN_SECRET no configurado en variables de entorno.</p>
          )}
        </div>
      </div>
    );
  }

  // ── Fetch data ──────────────────────────────────────────────────────────────
  const [brevo, health] = await Promise.all([
    getBrevoStats(),
    checkHealth(),
  ]);

  const sparkData  = brevo ? buildSparkline(brevo.last30Contacts) : [];
  const healthOk   = health.filter((h) => h.ok).length;
  const gaId       = process.env.NEXT_PUBLIC_GA_ID ?? "";
  const now        = new Date().toLocaleString("es-ES", { timeZone: "Europe/Zurich", dateStyle: "short", timeStyle: "short" });

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100" style={{ fontFamily: "system-ui, sans-serif" }}>

      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🇨🇭</span>
          <div>
            <h1 className="text-white font-bold text-base leading-tight">HispanosEnSuiza</h1>
            <p className="text-gray-500 text-xs">Panel de control · {now} Zurich</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${healthOk === health.length ? "bg-green-400" : healthOk === 0 ? "bg-red-400" : "bg-amber-400"}`} />
          <span className="text-xs text-gray-400">{healthOk}/{health.length} servicios OK</span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">

        {/* ── Métricas principales ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: "Usuarios registrados",
              value: brevo ? fmt(brevo.total) : "—",
              sub: "total en Brevo",
              color: "bg-purple-900/40 border-purple-700/50",
              icon: "👥",
            },
            {
              label: "Nuevos últimos 7 días",
              value: brevo ? fmt(brevo.last7) : "—",
              sub: brevo && brevo.total > 0 ? `${((brevo.last7 / brevo.total) * 100).toFixed(1)}% del total` : "",
              color: "bg-blue-900/40 border-blue-700/50",
              icon: "📈",
            },
            {
              label: "Nuevos últimos 30 días",
              value: brevo ? fmt(brevo.last30) : "—",
              sub: brevo && brevo.last30 > 0 ? `~${Math.round(brevo.last30 / 30)}/día` : "",
              color: "bg-indigo-900/40 border-indigo-700/50",
              icon: "📊",
            },
            {
              label: "Servicios activos",
              value: `${healthOk}/${health.length}`,
              sub: healthOk === health.length ? "todo correcto" : "revisar estado",
              color: healthOk === health.length
                ? "bg-green-900/40 border-green-700/50"
                : "bg-amber-900/40 border-amber-700/50",
              icon: "⚡",
            },
          ].map((m) => (
            <div key={m.label} className={`rounded-2xl border p-5 ${m.color}`}>
              <div className="text-2xl mb-2">{m.icon}</div>
              <div className="text-3xl font-black text-white mb-1">{m.value}</div>
              <div className="text-xs text-gray-300 font-medium leading-tight">{m.label}</div>
              {m.sub && <div className="text-xs text-gray-500 mt-1">{m.sub}</div>}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Crecimiento 30 días ── */}
          <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-white">Nuevos registros — últimos 30 días</h2>
              {brevo && (
                <span className="text-xs text-purple-400 bg-purple-900/30 px-2 py-1 rounded-full">
                  {fmt(brevo.last30)} registros
                </span>
              )}
            </div>
            {brevo && sparkData.some((v) => v > 0) ? (
              <div className="mb-3">
                <Sparkline data={sparkData} />
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>hace 30 días</span>
                  <span>hoy</span>
                </div>
              </div>
            ) : (
              <div className="h-12 flex items-center justify-center text-gray-600 text-sm">
                {brevo ? "Sin actividad en los últimos 30 días" : "Brevo no configurado"}
              </div>
            )}
            {/* Días con más actividad */}
            {brevo && brevo.last30Contacts.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-800">
                <div className="text-xs text-gray-500 mb-2">Distribución por día (top 5)</div>
                <div className="space-y-1">
                  {Object.entries(
                    brevo.last30Contacts.reduce((acc: Record<string, number>, c) => {
                      const d = c.createdAt?.slice(0, 10) ?? "—";
                      acc[d] = (acc[d] ?? 0) + 1;
                      return acc;
                    }, {})
                  )
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5)
                    .map(([day, count]) => (
                      <div key={day} className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 w-20 flex-shrink-0">{day}</span>
                        <div className="flex-1 bg-gray-800 rounded-full h-1.5">
                          <div
                            className="bg-purple-500 h-1.5 rounded-full"
                            style={{ width: `${(count / Math.max(...sparkData, 1)) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-purple-400 w-6 text-right">{count}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Últimas inscripciones ── */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="font-bold text-white mb-4">Últimas inscripciones</h2>
            {brevo && brevo.recent.length > 0 ? (
              <div className="space-y-3">
                {brevo.recent.slice(0, 10).map((c) => (
                  <div key={c.id} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-purple-900/60 flex items-center justify-center text-xs font-bold text-purple-300 flex-shrink-0">
                      {c.email.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-200 truncate">{c.email}</div>
                      <div className="text-xs text-gray-500">{fmtDate(c.createdAt)}</div>
                    </div>
                    <div className="text-xs text-gray-600 flex-shrink-0">{timeAgo(c.createdAt)}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-sm">{brevo ? "Sin inscripciones recientes." : "Brevo no configurado."}</p>
            )}
          </div>
        </div>

        {/* ── Analytics externos ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Google Analytics */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">📊</span>
              <div>
                <h2 className="font-bold text-white">Google Analytics 4</h2>
                <p className="text-xs text-gray-500">Visitas, páginas vistas, fuentes de tráfico</p>
              </div>
              {gaId ? (
                <span className="ml-auto text-xs bg-green-900/40 text-green-400 border border-green-800 px-2 py-0.5 rounded-full">configurado</span>
              ) : (
                <span className="ml-auto text-xs bg-red-900/40 text-red-400 border border-red-800 px-2 py-0.5 rounded-full">no configurado</span>
              )}
            </div>
            {gaId && (
              <div className="space-y-2">
                <a
                  href={`https://analytics.google.com/analytics/web/#/p${gaId.replace("G-", "")}/reports/reportinghub`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <span>→</span> Abrir panel GA4 ({gaId})
                </a>
                <a
                  href="https://analytics.google.com/analytics/web/#/realtime"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <span>→</span> Usuarios en tiempo real
                </a>
                <a
                  href={`https://analytics.google.com/analytics/web/#/p${gaId.replace("G-", "")}/reports/explorer?params=_u..nav%3Dmaui`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <span>→</span> Top páginas más visitadas
                </a>
              </div>
            )}
          </div>

          {/* Vercel Analytics */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">▲</span>
              <div>
                <h2 className="font-bold text-white">Vercel Analytics</h2>
                <p className="text-xs text-gray-500">Page views, Web Vitals, rutas</p>
              </div>
              <span className="ml-auto text-xs bg-green-900/40 text-green-400 border border-green-800 px-2 py-0.5 rounded-full">activo</span>
            </div>
            <div className="space-y-2">
              <a
                href="https://vercel.com/vicnavrob-coder/hispanos-suiza/analytics"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                <span>→</span> Abrir Vercel Analytics
              </a>
              <a
                href="https://vercel.com/vicnavrob-coder/hispanos-suiza/speed-insights"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                <span>→</span> Speed Insights (Core Web Vitals)
              </a>
            </div>
          </div>
        </div>

        {/* ── Estado del sistema ── */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="font-bold text-white mb-4">Estado del sistema</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {health.map((h) => (
              <div
                key={h.name}
                className={`flex items-center gap-3 rounded-xl p-4 border ${
                  h.ok
                    ? "bg-green-900/20 border-green-800/50"
                    : "bg-red-900/20 border-red-800/50"
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${h.ok ? "bg-green-400" : "bg-red-400"}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">{h.name}</div>
                  <div className={`text-xs ${h.ok ? "text-green-400" : "text-red-400"}`}>
                    {h.ok ? `OK · ${h.ms}ms` : `Error · ${h.ms}ms`}
                  </div>
                </div>
              </div>
            ))}
            {/* Env vars */}
            {[
              { name: "Brevo API Key", ok: !!BREVO_KEY },
              { name: "GA4 ID",        ok: !!gaId },
              { name: "Admin Secret",  ok: !!ADMIN_SECRET },
            ].map((v) => (
              <div
                key={v.name}
                className={`flex items-center gap-3 rounded-xl p-4 border ${
                  v.ok ? "bg-green-900/20 border-green-800/50" : "bg-amber-900/20 border-amber-800/50"
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${v.ok ? "bg-green-400" : "bg-amber-400"}`} />
                <div>
                  <div className="text-sm font-medium text-white">{v.name}</div>
                  <div className={`text-xs ${v.ok ? "text-green-400" : "text-amber-400"}`}>
                    {v.ok ? "configurado" : "no configurado"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Links rápidos ── */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="font-bold text-white mb-4">Accesos rápidos</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Ver web",         url: BASE_URL,                             icon: "🌐" },
              { label: "GitHub repo",     url: "https://github.com/vicnavrob-coder/hispanos-suiza", icon: "📦" },
              { label: "Vercel deploys",  url: "https://vercel.com/vicnavrob-coder/hispanos-suiza/deployments", icon: "🚀" },
              { label: "Brevo contacts",  url: "https://app.brevo.com/contact/list", icon: "📧" },
              { label: "GSC",             url: "https://search.google.com/search-console", icon: "🔍" },
              { label: "GA4",             url: "https://analytics.google.com",       icon: "📈" },
              { label: "priminfo.admin",  url: "https://www.priminfo.admin.ch",       icon: "🛡️" },
              { label: "Sitemap",         url: `${BASE_URL}/sitemap.xml`,            icon: "🗺️" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-300 hover:text-white transition-colors"
              >
                <span>{l.icon}</span>
                <span className="truncate">{l.label}</span>
              </a>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-gray-700 pb-4">
          HispanosEnSuiza Admin · actualizado {now} · <a href="/admin" className="hover:text-gray-500">cerrar sesión</a>
        </p>
      </div>
    </div>
  );
}
