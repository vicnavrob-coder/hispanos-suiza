# Configuración del Producto CV Generator en Stripe

## 🎯 Objetivo
Crear un producto de pago único (one-time payment) en Stripe para el Generador de CV Suizo a **6,99 CHF**.

## 📋 Pasos para configurar en Stripe Dashboard

### 1. Acceder al Dashboard de Stripe
- Ir a https://dashboard.stripe.com
- Asegurarse de estar en **MODO LIVE** (no test mode)

### 2. Crear el Producto
1. Navegar a **Products** → **Add product**
2. Completar los campos:

**Product information:**
- **Name**: `CV Suizo - Generador Profesional`
- **Description**: `Generación de CV profesional en formato suizo estándar. Descarga inmediata en PDF de alta calidad.`
- **Image**: (opcional) Subir una imagen representativa

**Pricing:**
- **Pricing model**: `Standard pricing`
- **Price**: `6.99 CHF`
- **Billing period**: `One time` (pago único, no recurrente)
- **Currency**: `CHF (Swiss Franc)`

**Additional options:**
- **Tax behavior**: `Taxable` (sujeto a IVA suizo si aplica)

3. Hacer clic en **Add product**

### 3. Obtener el Price ID
Después de crear el producto:
1. Ir a la página del producto
2. En la sección de **Pricing**, encontrarás el **Price ID**
3. Copiar el ID que empieza con `price_...`

**Ejemplo**: `price_1ABC2DEfGHiJkLmN3oPqRsTu`

### 4. Añadir el Price ID al .env.local
Editar el archivo `/Users/victornavarroroberto/hispanos-suiza-dev/.env.local` y añadir:

```bash
# CV Generator - Single CV (6.99 CHF)
STRIPE_PRICE_ID_CV_GENERATOR=price_XXXXXXXXXXXXXXXXXXXXX
```

Reemplazar `price_XXXXXXXXXXXXXXXXXXXXX` con el Price ID real copiado de Stripe.

### 5. Reiniciar el servidor de desarrollo
```bash
npm run dev
```

## ✅ Verificación

Una vez configurado, el sistema funcionará así:

1. **Primer CV**: El usuario puede generar y descargar su primer CV **GRATIS**
2. **Segundo CV en adelante**: Se mostrará un modal solicitando el pago de **6,99 CHF**
3. **Después del pago**: El usuario es redirigido de vuelta y puede descargar su CV
4. **Tracking**: El contador se guarda en localStorage del navegador

## 🔧 Testing

Para probar el flujo completo:

1. Limpiar localStorage del navegador (o usar modo incógnito)
2. Ir a `/herramientas/generador-cv`
3. Rellenar el formulario completo
4. Primera descarga: debería ser gratis
5. Rellenar otro CV
6. Segunda descarga: debería mostrar el modal de pago
7. Completar el pago en Stripe (usar tarjeta de prueba: `4242 4242 4242 4242`)
8. Verificar que después del pago exitoso se descarga el CV

## 📊 Webhook (ya configurado)

El webhook de Stripe ya está configurado en:
- **URL**: `https://hispanosensuiza.ch/api/stripe/webhook`
- **Secret**: Ya guardado en `.env.local` como `STRIPE_WEBHOOK_SECRET`

El webhook manejará automáticamente:
- Confirmaciones de pago
- Actualizaciones de estado
- Reembolsos (si aplica)

## 💡 Notas importantes

- El precio es **6,99 CHF** (sin decimales extras)
- Es un **pago único** (one-time), no una suscripción
- El tracking se hace en el **navegador del usuario** (localStorage)
- Si el usuario limpia sus cookies/localStorage, puede volver a generar un CV gratis
- Esto es intencional para evitar fricción con usuarios legítimos

## 🎨 Mejoras futuras (opcional)

Podrías considerar:
- Añadir un sistema de autenticación para trackear usuarios entre dispositivos
- Ofrecer paquetes (3 CVs por 15 CHF, 10 CVs por 40 CHF)
- Sistema de referidos (genera 1 CV gratis por cada amigo que pague)
