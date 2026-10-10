import { postsAuto } from "./posts-auto";

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

const postsManual: Post[] = [
  // ─────────────────────────────────────────────────────────
  // 1. GUÍA EMIGRAR — artículo principal
  // ─────────────────────────────────────────────────────────
  {
    slug: "guia-emigrar-suiza-espanoles-2026",
    titulo: "Guía completa para emigrar a Suiza en 2026: todo lo que nadie te cuenta",
    descripcion: "Desde el permiso de residencia hasta encontrar piso, pasando por abrir una cuenta bancaria. La guía más completa en español para mudarte a Suiza.",
    categoria: "emigrar",
    fecha: "2026-09-15",
    tiempoLectura: 12,
    imagen: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85&auto=format&fit=crop",
    destacado: true,
    fechaModificada: "2026-10-09",
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
<p>Tienes <strong>3 meses desde tu llegada</strong> para contratar el <a href="/seguros">seguro de salud básico (KVG/LAMal)</a>. Si no lo haces, te lo asignan por defecto y pagas más. El coste varía entre 300 y 500 CHF/mes según cantón y aseguradora.</p>
<p>Usa nuestra <a href="/herramientas/seguros-medicos">calculadora de seguros médicos</a> para comparar precios por cantón, edad y franquicia antes de contratar.</p>

<h2>Encontrar vivienda: el gran obstáculo</h2>
<p>Encontrar piso en Suiza es difícil para todos, pero más para recién llegados sin historial suizo. Los portales principales son Homegate.ch e ImmoScout24.ch. En nuestro <a href="/vivienda">buscador de vivienda</a> puedes acceder a todos los portales directamente con tu búsqueda ya aplicada.</p>
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

  // ─────────────────────────────────────────────────────────
  // 2. ALQUILAR PISO
  // ─────────────────────────────────────────────────────────
  {
    slug: "alquilar-piso-suiza-guia-hispanohablantes",
    titulo: "Cómo alquilar un piso en Suiza siendo hispanohablante: documentos, trucos y portales",
    descripcion: "El mercado de alquiler suizo es exigente. Te explicamos exactamente qué documentos piden, qué portales usar y cómo destacar tu candidatura.",
    categoria: "vivienda",
    fecha: "2026-09-20",
    tiempoLectura: 9,
    imagen: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200&q=85&auto=format&fit=crop",
    destacado: true,
    fechaModificada: "2026-10-09",
    palabrasClave: ["alquilar piso suiza", "vivienda suiza", "homegate", "flatfox", "alquiler suiza", "piso suiza extranjero"],
    faq: [
      { pregunta: "¿Qué documentos piden para alquilar un piso en Suiza?", respuesta: "Los caseros suizos suelen pedir: extracto de deudas (Betreibungsregisterauszug), últimas 3 nóminas, copia del permiso de residencia, carta de presentación y referencia del anterior casero." },
      { pregunta: "¿Cuánto cuesta el depósito de un piso en Suiza?", respuesta: "El depósito habitual es de 2 a 3 meses de alquiler, depositado en una cuenta bancaria bloqueada a nombre del inquilino. Este dinero te lo devuelven al terminar el contrato si no hay daños." },
      { pregunta: "¿Cuáles son los mejores portales para buscar piso en Suiza?", respuesta: "Los principales portales son Homegate.ch, ImmoScout24.ch, flatfox.ch y Comparis.ch. Para recién llegados, también es útil buscar en grupos de Facebook de hispanohablantes en Suiza." },
      { pregunta: "¿Puede un extranjero sin historial suizo alquilar un piso?", respuesta: "Sí, aunque es más difícil. La clave es compensar la falta de historial con una carta de presentación sólida, referencias de empleadores, y si es posible, ofrecer un depósito más alto o un aval." },
    ],
    contenido: `
<h2>Por qué alquilar en Suiza es diferente a todo lo que conoces</h2>
<p>El mercado de alquiler suizo tiene reglas propias. La demanda supera con creces la oferta en las ciudades principales — en Zúrich, un piso puede recibir más de 100 candidaturas en 48 horas. Para un recién llegado sin historial suizo, la competencia es brutal.</p>
<p>Pero hay buenas noticias: si preparas bien la documentación y sabes en qué portales buscar, tienes opciones reales. Aquí va todo lo que necesitas saber.</p>

<h2>Los portales donde buscar: no todos son iguales</h2>
<p>No pierdas tiempo en portales secundarios. Los que realmente funcionan son:</p>
<ul>
  <li><strong>Homegate.ch</strong> — el mayor portal de Suiza. Cubre todo el país con miles de anuncios actualizados diariamente.</li>
  <li><strong>ImmoScout24.ch</strong> — el segundo en volumen, especialmente fuerte en la Suiza alemana.</li>
  <li><strong>Flatfox.ch</strong> — muy popular entre propietarios particulares, sin agencias intermediarias. Menos competencia y más directo.</li>
  <li><strong>Comparis.ch</strong> — agrega anuncios de otros portales. Útil para tener una visión global.</li>
  <li><strong>Anibis.ch</strong> — anuncios de particulares, sin filtros. Puedes encontrar pisos compartidos o situaciones más flexibles.</li>
</ul>
<p>También vale la pena buscar en grupos de Facebook específicos: "Españoles en Zúrich", "Hispanohablantes en Ginebra", etc. Muchos pisos circulan solo por esas redes antes de aparecer en portales.</p>

<h2>Los documentos que sí o sí te van a pedir</h2>
<p>Esta es la parte que más sorprende a los recién llegados. En Suiza, un casero puede y suele pedir todo esto antes de mostrar el piso:</p>
<ul>
  <li><strong>Betreibungsregisterauszug (extracto de deudas):</strong> certificado oficial que demuestra que no tienes deudas ni embargos en Suiza. Si acabas de llegar, explica que eres nuevo residente — normalmente lo entienden.</li>
  <li><strong>Últimas 3 nóminas</strong> o contrato de trabajo firmado.</li>
  <li><strong>Copia del permiso de residencia</strong> (L o B).</li>
  <li><strong>Carta de presentación personal</strong> — en Suiza esto es serio, no opcional. Una carta de 1 página presentándote, explicando por qué quieres ese piso y mostrando que eres un inquilino responsable.</li>
  <li><strong>Referencias del anterior casero</strong> — si vienes de fuera, sustituye esto por referencias de tu empleador.</li>
</ul>
<blockquote>"Me rechazaron 6 pisos antes de entender que la carta de presentación marcaba la diferencia. La séptima candidatura incluía una carta de 2 páginas en alemán y me la dieron." — Alejandra, Bogotá → Basilea</blockquote>

<h2>Precios reales por ciudad en 2026</h2>
<p>Los precios varían enormemente según la ciudad y el barrio. Como referencia para un apartamento de 1 habitación en zona no céntrica:</p>
<ul>
  <li><strong>Zúrich:</strong> 1.600 – 2.200 CHF/mes</li>
  <li><strong>Ginebra:</strong> 1.500 – 2.100 CHF/mes</li>
  <li><strong>Basilea:</strong> 1.200 – 1.700 CHF/mes</li>
  <li><strong>Berna:</strong> 1.200 – 1.600 CHF/mes</li>
  <li><strong>Lausana:</strong> 1.300 – 1.800 CHF/mes</li>
  <li><strong>Zug:</strong> 1.500 – 2.000 CHF/mes (muy demandada por baja fiscalidad)</li>
</ul>
<p>Recuerda que al precio del alquiler hay que sumar los gastos adicionales (Nebenkosten): agua, calefacción, basura. Suelen ser entre 100 y 250 CHF/mes adicionales.</p>

<h2>El depósito: cómo funciona y cómo protegerte</h2>
<p>En Suiza, el depósito se ingresa en una cuenta bancaria bloqueada a nombre del inquilino — no va directamente al casero. Esto te protege: si hay un conflicto al salir, hay un procedimiento formal para liberar ese dinero.</p>
<p>El máximo legal es 3 meses de alquiler neto. Si un casero te pide más, es ilegal.</p>
<p>Al salir del piso, el casero tiene 30 días para reclamar daños. Si no lo hace, la cuenta se desbloquea automáticamente.</p>

<h2>Trucos para destacar como candidato extranjero</h2>
<ol>
  <li><strong>Escribe la carta en el idioma del cantón</strong> — en Zúrich en alemán, en Ginebra en francés. Google Translate más corrección nativa funciona. Demuestra que respetas la cultura local.</li>
  <li><strong>Incluye foto profesional</strong> — en Suiza es común y se valora positivamente.</li>
  <li><strong>Sé el primero en responder</strong> — activa notificaciones en Homegate y responde en los primeros 30 minutos del anuncio.</li>
  <li><strong>Ofrece más meses de depósito si puedes</strong> — 3 meses en lugar de 2 puede inclinar la balanza a tu favor.</li>
  <li><strong>Carta del empleador</strong> — pide a tu empresa que confirme por escrito tu contrato y salario. Vale más que 10 nóminas.</li>
</ol>

<h2>Mientras buscas piso: opciones temporales</h2>
<p>Nadie te va a dar un piso el primer día. Necesitas entre 2 semanas y 3 meses en ciudades con alta demanda. Opciones para ese período:</p>
<ul>
  <li><strong>WG-Zimmer (piso compartido):</strong> busca en Wgzimmer.ch o en grupos de Facebook. Mucho más fácil de conseguir que un piso entero.</li>
  <li><strong>Furnished apartments a corto plazo:</strong> Airbnb, HomeToGo, o plataformas como Homelike.com (orientado a expatriados).</li>
  <li><strong>Corporate housing:</strong> si tu empresa te trae, pídeles alojamiento temporal — muchas lo ofrecen o conocen opciones.</li>
</ul>
    `
  },

  // ─────────────────────────────────────────────────────────
  // 3. CUENTAS BANCARIAS
  // ─────────────────────────────────────────────────────────
  {
    slug: "mejores-cuentas-bancarias-expatriados-suiza",
    titulo: "Las mejores cuentas bancarias para expatriados en Suiza en 2026",
    descripcion: "Comparativa honesta: PostFinance, UBS, Revolut, N26 y Wise. Cuál elegir según tu situación y cuánto cuesta cada una.",
    categoria: "banca",
    fecha: "2026-09-25",
    tiempoLectura: 7,
    imagen: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=85&auto=format&fit=crop",
    destacado: false,
    fechaModificada: "2026-10-09",
    palabrasClave: ["cuenta bancaria suiza extranjero", "banco suiza expatriado", "postfinance", "ubs suiza", "wise suiza", "cuenta bancaria suiza"],
    faq: [
      { pregunta: "¿Puede un extranjero abrir una cuenta bancaria en Suiza?", respuesta: "Sí, con permiso de residencia (L o B) es posible abrir cuenta en PostFinance, UBS, Raiffeisen u otras. PostFinance es la más accesible para recién llegados. También puedes usar Wise o Revolut sin permiso." },
      { pregunta: "¿Cuánto cuesta mantener una cuenta bancaria en Suiza?", respuesta: "Varía entre 0 y 25 CHF/mes según el banco. PostFinance cobra unos 5-7 CHF/mes. Revolut y N26 tienen planes gratuitos. UBS y grandes bancos pueden llegar a 25 CHF/mes." },
      { pregunta: "¿Puedo usar mi cuenta española o latinoamericana en Suiza?", respuesta: "Puedes usarla para pagos con tarjeta y transferencias, pero los empleadores y caseros suizos exigen una cuenta con IBAN suizo (CH). Necesitas abrir una cuenta local para recibir el salario y pagar el alquiler." },
      { pregunta: "¿Qué es PostFinance y por qué es la mejor opción para recién llegados?", respuesta: "PostFinance es la filial bancaria del correos suizo. Acepta nuevos residentes con solo el permiso de residencia, sin historial crediticio. Tiene red de oficinas en todo el país y es ampliamente aceptada para domiciliaciones." },
    ],
    contenido: `
<h2>El problema bancario al llegar a Suiza</h2>
<p>Uno de los primeros obstáculos al emigrar a Suiza es abrir una cuenta bancaria. Los grandes bancos suizos (UBS, Credit Suisse, Raiffeisen) pueden ser exigentes con los recién llegados: piden historial crediticio, referencias y a veces una reunión presencial con varios documentos.</p>
<p>La buena noticia: hay opciones muy buenas para extranjeros, y la estrategia óptima es combinar una cuenta suiza con una cuenta digital internacional.</p>

<h2>Opción 1: PostFinance — la más accesible para recién llegados</h2>
<p>PostFinance es la primera opción para la mayoría de expatriados hispanohablantes, y por buenas razones:</p>
<ul>
  <li>Acepta a cualquier residente con permiso L o B, sin historial suizo</li>
  <li>Se puede abrir online en unos días</li>
  <li>Coste: aproximadamente 5 CHF/mes (gratis si recibes salario allí)</li>
  <li>Red de cajeros en todos los pueblos (están en las oficinas de correos)</li>
  <li>Aceptada para todos los pagos suizos: alquiler, seguros, domiciliaciones</li>
</ul>
<p><strong>Inconveniente:</strong> los pagos internacionales son caros. Para enviar dinero a España o Latinoamérica, usa Wise en su lugar.</p>

<h2>Opción 2: Neon — el mejor banco digital suizo</h2>
<p>Neon es una cuenta 100% digital con IBAN suizo, sin cuota mensual y con muy buenas condiciones:</p>
<ul>
  <li>Sin comisión mensual</li>
  <li>Tarjeta de débito Mastercard gratuita</li>
  <li>Pagos en el extranjero sin comisión (tipo de cambio interbancario)</li>
  <li>App excelente en inglés, alemán, francés e italiano</li>
  <li>Se abre en 10 minutos desde el móvil</li>
</ul>
<p>Neon es ideal como cuenta principal si no quieres pagar cuotas. El único requisito es ser residente en Suiza.</p>

<h2>Opción 3: Wise — imprescindible para transferencias internacionales</h2>
<p>Wise no es un banco suizo, pero es casi obligatorio para cualquier expatriado. Si tienes familia en España o Latinoamérica, o si quieres convertir CHF a euros sin perder dinero en comisiones, Wise es imbatible:</p>
<ul>
  <li>Te da un IBAN suizo (CH) para recibir el salario</li>
  <li>Conversión de divisas al tipo de cambio real, con comisión de 0,4-0,6%</li>
  <li>Funciona antes de llegar a Suiza — ábrela desde España o Latinoamérica</li>
  <li>Gratuita para abrir, pequeñas comisiones en transferencias</li>
</ul>
<blockquote>"Abro Wise desde España semanas antes de llegar. Ya tenía IBAN suizo cuando aterricé, y pude cobrar mi primer salario sin problemas." — Miriam, Sevilla → Lausana</blockquote>

<h2>Opción 4: UBS o Raiffeisen — para cuando llevas tiempo</h2>
<p>Los grandes bancos tradicionales suizos son más exigentes de entrada pero ofrecen servicios completos: hipotecas, inversiones, seguros integrados y banca privada. Son la opción a considerar una vez que llevas 6-12 meses con historial suizo.</p>
<p>Raiffeisen tiene presencia en zonas rurales y ciudades pequeñas donde PostFinance no llega. UBS es el mayor banco del país, con oficinas en todas las ciudades y servicio en inglés.</p>

<h2>La combinación que recomendamos</h2>
<p>La estrategia más inteligente para la mayoría de expatriados hispanohablantes:</p>
<ol>
  <li><strong>Abre Wise antes de llegar</strong> — para tener IBAN suizo inmediato y transferencias baratas.</li>
  <li><strong>Abre PostFinance o Neon las primeras semanas</strong> — para domiciliaciones, alquiler y salario.</li>
  <li><strong>Después de 6-12 meses</strong>, evalúa si necesitas un banco tradicional para servicios adicionales.</li>
</ol>
<p>Con esta combinación cubrirás todas las necesidades sin pagar comisiones innecesarias.</p>

<h2>Tarjetas de crédito en Suiza</h2>
<p>Suiza es un país muy orientado al efectivo y al débito, pero las tarjetas de crédito se usan para compras online y reservas. Las opciones más populares son:</p>
<ul>
  <li><strong>Cumulus Mastercard (Migros):</strong> gratuita y con puntos en el supermercado más usado de Suiza.</li>
  <li><strong>Coop Supercard Visa:</strong> similar, orientada a Coop.</li>
  <li><strong>Revolut:</strong> excelente para viajes europeos, sin comisiones en divisas.</li>
</ul>
    `
  },

  // ─────────────────────────────────────────────────────────
  // 4. SEGURO MÉDICO KVG
  // ─────────────────────────────────────────────────────────
  {
    slug: "seguro-medico-obligatorio-suiza-kvg",
    titulo: "Seguro médico obligatorio en Suiza (KVG): cómo elegir y cuánto pagarás",
    descripcion: "Todo sobre el seguro de salud obligatorio suizo: qué cubre, cómo comparar aseguradoras, la franquicia y cómo ahorrar hasta 1.200 CHF al año.",
    categoria: "seguros",
    fecha: "2026-09-28",
    tiempoLectura: 8,
    imagen: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=85&auto=format&fit=crop",
    destacado: true,
    fechaModificada: "2026-10-09",
    palabrasClave: ["seguro medico suiza", "kvg suiza", "lamal suiza", "seguro salud suiza", "krankenversicherung", "seguro obligatorio suiza", "comparar seguros suiza"],
    faq: [
      { pregunta: "¿Es obligatorio el seguro médico en Suiza?", respuesta: "Sí, el seguro básico KVG (Krankenversicherung) es obligatorio para todos los residentes en Suiza, incluidos extranjeros. Debes contratarlo en los 3 primeros meses tras tu llegada." },
      { pregunta: "¿Cuánto cuesta el seguro médico en Suiza?", respuesta: "El coste varía entre 300 y 600 CHF/mes por persona adulta, dependiendo del cantón, la aseguradora y la franquicia elegida. Puedes reducir la prima eligiendo una franquicia alta (2.500 CHF) si eres joven y sano." },
      { pregunta: "¿Cómo puedo comparar seguros médicos en Suiza?", respuesta: "La herramienta oficial es Comparis.ch, que permite comparar todas las aseguradoras por cantón y franquicia. También puedes usar Priminfo.ch, el comparador oficial del gobierno suizo." },
      { pregunta: "¿Qué es la franquicia en el seguro médico suizo?", respuesta: "La franquicia (Franchise) es el importe anual que pagas de tu bolsillo antes de que el seguro empiece a cubrir. Va desde 300 CHF (mínimo) hasta 2.500 CHF (máximo). A mayor franquicia, menor prima mensual." },
      { pregunta: "¿Puedo cambiar de aseguradora en Suiza?", respuesta: "Sí, puedes cambiar cada año entre el 1 de octubre y el 30 de noviembre para que el cambio entre en vigor el 1 de enero. Es el momento de revisar precios y cambiarte si hay una aseguradora más barata." },
    ],
    contenido: `
<h2>El sistema sanitario suizo: lo bueno y lo que cuesta</h2>
<p>Suiza tiene uno de los mejores sistemas de salud del mundo — hospitales de primera, tiempos de espera cortos, médicos accesibles. El precio que pagas por ello es el seguro médico obligatorio, que en Suiza corre por tu cuenta, no lo paga la empresa.</p>
<p>Para muchos hispanohablantes, la primera factura del seguro es un shock: entre 300 y 600 CHF al mes por persona. En una familia de 4, puede suponer más de 2.000 CHF mensuales solo en seguros. Por eso, elegir bien desde el principio puede ahorrarte entre 600 y 1.500 CHF al año.</p>

<h2>Cómo funciona el KVG (seguro básico obligatorio)</h2>
<p>El sistema tiene dos niveles:</p>
<ul>
  <li><strong>KVG/LAMal (seguro básico):</strong> obligatorio para todos. Todas las aseguradoras ofrecen exactamente las mismas coberturas — lo que cambia es la prima y el servicio. Cubre médico de cabecera, especialistas, hospitalizaciones, urgencias, maternidad y medicamentos de la lista oficial.</li>
  <li><strong>VVG/LCA (seguros complementarios):</strong> opcionales. Cubren habitación individual en hospital, dentista, medicina alternativa, cobertura en el extranjero, etc.</li>
</ul>
<p>Empieza siempre por el KVG — es obligatorio. Los complementarios los valoras después según tus necesidades.</p>

<h2>La franquicia: la decisión más importante</h2>
<p>Al contratar el seguro, eliges tu franquicia anual. Esta es la cantidad que pagas de tu bolsillo antes de que el seguro cubra el 90% de los gastos (el otro 10% es el "Selbstbehalt", con un máximo de 700 CHF/año para adultos).</p>
<p>Las franquicias disponibles son: 300, 500, 1.000, 1.500, 2.000 y 2.500 CHF.</p>

<p><strong>Regla práctica:</strong></p>
<ul>
  <li>Si eres joven y sano y rara vez vas al médico → elige 2.500 CHF. Ahorrarás entre 100 y 150 CHF/mes en prima comparado con la franquicia mínima.</li>
  <li>Si tienes enfermedades crónicas o vas al médico más de 4 veces al año → elige 300 o 500 CHF.</li>
  <li>Si tienes niños → la franquicia infantil tiene máximos más bajos y las primas son menores.</li>
</ul>

<h2>Cuánto pagarás según cantón y ciudad</h2>
<p>La prima del KVG varía mucho según el cantón. Los más caros son Ginebra, Basilea y Vaud. Los más baratos, Appenzell y Uri. Como referencia para un adulto con franquicia de 300 CHF en 2026:</p>
<ul>
  <li><strong>Ginebra:</strong> 480 – 560 CHF/mes</li>
  <li><strong>Zúrich:</strong> 420 – 490 CHF/mes</li>
  <li><strong>Basilea:</strong> 440 – 510 CHF/mes</li>
  <li><strong>Berna:</strong> 380 – 450 CHF/mes</li>
  <li><strong>Zug:</strong> 320 – 390 CHF/mes</li>
  <li><strong>Lucerna:</strong> 330 – 400 CHF/mes</li>
</ul>
<p>Con franquicia de 2.500 CHF, resta entre 100 y 150 CHF a cada cifra.</p>

<h2>Cómo comparar aseguradoras y encontrar la más barata</h2>
<p>La cobertura básica es exactamente igual en todas las aseguradoras — lo que cambia es la prima. Pasos para encontrar la mejor:</p>
<ol>
  <li>Ve a <strong>Comparis.ch</strong> (herramienta oficial más usada) o <strong>Priminfo.ch</strong> (del gobierno suizo)</li>
  <li>Introduce tu cantón, fecha de nacimiento y franquicia deseada</li>
  <li>Ordena por precio — las diferencias entre aseguradoras en el mismo cantón pueden ser de 80-120 CHF/mes</li>
  <li>Revisa también el modelo de aseguramiento: el modelo HMO (médico de cabecera asignado) o Telmed (consulta previa por teléfono) son más baratos que el modelo estándar libre</li>
</ol>

<h2>Modelos de aseguramiento: estándar vs. alternativo</h2>
<p>Dentro del KVG, puedes elegir cómo accedes a los médicos:</p>
<ul>
  <li><strong>Modelo estándar:</strong> vas directamente a cualquier médico o especialista. El más caro.</li>
  <li><strong>Modelo médico de familia (Hausarzt/HMO):</strong> debes pasar primero por tu médico de cabecera asignado antes de ver a un especialista. Ahorro del 10-20% en prima.</li>
  <li><strong>Modelo Telmed:</strong> llamas a un número de teléfono médico antes de pedir cita. Ahorro similar al HMO.</li>
</ul>
<p>Para la mayoría de recién llegados sin médico habitual en Suiza, el modelo HMO o Telmed es una excelente opción para ahorrar desde el principio.</p>

<h2>Subsidio de prima: ¿te ayuda el Estado?</h2>
<p>Si tus ingresos son bajos o medios, puedes recibir una subvención del cantón para pagar el seguro médico (Prämienverbilligung/Réduction de primes). Cada cantón tiene sus propios criterios, pero en general aplica si tu ingreso neto anual no supera cierto umbral.</p>
<p>Para solicitarlo, contacta con la administración cantonal (Gemeinde/commune) y pregunta por la reducción de primas. Muchos recién llegados no saben que existen estas ayudas y las pierden.</p>

<h2>Fecha clave: cambia de aseguradora cada noviembre</h2>
<p>Una vez al año, entre el 1 y el 30 de noviembre, puedes cambiar de aseguradora para el año siguiente. Las aseguradoras publican sus nuevas tarifas en octubre — ese es el momento de revisar si sigues con la más barata o te conviene cambiar.</p>
<p>El cambio es gratuito y la nueva aseguradora lo gestiona casi todo. No pierdes ninguna cobertura durante el proceso.</p>
    `
  },

  // ─────────────────────────────────────────────────────────
  // 5. TRABAJO LATINOAMERICANOS
  // ─────────────────────────────────────────────────────────
  {
    slug: "trabajar-suiza-latinoamericanos-visado-proceso",
    titulo: "Cómo trabajar en Suiza siendo latinoamericano: visado, proceso y realidad",
    descripcion: "La guía que no existe en ningún otro sitio: el proceso real para conseguir trabajo en Suiza viniendo de Colombia, México, Perú, Argentina o cualquier país latinoamericano.",
    categoria: "trabajo",
    fecha: "2026-10-01",
    tiempoLectura: 11,
    imagen: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=85&auto=format&fit=crop",
    destacado: true,
    fechaModificada: "2026-10-09",
    palabrasClave: ["trabajar en suiza latinoamericano", "visa trabajo suiza", "permiso trabajo suiza", "trabajo suiza colombiano", "trabajo suiza mexicano", "emigrar suiza latinoamerica"],
    faq: [
      { pregunta: "¿Pueden los latinoamericanos trabajar en Suiza?", respuesta: "Sí, pero necesitan una oferta de trabajo previa ya que no tienen libre circulación. El empleador suizo debe demostrar que no encontró candidato en la UE antes de contratar a un latinoamericano (cuota contingente)." },
      { pregunta: "¿Qué visa necesita un latinoamericano para trabajar en Suiza?", respuesta: "Necesita un visado de trabajo (tipo D) que el empleador tramita con las autoridades cantonales. Una vez aprobado, se convierte en Permiso B (residencia por trabajo) al llegar." },
      { pregunta: "¿Cuáles son los sectores que más contratan extranjeros en Suiza?", respuesta: "Los sectores con mayor demanda son: tecnología (IT/software), banca y finanzas, sanidad (médicos y enfermeros), hostelería, ingeniería y construcción." },
      { pregunta: "¿Cuánto tarda en aprobarse el permiso de trabajo para latinoamericanos?", respuesta: "El proceso completo puede durar entre 2 y 6 meses desde que el empleador presenta la solicitud. Depende del cantón y de la carga de trabajo de las autoridades migratorias." },
      { pregunta: "¿Se puede buscar trabajo en Suiza mientras se está en Latinoamérica?", respuesta: "Sí y es la única forma legal. Debes conseguir la oferta desde tu país, ya que no puedes entrar como turista a buscar trabajo de forma remunerada. LinkedIn, Indeed y los portales suizos como Jobs.ch son los mejores canales." },
    ],
    contenido: `
<h2>La diferencia entre europeos y latinoamericanos: el sistema de cuotas</h2>
<p>Los ciudadanos de la UE/EEE (españoles, italianos, franceses...) tienen libre circulación y pueden buscar trabajo en Suiza como cualquier ciudadano suizo. Para los latinoamericanos, el proceso es diferente y más complejo.</p>
<p>Suiza aplica el principio de "prioridad del mercado interior": antes de contratar a alguien de fuera de la UE, el empleador debe demostrar que no encontró un candidato adecuado entre residentes suizos o ciudadanos de la UE. Esto no significa que sea imposible — significa que necesitas ser claramente el mejor candidato para el puesto.</p>

<h2>El proceso paso a paso para trabajar en Suiza desde Latinoamérica</h2>
<ol>
  <li><strong>Encuentra una oferta de trabajo en Suiza.</strong> Usa <a href="/trabajo/buscador">nuestro buscador de empleo suizo</a>, LinkedIn, Jobs.ch e Indeed.ch. El empleador debe estar dispuesto a tramitar el permiso — esto es clave.</li>
  <li><strong>El empleador solicita el permiso cantonal.</strong> La empresa presenta tu expediente a las autoridades del cantón donde está ubicada. Incluye justificación de por qué te contratan a ti y no a alguien de la UE.</li>
  <li><strong>Aprobación cantonal y federal.</strong> El cantón revisa y, si aprueba, lo envía a la Secretaría de Estado de Migraciones (SEM). Duración: 1-4 meses.</li>
  <li><strong>Tramitas el visado en el consulado suizo de tu país.</strong> Una vez aprobado el permiso, el consulado suizo en tu ciudad te emite el visado de entrada (tipo D).</li>
  <li><strong>Llegas a Suiza y conviertes el visado en Permiso B.</strong> Al registrarte en el ayuntamiento de tu municipio, el visado D se convierte automáticamente en Permiso B de residencia por trabajo.</li>
</ol>

<h2>Qué sectores tienen más posibilidades para latinoamericanos</h2>
<p>No todos los sectores son igual de accesibles. Estos son los que históricamente contratan más profesionales no europeos:</p>
<ul>
  <li><strong>Tecnología e IT:</strong> el sector con mayor demanda y menor discriminación por origen. Desarrolladores, ingenieros de datos, ciberseguridad, DevOps. Suiza no tiene suficientes locales para cubrir la demanda. Sueldos: 90.000 – 140.000 CHF/año.</li>
  <li><strong>Banca y finanzas:</strong> Zúrich y Ginebra son los mayores centros financieros de Europa continental. Analistas, gestores de riesgo, compliance. Requieren inglés impecable y frecuentemente CFA o MBA.</li>
  <li><strong>Sanidad (médicos y enfermeros):</strong> Suiza tiene escasez crónica de médicos especialistas y enfermeros. Si tienes título homologable, las posibilidades son altas. El proceso de homologación del título es largo (6-18 meses) pero vale la pena.</li>
  <li><strong>Hostelería y restauración:</strong> hoteles de lujo en los Alpes y en ciudades como Zúrich o Ginebra contratan constantemente. Menos burocracia para perfiles concretos.</li>
  <li><strong>Ingeniería y construcción:</strong> ingenieros civiles, mecánicos, eléctricos. Alta demanda en grandes proyectos de infraestructura.</li>
</ul>

<h2>Cómo preparar tu candidatura para el mercado suizo</h2>
<p>El CV suizo es diferente al latinoamericano o español:</p>
<ul>
  <li><strong>Máximo 2 páginas</strong> — en Suiza los CV largos se leen menos.</li>
  <li><strong>Foto profesional</strong> — al contrario de lo que se estila en EE.UU., en Suiza se incluye foto.</li>
  <li><strong>Carta de motivación personalizada</strong> — imprescindible. Una carta genérica descarta tu candidatura directamente.</li>
  <li><strong>Idiomas</strong> — indica nivel real según Marco Europeo (A1 a C2). Exagerar en idiomas es un error fatal.</li>
  <li><strong>LinkedIn actualizado en inglés o alemán/francés</strong> — los reclutadores suizos buscan activamente en LinkedIn.</li>
</ul>

<h2>El idioma: ¿cuánto alemán (o francés) necesitas?</h2>
<p>Depende de la ciudad y el sector:</p>
<ul>
  <li><strong>En IT y banca internacional:</strong> el inglés es frecuentemente suficiente para empezar. Pero aprender alemán o francés acelera enormemente la integración y el avance profesional.</li>
  <li><strong>En sanidad, hostelería y sectores orientados al cliente:</strong> necesitas el idioma local (alemán, francés o italiano según cantón). Nivel mínimo B1-B2 para empezar.</li>
  <li><strong>Recomendación general:</strong> empieza cursos de alemán o francés antes de llegar. El nivel A2 ya marca diferencia en entrevistas.</li>
</ul>

<h2>Salarios reales en Suiza para latinoamericanos en 2026</h2>
<p>Los salarios suizos son los más altos de Europa, y esto aplica también a latinoamericanos con la formación adecuada:</p>
<ul>
  <li><strong>Desarrollador de software:</strong> 90.000 – 130.000 CHF/año bruto</li>
  <li><strong>Médico especialista:</strong> 150.000 – 250.000 CHF/año</li>
  <li><strong>Enfermero/a:</strong> 70.000 – 90.000 CHF/año</li>
  <li><strong>Analista financiero:</strong> 95.000 – 140.000 CHF/año</li>
  <li><strong>Ingeniero mecánico/civil:</strong> 85.000 – 115.000 CHF/año</li>
  <li><strong>Hostelería (chef de hotel):</strong> 55.000 – 80.000 CHF/año</li>
</ul>
<p>Para calcular cuánto te quedaría en mano después de impuestos y cotizaciones, usa nuestra <a href="/herramientas/salario-neto">calculadora de salario neto suizo</a>.</p>
    `
  },

  // ─────────────────────────────────────────────────────────
  // 6. COSTE DE VIDA
  // ─────────────────────────────────────────────────────────
  {
    slug: "coste-vida-zurich-ginebra-berna-comparativa",
    titulo: "Coste de vida real en Zúrich, Ginebra y Berna: comparativa con datos reales de 2026",
    descripcion: "Cuánto necesitas ganar para vivir bien en cada ciudad suiza. Alquiler, comida, transporte y ocio con datos actualizados de la comunidad.",
    categoria: "vida-diaria",
    fecha: "2026-10-02",
    tiempoLectura: 10,
    imagen: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=85&auto=format&fit=crop",
    destacado: false,
    fechaModificada: "2026-10-09",
    palabrasClave: ["coste vida suiza", "coste vida zurich", "coste vida ginebra", "precio alquiler zurich", "salario minimo suiza", "cuanto cuesta vivir en suiza"],
    faq: [
      { pregunta: "¿Cuánto cuesta vivir en Zúrich al mes?", respuesta: "Una persona sola en Zúrich necesita entre 3.500 y 4.500 CHF/mes para vivir con comodidad: alquiler (1.500-2.200 CHF), seguro médico (400-500 CHF), comida (400-600 CHF), transporte (100 CHF) y ocio (300-500 CHF)." },
      { pregunta: "¿Es Ginebra más cara que Zúrich?", respuesta: "Ginebra y Zúrich tienen costes similares y son las dos ciudades más caras de Suiza. Ginebra suele tener alquileres ligeramente más altos, pero los salarios también son mayores, especialmente en el sector internacional y bancario." },
      { pregunta: "¿Cuál es el salario mínimo en Suiza?", respuesta: "Suiza no tiene salario mínimo federal. Los mínimos se fijan por convenio colectivo según sector. El cantón de Ginebra tiene el salario mínimo más alto: 24 CHF/hora (aprox. 4.000 CHF/mes). La media nacional es de 6.500 CHF brutos/mes." },
      { pregunta: "¿En qué ciudad suiza es más barato vivir?", respuesta: "Las ciudades más asequibles son Biel/Bienne, Winterthur, St. Gallen y las ciudades del cantón de Valais. Tienen buena conexión a las grandes ciudades y costes de vida entre un 20-30% menores que Zúrich o Ginebra." },
    ],
    contenido: `
<h2>El precio de vivir en Suiza: qué esperar realmente</h2>
<p>Suiza es caro, eso es un hecho. Pero la relación entre salarios y coste de vida es muy favorable si la comparas con otros países. El problema surge cuando llegas sin trabajo, pagas con euros, o no sabes en qué ciudad establecerte.</p>
<p>Esta comparativa usa datos reales de la comunidad hispanohablante en Suiza, contrastados con estadísticas oficiales del gobierno suizo (FSO) para 2026.</p>

<h2>Zúrich: la más cara y la que más paga</h2>
<p>Zúrich es la ciudad financiera de Suiza y la que ofrece más trabajo en sectores de alto salario. También es la más cara del país.</p>
<p><strong>Presupuesto mensual estimado para una persona sola:</strong></p>
<ul>
  <li>Alquiler 1 habitación (zona periférica): 1.600 – 2.000 CHF</li>
  <li>Seguro médico (KVG básico): 420 – 500 CHF</li>
  <li>Alimentación (supermercado + algún restaurante): 500 – 700 CHF</li>
  <li>Transporte (abono mensual ZVV): 100 CHF</li>
  <li>Telecomunicaciones (móvil + internet): 50 – 80 CHF</li>
  <li>Ocio, ropa, imprevistos: 300 – 500 CHF</li>
</ul>
<p><strong>Total: 2.970 – 3.880 CHF/mes</strong> (sin alquiler de zona central ni coche).</p>
<p>El salario medio en Zúrich es de 7.800 CHF brutos/mes. Con un salario de 6.000 CHF neto, el margen de ahorro mensual puede ser de 2.000-3.000 CHF. Eso es lo que hace atractiva a Zúrich a pesar del coste.</p>

<h2>Ginebra: cara por el lado del alquiler, generosa en salarios internacionales</h2>
<p>Ginebra es la ciudad de las organizaciones internacionales (ONU, OMS, Cruz Roja) y del sector bancario privado. Los salarios en estos sectores son los más altos del país. La ciudad tiene un carácter más cosmopolita e internacional.</p>
<p><strong>Presupuesto mensual estimado:</strong></p>
<ul>
  <li>Alquiler 1 habitación (zona periférica): 1.700 – 2.200 CHF</li>
  <li>Seguro médico: 480 – 560 CHF (cantón más caro de Suiza)</li>
  <li>Alimentación: 500 – 700 CHF</li>
  <li>Transporte (TPG): 70 CHF</li>
  <li>Telecomunicaciones: 50 – 80 CHF</li>
  <li>Ocio y varios: 300 – 500 CHF</li>
</ul>
<p><strong>Total: 3.100 – 4.110 CHF/mes.</strong></p>
<p>El seguro médico en Ginebra es el más caro de Suiza — esto es un factor real a tener en cuenta. Sin embargo, los salarios del sector internacional también son notablemente más altos.</p>

<h2>Berna: la más equilibrada para familias y trabajadores del sector público</h2>
<p>Berna, la capital federal, tiene un ritmo de vida más tranquilo que Zúrich o Ginebra. Los precios son entre un 15-20% más bajos y la demanda de pisos es menor. Es especialmente atractiva para trabajadores de la administración federal y organismos gubernamentales.</p>
<p><strong>Presupuesto mensual estimado:</strong></p>
<ul>
  <li>Alquiler 1 habitación (zona periférica): 1.200 – 1.600 CHF</li>
  <li>Seguro médico: 380 – 450 CHF</li>
  <li>Alimentación: 450 – 600 CHF</li>
  <li>Transporte (BERNMOBIL): 82 CHF</li>
  <li>Telecomunicaciones: 50 – 80 CHF</li>
  <li>Ocio y varios: 250 – 400 CHF</li>
</ul>
<p><strong>Total: 2.412 – 3.212 CHF/mes.</strong></p>
<p>Para muchas familias hispanohablantes, Berna resulta el mejor compromiso: buena calidad de vida, algo menos de presión económica que Zúrich, y excelente acceso al resto del país por tren.</p>

<h2>Basilea: la más accesible con buena oferta de trabajo</h2>
<p>Basilea sorprende positivamente. Es la capital de la industria farmacéutica suiza (Novartis, Roche) y tiene muchos empleos bien pagados en ese sector. Los alquileres son más bajos que en Zúrich o Ginebra y la ciudad tiene triple frontera con Alemania y Francia, lo que da opciones adicionales para vivir más barato cruzando la frontera.</p>
<ul>
  <li>Alquiler 1 habitación: 1.200 – 1.700 CHF</li>
  <li>Seguro médico: 440 – 510 CHF</li>
  <li>Resto gastos: 850 – 1.200 CHF</li>
</ul>
<p><strong>Total: 2.490 – 3.410 CHF/mes.</strong></p>

<h2>Compara el coste entre ciudades con nuestra herramienta</h2>
<p>Si estás dudando entre dos ciudades, nuestra <a href="/herramientas/comparador-ciudades">herramienta de comparación de ciudades suizas</a> te permite ver lado a lado el coste de alquiler, seguro médico, salario medio y calcular cuánto necesitas ganar en cada ciudad para mantener el mismo nivel de vida.</p>

<h2>Lo que más sorprende a los recién llegados</h2>
<ul>
  <li><strong>Comer fuera es carísimo:</strong> un menú de mediodía cuesta entre 18 y 30 CHF. Muchos suizos llevan tupper o comen en el comedor de empresa.</li>
  <li><strong>El supermercado también:</strong> Migros y Coop son los más económicos. Un ticket de compra semanal para una persona ronda los 80-120 CHF.</li>
  <li><strong>El transporte público es excelente y caro:</strong> el abono nacional GA cuesta 3.860 CHF/año. Los abonos zonales son más económicos.</li>
  <li><strong>Alcohol en supermercados:</strong> una botella de vino decente cuesta 8-15 CHF. Una cerveza en bar, 6-9 CHF.</li>
  <li><strong>Coche = lujo:</strong> el seguro, el impuesto cantonal y el parking en ciudad hacen que el coche sea un gasto muy elevado. En ciudades como Zúrich, el transporte público es más eficiente.</li>
</ul>
    `
  },

  // ─────────────────────────────────────────────────────────
  // 7. NUEVO: IMPUESTOS EN SUIZA
  // ─────────────────────────────────────────────────────────
  {
    slug: "impuestos-suiza-espanoles-extranjeros-guia",
    titulo: "Impuestos en Suiza para españoles y extranjeros: lo que nadie te explica",
    descripcion: "Cómo funciona el sistema fiscal suizo, cuánto pagarás en cada cantón, el impuesto a la fuente y cómo evitar pagar doble entre España y Suiza.",
    categoria: "trabajo",
    fecha: "2026-10-03",
    tiempoLectura: 9,
    imagen: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=85&auto=format&fit=crop",
    destacado: false,
    fechaModificada: "2026-10-09",
    palabrasClave: ["impuestos suiza", "declaracion renta suiza", "impuesto fuente suiza", "fiscalidad suiza extranjero", "cuanto se paga impuestos suiza", "doble imposicion suiza"],
    faq: [
      { pregunta: "¿Cuánto se paga de impuestos en Suiza?", respuesta: "El tipo efectivo varía según el cantón, el municipio, el nivel de ingresos y el estado civil. Para un sueldo de 80.000 CHF brutos en Zúrich, el tipo efectivo ronda el 15-18%. En Zug, puede ser del 10-13%." },
      { pregunta: "¿Qué es el impuesto a la fuente en Suiza?", respuesta: "El Quellensteuer (impuesto a la fuente) es el equivalente a la retención de IRPF en España. Lo descuenta directamente el empleador de tu nómina si eres residente extranjero sin permiso C. Se calcula según tablas del cantón." },
      { pregunta: "¿Tengo que hacer declaración de la renta en Suiza?", respuesta: "Si tienes permiso B y ganas menos de 120.000 CHF/año, normalmente no presentas declaración individual — el impuesto a la fuente lo gestiona tu empleador. Si superas ese umbral o tienes otros ingresos, sí debes declarar." },
      { pregunta: "¿Hay convenio de doble imposición entre España y Suiza?", respuesta: "Sí, existe un convenio desde 1966 actualizado en 2013. Evita que pagues impuestos dos veces por los mismos ingresos. Si eres residente fiscal en Suiza, pagas en Suiza y no en España (con algunas excepciones como pensiones y alquileres en España)." },
    ],
    contenido: `
<h2>Por qué el sistema fiscal suizo es tan diferente</h2>
<p>En España o Latinoamérica, los impuestos los gestiona el Estado central. En Suiza, el sistema es triple: pagas impuestos a la Confederación (nivel federal), al cantón y al municipio donde vives. Este sistema explica por qué los tipos impositivos varían tanto de una ciudad a otra.</p>
<p>La buena noticia: Suiza tiene tipos impositivos generalmente más bajos que España, Francia o Alemania. La mala: el sistema es complejo y si no lo entiendes, puedes pagar de más o cometer errores costosos.</p>

<h2>El impuesto a la fuente: cómo funciona para extranjeros</h2>
<p>Si tienes permiso L o B (los más comunes para recién llegados), tu empresa aplica automáticamente el <strong>Quellensteuer</strong> (impuesto a la fuente) en tu nómina, igual que la retención de IRPF en España. Tú no tienes que hacer nada — la empresa lo gestiona.</p>
<p>El tipo de retención lo determina el cantón y varía según:</p>
<ul>
  <li>Tu nivel de ingresos</li>
  <li>Tu estado civil (soltero, casado, con hijos)</li>
  <li>Tu cantón de residencia</li>
</ul>
<p>Como referencia, para un sueldo mensual de 6.000 CHF brutos, la retención típica en Zúrich para soltero ronda el 13-16%.</p>

<h2>Cuánto pagas según el cantón: las diferencias son enormes</h2>
<p>Esta es la razón por la que muchos profesionales eligen vivir en Zug, Schwyz o Appenzell en lugar de Zúrich o Ginebra aunque trabajen en esas ciudades. Los tipos son radicalmente distintos:</p>
<ul>
  <li><strong>Zug:</strong> uno de los cantones más baratos fiscalmente. Para un ingreso de 100.000 CHF, tipo efectivo del 10-13%.</li>
  <li><strong>Schwyz:</strong> similar a Zug. Muy popular entre trabajadores de alta renta de Zúrich.</li>
  <li><strong>Zúrich:</strong> tipo efectivo del 14-18% para ingresos medios.</li>
  <li><strong>Berna:</strong> de los cantones con mayor carga fiscal, 16-22% en ingresos medios.</li>
  <li><strong>Ginebra:</strong> 18-24% para ingresos medios, pero los salarios también son más altos.</li>
  <li><strong>Valais/Wallis:</strong> tipos moderados y buena calidad de vida en ciudades como Sion.</li>
</ul>
<p>La diferencia entre vivir en Zug versus Ginebra con el mismo salario puede ser de 8.000-15.000 CHF al año solo en impuestos.</p>

<h2>¿Cuándo tienes que hacer declaración de la renta?</h2>
<p>Si tienes permiso B y tu salario anual es inferior a 120.000 CHF, normalmente el impuesto a la fuente cubre todo y no presentas declaración individual. El cantón hace una "regularización" anual automática.</p>
<p>Debes presentar declaración (Steuererklärung) si:</p>
<ul>
  <li>Tienes permiso C (residencia permanente)</li>
  <li>Ganas más de 120.000 CHF/año</li>
  <li>Tienes ingresos adicionales fuera del salario (alquileres, inversiones, criptomonedas)</li>
  <li>El cantón te lo exige explícitamente</li>
</ul>
<p>La declaración se presenta generalmente en marzo-abril para el año anterior.</p>

<h2>Doble imposición España-Suiza: cómo evitar pagar dos veces</h2>
<p>Si eres español viviendo en Suiza, la pregunta inevitable es: ¿pago impuestos en España también?</p>
<p>La respuesta depende de tu <strong>residencia fiscal</strong>. Si pasas más de 183 días al año en Suiza, eres residente fiscal suizo y <strong>no</strong> tienes que pagar IRPF en España por tu salario suizo. El convenio de doble imposición entre España y Suiza (actualizado en 2013) lo regula explícitamente.</p>
<p>Sin embargo, hay excepciones importantes:</p>
<ul>
  <li><strong>Alquileres de propiedades en España:</strong> tributan en España (aunque también en Suiza de forma coordinada).</li>
  <li><strong>Pensiones del sistema español:</strong> pueden tributar en España. Consulta el texto del convenio o un asesor fiscal.</li>
  <li><strong>Modelo 720:</strong> aunque ya no tiene las sanciones desorbitadas de antes, si tienes bienes en el extranjero superiores a 50.000€, debes declararlo en la Agencia Tributaria española.</li>
</ul>

<h2>Deducciones que puedes aplicar en Suiza</h2>
<p>El sistema fiscal suizo permite numerosas deducciones que reducen tu base imponible:</p>
<ul>
  <li><strong>Gastos de desplazamiento al trabajo</strong> (hasta cierto límite por cantón)</li>
  <li><strong>Prima del seguro médico</strong> (deducción parcial)</li>
  <li><strong>Cotizaciones al Pilar 3a</strong> (plan de pensiones privado suizo): hasta 7.056 CHF/año si eres empleado. Esta deducción es de las más potentes del sistema.</li>
  <li><strong>Gastos de formación profesional</strong> relacionados con tu trabajo</li>
  <li><strong>Intereses de préstamos</strong></li>
</ul>
<p>El Pilar 3a merece atención especial: si aportas el máximo cada año (7.056 CHF en 2026), reduces tu base imponible en esa cantidad, lo que puede suponer un ahorro fiscal de 700-1.500 CHF según tu cantón y nivel de ingresos.</p>

<h2>Herramienta: calcula tu salario neto en Suiza</h2>
<p>Para saber exactamente cuánto te quedará en mano después de impuestos y cotizaciones sociales según tu cantón, usa nuestra <a href="/herramientas/salario-neto">calculadora de salario neto suizo</a>. Incluye el impuesto a la fuente estimado, AVS, seguro de desempleo y te da el neto mensual real.</p>
    `
  },

  // ─────────────────────────────────────────────────────────
  // 8. NUEVO: SALARIOS POR SECTOR
  // ─────────────────────────────────────────────────────────
  {
    slug: "salarios-por-sector-suiza-2026",
    titulo: "Salarios en Suiza por sector en 2026: cuánto gana un enfermero, ingeniero o programador",
    descripcion: "Datos reales de sueldos en Suiza por profesión: IT, sanidad, hostelería, banca, construcción y más. Con calculadora de salario neto incluida.",
    categoria: "trabajo",
    fecha: "2026-10-04",
    tiempoLectura: 8,
    imagen: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&q=85&auto=format&fit=crop",
    destacado: true,
    fechaModificada: "2026-10-09",
    palabrasClave: ["salarios suiza", "sueldo suiza", "cuanto gana enfermero suiza", "salario ingeniero suiza", "sueldo programador suiza", "salario medio suiza"],
    faq: [
      { pregunta: "¿Cuál es el salario medio en Suiza en 2026?", respuesta: "El salario bruto medio en Suiza es de aproximadamente 6.500 CHF/mes (78.000 CHF/año). Varía mucho según sector, cantón, experiencia y nivel de formación." },
      { pregunta: "¿Cuánto cobra un enfermero en Suiza?", respuesta: "Un enfermero/a en Suiza gana entre 5.500 y 8.000 CHF/mes brutos según experiencia y cantón. En cantones como Zúrich o Ginebra los sueldos son algo mayores. Neto, entre 4.200 y 6.200 CHF/mes." },
      { pregunta: "¿Cuánto gana un programador en Suiza?", respuesta: "Un desarrollador de software en Suiza gana entre 7.500 y 12.000 CHF/mes brutos según experiencia y especialización. Los perfiles senior en IT financiero o en empresas tech como Google Zurich pueden superar los 15.000 CHF/mes." },
      { pregunta: "¿Hay salario mínimo en Suiza?", respuesta: "No hay salario mínimo federal. Algunos cantones como Ginebra y Neuchâtel tienen mínimo cantonal (24 CHF/hora en Ginebra). La mayoría de sectores tienen convenios colectivos con suelos mínimos." },
    ],
    contenido: `
<h2>Por qué los salarios suizos son los más altos de Europa</h2>
<p>Suiza tiene los salarios nominales más elevados de Europa y del mundo. Esto no es casualidad: alta productividad, especialización en sectores de alto valor añadido (banca, farmacéutica, relojería, tecnología) y un mercado laboral muy protegido se combinan para producir sueldos que duplican o triplican los de España.</p>
<p>Pero ojo: el coste de vida también es muy alto. Para evaluar si te compensa emigrar a Suiza para tu profesión, usa nuestra <a href="/herramientas/salario-neto">calculadora de salario neto</a> para ver cuánto te queda en mano después de impuestos y deducciones, y el <a href="/herramientas/comparador-ciudades">comparador de ciudades</a> para ver el poder adquisitivo real en cada cantón.</p>

<h2>Salarios en IT y tecnología</h2>
<p>El sector IT es el más demandado y el más accesible para hispanohablantes cualificados, ya que el inglés es frecuentemente suficiente.</p>
<ul>
  <li><strong>Desarrollador junior (1-3 años):</strong> 75.000 – 95.000 CHF/año</li>
  <li><strong>Desarrollador mid (3-6 años):</strong> 95.000 – 120.000 CHF/año</li>
  <li><strong>Desarrollador senior (+6 años):</strong> 120.000 – 160.000 CHF/año</li>
  <li><strong>Data Scientist / ML Engineer:</strong> 110.000 – 150.000 CHF/año</li>
  <li><strong>DevOps / Cloud Engineer:</strong> 100.000 – 140.000 CHF/año</li>
  <li><strong>CTO o Engineering Manager:</strong> 150.000 – 220.000 CHF/año</li>
</ul>
<p>Empresas como Google Zurich, UBS Tech, Zurich Insurance y cientos de startups pagan en la banda alta de estas cifras. Zúrich es uno de los mayores hubs tecnológicos de Europa.</p>

<h2>Salarios en sanidad</h2>
<p>Suiza tiene escasez crónica de profesionales de la salud. Los sueldos son altos y la demanda constante, especialmente para médicos especialistas y enfermeros.</p>
<ul>
  <li><strong>Médico general:</strong> 120.000 – 180.000 CHF/año</li>
  <li><strong>Médico especialista (cardiólogo, neurólogo...):</strong> 180.000 – 280.000 CHF/año</li>
  <li><strong>Médico residente:</strong> 70.000 – 90.000 CHF/año</li>
  <li><strong>Enfermero/a diplomado/a:</strong> 65.000 – 90.000 CHF/año</li>
  <li><strong>Enfermero jefe / supervisor:</strong> 85.000 – 110.000 CHF/año</li>
  <li><strong>Fisioterapeuta:</strong> 65.000 – 85.000 CHF/año</li>
  <li><strong>Farmacéutico:</strong> 75.000 – 100.000 CHF/año</li>
</ul>
<p>Importante: los títulos médicos de la UE son generalmente reconocidos en Suiza. Los latinoamericanos necesitan un proceso de homologación que puede tardar entre 6 meses y 2 años según la especialidad.</p>

<h2>Salarios en banca y finanzas</h2>
<p>Suiza alberga dos de los mayores bancos del mundo (UBS, Julius Bär) y el mayor centro de gestión de patrimonio privado del mundo (Ginebra). Los sueldos en finanzas son de los más altos globalmente.</p>
<ul>
  <li><strong>Analista financiero junior:</strong> 80.000 – 110.000 CHF/año</li>
  <li><strong>Analista senior:</strong> 110.000 – 160.000 CHF/año</li>
  <li><strong>Gestor de banca privada:</strong> 130.000 – 200.000 CHF + bonificaciones</li>
  <li><strong>Compliance / Risk Manager:</strong> 100.000 – 150.000 CHF/año</li>
  <li><strong>Trader:</strong> muy variable, base 120.000 + bonificaciones hasta 300.000+</li>
</ul>

<h2>Salarios en ingeniería y construcción</h2>
<ul>
  <li><strong>Ingeniero mecánico:</strong> 85.000 – 120.000 CHF/año</li>
  <li><strong>Ingeniero civil:</strong> 80.000 – 115.000 CHF/año</li>
  <li><strong>Ingeniero eléctrico:</strong> 85.000 – 125.000 CHF/año</li>
  <li><strong>Arquitecto:</strong> 75.000 – 110.000 CHF/año</li>
  <li><strong>Técnico de obra / encargado:</strong> 65.000 – 90.000 CHF/año</li>
</ul>

<h2>Salarios en hostelería y turismo</h2>
<p>La hostelería suiza es de las más exigentes y mejor pagadas del mundo. Los hoteles de lujo de los Alpes y de ciudades como Zúrich, Ginebra o Lausana ofrecen sueldos muy por encima de España.</p>
<ul>
  <li><strong>Cocinero / Chef de partie:</strong> 50.000 – 75.000 CHF/año</li>
  <li><strong>Chef ejecutivo / Head Chef:</strong> 80.000 – 130.000 CHF/año</li>
  <li><strong>Camarero de hotel de lujo:</strong> 50.000 – 65.000 CHF/año + propinas</li>
  <li><strong>Recepcionista de hotel:</strong> 48.000 – 62.000 CHF/año</li>
  <li><strong>Director de hotel:</strong> 100.000 – 160.000 CHF/año</li>
</ul>

<h2>Calcula tu salario neto real</h2>
<p>Los sueldos anteriores son brutos anuales. Para calcular cuánto te quedará en mano después de cotizaciones sociales (AVS 5,3%, desempleo 1,1%) e impuestos según tu cantón, usa nuestra <a href="/herramientas/salario-neto">calculadora de salario neto suizo</a>. Te da el neto mensual exacto en función de tu situación.</p>
<p>Y si quieres comparar el poder adquisitivo entre dos ciudades suizas — por ejemplo si te ofrecen trabajo en Zúrich pero vives más barato en Winterthur — usa el <a href="/herramientas/comparador-ciudades">comparador de ciudades</a>.</p>
    `
  },

  // ─────────────────────────────────────────────────────────
  // 9. CV SUIZO
  // ─────────────────────────────────────────────────────────
  {
    slug: "cv-suizo-como-adaptar-curriculum-espanol",
    titulo: "CV suizo: cómo adaptar tu currículum español o latinoamericano al mercado laboral suizo",
    descripcion: "Las diferencias clave entre un CV español y uno suizo, qué errores evitar, qué secciones incluir y cómo presentarlo para destacar en el mercado laboral suizo.",
    categoria: "trabajo",
    fecha: "2026-10-05",
    tiempoLectura: 7,
    imagen: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=85&auto=format&fit=crop",
    destacado: false,
    fechaModificada: "2026-10-09",
    palabrasClave: ["cv suizo", "curriculum vitae suiza", "adaptar cv suiza", "curriculum suiza español", "como hacer cv suiza", "carta motivacion suiza"],
    faq: [
      { pregunta: "¿Hay que incluir foto en el CV suizo?", respuesta: "Sí, en Suiza la foto en el CV es habitual y esperada. Debe ser una foto profesional, fondo neutro, ropa formal. Al contrario de lo que ocurre en EE.UU. o Reino Unido, no incluir foto puede parecer extraño." },
      { pregunta: "¿En qué idioma escribo el CV para Suiza?", respuesta: "En el idioma del cantón donde está la empresa: alemán para Zúrich, Berna, Basilea; francés para Ginebra, Lausana, Neuchâtel; italiano para Lugano y el Ticino. En multinacionales el inglés es aceptado. Un CV en español será descartado automáticamente." },
      { pregunta: "¿Cuántas páginas debe tener un CV suizo?", respuesta: "Máximo 2 páginas para perfiles con experiencia. Recién graduados: 1 página. Si tienes más de 15 años de experiencia, se tolera llegar a 3. La concisión es muy valorada en Suiza." },
      { pregunta: "¿Hay que incluir referencias en el CV suizo?", respuesta: "Sí, a diferencia del CV español donde se pone 'referencias a petición', en Suiza se incluyen 2-3 referencias reales con nombre, cargo, empresa y teléfono o email directamente en el CV." },
    ],
    contenido: `
<h2>Por qué tu CV español no funciona en Suiza</h2>
<p>Si mandas tu CV español a empresas suizas sin adaptarlo, lo más probable es que no llegues a la fase de entrevista. No porque tu perfil sea malo — sino porque el formato y las expectativas son completamente distintos.</p>
<p>En Suiza la primera revisión de un CV dura entre 30 y 60 segundos. Si no se ajusta al formato esperado, pasa directamente a la pila de rechazados. Aquí van las diferencias clave.</p>

<h2>Las 7 diferencias principales entre el CV español y el suizo</h2>
<ol>
  <li><strong>Foto profesional:</strong> En Suiza se incluye siempre. Fondo neutro, ropa formal, expresión neutra o ligeramente sonriente. Tamaño pasaporte, esquina superior derecha o izquierda.</li>
  <li><strong>Idioma:</strong> El idioma del CV debe coincidir con el del cantón donde está la empresa. Alemán en Zúrich, francés en Ginebra, italiano en Lugano. Inglés solo en multinacionales o tech internacional.</li>
  <li><strong>Máximo 2 páginas:</strong> Los CVs de 4-5 páginas son comunes en España. En Suiza 2 páginas es el máximo estricto para la mayoría de perfiles.</li>
  <li><strong>Referencias reales en el CV:</strong> No "disponibles a petición" — incluye 2-3 referencias con nombre completo, cargo, empresa y contacto directo.</li>
  <li><strong>Datos personales completos:</strong> Fecha de nacimiento, estado civil y nacionalidad se incluyen en Suiza. En España se evitan por motivos legales, pero en Suiza son habituales.</li>
  <li><strong>Sin objetivos genéricos:</strong> La sección "Objetivo profesional" tan común en CVs latinoamericanos es innecesaria. Se sustituye por un perfil profesional de 3-4 líneas muy concreto.</li>
  <li><strong>Idiomas con nivel CEFR:</strong> Indica siempre el nivel oficial (A1-C2). No escribas "nivel medio" o "avanzado" — las empresas suizas esperan la escala europea.</li>
</ol>

<h2>Estructura del CV suizo: sección por sección</h2>

<h3>1. Datos personales</h3>
<p>Nombre completo, dirección en Suiza (o indicar "en proceso de relocalización"), teléfono, email, LinkedIn. Añade fecha de nacimiento, nacionalidad y permiso de residencia si ya lo tienes.</p>

<h3>2. Perfil profesional (3-5 líneas)</h3>
<p>Un resumen concreto de quién eres profesionalmente y qué aportas. Sin frases genéricas como "persona proactiva y orientada a resultados". Ejemplo real: "Ingeniero mecánico con 8 años en la industria farmacéutica, especializado en validación de equipos GMP. Bilingüe alemán-español, experiencia en entornos regulados FDA/EMA."</p>

<h3>3. Experiencia profesional (orden cronológico inverso)</h3>
<p>Empresa, cargo, fechas (mes/año - mes/año), ubicación. Para cada puesto: 3-5 logros concretos con cifras cuando sea posible. No listas de tareas genéricas — resultados medibles.</p>

<h3>4. Formación</h3>
<p>Título, institución, país, año. Si tu título es de fuera de Suiza, menciona si está en proceso de reconocimiento oficial (especialmente relevante para medicina, enfermería, abogacía).</p>

<h3>5. Idiomas</h3>
<p>Lista todos los idiomas con nivel CEFR. No olvides incluir el español como lengua materna — en Suiza, el español es un activo, especialmente en banca privada, comercio internacional y organizaciones internacionales.</p>

<h3>6. Habilidades técnicas</h3>
<p>Herramientas, software, certificaciones. Conciso y relevante para el puesto.</p>

<h3>7. Referencias</h3>
<p>2-3 referencias reales. Nombre, cargo, empresa, email y/o teléfono. Avisa a las personas antes de incluirlas.</p>

<h2>La carta de motivación: tan importante como el CV</h2>
<p>En Suiza la carta de motivación (Motivationsschreiben / lettre de motivation) no es opcional. Una carta genérica o copiada descarta tu candidatura igual que un CV mal formateado.</p>
<p>Una buena carta de motivación para el mercado suizo debe:</p>
<ul>
  <li>Tener máximo 1 página</li>
  <li>Estar personalizada para esa empresa y ese puesto específico (menciona la empresa por nombre, lo que te atrae de ella)</li>
  <li>Explicar por qué tú eres la mejor opción para ESE puesto concreto</li>
  <li>Mostrar que conoces la empresa, su sector y sus valores</li>
  <li>Estar escrita en el idioma del cantón</li>
</ul>

<h2>Errores más comunes de hispanohablantes en el CV suizo</h2>
<ul>
  <li>✗ CV en español (descarte inmediato)</li>
  <li>✗ Sin foto o foto informal</li>
  <li>✗ Más de 2 páginas con experiencia media</li>
  <li>✗ Referencias "a petición"</li>
  <li>✗ Objetivos profesionales genéricos al inicio</li>
  <li>✗ Tareas en lugar de logros con cifras</li>
  <li>✗ No mencionar el permiso de residencia o estado migratorio</li>
</ul>

<h2>Busca trabajo en Suiza con nuestro buscador</h2>
<p>Una vez que tu CV esté adaptado, usa nuestro <a href="/trabajo/buscador">buscador de trabajo en Suiza</a> para encontrar ofertas actualizadas en tu sector y ciudad. Filtra por área de trabajo y ciudad suiza directamente desde nuestra plataforma.</p>
    `
  },

  // ─────────────────────────────────────────────────────────
  // 10. VIVIR EN ZÚRICH
  // ─────────────────────────────────────────────────────────
  {
    slug: "vivir-en-zurich-espanoles-hispanohablantes",
    titulo: "Vivir en Zúrich siendo español o latinoamericano: barrios, costes y trabajo en 2026",
    descripcion: "Todo lo que necesitas saber antes de mudarte a Zúrich: barrios donde vivir, coste real de vida, sectores con más trabajo y cómo se vive el día a día.",
    categoria: "vida-diaria",
    fecha: "2026-10-06",
    tiempoLectura: 8,
    imagen: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=1200&q=85&auto=format&fit=crop",
    destacado: false,
    fechaModificada: "2026-10-09",
    palabrasClave: ["vivir en zurich", "zurich españoles", "vivir en zurich español", "mudarse zurich", "trabajar en zurich", "zurich hispanohablantes"],
    faq: [
      { pregunta: "¿Cuánto cuesta vivir en Zúrich para una persona sola?", respuesta: "Una persona sola en Zúrich necesita entre 3.200 y 4.500 CHF/mes: alquiler de habitación o estudio (1.500-2.200 CHF), seguro médico (420-500 CHF), comida (500-700 CHF), transporte (100 CHF) y ocio (300-500 CHF)." },
      { pregunta: "¿Cuáles son los mejores barrios para vivir en Zúrich para extranjeros?", respuesta: "Los más populares entre hispanohablantes son Kreis 4 y 5 (dinámicos y asequibles), Oerlikon (moderno, bien comunicado, más barato) y Altstetten (barrio familiar, tranquilo, buen transporte)." },
      { pregunta: "¿Es difícil encontrar trabajo en Zúrich siendo español?", respuesta: "En sectores como IT, banca y consultoría la demanda es alta y el inglés es suficiente para empezar. Aprender alemán acelera enormemente la integración laboral y social." },
    ],
    contenido: `
<h2>Por qué Zúrich es el destino número uno de hispanohablantes en Suiza</h2>
<p>Zúrich concentra más del 40% de los puestos de trabajo bien remunerados de Suiza. Es el mayor centro financiero de Europa continental, el hub tecnológico más importante del continente después de Londres y el hogar de las sedes europeas de Google, Disney, IBM y decenas de multinacionales.</p>
<p>Para hispanohablantes cualificados — especialmente en IT, banca, ingeniería y sanidad — Zúrich es la ciudad con mayor concentración de oportunidades. El precio de esa oportunidad es el coste de vida más alto del país.</p>

<h2>Barrios de Zúrich: dónde viven los hispanohablantes</h2>
<p>Zúrich está dividida en 12 Kreise (distritos). Los más populares entre recién llegados hispanohablantes:</p>
<ul>
  <li><strong>Kreis 4 y 5 (Langstrasse/Industriequartier):</strong> Los barrios más cosmopolitas y con más vida nocturna. Muchos jóvenes profesionales y expatriados. Alquileres algo más bajos que el centro. Muy bien conectados al centro.</li>
  <li><strong>Kreis 3 (Wiedikon/Sihlfeld):</strong> Popular entre familias hispanohablantes. Tranquilo, verde, buen transporte. Mezcla de suizos y comunidad internacional.</li>
  <li><strong>Oerlikon (Kreis 11):</strong> El barrio de moda para jóvenes profesionales. Nuevo desarrollo urbano, buenas conexiones, precios más asequibles que el centro. Amazon y otras tech tienen oficinas aquí.</li>
  <li><strong>Altstetten (Kreis 9):</strong> El barrio más asequible de la ciudad con buenas comunicaciones. Popular entre familias y trabajadores industriales.</li>
  <li><strong>Zürich West:</strong> Zona regenerada con lofts y estudios modernos. Popular entre creativos y trabajadores del sector tech.</li>
</ul>
<p>Consejo: muchos hispanohablantes viven fuera de Zúrich ciudad — en Winterthur (30 min en tren), Schaffhausen, Baden o incluso en el cantón de Zug — y viajan al trabajo. El ahorro en alquiler puede ser de 400-600 CHF/mes.</p>

<h2>Coste de vida real en Zúrich 2026</h2>
<p>Estos son datos reales reportados por la comunidad hispanohablante, no estimaciones turísticas:</p>
<ul>
  <li><strong>Alquiler estudio zona periférica:</strong> 1.600 – 2.000 CHF/mes</li>
  <li><strong>Alquiler piso 2 hab. compartido (tu parte):</strong> 900 – 1.300 CHF/mes</li>
  <li><strong>Seguro médico (KVG básico):</strong> 420 – 500 CHF/mes</li>
  <li><strong>Abono transporte ZVV zona 110:</strong> 100 CHF/mes</li>
  <li><strong>Supermercado (Migros/Aldi):</strong> 350 – 500 CHF/mes</li>
  <li><strong>Comer fuera 1x semana:</strong> 120 – 200 CHF/mes</li>
  <li><strong>Móvil + internet:</strong> 50 – 80 CHF/mes</li>
</ul>
<p><strong>Total mínimo razonable:</strong> 3.000 – 3.800 CHF/mes sin coche.</p>
<p>¿Cuánto te quedaría en mano de tu salario en Zúrich? Usa nuestra <a href="/herramientas/salario-neto">calculadora de salario neto</a> para saberlo en función de tu sueldo bruto.</p>

<h2>Trabajo en Zúrich: sectores y salarios</h2>
<p>Los sectores con más demanda para hispanohablantes en Zúrich:</p>
<ul>
  <li><strong>Tecnología:</strong> Google Zurich, UBS Tech, Credit Suisse, centenares de startups. El inglés es suficiente para muchos puestos tech. Salarios: 90.000 – 150.000 CHF/año.</li>
  <li><strong>Banca y finanzas:</strong> UBS, Julius Bär, Vontobel, Pictet. Se valora el inglés y el alemán. Salarios: 95.000 – 180.000 CHF/año.</li>
  <li><strong>Consultoría:</strong> McKinsey, BCG, Accenture, Deloitte. Inglés imprescindible, alemán muy valorado.</li>
  <li><strong>Sanidad:</strong> UniversitätsSpital Zürich, Triemli. Alemán B2 mínimo obligatorio.</li>
  <li><strong>Hostelería de lujo:</strong> hoteles 5 estrellas junto al lago.</li>
</ul>

<h2>Integración: el alemán en Zúrich</h2>
<p>El idioma oficial es el alemán — pero con un matiz importante: en la calle se habla Schweizerdeutsch (dialecto suizo alemán), mientras que en el trabajo, el correo y la administración se usa Hochdeutsch (alemán estándar).</p>
<p>Para sobrevivir en Zúrich con inglés es posible en el sector tech internacional. Pero para integrarte socialmente, entender facturas y comunicarte con el casero o la Gemeinde, necesitas alemán. Empieza con A2-B1 y el dialecto suizo lo irás entendiendo por inmersión.</p>
<p>Kurse (cursos) recomendados: Migros Klubschule (muy popular, moderado en precio), Goethe-Institut Zürich, o cursos online con DW (Deutsche Welle, gratuito).</p>

<h2>La comunidad hispanohablante en Zúrich</h2>
<p>Zúrich tiene una comunidad hispanohablante activa. Grupos en Facebook como "Españoles en Zúrich" o "Latinoamericanos en Zúrich" tienen miles de miembros y son muy útiles para encontrar piso, hacer contactos o simplemente resolver dudas prácticas.</p>
<p>También hay eventos regulares: cenas, salidas al lago, grupos de español para suizos que quieren practicar (muy útil para hacer amigos locales).</p>
<p>¿Quieres comparar Zúrich con otras ciudades suizas? Lee nuestra guía sobre <a href="/blog/vivir-en-ginebra-espanoles-hispanohablantes">vivir en Ginebra</a> (más internacional, con francés) o <a href="/blog/vivir-en-lugano-espanoles-hispanohablantes">vivir en Lugano</a> (más latina, con italiano y clima mediterráneo). También puedes usar el <a href="/herramientas/comparador-ciudades">comparador de ciudades</a> para ver las diferencias de coste real lado a lado.</p>
    `
  },

  // ─────────────────────────────────────────────────────────
  // 11. VIVIR EN GINEBRA
  // ─────────────────────────────────────────────────────────
  {
    slug: "vivir-en-ginebra-espanoles-hispanohablantes",
    titulo: "Vivir en Ginebra siendo español o latinoamericano: guía completa 2026",
    descripcion: "Ginebra, la ciudad internacional por excelencia. Barrios, costes reales, organizaciones internacionales, banca privada y cómo integrarse.",
    categoria: "vida-diaria",
    fecha: "2026-10-07",
    tiempoLectura: 7,
    imagen: "https://images.unsplash.com/photo-1573108724029-4c46571d6490?w=1200&q=85&auto=format&fit=crop",
    destacado: false,
    fechaModificada: "2026-10-09",
    palabrasClave: ["vivir en ginebra", "ginebra españoles", "vivir en ginebra español", "mudarse ginebra", "trabajar ginebra", "organizaciones internacionales ginebra"],
    faq: [
      { pregunta: "¿Cuánto cuesta vivir en Ginebra al mes?", respuesta: "Una persona sola necesita entre 3.300 y 4.600 CHF/mes. El seguro médico es el más caro de Suiza (480-560 CHF/mes) y los alquileres son similares a Zúrich. Sin embargo, los salarios en Ginebra también están entre los más altos." },
      { pregunta: "¿Qué idioma se habla en Ginebra?", respuesta: "El francés es el idioma oficial y de uso cotidiano. Es imprescindible para trabajar en la mayoría de sectores. El inglés funciona bien en organizaciones internacionales, ONU y sector bancario privado internacional." },
      { pregunta: "¿Es más fácil encontrar trabajo en Ginebra siendo latinoamericano?", respuesta: "Ginebra tiene ventajas especiales: las organizaciones internacionales (ONU, OMS, Cruz Roja) contratan de todo el mundo, y el sector diplomático no aplica las mismas restricciones que el mercado privado." },
    ],
    contenido: `
<h2>Ginebra: la ciudad más internacional de Suiza</h2>
<p>Ginebra no es una ciudad suiza más — es una ciudad global. Alberga la sede europea de la ONU, la OMS, la Cruz Roja Internacional, el CERN, la OMC y más de 200 organizaciones internacionales y ONGs. Más del 40% de su población es extranjera.</p>
<p>Para hispanohablantes, Ginebra tiene ventajas únicas: el francés es la lengua oficial (mucho más accesible que el alemán para un hispanohablante), y el ambiente internacional hace que la integración sea más fácil que en ciudades de habla alemana.</p>

<h2>Francés en Ginebra: la buena noticia para hispanohablantes</h2>
<p>Un hispanohablante puede aprender francés funcional en 3-6 meses — la proximidad lingüística con el español es enorme. A nivel A2-B1 ya puedes manejarte en el día a día. Este es el mayor argumento a favor de Ginebra frente a Zúrich para muchos latinoamericanos y españoles.</p>
<p>Para el trabajo, el nivel necesario depende del sector: en organizaciones internacionales el inglés es frecuentemente suficiente; en banca local, hostelería o comercio necesitas francés B2 o superior.</p>

<h2>Barrios de Ginebra para vivir</h2>
<ul>
  <li><strong>Carouge:</strong> El barrio más querido por expatriados latinos. Ambiente mediterráneo, terrazas, mercado, comunidad italiana y española muy activa. Alquileres algo más bajos que el centro. Altamente recomendado.</li>
  <li><strong>Plainpalais:</strong> Barrio universitario, joven, dinámico. Mercado al aire libre, bares, galerías. Popular entre jóvenes profesionales.</li>
  <li><strong>Eaux-Vives:</strong> Junto al lago, tranquilo y bien comunicado. Precio medio-alto.</li>
  <li><strong>Meyrin:</strong> Zona donde está el CERN. Muy internacional. Alquileres más accesibles que el centro de la ciudad.</li>
  <li><strong>Fuera de Ginebra (Francia):</strong> Muchos trabajadores en Ginebra viven en Francia (Ferney-Voltaire, Saint-Genis, Annemasse) y cruzan la frontera cada día. Los alquileres pueden ser 50% más baratos. Requiere tramitar el estatuto de trabajador fronterizo.</li>
</ul>

<h2>Coste de vida en Ginebra 2026</h2>
<ul>
  <li><strong>Alquiler estudio zona periférica:</strong> 1.600 – 2.100 CHF/mes</li>
  <li><strong>Seguro médico KVG:</strong> 480 – 560 CHF/mes (el más caro de Suiza)</li>
  <li><strong>Transporte (TPG abono mensual):</strong> 70 CHF/mes</li>
  <li><strong>Supermercado:</strong> 400 – 550 CHF/mes</li>
  <li><strong>Ocio y varios:</strong> 300 – 500 CHF/mes</li>
</ul>
<p><strong>Total mínimo:</strong> 3.100 – 4.000 CHF/mes. El seguro médico es el mayor diferencial respecto a otras ciudades suizas.</p>

<h2>Trabajo en Ginebra: las oportunidades reales</h2>
<ul>
  <li><strong>Organizaciones internacionales:</strong> ONU, OMS, ACNUR, Cruz Roja, OMC, CERN. Contratan de todo el mundo, incluyendo latinoamericanos. Los procesos son largos pero las condiciones son excelentes.</li>
  <li><strong>Banca privada:</strong> Pictet, Lombard Odier, Mirabaud, UBP. Gestión de patrimonio internacional. El español es una ventaja real para clientes latinoamericanos de alta renta.</li>
  <li><strong>Trading de materias primas:</strong> Ginebra es el mayor centro mundial de trading de commodities. Empresas como Trafigura, Gunvor, Vitol tienen sus sedes aquí.</li>
  <li><strong>Hostelería de lujo:</strong> hoteles como el Beau-Rivage, Kempinski, Four Seasons. El francés e inglés son imprescindibles.</li>
</ul>

<h2>Salario mínimo y poder adquisitivo</h2>
<p>Ginebra tiene el salario mínimo cantonal más alto de Suiza: 24 CHF/hora (aproximadamente 4.000 CHF/mes para jornada completa). Los salarios medios en banca privada o en organizaciones internacionales superan holgadamente los 8.000 CHF/mes brutos.</p>
<p>Para comparar el poder adquisitivo real entre Ginebra y otras ciudades suizas, usa nuestra <a href="/herramientas/comparador-ciudades">herramienta de comparación de ciudades</a>. Si valoras más las oportunidades tech o financieras, lee también nuestra guía sobre <a href="/blog/vivir-en-zurich-espanoles-hispanohablantes">vivir en Zúrich</a>. Y si buscas un ritmo de vida más tranquilo con clima mediterráneo, Lugano puede sorprenderte: <a href="/blog/vivir-en-lugano-espanoles-hispanohablantes">vivir en Lugano</a>.</p>
    `
  },

  // ─────────────────────────────────────────────────────────
  // 12. VIVIR EN LUGANO
  // ─────────────────────────────────────────────────────────
  {
    slug: "vivir-en-lugano-espanoles-hispanohablantes",
    titulo: "Vivir en Lugano: la ciudad suiza más latina, con lago y clima mediterráneo",
    descripcion: "Lugano es la ciudad de habla italiana de Suiza — la más fácil de integrar para hispanohablantes. Barrios, trabajo, coste de vida y comunidad hispana.",
    categoria: "vida-diaria",
    fecha: "2026-10-08",
    tiempoLectura: 6,
    imagen: "https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=1200&q=85&auto=format&fit=crop",
    destacado: false,
    fechaModificada: "2026-10-09",
    palabrasClave: ["vivir en lugano", "lugano hispanohablantes", "lugano españoles", "vivir lugano suiza", "mudarse lugano", "lugano ticino trabajo"],
    faq: [
      { pregunta: "¿Qué idioma se habla en Lugano?", respuesta: "En Lugano y el cantón Ticino se habla italiano. Para un hispanohablante, el italiano es el idioma más fácil de aprender de Suiza — 6-9 meses para comunicarse con fluidez. El inglés funciona en el sector bancario y las multinacionales." },
      { pregunta: "¿Cuánto cuesta vivir en Lugano?", respuesta: "Lugano es cara como toda Suiza, pero un 15-25% más asequible que Zúrich o Ginebra. Un estudio en zona periférica cuesta entre 1.100 y 1.700 CHF/mes. El seguro médico es moderado: 330-400 CHF/mes." },
      { pregunta: "¿Qué trabajo hay en Lugano para hispanohablantes?", respuesta: "Los sectores principales son banca privada, tecnología financiera (fintech), turismo y hostelería, y empresas relacionadas con el comercio italiano-suizo. El italiano es necesario para la mayoría de puestos." },
    ],
    contenido: `
<h2>Lugano: la Suiza mediterránea que enamora a los hispanohablantes</h2>
<p>Lugano es única en Suiza. Es la única gran ciudad de habla italiana del país, está junto a un lago con aguas turquesas y rodeada de montañas, y tiene un clima que parece el norte de Italia más que Suiza. 280 días de sol al año, palmeras junto al lago y una comunidad italiana y latina muy presente.</p>
<p>Para hispanohablantes, Lugano tiene una ventaja enorme: el italiano — la lengua local — es la lengua más cercana al español. Con un nivel B1 de español ya puedes entender el 60-70% del italiano desde el primer día, y con 6-9 meses de práctica hablar con fluidez.</p>

<h2>El idioma: por qué Lugano es la opción más fácil lingüísticamente</h2>
<p>Este es el argumento definitivo de Lugano para muchos hispanohablantes que no quieren enfrentarse al alemán (Zúrich) ni al francés (Ginebra). El italiano y el español comparten raíz latina, vocabulario y estructuras gramaticales similares.</p>
<p>Proceso típico de un hispanohablante en Lugano:</p>
<ul>
  <li><strong>Mes 1-2:</strong> Entiende conversaciones básicas, puede hacer compras y trámites simples</li>
  <li><strong>Mes 3-6:</strong> Puede trabajar en entornos donde se acepta el italiano básico</li>
  <li><strong>Mes 6-12:</strong> Habla con fluidez, acento latino que los locales encuentran simpático</li>
</ul>

<h2>Barrios de Lugano</h2>
<ul>
  <li><strong>Centro (Città):</strong> El corazón comercial y financiero. Bancos, boutiques, restaurantes junto al lago. Alquileres más altos: 1.600-2.200 CHF para estudio.</li>
  <li><strong>Massagno:</strong> Barrio residencial junto al centro, más tranquilo y asequible. Popular entre familias. 1.200-1.600 CHF/estudio.</li>
  <li><strong>Pregassona:</strong> Zona norte de Lugano, moderna, bien conectada. Alquileres algo más bajos. Comunidad hispanohablante activa.</li>
  <li><strong>Bioggio / Manno:</strong> Zona tecnológica al oeste. Aquí están muchas empresas de tecnología y finanzas. Alquileres accesibles, ideal si trabajas en ese sector.</li>
  <li><strong>Lugano-Paradiso:</strong> Junto al lago, ambiente turístico. Precioso pero caro y no ideal para vivir a largo plazo.</li>
</ul>

<h2>Coste de vida en Lugano 2026</h2>
<ul>
  <li><strong>Alquiler estudio zona periférica:</strong> 1.100 – 1.600 CHF/mes</li>
  <li><strong>Seguro médico KVG:</strong> 330 – 400 CHF/mes (moderado)</li>
  <li><strong>Transporte (TILO/bus):</strong> 80 CHF/mes</li>
  <li><strong>Supermercado:</strong> 350 – 500 CHF/mes</li>
  <li><strong>Ocio y varios:</strong> 250 – 400 CHF/mes</li>
</ul>
<p><strong>Total mínimo:</strong> 2.400 – 3.200 CHF/mes. Uno de los menores costes de las ciudades principales suizas.</p>

<h2>Trabajo en Lugano: sectores principales</h2>
<ul>
  <li><strong>Banca y finanzas:</strong> BSI, Banca del Ceresio, Banque Cramer, Julius Bär Lugano. El sector financiero es el principal empleador de perfiles cualificados. El italiano es obligatorio; el inglés y el español son un plus.</li>
  <li><strong>Tecnología (polo tecnológico Bioggio-Manno):</strong> Lugano tiene un creciente ecosistema tech, con empresas como Lugano Business Center y muchas startups fintech.</li>
  <li><strong>Universidad de la Svizzera italiana (USI):</strong> universidad y politécnico que generan empleos en investigación, educación y administración.</li>
  <li><strong>Turismo y hostelería:</strong> hoteles de lujo junto al lago, restaurantes, actividades al aire libre.</li>
</ul>

<h2>La comunidad hispanohablante en Lugano</h2>
<p>Lugano tiene la mayor concentración proporcional de hispanohablantes de Suiza — especialmente colombianos, argentinos, venezolanos y ecuatorianos que llevan décadas en el Ticino. La comunidad es activa y acogedora con los recién llegados.</p>
<p>Grupos como "Hispanos en Lugano" en Facebook tienen miles de miembros y son el mejor canal para encontrar piso, trabajo informal o simplemente adaptarse más rápido.</p>
<p>¿Valoras más las oportunidades laborales y el tamaño de ciudad? Lee nuestras guías sobre <a href="/blog/vivir-en-zurich-espanoles-hispanohablantes">vivir en Zúrich</a> (mayor hub tecnológico y financiero) y <a href="/blog/vivir-en-ginebra-espanoles-hispanohablantes">vivir en Ginebra</a> (organizaciones internacionales y banca privada). Compara los tres destinos con el <a href="/herramientas/comparador-ciudades">comparador de ciudades suizas</a>.</p>
    `
  },

  // ─────────────────────────────────────────────────────────
  // 13. APRENDER ALEMÁN EN SUIZA
  // ─────────────────────────────────────────────────────────
  {
    slug: "aprender-aleman-suiza-hispanohablantes-guia",
    titulo: "Aprender alemán en Suiza siendo hispanohablante: Hochdeutsch vs Schweizerdeutsch, cursos y tiempo real",
    descripcion: "La guía honesta sobre aprender alemán en Suiza: por qué el dialecto suizo no es el alemán que estudias, cuánto tiempo lleva y qué cursos son los mejores.",
    categoria: "vida-diaria",
    fecha: "2026-10-09",
    tiempoLectura: 7,
    imagen: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=85&auto=format&fit=crop",
    destacado: false,
    fechaModificada: "2026-10-09",
    palabrasClave: ["aprender aleman suiza", "schweizerdeutsch", "hochdeutsch suiza", "cursos aleman zurich", "aleman hispanohablante suiza", "aprender aleman berna basilea"],
    faq: [
      { pregunta: "¿Es el alemán suizo muy diferente al alemán estándar?", respuesta: "Sí, mucho más de lo que la gente cree. El Schweizerdeutsch (alemán suizo) es un dialecto que varía por cantón, se usa en la calle y no tiene forma escrita estándar. En el trabajo y la administración se usa Hochdeutsch (alemán estándar). Lo que estudias en academias es Hochdeutsch, que sí funciona para trabajo y trámites." },
      { pregunta: "¿Cuánto tiempo se tarda en aprender alemán siendo hispanohablante?", respuesta: "Para alcanzar B2 (nivel laboral) desde cero: entre 18 y 30 meses estudiando regularmente. Para A2 básico (sobrevivir en el día a día): 6-9 meses. El Schweizerdeutsch se aprende por inmersión y puede tardar 1-2 años adicionales para entenderlo con fluidez." },
      { pregunta: "¿Dónde estudiar alemán en Suiza sin gastarse una fortuna?", respuesta: "Las mejores opciones económicas son: Deutsche Welle online (gratuito, A1-C1), Autonome Schule Zürich (precios reducidos), Caritas (gratuito para residentes con bajo ingreso), y el intercambio de idiomas (Tandem) con suizos que quieren aprender español." },
    ],
    contenido: `
<h2>El shock del alemán suizo: lo que nadie te avisa</h2>
<p>Llegas a Zúrich con tu A2 de alemán que tanto te costó estudiar. Abres la boca en el supermercado y el cajero te responde algo que no se parece en nada a lo que aprendiste. Eso es el Schweizerdeutsch — y es una de las primeras sorpresas reales de vivir en la Suiza alemana.</p>
<p>Entender la diferencia entre el alemán que estudias y el alemán que hablan los suizos en la calle es esencial antes de empezar cualquier curso.</p>

<h2>Hochdeutsch vs Schweizerdeutsch: la diferencia clave</h2>
<p>En Suiza conviven dos variedades del alemán con funciones completamente distintas:</p>
<ul>
  <li><strong>Hochdeutsch (alemán estándar):</strong> Es el alemán escrito, el de los textos oficiales, el correo del trabajo, las facturas, los contratos, los libros. Lo usan los medios de comunicación y en contextos formales. Es lo que estudias en academias de idiomas y lo que te enseña Duolingo o la DW. <em>Este es el alemán que necesitas para trabajar.</em></li>
  <li><strong>Schweizerdeutsch (dialecto suizo):</strong> Es el alemán hablado en la calle, en casa, entre amigos, en la TV local, en el supermercado. No tiene forma escrita estándar — cada cantón tiene su variante (Züritüütsch, Berndüütsch, Baseldüütsch...). Los suizos lo usan para todo lo informal. <em>No lo aprenderás en ningún curso: solo por inmersión.</em></li>
</ul>
<blockquote>"Después de 2 años en Suiza y un B2 de alemán, aún hay días que no entiendo nada de lo que dicen en el tren. Pero en el trabajo me comunico perfectamente." — Rodrigo, Lima → Zúrich</blockquote>

<h2>¿Qué nivel necesitas según tu situación?</h2>
<ul>
  <li><strong>Para trabajar en IT/tech internacional o banca privada:</strong> El inglés puede ser suficiente. El alemán A2-B1 es un plus que acelera la integración.</li>
  <li><strong>Para trabajar en sanidad, comercio, administración o cualquier trabajo cara al público:</strong> Alemán B2 obligatorio. Sin él, pocas empresas suizas te contratan.</li>
  <li><strong>Para alquilar piso y comunicarte con el casero:</strong> A2-B1 funciona.</li>
  <li><strong>Para entender el Schweizerdeutsch oral:</strong> 1-2 años de inmersión después de tener B1-B2 de Hochdeutsch.</li>
</ul>

<h2>Los mejores cursos de alemán en Suiza para hispanohablantes</h2>

<h3>Opciones gratuitas o muy económicas</h3>
<ul>
  <li><strong>Deutsche Welle (DW) online:</strong> La mejor opción gratuita. Cursos de A1 a C1, buena calidad pedagógica, ejercicios, podcast. Ideal para empezar antes de llegar. <em>dwelle.com/learn-german</em></li>
  <li><strong>Autonome Schule Zürich:</strong> Cursos de alemán a precios sociales para inmigrantes. Sin fines de lucro. Excelente para recién llegados con recursos limitados.</li>
  <li><strong>Caritas:</strong> En muchos cantones ofrece cursos gratuitos o muy baratos de integración lingüística para residentes con permiso de residencia.</li>
  <li><strong>Tandem / intercambio de idiomas:</strong> Busca suizos que quieran aprender español (hay muchos). Una hora de alemán por una hora de español. Cero coste y contactos locales. Plataformas: Tandem app, meetup.com, grupos de Facebook locales.</li>
</ul>

<h3>Opciones de precio medio</h3>
<ul>
  <li><strong>Migros Klubschule:</strong> La escuela de idiomas más popular de Suiza. Cursos de todos los niveles, horarios flexibles, instructores nativos. Precio: 300-500 CHF por nivel (unas 40 horas). Muy buena calidad-precio.</li>
  <li><strong>Volkshochschule (VHS):</strong> Escuela pública de adultos, presencia en todas las ciudades. Precios moderados, cursos intensivos y regulares.</li>
</ul>

<h3>Opciones intensivas o premium</h3>
<ul>
  <li><strong>Goethe-Institut:</strong> Referencia mundial. Cursos en Zúrich, Berna y otras ciudades. Más caro (800-1.500 CHF por nivel) pero con certificación internacional reconocida.</li>
  <li><strong>Berlitz, Inlingua:</strong> Escuelas privadas con profesores nativos y horarios flexibles. Para quien necesita resultados rápidos y tiene presupuesto.</li>
</ul>

<h2>El plan de aprendizaje más eficiente para hispanohablantes</h2>
<ol>
  <li><strong>Meses 1-3 (desde casa, antes de llegar):</strong> DW online A1 completo + app Babbel o Duolingo como complemento. 30-45 min/día.</li>
  <li><strong>Meses 4-9 (en Suiza, A2):</strong> Migros Klubschule o VHS A2 + buscar tandem con suizo/a. Empieza a entender el Schweizerdeutsch por contexto.</li>
  <li><strong>Meses 10-18 (B1):</strong> Curso regular B1 + empezar a escuchar podcasts suizos (SRF), noticias, series suizas.</li>
  <li><strong>Meses 18-30 (B2):</strong> Curso B2 + trabajo o prácticas en entorno alemanoparlante. Con B2 ya puedes trabajar en la mayoría de sectores.</li>
</ol>
<p>El secreto es la constancia, no la intensidad. 30 minutos diarios durante 2 años dan mejores resultados que un mes intensivo y luego nada.</p>
    `
  },
];

// ── Índice completo (manuales + auto) ─────────────────────────────────────────
export const allPosts: Post[] = [...postsManual, ...postsAuto];

export function getPost(slug: string): Post | undefined {
  return allPosts.find(p => p.slug === slug);
}

export function getPostsByCategoria(categoria: string): Post[] {
  return allPosts.filter(p => p.categoria === categoria);
}

export function getDestacados(): Post[] {
  return allPosts.filter(p => p.destacado);
}

// Compatibilidad con código existente que importa `posts` directamente
export { allPosts as posts };
