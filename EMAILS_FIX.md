# Fix: Emails NO se envían en producción

## 🐛 Problema

Los usuarios NO reciben emails porque las credenciales de Gmail **NO están configuradas en Vercel**.

### Síntomas
- ✅ Suscriptores se guardan correctamente
- ✅ Historias se publican correctamente
- ✅ Redes sociales funcionan (Facebook/Instagram)
- ❌ **NO se envían emails de bienvenida**
- ❌ **NO se envían emails de confirmación de historia**

### Causa raíz

Variables de entorno faltantes en Vercel:
```bash
NEWSLETTER_GMAIL_USER=VNR.IAsolutions@gmail.com
NEWSLETTER_GMAIL_PASS=mwnmkbgrpjfpjyak
```

**Código afectado:**
```typescript
// src/app/api/newsletter/route.ts (línea 49)
if (!already && GMAIL_USER && GMAIL_PASS) {
  // ⬅️ Si GMAIL_USER o GMAIL_PASS están vacíos, NO se envía email
}

// src/app/api/historias/route.ts (línea 74)
if (result.historia && GMAIL_USER && GMAIL_PASS) {
  // ⬅️ Si GMAIL_USER o GMAIL_PASS están vacíos, NO se envía email
}
```

---

## ✅ Solución

### Opción 1: Dashboard de Vercel (Recomendado)

1. Ir a: https://vercel.com/vicnavrob/hispanos-suiza-dev/settings/environment-variables

2. Agregar estas 2 variables:

   **Variable 1:**
   - Key: `NEWSLETTER_GMAIL_USER`
   - Value: `VNR.IAsolutions@gmail.com`
   - Environment: Production, Preview, Development

   **Variable 2:**
   - Key: `NEWSLETTER_GMAIL_PASS`
   - Value: `mwnmkbgrpjfpjyak`
   - Environment: Production, Preview, Development

3. Redeploy: https://vercel.com/vicnavrob/hispanos-suiza-dev/deployments

---

### Opción 2: Vercel CLI

```bash
# Agregar variables
vercel env add NEWSLETTER_GMAIL_USER
# Pegar: VNR.IAsolutions@gmail.com

vercel env add NEWSLETTER_GMAIL_PASS
# Pegar: mwnmkbgrpjfpjyak

# Redeploy
vercel --prod
```

---

## 🧪 Verificación

### 1. Después de agregar variables

Esperar 2-3 minutos al redeploy, luego probar:

**Test suscriptor nuevo:**
```bash
curl -X POST https://hispanosensuiza.ch/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","nombre":"Test User"}'
```

**Test publicar historia:**
- Ir a: https://hispanosensuiza.ch/historias-reales
- Login con Google
- Publicar historia de prueba
- Verificar email de confirmación

### 2. Revisar logs en Vercel

Ir a: https://vercel.com/vicnavrob/hispanos-suiza-dev/logs

**Buscar:**
```
[historias] ✅ Email de bienvenida enviado a ...
```

Si aparece ✅ → Emails funcionando
Si aparece ❌ → Revisar error en logs

---

## 📊 Estado Actual

**Afectados:**
- Yanick Suter (suteryanick44@gmail.com) - NO recibió email por publicar historia
- Último suscriptor - NO recibió email de bienvenida

**Sistema de Retry:**
Los suscriptores que NO recibieron email tienen `welcomeStep: 0` y un cron job debería reintentarlo.

**Endpoints afectados:**
- `/api/newsletter` - Email de bienvenida a suscriptores
- `/api/historias` - Email de confirmación de historia publicada
- `/api/cv-translator/**` - Emails de CV translator
- `/api/unia/**` - Emails de UNIA

---

## 🔐 Seguridad

**Credenciales actuales:**
- Email: VNR.IAsolutions@gmail.com
- Password: `mwnmkbgrpjfpjyak` (App Password de Google)

**IMPORTANTE:**
- Nunca commitear `.env.local` al repositorio
- Las variables de Vercel están encriptadas
- El password es un "App Password" de Gmail (no la contraseña real)

---

**Fecha:** 2026-11-17
**Prioridad:** ALTA - Afecta experiencia de usuario
