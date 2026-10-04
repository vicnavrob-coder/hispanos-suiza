"use client";
import {
  createContext, useContext, useState, useEffect, useCallback, type ReactNode,
} from "react";
import {
  getUser, saveUser, clearUser, register, login, loginWithGoogle,
  decodeGoogleJwt, type AuthUser,
} from "@/lib/auth";

type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
  showModal: boolean;
  openModal: (onSuccess?: () => void) => void;
  closeModal: () => void;
  logout: () => void;
  registerUser: (email: string, password: string, nombre: string, pais?: string) => { ok: boolean; error?: string };
  loginUser: (email: string, password: string) => { ok: boolean; error?: string };
  loginUserWithGoogle: (credential: string) => { ok: boolean; error?: string };
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [pendingCallback, setPendingCallback] = useState<(() => void) | null>(null);

  useEffect(() => {
    setUser(getUser());
    setLoading(false);
  }, []);

  const openModal = useCallback((onSuccess?: () => void) => {
    setPendingCallback(onSuccess ? () => onSuccess : null);
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setPendingCallback(null);
  }, []);

  const logout = useCallback(() => {
    clearUser();
    setUser(null);
  }, []);

  const registerUser = useCallback(
    (email: string, password: string, nombre: string, pais = "") => {
      const result = register(email, password, nombre, pais);
      if (result.ok) {
        setUser(getUser());
        setShowModal(false);
        pendingCallback?.();
        setPendingCallback(null);
        // Capturar en Brevo (fire-and-forget, no bloquea la UX)
        fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, nombre, pais, provider: "email" }),
        }).catch(() => {});
      }
      return result;
    },
    [pendingCallback]
  );

  const loginUser = useCallback(
    (email: string, password: string) => {
      const result = login(email, password);
      if (result.ok) {
        setUser(getUser());
        setShowModal(false);
        pendingCallback?.();
        setPendingCallback(null);
      }
      return result;
    },
    [pendingCallback]
  );

  const loginUserWithGoogle = useCallback(
    (credential: string) => {
      const profile = decodeGoogleJwt(credential);
      if (!profile) return { ok: false, error: "No se pudo procesar la cuenta de Google." };
      const result = loginWithGoogle(profile);
      if (result.ok) {
        setUser(getUser());
        setShowModal(false);
        pendingCallback?.();
        setPendingCallback(null);
        // Capturar en Brevo (fire-and-forget)
        fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: profile.email, nombre: profile.name, pais: "", provider: "google" }),
        }).catch(() => {});
      }
      return result;
    },
    [pendingCallback]
  );

  return (
    <AuthContext.Provider
      value={{
        user, loading, showModal,
        openModal, closeModal, logout,
        registerUser, loginUser, loginUserWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
