/**
 * UNIA appointment storage backed by a private GitHub Gist.
 * Follows the same pattern as subscribers.ts.
 * Works on Vercel serverless — no filesystem writes.
 */

import crypto from "crypto";

// Use the same Gist as subscribers, different file
const GIST_ID = "7313e3a55b8f6b3c74d19427fb1f30a2";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? "";
const FILE_NAME = "unia-citas.json";

export type CitaStatus = "solicitud" | "propuesta" | "confirmada" | "completada" | "cancelada";
export type CitaFormato = "videollamada" | "telefono" | "presencial";

export interface HorariosPropuestos {
  opcion1: string;  // ISO datetime
  opcion2: string;
  opcion3?: string;
}

export interface UniaCita {
  id: string;
  token: string;                    // Token único para enlaces
  // Datos del usuario
  userEmail: string;
  userName: string;
  userPais: string;
  userTelefono?: string;
  userMensaje?: string;             // Mensaje opcional del usuario
  // Estado y flujo
  status: CitaStatus;
  // Horarios propuestos por UNIA
  horariosPropuestos?: HorariosPropuestos;
  formato?: CitaFormato;
  // Horario confirmado
  horarioConfirmado?: string;
  // Timestamps
  createdAt: string;
  propuestaAt?: string;
  confirmadaAt?: string;
}

/** Generate a secure random token for appointment links */
export function generateToken(): string {
  return crypto.randomBytes(24).toString("base64url");
}

/**
 * Read all appointments from the Gist.
 * Returns null on error (NOT empty array) so callers can distinguish
 * "no appointments" from "read failed".
 */
export async function getCitas(): Promise<UniaCita[] | null> {
  if (!GITHUB_TOKEN || !GIST_ID) {
    console.error("[unia-citas] GITHUB_TOKEN or UNIA_CITAS_GIST_ID not set");
    return null;
  }

  try {
    const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("[unia-citas] Failed to read gist:", res.status);
      return null;
    }

    const gist = await res.json();
    const content = gist.files?.[FILE_NAME]?.content ?? "[]";
    return JSON.parse(content) as UniaCita[];
  } catch (e) {
    console.error("[unia-citas] Gist read error:", e);
    return null;
  }
}

/** Write all appointments back to the Gist */
export async function saveCitas(citas: UniaCita[]): Promise<boolean> {
  if (!GITHUB_TOKEN || !GIST_ID) return false;

  try {
    const res = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      method: "PATCH",
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3+json",
      },
      body: JSON.stringify({
        files: {
          [FILE_NAME]: {
            content: JSON.stringify(citas, null, 2),
          },
        },
      }),
    });

    if (!res.ok) {
      console.error("[unia-citas] Failed to save gist:", res.status);
      return false;
    }
    return true;
  } catch (e) {
    console.error("[unia-citas] Gist write error:", e);
    return false;
  }
}

/** Find a single appointment by its token */
export async function getCitaByToken(token: string): Promise<UniaCita | null> {
  const citas = await getCitas();
  if (!citas) return null;
  return citas.find((c) => c.token === token) ?? null;
}

/** Find a single appointment by its ID */
export async function getCitaById(id: string): Promise<UniaCita | null> {
  const citas = await getCitas();
  if (!citas) return null;
  return citas.find((c) => c.id === id) ?? null;
}

export interface AddCitaInput {
  userEmail: string;
  userName: string;
  userPais: string;
  userTelefono?: string;
  userMensaje?: string;
}

/**
 * Add a new appointment request.
 * Returns { ok: false } if Gist read fails — NEVER overwrites existing data.
 */
export async function addUniaCita(data: AddCitaInput): Promise<{ ok: boolean; id?: string; token?: string }> {
  const citas = await getCitas();

  // If read failed, refuse to write (would destroy existing data)
  if (citas === null) {
    return { ok: false };
  }

  const token = generateToken();
  const newCita: UniaCita = {
    id: `cita_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
    token,
    userEmail: data.userEmail,
    userName: data.userName,
    userPais: data.userPais,
    userTelefono: data.userTelefono,
    userMensaje: data.userMensaje,
    status: "solicitud",
    createdAt: new Date().toISOString(),
  };

  citas.push(newCita);
  const saved = await saveCitas(citas);

  if (saved) {
    console.log(`[unia-citas] New appointment: ${newCita.id} from ${data.userEmail}`);
  }

  return { ok: saved, id: saved ? newCita.id : undefined, token: saved ? token : undefined };
}

export interface UpdateCitaInput {
  status?: CitaStatus;
  horariosPropuestos?: HorariosPropuestos;
  formato?: CitaFormato;
  horarioConfirmado?: string;
  propuestaAt?: string;
  confirmadaAt?: string;
}

/**
 * Update an existing appointment by token.
 * Re-reads from Gist to avoid overwriting concurrent changes.
 */
export async function updateCitaByToken(token: string, updates: UpdateCitaInput): Promise<boolean> {
  const citas = await getCitas();
  if (citas === null) return false;

  const cita = citas.find((c) => c.token === token);
  if (!cita) return false;

  // Apply updates
  if (updates.status !== undefined) cita.status = updates.status;
  if (updates.horariosPropuestos !== undefined) cita.horariosPropuestos = updates.horariosPropuestos;
  if (updates.formato !== undefined) cita.formato = updates.formato;
  if (updates.horarioConfirmado !== undefined) cita.horarioConfirmado = updates.horarioConfirmado;
  if (updates.propuestaAt !== undefined) cita.propuestaAt = updates.propuestaAt;
  if (updates.confirmadaAt !== undefined) cita.confirmadaAt = updates.confirmadaAt;

  return saveCitas(citas);
}

/**
 * Update an existing appointment by ID.
 */
export async function updateCitaById(id: string, updates: UpdateCitaInput): Promise<boolean> {
  const citas = await getCitas();
  if (citas === null) return false;

  const cita = citas.find((c) => c.id === id);
  if (!cita) return false;

  // Apply updates
  if (updates.status !== undefined) cita.status = updates.status;
  if (updates.horariosPropuestos !== undefined) cita.horariosPropuestos = updates.horariosPropuestos;
  if (updates.formato !== undefined) cita.formato = updates.formato;
  if (updates.horarioConfirmado !== undefined) cita.horarioConfirmado = updates.horarioConfirmado;
  if (updates.propuestaAt !== undefined) cita.propuestaAt = updates.propuestaAt;
  if (updates.confirmadaAt !== undefined) cita.confirmadaAt = updates.confirmadaAt;

  return saveCitas(citas);
}
