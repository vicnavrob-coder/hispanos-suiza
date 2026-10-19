"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const params = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    const sessionId = params.get("session_id");
    if (sessionId) {
      // Clear subscription cache so next check is fresh
      const keys = Object.keys(localStorage).filter(k => k.startsWith("hs_sub_"));
      keys.forEach(k => localStorage.removeItem(k));
    }
  }, [params]);

  return (
    <main className="min-h-screen bg-[#F8F6F3] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-[#1a1a2e] mb-3" style={{ fontFamily: "Playfair Display, serif" }}>
          ¡Bienvenido a Premium!
        </h1>
        <p className="text-gray-600 mb-8">
          Tu suscripción está activa. Ya tienes acceso completo a todas las herramientas y guías.
        </p>
        <div className="space-y-3">
          <button
            onClick={() => router.push("/herramientas")}
            className="w-full py-3 px-6 bg-[#C8102E] text-white font-semibold rounded-xl hover:bg-[#a50d26] transition-colors"
          >
            Explorar herramientas
          </button>
          <button
            onClick={() => router.push("/")}
            className="w-full py-3 px-6 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Ir al inicio
          </button>
        </div>
      </div>
    </main>
  );
}

export default function ExitoPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
