# ⚠️ CONFIGURACIÓN REQUERIDA EN VERCEL

**IMPORTANTE:** Estas variables de entorno deben estar configuradas en Vercel para que el deploy funcione.

## 🔐 Variables de Entorno Críticas

### 1. Ir a Vercel Dashboard
https://vercel.com/tu-proyecto/settings/environment-variables

### 2. Configurar TODAS estas variables:

```bash
# ============================================
# ANTHROPIC (IA - CRÍTICO)
# ============================================
ANTHROPIC_API_KEY=sk-ant-...
# ⚠️ SIN ESTO: CV Generator y Eventos no funcionan

# ============================================
# STRIPE (PAGOS - CRÍTICO)
# ============================================
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...

# Productos Stripe
STRIPE_PRICE_ID_PREMIUM=price_...
STRIPE_PRICE_ID_CV_SINGLE=price_...
STRIPE_PRICE_ID_CV_MONTHLY=price_...
STRIPE_PRICE_ID_CV_YEARLY=price_...
# ⚠️ SIN ESTO: Pagos no funcionan

# ============================================
# GITHUB (BASE DE DATOS - CRÍTICO)
# ============================================
GITHUB_TOKEN=ghp_...
GIST_ID=...
GIST_ID_EVENTOS=...
NEXT_PUBLIC_GIST_ID_EVENTOS=...
# ⚠️ SIN ESTO: Newsletter y Eventos no funcionan

# ============================================
# EMAIL (NEWSLETTER - CRÍTICO)
# ============================================
NEWSLETTER_GMAIL_USER=tu_email@gmail.com
NEWSLETTER_GMAIL_PASS=xxxx xxxx xxxx xxxx
# ⚠️ SIN ESTO: Emails no se envían

# ============================================
# NEXTAUTH (AUTENTICACIÓN - CRÍTICO)
# ============================================
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://hispanosensuiza.ch
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
# ⚠️ SIN ESTO: Login no funciona

# ============================================
# ADMIN & SEGURIDAD
# ============================================
CV_ADMIN_KEY=...
ADMIN_TOKEN=...
CRON_SECRET=...

# ============================================
# REDES SOCIALES (OPCIONAL)
# ============================================
FACEBOOK_ACCESS_TOKEN=...
FACEBOOK_PAGE_ID=...
INSTAGRAM_ACCESS_TOKEN=...
INSTAGRAM_BUSINESS_ACCOUNT_ID=...

# ============================================
# APIS EXTERNAS (OPCIONAL)
# ============================================
ADZUNA_APP_ID=...
ADZUNA_APP_KEY=...
```

## 🚨 VERIFICAR AHORA

### Paso 1: Revisar Variables en Vercel
```bash
1. Ve a: https://vercel.com/tu-proyecto/settings/environment-variables
2. Verifica que TODAS las variables críticas estén configuradas
3. Si falta alguna, agrégala AHORA
```

### Paso 2: Verificar que estén en TODOS los entornos
Cada variable debe estar en:
- ✅ Production
- ✅ Preview
- ✅ Development

### Paso 3: Redeploy Después de Agregar Variables
Si agregaste variables:
```bash
1. Ve a: https://vercel.com/tu-proyecto/deployments
2. Click en el último deployment
3. Click en "..." (3 puntos)
4. Click en "Redeploy"
```

## 🔧 VERIFICACIÓN LOCAL

Antes de cada deploy, ejecutar:
```bash
cd ~/hispanos-suiza-dev
npm run build
```

Si el build local falla = NO PUSHEAR

## ⚠️ ERRORES COMUNES EN VERCEL

### Error: "ANTHROPIC_API_KEY is not defined"
**Solución:** Agregar `ANTHROPIC_API_KEY` en Vercel

### Error: "Failed to fetch gist"
**Solución:** Verificar `GITHUB_TOKEN` y `GIST_ID` en Vercel

### Error: "Stripe not configured"
**Solución:** Agregar todas las variables `STRIPE_*` en Vercel

### Error: "Cannot find module..."
**Solución:** Verificar que todos los archivos estén commiteados:
```bash
git status
git add .
git commit -m "fix: missing files"
git push
```

## 📋 CHECKLIST PRE-DEPLOY

Antes de cada push a main:

- [ ] `npm run build` local sin errores
- [ ] Todas las variables críticas en Vercel
- [ ] `git status` limpio (todo commiteado)
- [ ] No hay archivos `.env.local` en git
- [ ] `.gitignore` incluye `.env.local`

## 🆘 SI SIGUE FALLANDO

1. **Ver logs exactos en Vercel:**
   ```
   https://vercel.com/tu-proyecto/deployments/[latest]
   ```

2. **Verificar que el build funciona local:**
   ```bash
   cd ~/hispanos-suiza-dev
   rm -rf .next
   npm run build
   ```

3. **Forzar redeploy limpio:**
   ```bash
   git commit --allow-empty -m "Force redeploy"
   git push origin main
   ```

## ✅ CONFIGURACIÓN ACTUAL

Según el último check:
- ✅ `ANTHROPIC_API_KEY` - Configurada
- ✅ `GITHUB_TOKEN` - Configurada
- ✅ Build local - Sin errores
- ⚠️ `GIST_ID_EVENTOS` - Verificar en Vercel
- ⚠️ `NEXT_PUBLIC_GIST_ID_EVENTOS` - Verificar en Vercel

---

**Última actualización:** 23 Nov 2026
**Revisar:** Después de cada error de deploy
