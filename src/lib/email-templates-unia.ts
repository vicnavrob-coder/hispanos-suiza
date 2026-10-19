/**
 * Email templates for UNIA appointment system.
 * Four emails for the automated flow:
 * 1. Solicitud a UNIA (con enlace para proponer horarios)
 * 2. Horarios propuestos al usuario (con enlace para elegir)
 * 3. Confirmación a ambas partes
 * 4. Confirmación original al usuario (recibo de solicitud)
 */

import type { HorariosPropuestos, CitaFormato } from "./unia-citas";

const SITE = "https://hispanosensuiza.ch";
const BRAND_COLOR = "#C8102E";

function layout(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:20px 0">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;max-width:600px;width:100%">
  <tr><td style="background:${BRAND_COLOR};padding:24px 30px">
    <a href="${SITE}" style="color:#fff;font-size:20px;font-weight:700;text-decoration:none">🇨🇭 HispanosEnSuiza</a>
  </td></tr>
  <tr><td style="padding:30px">
    <h1 style="margin:0 0 16px;font-size:22px;color:#1a1a2e">${title}</h1>
    ${body}
  </td></tr>
  <tr><td style="background:#f8fafc;padding:20px 30px;font-size:12px;color:#94a3b8;text-align:center">
    <a href="${SITE}" style="color:${BRAND_COLOR};text-decoration:none">hispanosensuiza.ch</a> · La guía real para hispanohablantes en Suiza
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}

function p(text: string): string {
  return `<p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:#374151">${text}</p>`;
}

function field(label: string, value: string): string {
  return `<tr>
    <td style="padding:10px 14px;border-bottom:1px solid #f3f4f6;font-weight:600;color:#374151;width:140px;vertical-align:top">${label}</td>
    <td style="padding:10px 14px;border-bottom:1px solid #f3f4f6;color:#374151">${value}</td>
  </tr>`;
}

function cta(text: string, url: string): string {
  return `<a href="${url}" style="display:inline-block;background:${BRAND_COLOR};color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px;margin:8px 0">${text}</a>`;
}

/** Escape HTML special characters */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/** Format datetime for display */
function formatDateTime(isoString: string): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Zurich",
    });
  } catch {
    return isoString;
  }
}

const formatoLabels: Record<CitaFormato, string> = {
  videollamada: "Videollamada (Zoom, Meet, etc.)",
  telefono: "Llamada telefónica",
  presencial: "Presencial en oficina UNIA",
};

// ═══════════════════════════════════════════════════════════════════════════
// 1. EMAIL A UNIA: Nueva solicitud con enlace para proponer horarios
// ═══════════════════════════════════════════════════════════════════════════

export interface SolicitudUniaData {
  userName: string;
  userEmail: string;
  userPais: string;
  userTelefono?: string;
  userMensaje?: string;
  token: string;
}

export function emailSolicitudUnia(data: SolicitudUniaData): string {
  const proponerUrl = `${SITE}/unia/proponer/${data.token}`;

  return layout("Nueva solicitud de cita UNIA", [
    p("Se ha recibido una nueva solicitud de cita a través de <strong>HispanosEnSuiza</strong>:"),
    `<table style="width:100%;border:1px solid #e5e7eb;border-radius:8px;margin:16px 0;border-collapse:collapse;overflow:hidden">
      ${field("Nombre", escapeHtml(data.userName))}
      ${field("Email", `<a href="mailto:${data.userEmail}" style="color:${BRAND_COLOR}">${data.userEmail}</a>`)}
      ${field("País de origen", data.userPais || "No especificado")}
      ${data.userTelefono ? field("Teléfono", data.userTelefono) : ""}
    </table>`,
    data.userMensaje ? `<div style="background:#f8fafc;border-radius:8px;padding:16px;margin:16px 0;border-left:4px solid #94a3b8">
      <strong style="color:#374151;font-size:14px">Mensaje del usuario:</strong>
      <p style="margin:8px 0 0;color:#374151;font-size:14px">${escapeHtml(data.userMensaje)}</p>
    </div>` : "",
    p("<strong>Para programar la cita, haz clic en el siguiente enlace y propón 2-3 horarios disponibles:</strong>"),
    `<div style="text-align:center;margin:24px 0">
      ${cta("Proponer horarios →", proponerUrl)}
    </div>`,
    p("El usuario recibirá automáticamente un email para elegir uno de los horarios propuestos."),
  ].join(""));
}

// ═══════════════════════════════════════════════════════════════════════════
// 2. EMAIL AL USUARIO: UNIA ha propuesto horarios, elige uno
// ═══════════════════════════════════════════════════════════════════════════

export interface HorariosUsuarioData {
  userName: string;
  horarios: HorariosPropuestos;
  formato: CitaFormato;
  token: string;
}

