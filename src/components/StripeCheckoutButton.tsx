"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface StripeCheckoutButtonProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export default function StripeCheckoutButton({ className, style, children }: StripeCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleCheckout = async () => {
    setLoading(true);

    try {
      // Crear sesión de checkout
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user?.email || "",
          nombre: user?.nombre || "",
        }),
      });

      if (!response.ok) {
        throw new Error("Error al crear sesión de pago");
      }

      const { url } = await response.json();

      // Redirigir a Stripe Checkout
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al procesar el pago. Por favor, intenta de nuevo.");
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={className}
      style={{
        ...style,
        opacity: loading ? 0.6 : 1,
        cursor: loading ? "not-allowed" : "pointer",
      }}
    >
      {loading ? "Procesando..." : children}
    </button>
  );
}
