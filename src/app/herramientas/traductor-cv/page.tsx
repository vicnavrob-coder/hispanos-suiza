"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import type { CVData } from "@/app/api/cv-translator/route";

type Step = "upload" | "processing" | "preview" | "error" | "paywall";

interface Pricing {
  monthly: { price: number; currency: string };
  yearly: { price: number; currency: string; savings?: string };
  perCv: { price: number; currency: string };
}

export default function TraductorCVPage() {
  const [step, setStep] = useState<Step>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [usedFreeCredit, setUsedFreeCredit] = useState(false);
  const [pricing, setPricing] = useState<Pricing | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      const name = selected.name.toLowerCase();
      if (!name.endsWith(".pdf") && !name.endsWith(".docx")) {
        setError("Solo se aceptan archivos PDF o DOCX");
        return;
      }
      if (selected.size > 5 * 1024 * 1024) {
        setError("El archivo es demasiado grande (máx. 5MB)");
        return;
      }
      setFile(selected);
      setError("");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) {
      const name = dropped.name.toLowerCase();
      if (!name.endsWith(".pdf") && !name.endsWith(".docx")) {
        setError("Solo se aceptan archivos PDF o DOCX");
        return;
      }
      if (dropped.size > 5 * 1024 * 1024) {
        setError("El archivo es demasiado grande (máx. 5MB)");
        return;
      }
      setFile(dropped);
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !email) return;

    setStep("processing");
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("email", email);

      const res = await fetch("/api/cv-translator", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      // Handle payment required (limit reached)
      if (res.status === 402) {
        setPricing(data.pricing);
        setStep("paywall");
        return;
      }

      if (!res.ok) {
        throw new Error(data.error || data.message || "Error al procesar el CV");
      }

      setCvData(data.cv);
      setUsedFreeCredit(data.usedFreeCredit ?? false);
      setStep("preview");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      setStep("error");
    }
  };

  const handleDownloadPdf = async () => {
    if (!cvData) return;

    setDownloadingPdf(true);
    try {
      const res = await fetch("/api/cv-translator/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cv: cvData }),
      });

      if (!res.ok) {
        throw new Error("Error al generar el PDF");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Lebenslauf_${cvData.personalInfo.fullName.replace(/\s+/g, "_")}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError("Error al descargar el PDF");
    } finally {
      setDownloadingPdf(false);
    }
  };

  const handleSubscribe = async (plan: "monthly" | "yearly" | "single") => {
    // TODO: Integrate with Stripe checkout
    // For now, show a message that subscription is coming soon
    alert(
      `Suscripción ${plan} - Próximamente disponible.\n\nContacta con nosotros en info@hispanosensui.za para acceso anticipado.`
    );
  };

  const resetForm = () => {
    setStep("upload");
    setFile(null);
    setCvData(null);
    setError("");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 text-sm px-4 py-1.5 rounded-full mb-4">
            <span>DE</span>
            <span className="text-blue-200">Traducción + Adaptación</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Traductor de CV al Alemán
          </h1>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Sube tu currículum en español y obtén un <strong>Lebenslauf</strong>{" "}
            profesional adaptado al formato suizo. Traducción completa + formato
            estándar del mercado laboral DACH.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            {
              icon: "🇩🇪",
              title: "Alemán profesional",
              desc: "Terminología correcta para el mercado suizo",
            },
            {
              icon: "📄",
              title: "Formato suizo",
              desc: "Estructura cronológica inversa estándar",
            },
            {
              icon: "⚡",
              title: "Listo en segundos",
              desc: "IA procesa y traduce automáticamente",
            },
          ].map((b, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-4 border border-gray-100 text-center"
            >
              <div className="text-2xl mb-2">{b.icon}</div>
              <div className="font-semibold text-gray-800">{b.title}</div>
              <div className="text-sm text-gray-500">{b.desc}</div>
            </div>
          ))}
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Upload Step */}
          {step === "upload" && (
            <form onSubmit={handleSubmit} className="p-6 md:p-8">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tu email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Para enviarte el CV si cierras la página
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tu CV actual (PDF o Word)
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                    file
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-blue-400 hover:bg-blue-50/50"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  {file ? (
                    <div>
                      <div className="text-4xl mb-2">📄</div>
                      <div className="font-medium text-gray-800">{file.name}</div>
                      <div className="text-sm text-gray-500">
                        {(file.size / 1024).toFixed(0)} KB
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFile(null);
                        }}
                        className="text-red-600 text-sm mt-2 hover:underline"
                      >
                        Quitar archivo
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="text-4xl mb-2">📤</div>
                      <div className="font-medium text-gray-800">
                        Arrastra tu CV aquí o haz clic para seleccionar
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        PDF o DOCX, máximo 5MB
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={!file || !email}
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Traducir y adaptar al formato suizo
              </button>

              <p className="text-center text-xs text-gray-500 mt-4">
                Tu primer CV es gratis. No compartimos tus datos.
              </p>
            </form>
          )}

          {/* Processing Step */}
          {step === "processing" && (
            <div className="p-8 md:p-12 text-center">
              <div className="animate-spin text-5xl mb-4">⚙️</div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Traduciendo tu CV...
              </h2>
              <p className="text-gray-500">
                Extrayendo contenido, traduciendo al alemán y adaptando al formato
                suizo. Esto puede tardar 15-30 segundos.
              </p>
              <div className="mt-6 flex justify-center gap-2">
                {["Extrayendo texto", "Traduciendo", "Formateando"].map((s, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Paywall Step */}
          {step === "paywall" && (
            <div className="p-6 md:p-8">
              <div className="text-center mb-8">
                <div className="text-5xl mb-4">🔒</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Ya usaste tu traducción gratuita
                </h2>
                <p className="text-gray-600">
                  Suscríbete para traducir CVs ilimitados o compra una traducción individual.
                </p>
              </div>

              {/* Pricing Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Single CV */}
                <div className="border border-gray-200 rounded-xl p-5 text-center">
                  <div className="text-sm text-gray-500 mb-1">1 traducción</div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">
                    {pricing?.perCv.price ?? 4.90} <span className="text-lg">CHF</span>
                  </div>
                  <ul className="text-sm text-gray-600 mb-4 space-y-1">
                    <li>✓ 1 CV traducido</li>
                    <li>✓ Formato suizo profesional</li>
                    <li>✓ Descarga PDF inmediata</li>
                  </ul>
                  <button
                    onClick={() => handleSubscribe("single")}
                    className="w-full py-2 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition"
                  >
                    Comprar
                  </button>
                </div>

                {/* Monthly */}
                <div className="border-2 border-blue-600 rounded-xl p-5 text-center relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    POPULAR
                  </div>
                  <div className="text-sm text-gray-500 mb-1">Mensual</div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">
                    {pricing?.monthly.price ?? 9.90} <span className="text-lg">CHF/mes</span>
                  </div>
                  <ul className="text-sm text-gray-600 mb-4 space-y-1">
                    <li>✓ CVs ilimitados</li>
                    <li>✓ Todas las plantillas</li>
                    <li>✓ Soporte prioritario</li>
                    <li>✓ Cancela cuando quieras</li>
                  </ul>
                  <button
                    onClick={() => handleSubscribe("monthly")}
                    className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                  >
                    Suscribirme
                  </button>
                </div>

                {/* Yearly */}
                <div className="border border-gray-200 rounded-xl p-5 text-center relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    AHORRA 33%
                  </div>
                  <div className="text-sm text-gray-500 mb-1">Anual</div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">
                    {pricing?.yearly.price ?? 79} <span className="text-lg">CHF/año</span>
                  </div>
                  <ul className="text-sm text-gray-600 mb-4 space-y-1">
                    <li>✓ CVs ilimitados</li>
                    <li>✓ Todas las plantillas</li>
                    <li>✓ Soporte prioritario</li>
                    <li>✓ 4 meses gratis</li>
                  </ul>
                  <button
                    onClick={() => handleSubscribe("yearly")}
                    className="w-full py-2 border border-green-600 text-green-600 font-semibold rounded-lg hover:bg-green-50 transition"
                  >
                    Suscribirme
                  </button>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={resetForm}
                  className="text-gray-500 hover:text-gray-700 text-sm"
                >
                  ← Volver al inicio
                </button>
              </div>

              <p className="text-center text-xs text-gray-400 mt-6">
                Pago seguro con Stripe. Puedes cancelar en cualquier momento.
              </p>
            </div>
          )}

          {/* Preview Step */}
          {step === "preview" && cvData && (
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Tu Lebenslauf está listo
                  </h2>
                  {usedFreeCredit && (
                    <p className="text-sm text-green-600">
                      Has usado tu traducción gratuita
                    </p>
                  )}
                </div>
                <button
                  onClick={resetForm}
                  className="text-gray-500 hover:text-gray-700 text-sm"
                >
                  ← Traducir otro
                </button>
              </div>

              {/* CV Preview */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
                {/* Header */}
                <div className="border-b-2 border-blue-600 pb-4 mb-4">
                  <h3 className="text-2xl font-bold text-blue-800">
                    {cvData.personalInfo.fullName}
                  </h3>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600 mt-2">
                    {cvData.personalInfo.email && (
                      <span>{cvData.personalInfo.email}</span>
                    )}
                    {cvData.personalInfo.phone && (
                      <span>{cvData.personalInfo.phone}</span>
                    )}
                    {cvData.personalInfo.nationality && (
                      <span>Nationalität: {cvData.personalInfo.nationality}</span>
                    )}
                  </div>
                </div>

                {/* Summary */}
                {cvData.professionalSummary && (
                  <div className="mb-4">
                    <h4 className="font-bold text-blue-700 uppercase text-sm mb-2">
                      Profil
                    </h4>
                    <p className="text-gray-700 text-sm">
                      {cvData.professionalSummary}
                    </p>
                  </div>
                )}

                {/* Experience */}
                {cvData.workExperience && cvData.workExperience.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-bold text-blue-700 uppercase text-sm mb-2">
                      Berufserfahrung
                    </h4>
                    {cvData.workExperience.slice(0, 2).map((exp, i) => (
                      <div key={i} className="mb-3">
                        <div className="flex justify-between">
                          <span className="font-semibold">{exp.position}</span>
                          <span className="text-gray-500 text-sm">
                            {exp.startDate} – {exp.endDate}
                          </span>
                        </div>
                        <div className="text-gray-600 text-sm">{exp.company}</div>
                        {exp.responsibilities && exp.responsibilities.length > 0 && (
                          <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                            {exp.responsibilities.slice(0, 2).map((r, j) => (
                              <li key={j}>{r}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                    {cvData.workExperience.length > 2 && (
                      <p className="text-gray-400 text-sm">
                        + {cvData.workExperience.length - 2} más en el PDF...
                      </p>
                    )}
                  </div>
                )}

                {/* Languages */}
                {cvData.skills?.languages && cvData.skills.languages.length > 0 && (
                  <div>
                    <h4 className="font-bold text-blue-700 uppercase text-sm mb-2">
                      Sprachen
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {cvData.skills.languages.map((lang, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                        >
                          {lang.language}: {lang.level}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Download Button */}
              <button
                onClick={handleDownloadPdf}
                disabled={downloadingPdf}
                className="w-full py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {downloadingPdf ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Generando PDF...
                  </>
                ) : (
                  <>
                    <span>📥</span>
                    Descargar Lebenslauf (PDF)
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-500 mt-4">
                PDF listo para enviar a empresas suizas
              </p>
            </div>
          )}

          {/* Error Step */}
          {step === "error" && (
            <div className="p-8 text-center">
              <div className="text-5xl mb-4">😕</div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Algo salió mal
              </h2>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={resetForm}
                className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition"
              >
                Intentar de nuevo
              </button>
            </div>
          )}
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
            Preguntas frecuentes
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "¿Qué formato de CV suizo usáis?",
                a: "Usamos el formato estándar DACH (Alemania, Austria, Suiza): cronológico inverso, con datos personales completos, niveles de idioma según el Marco Europeo, y terminología profesional alemana.",
              },
              {
                q: "¿Qué pasa con el diseño de mi CV original?",
                a: "Extraemos todo el contenido y lo volcamos en una plantilla profesional suiza. El diseño original no se mantiene, pero el resultado es más apropiado para el mercado laboral suizo.",
              },
              {
                q: "¿Es realmente gratis?",
                a: "Tu primer CV es 100% gratis. Para traducciones adicionales puedes suscribirte (9.90 CHF/mes ilimitado) o comprar traducciones individuales (4.90 CHF cada una).",
              },
              {
                q: "¿Qué calidad tiene la traducción?",
                a: "Usamos IA avanzada (Claude de Anthropic) para traducir. La calidad es profesional, pero siempre recomendamos revisar el resultado, especialmente en términos técnicos de tu sector.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="bg-white rounded-xl border border-gray-100 p-4 group"
              >
                <summary className="font-semibold text-gray-800 cursor-pointer list-none flex justify-between items-center">
                  {faq.q}
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="text-gray-600 mt-3 text-sm">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Cross-sell */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/trabajo"
            className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition flex items-center gap-4"
          >
            <span className="text-3xl">💼</span>
            <div>
              <div className="font-bold text-gray-800">Buscar trabajo</div>
              <div className="text-sm text-gray-500">
                8 portales + 13 ETTs en un solo buscador
              </div>
            </div>
          </Link>
          <Link
            href="/recursos/guia-salarios"
            className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition flex items-center gap-4"
          >
            <span className="text-3xl">💰</span>
            <div>
              <div className="font-bold text-gray-800">Guía de salarios</div>
              <div className="text-sm text-gray-500">
                Cuánto se gana en Suiza por sector
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
