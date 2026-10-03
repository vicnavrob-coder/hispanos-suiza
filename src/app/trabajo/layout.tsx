import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Buscador de trabajo en Suiza para hispanohablantes",
  description: "Encuentra ofertas de trabajo en Suiza en español. Busca por sector y ciudad: tecnología, banca, salud, hostelería y más. Resultados de LinkedIn actualizados.",
  path: "/trabajo",
  keywords: [
    "trabajo suiza hispanohablantes", "ofertas empleo suiza espanol",
    "buscar trabajo suiza", "empleo suiza español", "trabajo suiza linkedin",
    "trabajar suiza desde españa", "trabajo suiza latinoamericano",
  ],
});

export default function TrabajoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
