import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Calculadora de seguros médicos en Suiza — KVG y suplementarios",
  description: "Calcula el coste de tu seguro médico obligatorio (KVG/LAMal) en Suiza por cantón, edad y franquicia. Compara aseguradoras y ahorra hasta 1.200 CHF al año.",
  path: "/seguros",
  keywords: [
    "seguro medico suiza calculadora", "kvg suiza precio", "lamal suiza coste",
    "comparar seguros suiza", "seguro salud suiza extranjero",
    "cuanto cuesta seguro medico suiza", "krankenversicherung suiza",
  ],
});

export default function SegurosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
