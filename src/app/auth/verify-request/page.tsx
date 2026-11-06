import Link from "next/link";

export default function VerifyRequestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6">
            <svg
              className="h-12 w-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            ¡Revisa tu email!
          </h2>

          <p className="text-gray-600 mb-6">
            Te hemos enviado un enlace mágico para iniciar sesión.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              Haz clic en el enlace que hemos enviado a tu correo para acceder a tu cuenta.
              El enlace es válido por 24 horas.
            </p>
          </div>

          <div className="space-y-3 text-sm text-gray-600">
            <p>¿No has recibido el email?</p>
            <ul className="list-disc list-inside text-left max-w-xs mx-auto space-y-1">
              <li>Revisa tu carpeta de spam</li>
              <li>Comprueba que el email es correcto</li>
              <li>Espera unos minutos y vuelve a intentarlo</li>
            </ul>
          </div>

          <div className="mt-8">
            <Link
              href="/herramientas"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              ← Volver a herramientas
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
