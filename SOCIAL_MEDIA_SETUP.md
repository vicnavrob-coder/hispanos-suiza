# 📱 Configuración de Publicación Automática en Redes Sociales

## 🎯 Resumen

Cada vez que un usuario publica una **historia real** en `/historias-reales`, el sistema automáticamente:

1. ✅ Publica en **Facebook** (página HispanosEnSuiza)
2. ✅ Publica en **Instagram** (cuenta @hispanosensuiza)
3. ✅ Incluye **enlace directo** a la historia en la web
4. ✅ Genera **caption optimizado** con hashtags estratégicos
5. ✅ Guarda referencias de los posts en la base de datos

---

## 🚀 Configuración Rápida (5 minutos)

### 1. Ejecutar script de configuración

```bash
npm run setup:social-media
```

Este script te guiará paso a paso para:
- Obtener tu Page Access Token de Facebook
- Obtener tu Instagram Business Account ID
- Configurar todo automáticamente en `.env.local`

### 2. Verificar que funciona

```bash
npm run verify:social-media
```

Este script verifica:
- ✅ Tokens válidos
- ✅ Permisos correctos
- ✅ Instagram conectado
- ✅ Función de publicación operativa

---

## 📋 Configuración Manual (si prefieres hacerlo a mano)

### Paso 1: Crear App en Facebook Developers

1. Ve a https://developers.facebook.com
2. Inicia sesión con **hispanosensuiza@gmail.com**
3. Click en "Create App" → Tipo: **Business**
4. Nombre: **HispanosEnSuiza**

### Paso 2: Añadir productos necesarios

1. En el dashboard de la app, click "Add Product"
2. Añadir **Facebook Login**
3. Añadir **Instagram Graph API** (opcional)

### Paso 3: Generar Page Access Token

1. Ve a https://developers.facebook.com/tools/explorer/
2. Selecciona tu app "HispanosEnSuiza"
3. Selecciona "User Token"
4. Click "Generate Access Token"
5. Autoriza estos permisos:
   - `pages_show_list`
   - `pages_read_engagement`
   - `pages_manage_posts`
   - `pages_manage_metadata`
   - `instagram_basic` (opcional)
   - `instagram_content_publish` (opcional)

### Paso 4: Obtener Page ID

En Graph API Explorer, ejecuta:
```
GET /me/accounts
```

Busca tu página "HispanosEnSuiza" y copia:
- `id` → FACEBOOK_PAGE_ID
- `access_token` → FACEBOOK_ACCESS_TOKEN

### Paso 5: Obtener Instagram Business Account ID

En Graph API Explorer, ejecuta:
```
GET /PAGE_ID?fields=instagram_business_account
```

Copia el `id` → INSTAGRAM_BUSINESS_ACCOUNT_ID

### Paso 6: Hacer token long-lived (60 días)

```bash
curl "https://graph.facebook.com/v18.0/oauth/access_token" \
  -d "grant_type=fb_exchange_token" \
  -d "client_id=TU_APP_ID" \
  -d "client_secret=TU_APP_SECRET" \
  -d "fb_exchange_token=TU_SHORT_LIVED_TOKEN"
```

### Paso 7: Actualizar .env.local

```env
# Facebook & Instagram - HispanosEnSuiza
FACEBOOK_ACCESS_TOKEN=tu_long_lived_token_aqui
FACEBOOK_PAGE_ID=tu_page_id_aqui
INSTAGRAM_ACCESS_TOKEN=tu_long_lived_token_aqui
INSTAGRAM_BUSINESS_ACCOUNT_ID=tu_instagram_id_aqui
```

---

## 🔧 Cómo Funciona

### Cuando se crea una historia:

```typescript
// src/app/api/historias/route.ts (líneas 91-115)

// 1. Usuario publica historia en /historias-reales
const historia = await createHistoria({...});

// 2. Sistema publica automáticamente en RRSS (background)
publishToAllSocials(historia)
  .then(async (socialPosts) => {
    // 3. Guarda referencias a los posts
    await updateSocialPosts(historia.id, {
      facebook: socialPosts.facebook,
      instagram: socialPosts.instagram,
    });
  });
```

### Caption generado automáticamente:

```typescript
// src/lib/social-media.ts

generateSocialCaption(historia)
// Output ejemplo:
// ✨ Nueva historia de nuestra comunidad
//
// "De Barcelona a Zúrich: Mi primer año en banca"
//
// Llegué sin hablar alemán, con miedo al fracaso y 3,000€ ahorrados...
//
// 📍 Zúrich
// 🌎 España → Suiza
//
// Lee la historia completa en el link de nuestra bio 👆
//
// #HispanosSuiza #VivirEnSuiza #EmigraraSwiss #Zurich
//
// ¿Tienes tu propia historia? Compártela en HispanosEnSuiza.ch 🇨🇭
```

