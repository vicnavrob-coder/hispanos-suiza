# Publicación Automática en Redes Sociales

## 📋 Resumen

Cuando un usuario publica una historia en `/historias-reales`, el sistema:

1. ✅ Guarda la historia en GitHub Gist
2. ✅ Publica automáticamente en Facebook e Instagram
3. ✅ Envía email de agradecimiento al autor
4. ✅ Muestra la historia en la web inmediatamente

---

## 🔑 Credenciales Actuales

### Facebook
- **Page ID:** `1264239076783291`
- **Page:** [@hispanosensuiza](https://facebook.com/hispanosensuiza)
- **Token:** Almacenado en `.env.local` como `FACEBOOK_ACCESS_TOKEN`

### Instagram
- **Business Account ID:** `17841415256784068`
- **Account:** [@hispanosensuiza](https://instagram.com/hispanosensuiza)
- **Token:** Almacenado en `.env.local` como `INSTAGRAM_ACCESS_TOKEN`

### Cuenta de desarrollo
- **Email:** hispanosensuiza@gmail.com
- **Password:** HispanosEnSuiza2026!
- **Facebook Developers:** https://developers.facebook.com

---

## ⚠️ Problema Actual: Tokens Expirados

**Los tokens de Facebook/Instagram expiran cada 60 días.**

Si las publicaciones fallan, es probable que los tokens hayan expirado. Los logs en Vercel mostrarán:

```
[RRSS] ❌ Facebook post failed: { error: { code: 190, message: "Error validating access token" } }
```

---

## 🔄 Cómo Renovar los Tokens (Paso a Paso)

### Opción 1: Usar el Script Automático (Recomendado)

```bash
cd ~/hispanos-suiza-dev
bash scripts/renovar-tokens-publicar.sh
```

El script te guiará paso a paso.

### Opción 2: Manual

#### Paso 1: Acceder a Facebook Developers

1. Ir a: https://developers.facebook.com/tools/explorer/
2. Login con: **hispanosensuiza@gmail.com** / **HispanosEnSuiza2026!**

#### Paso 2: Generar User Access Token

1. En **"Facebook App"**, seleccionar: **HispanosEnSuiza** (crear si no existe)
2. Click en **"Generate Access Token"**
3. Autorizar estos permisos:
   - ✅ `pages_show_list`
   - ✅ `pages_read_engagement`
   - ✅ `pages_manage_posts`
   - ✅ `pages_manage_metadata`
   - ✅ `instagram_basic`
   - ✅ `instagram_content_publish`
4. Click **"Generate Token"**
5. **Copiar el token generado**

#### Paso 3: Obtener Page Access Token

1. En el Graph API Explorer, ejecutar:
   ```
   GET /me/accounts
   ```
2. Buscar la página **HispanosEnSuiza** en la respuesta JSON
3. **Copiar el `access_token` de esa página** (es diferente al User Token)

#### Paso 4: Hacer el Token Long-Lived (60 días)

Ejecutar este cURL (reemplazar los valores):

```bash
curl -X GET "https://graph.facebook.com/v18.0/oauth/access_token" \
  -d "grant_type=fb_exchange_token" \
  -d "client_id=APP_ID" \
  -d "client_secret=APP_SECRET" \
  -d "fb_exchange_token=SHORT_LIVED_PAGE_TOKEN"
```

Esto devuelve un **Long-Lived Token** que dura 60 días.

#### Paso 5: Actualizar `.env.local`

```bash
cd ~/hispanos-suiza-dev

# Editar .env.local
nano .env.local
```

Reemplazar o añadir:
```env
FACEBOOK_ACCESS_TOKEN=NUEVO_TOKEN_AQUI
INSTAGRAM_ACCESS_TOKEN=MISMO_TOKEN_QUE_FACEBOOK
FACEBOOK_PAGE_ID=1264239076783291
INSTAGRAM_BUSINESS_ACCOUNT_ID=17841415256784068
```

**Importante:** Facebook e Instagram usan el mismo token.

#### Paso 6: Verificar que Funciona

```bash
# Test Facebook
curl -X GET "https://graph.facebook.com/v18.0/1264239076783291" \
  -d "fields=name,fan_count" \
  -d "access_token=TU_TOKEN_AQUI"

# Test Instagram
curl -X GET "https://graph.facebook.com/v18.0/17841415256784068" \
  -d "fields=username,followers_count" \
  -d "access_token=TU_TOKEN_AQUI"
```

Si devuelve JSON con datos → ✅ **Token válido**

#### Paso 7: Deploy a Vercel

```bash
# Actualizar variables de entorno en Vercel
vercel env add FACEBOOK_ACCESS_TOKEN
vercel env add INSTAGRAM_ACCESS_TOKEN

# Redeploy
vercel --prod
```

O actualizar manualmente en: https://vercel.com/vicnavrob/hispanos-suiza-dev/settings/environment-variables

---

## 🧪 Probar Publicación

Para probar que todo funciona, publica una historia de prueba desde la web:

1. Ir a: https://hispanosensuiza.ch/historias-reales
2. Login con Google
3. Publicar una historia de prueba
4. Verificar logs en Vercel: https://vercel.com/vicnavrob/hispanos-suiza-dev/logs

**Logs esperados:**
```
[RRSS] 📘 Intentando publicar en Facebook: "Título de prueba"
[RRSS] ✅ Facebook publicado exitosamente - Post ID: 1264239076783291_123456789
[RRSS] 📸 Intentando publicar en Instagram: "Título de prueba"
[RRSS] ✅ Instagram publicado exitosamente - Post ID: 987654321
[historias] ✅ Email de bienvenida enviado a usuario@example.com
```

---

## 🐛 Troubleshooting

### Error: "Error validating access token"
**Causa:** Token expirado (pasan 60 días)
**Solución:** Renovar tokens siguiendo los pasos anteriores

### Error: "Permissions error"
**Causa:** La cuenta hispanosensuiza@gmail.com no tiene permisos sobre la página
**Solución:**
1. Ir a https://facebook.com/hispanosensuiza/settings
2. Añadir hispanosensuiza@gmail.com como admin

### Error: "Invalid OAuth 2.0 Access Token"
**Causa:** Token mal formado o no es Page Access Token
**Solución:** Asegurarse de usar el **Page Access Token** (GET /me/accounts), no el User Token

### No se publican las historias pero no hay error
**Causa:** Logs silenciados o credenciales vacías
**Solución:** Verificar que `.env.local` tiene los 4 valores necesarios

### Instagram falla pero Facebook funciona
**Causa:** Cuenta de Instagram no vinculada a Facebook Business
**Solución:** Ir a https://business.facebook.com y vincular @hispanosensuiza

---

## 📅 Recordatorio de Renovación

**Los tokens expiran cada 60 días.**

Configurar recordatorio en calendario para renovar antes de que expiren:
- **Próxima renovación:** Revisar fecha en Vercel logs
- **Script de renovación:** `bash scripts/renovar-tokens-publicar.sh`

---

## 📚 Documentación Oficial

- **Facebook Graph API:** https://developers.facebook.com/docs/graph-api
- **Instagram Content Publishing:** https://developers.facebook.com/docs/instagram-api/guides/content-publishing
- **Access Tokens:** https://developers.facebook.com/docs/facebook-login/access-tokens
- **Token Debugger:** https://developers.facebook.com/tools/debug/accesstoken/

---

## 🔐 Seguridad

**NUNCA commitear tokens al repositorio.**

Los tokens deben estar SOLO en:
- `.env.local` (local, gitignored)
- Variables de entorno de Vercel (producción)
- Agente personal `/agente-personal/memory/` (backup seguro)

---

Última actualización: 2026-11-18
