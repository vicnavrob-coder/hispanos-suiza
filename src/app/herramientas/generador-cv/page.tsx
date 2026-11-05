import type { Metadata } from "next";
import CVGeneratorClient from "./client";

export const metadata: Metadata = {
  title: "Generador de CV Suizo Profesional con Foto | Primer CV Gratis",
  description: "Crea tu CV profesional en formato suizo con foto incluida. Diseño corporativo que cumple estándares suizos. Primera generación GRATIS, CVs adicionales solo 6.99 CHF. Listo para UBS, Google Zürich, Novartis.",
  keywords: [
    // CV Suizo general
    "cv suizo", "curriculum suiza", "formato cv suiza", "cv profesional suiza",
    "plantilla cv suiza", "como hacer cv suizo", "cv para trabajar en suiza",

    // Con foto (diferenciador clave)
    "cv suizo con foto", "foto cv suiza", "curriculum vitae suizo foto",
    "cv con foto profesional suiza", "plantilla cv foto suiza",

    // Gratuito y precio
    "cv suizo gratis", "generador cv suizo gratis", "cv suiza gratuito",
    "cv suizo online gratis", "crear cv suizo gratis", "cv barato suiza",

    // Profesional/Corporativo
    "cv corporativo suiza", "cv ejecutivo suiza", "cv profesional zürich",
    "cv diseño profesional suiza", "cv estándar suizo",

    // Por ciudad
    "cv zürich", "cv zurich", "cv ginebra", "cv berna", "cv basilea",
    "curriculum zürich", "curriculum zurich profesional",

    // Comparativos
    "mejor generador cv suizo", "cv suizo vs español", "formato cv alemania vs suiza",

    // Long-tail
    "como hacer un cv para trabajar en suiza", "plantilla cv suiza 2025",
    "cv suizo formato pdf", "descargar cv suizo", "ejemplo cv suiza",
    "cv hispanohablantes suiza", "cv español suiza", "cv latinoamericanos suiza"
  ],
};

export default function CVGeneratorPage() {
  return <CVGeneratorClient />;
}
