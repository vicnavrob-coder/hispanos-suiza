"use client";

import { useState } from "react";
import Link from "next/link";
import { generateSwissCV } from "@/lib/cv-generator";
import type { CVData, ExperienciaLaboral, Formacion, Idioma, Referencia } from "@/types/cv";
import { NIVELES_IDIOMA, CANTONES } from "@/types/cv";

type Step = "personal" | "experiencia" | "formacion" | "idiomas" | "extras" | "preview";

const STEPS = [
  { id: "personal", label: "Datos Personales", icon: "👤" },
  { id: "experiencia", label: "Experiencia", icon: "💼" },
  { id: "formacion", label: "Formación", icon: "🎓" },
  { id: "idiomas", label: "Idiomas & Habilidades", icon: "🗣️" },
  { id: "extras", label: "Extras", icon: "✨" },
  { id: "preview", label: "Previsualizar", icon: "👁️" },
];

export default function CVGeneratorClient() {
  const [currentStep, setCurrentStep] = useState<Step>("personal");
  const [cvData, setCvData] = useState<CVData>({
    nombre: "",
    apellidos: "",
    fechaNacimiento: "",
    nacionalidad: "",
    email: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    canton: "Zürich",
    objetivoProfesional: "",
    experiencia: [],
    formacion: [],
    idiomas: [],
    habilidades: [],
  });

  const updateData = (field: keyof CVData, value: any) => {
    setCvData(prev => ({ ...prev, [field]: value }));
  };

  const downloadPDF = () => {
    const pdf = generateSwissCV(cvData);
    pdf.save(`CV_${cvData.nombre}_${cvData.apellidos}_Swiss.pdf`);
  };

  const stepIndex = STEPS.findIndex(s => s.id === currentStep);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F6F3] to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2C3E50] to-[#34495E] text-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <Link href="/herramientas" className="text-white/80 hover:text-white text-sm mb-4 inline-block">
            ← Volver a herramientas
          </Link>
          <h1 className="text-4xl font-bold mb-3">Generador de CV Suizo</h1>
          <p className="text-white/90 text-lg">
            Crea tu CV profesional en formato suizo en minutos
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between py-6">
            {STEPS.map((step, idx) => (
              <div key={step.id} className="flex items-center flex-1">
                <button
                  onClick={() => setCurrentStep(step.id as Step)}
                  className={`flex items-center space-x-2 ${
                    idx <= stepIndex ? "text-[#3498DB]" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                      step.id === currentStep
                        ? "bg-[#3498DB] text-white"
                        : idx < stepIndex
                        ? "bg-[#3498DB]/20 text-[#3498DB]"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {step.icon}
                  </div>
                  <span className="hidden md:inline text-sm font-medium">{step.label}</span>
                </button>
                {idx < STEPS.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 ${idx < stepIndex ? "bg-[#3498DB]" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {currentStep === "personal" && (
            <PersonalDataStep cvData={cvData} updateData={updateData} />
          )}

          {currentStep === "experiencia" && (
            <ExperienciaStep cvData={cvData} updateData={updateData} />
          )}

          {currentStep === "formacion" && (
            <FormacionStep cvData={cvData} updateData={updateData} />
          )}

          {currentStep === "idiomas" && (
            <IdiomasHabilidadesStep cvData={cvData} updateData={updateData} />
          )}

          {currentStep === "extras" && (
            <ExtrasStep cvData={cvData} updateData={updateData} />
          )}

          {currentStep === "preview" && (
            <PreviewStep cvData={cvData} downloadPDF={downloadPDF} />
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            {stepIndex > 0 && (
              <button
                onClick={() => setCurrentStep(STEPS[stepIndex - 1].id as Step)}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                ← Anterior
              </button>
            )}

            {stepIndex < STEPS.length - 1 ? (
              <button
                onClick={() => setCurrentStep(STEPS[stepIndex + 1].id as Step)}
                className="ml-auto px-6 py-3 bg-[#3498DB] text-white rounded-lg hover:bg-[#2980B9] transition"
              >
                Siguiente →
              </button>
            ) : (
              <button
                onClick={downloadPDF}
                className="ml-auto px-8 py-3 bg-gradient-to-r from-[#27AE60] to-[#229954] text-white rounded-lg hover:from-[#229954] hover:to-[#1E8449] transition font-bold"
              >
                📥 Descargar CV
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STEP COMPONENTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function PersonalDataStep({ cvData, updateData }: any) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Datos Personales</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nombre *</label>
          <input
            type="text"
            value={cvData.nombre}
            onChange={(e) => updateData("nombre", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3498DB] focus:border-transparent"
            placeholder="Ej: Juan"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Apellidos *</label>
          <input
            type="text"
            value={cvData.apellidos}
            onChange={(e) => updateData("apellidos", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3498DB] focus:border-transparent"
            placeholder="Ej: García Martínez"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Nacimiento *</label>
          <input
            type="date"
            value={cvData.fechaNacimiento}
            onChange={(e) => updateData("fechaNacimiento", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3498DB] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nacionalidad *</label>
          <input
            type="text"
            value={cvData.nacionalidad}
            onChange={(e) => updateData("nacionalidad", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3498DB] focus:border-transparent"
            placeholder="Ej: Española"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
          <input
            type="email"
            value={cvData.email}
            onChange={(e) => updateData("email", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3498DB] focus:border-transparent"
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono *</label>
          <input
            type="tel"
            value={cvData.telefono}
            onChange={(e) => updateData("telefono", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3498DB] focus:border-transparent"
            placeholder="+41 XX XXX XX XX"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Dirección *</label>
          <input
            type="text"
            value={cvData.direccion}
            onChange={(e) => updateData("direccion", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3498DB] focus:border-transparent"
            placeholder="Ej: Bahnhofstrasse 123"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad *</label>
          <input
            type="text"
            value={cvData.ciudad}
            onChange={(e) => updateData("ciudad", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3498DB] focus:border-transparent"
            placeholder="Ej: Zürich"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Cantón *</label>
          <select
            value={cvData.canton}
            onChange={(e) => updateData("canton", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3498DB] focus:border-transparent"
          >
            {CANTONES.map(canton => (
              <option key={canton} value={canton}>{canton}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            LinkedIn (opcional)
          </label>
          <input
            type="url"
            value={cvData.linkedinUrl || ""}
            onChange={(e) => updateData("linkedinUrl", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3498DB] focus:border-transparent"
            placeholder="https://linkedin.com/in/tu-perfil"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Objetivo Profesional *
          </label>
          <textarea
            value={cvData.objetivoProfesional}
            onChange={(e) => updateData("objetivoProfesional", e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3498DB] focus:border-transparent"
            placeholder="Profesional con X años de experiencia en... buscando oportunidades en..."
          />
        </div>
      </div>
    </div>
  );
}

function ExperienciaStep({ cvData, updateData }: any) {
  const [experiences, setExperiences] = useState<ExperienciaLaboral[]>(cvData.experiencia);

  const addExperience = () => {
    const newExp: ExperienciaLaboral = {
      puesto: "",
      empresa: "",
      ubicacion: "",
      fechaInicio: "",
      fechaFin: "",
      descripcion: "",
      logros: [],
    };
    const updated = [...experiences, newExp];
    setExperiences(updated);
    updateData("experiencia", updated);
  };

  const updateExperience = (index: number, field: keyof ExperienciaLaboral, value: any) => {
    const updated = [...experiences];
    updated[index] = { ...updated[index], [field]: value };
    setExperiences(updated);
    updateData("experiencia", updated);
  };

  const removeExperience = (index: number) => {
    const updated = experiences.filter((_, i) => i !== index);
    setExperiences(updated);
    updateData("experiencia", updated);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Experiencia Profesional</h2>

      {experiences.map((exp, idx) => (
        <div key={idx} className="mb-8 p-6 bg-gray-50 rounded-lg relative">
          <button
            onClick={() => removeExperience(idx)}
            className="absolute top-4 right-4 text-red-500 hover:text-red-700"
          >
            ✕
          </button>

          <h3 className="font-bold text-lg mb-4">Experiencia {idx + 1}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Puesto *</label>
              <input
                type="text"
                value={exp.puesto}
                onChange={(e) => updateExperience(idx, "puesto", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Ej: Desarrollador Full Stack"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Empresa *</label>
              <input
                type="text"
                value={exp.empresa}
                onChange={(e) => updateExperience(idx, "empresa", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Ej: Google Switzerland"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ubicación *</label>
              <input
                type="text"
                value={exp.ubicacion}
                onChange={(e) => updateExperience(idx, "ubicacion", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Ej: Zürich, Suiza"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Desde *</label>
                <input
                  type="text"
                  value={exp.fechaInicio}
                  onChange={(e) => updateExperience(idx, "fechaInicio", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="MM/AAAA"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hasta *</label>
                <input
                  type="text"
                  value={exp.fechaFin}
                  onChange={(e) => updateExperience(idx, "fechaFin", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="MM/AAAA o Actual"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Descripción *</label>
              <textarea
                value={exp.descripcion}
                onChange={(e) => updateExperience(idx, "descripcion", e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Describe tus responsabilidades principales..."
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addExperience}
        className="w-full py-3 border-2 border-dashed border-[#3498DB] text-[#3498DB] rounded-lg hover:bg-[#3498DB]/5 transition"
      >
        + Añadir experiencia
      </button>
    </div>
  );
}

function FormacionStep({ cvData, updateData }: any) {
  const [formacion, setFormacion] = useState<Formacion[]>(cvData.formacion);

  const addFormacion = () => {
    const newForm: Formacion = {
      titulo: "",
      institucion: "",
      ubicacion: "",
      fechaInicio: "",
      fechaFin: "",
    };
    const updated = [...formacion, newForm];
    setFormacion(updated);
    updateData("formacion", updated);
  };

  const updateFormacion = (index: number, field: keyof Formacion, value: any) => {
    const updated = [...formacion];
    updated[index] = { ...updated[index], [field]: value };
    setFormacion(updated);
    updateData("formacion", updated);
  };

  const removeFormacion = (index: number) => {
    const updated = formacion.filter((_, i) => i !== index);
    setFormacion(updated);
    updateData("formacion", updated);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Formación Académica</h2>

      {formacion.map((form, idx) => (
        <div key={idx} className="mb-8 p-6 bg-gray-50 rounded-lg relative">
          <button
            onClick={() => removeFormacion(idx)}
            className="absolute top-4 right-4 text-red-500 hover:text-red-700"
          >
            ✕
          </button>

          <h3 className="font-bold text-lg mb-4">Título {idx + 1}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Título *</label>
              <input
                type="text"
                value={form.titulo}
                onChange={(e) => updateFormacion(idx, "titulo", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Ej: Máster en Ingeniería Informática"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Institución *</label>
              <input
                type="text"
                value={form.institucion}
                onChange={(e) => updateFormacion(idx, "institucion", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Ej: ETH Zürich"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ubicación *</label>
              <input
                type="text"
                value={form.ubicacion}
                onChange={(e) => updateFormacion(idx, "ubicacion", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Ej: Zürich, Suiza"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Desde</label>
                <input
                  type="text"
                  value={form.fechaInicio}
                  onChange={(e) => updateFormacion(idx, "fechaInicio", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="AAAA"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hasta</label>
                <input
                  type="text"
                  value={form.fechaFin}
                  onChange={(e) => updateFormacion(idx, "fechaFin", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="AAAA"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addFormacion}
        className="w-full py-3 border-2 border-dashed border-[#3498DB] text-[#3498DB] rounded-lg hover:bg-[#3498DB]/5 transition"
      >
        + Añadir título
      </button>
    </div>
  );
}

function IdiomasHabilidadesStep({ cvData, updateData }: any) {
  const [idiomas, setIdiomas] = useState<Idioma[]>(cvData.idiomas);
  const [habilidades, setHabilidades] = useState<string[]>(cvData.habilidades);
  const [nuevaHabilidad, setNuevaHabilidad] = useState("");

  const addIdioma = () => {
    const updated = [...idiomas, { idioma: "", nivel: "B2" as const }];
    setIdiomas(updated);
    updateData("idiomas", updated);
  };

  const updateIdioma = (index: number, field: keyof Idioma, value: any) => {
    const updated = [...idiomas];
    updated[index] = { ...updated[index], [field]: value };
    setIdiomas(updated);
    updateData("idiomas", updated);
  };

  const removeIdioma = (index: number) => {
    const updated = idiomas.filter((_, i) => i !== index);
    setIdiomas(updated);
    updateData("idiomas", updated);
  };

  const addHabilidad = () => {
    if (nuevaHabilidad.trim()) {
      const updated = [...habilidades, nuevaHabilidad.trim()];
      setHabilidades(updated);
      updateData("habilidades", updated);
      setNuevaHabilidad("");
    }
  };

  const removeHabilidad = (index: number) => {
    const updated = habilidades.filter((_, i) => i !== index);
    setHabilidades(updated);
    updateData("habilidades", updated);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Idiomas y Habilidades</h2>

      {/* Idiomas */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Idiomas</h3>

        {idiomas.map((idioma, idx) => (
          <div key={idx} className="mb-4 p-4 bg-gray-50 rounded-lg flex gap-4 items-start">
            <div className="flex-1">
              <input
                type="text"
                value={idioma.idioma}
                onChange={(e) => updateIdioma(idx, "idioma", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2"
                placeholder="Ej: Español, Alemán, Inglés..."
              />
              <select
                value={idioma.nivel}
                onChange={(e) => updateIdioma(idx, "nivel", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                {NIVELES_IDIOMA.map(nivel => (
                  <option key={nivel.value} value={nivel.value}>{nivel.label}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => removeIdioma(idx)}
              className="text-red-500 hover:text-red-700 mt-2"
            >
              ✕
            </button>
          </div>
        ))}

        <button
          onClick={addIdioma}
          className="w-full py-3 border-2 border-dashed border-[#3498DB] text-[#3498DB] rounded-lg hover:bg-[#3498DB]/5 transition"
        >
          + Añadir idioma
        </button>
      </div>

      {/* Habilidades */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Habilidades Técnicas</h3>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={nuevaHabilidad}
            onChange={(e) => setNuevaHabilidad(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addHabilidad()}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Ej: React, Python, SQL..."
          />
          <button
            onClick={addHabilidad}
            className="px-6 py-2 bg-[#3498DB] text-white rounded-lg hover:bg-[#2980B9]"
          >
            Añadir
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {habilidades.map((hab, idx) => (
            <div
              key={idx}
              className="px-4 py-2 bg-[#3498DB]/10 text-[#3498DB] rounded-full flex items-center gap-2"
            >
              <span>{hab}</span>
              <button
                onClick={() => removeHabilidad(idx)}
                className="text-[#3498DB] hover:text-[#2980B9]"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ExtrasStep({ cvData, updateData }: any) {
  const [intereses, setIntereses] = useState<string[]>(cvData.intereses || []);
  const [nuevoInteres, setNuevoInteres] = useState("");

  const addInteres = () => {
    if (nuevoInteres.trim()) {
      const updated = [...intereses, nuevoInteres.trim()];
      setIntereses(updated);
      updateData("intereses", updated);
      setNuevoInteres("");
    }
  };

  const removeInteres = (index: number) => {
    const updated = intereses.filter((_, i) => i !== index);
    setIntereses(updated);
    updateData("intereses", updated);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Extras (Opcional)</h2>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800">
          💡 <strong>Tip:</strong> Los CVs suizos suelen incluir intereses personales. Esto ayuda a mostrar tu personalidad y fit cultural.
        </p>
      </div>

      <h3 className="text-xl font-bold text-gray-800 mb-4">Intereses / Hobbies</h3>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={nuevoInteres}
          onChange={(e) => setNuevoInteres(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addInteres()}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="Ej: Senderismo, Fotografía, Voluntariado..."
        />
        <button
          onClick={addInteres}
          className="px-6 py-2 bg-[#3498DB] text-white rounded-lg hover:bg-[#2980B9]"
        >
          Añadir
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {intereses.map((int, idx) => (
          <div
            key={idx}
            className="px-4 py-2 bg-green-100 text-green-700 rounded-full flex items-center gap-2"
          >
            <span>{int}</span>
            <button
              onClick={() => removeInteres(idx)}
              className="text-green-700 hover:text-green-900"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewStep({ cvData, downloadPDF }: any) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Vista Previa</h2>

      <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-lg p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="text-4xl">✅</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">¡Tu CV está listo!</h3>
            <p className="text-gray-700 mb-4">
              Hemos generado tu CV en formato suizo profesional. Incluye todas las secciones estándar
              que esperan los reclutadores suizos.
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>✓ Formato profesional suizo</li>
              <li>✓ Diseño limpio y minimalista</li>
              <li>✓ Estructura cronológica inversa</li>
              <li>✓ Listo para enviar</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Resumen */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-bold text-lg mb-4">Resumen de tu CV:</h3>

        <div className="space-y-3 text-sm">
          <div>
            <span className="font-medium">Nombre:</span> {cvData.nombre} {cvData.apellidos}
          </div>
          <div>
            <span className="font-medium">Email:</span> {cvData.email}
          </div>
          <div>
            <span className="font-medium">Teléfono:</span> {cvData.telefono}
          </div>
          <div>
            <span className="font-medium">Ubicación:</span> {cvData.ciudad}, {cvData.canton}
          </div>
          <div>
            <span className="font-medium">Experiencias:</span> {cvData.experiencia.length}
          </div>
          <div>
            <span className="font-medium">Formación:</span> {cvData.formacion.length}
          </div>
          <div>
            <span className="font-medium">Idiomas:</span> {cvData.idiomas.length}
          </div>
          <div>
            <span className="font-medium">Habilidades:</span> {cvData.habilidades.length}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>Importante:</strong> Revisa tu CV descargado antes de enviarlo. Asegúrate de que
          toda la información es correcta y está actualizada.
        </p>
      </div>
    </div>
  );
}
