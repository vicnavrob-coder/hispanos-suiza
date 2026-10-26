"use client";

import { useState, useEffect } from "react";

interface JoseContactButtonProps {
  source: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Button that captures user info before redirecting to José's calendar.
 * Saves data to localStorage so we don't ask twice.
 */
export function JoseContactButton({
  source,
  className,
  children,
}: JoseContactButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [savedData, setSavedData] = useState<{
    email: string;
    name: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("jose_contact_data");
    if (stored) {
      try {
        setSavedData(JSON.parse(stored));
      } catch {
        // Ignore invalid data
      }
    }
  }, []);

  const redirectUrl = `/api/seguros/jose-clic?source=${source}&email=${encodeURIComponent(
    savedData?.email || email
  )}&name=${encodeURIComponent(savedData?.name || name)}`;

  const handleClick = () => {
    // If we already have data, redirect directly
    if (savedData) {
      window.location.href = redirectUrl;
      return;
    }
    // Otherwise show modal
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    // Save to localStorage
    const data = { email, name };
    localStorage.setItem("jose_contact_data", JSON.stringify(data));

    // Redirect
    const url = `/api/seguros/jose-clic?source=${source}&email=${encodeURIComponent(
      email
    )}&name=${encodeURIComponent(name)}`;
    window.location.href = url;
  };

  return (
    <>
      <button onClick={handleClick} className={className}>
        {children}
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Reserva tu cita con José
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Déjanos tu email para que José pueda contactarte si es necesario.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label
                  htmlFor="jose-name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nombre (opcional)
                </label>
                <input
                  id="jose-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label
                  htmlFor="jose-email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email *
                </label>
                <input
                  id="jose-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading || !email}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                >
                  {loading ? "Abriendo..." : "Continuar"}
                </button>
              </div>
            </form>

            <p className="text-xs text-gray-500 mt-4 text-center">
              Solo usamos tu email para que José pueda contactarte. No spam.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
