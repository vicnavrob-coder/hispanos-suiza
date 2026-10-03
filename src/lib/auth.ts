export type AuthUser = {
  email: string;
  nombre: string;
  pais: string;
  createdAt: string;
  provider?: "email" | "google";
  picture?: string;
};

const KEY = "hs_user";
const ACCOUNTS_KEY = "hs_accounts";

export function getUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch { return null; }
}

export function saveUser(user: AuthUser): void {
  localStorage.setItem(KEY, JSON.stringify(user));
}

export function clearUser(): void {
  localStorage.removeItem(KEY);
}

type Account = {
  email: string;
  passwordHash: string;
  nombre: string;
  pais: string;
  provider: "email" | "google";
};

function getAccounts(): Account[] {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    return raw ? (JSON.parse(raw) as Account[]) : [];
  } catch { return []; }
}

function hashPassword(pw: string): string {
  let h = 5381;
  for (let i = 0; i < pw.length; i++) h = ((h << 5) + h) ^ pw.charCodeAt(i);
  return (h >>> 0).toString(36);
}

export function register(
  email: string,
  password: string,
  nombre: string,
  pais = ""
): { ok: boolean; error?: string } {
  const accounts = getAccounts();
  if (accounts.find((a) => a.email.toLowerCase() === email.toLowerCase())) {
    return { ok: false, error: "Este email ya tiene una cuenta. Inicia sesión." };
  }
  const account: Account = {
    email: email.toLowerCase(),
    passwordHash: hashPassword(password),
    nombre,
    pais,
    provider: "email",
  };
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, account]));
  const user: AuthUser = {
    email: email.toLowerCase(),
    nombre,
    pais,
    createdAt: new Date().toISOString(),
    provider: "email",
  };
  saveUser(user);
  return { ok: true };
}

export function login(
  email: string,
  password: string
): { ok: boolean; error?: string } {
  const accounts = getAccounts();
  const account = accounts.find((a) => a.email === email.toLowerCase());
  if (!account) return { ok: false, error: "No encontramos ninguna cuenta con ese email." };
  if (account.provider === "google") {
    return { ok: false, error: "Esta cuenta se creó con Google. Usa el botón 'Continuar con Google'." };
  }
  if (account.passwordHash !== hashPassword(password)) {
    return { ok: false, error: "Contraseña incorrecta." };
  }
  const user: AuthUser = {
    email: account.email,
    nombre: account.nombre,
    pais: account.pais,
    createdAt: "",
    provider: "email",
  };
  saveUser(user);
  return { ok: true };
}

export function loginWithGoogle(googleUser: {
  email: string;
  name: string;
  picture?: string;
}): { ok: boolean; error?: string } {
  const accounts = getAccounts();
  const existing = accounts.find(
    (a) => a.email.toLowerCase() === googleUser.email.toLowerCase()
  );

  if (!existing) {
    const account: Account = {
      email: googleUser.email.toLowerCase(),
      passwordHash: "__google__",
      nombre: googleUser.name,
      pais: "",
      provider: "google",
    };
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, account]));
  }

  const user: AuthUser = {
    email: googleUser.email.toLowerCase(),
    nombre: existing?.nombre ?? googleUser.name,
    pais: existing?.pais ?? "",
    createdAt: new Date().toISOString(),
    provider: "google",
    picture: googleUser.picture,
  };
  saveUser(user);
  return { ok: true };
}

/** Decodifica el payload de un JWT de Google sin verificarlo (uso solo cliente) */
export function decodeGoogleJwt(token: string): {
  email: string;
  name: string;
  picture?: string;
} | null {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
    );
    return { email: decoded.email, name: decoded.name, picture: decoded.picture };
  } catch { return null; }
}

/**
 * Genera un JWT falso con la misma estructura que Google para poder
 * probar el flujo completo sin Client ID configurado.
 * SOLO usar en desarrollo / tests.
 */
export function createMockGoogleCredential(
  name = "Usuario Prueba",
  email = "prueba@gmail.com",
  picture = ""
): string {
  const header = btoa(JSON.stringify({ alg: "RS256", typ: "JWT" }))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  const payload = btoa(JSON.stringify({
    iss: "accounts.google.com",
    sub: "000000000000000000000",
    email,
    name,
    picture: picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=C8102E&color=fff&size=96`,
    email_verified: true,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600,
  })).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  return `${header}.${payload}.mock_signature`;
}
