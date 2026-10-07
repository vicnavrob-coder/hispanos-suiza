import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BASE_URL, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Itinerarios en Suiza — Rutas y planes curados para hispanohablantes",
  description: "Itinerarios completos para visitar Suiza: fin de semana en Berna, semana en los Alpes, viaje en familia, ruta del esquí y mucho más. Guías en español.",
  path: "/planes/itinerarios",
  keywords: ["itinerarios suiza", "ruta suiza español", "qué ver suiza semana", "viaje suiza familia", "suiza 7 días"],
});

type Itinerario = {
  slug: string;
  titulo: string;
  subtitulo: string;
  duracion: string;
  presupuesto: string;
  dificultad: string;
  perfil: string;
  emoji: string;
  color: string;
  imagen: string;
  descripcion: string;
  highlights: string[];
  dias: {
    dia: number;
    lugar: string;
    actividades: { nombre: string; url?: string; duracion?: string; precio?: string }[];
    donde_dormir?: string;
    tip?: string;
  }[];
  coste_estimado: { concepto: string; precio: string }[];
  consejos_generales: string[];
};

const itinerarios: Itinerario[] = [
  {
    slug: "fin-de-semana-berna-lucerna",
    titulo: "Fin de semana Berna + Lucerna",
    subtitulo: "Las dos capitales históricas en 2 días perfectos",
    duracion: "2 días",
    presupuesto: "300–450 CHF/persona",
    dificultad: "Fácil",
    perfil: "Parejas, amigos, primera vez en Suiza",
    emoji: "🏰",
    color: "#7b2d8b",
    imagen: "https://images.unsplash.com/photo-1741900033774-5957b5f03dd7?w=1200&q=85&auto=format&fit=crop",
    descripcion: "El itinerario perfecto para un primer contacto con Suiza. Dos ciudades UNESCO con arquitectura medieval, lagos cristalinos y la mejor gastronomía suiza. Ideal en tren, sin coche.",
    highlights: ["Ciudad Vieja de Berna (UNESCO)", "Puente de la Capilla de Lucerna", "Monte Pilatus o Rigi", "Lago de los Cuatro Cantones", "Raclette y Rösti auténticos"],
    dias: [
      {
        dia: 1,
        lugar: "Berna",
        actividades: [
          { nombre: "Ciudad Vieja: Zytglogge, arcadas medievales y foso de los osos", url: "/planes/berna/ciudad-berna-historica", duracion: "3 horas" },
          { nombre: "Rosengarten: jardín de rosas con vistas panorámicas", url: "/planes/berna/berna-rosen-rosengarten", duracion: "1 hora" },
          { nombre: "Almuerzo en el Café du Commerce (raclette o fondue)", duracion: "1.5 horas", precio: "30–45 CHF" },
          { nombre: "Bundeshaus (Parlamento) y paseo por la Münstergasse", duracion: "1 hora" },
          { nombre: "Baño o paseo en el Aare (verano)", duracion: "1 hora" },
        ],
        donde_dormir: "Hotel en Berna (90–150 CHF) o Airbnb",
        tip: "El Berner Pass cuesta 49 CHF e incluye todos los museos y el transporte público local.",
      },
      {
        dia: 2,
        lugar: "Lucerna",
        actividades: [
          { nombre: "Tren Berna → Lucerna (1h 15min)", duracion: "1.15h", precio: "26 CHF con Swiss Travel Pass" },
          { nombre: "Puente de la Capilla (Kapellbrücke) y casco antiguo", url: "/planes/lucerna/puente-capilla-lucerna", duracion: "2 horas" },
          { nombre: "Crucero en el Lago de los Cuatro Cantones", url: "/planes/lucerna/lago-lucerna-crucero", duracion: "2 horas", precio: "40 CHF" },
          { nombre: "Monte Pilatus o Monte Rigi (teleférico + vistas)", url: "/planes/lucerna/monte-pilatus", duracion: "3 horas", precio: "72–95 CHF" },
        ],
        tip: "El Swiss Travel Pass es válido en todos los trenes entre ciudades y con descuento en los teleféricos.",
      },
    ],
    coste_estimado: [
      { concepto: "Transporte (tren Berna–Lucerna + metro local)", precio: "50–80 CHF" },
      { concepto: "Alojamiento 1 noche (Berna)", precio: "90–150 CHF" },
      { concepto: "Teleférico Pilatus o Rigi", precio: "72–95 CHF" },
      { concepto: "Comidas (2 días)", precio: "80–120 CHF" },
      { concepto: "Entradas y actividades menores", precio: "20–40 CHF" },
    ],
    consejos_generales: [
      "Compra el Swiss Travel Pass si vas a moverte en tren más de 3 días: cubre trenes, barcos y muchos teleféricos.",
      "En verano reserva los teleféricos online con antelación: las colas pueden ser largas.",
      "Berna y Lucerna son walkable: apenas necesitas transporte dentro de las ciudades.",
      "El mejor momento es mayo-octubre. En diciembre hay mercados navideños espectaculares.",
    ],
  },
  {
    slug: "semana-alpes-suizos",
    titulo: "Una semana en los Alpes suizos",
    subtitulo: "Valais, Berna y Grisones: los Alpes en toda su magnitud",
    duracion: "7 días",
    presupuesto: "1.200–1.800 CHF/persona",
    dificultad: "Moderada",
    perfil: "Aventureros, amantes de la montaña, parejas activas",
    emoji: "🏔️",
    color: "#1d3557",
    imagen: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=85&auto=format&fit=crop",
    descripcion: "La ruta definitiva por los Alpes suizos: Zermatt y el Matterhorn, Jungfraujoch (el 'Top of Europe'), Glacier Express y el Engadin. Una semana que lo tiene todo.",
    highlights: ["Matterhorn Glacier Paradise (3.883m)", "Jungfraujoch — Top of Europe (3.454m)", "Glacier Express: el tren panorámico", "St. Moritz y el Engadin", "Verbier o Grindelwald ski (invierno)"],
    dias: [
      {
        dia: 1,
        lugar: "Llegada a Zermatt",
        actividades: [
          { nombre: "Vuelo a Ginebra o Zúrich, tren hasta Visp/Brig", duracion: "3–4h" },
          { nombre: "Tren hasta Zermatt (pueblo sin coches)", duracion: "1h" },
          { nombre: "Paseo por el pueblo y primera vista del Matterhorn", url: "/planes/valais/zermatt-pueblo-paseo", duracion: "2h" },
        ],
        donde_dormir: "Zermatt (150–250 CHF/noche)",
        tip: "Deja el coche en Täsch (parking) y sube en tren a Zermatt.",
      },
      {
        dia: 2,
        lugar: "Zermatt — Matterhorn Glacier Paradise",
        actividades: [
          { nombre: "Matterhorn Glacier Paradise: teleférico a 3.883m", url: "/planes/valais/matterhorn-glaciar-paradise", duracion: "Día completo", precio: "106 CHF" },
          { nombre: "Cueva de hielo y mirador glaciar", duracion: "2h" },
          { nombre: "Paseo por Zermatt de tarde con cerveza en terraza", duracion: "2h" },
        ],
        tip: "Reserva el teleférico la noche anterior desde la app. En verano se agota antes de las 10h.",
      },
      {
        dia: 3,
        lugar: "Zermatt → Interlaken (Bernese Oberland)",
        actividades: [
          { nombre: "Tren Zermatt → Interlaken (vía Visp y Spiez)", duracion: "3h" },
          { nombre: "Tarde libre en Interlaken: lago Thun o ciudad", duracion: "3h" },
        ],
        donde_dormir: "Interlaken o Grindelwald (120–200 CHF)",
        tip: "Desde Interlaken verás los tres grandes: Eiger, Mönch y Jungfrau.",
      },
      {
        dia: 4,
        lugar: "Jungfraujoch — Top of Europe",
        actividades: [
          { nombre: "Jungfraujoch: el tren más alto de Europa (3.454m)", url: "/planes/berna/jungfraujoch-top-of-europe", duracion: "Día completo", precio: "170–230 CHF" },
          { nombre: "Eiger Trail (opcional, si hay tiempo)", url: "/planes/berna/eiger-trail-grindelwald" },
        ],
        tip: "Sal temprano (antes de las 8h) para evitar nubes y aglomeraciones.",
      },
      {
        dia: 5,
        lugar: "Glacier Express: hacia St. Moritz",
        actividades: [
          { nombre: "Tren panorámico Glacier Express (Zermatt o Chur → St. Moritz)", url: "/planes/grisones/glacier-express", duracion: "8h", precio: "149 CHF + reserva 33 CHF" },
          { nombre: "Llegada a St. Moritz al atardecer", duracion: "" },
        ],
        donde_dormir: "St. Moritz o Pontresina (150–300 CHF)",
        tip: "El Glacier Express pasa por 291 puentes y 91 túneles. Reserva asiento panorámico con antelación.",
      },
      {
        dia: 6,
        lugar: "St. Moritz — Engadin",
        actividades: [
          { nombre: "Esquí en St. Moritz (invierno) o senderismo en el Engadin (verano)", url: "/planes/grisones/esqui-st-moritz", duracion: "Día completo", precio: "75 CHF forfait" },
          { nombre: "Paseo por el lago St. Moritz y el pueblo", duracion: "2h" },
          { nombre: "Parque Nacional Suizo (alternativa cultural)", url: "/planes/grisones/parque-nacional-suizo" },
        ],
        tip: "St. Moritz es caro: compra en el supermercado Coop para ahorrar en comidas.",
      },
      {
        dia: 7,
        lugar: "Regreso",
        actividades: [
          { nombre: "Tren St. Moritz → Zúrich o Ginebra (3–4h)", duracion: "3–4h" },
          { nombre: "Tarde de compras en Bahnhofstrasse (Zúrich) si hay vuelo tarde", duracion: "2h" },
        ],
        tip: "Duty-free en el aeropuerto de Zúrich para comprar chocolate y queso suizo.",
      },
    ],
    coste_estimado: [
      { concepto: "Alojamiento 6 noches (media 180 CHF)", precio: "1.080 CHF" },
      { concepto: "Swiss Travel Pass 7 días", precio: "630 CHF" },
      { concepto: "Glacier Express (reserva)", precio: "182 CHF" },
      { concepto: "Jungfraujoch", precio: "200 CHF" },
      { concepto: "Matterhorn Glacier Paradise", precio: "106 CHF" },
      { concepto: "Comidas 7 días", precio: "280–400 CHF" },
    ],
    consejos_generales: [
      "El Swiss Travel Pass cubre todos los trenes intercity, los barcos y muchos teleféricos con descuento 25–50%.",
      "Reserva el Glacier Express con al menos 3 semanas de antelación en temporada alta.",
      "Lleva ropa en capas: en los Alpes el tiempo cambia rápido incluso en verano.",
      "Descarga la app SBB: permite ver conexiones en tiempo real y comprar billetes.",
      "Los supermercados Coop y Migros son tu mejor aliado para controlar el presupuesto.",
    ],
  },
  {
    slug: "suiza-en-familia",
    titulo: "Suiza en familia",
    subtitulo: "5 días diseñados para disfrutar con niños sin estrés",
    duracion: "5 días",
    presupuesto: "900–1.300 CHF (familia 4 personas)",
    dificultad: "Fácil",
    perfil: "Familias con niños de 3 a 14 años",
    emoji: "👨‍👩‍👧",
    color: "#e9a320",
    imagen: "https://images.unsplash.com/photo-1742626301055-a140b7cfad6b?w=1200&q=85&auto=format&fit=crop",
    descripcion: "Suiza es uno de los mejores destinos familiares del mundo. Trenes seguros, naturaleza accesible, zoos increíbles y montañas en teleférico. Este itinerario evita el esfuerzo físico sin renunciar a la experiencia alpina.",
    highlights: ["Zoo de Zúrich (uno de los mejores del mundo)", "Barco en el Lago de Zurich", "Monte Rigi en tren de cremallera", "Castillo de Chillon", "Chocolate suizo en la fuente"],
    dias: [
      {
        dia: 1,
        lugar: "Zúrich",
        actividades: [
          { nombre: "Zoo de Zúrich: 400 especies, pabellón de elefantes y masoala", url: "/planes/zurich/zoo-zurich", duracion: "4h", precio: "28 CHF adulto / 16 CHF niño" },
          { nombre: "Paseo en barco por el Lago de Zurich", url: "/planes/zurich/lago-zurich-bano", duracion: "1.5h", precio: "12 CHF" },
          { nombre: "Helado en la Bahnhofstrasse", duracion: "1h" },
        ],
        donde_dormir: "Hotel en Zúrich o zona (150–220 CHF familia)",
        tip: "Compra el Zurich Card: transporte ilimitado + Zoo incluido.",
      },
      {
        dia: 2,
        lugar: "Monte Rigi",
        actividades: [
          { nombre: "Tren a Vitznau y cremallera al Monte Rigi (1.797m)", url: "/planes/lucerna/monte-rigi-reina", duracion: "Día completo", precio: "86 CHF adulto / gratis <16 años con familia" },
          { nombre: "Paseo en la cumbre con vistas a 6 lagos", duracion: "2h" },
          { nombre: "Bajada caminando (parte) o cremallera entera", duracion: "2–4h" },
        ],
        tip: "Los niños menores de 16 años viajan gratis con padres que tienen Swiss Travel Pass.",
      },
      {
        dia: 3,
        lugar: "Interlaken y Harder Kulm",
        actividades: [
          { nombre: "Tren desde Lucerna a Interlaken", duracion: "2h" },
          { nombre: "Harder Kulm (1.322m): teleférico y mirador en forma de 'Two Lakes Bridge'", url: "/planes/berna/harder-kulm-interlaken", duracion: "3h", precio: "42 CHF adulto" },
          { nombre: "Lago Brienz: paseo en barco y pueblo de Iseltwald", duracion: "2h", precio: "20 CHF barco" },
        ],
        donde_dormir: "Interlaken (120–180 CHF familia)",
        tip: "En Interlaken hay muchas actividades para niños: paseos en pony, escalada indoor y mini-golf.",
      },
      {
        dia: 4,
        lugar: "Castillo de Chillon (Lago Lemán)",
        actividades: [
          { nombre: "Tren Interlaken → Montreux (2h)", duracion: "2h" },
          { nombre: "Castillo de Chillon: el más fotografiado de Suiza", url: "/planes/vaud/castillo-chillon", duracion: "2h", precio: "13 CHF adulto / gratis <16 años" },
          { nombre: "Paseo por la Riviera de Montreux", url: "/planes/vaud/montreux-riviera", duracion: "2h" },
          { nombre: "Helado y fondue de chocolate en Montreux", duracion: "1h" },
        ],
        donde_dormir: "Montreux o Lausana (130–200 CHF)",
        tip: "Desde Montreux el paseo floral a Chillon es uno de los más bonitos de Suiza.",
      },
      {
        dia: 5,
        lugar: "Lausana → regreso",
        actividades: [
          { nombre: "Museo Olímpico de Lausana: interactivo y divertido para niños", url: "/planes/vaud/lausana-olimpismo", duracion: "2–3h", precio: "18 CHF adulto / 10 CHF niño" },
          { nombre: "Paseo en el puerto de Ouchy", duracion: "1h" },
          { nombre: "Tren de vuelta a Zúrich o Ginebra", duracion: "1h" },
        ],
        tip: "El Museo Olímpico tiene zona de juegos y actividades físicas: a los niños les encanta.",
      },
    ],
    coste_estimado: [
      { concepto: "Alojamiento 4 noches (familia 4 pax)", precio: "600–900 CHF" },
      { concepto: "Swiss Family Card (niños gratis con Swiss Travel Pass)", precio: "0 CHF extra" },
      { concepto: "Swiss Travel Pass adultos 5 días (x2)", precio: "620 CHF" },
      { concepto: "Entradas Zoo + Chillon + Harder Kulm (adultos)", precio: "150 CHF" },
      { concepto: "Comidas 5 días (supermercado + restaurante)", precio: "200–350 CHF" },
    ],
    consejos_generales: [
      "La Swiss Family Card permite a los niños menores de 16 años viajar GRATIS en todos los trenes si los padres tienen Swiss Travel Pass.",
      "Los trenes suizos tienen vagones familia con espacio para carritos y asientos especiales.",
      "Lleva picnic para ahorrar: los supermercados Migros y Coop tienen una selección increíble.",
      "Todos los parques de lago tienen zonas de baño gratuitas (Badi) en verano.",
      "La app SBB Junior permite a los niños seguir la ruta del tren: les encanta.",
    ],
  },
  {
    slug: "ruta-del-esqui",
    titulo: "Ruta del Esquí suizo",
    subtitulo: "Las mejores estaciones en una semana épica",
    duracion: "7 días",
    presupuesto: "1.500–2.200 CHF/persona",
    dificultad: "Moderada–Difícil",
    perfil: "Esquiadores de nivel medio-avanzado, grupos de amigos",
    emoji: "⛷️",
    color: "#023e8a",
    imagen: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1200&q=85&auto=format&fit=crop",
    descripcion: "Las cuatro estaciones más icónicas de Suiza en un solo viaje: Verbier (4 Vallées), Grindelwald-Wengen (Jungfrau), Davos-Klosters y Laax Flims. Nieve garantizada de diciembre a abril.",
    highlights: ["Verbier 4 Vallées: 400km de pistas", "Jungfrau Ski Region: bajo el Eiger", "Davos: la más grande de Europa", "Laax: capital del freestyle/snowboard", "Glaciar 3000 en Les Diablerets"],
    dias: [
      {
        dia: 1,
        lugar: "Llegada a Verbier",
        actividades: [
          { nombre: "Llegada a Ginebra o Zúrich, tren a Le Châble + telecabina a Verbier", duracion: "3–4h" },
          { nombre: "Alquiler de material y forfait en la estación", duracion: "1.5h", precio: "Forfait: 85–95 CHF/día" },
          { nombre: "Primera tarde de esquí (pistas azules-rojas)", duracion: "3h" },
        ],
        donde_dormir: "Verbier o Le Châble (120–250 CHF)",
        tip: "Alquila el material fuera del pueblo de Verbier: 30–40% más barato.",
      },
      {
        dia: 2,
        lugar: "Verbier — Día completo",
        actividades: [
          { nombre: "Esquí en los 4 Vallées: Verbier, Nendaz, Veysonnaz, Thyon", url: "/planes/valais/esqui-verbier", duracion: "Día completo" },
          { nombre: "Mont-Fort (3.330m): el punto más alto y las mejores vistas", duracion: "2h" },
          { nombre: "Après-ski en Le Rouge", duracion: "2h" },
        ],
        tip: "El forfait 4 Vallées permite acceder a todo. No desperdicies tiempo en el área local.",
      },
      {
        dia: 3,
        lugar: "Grindelwald — Jungfrau Ski Region",
        actividades: [
          { nombre: "Tren Verbier → Grindelwald (vía Spiez, ~3h)", duracion: "3h" },
          { nombre: "Primera tarde en las pistas de Grindelwald: vistas al Eiger", url: "/planes/berna/esqui-grindelwald-wengen", duracion: "3h", precio: "78 CHF forfait" },
        ],
        donde_dormir: "Grindelwald (100–180 CHF)",
        tip: "Grindelwald First + Kleine Scheidegg son los dos centros de la región Jungfrau.",
      },
      {
        dia: 4,
        lugar: "Jungfrau — Kleine Scheidegg",
        actividades: [
          { nombre: "Día completo en Kleine Scheidegg: pistas rojas y negras bajo la cara norte del Eiger", url: "/planes/berna/esqui-grindelwald-wengen", duracion: "Día completo" },
          { nombre: "Subida opcional al Jungfraujoch desde las pistas", duracion: "2h", precio: "+50 CHF" },
        ],
        tip: "La pista Lauberhorn es olímpica: un descenso clásico.",
      },
      {
        dia: 5,
        lugar: "Davos-Klosters",
        actividades: [
          { nombre: "Tren Grindelwald → Davos (vía Spiez y Landquart, ~4h)", duracion: "4h" },
          { nombre: "Tarde esquiando en Parsenn: el área más grande", url: "/planes/grisones/davos-esqui-parsenn", duracion: "3h", precio: "82 CHF forfait" },
        ],
        donde_dormir: "Davos (100–200 CHF)",
        tip: "El forfait Davos-Klosters incluye 5 áreas: Parsenn, Jakobshorn, Madrisa, Pischa y Rinerhorn.",
      },
      {
        dia: 6,
        lugar: "Laax — Freestyle & Snowboard",
        actividades: [
          { nombre: "Tren Davos → Laax (vía Chur, ~1.5h)", duracion: "1.5h" },
          { nombre: "Día en Laax: snowpark, halfpipe y pistas variadas", url: "/planes/grisones/laax-esqui-freestyle", duracion: "Día completo", precio: "79 CHF forfait" },
          { nombre: "Après-ski en el Riders Palace", duracion: "2h" },
        ],
        donde_dormir: "Laax o Flims (100–180 CHF)",
        tip: "Laax tiene el mejor snowpark de Suiza. Incluso si no practicas freestyle, los jibbers son fascinantes.",
      },
      {
        dia: 7,
        lugar: "Regreso",
        actividades: [
          { nombre: "Mañana libre (última pasada por las pistas)", duracion: "3h" },
          { nombre: "Tren Laax/Chur → Zúrich (1.5h)", duracion: "1.5h" },
          { nombre: "Vuelo desde Zúrich", duracion: "" },
        ],
        tip: "Guarda el forfait de esquí: en algunas estaciones tiene descuento en la temporada siguiente.",
      },
    ],
    coste_estimado: [
      { concepto: "Alojamiento 6 noches (media 160 CHF)", precio: "960 CHF" },
      { concepto: "Forfaits esquí 6 días (media 82 CHF)", precio: "492 CHF" },
      { concepto: "Alquiler material (si necesario, 6 días x 30 CHF)", precio: "180 CHF" },
      { concepto: "Trenes entre estaciones", precio: "120–180 CHF" },
      { concepto: "Comidas y après-ski", precio: "250–400 CHF" },
    ],
    consejos_generales: [
      "Compra los forfaits online con antelación: hasta 20% de descuento en todas las estaciones.",
      "El Swiss Travel Pass cubre los trenes entre estaciones y tiene descuento en los forfaits.",
      "Lleva protector solar FPS 50+: en la nieve la radiación UV es muy alta aunque no lo parezca.",
      "Las clases de esquí en grupo son mucho más baratas que las individuales: 120 CHF vs 400 CHF al día.",
      "El seguro de rescate en montaña (Rega) cuesta solo 40 CHF/año y cubre toda Suiza.",
    ],
  },
  {
    slug: "fin-de-semana-ticino",
    titulo: "Un fin de semana en el Ticino",
    subtitulo: "La Italia de Suiza: lagos, palmeras y dolce vita",
    duracion: "2–3 días",
    presupuesto: "350–500 CHF/persona",
    dificultad: "Fácil",
    perfil: "Parejas, escapada romántica, primavera/verano",
    emoji: "🌴",
    color: "#2d6a4f",
    imagen: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1200&q=85&auto=format&fit=crop",
    descripcion: "El Ticino es el secreto mejor guardado de Suiza: idioma italiano, palmeras, lagos turquesa y pueblos medievales con encanto mediterráneo. A solo 2 horas de Zúrich.",
    highlights: ["Lago Lugano desde Monte Brè", "Valle Verzasca: el agua más turquesa del mundo", "Morcote: el pueblo más bonito de Suiza", "Lago Maggiore y las Isole di Brissago", "Risotto al tartufo en Lugano"],
    dias: [
      {
        dia: 1,
        lugar: "Lugano",
        actividades: [
          { nombre: "Tren desde Zúrich a Lugano (2h) o Milán a Lugano (1h)", duracion: "2h" },
          { nombre: "Funicular al Monte Brè y vistas al lago", url: "/planes/ticino/lugano-lago-monte-bre", duracion: "3h", precio: "30 CHF ida/vuelta" },
          { nombre: "Paseo por Via Nassa y el centro histórico de Lugano", url: "/planes/ticino/lugano-ciudad-cultura", duracion: "2h" },
          { nombre: "Cena en la piazza con risotto y vino Merlot ticino", duracion: "2h", precio: "40–60 CHF" },
        ],
        donde_dormir: "Lugano (100–200 CHF)",
        tip: "El Luganocard (25 CHF) incluye transporte local y descuentos en museos y barcas.",
      },
      {
        dia: 2,
        lugar: "Valle Verzasca y Morcote",
        actividades: [
          { nombre: "Valle Verzasca: baño en el agua turquesa (el lugar de James Bond)", url: "/planes/ticino/valle-verzasca", duracion: "3–4h" },
          { nombre: "Almuerzo de picnic junto al río", duracion: "1h" },
          { nombre: "Barco desde Lugano hasta Morcote", url: "/planes/ticino/morcote-pueblo-lago", duracion: "3h", precio: "12 CHF barco" },
          { nombre: "Paseo por las callejuelas de Morcote", duracion: "1.5h" },
        ],
        tip: "El Valle Verzasca está a 30 min de Locarno en autobús. La piscina natural de Lavertezzo es el sitio exacto.",
      },
      {
        dia: 3,
        lugar: "Lago Maggiore — Locarno y Ascona",
        actividades: [
          { nombre: "Barco en el Lago Maggiore hasta las Isole di Brissago", url: "/planes/ticino/lago-maggiore-ascona", duracion: "3h", precio: "20–30 CHF" },
          { nombre: "Paseo por Ascona: el pueblo más lujoso del Ticino", duracion: "2h" },
          { nombre: "Cardada-Cimetta: teleférico con vistas al lago", url: "/planes/ticino/cimetta-cardada-locarno", duracion: "3h", precio: "32 CHF" },
        ],
        tip: "Desde Cardada se ven simultáneamente el Lago Maggiore y el Valle Maggia: impresionante.",
      },
    ],
    coste_estimado: [
      { concepto: "Tren Zúrich–Lugano (ida/vuelta)", precio: "80–120 CHF" },
      { concepto: "Alojamiento 2 noches", precio: "200–400 CHF" },
      { concepto: "Barcos y teleféricos", precio: "80–120 CHF" },
      { concepto: "Comidas 3 días (comida italiana más barata que en norte)", precio: "120–180 CHF" },
    ],
    consejos_generales: [
      "El Ticino es el cantón más soleado de Suiza: en primavera ya se puede nadar en los lagos.",
      "El Ticino Pass cubre todos los barcos, funiculares y transporte público por 38 CHF/día.",
      "La gastronomía es italiana: risotto, polenta, ossobuco. Mucho más accesible que en la Suiza alemana.",
      "Desde Lugano puedes visitar Milán en tren (1 hora): perfecto para combinar.",
      "Morcote es aún más bonito de noche: si puedes, quédate a cenar allí.",
    ],
  },
  {
    slug: "ruta-cultural-ginebra-lausana-berna",
    titulo: "Ruta cultural: Ginebra – Lausana – Berna",
    subtitulo: "Diplomacia, olimpismo y arte en la Suiza francesa",
    duracion: "4 días",
    presupuesto: "600–900 CHF/persona",
    dificultad: "Fácil",
    perfil: "Viajeros culturales, historia, arquitectura, gastronomía",
    emoji: "🏛️",
    color: "#4a4e69",
    imagen: "https://images.unsplash.com/photo-1749195403421-b40b0ff3cae7?w=1200&q=85&auto=format&fit=crop",
    descripcion: "La Romandy (Suiza francesa) en toda su dimensión: Ginebra con el Jet d'Eau y las instituciones internacionales, Lausana con el Museo Olímpico, y Berna la capital federal con sus arcadas medievales.",
    highlights: ["Jet d'Eau y Vieille Ville de Ginebra", "Palacio de las Naciones (visita ONU)", "Museo Olímpico de Lausana", "Viñedos de Lavaux (UNESCO) en barco", "Ciudad Vieja de Berna (UNESCO)"],
    dias: [
      {
        dia: 1,
        lugar: "Ginebra",
        actividades: [
          { nombre: "Jet d'Eau y paseo por el lago Lemán", url: "/planes/ginebra/jet-eau-paseo-leman", duracion: "2h" },
          { nombre: "Vieille Ville y Catedral de Saint-Pierre (subida a las torres)", url: "/planes/ginebra/vieille-ville-ginebra", duracion: "2.5h" },
          { nombre: "Museo de Arte e Historia (colección gratuita)", url: "/planes/ginebra/museo-arte-historia-ginebra", duracion: "2h" },
          { nombre: "Cena en el barrio de Plainpalais: gastronomía internacional", duracion: "2h" },
        ],
        donde_dormir: "Ginebra (140–220 CHF)",
        tip: "La Geneva City Card (35 CHF) incluye todos los museos municipales + transporte público.",
      },
      {
        dia: 2,
        lugar: "Ginebra — ONU y Lausana",
        actividades: [
          { nombre: "Palacio de las Naciones: visita guiada a la ONU", duracion: "2h", precio: "15 CHF" },
          { nombre: "Tren Ginebra → Lausana (40 min)", duracion: "40min", precio: "10 CHF" },
          { nombre: "Museo Olímpico: el museo más interactivo de Suiza", url: "/planes/vaud/lausana-olimpismo", duracion: "2.5h", precio: "18 CHF" },
          { nombre: "Paseo en el puerto de Ouchy y cena", duracion: "2h" },
        ],
        donde_dormir: "Lausana (120–200 CHF)",
        tip: "El museo olímpico tiene entrada gratis para deportistas olímpicos. Compra entrada online.",
      },
      {
        dia: 3,
        lugar: "Lavaux — Viñedos UNESCO + Castillo Chillon",
        actividades: [
          { nombre: "Barco por los viñedos de Lavaux desde Lausana hasta Montreux", url: "/planes/vaud/vinedos-lavaux-barco", duracion: "3h", precio: "25 CHF" },
          { nombre: "Castillo de Chillon: el castillo más visitado de Suiza", url: "/planes/vaud/castillo-chillon", duracion: "2h", precio: "13 CHF" },
          { nombre: "Paseo en Montreux: Queen y el festival de jazz", duracion: "1.5h" },
        ],
        tip: "En junio, el Festival de Jazz de Montreux es uno de los mejores del mundo (muchos conciertos gratuitos).",
      },
      {
        dia: 4,
        lugar: "Berna — Capital federal",
        actividades: [
          { nombre: "Tren Montreux → Berna (1.5h)", duracion: "1.5h" },
          { nombre: "Ciudad Vieja UNESCO: Zytglogge, arcadas, Bundeshaus", url: "/planes/berna/ciudad-berna-historica", duracion: "3h" },
          { nombre: "Rosengarten: jardín de rosas con vistas panorámicas", url: "/planes/berna/berna-rosen-rosengarten", duracion: "1.5h" },
          { nombre: "Kunstmuseum Bern: colección de Klee", duracion: "1.5h", precio: "22 CHF" },
        ],
        tip: "En Berna los museos son muy buenos pero poco conocidos. El Zentrum Paul Klee merece la visita.",
      },
    ],
    coste_estimado: [
      { concepto: "Alojamiento 3 noches (media 170 CHF)", precio: "510 CHF" },
      { concepto: "Swiss Travel Pass 4 días", precio: "340 CHF" },
      { concepto: "Entradas museos y atracciones", precio: "80–120 CHF" },
      { concepto: "Comidas 4 días", precio: "180–280 CHF" },
    ],
    consejos_generales: [
      "La Romandy tiene un ritmo más tranquilo que la Suiza alemana: disfruta de los cafés y la tradición francesa.",
      "El francés es el idioma oficial: los españoles lo entendemos mejor que el alemán.",
      "En Lausana, el metro más corto y empinado del mundo (el LEB) es una curiosidad turística.",
      "El Museo Olímpico cierra los lunes: planifica tu visita en consecuencia.",
      "En Berna, los restaurantes debajo de las arcadas protegen de la lluvia: perfecto si el tiempo no acompaña.",
    ],
  },
];

