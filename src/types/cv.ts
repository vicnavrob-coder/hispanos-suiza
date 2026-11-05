/**
 * Tipos para el generador de CV suizo
 */

export interface CVData {
  // Datos personales
  nombre: string;
  apellidos: string;
  fechaNacimiento: string;
  nacionalidad: string;
  email: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  canton: string;
  linkedinUrl?: string;

  // Foto (opcional)
  foto?: string; // Base64 o URL

  // Objetivo profesional
  objetivoProfesional: string;

  // Experiencia laboral
  experiencia: ExperienciaLaboral[];

  // Formación
  formacion: Formacion[];

  // Idiomas
  idiomas: Idioma[];

  // Habilidades técnicas
  habilidades: string[];

  // Intereses (muy importante en CVs suizos)
  intereses?: string[];

  // Referencias
  referencias?: Referencia[];
}

export interface ExperienciaLaboral {
  puesto: string;
  empresa: string;
  ubicacion: string;
  fechaInicio: string; // "MM/YYYY"
  fechaFin: string;    // "MM/YYYY" o "Actual"
  descripcion: string;
  logros?: string[];   // Bullets de logros
}

export interface Formacion {
  titulo: string;
  institucion: string;
  ubicacion: string;
  fechaInicio: string;
  fechaFin: string;
  detalles?: string;
}

export interface Idioma {
  idioma: string;
  nivel: "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "Nativo";
  certificado?: string; // e.g. "Goethe B2", "DELF C1"
}

export interface Referencia {
  nombre: string;
  puesto: string;
  empresa: string;
  email?: string;
  telefono?: string;
}

export const NIVELES_IDIOMA = [
  { value: "A1", label: "A1 - Básico" },
  { value: "A2", label: "A2 - Básico avanzado" },
  { value: "B1", label: "B1 - Intermedio" },
  { value: "B2", label: "B2 - Intermedio alto" },
  { value: "C1", label: "C1 - Avanzado" },
  { value: "C2", label: "C2 - Dominio" },
  { value: "Nativo", label: "Nativo" },
];

export const CANTONES = [
  "Aargau", "Appenzell Ausserrhoden", "Appenzell Innerrhoden", "Basel-Landschaft",
  "Basel-Stadt", "Bern", "Fribourg", "Genève", "Glarus", "Graubünden",
  "Jura", "Luzern", "Neuchâtel", "Nidwalden", "Obwalden", "Schaffhausen",
  "Schwyz", "Solothurn", "St. Gallen", "Thurgau", "Ticino", "Uri",
  "Valais", "Vaud", "Zug", "Zürich"
];
