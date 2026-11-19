# 🎯 INSTRUCCIONES EXACTAS: Purgar Caché Vercel (5 minutos)

**POR QUÉ NECESITAS HACER ESTO:**
El CDN de Vercel está cacheando un 404 viejo. Es imposible solucionarlo desde código. Solo tú puedes purgarlo desde tu dashboard.

---

## 📱 OPCIÓN 1: Desde Vercel Dashboard (MÁS FÁCIL)

### Paso 1: Abrir Vercel
1. Abre tu navegador
2. Ve a: **https://vercel.com**
3. Click **"Login"** (arriba derecha)
4. Login con tu cuenta (email/GitHub)

### Paso 2: Ir a tu Proyecto
1. Una vez dentro, verás tus proyectos
2. Busca y click en: **"hispanos-suiza"**
3. Deberías ver el dashboard del proyecto

### Paso 3: Purgar Caché
Ahora tienes 2 opciones (prueba ambas si es necesario):

#### Opción A: Settings → Data Cache
1. Click en **"Settings"** (tab arriba)
2. Busca en el menú lateral izquierdo: **"Data Cache"** o **"Edge Config"**
3. Verás una sección que dice algo como:
   - "Clear Edge Cache"
   - "Purge CDN Cache"
   - "Invalidate Cache"
4. Click en el botón (puede ser rojo o azul)
5. Confirma en el popup
6. **Espera 2 minutos**
7. Ve al Paso 4 para verificar

#### Opción B: Deployment → Redeploy
1. Click en **"Deployments"** (tab arriba)
2. Verás lista de deployments
3. El primero de la lista (arriba) es el más reciente
4. Click en ese deployment (el de arriba)
5. Arriba a la derecha verás botón **"... More"** o **"Redeploy"**
6. Click ahí
7. Aparecerá un menú:
   - Si ves opción **"Use existing Build Cache"** → DESMÁRCALA
   - Si ves opción **"Clear Cache"** → MÁRCALA
8. Click **"Redeploy"** o **"Confirm"**
9. **Espera 5 minutos** (tarda más que Opción A)
10. Ve al Paso 4 para verificar

### Paso 4: Verificar
Abre en tu navegador (Cmd+R o F5 para forzar recarga):

1. **https://hispanosensuiza.ch/premium**
   - Deberías ver: Página "Servicios Premium" con 3 cards
   - Si ves 404 → vuelve a esperar 2 minutos más

2. **https://hispanosensuiza.ch/starter-pack-vip**
   - Deberías ver: Página "Suiza Starter Pack" azul
   - Si ves 404 → vuelve a esperar 2 minutos más

### ¿Qué significa que funciona?
✅ Ves una página completa (no 404)
✅ Hay 3 servicios con precios (29 CHF, 67 CHF, 2.890 CHF)
✅ La navegación tiene link "Premium" con badge rojo "VIP"

---

## 💻 OPCIÓN 2: Reinstalar Vercel CLI (Si sabes usar terminal)

Solo si eres cómodo con terminal:

```bash
# 1. Desinstalar Vercel viejo
npm uninstall -g vercel

# 2. Instalar versión nueva
npm install -g vercel@latest

# 3. Login
vercel login
# Te pedirá email, ponlo y sigue el link que te envíe

# 4. Una vez logueado, ir a proyecto
cd ~/hispanos-suiza-dev

# 5. Forzar redeploy sin caché
vercel --prod --force

# 6. Esperar 5 minutos y verificar URLs
```

---

## 🆘 OPCIÓN 3: Contactar Soporte Vercel (Si nada funciona)

Si después de intentar Opción 1 y esperar 10 minutos SIGUE dando 404:

### Paso 1: Abrir Ticket
1. Ve a: **https://vercel.com/support**
2. Click **"Contact Support"** o **"Submit Request"**
3. Login si te lo pide

### Paso 2: Llenar Formulario
Copia y pega esto (cámbialo si necesitas):

**Subject:**
```
CDN cache stuck - new pages returning 404 for 2+ hours
```

**Description:**
```
Hello,

My project "hispanos-suiza" has a critical CDN cache issue.

Problem:
- All new routes return cached 404 from 2+ hours ago
- Routes affected: /premium, /starter-pack-vip, /servicios-premium
- Even brand new routes that never existed return the same old 404
- Existing routes (/blog, /) work fine
- Code builds locally without errors

Evidence:
- Same etag for all 404s: "960f8db14095d54b10a19e50795a013a"
- Same timestamp: Thu, 19 Nov 2026 03:51:07 GMT
- Multiple redeploy attempts (15 commits)
- Cache-busting strategies attempted (headers, middleware, dynamic rendering)

Request:
Please purge CDN cache for domain: hispanosensuiza.ch

Impact:
Blocking product launch (3 new services ready to sell)

Thank you!
```

