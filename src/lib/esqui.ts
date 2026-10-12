/**
 * Datos de estaciones de esquí suizas — HispanosEnSuiza
 * Fuentes: bergfex.ch, zermatt.ch, verbier.ch, myswitzerland.com
 * Actualizado: 2026
 */

export type EstacionEsqui = {
  nombre: string;
  canton: string;
  altitud: string;
  pistasKm: string;
  trabajadoresTemp: string;
  salarioAproximado: string;
  idiomaPrincipal: string;
  nivelHispanos: "alto" | "medio" | "bajo";
  puestosHabituales: string[];
  web: string;
  descripcion: string;
};

export const ESTACIONES: EstacionEsqui[] = [
  {
    nombre: "Zermatt",
    canton: "Valais",
    altitud: "1.620 – 3.883 m",
    pistasKm: "360 km",
    trabajadoresTemp: "~3.000 temporeros/temporada",
    salarioAproximado: "3.800 – 4.500 CHF/mes",
    idiomaPrincipal: "Alemán (Walliserdeutsch)",
    nivelHispanos: "medio",
    puestosHabituales: ["Hostelería", "Recepción", "Operador de remontes", "Limpieza", "Tiendas"],
    web: "https://www.zermatt.ch",
    descripcion:
      "Estación sin coches, icónica bajo el Cervino. Alta demanda de personal todo el año gracias a la nieve garantizada y el turismo de lujo.",
  },
  {
    nombre: "Verbier",
    canton: "Valais",
    altitud: "1.500 – 3.330 m",
    pistasKm: "330 km",
    trabajadoresTemp: "~2.000 temporeros/temporada",
    salarioAproximado: "4.200 – 5.000 CHF/mes",
    idiomaPrincipal: "Inglés / Francés",
    nivelHispanos: "alto",
    puestosHabituales: ["Hostelería", "Instructor esquí", "Chalet staff", "Recepción", "Guías"],
    web: "https://www.verbier.ch",
    descripcion:
      "Una de las estaciones más internacionales de los Alpes. Muy popular entre expatriados anglosajones, con fuerte presencia de hispanohablantes en hostelería.",
  },
  {
    nombre: "Davos-Klosters",
    canton: "Graubünden",
    altitud: "1.560 – 2.844 m",
    pistasKm: "300 km",
    trabajadoresTemp: "~2.500 temporeros/temporada",
    salarioAproximado: "3.700 – 4.300 CHF/mes",
    idiomaPrincipal: "Alemán / Inglés",
    nivelHispanos: "medio",
    puestosHabituales: ["Hostelería", "Congresistas/eventos (WEF)", "Operador remontes", "Mantenimiento"],
    web: "https://www.davos.ch",
    descripcion:
      "La estación más alta de los Alpes suizos y sede del Foro de Davos. Ambiente cosmopolita, muy demandado en temporada de congresos y ski.",
  },
  {
    nombre: "Saas-Fee",
    canton: "Valais",
    altitud: "1.800 – 3.600 m",
    pistasKm: "100 km glaciar",
    trabajadoresTemp: "~1.000 temporeros/temporada",
    salarioAproximado: "3.500 – 4.200 CHF/mes",
    idiomaPrincipal: "Alemán",
    nivelHispanos: "bajo",
    puestosHabituales: ["Hostelería", "Monitores esquí", "Operadores remontes glaciar", "Limpieza"],
    web: "https://www.saas-fee.ch",
    descripcion:
      "La 'Perla de los Alpes'. Funciona casi todo el año gracias al glaciar. Ideal si quieres empezar en octubre, antes de la temporada alta. Comunidad hispanohablante pequeña pero creciente.",
  },
  {
    nombre: "Crans-Montana",
    canton: "Valais",
    altitud: "1.500 – 3.000 m",
    pistasKm: "140 km",
    trabajadoresTemp: "~1.500 temporeros/temporada",
    salarioAproximado: "3.800 – 4.500 CHF/mes",
    idiomaPrincipal: "Francés",
    nivelHispanos: "alto",
    puestosHabituales: ["Hostelería y restauración", "Recepción", "Spa y wellness", "Alquiler de equipo"],
    web: "https://www.crans-montana.ch",
    descripcion:
      "Estación francófona con muy buena comunidad latinoamericana. El francés facilita la integración para hispanohablantes. Ambiente elegante con vistas espectaculares al Valais.",
  },
  {
    nombre: "Engelberg",
    canton: "Obwalden",
    altitud: "1.050 – 3.020 m",
    pistasKm: "82 km",
    trabajadoresTemp: "~800 temporeros/temporada",
    salarioAproximado: "3.500 – 4.000 CHF/mes",
    idiomaPrincipal: "Alemán",
    nivelHispanos: "medio",
    puestosHabituales: ["Hostelería", "Monitor de snowboard/esquí", "Recepción", "Transporte"],
    web: "https://www.engelberg.ch",
    descripcion:
      "A 45 minutos de Lucerna en autobús. Muy accesible, más tranquila que las grandes estaciones. Ideal como primera experiencia en Suiza por su cercanía a una ciudad grande.",
  },
  {
    nombre: "Grindelwald / Wengen",
    canton: "Berna",
    altitud: "1.034 – 2.971 m",
    pistasKm: "213 km (Jungfrau Region)",
    trabajadoresTemp: "~2.000 temporeros/temporada",
    salarioAproximado: "3.700 – 4.300 CHF/mes",
    idiomaPrincipal: "Alemán / Inglés",
    nivelHispanos: "medio",
    puestosHabituales: ["Hostelería", "Guías turísticos", "Operadores Jungfraujoch", "Tiendas souvenirs"],
    web: "https://www.jungfrau.ch",
    descripcion:
      "Una de las zonas más fotografiadas de Suiza. El complejo Jungfrau Region atrae millones de turistas. Muy alta demanda de personal en hostelería y atención al turista.",
  },
  {
    nombre: "Leysin / Les Diablerets",
    canton: "Vaud",
    altitud: "1.250 – 3.000 m",
    pistasKm: "100 km (área Alpes Vaudois)",
    trabajadoresTemp: "~700 temporeros/temporada",
    salarioAproximado: "3.400 – 4.000 CHF/mes",
    idiomaPrincipal: "Francés",
    nivelHispanos: "alto",
    puestosHabituales: ["Hostelería", "Monitor de esquí", "Alquiler de equipo", "Animación", "Limpieza"],
    web: "https://www.leysin.ch",
    descripcion:
      "Estación accesible desde Lausana en 1h. Ideal para un primer trabajo en Suiza: menos exigente en idiomas, muchos hispanohablantes ya establecidos y proceso de contratación más sencillo.",
  },
];

