// Client-safe: no server-side imports, no secret keys
export const PLANS = {
  premium: {
    name: "Premium",
    price_chf: 9,
    features: [
      "Calculadora de salario neto ilimitada",
      "Comparador completo de 11 ciudades",
      "Buscador de empleo con filtros avanzados",
      "Guías PDF descargables",
      "Citas con UNIA (asesoría laboral)",
      "Soporte prioritario por email",
      "Sin anuncios ni límites",
    ],
    highlight: "Ahorra +100 CHF/año en decisiones mejor informadas",
  },
} as const;

export type PlanKey = keyof typeof PLANS;
