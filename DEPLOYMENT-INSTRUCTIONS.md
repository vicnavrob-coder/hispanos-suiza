# 🚀 Instrucciones para Deploy del Swiss Starter Pack

## Problema Actual
- ✅ Código completo y funcionando (build local exitoso con 290 páginas)
- ✅ Todo pusheado a GitHub (commit eb0a684)
- ❌ Vercel NO está deployando automáticamente desde GitHub
- ❌ Página devuelve 404 en producción: https://hispanosensuiza.ch/productos/swiss-starter-pack

## Solución Rápida (2 minutos) ⚡

### Opción A: Deployment Manual desde Vercel Dashboard (MÁS RÁPIDO)

1. Ve a: **https://vercel.com/dashboard**
2. Busca el proyecto **hispanos-suiza**
3. Click en el proyecto
4. Click en **"Deployments"** en el menú lateral
5. Click en el botón **"Redeploy"** o **"Deploy"**
6. Selecciona la branch **main**
7. Click en **"Deploy"**

✅ En 2-3 minutos estará live

---

### Opción B: Configurar GitHub Actions para Deployments Automáticos

Si quieres que los deployments sean automáticos desde ahora:

#### 1. Obtener Token de Vercel

1. Ve a: https://vercel.com/account/tokens
2. Click en **"Create Token"**
3. Nombre: `GitHub Actions Deploy`
4. Scope: `Full Account`
5. **Copia el token** (solo se muestra una vez)

#### 2. Agregar Secrets a GitHub

1. Ve a: https://github.com/vicnavrob-coder/hispanos-suiza/settings/secrets/actions
2. Click en **"New repository secret"**
3. Agrega estos 3 secrets:

**Secret 1:**
- Name: `VERCEL_TOKEN`
- Value: [el token que copiaste en paso 1]

**Secret 2 (obtener de Vercel):**
- Ve a: https://vercel.com/account
- Copia tu **Team ID** o **User ID**
- Name: `VERCEL_ORG_ID`
- Value: [tu org/team ID]

**Secret 3 (obtener de Vercel):**
- Ve a: https://vercel.com/vicnavrob-coder/hispanos-suiza/settings
- En "General", copia el **Project ID**
- Name: `VERCEL_PROJECT_ID`
- Value: [tu project ID]

#### 3. Triggerar el Workflow

Una vez configurados los secrets:

```bash
git commit --allow-empty -m "trigger: Deploy Swiss Starter Pack"
git push
```

O manualmente desde GitHub:
1. Ve a: https://github.com/vicnavrob-coder/hispanos-suiza/actions/workflows/deploy-vercel.yml
2. Click en **"Run workflow"**
3. Selecciona branch **main**
4. Click en **"Run workflow"**

---

## Verificar que el Deployment Funcionó

```bash
curl -I https://hispanosensuiza.ch/productos/swiss-starter-pack
```

Deberías ver:
- `HTTP/2 200` (en lugar de 404)
- `last-modified` con fecha reciente (hoy)

---

## Estado Actual del Código

✅ **Páginas creadas:**
- `/productos/swiss-starter-pack` - Página principal del producto
- `/productos/swiss-starter-pack/compra-exitosa` - Página de confirmación
- `/productos/swiss-starter-pack/descargar/[id]` - Página de descarga dinámica

✅ **Integración Stripe:**
- Multi-producto funcionando (Template + Swiss Pack)
- Checkout configurado a CHF 67
- Webhook procesando compras
- Emails automáticos con contenido dinámico

✅ **SEO:**
- Sitemap actualizado
- Product Schema JSON-LD
- Open Graph metadata
- Prioridad 0.9 en sitemap

✅ **Navegación:**
- Header (desktop + mobile) actualizado con badge "Nuevo"
- Footer con link correcto

---

## ¿Por qué Vercel no deployea automáticamente?

Posibles causas:

1. **Integración desconectada**: Ve a Vercel → Settings → Git y verifica que está conectado a GitHub
2. **Ignored Build Step**: Ve a Vercel → Settings → Git y verifica que no hay filtros ignorando los builds
3. **Webhook roto**: Reconecta la integración GitHub-Vercel

**Solución permanente:** Configurar GitHub Actions (Opción B arriba) para tener control completo sobre deployments.

---

## Próximos Pasos Después del Deploy

Una vez que el Swiss Starter Pack esté live:

1. **Crear assets faltantes:**
   - `/public/og-swiss-pack.jpg` (1200x630px)
   - `/public/swiss-starter-pack-v1.0.zip` (el producto)

2. **Probar flujo completo:**
   - Checkout con Stripe (test mode)
   - Recepción de email
   - Descarga del producto

3. **Verificar métricas:**
   - Google Analytics tracking
   - Conversiones de Stripe
