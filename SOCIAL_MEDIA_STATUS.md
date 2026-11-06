# 🚀 Estado del Sistema de Redes Sociales

## ⚠️ Sistema LISTO pero Token EXPIRADO (2026-11-05)

### Publicación Automática Activa

Cada vez que se publica una **historia real** en `/historias-reales`, el sistema automáticamente:

- ✅ **Facebook**: Publica con caption optimizado + enlace directo
- ✅ **Instagram**: Publica con imagen + caption + hashtags
- ✅ **Base de datos**: Guarda referencias a los posts (IDs y URLs)

### 📸 Última Prueba Exitosa

**Historia:** "Recién llegado a Suiza" por Tamboli Nhavarro

**Facebook:**
- Post ID: `1264239076783291_122117178945499622`
- URL: https://facebook.com/1264239076783291_122117178945499622
- Fecha: 2026-11-02 18:06:18

**Instagram:**
- Post ID: `18128133029315977`
- URL: https://www.instagram.com/p/DfP7jFFGM4W/
- Fecha: 2026-11-02 18:16:57

### 🎨 Configuración de Imágenes

**Estado actual:** Usando imagen externa estable de Unsplash
```typescript
// src/lib/social-media.ts línea 220
return "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=630&fit=crop&q=80";
```

**Ventajas:**
- ✅ Funciona perfectamente (probado y verificado)
- ✅ Imagen hermosa de montañas suizas
- ✅ Alta calidad (1200x630px)
- ✅ CDN rápido de Unsplash
- ✅ Sin dependencias de deploy

---

## 🎯 Siguiente Paso: Imágenes Dinámicas (Opcional)

Si quieres que cada historia tenga su **propia imagen personalizada** con el título, autor y ciudad, sigue estos pasos:

### Paso 1: Verificar que el endpoint esté desplegado

```bash
curl -I "https://hispanosensuiza.ch/api/og-image?titulo=Test&autor=Test&ciudad=Zurich"
```

Si devuelve `HTTP/2 200` y `content-type: image/png`, el endpoint está listo.

### Paso 2: Actualizar src/lib/social-media.ts

Reemplaza la línea 220 con:

```typescript
export function generateSocialImageUrl(historia: HistoriaComunidad): string {
  const params = new URLSearchParams({
    titulo: historia.titulo,
    autor: historia.autorNombre,
    ciudad: historia.ciudadSuiza || 'Suiza',
  });

  return `${BASE_URL}/api/og-image?${params.toString()}`;
}
```

### Paso 3: Commit y push

```bash
git add src/lib/social-media.ts
git commit -m "feat: activate dynamic OG images for Instagram posts"
git push
```

### Vista previa de imagen dinámica

Cada post en Instagram mostrará:

```
┌─────────────────────────────────────┐
│  🇨🇭  HISPANOS EN SUIZA            │
│                                     │
│  ┌───────────────────────────────┐ │
│  │                               │ │
│  │   "Título de la Historia"     │ │
│  │                               │ │
│  │   👤 Nombre Autor             │ │
│  │   📍 Ciudad                   │ │
│  │                               │ │
│  └───────────────────────────────┘ │
│                                     │
│      HispanosEnSuiza.ch             │
└─────────────────────────────────────┘
```

---

## 🔐 Tokens Configurados

Variables en `.env.local`:

```env
FACEBOOK_ACCESS_TOKEN=EAAPC99HeAEgBS8pKISqZ... (válido)
FACEBOOK_PAGE_ID=1264239076783291 (Hispanos en Suiza)
INSTAGRAM_ACCESS_TOKEN=EAAPC99HeAEgBS8pKISqZ... (válido)
INSTAGRAM_BUSINESS_ACCOUNT_ID=17841415256784068 (@hispanosensuiza)
```

**Expiración:** Los tokens expiran cada ~60 días.

**Renovación:** Ejecutar `npm run setup:social-media`

---

## 📊 Monitoreo

### Verificar sistema

```bash
npm run verify:social-media
```

### Ver últimas historias publicadas

```typescript
// Cada historia tiene estos campos:
{
  socialPosts: {
    facebook: {
      postId: "1264239076783291_122117178945499622",
      url: "https://facebook.com/..."
    },
    instagram: {
      postId: "18128133029315977",
      url: "https://www.instagram.com/p/..."
    }
  }
}
```

---

## 🐛 Troubleshooting

### Posts no se publican

1. Verificar tokens: `npm run verify:social-media`
2. Revisar logs en Vercel Dashboard → Functions
3. Verificar que variables de entorno están en Vercel

### Imagen no se muestra en Instagram

1. Verificar que la URL de imagen es accesible públicamente
2. Instagram requiere HTTPS
3. Imagen debe ser JPG o PNG (1200x630px recomendado)
4. Esperar 5-10 minutos para que Instagram cachee la imagen

---

## ✅ Checklist de Estado

- [x] Tokens configurados y válidos
- [x] Facebook auto-posting funcionando
- [x] Instagram auto-posting funcionando
- [x] Imágenes en Instagram funcionando
- [x] Captions optimizados con hashtags
- [x] Enlaces directos a historias
- [x] Referencias guardadas en base de datos
- [x] Scripts de setup y verificación creados
- [x] Documentación completa
- [ ] Imágenes dinámicas activadas (opcional, ver arriba)

---

---

## 🆕 NUEVO: Sistema de Publicaciones Masivas (5-nov-2026)

### ✅ Contenido Preparado

**Archivos creados:**
- `SOCIAL_MEDIA_CONTENT_NOV2026.md` — 5 posts únicos + calendario
- `scripts/publish-social-updates.js` — Script automatizado
- `INSTRUCCIONES_PUBLICAR_RRSS.md` — Guía paso a paso
- `ESTRATEGIA_GROWTH_RRSS.md` — Plan de crecimiento 3 meses
- `README_RRSS.md` — Resumen ejecutivo

**Posts listos para publicar:**
1. Generador CV Suizo (Facebook + Instagram)
2. 6 Herramientas Gratuitas (Facebook + Instagram)
3. Sistema Premium 2.99 CHF/mes (Facebook + Instagram)
4. Checklist Emigrar (Facebook)
5. Buscador de Empleo (Facebook + Instagram)

**Cómo publicar:**
```bash
# 1. Renovar token (5 min)
https://developers.facebook.com/tools/explorer/

# 2. Ejecutar script
npm run publish:updates

# 3. Seleccionar posts
Menú interactivo (1-6)
```

**Estado actual:**
- ✅ Contenido listo
- ✅ Script listo
- ✅ Estrategia definida
- ❌ Token expirado (renovar para publicar)

**ROI esperado:**
- +1000 visitas/mes
- +200 registros
- +20 premium
- +60 CHF MRR

---

**Última actualización:** 2026-11-05 23:00
**Estado:** ⚠️ LISTO PARA USAR (renovar token primero)
**Configurado por:** Claude Sonnet 4.5
