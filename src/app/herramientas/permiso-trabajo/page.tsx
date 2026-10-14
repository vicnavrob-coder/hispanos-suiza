"use client";
import { useState } from "react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

type Nacionalidad = "eu" | "otro";
type Contrato = "indefinido" | "temporal" | "fronterizo";
type Permiso = "B" | "L" | "G";

// ─── Logic ───────────────────────────────────────────────────────────────────

function getPermiso(nac: Nacionalidad, contrato: Contrato): Permiso {
  if (contrato === "fronterizo") return "G";
  if (contrato === "indefinido") return "B";
  return "L";
}

// ─── Result data ─────────────────────────────────────────────────────────────

const PERMISO_DATA = {
  L: {
    badge: { label: "Permiso L", bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200" },
    headerBg: "from-blue-600 to-blue-700",
    titulo: "Permiso L — Estancia de corta duración",
    tramitacion: "1–4 semanas (UE) / 2–4 meses (otros países)",
    descripcion:
      "Para contratos de hasta 12 meses. Ligado al empleador — necesitas notificar si cambias de empresa.",
    documentos: [
      "Pasaporte o DNI válido",
      "Contrato de trabajo firmado",
      "Confirmación de domicilio en Suiza",
    ],
    restricciones: [
      "Solo válido con el empleador indicado",
      "No da derecho a reagrupación familiar automática",
      "Si el contrato se prorroga a +12 meses, se convierte en permiso B",
    ],
    pasos: [
      "Tu empleador notifica a la oficina de migración cantonal",
      "Empadrónat en la Gemeinde en los primeros 14 días",
      "Recibirás la tarjeta física en 1–4 semanas",
    ],
    pasosExtra: null as string[] | null,
    documentosExtra: null as string[] | null,
  },
  B: {
    badge: { label: "Permiso B", bg: "bg-green-100", text: "text-green-800", border: "border-green-200" },
    headerBg: "from-green-600 to-green-700",
    titulo: "Permiso B — Residencia de duración limitada",
    tramitacion: "1–4 semanas (UE) / 2–6 meses (otros países, desde consulado)",
    descripcion:
      "El permiso más habitual para nuevos trabajadores. Se renueva automáticamente mientras tengas trabajo.",
    documentos: [
      "DNI o pasaporte",
      "Contrato de trabajo firmado",
      "Contrato de alquiler o prueba de domicilio",
    ],
    documentosExtra: [
      "Certificado de antecedentes penales apostillado",
      "Títulos universitarios apostillados",
      "Fotos de carnet",
    ],
    restricciones: [
      "Necesitas notificar si cambias de cantón en el primer año",
      "Para no-UE: sujeto al cupo anual de permisos (8.500 para 2026)",
    ],
    pasos: [
      "Tu empleador tramita el permiso con la oficina cantonal",
      "Empadrónat en los primeros 14 días",
      "Recibirás la tarjeta B en 1–4 semanas",
    ],
    pasosExtra: [
      "Asegúrate de tener el contrato firmado antes de salir",
      "Solicita el visado D en el consulado suizo de tu país",
      "Empadrónat en los primeros 8 días al llegar",
    ],
  },
  G: {
    badge: { label: "Permiso G", bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-200" },
    headerBg: "from-orange-500 to-orange-600",
    titulo: "Permiso G — Trabajador fronterizo",
    tramitacion: "2–6 semanas",
    descripcion:
      "Para quienes viven en Alemania, Francia, Italia, Austria o Liechtenstein y trabajan en Suiza. No autoriza a residir en Suiza.",
    documentos: [
      "Pasaporte o DNI",
      "Contrato de trabajo",
      "Prueba de residencia en el país vecino (menos de 10 km de la frontera para algunas regiones)",
    ],
    documentosExtra: null as string[] | null,
    restricciones: [
      "No permite residir en Suiza",
      "Debes volver a tu domicilio al menos una vez por semana (o diariamente en algunos cantones)",
      "No da acceso a las prestaciones sociales suizas en igualdad de condiciones",
    ],
    pasos: [
      "El empleador tramita el permiso G junto con tu contrato",
      "Debes registrarte en la oficina de migraciones del cantón donde trabajas",
      "El permiso dura mientras dure el contrato de trabajo",
    ],
    pasosExtra: null as string[] | null,
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function PermisoTrabajoPage() {
  const [nac, setNac] = useState<Nacionalidad | null>(null);
  const [contrato, setContrato] = useState<Contrato | null>(null);
  const [resultado, setResultado] = useState<{ permiso: Permiso; nac: Nacionalidad } | null>(null);

  const canCalculate = nac !== null && contrato !== null;

  function calcular() {
    if (!nac || !contrato) return;
    setResultado({ permiso: getPermiso(nac, contrato), nac });
  }

  function reset() {
    setNac(null);
    setContrato(null);
    setResultado(null);
  }

  // Progress: step 1 complete when nac selected, step 2 complete when contrato selected, step 3 when result shown
  const progress = resultado ? 3 : contrato ? 2 : nac ? 1 : 0;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-red-700">Inicio</Link>
        <span>›</span>
        <Link href="/herramientas" className="hover:text-red-700">Herramientas</Link>
        <span>›</span>
        <span className="text-gray-600">Calculadora permiso de trabajo</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        ¿Qué permiso de trabajo necesito en Suiza?
      </h1>
      <p className="text-gray-500 mb-8 text-sm max-w-2xl">
        Selecciona tu nacionalidad y tipo de contrato para descubrir qué permiso te corresponde,
        los documentos necesarios y los pasos a seguir.
      </p>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {["Nacionalidad", "Tipo de contrato", "Tu permiso"].map((label, i) => {
            const step = i + 1;
            const active = progress >= step;
            return (
              <div key={label} className="flex flex-col items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-1 transition-all ${
                    active
                      ? "text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                  style={active ? { background: "#C0392B" } : {}}
                >
                  {step}
                </div>
                <span className={`text-xs font-medium ${active ? "text-gray-700" : "text-gray-400"}`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
        <div className="relative h-2 bg-gray-100 rounded-full mt-1">
          <div
            className="absolute left-0 top-0 h-2 rounded-full transition-all duration-500"
            style={{ background: "#C0392B", width: `${(progress / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1 — Nacionalidad */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 mb-4">
        <h2 className="text-base font-bold text-gray-800 mb-1">Paso 1 — ¿Cuál es tu nacionalidad?</h2>
        <p className="text-sm text-gray-400 mb-4">Selecciona la que mejor describe tu situación.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {([
            {
              value: "eu" as Nacionalidad,
              emoji: "🇪🇺",
              title: "Ciudadano UE/EEE",
              subtitle: "España, Francia, Italia, Alemania, Portugal...",
            },
            {
              value: "otro" as Nacionalidad,
              emoji: "🌎",
              title: "Latinoamérica / Otros países",
              subtitle: "Colombia, México, Argentina, Venezuela...",
            },
          ] as const).map((opt) => {
            const selected = nac === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => {
                  setNac(opt.value);
                  setResultado(null);
                }}
                className={`w-full text-left rounded-xl px-4 py-4 border transition-all ${
                  selected
                    ? "text-white border-transparent"
                    : "border-gray-200 text-gray-700 hover:border-red-200"
                }`}
                style={selected ? { background: "#C0392B" } : {}}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl leading-none mt-0.5">{opt.emoji}</span>
                  <div>
                    <p className={`font-semibold text-sm ${selected ? "text-white" : "text-gray-800"}`}>
                      {opt.title}
                    </p>
                    <p className={`text-xs mt-0.5 ${selected ? "text-red-100" : "text-gray-400"}`}>
                      {opt.subtitle}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2 — Tipo de contrato */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 mb-4">
        <h2 className="text-base font-bold text-gray-800 mb-1">Paso 2 — ¿Qué tipo de contrato tienes?</h2>
        <p className="text-sm text-gray-400 mb-4">Selecciona la modalidad de tu contrato de trabajo.</p>
        <div className="flex flex-col gap-3">
          {([
            {
              value: "indefinido" as Contrato,
              emoji: "📋",
              title: "Contrato indefinido o +12 meses",
              subtitle: null,
            },
            {
              value: "temporal" as Contrato,
              emoji: "⏳",
              title: "Contrato temporal (menos de 12 meses)",
              subtitle: null,
            },
            {
              value: "fronterizo" as Contrato,
              emoji: "🚗",
              title: "Trabajo fronterizo",
              subtitle: "Vivo en país vecino, trabajo en Suiza",
            },
          ] as const).map((opt) => {
            const selected = contrato === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => {
                  setContrato(opt.value);
                  setResultado(null);
                }}
                className={`w-full text-left rounded-xl px-4 py-3.5 border transition-all ${
                  selected
                    ? "text-white border-transparent"
                    : "border-gray-200 text-gray-700 hover:border-red-200"
                }`}
                style={selected ? { background: "#C0392B" } : {}}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl leading-none">{opt.emoji}</span>
                  <div>
                    <p className={`font-semibold text-sm ${selected ? "text-white" : "text-gray-800"}`}>
                      {opt.title}
                    </p>
                    {opt.subtitle && (
                      <p className={`text-xs mt-0.5 ${selected ? "text-red-100" : "text-gray-400"}`}>
                        {opt.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Calculate button */}
      {!resultado && (
        <button
          onClick={calcular}
          disabled={!canCalculate}
          className={`w-full font-bold py-3.5 rounded-xl text-base transition-all mb-6 ${
            canCalculate ? "text-white hover:opacity-90" : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
          style={canCalculate ? { background: "#C0392B" } : {}}
        >
          Ver mi permiso →
        </button>
      )}

      {/* Step 3 — Result */}
      {resultado && (() => {
        const data = PERMISO_DATA[resultado.permiso];
        const isNoUE = resultado.nac === "otro";

        return (
          <div className="mt-2">
            {/* Result card */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden mb-4">
              {/* Header */}
              <div className={`bg-gradient-to-r ${data.headerBg} px-6 py-5 text-white`}>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${data.badge.bg} ${data.badge.text}`}
                  >
                    {data.badge.label}
                  </span>
                  {isNoUE && resultado.permiso !== "G" && (
                    <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full font-medium">
                      proceso consulado
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-extrabold mt-1">{data.titulo}</h2>
                <p className="text-white/80 text-sm mt-1 flex items-center gap-1.5">
                  <span>⏱</span> Tramitación: {data.tramitacion}
                </p>
              </div>

              <div className="px-6 py-5 space-y-5">
                {/* Descripción */}
                <p className="text-gray-600 text-sm leading-relaxed">{data.descripcion}</p>

                {/* Documentos */}
                <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                    <span>📋</span> Documentos necesarios
                  </h3>
                  <ul className="space-y-1.5">
                    {data.documentos.map((doc) => (
                      <li key={doc} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-green-500 font-bold flex-shrink-0 mt-0.5">✓</span>
                        {doc}
                      </li>
                    ))}
                    {isNoUE && data.documentosExtra && (
                      <>
                        <li className="text-xs text-gray-400 font-semibold mt-2 pt-2 border-t border-dashed border-gray-100">
                          Documentos adicionales para no-UE:
                        </li>
                        {data.documentosExtra.map((doc) => (
                          <li key={doc} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="text-orange-500 font-bold flex-shrink-0 mt-0.5">+</span>
                            {doc}
                          </li>
                        ))}
                      </>
                    )}
                  </ul>
                </div>

                {/* Restricciones */}
                <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                    <span>⚠️</span> Restricciones a tener en cuenta
                  </h3>
                  <ul className="space-y-1.5">
                    {data.restricciones.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-amber-500 flex-shrink-0 mt-0.5">•</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Próximos pasos */}
                <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                    <span>✅</span> Próximos pasos
                  </h3>
                  <ol className="space-y-1.5">
                    {(isNoUE && data.pasosExtra ? data.pasosExtra : data.pasos).map((paso, i) => (
                      <li key={paso} className="flex items-start gap-2.5 text-sm text-gray-700">
                        <span
                          className="flex-shrink-0 w-5 h-5 rounded-full text-white text-xs font-bold flex items-center justify-center mt-0.5"
                          style={{ background: "#C0392B" }}
                        >
                          {i + 1}
                        </span>
                        {paso}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            {/* Nota latinoamericanos */}
            {isNoUE && resultado.permiso !== "G" && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4 text-sm text-amber-800">
                <strong>⚠️ Cupo anual de permisos para latinoamericanos:</strong>{" "}
                Para ciudadanos de países latinoamericanos, Suiza aplica un cupo anual de permisos. En 2026 hay
                8.500 permisos B disponibles. Los cupos suelen agotarse en el segundo semestre del año,
                por lo que es importante solicitar con antelación.
              </div>
            )}

            {/* Enlace artículo */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4 mb-4">
              <Link
                href="/blog/permiso-residencia-suiza-espanoles-latinoamericanos-2026"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-red-700 transition-colors"
              >
                <span>📖</span>
                <span>
                  <strong>Guía completa:</strong> Permisos de residencia en Suiza — L, B, C y G explicados
                </span>
                <span className="ml-auto text-gray-400">→</span>
              </Link>
            </div>

            {/* Reset button */}
            <button
              onClick={reset}
              className="w-full border border-gray-200 text-gray-600 font-semibold py-3 rounded-xl hover:border-red-200 hover:text-red-700 transition-all text-sm"
            >
              ← Volver a empezar
            </button>
          </div>
        );
      })()}
    </div>
  );
}
