"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OAuthStatusPage() {
  const [status, setStatus] = useState<{
    googleConfigured: boolean;
    emailConfigured: boolean;
    nextAuthConfigured: boolean;
    stripeConfigured: boolean;
  } | null>(null);

  useEffect(() => {
    fetch("/api/admin/oauth-status")
      .then((res) => res.json())
      .then(setStatus);
  }, []);

  if (!status) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600">Verificando configuración...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Estado de Configuración OAuth
        </h1>
        <p className="text-gray-600 mb-8">
          Verifica que todo esté configurado correctamente
        </p>

        <div className="space-y-4">
          {/* Google OAuth */}
          <div
            className={`p-6 rounded-xl border-2 ${
              status.googleConfigured
                ? "bg-green-50 border-green-200"
                : "bg-yellow-50 border-yellow-200"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  status.googleConfigured ? "bg-green-500" : "bg-yellow-500"
                }`}
              >
                {status.googleConfigured ? (
                  <svg
                    className="w-6 h-6 text-white"
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
                ) : (
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Google OAuth
                </h2>
                {status.googleConfigured ? (
                  <div>
                    <p className="text-green-700 font-semibold mb-2">
                      ✅ Configurado correctamente
                    </p>
                    <p className="text-sm text-green-600">
                      Los usuarios pueden iniciar sesión con su cuenta de Google
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-yellow-700 font-semibold mb-2">
                      ⚠️ No configurado
                    </p>
                    <p className="text-sm text-yellow-600 mb-3">
                      Necesitas crear credenciales en Google Cloud Console
                    </p>
                    <div className="bg-white rounded-lg p-4 text-sm space-y-2">
                      <p className="font-semibold text-gray-900">
                        Configuración rápida (5 min):
                      </p>
                      <ol className="list-decimal list-inside space-y-1 text-gray-700">
                        <li>
                          Ve a{" "}
                          <a
                            href="https://console.cloud.google.com/apis/credentials"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Google Cloud Console
                          </a>
                        </li>
                        <li>Crea credenciales OAuth 2.0</li>
                        <li>
                          Añade URI: <code className="bg-gray-100 px-1 rounded">https://hispanosensuiza.ch/api/auth/callback/google</code>
                        </li>
                        <li>Copia Client ID y Secret a .env.local</li>
                      </ol>
                      <a
                        href="/GOOGLE_OAUTH_SETUP.md"
                        className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Ver guía detallada →
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Email Login */}
          <div
            className={`p-6 rounded-xl border-2 ${
              status.emailConfigured
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  status.emailConfigured ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {status.emailConfigured ? (
                  <svg
                    className="w-6 h-6 text-white"
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
                ) : (
                  <svg
                    className="w-6 h-6 text-white"
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
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Email Passwordless (Magic Link)
                </h2>
                <p
                  className={`font-semibold mb-2 ${
                    status.emailConfigured ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {status.emailConfigured
                    ? "✅ Configurado correctamente"
                    : "❌ Error de configuración"}
                </p>
                <p className="text-sm text-gray-600">
                  Los usuarios pueden recibir enlaces mágicos por email para iniciar sesión
                </p>
              </div>
            </div>
          </div>

          {/* NextAuth */}
          <div
            className={`p-6 rounded-xl border-2 ${
              status.nextAuthConfigured
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  status.nextAuthConfigured ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {status.nextAuthConfigured ? (
                  <svg
                    className="w-6 h-6 text-white"
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
                ) : (
                  <svg
                    className="w-6 h-6 text-white"
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
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  NextAuth Configuration
                </h2>
                <p
                  className={`font-semibold ${
                    status.nextAuthConfigured ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {status.nextAuthConfigured
                    ? "✅ NEXTAUTH_SECRET configurado"
                    : "❌ NEXTAUTH_SECRET falta"}
                </p>
              </div>
            </div>
          </div>

          {/* Stripe */}
          <div
            className={`p-6 rounded-xl border-2 ${
              status.stripeConfigured
                ? "bg-green-50 border-green-200"
                : "bg-red-50 border-red-200"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  status.stripeConfigured ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {status.stripeConfigured ? (
                  <svg
                    className="w-6 h-6 text-white"
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
                ) : (
                  <svg
                    className="w-6 h-6 text-white"
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
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Stripe Premium
                </h2>
                <p
                  className={`font-semibold ${
                    status.stripeConfigured ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {status.stripeConfigured
                    ? "✅ Suscripción Premium configurada"
                    : "❌ Falta configuración de Stripe"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-8 bg-white rounded-xl border-2 border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Resumen del Sistema
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Login con Google:</span>
              <span
                className={
                  status.googleConfigured
                    ? "text-green-600 font-semibold"
                    : "text-yellow-600 font-semibold"
                }
              >
                {status.googleConfigured ? "Funcional ✅" : "Opcional ⚠️"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Login con Email:</span>
              <span
                className={
                  status.emailConfigured
                    ? "text-green-600 font-semibold"
                    : "text-red-600 font-semibold"
                }
              >
                {status.emailConfigured ? "Funcional ✅" : "Error ❌"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Suscripciones Premium:</span>
              <span
                className={
                  status.stripeConfigured
                    ? "text-green-600 font-semibold"
                    : "text-red-600 font-semibold"
                }
              >
                {status.stripeConfigured ? "Funcional ✅" : "Error ❌"}
              </span>
            </div>
          </div>

          {status.emailConfigured && status.stripeConfigured && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-green-700 font-semibold">
                ✅ El sistema freemium está funcional
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {status.googleConfigured
                  ? "Login con Google y Email funcionan perfectamente"
                  : "Login con Email funciona. Google OAuth es opcional."}
              </p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex gap-4">
          <Link
            href="/auth/signin"
            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
          >
            Probar Login →
          </Link>
          <a
            href="https://console.cloud.google.com/apis/credentials"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
          >
            Google Cloud Console ↗
          </a>
        </div>
      </div>
    </div>
  );
}
