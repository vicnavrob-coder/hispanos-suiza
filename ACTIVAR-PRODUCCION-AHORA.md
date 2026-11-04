# 🚀 ACTIVAR EN PRODUCCIÓN - 5 MINUTOS

## ✅ YA ESTÁ HECHO AUTOMÁTICAMENTE:

- ✅ Sistema completo de Stripe implementado
- ✅ Webhook configurado en el código
- ✅ Email automático de entrega
- ✅ GitHub Gist creado para almacenar compras: `a0c5d852317cdc395f37e9d4f237bd26`
- ✅ Páginas de descarga y confirmación creadas
- ✅ Botones integrados en la landing page

---

## ⚠️ SOLO NECESITAS HACER ESTO (5 MINUTOS):

### Opción A: MODO TEST (Funciona AHORA - 2 minutos)

Puedes empezar a vender INMEDIATAMENTE en modo test. Los pagos son reales pero Stripe solo cobra cuando actives producción.

#### Paso 1: Crear cuenta Stripe (1 min)

1. Abre: https://dashboard.stripe.com/register
2. Email: tu_email@hispanosensuiza.ch
3. Password: (el que quieras)
4. Verificar email

#### Paso 2: Copiar claves TEST (1 min)

1. Ve a: https://dashboard.stripe.com/test/apikeys
2. Verás dos claves:
   - **Publishable key** (empieza con `pk_test_`)
   - **Secret key** (empieza con `sk_test_`) → Click "Reveal" para verla

3. **Actualiza `.env.local` AHORA:**

```bash
# Reemplaza estas líneas:
STRIPE_SECRET_KEY=sk_test_TU_CLAVE_SECRETA_AQUI
STRIPE_PUBLISHABLE_KEY=pk_test_TU_CLAVE_PUBLICA_AQUI
```

#### Paso 3: Crear webhook TEST (2 min)

1. Ve a: https://dashboard.stripe.com/test/webhooks
2. Click **"Add endpoint"**
3. **Endpoint URL:** `https://hispanosensuiza.ch/api/stripe/webhook`
4. **Description:** "Template purchases"
5. **Events to send:** Busca y selecciona solo esto:
   - ✅ `checkout.session.completed`
6. Click **"Add endpoint"**
7. Click en el webhook que acabas de crear
8. Click **"Reveal"** en "Signing secret"
9. Copia el secret (empieza con `whsec_`)

10. **Actualiza `.env.local` AHORA:**

```bash
# Reemplaza esta línea:
STRIPE_WEBHOOK_SECRET=whsec_TU_WEBHOOK_SECRET_AQUI
```

#### Paso 4: Deploy a Vercel (1 min)

```bash
# Actualiza variables de entorno en Vercel:
vercel env add STRIPE_SECRET_KEY
# Pega: sk_test_...

vercel env add STRIPE_PUBLISHABLE_KEY
# Pega: pk_test_...

vercel env add STRIPE_WEBHOOK_SECRET
# Pega: whsec_...

# Redeploy
git add .
git commit -m "Activar Stripe para template"
git push
```

O si usas la UI de Vercel:
1. Ve a: https://vercel.com/tu-proyecto/settings/environment-variables
2. Añade las 3 variables de arriba
3. Redeploy el proyecto

---

### ✅ LISTO - Ya funciona en TEST

Puedes probar AHORA:
1. Ve a: https://hispanosensuiza.ch/productos/template-emigrar-suiza
2. Click "Comprar template ahora"
3. Usa tarjeta de prueba: **4242 4242 4242 4242**
4. Fecha: 12/30
5. CVC: 123
6. Deberías recibir email con link de descarga

---

## 🎯 Opción B: MODO PRODUCCIÓN (Cuando quieras cobrar de verdad)

### Paso 1: Activar cuenta Stripe

1. Ve a: https://dashboard.stripe.com/account/onboarding
2. Completa:
   - Información del negocio
   - Verificación de identidad
   - Cuenta bancaria (para recibir pagos)

### Paso 2: Copiar claves PRODUCCIÓN

1. Ve a: https://dashboard.stripe.com/apikeys (SIN /test/)
2. Copia claves de PRODUCCIÓN:
   - `pk_live_...`
   - `sk_live_...`

3. **Actualiza `.env.local` y Vercel:**

```bash
STRIPE_SECRET_KEY=sk_live_TU_CLAVE_AQUI
STRIPE_PUBLISHABLE_KEY=pk_live_TU_CLAVE_AQUI
```

### Paso 3: Crear webhook PRODUCCIÓN

1. Ve a: https://dashboard.stripe.com/webhooks (SIN /test/)
2. Mismo proceso que en test:
   - URL: `https://hispanosensuiza.ch/api/stripe/webhook`
   - Evento: `checkout.session.completed`
