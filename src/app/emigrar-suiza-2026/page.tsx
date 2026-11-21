import type { Metadata } from "next";
import Link from "next/link";
import { BASE_URL, buildMetadata, faqSchema, howToSchema } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = buildMetadata({
  title: "Emigrar a Suiza 2026: Guía Completa Paso a Paso [Con Calculadoras]",
  description: "Todo lo que necesitas para emigrar a Suiza: requisitos, visas, trabajo, vivienda, salarios, impuestos. Calculadoras gratuitas + 50 guías verificadas. Ahorra meses de búsqueda ✓",
  path: "/emigrar-suiza-2026",
  keywords: [
    "emigrar a suiza",
    "como emigrar a suiza",
    "mudarse a suiza",
    "vivir en suiza",
    "trabajar en suiza",
    "requisitos para emigrar a suiza",
    "emigrar a suiza desde españa",
    "emigrar a suiza desde latinoamerica",
    "cuanto cuesta emigrar a suiza",
    "pasos para emigrar a suiza"
  ],
});

const faqs = [
  {
    pregunta: "¿Cuánto dinero necesito para emigrar a Suiza en 2026?",
    respuesta: "Necesitas entre CHF 8.000-15.000 para los primeros meses: CHF 2.000-4.000 depósito alquiler, CHF 1.000-2.000 mobiliario básico, CHF 300-600 seguro médico (obligatorio), CHF 1.000-2.000 gastos iniciales (registro, transporte, teléfono), y CHF 3.000-6.000 colchón financiero para 2-3 meses. Las ciudades caras (Zúrich, Ginebra) requieren el extremo superior; ciudades medianas (Berna, Lucerna) el extremo inferior."
  },
  {
    pregunta: "¿Necesito hablar alemán para emigrar a Suiza?",
    respuesta: "No es obligatorio para emigrar, pero sí recomendable según tu sector. Para IT, finanzas, farmacia o sectores internacionales puedes conseguir trabajo solo con inglés. Para hostelería, construcción, sanidad (contacto público), retail o servicios necesitarás alemán/francés nivel B1-B2. Las empresas grandes aceptan inglés; las pequeñas prefieren idioma local. Puedes empezar sin el idioma y aprenderlo allí con cursos subvencionados."
  },
  {
    pregunta: "¿Cuánto tiempo tarda el proceso de emigración a Suiza?",
    respuesta: "Con oferta de trabajo desde España/UE: 1-3 meses (búsqueda empleo 2-8 semanas + mudanza 2-4 semanas). Desde Latinoamérica sin convenio: 3-6 meses (búsqueda empleo 2-4 meses + trámites visa 4-8 semanas + mudanza). El permiso L/B se obtiene al llegar registrándote en la comuna (mismo día). Lo más lento es conseguir la oferta laboral y encontrar vivienda."
  },
  {
    pregunta: "¿Qué permiso de residencia necesito para trabajar en Suiza?",
    respuesta: "Ciudadanos UE/AELC: Permiso L (< 1 año contrato) o Permiso B (≥ 1 año), obtenidos automáticamente con contrato laboral. Latinoamericanos/otros: necesitas que la empresa demuestre que no encontró candidatos en Suiza/UE, luego solicita permiso de trabajo (proceso 4-8 semanas). Excepción: pareja de ciudadano suizo/UE residiendo en Suiza = permiso automático por reagrupación familiar."
  },
  {
    pregunta: "¿Puedo emigrar a Suiza sin trabajo previo?",
    respuesta: "Ciudadanos UE/AELC: Sí, puedes entrar como turista y buscar trabajo hasta 3 meses sin registrarte, o 6 meses registrándote como 'buscador de empleo' (debes demostrar búsqueda activa). Latinoamericanos/otros: No, necesitas oferta laboral antes de emigrar para obtener visa. Excepción: estudiantes con visa de estudios (pueden trabajar 15h/semana) o cónyuges de residentes (permiso familiar permite trabajar)."
  },
  {
    pregunta: "¿Cuánto se gana realmente en Suiza después de impuestos?",
    respuesta: "Salario medio bruto: CHF 7.000/mes (CHF 84.000/año). Después de descuentos (AVS 5,3%, desempleo 1,1%, accidentes 1%, BVG/pensión 7%, impuestos 8-15% según cantón) → neto: CHF 5.000-5.500/mes. Menos seguro médico obligatorio CHF 300-600/mes → líquido disponible: CHF 4.400-5.200/mes. Con este sueldo puedes ahorrar CHF 1.000-2.000/mes tras gastos (alquiler CHF 1.200-1.800, comida CHF 600-800, transporte CHF 150-350)."
  }
];

