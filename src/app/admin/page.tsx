import { redirect } from 'next/navigation'
import { getSubscribers, type Subscriber } from '@/lib/subscribers'
import { getCitas } from '@/lib/unia-citas'

export const metadata = {
  title: 'Admin · HispanosEnSuiza',
  robots: { index: false, follow: false },
}

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || process.env.CRON_SECRET || 'hispanos-admin-2026'

function emailDots(step: number, startStr: string) {
  const steps = [
    { n: 1, label: 'Bienvenida', day: 0 },
    { n: 2, label: 'Día 3', day: 3 },
    { n: 3, label: 'Día 7', day: 7 },
    { n: 4, label: 'Día 14', day: 14 },
    { n: 5, label: 'Día 21', day: 21 },
  ]

  let nextInfo = ''
  if (step >= 5) {
    nextInfo = '<span style="color:#16a34a;font-size:11px;font-weight:700">✓ completo</span>'
  } else if (startStr) {
    try {
      const start = new Date(startStr.slice(0, 10))
      const next = steps[step]
      const nextDate = new Date(start)
      nextDate.setDate(nextDate.getDate() + next.day)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const diff = Math.round((nextDate.getTime() - today.getTime()) / 86400000)
      if (diff > 0) nextInfo = `<span style="color:#94a3b8;font-size:11px">→ ${next.label} en ${diff}d</span>`
      else if (diff === 0) nextInfo = `<span style="color:#f59e0b;font-size:11px;font-weight:700">→ HOY</span>`
      else nextInfo = `<span style="color:#ef4444;font-size:11px">→ pendiente</span>`
    } catch { /* ignore */ }
  }

  const dots = steps.map(s => {
    if (s.n <= step)
      return `<span title="${s.label} ✓" style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#6366f1;margin-right:2px"></span>`
    if (s.n === step + 1)
      return `<span title="${s.label} próximo" style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#c7d2fe;border:2px solid #6366f1;margin-right:2px"></span>`
    return `<span title="${s.label}" style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#e2e8f0;margin-right:2px"></span>`
  }).join('')

  return `<div style="display:flex;align-items:center;gap:4px;flex-wrap:wrap">${dots}<span style="font-size:11px;color:#64748b">${step}/5</span> ${nextInfo}</div>`
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const params = await searchParams
  if (params.token !== ADMIN_TOKEN) {
    redirect('/admin?token=')
  }

  const contacts = (await getSubscribers()) ?? []
  const citas = (await getCitas()) ?? []

  const now = new Date().toLocaleString('es-ES', { timeZone: 'Europe/Zurich' })

  // UNIA stats
  const citasStats = {
    total: citas.length,
    pendientes: citas.filter(c => c.status === 'solicitud').length,
    propuestas: citas.filter(c => c.status === 'propuesta').length,
    confirmadas: citas.filter(c => c.status === 'confirmada').length,
  }
  const total = contacts.length
  const stepDist: Record<number, number> = {}
  for (const c of contacts) {
    stepDist[c.welcomeStep] = (stepDist[c.welcomeStep] || 0) + 1
  }
  const completed = stepDist[5] || 0
  const inProgress = Object.entries(stepDist).filter(([k]) => Number(k) > 0 && Number(k) < 5).reduce((a, [, v]) => a + v, 0)
  const notStarted = stepDist[0] || 0

  const styles = `
    .admin-page { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f1f5f9; color: #1e293b; font-size: 14px; min-height: 100vh; }
    .admin-header { background: linear-gradient(135deg, #c8102e 0%, #0032a0 100%); color: white; padding: 16px 20px; }
    .admin-header h1 { font-size: 18px; font-weight: 700; margin: 0; }
    .admin-header .ts { font-size: 11px; opacity: 0.75; margin-top: 2px; }
    .admin-container { max-width: 900px; margin: 0 auto; padding: 16px; }
    .admin-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 16px; }
    .admin-stat { background: white; border-radius: 10px; padding: 12px 14px; box-shadow: 0 1px 3px rgba(0,0,0,.06); text-align: center; }
    .admin-stat-val { font-size: 28px; font-weight: 800; }
    .admin-stat-lbl { font-size: 11px; color: #94a3b8; margin-top: 2px; }
    .admin-badge { display:inline-block;padding:3px 8px;border-radius:20px;font-size:10px;font-weight:700;background:#dcfce7;color:#166534; }
    .admin-table { width: 100%; border-collapse: collapse; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,.06); }
    .admin-table th { background: #f8fafc; padding: 9px 12px; text-align: left; font-size: 10px; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: .5px; border-bottom: 1px solid #e2e8f0; }
    .admin-table td { padding: 9px 12px; border-top: 1px solid #f1f5f9; font-size: 12px; overflow: hidden; text-overflow: ellipsis; }
    .admin-table tr:hover td { background: #f8fafc; }
    @media (max-width: 600px) {
      .admin-stats { grid-template-columns: repeat(2, 1fr); }
      .hide-mobile { display: none; }
    }
  `

  return (
    <div className="admin-page">
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="admin-header">
        <h1>🇨🇭 HispanosEnSuiza — Admin</h1>
        <div className="ts">Actualizado: {now} · {total} suscriptores · <span className="admin-badge">Gmail directo</span></div>
      </div>
      <div className="admin-container">
        {/* UNIA Citas Panel */}
        <a href={`/admin/citas?token=${ADMIN_TOKEN}`} style={{ textDecoration: 'none' }}>
          <div style={{
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            borderRadius: 12,
            padding: '14px 18px',
            marginBottom: 16,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid #fcd34d',
            cursor: 'pointer',
          }}>
            <div>
              <div style={{ fontWeight: 700, color: '#92400e', fontSize: 14 }}>⚖️ Citas UNIA</div>
              <div style={{ fontSize: 12, color: '#a16207', marginTop: 2 }}>
                {citasStats.pendientes > 0 && <span style={{ fontWeight: 700 }}>{citasStats.pendientes} pendientes · </span>}
                {citasStats.propuestas > 0 && <span>{citasStats.propuestas} esperando usuario · </span>}
                {citasStats.confirmadas > 0 && <span style={{ color: '#166534' }}>{citasStats.confirmadas} confirmadas</span>}
                {citasStats.total === 0 && <span>Sin citas todavía</span>}
              </div>
            </div>
            <div style={{
              background: '#92400e',
              color: 'white',
              padding: '6px 12px',
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 700
            }}>
              Ver todas ({citasStats.total}) →
            </div>
          </div>
        </a>

        <div className="admin-stats">
          <div className="admin-stat">
            <div className="admin-stat-val" style={{ color: '#6366f1' }}>{total}</div>
            <div className="admin-stat-lbl">Total</div>
          </div>
          <div className="admin-stat">
            <div className="admin-stat-val" style={{ color: '#3b82f6' }}>{inProgress}</div>
            <div className="admin-stat-lbl">En secuencia</div>
          </div>
          <div className="admin-stat">
            <div className="admin-stat-val" style={{ color: '#16a34a' }}>{completed}</div>
            <div className="admin-stat-lbl">Completados</div>
          </div>
          <div className="admin-stat">
            <div className="admin-stat-val" style={{ color: '#94a3b8' }}>{notStarted}</div>
            <div className="admin-stat-lbl">Sin iniciar</div>
          </div>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Email</th>
              <th className="hide-mobile">Nombre</th>
              <th>Registro</th>
              <th>Emails (1→5)</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c: Subscriber) => {
              const blocked = c.blacklisted ? ' 🚫' : ''
              return (
                <tr key={c.email}>
                  <td style={{ maxWidth: 200 }}>{c.email}{blocked}</td>
                  <td className="hide-mobile">{c.nombre || '—'}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>{c.createdAt?.slice(0, 10) || '—'}</td>
                  <td dangerouslySetInnerHTML={{ __html: emailDots(c.welcomeStep, c.welcomeStart) }} />
                </tr>
              )
            })}
          </tbody>
        </table>

        <div style={{ marginTop: 12, fontSize: 11, color: '#94a3b8', textAlign: 'center' }}>
          ● enviado &nbsp; ◌ próximo &nbsp; ○ pendiente &nbsp;·&nbsp; Almacenamiento: GitHub Gist · Envíos: Gmail SMTP
        </div>
      </div>
    </div>
  )
}