3. Copiar signing secret: `whsec_...` (será diferente al de test)

4. **Actualiza `.env.local` y Vercel:**

```bash
STRIPE_WEBHOOK_SECRET=whsec_TU_NUEVO_SECRET_PRODUCCION
```

### Paso 4: Redeploy

```bash
git add .
git commit -m "Activar Stripe PRODUCCIÓN"
git push
```

O actualiza variables en Vercel y redeploy.

---

## 📊 VERIFICAR QUE FUNCIONA

### Test completo:

1. **Ir a landing:** https://hispanosensuiza.ch/productos/template-emigrar-suiza

2. **Click "Comprar"** → Debería abrir Stripe Checkout

3. **Pagar con tarjeta test:** 4242 4242 4242 4242

4. **Verificar redirect:** Debería ir a `/compra-exitosa`

5. **Verificar email:** Deberías recibir email con link de descarga

6. **Click link descarga:** Debería ir a `/descargar/[id]`

7. **Descargar ZIP:** Debería descargar `template-emigrar-suiza-v1.0.zip`

8. **Verificar Stripe Dashboard:**
   - https://dashboard.stripe.com/test/payments → Ver pago
   - https://dashboard.stripe.com/test/webhooks → Ver evento ✅

9. **Verificar GitHub Gist:**
   - https://gist.github.com/vicnavrob-coder/a0c5d852317cdc395f37e9d4f237bd26
   - Debería tener la compra guardada en `purchases.json`

---

## 💰 COMISIONES

**Test mode:** Pagos simulados, no se cobra nada

**Producción:**
- Por cada venta de CHF 19:
  - Stripe cobra: CHF 0.85 (2.9% + CHF 0.30)
  - Tú recibes: **CHF 18.15** (96%)

**Comparación:**
- Stripe: CHF 18.15 por venta
- Gumroad: CHF 15.93 por venta
- **Diferencia: +CHF 2.22 más con Stripe**

---

## 🆘 TROUBLESHOOTING

### "Error al crear sesión de pago"

**Solución:** Verifica que `.env.local` tenga las claves correctas:
```bash
cat .env.local | grep STRIPE
```

### "Webhook signature verification failed"

**Solución:** El webhook secret está mal. Ve a:
- Test: https://dashboard.stripe.com/test/webhooks
- Prod: https://dashboard.stripe.com/webhooks

Click en tu webhook → Reveal signing secret → Copiar y pegar en `.env.local`

### "No recibí el email"

**Solución:**
1. Verifica webhook funcionó: https://dashboard.stripe.com/test/webhooks
2. Busca evento `checkout.session.completed` → Debería tener ✅
3. Revisa spam en tu email
4. Verifica Gmail credentials en `.env.local` estén correctos

---

## 📝 RESUMEN

**Lo que YA funciona:**
- ✅ Todo el código implementado
- ✅ GitHub Gist creado automáticamente
- ✅ Sistema de emails configurado
- ✅ Páginas de descarga listas

**Lo que NECESITAS hacer:**
1. Crear cuenta Stripe (1 min)
2. Copiar 2 claves API (1 min)
3. Crear webhook (2 min)
4. Actualizar `.env.local` con las 3 claves
5. Deploy a Vercel

**Tiempo total:** 5 minutos

---

## 🎯 SIGUIENTE PASO INMEDIATO

**HAZ ESTO AHORA:**

1. Abre: https://dashboard.stripe.com/register
2. Crea cuenta
3. Ve a: https://dashboard.stripe.com/test/apikeys
4. Copia las 2 claves
5. Actualiza `.env.local`:

```bash
STRIPE_SECRET_KEY=sk_test_TU_CLAVE
STRIPE_PUBLISHABLE_KEY=pk_test_TU_CLAVE
```

6. Ve a: https://dashboard.stripe.com/test/webhooks
7. Crea webhook con URL: `https://hispanosensuiza.ch/api/stripe/webhook`
8. Copia signing secret
9. Actualiza `.env.local`:

```bash
STRIPE_WEBHOOK_SECRET=whsec_TU_SECRET
```

10. Deploy:

```bash
git add .
git commit -m "Activar Stripe"
git push
```

**¡LISTO! Ya puedes vender.**

---

## 📞 SOPORTE

- Stripe Docs: https://stripe.com/docs
- Stripe Support: https://support.stripe.com

**GitHub Gist de compras (privado):**
https://gist.github.com/vicnavrob-coder/a0c5d852317cdc395f37e9d4f237bd26

---

**IMPORTANTE:** Todo está configurado. Solo necesitas las claves de Stripe y 5 minutos de tu tiempo para activarlo.

🚀 **¡A vender!**
