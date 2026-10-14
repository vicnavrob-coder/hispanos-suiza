import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || process.env.CRON_SECRET || 'hispanos-admin-2026'
const BREVO_API_KEY = process.env.BREVO_API_KEY || ''
const BREVO_LIST_ID = process.env.BREVO_LIST_ID || '2'

interface BrevoContact {
  email: string
  createdAt?: string
  emailBlacklisted?: boolean
  attributes?: Record<string, string | number | undefined>
}

async function getContacts(): Promise<BrevoContact[]> {
  const contacts: BrevoContact[] = []
  let offset = 0
  while (true) {
    const res = await fetch(
      `https://api.brevo.com/v3/contacts?listIds=${BREVO_LIST_ID}&limit=100&offset=${offset}&sort=desc`,
      { headers: { 'api-key': BREVO_API_KEY }, next: { revalidate: 120 } }
    )
    const data = await res.json()
    const batch: BrevoContact[] = data.contacts || []
    contacts.push(...batch)
    if (batch.length < 100 || contacts.length >= 500) break
    offset += 100
  }
  return contacts
}

async function getListInfo() {
  const res = await fetch(
    `https://api.brevo.com/v3/contacts/lists/${BREVO_LIST_ID}`,
    { headers: { 'api-key': BREVO_API_KEY }, next: { revalidate: 120 } }
  )
  return res.json()
}

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
    } catch {}
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

  const [contacts, listInfo] = await Promise.all([getContacts(), getListInfo()])

  const now = new Date().toLocaleString('es-ES', { timeZone: 'Europe/Zurich' })
  const total = contacts.length
  const stepDist: Record<number, number> = {}
  for (const c of contacts) {
    const s = Number(c.attributes?.WELCOME_STEP || 0)
    stepDist[s] = (stepDist[s] || 0) + 1
  }
  const completed = stepDist[5] || 0
  const inProgress = Object.entries(stepDist).filter(([k]) => Number(k) > 0 && Number(k) < 5).reduce((a, [, v]) => a + v, 0)
  const notStarted = stepDist[0] || 0

  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Admin · HispanosEnSuiza</title>
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                 background: #f1f5f9; color: #1e293b; font-size: 14px; }
          .header { background: linear-gradient(135deg, #c8102e 0%, #0032a0 100%);
                    color: white; padding: 16px 20px; }
          .header h1 { font-size: 18px; font-weight: 700; }
          .header .ts { font-size: 11px; opacity: 0.75; margin-top: 2px; }
          .container { max-width: 900px; margin: 0 auto; padding: 16px; }
          .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 16px; }
          .stat { background: white; border-radius: 10px; padding: 12px 14px;
                  box-shadow: 0 1px 3px rgba(0,0,0,.06); text-align: center; }
          .stat-val { font-size: 28px; font-weight: 800; }
          .stat-lbl { font-size: 11px; color: #94a3b8; margin-top: 2px; }
          table { width: 100%; border-collapse: collapse; background: white; border-radius: 10px;
                  overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,.06); }
          th { background: #f8fafc; padding: 9px 12px; text-align: left; font-size: 10px;
               color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: .5px;
               border-bottom: 1px solid #e2e8f0; }
          td { padding: 9px 12px; border-top: 1px solid #f1f5f9; font-size: 12px;
               overflow: hidden; text-overflow: ellipsis; }
          tr:hover td { background: #f8fafc; }
          @media (max-width: 600px) {
            .stats { grid-template-columns: repeat(2, 1fr); }
            .hide-mobile { display: none; }
          }
        `}</style>
      </head>
      <body>
        <div className="header">
          <h1>🇨🇭 HispanosEnSuiza — Admin</h1>
          <div className="ts">Actualizado: {now} · {total} suscriptores</div>
        </div>
        <div className="container">
          <div className="stats">
            <div className="stat">
              <div className="stat-val" style={{ color: '#6366f1' }}>{total}</div>
              <div className="stat-lbl">Total</div>
            </div>
            <div className="stat">
              <div className="stat-val" style={{ color: '#3b82f6' }}>{inProgress}</div>
              <div className="stat-lbl">En secuencia</div>
            </div>
            <div className="stat">
              <div className="stat-val" style={{ color: '#16a34a' }}>{completed}</div>
              <div className="stat-lbl">Completados</div>
            </div>
            <div className="stat">
              <div className="stat-val" style={{ color: '#94a3b8' }}>{notStarted}</div>
              <div className="stat-lbl">Sin iniciar</div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th className="hide-mobile">Nombre</th>
                <th className="hide-mobile">País</th>
                <th>Registro</th>
                <th>Emails (1→5)</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => {
                const attrs = c.attributes || {}
                const nombre = (attrs.NOMBRE as string) || '—'
                const pais = (attrs.PAIS as string) || '—'
                const step = Number(attrs.WELCOME_STEP || 0)
                const start = (attrs.WELCOME_START as string) || ''
                const created = (c.createdAt || '').slice(0, 10)
                const blocked = c.emailBlacklisted ? ' 🚫' : ''
                return (
                  <tr key={c.email}>
                    <td style={{ maxWidth: 180 }}>{c.email}{blocked}</td>
                    <td className="hide-mobile">{nombre}</td>
                    <td className="hide-mobile">{pais}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>{created}</td>
                    <td dangerouslySetInnerHTML={{ __html: emailDots(step, start) }} />
                  </tr>
                )
              })}
            </tbody>
          </table>

          <div style={{ marginTop: 12, fontSize: 11, color: '#94a3b8', textAlign: 'center' }}>
            ● enviado &nbsp; ◌ próximo &nbsp; ○ pendiente &nbsp;·&nbsp; se actualiza cada 2 min
          </div>
        </div>
      </body>
    </html>
  )
}