export type PuestoEsqui = {
  puesto: string;
  salario: string;
  nota?: string;
};

export const PUESTOS_SKI: PuestoEsqui[] = [
  { puesto: "Instructor de esquí certificado", salario: "5.000 – 7.000 CHF/mes", nota: "Requiere certificación Swiss Snow / PSIA" },
  { puesto: "Monitor de snowboard", salario: "5.000 – 7.000 CHF/mes", nota: "Requiere certificación equivalente" },
  { puesto: "Hostelería (cocinero/camarero)", salario: "3.500 – 4.500 CHF/mes", nota: "Las propinas pueden añadir 200–500 CHF/mes" },
  { puesto: "Recepción de hotel", salario: "3.400 – 4.200 CHF/mes", nota: "Inglés o alemán/francés casi siempre necesario" },
  { puesto: "Operador de telesillas / remontes", salario: "3.500 – 4.200 CHF/mes", nota: "Formación interna en 1-2 días. Sin experiencia previa" },
  { puesto: "Mantenimiento de pistas (pisteurs)", salario: "3.800 – 4.500 CHF/mes", nota: "Carnet de conducir valorado, conducción de vehículos de pista" },
  { puesto: "Alquiler de equipo de esquí", salario: "3.300 – 4.000 CHF/mes", nota: "Buen punto de entrada, formación interna corta" },
  { puesto: "Ski patrol (patrulla)", salario: "4.500 – 5.500 CHF/mes", nota: "Requiere certificación primeros auxilios (nivel BLS/AED mínimo)" },
  { puesto: "Limpieza de hotel / chalet", salario: "3.200 – 3.800 CHF/mes", nota: "Más fácil sin experiencia previa. Muy demandado" },
];
