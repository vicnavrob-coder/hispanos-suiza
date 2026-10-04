/**
 * ciudades.ts
 * Datos de las principales ciudades suizas para hispanohablantes.
 */

export type Ciudad = {
  slug: string;
  nombre: string;
  canton: string;
  idioma: string;
  poblacion: string;
  hispanohablantes: string;
  alquilerEstudio: string;
  alquiler3hab: string;
  salarioMedio: string;
  descripcion: string;
  descripcionLarga: string;
  imagen: string;
  pros: string[];
  contras: string[];
  barrios: { nombre: string; descripcion: string }[];
  transportePublico: string;
  costeVida: "alto" | "muy-alto" | "moderado";
  emoji: string;
  keywords: string[];
};

export const ciudades: Ciudad[] = [
  {
    slug: "zurich",
    nombre: "Zúrich",
    canton: "Cantón de Zúrich",
    idioma: "Alemán / Suizo-alemán",
    poblacion: "430.000 hab. (área metropolitana: 1,4M)",
    hispanohablantes: "~18.000",
    alquilerEstudio: "1.800–2.400 CHF/mes",
    alquiler3hab: "3.500–5.000 CHF/mes",
    salarioMedio: "8.500 CHF/mes bruto",
    descripcion: "La capital económica de Suiza. El mayor mercado laboral del país, especialmente en finanzas, tecnología y farmacéutica.",
    descripcionLarga: `Zúrich es la ciudad donde más españoles y latinoamericanos trabajan en Suiza. No es la capital política (eso es Berna), pero sí la económica y financiera. Aquí tienen sede UBS, Credit Suisse, Google, Microsoft, ABB y cientos de empresas internacionales.\n\nLa calidad de vida es excepcional —puntúa año tras año entre las tres primeras del mundo en el ranking Mercer— pero el coste de vida es de los más altos de Europa. Un alquiler en el centro puede superar los 3.000 CHF para un piso de dos habitaciones.\n\nPara hispanohablantes, Zúrich tiene una comunidad consolidada. Hay asociaciones culturales, grupos de WhatsApp con miles de miembros y hasta un consulado español que atiende a toda la región nordeste.`,
    imagen: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=1200&q=85&auto=format&fit=crop",
    pros: [
      "Mayor mercado laboral de Suiza: finanzas, tech, pharma, consultoría",
      "Salarios más altos del país",
      "Excelente transporte público (ZVV)",
      "Comunidad hispanohablante grande y organizada",
      "Aeropuerto internacional con vuelos directos a España y LATAM",
    ],
    contras: [
      "El alquiler más caro de Suiza (junto con Ginebra)",
      "Encontrar piso lleva meses — alta competencia",
      "El suizo-alemán es difícil de entender al principio",
      "Ambiente más frío y reservado que otras ciudades",
    ],
    barrios: [
      { nombre: "Kreis 4 / Langstrasse", descripcion: "El barrio más multicultural y animado. Popular entre recién llegados. Alquileres algo más asequibles." },
      { nombre: "Kreis 3 / Wiedikon", descripcion: "Barrio residencial tranquilo y bien comunicado. Buena relación calidad-precio." },
      { nombre: "Kreis 6 / Unterstrass", descripcion: "Zona universitaria, ambiente joven. Apartamentos más pequeños pero centrales." },
      { nombre: "Winterthur", descripcion: "A 25 min en tren. Alquileres 30-40% más baratos que Zúrich centro con acceso directo a la ciudad." },
    ],
    transportePublico: "Abono ZVV zona 110: ~85 CHF/mes. Incluye trams, buses y trenes dentro de la ciudad.",
    costeVida: "muy-alto",
    emoji: "🏙️",
    keywords: ["vivir en zurich", "españoles zurich", "trabajar zurich", "alquiler zurich", "zurich hispanohablantes", "emigrar zurich suiza"],
  },
  {
    slug: "ginebra",
    nombre: "Ginebra",
    canton: "Cantón de Ginebra",
    idioma: "Francés",
    poblacion: "205.000 hab. (área metropolitana: 600.000)",
    hispanohablantes: "~22.000",
    alquilerEstudio: "1.600–2.200 CHF/mes",
    alquiler3hab: "3.200–4.800 CHF/mes",
    salarioMedio: "8.200 CHF/mes bruto",
    descripcion: "Ciudad internacional por excelencia. Sede de la ONU, la OMS y 200+ organizaciones internacionales. La mayor comunidad hispanohablante de Suiza.",
    descripcionLarga: `Ginebra es la ciudad más internacional de Suiza y probablemente de Europa. La ONU, la OMS, el CERN, la Cruz Roja y más de 200 organizaciones internacionales tienen su sede aquí. Eso crea un mercado laboral muy particular: muchos puestos en inglés o francés, con salarios muy altos y muchos hispanohablantes en el entorno laboral.\n\nEl francés es el idioma oficial y el que necesitas para el día a día. La ventaja para hispanoablantes es que el francés es mucho más fácil de aprender que el alemán — muchos hispanohablantes aprenden a comunicarse bien en 6-12 meses.\n\nLa comunidad latina en Ginebra es la más grande de Suiza, con una presencia muy notable de colombianos, venezolanos, argentinos, mexicanos y españoles. Hay restaurantes latinos, tiendas especializadas y asociaciones muy activas.`,
    imagen: "https://images.unsplash.com/photo-1573108724029-4c46571d6490?w=1200&q=85&auto=format&fit=crop",
    pros: [
      "Mayor comunidad hispanohablante de Suiza",
      "Francés — más fácil de aprender que el alemán para hispanohablantes",
      "Organizaciones internacionales: ONU, OMS, CERN, Cruz Roja",
      "Clima más suave que Zúrich",
      "Cerca de Francia (frontera a 10 min) — hacer la compra en Francia ahorra 30-40%",
    ],
    contras: [
      "Junto con Zúrich, la ciudad más cara de Suiza",
      "Encontrar piso es extremadamente difícil — lista de espera de meses",
      "Tráfico muy denso",
      "Ambiente más formal y reservado que ciudades latinoeuropeas",
    ],
    barrios: [
      { nombre: "Carouge", descripcion: "El barrio con más carácter mediterráneo. Arquitectura italiana, terrazas, vida de barrio. Muy popular entre hispanohablantes." },
      { nombre: "Plainpalais", descripcion: "Barrio universitario y artístico. Joven, dinámico, mercadillo de pulgas los miércoles." },
      { nombre: "Champel / Florissant", descripcion: "Zona residencial tranquila, cara pero muy bien comunicada." },
      { nombre: "Annemasse (Francia)", descripcion: "A 10 min en tranvía, ya en Francia. Alquileres un 50% más baratos. Muchos trabajadores transfronterizos viven aquí." },
    ],
    transportePublico: "TPG + UNIRESO. Abono anual: ~700 CHF. El tranvía conecta con Annemasse (Francia).",
    costeVida: "muy-alto",
    emoji: "🌍",
    keywords: ["vivir en ginebra", "españoles ginebra", "trabajar ginebra", "ginebra hispanohablantes", "comunidad latina ginebra", "emigrar ginebra suiza"],
  },
  {
    slug: "basilea",
    nombre: "Basilea",
    canton: "Cantón de Basilea-Ciudad",
    idioma: "Alemán / Suizo-alemán",
    poblacion: "178.000 hab. (área trinacional: 830.000)",
    hispanohablantes: "~8.000",
    alquilerEstudio: "1.400–1.900 CHF/mes",
    alquiler3hab: "2.800–3.800 CHF/mes",
    salarioMedio: "7.800 CHF/mes bruto",
    descripcion: "Capital mundial de la industria farmacéutica. Sede de Novartis, Roche y Syngenta. Frontera triple con Alemania y Francia.",
    descripcionLarga: `Basilea es la capital de la industria farmacéutica y química mundial. Novartis, Roche y Syngenta tienen sus sedes centrales aquí. Si trabajas en pharma, biotech, química o investigación médica, Basilea es tu ciudad.\n\nLa ubicación es única: está en el punto donde confluyen Suiza, Alemania y Francia (Dreiländereck). Muchos residentes viven en Alemania o Francia y trabajan en Basilea — los alquileres en Alemania son un 40-60% más baratos.\n\nAunque es menos conocida que Zúrich o Ginebra, Basilea tiene una escena cultural impresionante: Art Basel (la feria de arte más importante del mundo), el Kunstmuseum y una arquitectura extraordinaria.`,
    imagen: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85&auto=format&fit=crop",
    pros: [
      "Capital mundial de la pharma: Novartis, Roche, Syngenta",
      "Alquileres más asequibles que Zúrich y Ginebra",
      "Frontera triple — vivir en Alemania o Francia y trabajar en Suiza",
      "Escena cultural excepcional (Art Basel, museos)",
      "Bien comunicada: AVE Eurostar a París en 3h, Zúrich en 55 min",
    ],
    contras: [
      "Mercado laboral más especializado (pharma/química/investigación)",
      "Menos opciones de ocio nocturno que Zúrich",
      "El dialecto suizo-alemán de Basilea es especialmente difícil",
    ],
    barrios: [
      { nombre: "Kleinbasel", descripcion: "Barrio al otro lado del Rin, más multicultural y asequible. Ideal para recién llegados." },
      { nombre: "Gundeldingen", descripcion: "Barrio residencial con ambiente de barrio, buena gastronomía diversa." },
      { nombre: "Freiburg im Breisgau (Alemania)", descripcion: "A 45 min en tren. Alemán, alquileres 50% más baratos. Opción muy popular para trabajadores en Basilea." },
    ],
    transportePublico: "TNW. Único de Suiza donde el abono cubre los 3 países: Suiza, Alemania y Francia.",
    costeVida: "alto",
    emoji: "💊",
    keywords: ["vivir en basilea", "españoles basilea", "trabajar basilea pharma", "basilea hispanohablantes", "novartis roche españoles", "emigrar basilea suiza"],
  },
  {
    slug: "berna",
    nombre: "Berna",
    canton: "Cantón de Berna",
    idioma: "Alemán / Suizo-alemán",
    poblacion: "134.000 hab. (área metropolitana: 420.000)",
    hispanohablantes: "~5.000",
    alquilerEstudio: "1.300–1.800 CHF/mes",
    alquiler3hab: "2.500–3.500 CHF/mes",
    salarioMedio: "7.500 CHF/mes bruto",
    descripcion: "La capital federal de Suiza. Centro de la administración pública, organizaciones internacionales y el sector público. Ciudad Patrimonio de la UNESCO.",
    descripcionLarga: `Berna es la capital de Suiza, algo que sorprende a muchos — se imaginaban Zúrich o Ginebra. Es una ciudad tranquila, ordenada y con una calidad de vida muy alta. El Casco Antiguo medieval es Patrimonio de la UNESCO y caminar por sus arcadas históricas es una experiencia única.\n\nEl mercado laboral está dominado por la administración federal y cantonal, las organizaciones internacionales y el sector público en general. Si buscas estabilidad laboral, Berna es ideal. Los salarios en el sector público son competitivos y la seguridad laboral es muy alta.\n\nEs más tranquila que Zúrich y más germanófona que Ginebra. Los alquileres son entre un 20-30% más baratos que en Zúrich. Una opción muy buena para familias o para quienes buscan calidad de vida sin el ritmo frenético de la capital financiera.`,
    imagen: "https://images.unsplash.com/photo-1491557345352-5929e343eb89?w=1200&q=85&auto=format&fit=crop",
    pros: [
      "Capital federal: empleo estable en administración y organizaciones internacionales",
      "20-30% más barata que Zúrich en alquiler",
      "Ciudad Patrimonio UNESCO, extraordinaria para vivir",
      "Ritmo de vida más tranquilo, ideal para familias",
      "Bien comunicada con Zúrich (55 min) y Ginebra (1h 45 min)",
    ],
    contras: [
      "Mercado laboral más limitado para el sector privado",
      "Vida nocturna y cultural menos intensa que Zúrich",
      "Berna-alemán es particularmente difícil de entender",
    ],
    barrios: [
      { nombre: "Länggasse", descripcion: "Barrio universitario, joven y alternativo. Popular entre estudiantes y recién llegados." },
      { nombre: "Breitenrain", descripcion: "Barrio residencial familiar, tranquilo. Buena relación calidad-precio." },
      { nombre: "Kirchenfeld", descripcion: "Zona de embajadas y museos. Elegante y tranquila." },
    ],
    transportePublico: "Bernmobil + SBB. Abono zona 100: ~78 CHF/mes.",
    costeVida: "alto",
    emoji: "🏛️",
    keywords: ["vivir en berna", "españoles berna", "trabajar berna", "berna hispanohablantes", "capital suiza vivir", "emigrar berna suiza"],
  },
  {
    slug: "lausana",
    nombre: "Lausana",
    canton: "Cantón de Vaud",
    idioma: "Francés",
    poblacion: "140.000 hab.",
    hispanohablantes: "~7.000",
    alquilerEstudio: "1.400–1.900 CHF/mes",
    alquiler3hab: "2.800–3.800 CHF/mes",
    salarioMedio: "7.200 CHF/mes bruto",
    descripcion: "Ciudad universitaria y deportiva a orillas del lago Leman. Sede del COI (Comité Olímpico Internacional) y de la EPFL, una de las mejores universidades técnicas del mundo.",
    descripcionLarga: `Lausana es la gran alternativa francoparlante a Ginebra. Está a solo 60 km por autopista y a 40 minutos en tren, pero es significativamente más barata y tiene un ambiente más relajado y universitario.\n\nEs la capital olímpica del mundo: el COI (Comité Olímpico Internacional) y decenas de federaciones deportivas internacionales tienen su sede aquí. Si trabajas en el mundo del deporte, Lausana es tu ciudad.\n\nLa EPFL (École Polytechnique Fédérale de Lausanne) es una de las mejores universidades técnicas del mundo y genera un ecosistema startups y tech muy dinámico. El campus es impresionante y hay muchos hispanohablantes en la comunidad académica.`,
    imagen: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&q=85&auto=format&fit=crop",
    pros: [
      "Francesa pero 20-30% más barata que Ginebra",
      "Sede del COI y federaciones deportivas internacionales",
      "EPFL — top 10 mundial en ingeniería y ciencias",
      "Vida universitaria muy activa, ambiente joven",
      "Vistas espectaculares al lago Leman y los Alpes",
    ],
    contras: [
      "Mercado laboral más pequeño que Ginebra o Zúrich",
      "La ciudad es muy empinada (construida en colinas)",
      "Transporte público correcto pero no tan eficiente como Zúrich",
    ],
    barrios: [
      { nombre: "Flon", descripcion: "Barrio cultural y de ocio, antiguo almacén reconvertido. Restaurantes, bares, galerías." },
      { nombre: "Ouchy", descripcion: "Puerto del lago Leman. Caro pero con vistas únicas." },
      { nombre: "Renens", descripcion: "Ciudad adjunta a Lausana. Alquileres 25% más baratos, bien comunicada en metro." },
    ],
    transportePublico: "TL (Transports Lausannois). El único metro automático de Suiza (M2). Abono mensual: ~70 CHF.",
    costeVida: "alto",
    emoji: "🏅",
    keywords: ["vivir en lausana", "españoles lausana", "trabajar lausana", "lausana hispanohablantes", "EPFL hispanohablantes", "emigrar lausana suiza"],
  },
  {
    slug: "lugano",
    nombre: "Lugano",
    canton: "Cantón del Tesino",
    idioma: "Italiano",
    poblacion: "62.000 hab.",
    hispanohablantes: "~3.500",
    alquilerEstudio: "1.100–1.600 CHF/mes",
    alquiler3hab: "2.200–3.200 CHF/mes",
    salarioMedio: "6.800 CHF/mes bruto",
    descripcion: "La ciudad más mediterránea de Suiza. Idioma italiano, clima templado, orillas del lago y una importante plaza financiera y bancaria.",
    descripcionLarga: `Lugano es la puerta de entrada mediterránea a Suiza. El idioma oficial es el italiano, el clima es notablemente más suave que el resto del país (palmeras incluidas), y el estilo de vida recuerda más al norte de Italia que a la imagen típica suiza.\n\nPara hispanohablantes, el italiano es mucho más fácil de aprender que el alemán — muchos lo consiguen a nivel funcional en 3-4 meses. Es la ciudad donde el choque cultural es menor para alguien que viene de España o Latinoamérica.\n\nEconómicamente, Lugano es un centro financiero y bancario muy importante, con una concentración de bancos privados y gestoras de patrimonio. El turismo de lujo y el sector inmobiliario también tienen mucho peso.`,
    imagen: "https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=1200&q=85&auto=format&fit=crop",
    pros: [
      "Italiano — el idioma más fácil para hispanohablantes en Suiza",
      "Clima mediterráneo, el más suave de Suiza",
      "Alquileres más asequibles que Zúrich o Ginebra",
      "Ambiente y gastronomía mediterráneos",
      "Plazo de adaptación cultural más corto",
    ],
    contras: [
      "Mercado laboral más pequeño y especializado",
      "Salarios 15-20% más bajos que Zúrich o Ginebra",
      "Menos conectado con el resto de Suiza (barrera de los Alpes)",
      "Pocas opciones para no italianos / no banqueros",
    ],
    barrios: [
      { nombre: "Centro / Riva Caccia", descripcion: "A orillas del lago. Caro pero la dirección más prestigiosa." },
      { nombre: "Pregassona / Viganello", descripcion: "Barrios residenciales en las colinas. Más tranquilos y asequibles." },
      { nombre: "Mendrisio / Bellinzona", descripcion: "Ciudades cercanas (20-30 min en tren) con alquileres 20-30% más baratos." },
    ],
    transportePublico: "TILO (trenes regionales) + TPL (autobuses). Bien conectado pero no tan denso como el norte.",
    costeVida: "moderado",
    emoji: "🌊",
    keywords: ["vivir en lugano", "españoles lugano", "trabajar lugano", "lugano hispanohablantes", "tesino hispanohablantes", "emigrar lugano suiza"],
  },
];

export function getCiudad(slug: string): Ciudad | undefined {
  return ciudades.find((c) => c.slug === slug);
}
