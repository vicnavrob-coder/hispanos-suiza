# 🧪 Guía Testing Local - Suiza Starter Pack

**Mientras Vercel resuelve el caché, puedes probar TODO localmente**

---

## 🚀 Iniciar Servidor Local

```bash
cd ~/hispanos-suiza-dev
npm run dev
```

Espera a ver:
```
✓ Ready in 3.2s
○ Local:    http://localhost:3000
```

---

## ✅ URLs para Probar

Abre en tu navegador:

### 1. Landing Page Principal
**URL:** http://localhost:3000/suiza-starter-pack

**Qué deberías ver:**
- ✅ Hero azul con "Llega a Suiza con Todo Resuelto"
- ✅ Sección "El Problema de Llegar Solo"
- ✅ 6 componentes del servicio con iconos
- ✅ Tabla de precios: 2.890 CHF
- ✅ Banner oferta beta: 2.290 CHF (600 descuento)
- ✅ "Cómo funciona" - 3 pasos
- ✅ FAQ con 6 preguntas expandibles
- ✅ Formulario de reserva al final

### 2. Términos y Condiciones
**URL:** http://localhost:3000/suiza-starter-pack/terminos

**Qué deberías ver:**
- ✅ Página completa con 13 secciones legales
- ✅ Link para volver a /suiza-starter-pack
- ✅ Política de cancelación clara
- ✅ Garantía 15 días
- ✅ Footer con contacto

### 3. Navegación
**En cualquier página, verifica el header:**
- ✅ Link "Swiss Pack" con badge rojo "Nuevo"
- ✅ Al hacer click, va a /suiza-starter-pack
- ✅ En móvil (responsive), link "🇨🇭 Swiss Starter Pack (NUEVO)"

---

## 📧 Probar Sistema de Emails

### Paso 1: Llenar Formulario

1. Ve a: http://localhost:3000/suiza-starter-pack
2. Scroll hasta el formulario al final
3. Llena con estos datos:

```
Nombre: Victor Test
Email: vic_nav@hotmail.com (o tu email personal)
Teléfono: +41 76 123 4567
Fecha llegada: (selecciona cualquier fecha futura)
Sector: Hostelería (o cualquier otro)
Mensaje: (opcional) "Esto es una prueba del sistema"
```

4. Click **"Solicitar Mi Plaza"**

### Paso 2: Verificar Respuesta

**En el navegador deberías ver:**
```
✅ ¡Solicitud Recibida!
Te hemos enviado un email de confirmación. Nos pondremos en contacto contigo en las próximas 24 horas.
```

### Paso 3: Verificar Emails

**Email 1: A ti (admin)**
- Revisa: **VNR.IAsolutions@gmail.com**
- Asunto: "🎯 Nueva Solicitud Suiza Starter Pack - Victor Test"
- Contenido:
  - Todos los datos del formulario
  - Diseño HTML profesional
  - Próximos pasos claros

**Email 2: Al cliente**
- Revisa: **vic_nav@hotmail.com** (o el email que pusiste)
- Asunto: "✅ Solicitud recibida - Suiza Starter Pack"
- Contenido:
  - Confirmación de solicitud
  - Qué documentos preparar
  - Resumen de lo solicitado
  - Link de contacto

> **Nota:** Si no llegan emails, revisa:
> - Carpeta SPAM
> - Que las variables NEWSLETTER_GMAIL_USER y NEWSLETTER_GMAIL_PASS estén en `.env.local`

---

## 🎨 Verificar Diseño Responsive

### Desktop (Pantalla Normal)
- Navegación horizontal con todos los links
- Formulario de 2 columnas
- Tablas de precios anchas

### Tablet (Redimensiona navegador a ~768px)
- Navegación se ajusta
- Formulario sigue en 2 columnas
- Todo legible

### Mobile (Redimensiona a ~375px)
- Menú hamburguesa aparece
- Formulario 1 columna
- Botones full-width
- Texto se adapta

---

## 🐛 Verificar Console (Sin Errores)

Abre DevTools (F12 o Cmd+Opt+I):

