"use client";

import { useState, useEffect, useCallback } from "react";

interface EmailCapturePopupProps {
  /**
   * Delay in seconds before showing the popup
   * @default 30
   */
  delaySeconds?: number;

  /**
   * Scroll percentage (0-100) to trigger the popup
   * @default 50
   */
  scrollPercentage?: number;

  /**
   * Enable exit-intent detection (mouse leaving viewport)
   * @default true
   */
  exitIntent?: boolean;

  /**
   * Cookie/localStorage expiry in days
   * @default 7
   */
  cookieExpiryDays?: number;
}

type PopupState = "idle" | "loading" | "success" | "error";

export default function EmailCapturePopup({
  delaySeconds = 30,
  scrollPercentage = 50,
  exitIntent = true,
  cookieExpiryDays = 7,
}: EmailCapturePopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [state, setState] = useState<PopupState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Check if user has already interacted with the popup
  const hasInteracted = useCallback(() => {
    if (typeof window === "undefined") return true;

    const stored = localStorage.getItem("emailPopupDismissed");
    if (!stored) return false;

    const { timestamp } = JSON.parse(stored);
    const expiryMs = cookieExpiryDays * 24 * 60 * 60 * 1000;
    return Date.now() - timestamp < expiryMs;
  }, [cookieExpiryDays]);

  // Mark popup as dismissed
  const markDismissed = useCallback(() => {
    localStorage.setItem(
      "emailPopupDismissed",
      JSON.stringify({ timestamp: Date.now() })
    );
  }, []);

  // Show popup
  const showPopup = useCallback(() => {
    if (!hasInteracted() && !isVisible) {
      setIsVisible(true);
    }
  }, [hasInteracted, isVisible]);

  // Hide popup
  const hidePopup = useCallback(() => {
    setIsVisible(false);
    markDismissed();
  }, [markDismissed]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVisible) {
        hidePopup();
      }
    };

    if (isVisible) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent scroll
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isVisible, hidePopup]);

  // Time-based trigger
  useEffect(() => {
    if (hasInteracted()) return;

    const timer = setTimeout(() => {
      showPopup();
    }, delaySeconds * 1000);

    return () => clearTimeout(timer);
  }, [delaySeconds, hasInteracted, showPopup]);

  // Scroll-based trigger
  useEffect(() => {
    if (hasInteracted()) return;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrolled / height) * 100;

      if (scrollPercent >= scrollPercentage) {
        showPopup();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollPercentage, hasInteracted, showPopup]);

  // Exit-intent trigger
  useEffect(() => {
    if (!exitIntent || hasInteracted()) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse leaves from the top
      if (e.clientY <= 0) {
        showPopup();
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [exitIntent, hasInteracted, showPopup]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setErrorMessage("Por favor, ingresa tu email");
      return;
    }

    setState("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          nombre: nombre.trim(),
          origen: "popup",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al suscribirse");
      }

      setState("success");
      markDismissed();

      // Auto-close after success
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    } catch (error) {
      setState("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Error al suscribirse"
      );
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in duration-300"
        onClick={hidePopup}
        aria-hidden="true"
      />

      {/* Popup */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
      >
        <div
          className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full animate-in zoom-in-95 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={hidePopup}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Cerrar"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="p-8">
            {state === "success" ? (
              // Success state
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  ¡Gracias por suscribirte!
                </h3>
                <p className="text-gray-600">
                  Revisa tu email para confirmar tu suscripción.
                </p>
              </div>
            ) : (
              // Form state
              <>
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">🇨🇭</div>
                  <h2
                    id="popup-title"
                    className="text-2xl font-bold text-gray-900 mb-2"
                  >
                    ¿Pensando en Suiza?
                  </h2>
                  <p className="text-gray-600">
                    Recibe guías prácticas, herramientas y consejos cada semana.
                    <strong> 100% gratis.</strong>
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="popup-nombre" className="sr-only">
                      Nombre
                    </label>
                    <input
                      id="popup-nombre"
                      type="text"
                      placeholder="Tu nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                      disabled={state === "loading"}
                    />
                  </div>

                  <div>
                    <label htmlFor="popup-email" className="sr-only">
                      Email
                    </label>
                    <input
                      id="popup-email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                      disabled={state === "loading"}
                    />
                  </div>

                  {errorMessage && (
                    <div className="text-sm text-red-600 text-center">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={state === "loading"}
                    className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
                  >
                    {state === "loading" ? "Enviando..." : "Suscribirme gratis"}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    Sin spam. Cancela cuando quieras.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
