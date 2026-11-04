# Setup Stripe para Template Emigrar Suiza

## ✅ Lo que ya está hecho

- ✅ Integración completa de Stripe Checkout
- ✅ Sistema de webhooks para confirmar pagos
- ✅ Email automático con link de descarga
- ✅ Página de descarga segura
- ✅ Almacenamiento de compras en GitHub Gist
- ✅ Botones de compra integrados en la landing page

---

## 💰 Ventajas vs Gumroad

**Stripe directo:**
- Comisión: 2.9% + CHF 0.30 = **~CHF 0.85 por venta**
- Recibes: **CHF 18.15** de cada CHF 19 (96%)

**Gumroad:**
- Comisión: 13% + CHF 0.60 = **~CHF 3.07 por venta**
- Recibes: CHF 15.93 de cada CHF 19 (84%)

**Diferencia: +CHF 2.22 por venta** (12% más de ganancia)

Por cada 100 ventas, ganas **CHF 222 más** con Stripe.

---

## 🚀 Pasos de Configuración (15 minutos)

### Paso 1: Crear cuenta Stripe (5 min)

1. Ve a https://dashboard.stripe.com/register
2. Regístrate con tu email
3. Verifica tu email
4. Completa el formulario de información de negocio:
   - Nombre del negocio: "HispanosEnSuiza"
   - Tipo: "Digital products/services"
   - País: Switzerland
   - Moneda: CHF

---

### Paso 2: Obtener claves de API (2 min)

1. Ve a https://dashboard.stripe.com/test/apikeys
2. Copia las claves:
   - **Publishable key** (empieza con `pk_test_`)
   - **Secret key** (empieza con `sk_test_`)

3. Actualiza `.env.local`:
```bash
STRIPE_SECRET_KEY=sk_test_TU_CLAVE_AQUI
STRIPE_PUBLISHABLE_KEY=pk_test_TU_CLAVE_AQUI
```

---

### Paso 3: Crear webhook (3 min)

1. Ve a https://dashboard.stripe.com/test/webhooks
2. Click **"Add endpoint"**
3. Configuración:
   - **Endpoint URL:** `https://hispanosensuiza.ch/api/stripe/webhook`
   - **Description:** "Template purchases webhook"
   - **Events to send:**
     - ✅ `checkout.session.completed`
   - **API version:** Latest (default)

4. Click **"Add endpoint"**

5. **Copiar Signing Secret:**
   - Haz clic en el webhook recién creado
   - En la sección "Signing secret", click **"Reveal"**
   - Copia el secret (empieza con `whsec_`)

6. Actualiza `.env.local`:
```bash
STRIPE_WEBHOOK_SECRET=whsec_TU_SECRET_AQUI
```

---

### Paso 4: Crear GitHub Gist para compras (2 min)

1. Ve a https://gist.github.com/
2. Click **"New gist"**
3. Configuración:
   - **Filename:** `purchases.json`
   - **Content:** `[]`
   - **Visibility:** ✅ **Secret gist** (muy importante)
4. Click **"Create secret gist"**

5. **Copiar Gist ID:**
   - El ID está en la URL: `https://gist.github.com/tu-usuario/GIST_ID_AQUI`
   - Ejemplo: si la URL es `https://gist.github.com/usuario/abc123def456`, el ID es `abc123def456`

6. Actualiza `.env.local`:
```bash
TEMPLATE_PURCHASES_GIST_ID=TU_GIST_ID_AQUI
```

---

### Paso 5: Verificar configuración (3 min)

