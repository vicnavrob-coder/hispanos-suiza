import type { Metadata } from "next";
import CVGeneratorClient from "./client";

export const metadata: Metadata = {
  title: "Generador de CV Suizo | HispanosEnSuiza",
  description: "Crea tu CV profesional en formato suizo en minutos. Plantilla optimizada para el mercado laboral suizo con estructura estándar y diseño profesional.",
  keywords: ["cv suizo", "curriculum suiza", "formato cv suiza", "cv profesional suiza", "plantilla cv suiza", "como hacer cv suizo", "cv para trabajar en suiza"],
};

export default function CVGeneratorPage() {
  return <CVGeneratorClient />;
}
