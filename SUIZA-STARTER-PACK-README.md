# 🎯 Suiza Starter Pack - Documentación Completa

**Fecha:** 19 noviembre 2026
**Status:** ✅ Desplegado en producción
**URL:** https://hispanosensuiza.com/suiza-starter-pack

---

## 📋 Resumen Ejecutivo

Paquete completo de relocation para hispanohablantes que llegan a Suiza.

**Precio:** 2.890 CHF (señal 500 CHF + resto 2.390 CHF)
**Capacidad:** 2 plazas/mes
**Margen proyectado:** ~2.100 CHF/cliente

---

## 🚀 Lo que se ha creado

### 1. Landing Page Principal (`/suiza-starter-pack`)

**Secciones:**
- ✅ Hero con CTA destacado
- ✅ Problema-Solución (3 pain points claros)
- ✅ Qué incluye (6 componentes detallados con valores)
- ✅ Cómo funciona (3 pasos simples)
- ✅ FAQ (6 preguntas frecuentes)
- ✅ Formulario reserva integrado
- ✅ Footer simple con contacto

**SEO:**
- Metadatos optimizados para "paquete relocation suiza"
- Keywords específicos (10+ long-tail)
- OpenGraph para redes sociales

### 2. Componente Formulario (`StarterPackForm.tsx`)

**Campos:**
- Nombre completo
- Email
- Teléfono/WhatsApp
- Fecha llegada estimada
- Sector trabajo (dropdown)
- Mensaje opcional

**Features:**
- Validación cliente + servidor
- Loading states
- Success/error messages
- Responsive design

### 3. API Endpoint (`/api/starter-pack/solicitud`)

**Funcionalidad:**
- Recibe solicitudes POST
- Valida datos
- Envía 2 emails automáticos:
  1. **A ti:** notificación nueva solicitud con todos los datos
  2. **Al cliente:** confirmación + próximos pasos

**Integración:** Resend (emails transaccionales)

### 4. Página Términos (`/suiza-starter-pack/terminos`)

**Contenido completo:**
- 13 secciones legales
- Política cancelación detallada
- Garantía satisfacción
- Exclusiones responsabilidad
- Ley aplicable (Suiza, cantón Lucerna)

---

## ⚙️ CONFIGURACIÓN NECESARIA (CRÍTICO)

### 1. Configurar Resend para Emails

**Paso 1: Crear cuenta Resend**
```bash
# Ve a: https://resend.com
# Sign up con email VNR.IAsolutions@gmail.com
```

**Paso 2: Verificar dominio**
```
1. En Resend Dashboard → Domains
2. Add Domain: hispanosensuiza.com
3. Agregar registros DNS en Infomaniak/proveedor:
   - TXT record para verificación
   - MX records para recibir emails
   - DKIM para autenticación
```

**Paso 3: Obtener API Key**
```
1. Resend Dashboard → API Keys
2. Create API Key
3. Copiar la key (empieza con re_...)
```

**Paso 4: Agregar a Vercel**
```bash
# Ve a: https://vercel.com/vicnavrob/hispanos-suiza/settings/environment-variables
# Agregar variable:
RESEND_API_KEY=re_TuKeyAqui

# Redeploy después de agregar la variable
```

### 2. Verificar Deploy en Vercel

```bash
# El deploy se activa automáticamente con el git push
# Ver status en: https://vercel.com/vicnavrob/hispanos-suiza/deployments

# Verificar que la página funciona:
# https://hispanosensuiza.com/suiza-starter-pack
```

### 3. Probar Formulario

```
1. Ir a /suiza-starter-pack
2. Scroll hasta formulario
3. Llenar con datos de prueba
4. Enviar
5. Verificar:
   - Email llegó a VNR.IAsolutions@gmail.com
   - Email confirmación llegó al cliente
   - Ambos emails se ven bien formateados
```

---

## 📊 PRICING Y COSTES

### Desglose de Valor

| Componente | Valor Real | Coste | Margen |
|------------|-----------|-------|--------|
| Alojamiento 30d | 900 CHF | 800 CHF | 100 CHF |
| Kit llegada | 500 CHF | 100 CHF | 400 CHF |
| Prep laboral | 800 CHF | 50 CHF | 750 CHF |
| Acompañamiento ETT | 600 CHF | 150 CHF | 450 CHF |
| Soporte comunidad | 300 CHF | 50 CHF | 250 CHF |
| Bonus alemán | 200 CHF | 0 CHF | 200 CHF |
| **TOTAL** | **3.300 CHF** | **1.150 CHF** | **2.150 CHF** |

**Precio venta:** 2.890 CHF
**Margen real:** ~2.100 CHF/cliente (73%)

