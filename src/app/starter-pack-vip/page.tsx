import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import StarterPackForm from "@/components/StarterPackForm";

// Force dynamic rendering to bypass Vercel cache
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = buildMetadata({
  title: "Suiza Starter Pack — Llega a Suiza con Todo Resuelto",
  description: "Tu primer mes en Suiza sin estrés: alojamiento garantizado 30 días + acompañamiento ETT + kit llegada completo. Solo 2.890 CHF todo incluido. Programa intensivo para españoles y latinos.",
  path: "/starter-pack-vip",
  keywords: [
    "paquete relocation suiza",
    "mudarse a suiza con ayuda",
    "alojamiento primer mes suiza",
    "acompañamiento ett suiza",
    "llegada suiza españoles",
    "programa starter suiza",
    "relocation package switzerland",
    "ayuda emigrar suiza",
    "vivienda temporal suiza",
    "encontrar trabajo suiza rapido",
  ],
});

export default function SuizaStarterPackPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1920&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Solo 2 plazas disponibles por mes
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Llega a Suiza con <span className="text-yellow-300">Todo Resuelto</span>
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 mb-8 leading-relaxed">
              Tu primer mes en Suiza: alojamiento garantizado + trabajo + comunidad.
              Olvídate del estrés de llegar solo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#reservar"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg bg-yellow-400 text-blue-900 hover:bg-yellow-300 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Reservar Mi Plaza
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="#que-incluye"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all border border-white/20"
              >
                Ver Qué Incluye
              </a>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Alojamiento garantizado</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Soporte 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Garantía 15 días</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problema Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              ¿Vienes a Suiza sin saber por dónde empezar?
            </h2>
            <p className="text-xl text-slate-600">
              Llegar a un país nuevo es estresante. Nosotros lo simplificamos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-red-50 border border-red-100 rounded-xl p-6">
              <div className="text-4xl mb-4">😰</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Sin alojamiento al llegar
              </h3>
              <p className="text-slate-600">
                Hostels temporales caros (60-80 CHF/noche) mientras buscas piso.
                En 1 mes: 1.800-2.400 CHF tirados.
              </p>
            </div>

            <div className="bg-red-50 border border-red-100 rounded-xl p-6">
              <div className="text-4xl mb-4">🤷‍♂️</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                No sabes cómo funcionan las ETT
              </h3>
              <p className="text-slate-600">
                ¿A cuáles ir? ¿Qué decir en la entrevista? ¿Qué documentos llevar?
                Pierdes semanas probando.
              </p>
            </div>

            <div className="bg-red-50 border border-red-100 rounded-xl p-6">
              <div className="text-4xl mb-4">😣</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Sin red de contactos
              </h3>
              <p className="text-slate-600">
                Trámites, registro, cuenta bancaria, médico... Todo solo,
                sin ayuda, sin saber alemán.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solución Section */}
      <section id="que-incluye" className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Suiza Starter Pack
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Todo lo que necesitas para empezar bien
            </h2>
            <p className="text-xl text-slate-600 mb-6">
              Valor real: <span className="line-through">4.500+ CHF</span>
            </p>
            <p className="text-5xl font-bold text-blue-600">
              2.890 CHF
            </p>
            <p className="text-slate-500 mt-2">Todo incluido, sin sorpresas</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Alojamiento */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-blue-100 rounded-full p-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    🏠 Alojamiento Primera Base
                  </h3>
                  <p className="text-blue-600 font-semibold mb-3">Valor: 900 CHF</p>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>30 días habitación individual garantizada</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Zona Luzern/Hochdorf con transporte público</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Wifi, servicios básicos incluidos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Check-in asistido primer día</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Kit Llegada */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-green-100 rounded-full p-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    ✅ Kit Llegada Suiza
                  </h3>
                  <p className="text-blue-600 font-semibold mb-3">Valor: 500 CHF</p>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Acompañamiento registro comunal (Anmeldung)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Apertura cuenta bancaria suiza</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Tarjeta transporte 1 mes (incluida)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Número móvil suizo prepago</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Sesión orientación ciudad</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Preparación Laboral */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-purple-100 rounded-full p-3">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    💼 Preparación Laboral Pro
                  </h3>
                  <p className="text-blue-600 font-semibold mb-3">Valor: 800 CHF</p>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Análisis perfil y estrategia personalizada</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>CV formato suizo (alemán + francés)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Carta presentación adaptada</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Traducción certificados (hasta 3 docs)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>LinkedIn optimizado mercado suizo</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Acompañamiento ETT */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-orange-100 rounded-full p-3">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    🤝 Acompañamiento ETT Presencial
                  </h3>
                  <p className="text-blue-600 font-semibold mb-3">Valor: 600 CHF</p>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Agenda de 3 citas con ETT principales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Te acompaño personalmente a las 3 entrevistas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Briefing pre-entrevista (qué decir, qué no)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Follow-up con las ETT después</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Soporte Comunidad */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 lg:col-span-2">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-pink-100 rounded-full p-3">
                  <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    💬 Soporte Comunidad
                  </h3>
                  <p className="text-blue-600 font-semibold mb-3">Valor: 300 CHF</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <ul className="space-y-2 text-slate-600">
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Grupo WhatsApp privado 24/7 primer mes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Acceso comunidad HispanosEnSuiza Premium</span>
                      </li>
                    </ul>
                    <ul className="space-y-2 text-slate-600">
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>1 videollamada semanal seguimiento (4 sesiones)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Contactos: médicos, dentistas, landlords</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bonus */}
          <div className="max-w-4xl mx-auto mt-8">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-8">
              <div className="text-center">
                <div className="inline-block bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold mb-4">
                  🎁 BONUS INCLUIDO
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Alemán Supervivencia
                </h3>
                <div className="grid sm:grid-cols-3 gap-4 text-slate-700">
                  <div>✅ Guía PDF frases esenciales</div>
                  <div>✅ Audio pronunciación 100 frases</div>
                  <div>✅ App recomendaciones</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Cómo funciona
            </h2>
            <p className="text-xl text-slate-600">
              Simple, rápido y sin sorpresas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 font-bold text-2xl mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Reservas tu plaza
              </h3>
              <p className="text-slate-600">
                Pago señal 500 CHF. Te confirmo fecha llegada y envío checklist preparación.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 font-bold text-2xl mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Llegas día acordado
              </h3>
              <p className="text-slate-600">
                Te recojo en estación Luzern. Check-in alojamiento. Primera orientación ciudad.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 font-bold text-2xl mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                7 días después
              </h3>
              <p className="text-slate-600">
                Ya estás registrado, con cuenta bancaria, y en entrevistas ETT. Todo en marcha.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Preguntas frecuentes
            </h2>
          </div>

          <div className="space-y-4">
            <details className="group bg-white rounded-lg shadow-sm border border-slate-200">
              <summary className="flex justify-between items-center p-6 cursor-pointer font-semibold text-slate-900">
                ¿Qué pasa si no encuentro trabajo en el primer mes?
                <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-6 text-slate-600">
                El paquete NO garantiza trabajo, solo acompañamiento profesional a 3 ETT principales.
                Nuestra experiencia: 85% consigue entrevistas en primeras 2 semanas. Si quieres quedarte mes 2
                podemos negociar alojamiento con descuento (300 CHF más barato).
              </div>
            </details>

            <details className="group bg-white rounded-lg shadow-sm border border-slate-200">
              <summary className="flex justify-between items-center p-6 cursor-pointer font-semibold text-slate-900">
                ¿Puedo quedarme más de 1 mes en el alojamiento?
                <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-6 text-slate-600">
                Sí, si hay disponibilidad. Mes 2+: 600 CHF/mes (precio especial para clientes del pack).
                La mayoría encuentra piso propio o alojamiento de trabajo antes del mes 2.
              </div>
            </details>

            <details className="group bg-white rounded-lg shadow-sm border border-slate-200">
              <summary className="flex justify-between items-center p-6 cursor-pointer font-semibold text-slate-900">
                ¿Funciona para mi sector? (hostelería/limpieza/industria)
                <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-6 text-slate-600">
                El pack funciona mejor para: hostelería, limpieza, almacén/logística, construcción, cuidado personas.
                Si vienes para sector cualificado (IT, finanzas, etc.) el pack también sirve pero el proceso es más largo.
              </div>
            </details>

            <details className="group bg-white rounded-lg shadow-sm border border-slate-200">
              <summary className="flex justify-between items-center p-6 cursor-pointer font-semibold text-slate-900">
                ¿Qué pasa si cancelo?
                <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-6 text-slate-600">
                Cancelación 15+ días antes: reembolso 70%. Cancelación 7-14 días: reembolso 30%.
                Cancelación menos de 7 días: sin reembolso (costes ya comprometidos).
                Garantía satisfacción: 15 días para pedir reembolso 70% si no estás contento.
              </div>
            </details>

            <details className="group bg-white rounded-lg shadow-sm border border-slate-200">
              <summary className="flex justify-between items-center p-6 cursor-pointer font-semibold text-slate-900">
                ¿Incluye el seguro médico obligatorio?
                <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-6 text-slate-600">
                NO incluido. El seguro médico es obligatorio en Suiza (270-350 CHF/mes según cantón y franquicia).
                Te ayudamos a contratarlo el primer día y te recomendamos las opciones más baratas.
              </div>
            </details>

            <details className="group bg-white rounded-lg shadow-sm border border-slate-200">
              <summary className="flex justify-between items-center p-6 cursor-pointer font-semibold text-slate-900">
                ¿Necesito hablar alemán?
                <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-6 text-slate-600">
                NO es obligatorio para la mayoría de trabajos iniciales (hostelería, limpieza, almacén).
                Incluimos bonus alemán supervivencia con 100 frases esenciales. Ayuda mucho pero no imprescindible al principio.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Final con Formulario */}
      <section id="reservar" className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Solo 2 plazas disponibles por mes
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Reserva Tu Plaza Ahora
            </h2>
            <p className="text-xl text-blue-100 mb-2">
              Inversión total: <span className="text-3xl font-bold text-yellow-300">2.890 CHF</span>
            </p>
            <p className="text-blue-200">
              Pago inicial 500 CHF (señal) + 2.390 CHF antes de llegar
            </p>
          </div>

          <StarterPackForm />

          <div className="mt-8 text-center text-sm text-blue-200">
            <p>
              Al enviar el formulario aceptas nuestros{" "}
              <Link href="/starter-pack-vip/terminos" className="underline hover:text-white">
                términos y condiciones
              </Link>
              .
            </p>
            <p className="mt-2">
              🔒 Pago seguro con Stripe. Garantía 15 días satisfacción.
            </p>
          </div>
        </div>
      </section>

      {/* Footer simple */}
      <section className="py-8 bg-slate-900 text-slate-400 text-center text-sm">
        <div className="max-w-7xl mx-auto px-4">
          <p>
            ¿Dudas? Escríbenos: <a href="mailto:contacto@hispanosensuiza.com" className="text-blue-400 hover:text-blue-300">contacto@hispanosensuiza.com</a>
          </p>
          <p className="mt-2">
            <Link href="/" className="hover:text-white">← Volver a HispanosEnSuiza</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