const pasos = [
  {
    numero: 1,
    titulo: "Consigue una oferta de trabajo",
    descripcion: "Busca en jobs.ch, LinkedIn, o contacta empresas directamente. Adapta tu CV al formato suizo (Lebenslauf) y envía candidaturas espontáneas.",
    tiempo: "2-8 semanas",
    herramientas: [
      { nombre: "Buscador de trabajo", url: "/trabajo" },
      { nombre: "Traductor CV alemán", url: "/herramientas/traductor-cv" }
    ]
  },
  {
    numero: 2,
    titulo: "Busca vivienda",
    descripcion: "Usa homegate.ch, comparis.ch, flatfox.ch. Necesitarás: contrato de trabajo, certificado de solvencia, dossier (CV, foto, carta motivación). Los depósitos son 2-3 meses de alquiler.",
    tiempo: "2-6 semanas",
    herramientas: [
      { nombre: "Comparador de ciudades", url: "/herramientas/comparador-ciudades" }
    ]
  },
  {
    numero: 3,
    titulo: "Regístrate en la comuna",
    descripcion: "En tus primeros 14 días, regístrate en tu Gemeinde/commune local. Te darán el permiso de residencia (L o B) si tienes contrato laboral.",
    tiempo: "1 día",
    herramientas: []
  },
  {
    numero: 4,
    titulo: "Contrata seguro médico obligatorio",
    descripcion: "Tienes 3 meses desde tu registro. Compara aseguradoras en comparis.ch. El seguro básico cubre lo mismo en todas, varía solo el precio (CHF 250-600/mes).",
    tiempo: "1 hora online",
    herramientas: [
      { nombre: "Comparador seguros", url: "/seguros" }
    ]
  },
  {
    numero: 5,
    titulo: "Abre cuenta bancaria",
    descripcion: "Con tu permiso de residencia y contrato laboral puedes abrir cuenta en cualquier banco. Recomendados: Neon, Zak, UBS, PostFinance.",
    tiempo: "30-60 minutos",
    herramientas: []
  },
  {
    numero: 6,
    titulo: "Configura impuestos y deducciones",
    descripcion: "Si eres fronterizo o ganas < CHF 120.000, pagas impuesto a la fuente (automático en nómina). Si no, declaras impuestos en febrero-marzo del año siguiente.",
    tiempo: "Variable",
    herramientas: [
      { nombre: "Calculadora salario neto", url: "/herramientas/salario-neto" },
      { nombre: "Calculadora impuesto fuente", url: "/herramientas/impuesto-fuente" }
    ]
  }
];

