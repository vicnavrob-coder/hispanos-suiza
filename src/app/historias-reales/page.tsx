import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Historias reales",
  description: "Experiencias reales de españoles y latinoamericanos que viven en Suiza.",
};

const historias = [
  {
    nombre: "Carlos G.",
    origen: "Valencia, España",
    ciudad: "Zúrich",
    trabajo: "Ingeniero de software",
    anio: "2024",
    resumen: "Llegué sin hablar alemán, con un contrato de trabajo y €2.000 en el bolsillo. Lo que nadie me contó sobre los primeros 3 meses.",
    extracto: "El mayor error fue no contratar el seguro médico la primera semana. Pensé que tenía 3 meses, y técnicamente los tienes, pero si tienes cualquier problema de salud en ese tiempo y luego contratas, la aseguradora aplica retroactividad y pagas todo de golpe.",
    tags: ["seguro médico", "Zúrich", "ingeniero"],
  },
  {
    nombre: "María F.",
    origen: "Bogotá, Colombia",
    ciudad: "Ginebra",
    trabajo: "Traductora freelance",
    anio: "2023",
    resumen: "Vine con visa de turista, conseguí trabajo en 6 semanas y regularicé mi situación. Cómo lo hice siendo latinoamericana.",
    extracto: "Muchos me decían que era imposible regularizarse una vez dentro. No es verdad, pero hay que hacerlo muy bien. Encontré trabajo a través de LinkedIn, la empresa tramitó el permiso B y el proceso tardó 3 meses.",
    tags: ["latinoamericana", "Ginebra", "visado", "freelance"],
  },
  {
    nombre: "Alejandro & Lucía",
    origen: "Buenos Aires, Argentina",
    ciudad: "Basilea",
    trabajo: "Farmacéuticos",
    anio: "2025",
    resumen: "Nos mudamos los dos juntos con dos hijos. El proceso de escolarización, el alemán y por qué elegimos Basilea y no Zúrich.",
    extracto: "Basilea era más barata que Zúrich (un 20% menos en alquiler), más pequeña y con mucho trabajo en farmacéuticas. Con dos hijos en edad escolar, el sistema suizo fue una sorpresa: excelente, gratuito y muy diferente al argentino.",
    tags: ["familia", "Basilea", "educación", "farmacia"],
  },
  {
    nombre: "Elena R.",
    origen: "Lima, Perú",
    ciudad: "Lausana",
    trabajo: "Hostelería",
    anio: "2024",
    resumen: "Empecé en hostelería, ahorré, saqué un curso de cocina suizo y ahora gano 4.500 CHF/mes. Mi camino en 18 meses.",
    extracto: "La hostelería es la puerta más fácil de entrada en Suiza para latinoamericanos sin título homologado. El trabajo es duro pero los sueldos son reales: 3.200 CHF limpios de entrada. En 18 meses subí a jefe de cocina.",
    tags: ["hostelería", "Lausana", "latinoamericana", "ascenso"],
  },
];

export default function HistoriasRealesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Historias reales</h1>
        <p className="text-gray-500">
          Lo que no encuentras en ninguna guía. Experiencias sin filtros de hispanohablantes que ya viven en Suiza.
        </p>
      </div>

      {/* Por qué importa */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8 flex gap-4">
        <span className="text-3xl flex-shrink-0">💡</span>
        <div>
          <h2 className="font-bold text-gray-800 mb-1">Por qué creamos esta sección</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Las guías genéricas te dicen qué documentos necesitas. Las historias reales te dicen lo que nadie te avisó,
            los errores que costaron dinero, y los atajos que nadie publica. Google premia el contenido con experiencia real —
            nosotros lo priorizamos porque es lo que realmente ayuda.
          </p>
        </div>
      </div>

      {/* Historias */}
      <div className="flex flex-col gap-6">
        {historias.map((h, i) => (
          <article key={i} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold text-sm">
                    {h.nombre.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">{h.nombre}</div>
                    <div className="text-xs text-gray-400">{h.origen} → {h.ciudad} · {h.trabajo} · {h.anio}</div>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-lg font-bold text-gray-800 mb-3 leading-snug">{h.resumen}</h2>

            <blockquote className="border-l-4 border-amber-400 bg-amber-50 pl-4 py-3 pr-3 rounded-r-lg mb-4 italic text-gray-600 text-sm leading-relaxed">
              "{h.extracto}"
            </blockquote>

            <div className="flex flex-wrap gap-2">
              {h.tags.map((tag) => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      {/* CTA para compartir historia */}
      <div style={{ background: "linear-gradient(135deg, #C0392B, #96281B)" }} className="text-white rounded-2xl p-8 mt-10 text-center">
        <h2 className="text-xl font-bold mb-2">¿Vives en Suiza? Comparte tu historia</h2>
        <p className="text-red-100 text-sm mb-5">
          Tu experiencia puede ayudar a miles de personas que están donde tú estabas. Publicamos tu historia (con el anonimato que quieras).
        </p>
        <Link
          href="mailto:hola@hispanosensuiza.com?subject=Quiero compartir mi historia"
          className="inline-block bg-white text-red-700 font-bold px-6 py-2.5 rounded-full hover:bg-red-50 transition-colors"
        >
          Contar mi historia →
        </Link>
      </div>
    </div>
  );
}