### Tab Console
**Debería estar limpio, sin:**
- ❌ Errores rojos
- ❌ Warnings de hydration
- ❌ Errores de fetch

### Tab Network
**Al cargar `/suiza-starter-pack`:**
- ✅ Status 200 OK
- ✅ Carga rápida
- ✅ Imágenes de Unsplash cargan OK

**Al enviar formulario:**
- ✅ POST a `/api/starter-pack/solicitud`
- ✅ Status 200 OK
- ✅ Response: `{"success":true}`

---

## 📱 Probar Navegación

### Desde Homepage
1. Ve a: http://localhost:3000
2. Click en **"Swiss Pack"** (header desktop)
   - O abre menú móvil → click **"🇨🇭 Swiss Starter Pack (NUEVO)"**
3. Deberías llegar a `/suiza-starter-pack`

### Desde Starter Pack a Términos
1. En `/suiza-starter-pack`
2. Scroll hasta el footer
3. Click link **"Términos y condiciones"**
4. Deberías llegar a `/suiza-starter-pack/terminos`

### Desde Términos a Starter Pack
1. En `/suiza-starter-pack/terminos`
2. Click **"← Volver"** (arriba izquierda)
3. Deberías volver a `/suiza-starter-pack`

---

## ✅ Checklist Completa

### Funcionalidad
- [ ] Landing page carga sin errores
- [ ] Todos los textos visibles correctamente
- [ ] Imágenes cargan (hero background, Unsplash)
- [ ] Formulario acepta input
- [ ] Validación funciona (prueba dejar campos vacíos)
- [ ] Submit envía correctamente
- [ ] Mensaje de éxito aparece
- [ ] Emails llegan (admin + cliente)
- [ ] Términos page carga OK
- [ ] Navegación funciona

### Diseño
- [ ] Colores correctos (azul #2563eb, blanco, gris)
- [ ] Tipografía legible
- [ ] Espaciado apropiado
- [ ] Botones tienen hover states
- [ ] Responsive funciona (mobile, tablet, desktop)
- [ ] No hay scroll horizontal
- [ ] FAQ acordeones abren/cierran

### Performance
- [ ] Carga rápida (<2 segundos)
- [ ] No hay lag al scrollear
- [ ] Formulario responde rápido
- [ ] Transiciones suaves

---

## 🎉 Si Todo Funciona Local

**¡PERFECTO!** Significa que:

✅ El código está 100% correcto
✅ La funcionalidad es perfecta
✅ Los emails funcionan
✅ El diseño es profesional

**El único problema es el caché de Vercel CDN.**

Una vez que se resuelva el caché (siguiendo `PROBLEMA-DEPLOY-VERCEL.md`), la experiencia en producción será **exactamente igual** a lo que ves en local.

---

## 📸 Screenshots Recomendados

Mientras pruebas local, toma screenshots de:

1. Hero section completa
2. Sección "Qué incluye" (6 componentes)
3. Tabla precios + oferta beta
4. Formulario vacío
5. Mensaje de éxito después de submit
6. Email recibido (admin)
7. Email confirmación (cliente)
8. Página términos

**Para qué:** Usar en posts Instagram/TikTok mientras la página va live.

---

## 🔧 Troubleshooting Local

### Problema: "Port 3000 already in use"
```bash
# Matar proceso en puerto 3000
lsof -ti:3000 | xargs kill -9
# Reintentar
npm run dev
```

### Problema: "Module not found"
```bash
# Reinstalar dependencias
rm -rf node_modules
npm install
npm run dev
```

### Problema: Emails no llegan
```bash
# Verificar variables de entorno
cat .env.local | grep NEWSLETTER_GMAIL

# Deberías ver:
# NEWSLETTER_GMAIL_USER=VNR.IAsolutions@gmail.com
# NEWSLETTER_GMAIL_PASS=mwnmkbgrpjfpjyak
```

### Problema: Error TypeScript
```bash
# Limpiar y rebuild
rm -rf .next
npm run dev
```

---

**🎯 OBJETIVO:** Verificar que todo funciona perfectamente en local mientras Vercel arregla el caché en producción.

**⏱️ TIEMPO:** 15-20 minutos para probar todo