export default function EmigrarSuiza2026Page() {
  const breadcrumbItems = [
    { name: "Inicio", url: BASE_URL },
    { name: "Emigrar a Suiza 2026", url: `${BASE_URL}/emigrar-suiza-2026` }
  ];

  const faqSchemaData = faqSchema(faqs);
  const howToSchemaData = howToSchema({
    name: "Cómo emigrar a Suiza paso a paso",
    description: "Guía completa para emigrar y establecerte en Suiza desde España o Latinoamérica",
    totalTime: "P3M",
    steps: pasos.map(p => ({
      name: p.titulo,
      text: p.descripcion,
      url: `${BASE_URL}/emigrar-suiza-2026#paso-${p.numero}`
    }))
  });

  return (
    <div className="bg-[#F8F6F3]">
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchemaData) }}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            ✓ Guía actualizada 2026
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Emigrar a Suiza en 2026:<br />
            <span className="text-[#C8102E]">La guía definitiva</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Todo lo que necesitas saber para emigrar y establecerte en Suiza: requisitos, visas,
            trabajo, vivienda, salarios, impuestos. Con calculadoras gratuitas y guías verificadas.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="#proceso-completo"
              className="bg-[#C8102E] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#A00D24] transition-colors"
            >
              Ver proceso completo →
            </Link>
            <Link
              href="/herramientas"
              className="bg-white border-2 border-gray-200 text-gray-800 font-bold px-8 py-4 rounded-xl hover:border-[#C8102E] hover:text-[#C8102E] transition-colors"
            >
              Usar calculadoras gratis
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="bg-white rounded-xl p-6 text-center border border-gray-100">
            <div className="text-3xl font-bold text-[#C8102E] mb-1">CHF 7.000</div>
            <div className="text-sm text-gray-600">Salario medio/mes</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center border border-gray-100">
            <div className="text-3xl font-bold text-[#C8102E] mb-1">1-3 meses</div>
            <div className="text-sm text-gray-600">Tiempo medio UE</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center border border-gray-100">
            <div className="text-3xl font-bold text-[#C8102E] mb-1">CHF 10.000</div>
            <div className="text-sm text-gray-600">Inversión inicial</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center border border-gray-100">
            <div className="text-3xl font-bold text-[#C8102E] mb-1">50+ guías</div>
            <div className="text-sm text-gray-600">Contenido gratis</div>
          </div>
        </div>

        {/* Proceso Completo */}
        <div id="proceso-completo" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">
            Los 6 pasos para emigrar a Suiza
          </h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            Sigue este proceso paso a paso para emigrar sin contratiempos. Incluye tiempos estimados
            y herramientas gratuitas para cada fase.
          </p>

          <div className="space-y-6">
            {pasos.map((paso) => (
              <div
                key={paso.numero}
                id={`paso-${paso.numero}`}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 hover:border-[#C8102E] transition-colors"
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#C8102E] to-[#A00D24] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {paso.numero}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                      <h3 className="text-2xl font-bold text-gray-900">{paso.titulo}</h3>
                      <span className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                        ⏱️ {paso.tiempo}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed">{paso.descripcion}</p>

                    {paso.herramientas.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        <span className="text-sm font-semibold text-gray-500">Herramientas útiles:</span>
                        {paso.herramientas.map((h) => (
                          <Link
                            key={h.url}
                            href={h.url}
                            className="text-sm bg-gray-50 hover:bg-[#C8102E] hover:text-white text-gray-700 px-3 py-1.5 rounded-lg transition-colors font-medium"
                          >
                            {h.nombre} →
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Herramientas */}
        <div className="bg-gradient-to-r from-[#C8102E] to-[#A00D24] rounded-2xl p-8 sm:p-12 text-white text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Calcula tu salario neto en Suiza</h2>
          <p className="text-red-100 mb-6 max-w-2xl mx-auto">
            Usa nuestras calculadoras gratuitas para saber exactamente cuánto ganarás después de impuestos,
            seguro médico y cotizaciones. Compara cantones y ciudades para maximizar tu ahorro.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/herramientas/salario-neto"
              className="bg-white text-[#C8102E] font-bold px-8 py-4 rounded-xl hover:bg-red-50 transition-colors"
            >
              Calculadora salario neto →
            </Link>
            <Link
              href="/herramientas/comparador-ciudades"
              className="bg-white/10 backdrop-blur border-2 border-white/30 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/20 transition-colors"
            >
              Comparar ciudades
            </Link>
          </div>
        </div>

        {/* Requisitos por nacionalidad */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Requisitos según tu nacionalidad
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* UE/AELC */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">🇪🇺</span>
                <h3 className="text-2xl font-bold text-gray-900">Ciudadanos UE/AELC</h3>
              </div>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start gap-2">
                  <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                  <span>Libre circulación — no necesitas visa</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                  <span>Puedes buscar trabajo hasta 6 meses en Suiza</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                  <span>Permiso L/B automático con contrato laboral</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                  <span>Sin cuotas ni restricciones de nacionalidad</span>
                </div>
              </div>
              <Link
                href="/blog/requisitos-trabajar-suiza-2026-guia-completa"
                className="block mt-4 text-[#C8102E] font-semibold hover:underline"
              >
                Ver guía completa para españoles →
              </Link>
            </div>

            {/* Latinoamérica */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">🌎</span>
                <h3 className="text-2xl font-bold text-gray-900">Latinoamericanos</h3>
              </div>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold flex-shrink-0">!</span>
                  <span>Necesitas oferta laboral ANTES de emigrar</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold flex-shrink-0">!</span>
                  <span>Empresa debe demostrar que no encontró candidatos en UE</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold flex-shrink-0">!</span>
                  <span>Proceso de visa: 4-8 semanas</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                  <span>Excepción: cónyuge de ciudadano suizo/UE</span>
                </div>
              </div>
              <Link
                href="/guias"
                className="block mt-4 text-[#C8102E] font-semibold hover:underline"
              >
                Ver guías para latinoamericanos →
              </Link>
            </div>
          </div>
        </div>

        {/* Artículos relacionados */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Guías esenciales para emigrar
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/blog/cuanto-se-gana-en-suiza-2026-sueldos-reales"
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#C8102E] hover:shadow-lg transition-all"
            >
              <span className="text-3xl mb-3 block">💰</span>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sueldos en Suiza 2026</h3>
              <p className="text-gray-600 text-sm mb-3">
                Tabla completa con salarios reales por profesión, sector y ciudad. Brutos y netos.
              </p>
              <span className="text-[#C8102E] font-semibold text-sm">Leer artículo →</span>
            </Link>

            <Link
              href="/blog/costo-vida-suiza-2026-presupuesto-real"
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#C8102E] hover:shadow-lg transition-all"
            >
              <span className="text-3xl mb-3 block">🏠</span>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Costo de vida 2026</h3>
              <p className="text-gray-600 text-sm mb-3">
                Presupuesto real mes a mes: alquiler, comida, transporte, seguros por ciudad.
              </p>
              <span className="text-[#C8102E] font-semibold text-sm">Leer artículo →</span>
            </Link>

            <Link
              href="/blog/requisitos-trabajar-suiza-2026-guia-completa"
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#C8102E] hover:shadow-lg transition-all"
            >
              <span className="text-3xl mb-3 block">📋</span>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Requisitos y permisos</h3>
              <p className="text-gray-600 text-sm mb-3">
                Guía completa de permisos L, B, C, G. Qué necesitas según tu nacionalidad.
              </p>
              <span className="text-[#C8102E] font-semibold text-sm">Leer artículo →</span>
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Preguntas frecuentes sobre emigrar a Suiza
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-100 hover:border-[#C8102E] transition-colors group"
              >
                <summary className="font-bold text-gray-900 cursor-pointer text-lg list-none flex items-center justify-between">
                  <span>{faq.pregunta}</span>
                  <span className="text-[#C8102E] ml-4 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-gray-700 mt-4 leading-relaxed">{faq.respuesta}</p>
              </details>
            ))}
          </div>
        </div>

        {/* CTA Final */}
        <div className="bg-white rounded-2xl p-8 sm:p-12 border-2 border-gray-100 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            ¿Listo para dar el paso?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Accede a todas nuestras calculadoras gratuitas, guías descargables y herramientas
            para planificar tu emigración a Suiza con éxito.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/herramientas"
              className="bg-[#C8102E] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#A00D24] transition-colors"
            >
              Ver todas las herramientas →
            </Link>
            <Link
              href="/blog"
              className="bg-gray-100 text-gray-800 font-bold px-8 py-4 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Leer el blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
