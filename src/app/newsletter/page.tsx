import { Metadata } from "next";
import Link from "next/link";
import NewsletterSignupForm from "@/components/NewsletterSignupForm";

export const metadata: Metadata = {
  title: "Newsletter Semanal Gratis - HispanosEnSuiza",
  description:
    "Recibe cada jueves: ofertas de trabajo con salarios reales, historias de hispanos en Suiza, guías prácticas y herramientas gratis. +50 suscriptores activos.",
  openGraph: {
    title: "Newsletter Semanal Gratis - HispanosEnSuiza",
    description:
      "Top 3 empleos + historias reales + guías prácticas. Cada jueves en tu email. Gratis.",
    images: ["/og-newsletter.jpg"],
  },
};

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="text-xl font-bold text-red-700 hover:text-red-800"
          >
            🇨🇭 HispanosEnSuiza
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-4xl">
          {/* Badge */}
          <div className="mb-6 text-center">
            <span className="inline-flex items-center rounded-full bg-red-100 px-4 py-1.5 text-sm font-medium text-red-800">
              📧 Nuevo: Newsletter Semanal
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-6 text-center text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
            Recibe lo mejor de Suiza
            <br />
            <span className="text-red-700">cada jueves en tu email</span>
          </h1>

          {/* Subtitle */}
          <p className="mb-12 text-center text-xl text-gray-600 md:text-2xl">
            Ofertas de trabajo, historias reales, guías prácticas y
            herramientas. Todo gratis, sin spam.
          </p>

          {/* Main Card */}
          <div className="mb-12 overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Benefits Section */}
            <div className="border-b border-gray-100 bg-gradient-to-br from-red-50 to-white p-8 md:p-12">
              <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
                📬 Cada jueves recibirás:
              </h2>

              <div className="grid gap-6 md:grid-cols-2">
                {/* Benefit 1 */}
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-red-100 text-2xl">
                    💼
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold text-gray-900">
                      Top 3 Ofertas de Trabajo
                    </h3>
                    <p className="text-sm text-gray-600">
                      Empleos reales en Suiza con salarios, ubicación y link
                      directo. Antes que nadie.
                    </p>
                  </div>
                </div>

                {/* Benefit 2 */}
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-yellow-100 text-2xl">
                    📖
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold text-gray-900">
                      Historia de la Comunidad
                    </h3>
                    <p className="text-sm text-gray-600">
                      Experiencias reales de hispanohablantes viviendo en
                      Suiza. Aprende de quienes ya están aquí.
                    </p>
                  </div>
                </div>

                {/* Benefit 3 */}
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                    📝
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold text-gray-900">
                      Artículo del Blog
                    </h3>
                    <p className="text-sm text-gray-600">
                      Guías prácticas sobre impuestos, vivienda, trabajo,
                      salarios. Contenido útil y actualizado.
                    </p>
                  </div>
                </div>

                {/* Benefit 4 */}
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-pink-100 text-2xl">
                    🛠️
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold text-gray-900">
                      Herramienta de la Semana
                    </h3>
                    <p className="text-sm text-gray-600">
                      Calculadoras de salario, generador de CV, comparador de
                      ciudades. Todo gratis.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Signup Form */}
            <div className="bg-white p-8 md:p-12">
              <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
                🎁 Suscríbete Gratis
              </h2>
              <NewsletterSignupForm />
            </div>
          </div>

          {/* Social Proof */}
          <div className="mb-12 text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <div className="flex -space-x-2">
                <div className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-red-400 to-red-600"></div>
                <div className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-blue-400 to-blue-600"></div>
                <div className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-green-400 to-green-600"></div>
                <div className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-yellow-400 to-yellow-600"></div>
              </div>
              <span className="text-sm font-medium text-gray-600">
                +50 hispanohablantes ya suscritos
              </span>
            </div>
            <p className="text-sm text-gray-500">
              🔒 Sin spam. Cancelar cuando quieras con 1 clic.
            </p>
          </div>

          {/* FAQ */}
          <div className="mb-12 rounded-xl bg-white p-8 shadow-lg">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
              ❓ Preguntas Frecuentes
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="mb-2 font-bold text-gray-900">
                  ¿Cuándo recibiré los emails?
                </h3>
                <p className="text-gray-600">
                  Cada jueves a las 10:00 CET. El primer envío será el 20 de
                  noviembre de 2026.
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-bold text-gray-900">
                  ¿Es realmente gratis?
                </h3>
                <p className="text-gray-600">
                  Sí, 100% gratis. Sin costes ocultos, sin tarjeta de crédito.
                  Nuestro objetivo es ayudar a la comunidad hispanohablante en
                  Suiza.
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-bold text-gray-900">
                  ¿Puedo cancelar cuando quiera?
                </h3>
                <p className="text-gray-600">
                  Por supuesto. Cada email incluye un enlace de cancelación.
                  Un clic y te damos de baja inmediatamente.
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-bold text-gray-900">
                  ¿Qué pasa con mis datos?
                </h3>
                <p className="text-gray-600">
                  Solo usamos tu email para enviarte el newsletter. No
                  compartimos tus datos con terceros. Nunca. Puedes leer
                  nuestra{" "}
                  <Link
                    href="/privacidad"
                    className="text-red-700 underline hover:text-red-800"
                  >
                    política de privacidad aquí
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>

          {/* Example Preview */}
          <div className="mb-12 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-8">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
              📧 Ejemplo de Newsletter
            </h2>

            <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 border-b pb-4">
                <div className="mb-2 text-sm text-gray-500">
                  De: HispanosEnSuiza
                </div>
                <div className="text-lg font-bold">
                  🇨🇭 Newsletter Semanal #47 - HispanosEnSuiza
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <p>Hola María!</p>

                <div className="rounded-lg bg-red-50 p-4">
                  <div className="mb-2 font-bold text-red-900">
                    🔥 Oferta Destacada de la Semana
                  </div>
                  <div className="font-bold">Senior Developer - Zürich</div>
                  <div className="text-gray-600">
                    Google Switzerland · CHF 120K - 140K
                  </div>
                  <button className="mt-2 rounded bg-red-700 px-4 py-2 text-xs font-bold text-white">
                    Ver oferta completa →
                  </button>
                </div>

                <div>
                  <div className="mb-2 font-bold">
                    💼 Top 3 Ofertas de Trabajo
                  </div>
                  <div className="space-y-2 text-xs text-gray-600">
                    <div>• Data Analyst - Geneva · CHF 90K</div>
                    <div>• Project Manager - Basel · CHF 110K</div>
                    <div>• UX Designer - Lausanne · CHF 85K</div>
                  </div>
                </div>

                <div>
                  <div className="mb-2 font-bold">
                    📖 Historia de la Comunidad
                  </div>
                  <div className="text-xs text-gray-600">
                    "Mi primer año en Ginebra" por Ana G. desde España
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <Link
              href="#signup"
              className="inline-block rounded-xl bg-red-700 px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-red-800"
            >
              📧 Suscribirme Gratis
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              Únete a +50 hispanohablantes que ya reciben la newsletter
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>
            © 2026 HispanosEnSuiza ·{" "}
            <Link href="/privacidad" className="hover:text-red-700">
              Privacidad
            </Link>{" "}
            ·{" "}
            <Link href="/cookies" className="hover:text-red-700">
              Cookies
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
