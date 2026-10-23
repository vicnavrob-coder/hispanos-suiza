'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ChecklistPage() {
  const [email, setEmail] = useState('')
  const [nombre, setNombre] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, nombre }),
      })

      if (res.ok) {
        setSuccess(true)
        // Abrir PDF en nueva pestaña
        window.open('/checklist-emigrar-suiza.pdf', '_blank')
      } else {
        setError('Error al procesar. Intenta de nuevo.')
      }
    } catch {
      setError('Error de conexion. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="bg-green-50 border border-green-200 rounded-2xl p-8 mb-8">
            <div className="text-5xl mb-4">✅</div>
            <h1 className="text-2xl font-bold text-green-800 mb-3">
              ¡Descarga lista!
            </h1>
            <p className="text-green-700 mb-6">
              Tu checklist se ha abierto en una nueva pestaña. Si no se abrio,{' '}
              <a
                href="/checklist-emigrar-suiza.pdf"
                className="underline font-semibold"
                target="_blank"
              >
                haz clic aqui
              </a>.
            </p>
            <p className="text-sm text-green-600">
              Tambien te hemos enviado un email de bienvenida con mas recursos.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="font-bold text-slate-800 mb-4">Siguientes pasos:</h2>
            <div className="space-y-3 text-left">
              <Link
                href="/herramientas/salario-neto"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition"
              >
                <span className="text-2xl">💰</span>
                <div>
                  <div className="font-semibold text-slate-800">Calcula tu salario neto</div>
                  <div className="text-sm text-slate-500">Descubre cuanto ganaras en Suiza</div>
                </div>
              </Link>
              <Link
                href="/trabajo"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition"
              >
                <span className="text-2xl">🔍</span>
                <div>
                  <div className="font-semibold text-slate-800">Busca empleo ahora</div>
                  <div className="text-sm text-slate-500">7 portales de trabajo en una busqueda</div>
                </div>
              </Link>
              <Link
                href="/herramientas/seguros-medicos"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition"
              >
                <span className="text-2xl">🏥</span>
                <div>
                  <div className="font-semibold text-slate-800">Compara seguros medicos</div>
                  <div className="text-sm text-slate-500">Encuentra el mejor precio para ti</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-block bg-red-100 text-red-700 text-sm font-semibold px-4 py-1 rounded-full mb-4">
            RECURSO GRATUITO
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Checklist: 50 pasos para emigrar a Suiza
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Todo lo que necesitas hacer antes, durante y despues de mudarte.
            Sin olvidar nada importante.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Contenido del checklist */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <span className="text-xl">📋</span> Que incluye:
            </h2>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>Antes de salir:</strong> documentos, apostillas, presupuesto</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>Busqueda de empleo:</strong> CV suizo, portales, ETTs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>Vivienda:</strong> webs, dossier, fianzas, normas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>Primeros dias:</strong> registro, permisos, banca, seguros</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>Instalacion:</strong> nomina, pensiones, impuestos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>Largo plazo:</strong> permisos C, nacionalizacion</span>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <div className="font-semibold text-amber-800">¿Por que es importante?</div>
                  <div className="text-sm text-amber-700 mt-1">
                    Olvidar un paso puede costarte meses de retrasos o multas.
                    Este checklist te asegura que no dejas nada pendiente.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">📥</div>
              <h2 className="text-xl font-bold mb-2">Descarga gratis</h2>
              <p className="text-blue-100 text-sm">
                Recibe el PDF y consejos semanales para tu mudanza
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg text-slate-800 placeholder-slate-400
                           border-2 border-transparent focus:border-blue-300 outline-none"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Tu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg text-slate-800 placeholder-slate-400
                           border-2 border-transparent focus:border-blue-300 outline-none"
                />
              </div>

              {error && (
                <div className="text-red-200 text-sm text-center">{error}</div>
              )}

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full bg-white text-blue-600 font-bold py-3 px-6 rounded-lg
                         hover:bg-blue-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Procesando...' : 'Descargar checklist gratis'}
              </button>
            </form>

            <p className="text-xs text-blue-200 text-center mt-4">
              Sin spam. Puedes darte de baja cuando quieras.
            </p>
          </div>
        </div>

        {/* Social proof */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm mb-4">
            +85.000 espanoles ya viven en Suiza
          </p>
          <div className="flex justify-center gap-6 text-slate-400">
            <div className="flex items-center gap-2">
              <span>⭐⭐⭐⭐⭐</span>
              <span className="text-sm">Recurso valorado</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