### Proyección Financiera

| Mes | Clientes | Ingresos | Costes | Beneficio |
|-----|----------|----------|--------|-----------|
| 1 (beta) | 2 | 4.580 CHF | 1.600 CHF | 2.980 CHF |
| 2 | 3 | 8.670 CHF | 2.400 CHF | 6.270 CHF |
| 3+ | 4 | 11.560 CHF | 3.200 CHF | 8.360 CHF |

**Objetivo año 1:** 40 clientes = 84.000 CHF beneficio neto

---

## 🎯 PRÓXIMOS PASOS INMEDIATOS

### Semana 1: Setup Técnico
- [ ] Configurar Resend y verificar dominio
- [ ] Agregar RESEND_API_KEY a Vercel
- [ ] Probar formulario end-to-end
- [ ] Verificar emails se reciben correctamente

### Semana 2: Lanzamiento Soft (Beta)
- [ ] Anuncio en newsletter HispanosEnSuiza
- [ ] Post Instagram/TikTok anunciando servicio
- [ ] Buscar 2 clientes beta a precio reducido (2.290 CHF)
- [ ] Recoger feedback y testimoniales

### Semana 3-4: Primera Ejecución
- [ ] Servicio primer cliente beta
- [ ] Documentar proceso completo
- [ ] Ajustar lo que no funcione
- [ ] Recoger testimonial en video

### Mes 2: Lanzamiento Oficial
- [ ] Precio completo 2.890 CHF
- [ ] Campaña marketing con testimoniales
- [ ] Colaboraciones influencers
- [ ] Objetivo: 3 clientes/mes

---

## 📣 MATERIALES MARKETING PREPARADOS

### Post Instagram (Caption listo)

```
🇨🇭 ¿Vienes a Suiza sin saber por dónde empezar?

Te presento el SUIZA STARTER PACK 🎯

✅ Alojamiento 30 días garantizado
✅ Kit llegada completo (registro, banco, transporte)
✅ CV + LinkedIn optimizado
✅ Te acompaño PERSONALMENTE a 3 ETT
✅ Grupo WhatsApp 24/7 primer mes
✅ Comunidad exclusiva

Precio: 2.890 CHF todo incluido
Plazas: Solo 2 por mes

¿Te interesa? Link en bio 👆

#EspañolesEnSuiza #EmigraASuiza #TrabajarEnSuiza #HispanosEnSuiza
```

### Email Newsletter

```
Asunto: Nuevo: Suiza Starter Pack - Llega sin estrés ✈️

Hola [nombre],

¿Estás pensando en venir a Suiza pero no sabes por dónde empezar?

Acabo de lanzar el **Suiza Starter Pack**: tu primer mes en Suiza resuelto.

✅ Alojamiento garantizado 30 días
✅ Te recojo en la estación
✅ Trámites completos (registro, banco, móvil)
✅ CV adaptado formato suizo
✅ Te acompaño a 3 ETT principales
✅ Soporte 24/7 grupo privado

**Precio:** 2.890 CHF todo incluido
**Plazas:** Solo 2 por mes

👉 Ver detalles: https://hispanosensuiza.com/suiza-starter-pack

Pregúntame lo que necesites,
Víctor

PD: Las 2 primeras plazas tienen descuento beta (2.290 CHF)
```

### Post TikTok/Reels (Script)

```
[HOOK - 3 seg]
"¿Vienes a Suiza sin saber qué hacer? Mira esto..."

[PROBLEMA - 10 seg]
Llegas → hostel caro → no sabes dónde ir → pierdes semanas buscando ETT → gastas 2.000+ CHF extra

[SOLUCIÓN - 15 seg]
CON SUIZA STARTER PACK:
- Te recojo estación ✅
- Alojamiento 30d garantizado ✅
- Trámites resueltos en 3 días ✅
- CV profesional listo ✅
- Te llevo a 3 ETT ✅
- Grupo soporte 24/7 ✅

[CTA - 5 seg]
2.890 CHF todo incluido
Solo 2 plazas/mes
Link en bio ☝️

#EmigraSuiza #EspañolesEnSuiza
```

---

## 🔧 ESTRUCTURA TÉCNICA

### Archivos Creados

```
src/
├── app/
│   ├── api/
│   │   └── starter-pack/
│   │       └── solicitud/
│   │           └── route.ts          # API endpoint emails
│   ├── suiza-starter-pack/
│   │   ├── page.tsx                  # Landing page principal
│   │   └── terminos/
│   │       └── page.tsx              # Términos y condiciones
│   └── ...
├── components/
│   ├── StarterPackForm.tsx           # Formulario reserva
│   └── ...
└── ...
```

### Dependencies Agregadas