1. **Verificar que `.env.local` tenga:**
```bash
# Stripe
STRIPE_SECRET_KEY=sk_test_XXXXX
STRIPE_PUBLISHABLE_KEY=pk_test_XXXXX
STRIPE_WEBHOOK_SECRET=whsec_XXXXX

# GitHub Gist
TEMPLATE_PURCHASES_GIST_ID=XXXXX

# Base URL
NEXT_PUBLIC_BASE_URL=https://hispanosensuiza.ch

# Gmail (ya configurado)
NEWSLETTER_GMAIL_USER=VNR.IAsolutions@gmail.com
NEWSLETTER_GMAIL_PASS=***************

# GitHub Token (ya configurado)
GITHUB_TOKEN=ghp_XXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

2. **Reiniciar servidor de desarrollo:**
```bash
npm run dev
```

3. **Ir a:** http://localhost:3000/productos/template-emigrar-suiza

4. **Click en "Comprar template ahora"**
   - Debería redirigir a Stripe Checkout
   - Usar tarjeta de prueba: `4242 4242 4242 4242`
   - Fecha: Cualquier fecha futura
   - CVC: Cualquier 3 dígitos

---

## 🧪 Testing Completo

### Test 1: Flujo de compra completo

1. Ve a `/productos/template-emigrar-suiza`
2. Click "Comprar template ahora"
3. Stripe Checkout se abre
4. Llenar formulario:
   - **Email:** tu_email@test.com
   - **Tarjeta:** 4242 4242 4242 4242
   - **Fecha:** 12/30
   - **CVC:** 123
5. Click "Pay"
6. Debería redirigir a `/compra-exitosa`
7. **Verificar email:** Deberías recibir email con link de descarga
8. **Click en link de descarga** → Debería llevar a `/descargar/[id]`
9. **Click "Descargar Template"** → Descarga el ZIP

### Test 2: Verificar webhook

1. Ve a https://dashboard.stripe.com/test/webhooks
2. Click en tu webhook
3. Tab **"Events"**
4. Deberías ver evento `checkout.session.completed` con ✅ Success

### Test 3: Verificar compra guardada

1. Ve a tu GitHub Gist: https://gist.github.com/TU_USUARIO/TU_GIST_ID
2. Deberías ver la compra guardada en `purchases.json`:
```json
[
  {
    "id": "1234567890-abc123",
    "sessionId": "cs_test_...",
    "email": "tu_email@test.com",
    "name": "",
    "amount": 19,
    "currency": "chf",
    "timestamp": "2026-01-...",
    "product": "template-emigrar-suiza"
  }
]
```

---

## 🚀 Activar en Producción

### Cuando estés listo para vender:

1. **Activar cuenta Stripe:**
   - Ve a https://dashboard.stripe.com/account/onboarding
   - Completa verificación de identidad
   - Conecta cuenta bancaria

2. **Cambiar a claves de producción:**
   - Ve a https://dashboard.stripe.com/apikeys (sin `/test/`)
   - Copia claves de producción (`pk_live_` y `sk_live_`)
   - Actualiza `.env.local` o variables de entorno en Vercel

3. **Crear webhook de producción:**
   - Ve a https://dashboard.stripe.com/webhooks (sin `/test/`)
   - Crear nuevo endpoint igual que en test
   - URL: `https://hispanosensuiza.ch/api/stripe/webhook`
   - Copiar nuevo signing secret

4. **Actualizar variables en Vercel:**
   - Ve a https://vercel.com/tu-proyecto/settings/environment-variables
   - Actualizar:
     - `STRIPE_SECRET_KEY` → `sk_live_...`
     - `STRIPE_PUBLISHABLE_KEY` → `pk_live_...`
     - `STRIPE_WEBHOOK_SECRET` → `whsec_...` (producción)
   - **Redeploy** para aplicar cambios

---

## 🎯 Precios Recomendados

Ya está configurado **CHF 19** como precio de lanzamiento.

**Estrategia pricing:**
- Mes 1-2: CHF 19 (precio lanzamiento)
- Mes 3: CHF 29 (precio normal)
- Mes 6: CHF 39 (precio final)

**Para cambiar precio:**

Edita `/src/app/api/stripe/create-checkout-session/route.ts` línea 20:
```typescript
unit_amount: 1900, // CHF 19.00 → Cambiar a 2900 para CHF 29
```