// ─── Componentes ──────────────────────────────────────────────────────────────

function ItinerarioCard({ it, expanded = false }: { it: Itinerario; expanded?: boolean }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Image src={it.imagen} alt={it.titulo} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="text-3xl">{it.emoji}</span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="font-bold text-xl leading-tight mb-1">{it.titulo}</div>
          <div className="text-sm text-gray-300">{it.subtitulo}</div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">⏱ {it.duracion}</span>
          <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">💰 {it.presupuesto}</span>
          <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">🧗 {it.dificultad}</span>
        </div>

        <p className="text-sm text-gray-600 mb-4 leading-relaxed">{it.descripcion}</p>

        <div className="mb-4">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Highlights</div>
          <ul className="space-y-1">
            {it.highlights.slice(0, 4).map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                <span className="text-green-500 flex-shrink-0 mt-0.5">✓</span>
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div className="text-xs text-gray-500 mb-4">
          <span className="font-medium">Perfil:</span> {it.perfil}
        </div>

        <Link href={`/planes/itinerarios/${it.slug}`}
          className="block w-full text-center bg-gray-800 hover:bg-gray-700 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors">
          Ver itinerario completo →
        </Link>
      </div>
    </div>
  );
}

// ─── Página ───────────────────────────────────────────────────────────────────

