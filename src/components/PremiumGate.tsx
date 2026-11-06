"use client";

import { useSession } from "next-auth/react";
import { ReactNode, useState } from "react";
import Link from "next/link";

interface PremiumGateProps {
  children: ReactNode;
  featureName: string;
  premiumBenefits?: string[];
  fallback?: ReactNode;
}

/**
 * Component to gate premium features
 * Shows premium upgrade modal if user is not premium
 */
export default function PremiumGate({
  children,
  featureName,
  premiumBenefits = [],
  fallback,
}: PremiumGateProps) {
  const { data: session, status } = useSession();
  const [showModal, setShowModal] = useState(false);

  // Loading state
  if (status === "loading") {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Not logged in
  if (!session) {
    return (
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl p-8 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Regístrate para usar esta función
          </h3>
          <p className="text-gray-600 mb-6">
            Crea una cuenta gratis para acceder a {featureName}
          </p>
          <Link
            href="/auth/signin"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Crear cuenta gratis
          </Link>
        </div>
      </div>
    );
  }

  // Logged in but not premium
  if (!session.user.isPremium) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <>
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-8">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
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
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Función Premium: {featureName}
              </h3>
              <p className="text-gray-700 mb-4">
                Upgrade a Premium por solo <span className="font-bold text-amber-600">2,99 CHF/mes</span> para desbloquear:
              </p>
              <ul className="space-y-2 mb-6">
                {premiumBenefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2">
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
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
                <li className="flex items-start gap-2">
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
                  <span className="text-gray-700">
                    Acceso a todas las herramientas premium
                  </span>
                </li>
                <li className="flex items-start gap-2">
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
                  <span className="text-gray-700">CVs ilimitados</span>
                </li>
                <li className="flex items-start gap-2">
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
                  <span className="text-gray-700">Soporte prioritario</span>
                </li>
              </ul>
              <button
                onClick={() => setShowModal(true)}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-lg font-bold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl"
              >
                Upgrade a Premium - 2,99 CHF/mes
              </button>
              <p className="text-sm text-gray-500 mt-3">
                Cancela cuando quieras. Ahorro potencial: +5.000 CHF/año
              </p>
            </div>
          </div>
        </div>

        {/* Premium Upgrade Modal */}
        {showModal && (
          <PremiumUpgradeModal
            onClose={() => setShowModal(false)}
            userEmail={session.user.email}
            userName={session.user.name || ""}
          />
        )}
      </>
    );
  }

  // User is premium, show the premium feature
  return <>{children}</>;
}

/**
 * Modal to upgrade to premium
 */
function PremiumUpgradeModal({
  onClose,
  userEmail,
  userName,
}: {
  onClose: () => void;
  userEmail: string;
  userName: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          nombre: userName,
          plan: "premium",
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Error creating checkout:", error);
      alert("Error al procesar el pago. Por favor, inténtalo de nuevo.");
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-8 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-white"
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Plan Premium
          </h2>
          <p className="text-5xl font-bold text-amber-600 mb-2">
            2,99 CHF<span className="text-2xl text-gray-500">/mes</span>
          </p>
          <p className="text-gray-600">
            Ahorra hasta 10.500 CHF/año con nuestras herramientas premium
          </p>
        </div>

        <div className="space-y-3 mb-8">
          {[
            "Comparadores multi-cantón y multi-ciudad",
            "Gráficos visuales y análisis avanzados",
            "Exportar informes PDF ilimitados",
            "Histórico y guardado de cálculos",
            "Alertas y notificaciones personalizadas",
            "Búsquedas ilimitadas en todas las herramientas",
            "CVs ilimitados (ahorra 6,99 CHF por CV)",
            "Consejos personalizados de ahorro fiscal",
            "Soporte prioritario",
          ].map((feature, i) => (
            <div key={i} className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5"
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
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>

        <button
          onClick={handleUpgrade}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Procesando..." : "Suscribirme a Premium"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Pago seguro con Stripe • Cancela cuando quieras • ROI: 292x
        </p>
      </div>
    </div>
  );
}
