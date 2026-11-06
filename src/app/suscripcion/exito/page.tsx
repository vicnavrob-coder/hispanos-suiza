"use client";

import { useEffect, useState, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function SuscripcionExitoContent() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    // Dar tiempo al webhook de Stripe para procesar
    const timer = setTimeout(() => {
      setIsVerifying(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (status === "loading" || isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mb-4"></div>
          <p className="text-gray-600 text-lg">Activando tu suscripción Premium...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-6 animate-bounce">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            ¡Bienvenido a Premium! 🎉
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Tu suscripción está activa y lista para usar
          </p>
          {session?.user && (
            <p className="text-sm text-gray-500">
              {session.user.email}
            </p>
          )}
        </div>

        {/* Premium Badge */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-2 border-green-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Plan Premium</h2>
              <p className="text-green-600 font-semibold">2,99 CHF/mes • Activo ahora</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-4">Ya tienes acceso a:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Comparadores multi-cantón (26 cantones)",
                "Comparadores multi-ciudad (16 ciudades)",
                "Gráficos visuales y rankings",
                "Exportar informes PDF ilimitados",
                "Histórico de cálculos guardados",
                "Búsquedas ilimitadas",
                "CVs profesionales ilimitados",
                "Alertas personalizadas",
                "Consejos de optimización fiscal",
                "Soporte prioritario",
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-blue-600 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="flex-1">
                <h4 className="font-bold text-blue-900 mb-1">Ahorro potencial estimado:</h4>
                <p className="text-blue-700 text-sm">
                  Con nuestras herramientas premium puedes ahorrar o ganar hasta{" "}
                  <span className="font-bold">10.500 CHF/año</span>:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-blue-700">
                  <li>• Elegir cantón óptimo: ~1.500 CHF/año</li>
                  <li>• Cambiar seguro médico: ~1.200 CHF/año</li>
                  <li>• Elegir ciudad/barrio adecuado: ~2.000 CHF/año</li>
                  <li>• Negociar mejor salario: ~5.000 CHF (puntual)</li>
                  <li>• Optimización fiscal: ~800 CHF/año</li>
                </ul>
                <p className="mt-2 text-xs text-blue-600">
                  ROI: Inviertes 36 CHF/año, ahorras ~10.500 CHF = 292x retorno
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link
            href="/herramientas/salario-neto"
            className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-green-400 hover:shadow-lg transition-all group"
          >
            <div className="flex items-center gap-4 mb-3">
              <span className="text-3xl">💰</span>
              <h3 className="font-bold text-gray-900 group-hover:text-green-600">
                Comparar 26 cantones
              </h3>
            </div>
            <p className="text-sm text-gray-600">
              Descubre en qué cantón pagas menos impuestos con tu salario
            </p>
          </Link>

          <Link
            href="/herramientas/comparador-ciudades"
            className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-green-400 hover:shadow-lg transition-all group"
          >
            <div className="flex items-center gap-4 mb-3">
              <span className="text-3xl">🏙️</span>
              <h3 className="font-bold text-gray-900 group-hover:text-green-600">
                Comparar ciudades
              </h3>
            </div>
            <p className="text-sm text-gray-600">
              Compara coste de vida en 16 ciudades suizas con desglose completo
            </p>
          </Link>

          <Link
            href="/herramientas/generador-cv"
            className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-green-400 hover:shadow-lg transition-all group"
          >
            <div className="flex items-center gap-4 mb-3">
              <span className="text-3xl">📝</span>
              <h3 className="font-bold text-gray-900 group-hover:text-green-600">
                CVs ilimitados
              </h3>
            </div>
            <p className="text-sm text-gray-600">
              Genera todos los CVs profesionales que necesites sin límites
            </p>
          </Link>

          <Link
            href="/herramientas/comparador-salarios"
            className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-green-400 hover:shadow-lg transition-all group"
          >
            <div className="flex items-center gap-4 mb-3">
              <span className="text-3xl">📊</span>
              <h3 className="font-bold text-gray-900 group-hover:text-green-600">
                Búsquedas ilimitadas
              </h3>
            </div>
            <p className="text-sm text-gray-600">
              Compara salarios de cualquier profesión sin restricciones
            </p>
          </Link>
        </div>

        {/* Footer Actions */}
        <div className="text-center">
          <Link
            href="/herramientas"
            className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white px-10 py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl mb-4"
          >
            Explorar todas las herramientas Premium →
          </Link>
          <p className="text-sm text-gray-500">
            Tu suscripción se renovará automáticamente cada mes.{" "}
            <Link href="/cuenta" className="text-green-600 hover:underline">
              Gestionar suscripción
            </Link>
          </p>
        </div>

        {/* Session ID for debugging */}
        {sessionId && (
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">
              ID de sesión: {sessionId.substring(0, 20)}...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SuscripcionExitoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mb-4"></div>
          <p className="text-gray-600 text-lg">Cargando...</p>
        </div>
      </div>
    }>
      <SuscripcionExitoContent />
    </Suspense>
  );
}