---

## 📊 Ver Ventas

### En Stripe Dashboard:

1. **Ventas:** https://dashboard.stripe.com/payments
2. **Clientes:** https://dashboard.stripe.com/customers
3. **Ingresos:** https://dashboard.stripe.com/reports/overview

### En GitHub Gist:

- Todas las compras: https://gist.github.com/TU_USUARIO/TU_GIST_ID
- JSON con todos los detalles de cada compra

---

## 🔧 Troubleshooting

### "Error al crear sesión de pago"

**Causa:** Claves de API incorrectas o no configuradas

**Solución:**
1. Verificar `.env.local` tenga `STRIPE_SECRET_KEY`
2. Verificar clave empiece con `sk_test_` (test) o `sk_live_` (producción)
3. Reiniciar servidor: `npm run dev`

---

### "Webhook signature verification failed"

**Causa:** Webhook secret incorrecto

**Solución:**
1. Ve a https://dashboard.stripe.com/test/webhooks
2. Click en tu webhook
3. **Reveal** signing secret
4. Copiar y pegar en `.env.local` → `STRIPE_WEBHOOK_SECRET`
5. Reiniciar servidor

---

### "No recibí el email de descarga"

**Causa:** Webhook no configurado o Gmail credentials incorrectos

**Solución:**
1. Verificar webhook está activo: https://dashboard.stripe.com/test/webhooks
2. Verificar evento `checkout.session.completed` tiene ✅ Success
3. Verificar logs del servidor: `npm run dev`
4. Verificar Gmail credentials en `.env.local`:
   - `NEWSLETTER_GMAIL_USER`
   - `NEWSLETTER_GMAIL_PASS`

---

### "Link de descarga no funciona"

**Causa:** Gist ID incorrecto o GitHub token sin permisos

**Solución:**
1. Verificar Gist ID es correcto
2. Verificar Gist es **Secret** (no Public)
3. Verificar GitHub token tiene permisos de `gist`
4. Probar acceder al Gist manualmente

---

## 📈 Proyección de Ingresos

**Precio:** CHF 19 (lanzamiento)

| Ventas/mes | Bruto (CHF) | Comisión Stripe | Neto (CHF) |
|------------|-------------|-----------------|------------|
| 20         | 380         | 17              | **363**    |
| 50         | 950         | 43              | **907**    |
| 100        | 1'900       | 85              | **1'815**  |
| 200        | 3'800       | 170             | **3'630**  |

**Precio:** CHF 29 (normal)

| Ventas/mes | Bruto (CHF) | Comisión Stripe | Neto (CHF) |
|------------|-------------|-----------------|------------|
| 20         | 580         | 26              | **554**    |
| 50         | 1'450       | 65              | **1'385**  |
| 100        | 2'900       | 130             | **2'770**  |
| 200        | 5'800       | 260             | **5'540**  |

---

## ✅ Checklist Final

- [ ] Cuenta Stripe creada y verificada
- [ ] Claves de API copiadas a `.env.local`
- [ ] Webhook configurado en Stripe
- [ ] Webhook secret copiado a `.env.local`
- [ ] GitHub Gist creado (secret)
- [ ] Gist ID copiado a `.env.local`
- [ ] Servidor reiniciado con nuevas variables
- [ ] Test de compra completado exitosamente
- [ ] Email de descarga recibido
- [ ] Descarga del template funciona
- [ ] Compra guardada en GitHub Gist
- [ ] Webhook muestra ✅ Success en Stripe

---

## 🆘 Soporte

**Stripe:**
- Docs: https://stripe.com/docs
- Soporte: https://support.stripe.com/

**GitHub Gist:**
- Docs: https://docs.github.com/en/get-started/writing-on-github/editing-and-sharing-content-with-gists

---

**Setup completado por:** Claude Code
**Fecha:** 2026-11-04
**Tiempo total:** ~15 minutos

🚀 **¡Listo para vender!**