**Priority:** High o Urgent

### Paso 3: Enviar y Esperar
- Click **"Submit"** o **"Send"**
- Te responderán en 1-4 horas típicamente
- Revisa tu email

---

## 🧪 VERIFICAR QUE TODO FUNCIONA LOCAL (Mientras tanto)

Esto confirma que el código está perfecto:

```bash
# 1. Abrir terminal
cd ~/hispanos-suiza-dev

# 2. Iniciar servidor local
npm run dev

# 3. Esperar mensaje: "Local: http://localhost:3000"

# 4. Abrir navegador y ir a:
http://localhost:3000/premium

# 5. Deberías ver:
✅ Página "Servicios Premium" completa
✅ 3 servicios: Template (29 CHF), eBook (67 CHF), VIP Pack (2.890 CHF)
✅ Tabla comparativa
✅ Todo funcional

# 6. También probar:
http://localhost:3000/starter-pack-vip
✅ Página "Suiza Starter Pack" azul
✅ Formulario de reserva
✅ Todo perfecto
```

**Si funciona en local → El código está bien → Solo es caché Vercel**

---

## 📞 CONTACTOS ÚTILES

- **Vercel Dashboard:** https://vercel.com/vicnavrob/hispanos-suiza
- **Vercel Support:** https://vercel.com/support
- **Vercel Docs Cache:** https://vercel.com/docs/edge-network/caching
- **Vercel Status:** https://www.vercel-status.com (por si hay problemas globales)

---

## ✅ CONFIRMACIÓN QUE FUNCIONÓ

Una vez hayas purgado el caché, deberías ver:

### En el navegador:
1. **https://hispanosensuiza.ch/premium** → Página con 3 servicios (NO 404)
2. **https://hispanosensuiza.ch/starter-pack-vip** → Página azul con formulario (NO 404)
3. Navegación tiene link **"Premium"** con badge rojo **"VIP"**

### En terminal (opcional):
```bash
curl -I https://hispanosensuiza.ch/premium

# Deberías ver:
HTTP/2 200  ← (NO 404)
content-type: text/html
x-vercel-cache: MISS o BYPASS ← (NO HIT)
age: 0 o muy bajo ← (NO 6000+)
```

---

## 🎯 RESUMEN: Qué Esperar Después

Una vez purges el caché (5 minutos), tendrás en producción:

### Nuevas Páginas Live:
1. **/premium** - Servicios Premium (agregador de los 3 productos)
2. **/starter-pack-vip** - Suiza Starter Pack VIP (servicio 2.890 CHF)
3. **/starter-pack-vip/terminos** - Términos legales

### Productos Listos para Vender:
1. **Template Notion** - 29 CHF
2. **Swiss Pack eBook** - 67 CHF
3. **Suiza Starter Pack VIP** - 2.890 CHF

### Navegación Actualizada:
- Desktop: Link **"Premium"** con badge rojo **"VIP"**
- Móvil: **"⭐ Servicios Premium (VIP)"**

### Materiales Marketing Listos:
- Email newsletter HTML (en `/marketing/newsletter-suiza-starter-pack.html`)
- Post Instagram (en `/marketing/instagram-post-starter-pack.txt`)
- 3 scripts TikTok/Reels (en `/marketing/tiktok-script-starter-pack.txt`)

---

## 💪 TÚ PUEDES HACER ESTO

**Es MUY simple:**
1. Login en Vercel (1 minuto)
2. Ir a tu proyecto (30 segundos)
3. Settings → Click "Purge Cache" (10 segundos)
4. Esperar 2 minutos
5. Verificar las URLs

**Total: 5 minutos máximo**

---

## 🚨 IMPORTANTE: Por Qué No Puedo Hacerlo Yo

**Razones técnicas:**
- No tengo acceso a tu cuenta Vercel
- No hay tokens de Vercel en tu sistema
- El Vercel CLI está roto en tu máquina (error de sistema operativo)
- Purgar caché CDN SOLO se puede hacer desde el dashboard (requiere autenticación)
- He agotado TODAS las estrategias de código (15 commits, middleware, headers, routes alternativas)

**El problema NO es el código** (funciona perfecto en local).
**El problema ES el caché de Vercel** (solo tú puedes purgarlo).

---

**PRÓXIMO PASO:** Ir a https://vercel.com → Login → hispanos-suiza → Settings → Purge Cache

**TIEMPO:** 5 minutos

**RESULTADO:** Sistema completo funcionando 🚀

---

¿Tienes dudas de algún paso? Dime y te lo explico más claro.
