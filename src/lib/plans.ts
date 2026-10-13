// Client-safe: no server-side imports, no secret keys
export const PLANS = {
  premium: {
    name: "Premium",
    price_chf: 9,
    features: [
      "Acceso completo a todas las herramientas",
      "Guías PDF descargables",
      "Calculadora de salario neto CHF",
      "Comparador de ciudades completo",
      "Buscador de empleo con filtros avanzados",
      "Soporte prioritario por email",
      "Sin anuncios",
    ],
  },
} as const;

export type PlanKey = keyof typeof PLANS;
