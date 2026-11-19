import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

// Force dynamic rendering to bypass Vercel cache
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = buildMetadata({
  title: "Términos y Condiciones — Suiza Starter Pack",
  description: "Términos y condiciones del servicio Suiza Starter Pack de HispanosEnSuiza",
  path: "/suiza-starter-pack/terminos",
});

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <Link
            href="/suiza-starter-pack"
            className="text-blue-600 hover:text-blue-700 flex items-center gap-2 mb-4"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Volver al Suiza Starter Pack
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Términos y Condiciones
          </h1>
          <p className="text-slate-600">
            Última actualización: 19 de noviembre de 2026
          </p>
        </div>

        <div className="prose prose-slate max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              1. Acuerdo de Servicios
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              El presente acuerdo regula la prestación del servicio <strong>"Suiza Starter Pack"</strong> ofrecido por
              HispanosEnSuiza (en adelante, "el Proveedor") al cliente (en adelante, "el Cliente").
            </p>
            <p className="text-slate-700 leading-relaxed">
              Al solicitar una plaza y realizar el pago, el Cliente acepta estos términos en su totalidad.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              2. Servicios Incluidos
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              El Suiza Starter Pack incluye:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>
                <strong>Alojamiento:</strong> 30 días de habitación individual en piso compartido, zona Luzern/Hochdorf, con
                wifi y servicios básicos incluidos
              </li>
              <li>
                <strong>Kit Llegada:</strong> Acompañamiento a registro comunal, apertura cuenta bancaria, tarjeta transporte
                1 mes, número móvil prepago, sesión orientación ciudad
              </li>
              <li>
                <strong>Preparación Laboral:</strong> Análisis perfil, CV formato suizo (alemán/francés), carta presentación,
                traducción hasta 3 documentos, optimización LinkedIn
              </li>
              <li>
                <strong>Acompañamiento ETT:</strong> Agenda 3 citas ETT, acompañamiento presencial a las 3 entrevistas,
                briefing pre-entrevista, follow-up posterior
              </li>
              <li>
                <strong>Soporte:</strong> Grupo WhatsApp privado 24/7 primer mes, 4 videollamadas seguimiento semanales,
                acceso comunidad HispanosEnSuiza Premium
              </li>
              <li>
                <strong>Bonus:</strong> Guía PDF alemán supervivencia con audio pronunciación
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              3. Servicios NO Incluidos
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Seguro médico obligatorio (270-350 CHF/mes según cantón)</li>
              <li>Comida y gastos personales</li>
              <li>Viaje a Suiza (vuelo/tren)</li>
              <li>Alojamiento mes 2+ (posible con descuento sujeto a disponibilidad)</li>
              <li>Garantía de empleo (solo acompañamiento profesional)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              4. Precio y Forma de Pago
            </h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>Precio total:</strong> 2.890 CHF todo incluido
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-4">
              <li>
                <strong>Señal no reembolsable:</strong> 500 CHF al reservar plaza (pago online mediante Stripe)
              </li>
              <li>
                <strong>Resto:</strong> 2.390 CHF a pagar 7 días antes de la fecha de llegada acordada (transferencia
                bancaria o Stripe)
              </li>
            </ul>
            <p className="text-slate-700 leading-relaxed">
              Si el Cliente no completa el pago final 7 días antes, el Proveedor se reserva el derecho a cancelar la
              reserva sin devolución de la señal.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              5. Alojamiento
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Período: 30 días naturales desde check-in</li>
              <li>Tipo: Habitación individual en piso compartido</li>
              <li>Ubicación: Zona Luzern/Hochdorf con acceso transporte público</li>
              <li>
                El Cliente se compromete a mantener comportamiento adecuado, no causar daños y respetar las normas de
                convivencia
              </li>
              <li>
                Daños al alojamiento serán responsabilidad del Cliente y se descontarán de un depósito de garantía (si
                aplica) o se facturarán por separado
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              6. Obligaciones del Cliente
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>Llegar en la fecha acordada (cambios sujetos a disponibilidad)</li>
              <li>Tener pasaporte/DNI vigente con validez mínima 6 meses</li>
              <li>Contratar seguro médico obligatorio (el Proveedor ayudará en el proceso)</li>
              <li>Proporcionar información veraz en el formulario de solicitud</li>
              <li>Comportarse de manera respetuosa durante todo el servicio</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              7. Política de Cancelación
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-4">
              <h3 className="font-semibold text-slate-900 mb-2">
                Cancelación por parte del Cliente:
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>
                  <strong>15+ días antes:</strong> Reembolso 70% del pago total
                </li>
                <li>
                  <strong>7-14 días antes:</strong> Reembolso 30% del pago total
                </li>
                <li>
                  <strong>Menos de 7 días:</strong> Sin reembolso (costes ya comprometidos)
                </li>
              </ul>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 mb-2">
                Cancelación por parte del Proveedor:
              </h3>
              <p className="text-slate-700">
                Si el Proveedor debe cancelar por causas de fuerza mayor (ej: alojamiento no disponible), se reembolsará
                el 100% del pago realizado. El Proveedor intentará ofrecer alternativa similar antes de cancelar.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              8. Garantía de Satisfacción
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Si el Cliente no está satisfecho con el servicio, puede solicitar reembolso dentro de los primeros{" "}
              <strong>15 días</strong> desde el check-in. Se reembolsará el 70% del pago total, descontando los costes
              reales de alojamiento ya utilizados.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              9. Exclusión de Responsabilidad
            </h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <p className="text-slate-700 leading-relaxed mb-4">
                El Proveedor <strong>NO garantiza</strong>:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Obtención de empleo (solo acompañamiento profesional a ETT)</li>
                <li>Aprobación permiso de trabajo/residencia (proceso gestionado por Cliente con apoyo)</li>
                <li>Alojamiento permanente más allá de 30 días (sujeto a disponibilidad)</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              10. Protección de Datos
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Los datos personales proporcionados serán tratados conforme a nuestra{" "}
              <Link href="/privacidad" className="text-blue-600 hover:text-blue-700 underline">
                Política de Privacidad
              </Link>
              . No se compartirán con terceros salvo necesidad del servicio (ej: ETT para entrevistas).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              11. Modificaciones del Servicio
            </h2>
            <p className="text-slate-700 leading-relaxed">
              El Proveedor se reserva el derecho a modificar estos términos. Los cambios se comunicarán a Clientes con
              reservas activas con al menos 7 días de antelación. Nuevas reservas aceptan los términos vigentes en el
              momento de la solicitud.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              12. Ley Aplicable y Jurisdicción
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Este acuerdo se rige por las leyes de <strong>Suiza</strong>. Cualquier disputa se resolverá en los
              tribunales del cantón de <strong>Lucerna</strong>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              13. Contacto
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Para dudas sobre estos términos:
            </p>
            <ul className="list-none space-y-2 text-slate-700 mt-4">
              <li>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:contacto@hispanosensuiza.com"
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  contacto@hispanosensuiza.com
                </a>
              </li>
              <li>
                <strong>Web:</strong>{" "}
                <a
                  href="https://hispanosensuiza.com"
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  hispanosensuiza.com
                </a>
              </li>
            </ul>
          </section>

          <div className="mt-12 pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-500 text-center">
              Al solicitar una plaza en el Suiza Starter Pack, confirmas que has leído, entendido y aceptado estos
              términos y condiciones en su totalidad.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/suiza-starter-pack"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
          >
            Volver al Suiza Starter Pack
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}