export default function ItinerariosPage() {
  const esqui = itinerarios.find(i => i.slug === "ruta-del-esqui");
  const familia = itinerarios.find(i => i.slug === "suiza-en-familia");
  const resto = itinerarios.filter(i => i.slug !== "ruta-del-esqui" && i.slug !== "suiza-en-familia");

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-red-700">Inicio</Link>
        <span>›</span>
        <Link href="/planes" className="hover:text-red-700">Planes</Link>
        <span>›</span>
        <span className="text-gray-600">Itinerarios</span>
      </nav>

      {/* Hero */}
      <div className="text-center mb-12">
        <div className="text-5xl mb-4">🗓️</div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Itinerarios curados para Suiza
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          Desde un fin de semana hasta una semana completa. Planificados por hispanohablantes para hispanohablantes, con precios reales, horarios y consejos que no encontrarás en las guías típicas.
        </p>
      </div>

      {/* Perfiles rápidos */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
        {[
          { emoji: "👨‍👩‍👧", label: "Familias", desc: "Niños y actividades fáciles" },
          { emoji: "⛷️", label: "Esquí", desc: "Las mejores estaciones" },
          { emoji: "🏔️", label: "Aventura", desc: "Alpes y alta montaña" },
          { emoji: "🏛️", label: "Cultura", desc: "Historia, arte y ciudades" },
        ].map(p => (
          <div key={p.label} className="bg-gray-50 rounded-xl p-4 text-center hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="text-3xl mb-2">{p.emoji}</div>
            <div className="font-semibold text-gray-800 text-sm">{p.label}</div>
            <div className="text-xs text-gray-500 mt-0.5">{p.desc}</div>
          </div>
        ))}
      </div>

      {/* Grid de itinerarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {itinerarios.map(it => (
          <ItinerarioCard key={it.slug} it={it} />
        ))}
      </div>

      {/* Detalle expandido de uno como ejemplo */}
      {esqui && (
        <div className="mb-12 bg-gradient-to-br from-blue-950 to-blue-900 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">⛷️</span>
            <div>
              <h2 className="text-xl font-bold">{esqui.titulo}</h2>
              <p className="text-blue-300 text-sm">{esqui.subtitulo}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-blue-200 text-sm uppercase tracking-wide">Día a día</h3>
              <div className="space-y-3">
                {esqui.dias.map(d => (
                  <div key={d.dia} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-red-700 rounded-full flex items-center justify-center text-xs font-bold">{d.dia}</span>
                    <div>
                      <div className="font-semibold text-sm">{d.lugar}</div>
                      <div className="text-xs text-blue-300">{d.actividades[0]?.nombre}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-blue-200 text-sm uppercase tracking-wide">Coste estimado</h3>
              <div className="space-y-2">
                {esqui.coste_estimado.map((c, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-blue-200">{c.concepto}</span>
                    <span className="font-semibold">{c.precio}</span>
                  </div>
                ))}
              </div>
              <Link href={`/planes/itinerarios/${esqui.slug}`}
                className="mt-4 block text-center bg-white text-blue-900 font-bold py-2.5 rounded-xl text-sm hover:bg-blue-50 transition-colors">
                Ver itinerario completo →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="bg-gray-50 rounded-2xl p-8 text-center">
        <h3 className="font-bold text-gray-800 text-lg mb-2">¿Tienes un plan diferente?</h3>
        <p className="text-gray-500 text-sm mb-4">
          Explora todos los planes por cantón, usa el mapa interactivo o filtra por tipo de actividad.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/planes"
            className="bg-red-700 hover:bg-red-600 text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors">
            🗺️ Todos los planes
          </Link>
          <Link href="/herramientas/comparador-ciudades"
            className="bg-white border border-gray-200 hover:border-gray-300 text-gray-700 font-semibold px-5 py-2.5 rounded-full text-sm transition-colors">
            🧮 Calcular presupuesto
          </Link>
        </div>
      </div>
    </div>
  );
}

export { itinerarios };