---

## 📝 Archivos Clave

| Archivo | Descripción |
|---------|-------------|
| `src/lib/social-media.ts` | Funciones de publicación en RRSS |
| `src/app/api/historias/route.ts` | API que publica historias |
| `scripts/setup-social-media.ts` | Script de configuración |
| `scripts/verify-social-media.ts` | Script de verificación |
| `.env.local` | Variables de entorno (tokens) |
| `SOCIAL_POSTS_TEMPLATES.md` | Plantillas de posts manuales |

---

## ⚠️ Renovación de Tokens (cada 60 días)

Los tokens de Facebook expiran cada **60 días**. Para renovarlos:

```bash
npm run setup:social-media
```

### ¿Cómo saber cuándo renovar?

1. Los posts dejarán de publicarse automáticamente
2. Verás errores en los logs: `Token expired`
3. Ejecuta `npm run verify:social-media` para confirmar

---

## 🐛 Troubleshooting

### Error: "An active access token must be used"
**Causa:** Token expirado o inválido
**Solución:** Ejecuta `npm run setup:social-media`

### Error: "Insufficient permissions"
**Causa:** Faltan permisos en el token
**Solución:** Al generar el token, asegúrate de autorizar todos los permisos listados

### Error: "Instagram account not found"
**Causa:** Página de Facebook no tiene cuenta de Instagram Business conectada
**Solución:**
1. Ve a tu página de Facebook
2. Settings → Instagram → Connect Account
3. Vuelve a ejecutar el setup

### Posts no se publican
**Causa:** Variables de entorno no configuradas
**Solución:**
1. Verifica que `.env.local` tiene todos los tokens
2. Ejecuta `npm run verify:social-media`
3. Restart del servidor: `npm run dev`

---

## 📊 Monitoreo

### Ver posts publicados

Los posts se guardan en la base de datos (GitHub Gist):

```typescript
// Cada historia tiene estos campos:
{
  socialPosts: {
    facebook: {
      postId: "123456789",
      url: "https://facebook.com/123456789"
    },
    instagram: {
      postId: "987654321",
      url: "..."
    }
  }
}
```

### Logs de publicación

```bash
# Development
tail -f .next/server/app/api/historias/route.js.log

# Production (Vercel)
# Ver en Dashboard > Functions > Logs
```

---

## 🎨 Personalizar Captions

Edita la función en `src/lib/social-media.ts`:

```typescript
export function generateSocialCaption(historia: HistoriaComunidad): string {
  // Personaliza aquí:
  // - Texto del caption
  // - Hashtags
  // - Emojis
  // - Call-to-action
}
```

---

## 🔐 Seguridad

✅ **Tokens en .env.local** (nunca en código)
✅ **.env.local en .gitignore** (nunca se sube a GitHub)
✅ **Tokens en Vercel** (configurar en dashboard → Environment Variables)
✅ **Renovación periódica** (cada 60 días)

---

## 🚀 Deploy a Producción

### En Vercel:

1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Environment Variables
3. Añade todas las variables de `.env.local`:
   ```
   FACEBOOK_ACCESS_TOKEN
   FACEBOOK_PAGE_ID
   INSTAGRAM_ACCESS_TOKEN
   INSTAGRAM_BUSINESS_ACCOUNT_ID
   ```
4. Redeploy el proyecto

### Verificar en producción:

```bash
# Desde tu terminal local
curl https://hispanosensuiza.ch/api/historias
```

---

## 📚 Documentación Oficial

- [Facebook Graph API](https://developers.facebook.com/docs/graph-api/)
- [Instagram Content Publishing](https://developers.facebook.com/docs/instagram-api/guides/content-publishing)
- [Page Access Tokens](https://developers.facebook.com/docs/pages/access-tokens)

---

## ✅ Checklist de Configuración

- [ ] Ejecutado `npm run setup:social-media`
- [ ] Tokens configurados en `.env.local`
- [ ] Ejecutado `npm run verify:social-media` sin errores
- [ ] Probado creando una historia de prueba
- [ ] Verificado post en Facebook
- [ ] Verificado post en Instagram (si está configurado)
- [ ] Configurado variables en Vercel (producción)
- [ ] Calendario de renovación (cada 60 días)

---

**Última actualización:** 2026-11-02
**Versión:** 1.0
**Configurado por:** Claude Sonnet 4.5