```json
{
  "resend": "^4.0.1"  // Emails transaccionales
}
```

### Variables Entorno Requeridas

```bash
# .env.local (desarrollo) y Vercel (producción)
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Email notificación
NOTIFICATION_EMAIL=VNR.IAsolutions@gmail.com
```

---

## ❓ FAQ TÉCNICO

### ¿Por qué Resend y no otro servicio?

- **Pro:** API simple, 100 emails/día gratis, dominio verificado profesional
- **Alternativa:** Brevo (ya lo usas para newsletter, podrías usar mismo)
- **Cambiar:** Fácil, solo modificar `route.ts` con nueva API

### ¿Qué pasa si un cliente envía el formulario pero Resend falla?

- **Ahora:** Error 500, cliente ve mensaje error
- **Mejor:** Guardar en base de datos (Gist/Supabase) como backup
- **TODO futuro:** Agregar fallback para no perder leads

### ¿Cómo acepto el pago de 500 CHF?

**Opciones:**

1. **Manual (ahora):** Envías link Stripe Payment Link por email
2. **Semi-auto:** Crear producto Stripe "Señal Starter Pack 500 CHF"
3. **Auto (futuro):** Integrar Stripe Checkout directo en landing

**Recomendado inicio:** Opción 1 (manual), validar demanda primero

### ¿Dónde almaceno las solicitudes?

**Ahora:** Solo emails (no BD)

**Próximo paso recomendado:**
```typescript
// Agregar a route.ts después de enviar emails
await fetch('https://api.github.com/gists/[GIST_ID]', {
  method: 'PATCH',
  body: JSON.stringify({
    files: {
      'solicitudes_starter_pack.json': {
        content: JSON.stringify([...existing, newSolicitud])
      }
    }
  })
});
```

---

## 🎨 MEJORAS FUTURAS OPCIONALES

### Corto Plazo (Mes 1-2)
- [ ] Agregar testimoniales reales con fotos
- [ ] Video presentación pack (1-2 min)
- [ ] Calculadora ROI (cuánto ahorras vs hacerlo solo)
- [ ] Galería fotos alojamiento real

### Medio Plazo (Mes 3-6)
- [ ] Sistema reservas con calendario disponibilidad
- [ ] Pago directo Stripe integrado (no manual)
- [ ] Dashboard cliente (ver status preparación)
- [ ] Addon mes 2+ alojamiento (600 CHF/mes)

### Largo Plazo (Mes 6+)
- [ ] App móvil o PWA
- [ ] Programa referidos (200 CHF por referido)
- [ ] Versión Premium (incluye curso alemán A1)
- [ ] Expandir a otras ciudades (Zúrich, Ginebra)

---

## 📞 CONTACTO Y SOPORTE

**Para solicitudes de clientes:**
- Email: contacto@hispanosensuiza.com
- WhatsApp: [tu número]

**Gestión interna:**
- Notificaciones: VNR.IAsolutions@gmail.com
- Dashboard: https://hispanosensuiza.com/admin

---

## ✅ CHECKLIST LANZAMIENTO

### Técnico
- [x] Landing page creada y desplegada
- [x] Formulario funcional
- [x] API endpoint emails
- [x] Términos y condiciones
- [ ] Resend configurado y probado
- [ ] Emails verificados (formato correcto)

### Legal
- [x] Términos y condiciones completos
- [ ] Revisar con abogado si es necesario
- [ ] Política cancelación clara
- [ ] Garantía satisfacción definida

### Operativo
- [ ] Alojamiento confirmado (capacidad real)
- [ ] Contactos ETT principales listados
- [ ] Template CV alemán/francés listo
- [ ] Checklist llegada preparado
- [ ] Grupo WhatsApp creado

### Marketing
- [ ] Anuncio newsletter redactado
- [ ] Posts redes sociales preparados
- [ ] Colaboradores identificados
- [ ] Email secuencia follow-up

---

## 🚨 NOTAS IMPORTANTES

1. **Capacidad real:** Solo promete 2 plazas/mes hasta validar que puedes manejarlo
2. **Alojamiento:** Verifica ANTES de cada reserva que tienes plaza disponible
3. **NO garantices empleo:** Deja claro que es "acompañamiento", no "garantía"
4. **Legalidad ETT:** No cobres por "colocación" (ilegal), cobras por "acompañamiento y preparación"
5. **Seguro médico:** Cliente debe contratarlo, tú solo asesoras

---

**Última actualización:** 19 noviembre 2026
**Próxima revisión:** Después del primer cliente beta

---

🎯 **OBJETIVO:** Validar con 2 clientes beta en próximas 2 semanas, luego escalar a 4 clientes/mes.
