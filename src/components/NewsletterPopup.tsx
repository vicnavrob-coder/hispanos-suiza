"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check if user already saw popup
    const hasSeenPopup = localStorage.getItem("newsletter-popup-seen");
    const lastShown = localStorage.getItem("newsletter-popup-last-shown");

    // Don't show if:
    // 1. User already subscribed
    // 2. User saw popup in last 7 days
    if (hasSeenPopup === "subscribed") {
      return;
    }

    if (lastShown) {
      const daysSince = (Date.now() - parseInt(lastShown)) / (1000 * 60 * 60 * 24);
      if (daysSince < 7) {
        return;
      }
    }

    // Trigger popup after 30 seconds
    const timeoutId = setTimeout(() => {
      setIsOpen(true);
      localStorage.setItem("newsletter-popup-last-shown", Date.now().toString());
    }, 30000); // 30 seconds

    // Trigger on scroll (50% of page)
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 50 && !isOpen) {
        setIsOpen(true);
        localStorage.setItem("newsletter-popup-last-shown", Date.now().toString());
        window.removeEventListener("scroll", handleScroll);
      }
    };

    // Trigger on exit intent (mouse leaves viewport)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !isOpen) {
        setIsOpen(true);
        localStorage.setItem("newsletter-popup-last-shown", Date.now().toString());
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    // Track dismissal
    if (typeof window !== "undefined" && (window as any).plausible) {
      (window as any).plausible("Newsletter Popup Dismissed");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !nombre) {
      setStatus("error");
      setMessage("Por favor completa todos los campos");
      return;
    }

    setLoading(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          nombre: nombre.trim(),
          source: "popup-website",
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("¡Gracias! Revisa tu email para confirmar.");
        setEmail("");
        setNombre("");

        // Mark as subscribed
        localStorage.setItem("newsletter-popup-seen", "subscribed");

        // Track conversion
        if (typeof window !== "undefined" && (window as any).plausible) {
          (window as any).plausible("Newsletter Signup", {
            props: { source: "popup-website" },
          });
        }

        // Close popup after 3 seconds
        setTimeout(() => {
          setIsOpen(false);
        }, 3000);
      } else {
        setStatus("error");
        setMessage(data.error || "Error al suscribirte.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Error de conexión.");
      console.error("Newsletter popup error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Popup */}
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform">
        <div className="relative mx-4 overflow-hidden rounded-2xl bg-white shadow-2xl">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 z-10 rounded-full bg-gray-100 p-2 text-gray-600 transition hover:bg-gray-200 hover:text-gray-900"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>

          {/* Content */}
          <div className="p-8">
            {/* Icon */}
            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-100 to-red-200 text-3xl">
                📧
              </div>
            </div>

            {/* Title */}
            <h2 className="mb-2 text-center text-2xl font-bold text-gray-900">
              ¡Espera! No te vayas sin esto
            </h2>

            {/* Subtitle */}
            <p className="mb-6 text-center text-gray-600">
              Recibe cada jueves las mejores ofertas de trabajo en Suiza,
              historias reales y guías prácticas. Gratis.
            </p>

            {/* Benefits */}
            <div className="mb-6 space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="mt-0.5 text-green-600">✓</span>
                <span className="text-gray-700">
                  Top 3 empleos con salarios reales
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-0.5 text-green-600">✓</span>
                <span className="text-gray-700">
                  Historias de hispanohablantes en Suiza
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-0.5 text-green-600">✓</span>
                <span className="text-gray-700">
                  Herramientas y calculadoras gratis
                </span>
              </div>
            </div>

            {/* Form */}
            {status !== "success" ? (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Tu nombre"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                  disabled={loading}
                  required
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                  disabled={loading}
                  required
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-red-700 px-6 py-3 font-bold text-white shadow-lg transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Suscribiendo..." : "🎁 Suscribirme Gratis"}
                </button>

                {status === "error" && (
                  <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-xs text-red-800">
                    {message}
                  </div>
                )}

                <p className="text-center text-xs text-gray-500">
                  Sin spam. Cancelar cuando quieras.
                </p>
              </form>
            ) : (
              <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-center">
                <div className="mb-2 text-3xl">✅</div>
                <div className="font-bold text-green-900">
                  ¡Suscripción exitosa!
                </div>
                <div className="text-sm text-green-700">{message}</div>
              </div>
            )}

            {/* Social Proof */}
            <div className="mt-4 text-center">
              <span className="text-xs text-gray-500">
                +50 hispanohablantes ya suscritos
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
