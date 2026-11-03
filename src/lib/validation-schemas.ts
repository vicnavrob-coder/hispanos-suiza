/**
 * Schemas de validación con Zod
 * Centraliza toda la validación de inputs del API
 */

import { z } from 'zod';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Historias Comunidad
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const CreateHistoriaSchema = z.object({
  autorEmail: z.string().email('Email inválido').min(1, 'Email requerido'),
  autorNombre: z.string().min(2, 'Nombre debe tener al menos 2 caracteres').max(100, 'Nombre demasiado largo'),
  autorPais: z.string().optional(),
  autorAvatar: z.string().url('Avatar debe ser una URL válida').optional().or(z.literal('')),
  titulo: z.string()
    .min(10, 'El título debe tener al menos 10 caracteres')
    .max(200, 'El título no puede exceder 200 caracteres')
    .transform((val) => val.trim()),
  contenido: z.string()
    .min(100, 'El contenido debe tener al menos 100 caracteres')
    .max(10000, 'El contenido no puede exceder 10,000 caracteres')
    .transform((val) => val.trim()),
  ciudadSuiza: z.string().optional(),
  tema: z.enum(['llegada', 'trabajo', 'vivienda', 'salud', 'educacion', 'cultura', 'otro']).optional(),
});

export type CreateHistoriaInput = z.infer<typeof CreateHistoriaSchema>;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CV Translator
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const CVUploadSchema = z.object({
  email: z.string().email('Email inválido').min(1, 'Email requerido'),
});

export const CVCheckSchema = z.object({
  email: z.string().email('Email inválido').min(1, 'Email requerido'),
});

export const CVQueueStatusSchema = z.object({
  id: z.string().min(1, 'Queue ID requerido'),
});

export type CVUploadInput = z.infer<typeof CVUploadSchema>;
export type CVCheckInput = z.infer<typeof CVCheckSchema>;
export type CVQueueStatusInput = z.infer<typeof CVQueueStatusSchema>;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Newsletter / Subscribers
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const SubscriberSchema = z.object({
  email: z.string().email('Email inválido'),
  nombre: z.string().min(1).max(100).optional(),
  origen: z.enum(['newsletter', 'cv-translator', 'unia', 'manual']).default('newsletter'),
});

export type SubscriberInput = z.infer<typeof SubscriberSchema>;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// UNIA Citas
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const UniaCitaSchema = z.object({
  userEmail: z.string().email('Email inválido').min(1, 'Email requerido'),
  userName: z.string().min(2, 'Nombre debe tener al menos 2 caracteres').max(100, 'Nombre demasiado largo'),
  userPais: z.string().optional(),
  userTelefono: z.string().regex(/^\+?[0-9\s\-()]+$/, 'Teléfono inválido').optional(),
  userMensaje: z.string().min(5, 'Describe brevemente tu consulta').max(1000, 'Mensaje demasiado largo').optional(),
});

export const UniaCitaTokenSchema = z.object({
  token: z.string().min(1, 'Token requerido'),
});

export type UniaCitaInput = z.infer<typeof UniaCitaSchema>;
export type UniaCitaTokenInput = z.infer<typeof UniaCitaTokenSchema>;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Blog Posts / Articles
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const BlogPostSchema = z.object({
  autorEmail: z.string().email('Email inválido'),
  autorNombre: z.string().min(2).max(100),
  titulo: z.string().min(10).max(200),
  contenido: z.string().min(200).max(20000),
  categoria: z.enum(['trabajo', 'vivienda', 'salud', 'educacion', 'cultura', 'legal', 'general']).optional(),
  tags: z.array(z.string()).optional(),
});

export type BlogPostInput = z.infer<typeof BlogPostSchema>;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Stripe Webhooks
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const StripeCheckoutMetadataSchema = z.object({
  plan: z.enum(['cv-single', 'cv-monthly', 'cv-yearly', 'premium']).optional(),
  email: z.string().email('Email inválido').optional(),
});

export type StripeCheckoutMetadata = z.infer<typeof StripeCheckoutMetadataSchema>;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Utilidades de Validación
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Valida datos con un schema de Zod y retorna resultado seguro
 */
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown):
  { success: true; data: T } | { success: false; errors: string[] } {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors = result.error.issues.map((err: z.ZodIssue) =>
    `${err.path.join('.')}: ${err.message}`
  );

  return { success: false, errors };
}

/**
 * Extrae mensaje de error legible de ZodError
 */
export function getValidationErrorMessage(errors: string[]): string {
  if (errors.length === 0) return 'Datos inválidos';
  if (errors.length === 1) return errors[0];
  return `Errores de validación: ${errors.join(', ')}`;
}
