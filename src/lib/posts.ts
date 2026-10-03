export type FaqItem = { pregunta: string; respuesta: string };

export type Post = {
  slug: string;
  titulo: string;
  descripcion: string;
  categoria: string;
  fecha: string;
  tiempoLectura: number;
  imagen: string;
  destacado?: boolean;
  contenido?: string;
  palabrasClave?: string[];
  faq?: FaqItem[];
  autor?: string;
  fechaModificada?: string;
};

export const categorias = [
  { slug: "emigrar",    label: "Emigrar a Suiza",   icono: "✈️" },
  { slug: "vivienda",   label: "Vivienda",           icono: "🏠" },
  { slug: "trabajo",    label: "Trabajo",            icono: "💼" },
  { slug: "banca",      label: "Banca y Finanzas",   icono: "🏦" },
  { slug: "seguros",    label: "Seguros",            icono: "🛡️" },
  { slug: "vida-diaria",label: "Vida diaria",        icono: "☕" },
];

export const posts: Post[] = [
  {
    slug: "guia-emigrar-suiza-espanoles-2026",
    titulo: "Guía completa para emigrar a Suiza en 2026: todo lo que nadie te cuenta",
    descripcion: "Desde el permiso de residencia hasta encontrar piso, pasando por abrir una cuenta bancaria. La guía más completa en español para mudarte a Suiza.",
    categoria: "emigrar",
    fecha: "2026-09-15",
    tiempoLectura: 12,
    imagen: "/images/emigrar-suiza.jpg",
    destacado: true,
    palabrasClave: ["emigrar a suiza", "vivir en suiza", "permiso residencia suiza", "mudarse a suiza", "españoles en suiza", "latinoamericanos suiza"],
    faq: [
      { pregunta: "¿Necesito visado para emigrar a Suiza siendo español?", respuesta: "No. Los ciudadanos españoles y de la UE/EEE tienen libre circulación y pueden entrar sin visado. Tienes 90 días para buscar trabajo y luego obtienes el permiso B automáticamente al ser contratado." },
      { pregunta: "¿Qué permiso de residencia necesito en Suiza?", respuesta: "Los más comunes son el Permiso L (estancia corta hasta 1 año), el Permiso B (residencia de 1-5 años, el más habitual para trabajadores nuevos) y el Permiso C (residencia permanente tras 5-10 años)." },
      { pregunta: "¿Cuánto dinero necesito para emigrar a Suiza?", respuesta: "Se recomienda tener entre 3.000 y 5.000 CHF de reserva para los primeros meses: depósito del piso (2-3 meses de alquiler), seguro médico del primer mes, y gastos de instalación. El primer salario suele llegar a los 30 días." },
      { pregunta: "¿Cuándo debo contratar el seguro médico obligatorio en Suiza?", respuesta: "Tienes 3 meses desde tu llegada para contratar el seguro básico KVG/LAMal. Si no lo haces, te lo asignan por defecto y puedes pagar más. Compara en Comparis.ch antes de contratar." },
    ],
    contenido: `
<h2>Por qué Suiza y por qué ahora</h2>
<p>Suiza sigue siendo uno de los destinos más atractivos para españoles y latinoamericanos: los salarios más altos de Europa, calidad de vida excepcional y una demanda constante de trabajadores cualificados. En 2026, hay más de 142.000 hispanohablantes viviendo allí.</p>
<p>Pero emigrar a Suiza tiene una curva de aprendizaje brutal. El sistema suizo no se parece a nada que hayas visto antes: cantones con leyes distintas, idiomas según la región, seguros obligatorios que hay que contratar tú mismo, y alquileres que requieren documentación que no sabías que existía.</p>
<p>Esta guía recoge lo que descubrimos nosotros mismos al llegar, más las experiencias reales de la comunidad.</p>

<h2>Antes de llegar: qué gestionar desde España o Latinoamérica</h2>
<p>El error más común es llegar sin contrato de trabajo. A diferencia de otros países europeos, Suiza requiere que tengas trabajo antes de poder empadronarte de forma estable.</p>
<ul>
  <li><strong>Ciudadanos de la UE/EEE (españoles):</strong> libre circulación. Puedes llegar sin visado y tienes 90 días para encontrar trabajo.</li>
  <li><strong>Latinoamericanos:</strong> necesitas contrato previo para tramitar el permiso L o B desde el consulado suizo.</li>
  <li>Abre una cuenta <strong>Wise o Revolut</strong> antes de llegar — los bancos suizos tardan semanas en activarse.</li>
</ul>

<blockquote>"Llegué con €2.000 en efectivo pensando que en dos semanas tendría cuenta bancaria. Tardé un mes. Wise me salvó la vida." — Carlos, Valencia → Zúrich</blockquote>

<h2>Los permisos de residencia: L, B y C explicados</h2>
<p>El sistema de permisos es lo que más confunde al llegar:</p>
<ul>
  <li><strong>Permiso L:</strong> estancia corta (hasta 1 año). Generalmente para contratos temporales.</li>
  <li><strong>Permiso B:</strong> residencia de 1-5 años. El más común para trabajadores nuevos.</li>
  <li><strong>Permiso C:</strong> residencia permanente. Se obtiene tras 5-10 años según nacionalidad.</li>
</ul>
<p>Los españoles obtienen automáticamente permiso B al empezar a trabajar. Latinoamericanos deben tramitarlo antes de viajar.</p>

<h2>El seguro médico obligatorio: primer paso tras llegar</h2>
<p>Tienes <strong>3 meses desde tu llegada</strong> para contratar el seguro de salud básico (KVG/LAMal). Si no lo haces, te lo asignan por defecto y pagas más. El coste varía entre 300 y 500 CHF/mes según cantón y aseguradora.</p>
<p>Compara en <strong>Comparis.ch</strong> antes de contratar. Es la herramienta oficial para comparar tarifas.</p>

<h2>Encontrar vivienda: el gran obstáculo</h2>
<p>Encontrar piso en Suiza es difícil para todos, pero más para recién llegados sin historial suizo. Los portales principales son Homegate.ch e ImmoScout24.ch.</p>
<p>Lo que piden siempre: extracto de deudas (Betreibungsregisterauszug), últimas 3 nóminas, permiso de residencia y cartas de recomendación del anterior casero.</p>

<h2>Primeras semanas: checklist de supervivencia</h2>
<ul>
  <li>Empadronarte en la Gemeinde/Commune (ayuntamiento) de tu municipio</li>
  <li>Contratar el seguro médico obligatorio</li>
  <li>Abrir cuenta bancaria (PostFinance es la más accesible para recién llegados)</li>
  <li>Buscar y contratar seguro de hogar (Hausratsversicherung) — muy recomendable</li>
  <li>Registrarte en el consulado español si eres ciudadano español</li>
</ul>
    `
  },
  {
    slug: "alquilar-piso-suiza-guia-hispanohablantes",
    titulo: "Cómo alquilar un piso en Suiza siendo hispanohablante: documentos, trucos y portales",
    descripcion: "El mercado de alquiler suizo es exigente. Te explicamos exactamente qué documentos piden, qué portales usar y cómo destacar tu candidatura.",
    categoria: "vivienda",
    fecha: "2026-09-20",
    tiempoLectura: 9,
    imagen: "/images/vivienda-suiza.jpg",
    destacado: true,
    palabrasClave: ["alquilar piso suiza", "vivienda suiza", "homegate", "flatfox", "alquiler suiza", "piso suiza extranjero"],
    faq: [
      { pregunta: "¿Qué documentos piden para alquilar un piso en Suiza?", respuesta: "Los caseros suizos suelen pedir: extracto de deudas (Betreibungsregisterauszug), últimas 3 nóminas, copia del permiso de residencia, carta de presentación y referencia del anterior casero." },
      { pregunta: "¿Cuánto cuesta el depósito de un piso en Suiza?", respuesta: "El depósito habitual es de 2 a 3 meses de alquiler, depositado en una cuenta bancaria bloqueada a nombre del inquilino. Este dinero te lo devuelven al terminar el contrato si no hay daños." },
      { pregunta: "¿Cuáles son los mejores portales para buscar piso en Suiza?", respuesta: "Los principales portales son Homegate.ch, ImmoScout24.ch, flatfox.ch y Comparis.ch. Para recién llegados, también es útil buscar en grupos de Facebook de hispanohablantes en Suiza." },
    ],
  },
  {
    slug: "mejores-cuentas-bancarias-expatriados-suiza",
    titulo: "Las mejores cuentas bancarias para expatriados en Suiza en 2026",
    descripcion: "Comparativa honesta: PostFinance, UBS, Revolut, N26 y Wise. Cuál elegir según tu situación y cuánto cuesta cada una.",
    categoria: "banca",
    fecha: "2026-09-25",
    tiempoLectura: 7,
    imagen: "/images/banca-suiza.jpg",
    destacado: false,
    palabrasClave: ["cuenta bancaria suiza extranjero", "banco suiza expatriado", "postfinance", "ubs suiza", "wise suiza", "cuenta bancaria suiza"],
    faq: [
      { pregunta: "¿Puede un extranjero abrir una cuenta bancaria en Suiza?", respuesta: "Sí, con permiso de residencia (L o B) es posible abrir cuenta en PostFinance, UBS, Raiffeisen u otras. PostFinance es la más accesible para recién llegados. También puedes usar Wise o Revolut sin permiso." },
      { pregunta: "¿Cuánto cuesta mantener una cuenta bancaria en Suiza?", respuesta: "Varía entre 0 y 25 CHF/mes según el banco. PostFinance cobra unos 5-7 CHF/mes. Revolut y N26 tienen planes gratuitos. UBS y Credit Suisse pueden llegar a 25 CHF/mes." },
    ],
  },
  {
    slug: "seguro-medico-obligatorio-suiza-kvg",
    titulo: "Seguro médico obligatorio en Suiza (KVG): cómo elegir y cuánto pagarás",
    descripcion: "Todo sobre el seguro de salud obligatorio suizo: qué cubre, cómo comparar aseguradoras, la franquicia y cómo ahorrar hasta 1.200 CHF al año.",
    categoria: "seguros",
    fecha: "2026-09-28",
    tiempoLectura: 8,
    imagen: "/images/seguros-suiza.jpg",
    destacado: false,
    palabrasClave: ["seguro medico suiza", "kvg suiza", "lamal suiza", "seguro salud suiza", "krankenversicherung", "seguro obligatorio suiza"],
    faq: [
      { pregunta: "¿Es obligatorio el seguro médico en Suiza?", respuesta: "Sí, el seguro básico KVG (Krankenversicherung) es obligatorio para todos los residentes en Suiza, incluidos extranjeros. Debes contratarlo en los 3 primeros meses tras tu llegada." },
      { pregunta: "¿Cuánto cuesta el seguro médico en Suiza?", respuesta: "El coste varía entre 300 y 600 CHF/mes por persona adulta, dependiendo del cantón, la aseguradora y la franquicia elegida. Puedes reducir la prima eligiendo una franquicia alta (2.500 CHF) si eres joven y sano." },
      { pregunta: "¿Cómo puedo comparar seguros médicos en Suiza?", respuesta: "La herramienta oficial es Comparis.ch, que permite comparar todas las aseguradoras por cantón y franquicia. También puedes usar Priminfo.ch, el comparador oficial del gobierno suizo." },
    ],
  },
  {
    slug: "trabajar-suiza-latinoamericanos-visado-proceso",
    titulo: "Cómo trabajar en Suiza siendo latinoamericano: visado, proceso y realidad",
    descripcion: "La guía que no existe en ningún otro sitio: el proceso real para conseguir trabajo en Suiza viniendo de Colombia, México, Perú, Argentina o cualquier país latinoamericano.",
    categoria: "trabajo",
    fecha: "2026-10-01",
    tiempoLectura: 11,
    imagen: "/images/trabajo-suiza.jpg",
    destacado: true,
    palabrasClave: ["trabajar en suiza latinoamericano", "visa trabajo suiza", "permiso trabajo suiza", "trabajo suiza colombiano", "trabajo suiza mexicano", "emigrar suiza latinoamerica"],
    faq: [
      { pregunta: "¿Pueden los latinoamericanos trabajar en Suiza?", respuesta: "Sí, pero necesitan una oferta de trabajo previa ya que no tienen libre circulación. El empleador suizo debe demostrar que no encontró candidato en la UE antes de contratar a un latinoamericano (cuota contingente)." },
      { pregunta: "¿Qué visa necesita un latinoamericano para trabajar en Suiza?", respuesta: "Necesita un visado de trabajo (tipo D) que el empleador tramita con las autoridades cantonales. Una vez aprobado, se convierte en Permiso B (residencia por trabajo) al llegar." },
      { pregunta: "¿Cuáles son los sectores que más contratan extranjeros en Suiza?", respuesta: "Los sectores con mayor demanda son: tecnología (IT/software), banca y finanzas, sanidad (médicos y enfermeros), hostelería, ingeniería y construcción." },
    ],
  },
  {
    slug: "coste-vida-zurich-ginebra-berna-comparativa",
    titulo: "Coste de vida real en Zúrich, Ginebra y Berna: comparativa con datos reales de 2026",
    descripcion: "Cuánto necesitas ganar para vivir bien en cada ciudad suiza. Alquiler, comida, transporte y ocio con datos actualizados de la comunidad.",
    categoria: "vida-diaria",
    fecha: "2026-10-02",
    tiempoLectura: 10,
    imagen: "/images/vida-suiza.jpg",
    destacado: false,
    palabrasClave: ["coste vida suiza", "coste vida zurich", "coste vida ginebra", "precio alquiler zurich", "salario minimo suiza", "cuanto cuesta vivir en suiza"],
    faq: [
      { pregunta: "¿Cuánto cuesta vivir en Zúrich al mes?", respuesta: "Una persona sola en Zúrich necesita entre 3.500 y 4.500 CHF/mes para vivir con comodidad: alquiler (1.500-2.200 CHF), seguro médico (400-500 CHF), comida (400-600 CHF), transporte (100 CHF) y ocio (300-500 CHF)." },
      { pregunta: "¿Es Ginebra más cara que Zúrich?", respuesta: "Ginebra y Zúrich tienen costes similares y son las dos ciudades más caras de Suiza. Ginebra suele tener alquileres ligeramente más altos, pero los salarios también son mayores, especialmente en el sector internacional y bancario." },
      { pregunta: "¿Cuál es el salario mínimo en Suiza?", respuesta: "Suiza no tiene salario mínimo federal. Los mínimos se fijan por convenio colectivo según sector. El cantón de Ginebra tiene el salario mínimo más alto: 24 CHF/hora (aprox. 4.000 CHF/mes). La media nacional es de 6.500 CHF brutos/mes." },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find(p => p.slug === slug);
}

export function getPostsByCategoria(categoria: string): Post[] {
  return posts.filter(p => p.categoria === categoria);
}

export function getDestacados(): Post[] {
  return posts.filter(p => p.destacado);
}