export function emailHorariosUsuario(data: HorariosUsuarioData): string {
  const elegirUrl = `${SITE}/unia/elegir/${data.token}`;

  const horariosHtml = [
    `<div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:14px;margin:6px 0">
      <strong style="color:#166534">Opción 1:</strong> ${formatDateTime(data.horarios.opcion1)}
    </div>`,
    `<div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:14px;margin:6px 0">
      <strong style="color:#166534">Opción 2:</strong> ${formatDateTime(data.horarios.opcion2)}
    </div>`,
    data.horarios.opcion3 ? `<div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:14px;margin:6px 0">
      <strong style="color:#166534">Opción 3:</strong> ${formatDateTime(data.horarios.opcion3)}
    </div>` : "",
  ].join("");

  return layout("UNIA te propone horarios para tu cita", [
    p(`Hola ${data.userName},`),
    p("La UNIA ha revisado tu solicitud y te propone los siguientes horarios para tu cita:"),
    horariosHtml,
    `<div style="background:#fef3c7;border-radius:8px;padding:14px;margin:16px 0;border-left:4px solid #f59e0b">
      <p style="margin:0;font-size:14px;color:#92400e">
        <strong>Formato:</strong> ${formatoLabels[data.formato]}
      </p>
    </div>`,
    p("<strong>Haz clic en el siguiente enlace para elegir el horario que mejor te convenga:</strong>"),
    `<div style="text-align:center;margin:24px 0">
      ${cta("Elegir horario →", elegirUrl)}
    </div>`,
    p("Una vez elijas, recibirás la confirmación definitiva de tu cita."),
    p("Un saludo,<br><strong>El equipo de HispanosEnSuiza</strong>"),
  ].join(""));
}

// ═══════════════════════════════════════════════════════════════════════════
// 3. EMAIL DE CONFIRMACIÓN: Para ambas partes
// ═══════════════════════════════════════════════════════════════════════════

export interface ConfirmacionData {
  userName: string;
  userEmail: string;
  userTelefono?: string;
  horarioConfirmado: string;
  formato: CitaFormato;
}

export function emailConfirmacionUsuario(data: ConfirmacionData): string {
  return layout("¡Tu cita con UNIA está confirmada!", [
    p(`Hola ${data.userName},`),
    p("Tu cita con la UNIA ha sido confirmada. Aquí tienes los detalles:"),
    `<div style="background:#dcfce7;border-radius:12px;padding:20px;margin:20px 0;border:2px solid #86efac">
      <div style="text-align:center">
        <div style="font-size:32px;margin-bottom:8px">✅</div>
        <div style="font-size:18px;font-weight:700;color:#166534;margin-bottom:12px">Cita Confirmada</div>
        <div style="font-size:16px;color:#374151;margin-bottom:8px">
          <strong>Fecha y hora:</strong><br>${formatDateTime(data.horarioConfirmado)}
        </div>
        <div style="font-size:14px;color:#6b7280">
          <strong>Formato:</strong> ${formatoLabels[data.formato]}
        </div>
      </div>
    </div>`,
    p("<strong>Prepara para la cita:</strong>"),
    `<ul style="margin:14px 0;padding-left:20px;font-size:15px;line-height:1.8;color:#374151">
      <li>Tu contrato de trabajo (si aplica)</li>
      <li>Nóminas recientes</li>
      <li>Documentación relevante a tu consulta</li>
      <li>Tu número de AHV/AVS (seguridad social suiza)</li>
    </ul>`,
    data.formato === "videollamada" ? p("Recibirás el enlace de la videollamada por email antes de la cita.") : "",
    data.formato === "telefono" ? p(`Te llamarán al número ${data.userTelefono || "que proporcionaste"} a la hora indicada.`) : "",
    p("Si necesitas cambiar o cancelar la cita, responde a este email con antelación."),
    p("¡Mucho éxito!<br><strong>El equipo de HispanosEnSuiza</strong>"),
  ].join(""));
}

export function emailConfirmacionUnia(data: ConfirmacionData): string {
  return layout("Cita UNIA confirmada", [
    p("El usuario ha confirmado la cita. Aquí tienes los detalles:"),
    `<table style="width:100%;border:1px solid #e5e7eb;border-radius:8px;margin:16px 0;border-collapse:collapse;overflow:hidden">
      ${field("Usuario", escapeHtml(data.userName))}
      ${field("Email", `<a href="mailto:${data.userEmail}" style="color:${BRAND_COLOR}">${data.userEmail}</a>`)}
      ${data.userTelefono ? field("Teléfono", data.userTelefono) : ""}
      ${field("Fecha y hora", formatDateTime(data.horarioConfirmado))}
      ${field("Formato", formatoLabels[data.formato])}
    </table>`,
    p("El usuario ha sido notificado con la confirmación."),
  ].join(""));
}

// ═══════════════════════════════════════════════════════════════════════════
// 4. EMAIL RECIBO: Confirmación inicial de solicitud al usuario
// ═══════════════════════════════════════════════════════════════════════════

export function emailReciboSolicitud(nombre: string): string {
  return layout("Tu solicitud de cita con UNIA ha sido recibida", [
    p(`Hola${nombre ? ` ${nombre}` : ""},`),
    p("Hemos recibido tu solicitud de cita con la <strong>UNIA</strong>. En breve recibirás un email con las opciones de horario disponibles."),
    `<div style="background:#dbeafe;border-radius:8px;padding:16px;margin:16px 0;border-left:4px solid #3b82f6">
      <p style="margin:0;font-size:14px;color:#1e40af">
        <strong>¿Qué pasará ahora?</strong><br>
        1. UNIA revisará tu solicitud<br>
        2. Te enviaremos un email con 2-3 horarios disponibles<br>
        3. Eliges el que mejor te convenga<br>
        4. ¡Cita confirmada!
      </p>
    </div>`,
    p("Si tienes alguna pregunta urgente, puedes responder a este email."),
    p("Un saludo,<br><strong>El equipo de HispanosEnSuiza</strong>"),
  ].join(""));
}
