# 🔐 Configuración de Google OAuth - Guía Paso a Paso

## ✅ Configuración Completa en 5 Minutos

Sigue estos pasos exactamente para configurar Google OAuth en HispanosEnSuiza.

---

## 📋 Paso 1: Acceder a Google Cloud Console

1. Ve a: https://console.cloud.google.com/
2. Inicia sesión con tu cuenta de Google

---

## 📋 Paso 2: Crear o Seleccionar Proyecto

### Opción A: Crear Nuevo Proyecto
1. Clic en el selector de proyectos (arriba a la izquierda)
2. Clic en "NUEVO PROYECTO"
3. Nombre del proyecto: `HispanosEnSuiza`
4. Clic en "CREAR"
5. Espera 30 segundos a que se cree
6. Selecciona el proyecto recién creado

### Opción B: Usar Proyecto Existente
1. Selecciona tu proyecto existente del menú

---

## 📋 Paso 3: Configurar Pantalla de Consentimiento OAuth

1. En el menú lateral, ve a: **APIs y servicios** → **Pantalla de consentimiento de OAuth**
   - URL directa: https://console.cloud.google.com/apis/credentials/consent

2. Selecciona tipo de usuario:
   - ✅ **Externo** (permite cualquier usuario con cuenta de Google)
   - Clic en "CREAR"

3. Completa el formulario:

   **Información de la aplicación**:
   - Nombre de la aplicación: `HispanosEnSuiza`
   - Correo electrónico de asistencia: `tu@email.com`
   - Logotipo de la aplicación: (opcional, puedes omitir)

   **Información de contacto del desarrollador**:
   - Dirección de correo: `tu@email.com`

4. Clic en "GUARDAR Y CONTINUAR"

5. **Permisos** (Scopes):
   - No añadas ningún permiso adicional
   - Clic en "GUARDAR Y CONTINUAR"

6. **Usuarios de prueba** (opcional):
   - Puedes omitir esto
   - Clic en "GUARDAR Y CONTINUAR"

7. **Resumen**:
   - Revisa y clic en "VOLVER AL PANEL"

---

## 📋 Paso 4: Crear Credenciales OAuth 2.0

1. Ve a: **APIs y servicios** → **Credenciales**
   - URL directa: https://console.cloud.google.com/apis/credentials

2. Clic en "**+ CREAR CREDENCIALES**" → "**ID de cliente de OAuth**"

3. Selecciona tipo de aplicación:
   - Tipo: **Aplicación web**

4. Configura los detalles:

   **Nombre**:
   ```
   HispanosEnSuiza Web Client
   ```

   **Orígenes de JavaScript autorizados**:
   ```
   https://hispanosensuiza.ch
   http://localhost:3000
   ```
   (Añade ambos, uno por línea. El localhost es para desarrollo local)

   **URIs de redireccionamiento autorizados**:
   ```
   https://hispanosensuiza.ch/api/auth/callback/google
   http://localhost:3000/api/auth/callback/google
   ```
   (Añade ambos, uno por línea)

5. Clic en "**CREAR**"

---

## 📋 Paso 5: Copiar las Credenciales

Después de crear las credenciales, verás una ventana emergente con:

```
Tu ID de cliente:
123456789012-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com

Tu secreto de cliente:
GOCSPX-abcdefghijklmnopqrstuvwxyz
```

**¡MUY IMPORTANTE!** Copia estos valores ahora. Los necesitarás en el siguiente paso.

---

## 📋 Paso 6: Actualizar .env.local

1. Abre tu archivo `.env.local` en el proyecto

2. Busca estas líneas:
   ```bash
   GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE
   GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET_HERE
   ```

3. Reemplázalas con tus credenciales reales:
   ```bash
   GOOGLE_CLIENT_ID=123456789012-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=GOCSPX-abcdefghijklmnopqrstuvwxyz
   ```

4. Guarda el archivo

---

## 📋 Paso 7: Reiniciar el Servidor

Si tu servidor de desarrollo está corriendo, reinícialo:

```bash
# Detén el servidor (Ctrl + C)
# Inicia de nuevo
npm run dev
```

---

## 🧪 Paso 8: Probar Google OAuth

1. Ve a: http://localhost:3000/auth/signin

2. Verás el botón "**Continuar con Google**"

3. Clic en el botón

4. Selecciona tu cuenta de Google

5. Si ves una pantalla de "Google no ha verificado esta aplicación":
   - Es normal en desarrollo
   - Clic en "**Avanzado**"
   - Clic en "**Ir a HispanosEnSuiza (no seguro)**"
   - Esto solo aparece en desarrollo

6. Acepta los permisos

7. ¡Listo! Deberías estar logueado

---

## ✅ Verificación

Para verificar que Google OAuth funciona correctamente:

1. Inicia sesión con Google
2. Deberías ver tu email y nombre en la sesión
3. Ve a `/herramientas`
4. Deberías estar logueado
5. Intenta usar una función premium → verás el paywall de upgrade

---

## 🚨 Solución de Problemas

### Error: "redirect_uri_mismatch"
**Solución**: Verifica que los URIs de redirección en Google Cloud Console coincidan exactamente:
- Producción: `https://hispanosensuiza.ch/api/auth/callback/google`
- Local: `http://localhost:3000/api/auth/callback/google`

### Error: "invalid_client"
**Solución**: Verifica que hayas copiado correctamente el Client ID y Secret en `.env.local`

### No aparece el botón de Google
**Solución**:
1. Verifica que `.env.local` tenga las credenciales
2. Reinicia el servidor: `npm run dev`
3. Limpia caché: `rm -rf .next && npm run dev`

### "Esta aplicación no está verificada por Google"
**Solución**: Es normal en desarrollo. En producción, puedes:
- Opción 1: Solicitar verificación de Google (proceso largo)
- Opción 2: Mantenerlo así (los usuarios verán advertencia pero pueden continuar)
- Opción 3: Usar solo email passwordless (que ya funciona)

---

## 🔒 Seguridad

### ⚠️ Nunca compartas públicamente:
- ❌ `GOOGLE_CLIENT_SECRET`
- ❌ Tu archivo `.env.local`

### ✅ Puedes compartir públicamente:
- ✅ `GOOGLE_CLIENT_ID` (se expone en el frontend)

### 🛡️ Proteger en producción:
1. Asegúrate de que `.env.local` NO esté en Git:
   ```bash
   # Verificar
   git status
   # Si aparece .env.local, añadirlo a .gitignore
   echo ".env.local" >> .gitignore
   ```

2. En producción (Vercel, etc.), añade las variables de entorno en el panel de configuración

---

## 📊 Estado Después de la Configuración

Una vez configurado Google OAuth, los usuarios podrán:

- ✅ Registrarse con Google (1 clic)
- ✅ Iniciar sesión con Google (1 clic)
- ✅ Registrarse con Email (magic link) ← ya funcionaba antes
- ✅ Iniciar sesión con Email (magic link) ← ya funcionaba antes
- ✅ Suscribirse a Premium
- ✅ Acceder a funciones premium

---

## 🎯 Siguientes Pasos

Después de configurar Google OAuth:

1. ✅ Probar login con Google en local
2. ✅ Probar login con Email (debe seguir funcionando)
3. ✅ Añadir las mismas credenciales en producción (Vercel variables de entorno)
4. ✅ Probar todo el flujo en producción

---

## 📝 Resumen de URLs Importantes

| Qué | URL |
|-----|-----|
| Google Cloud Console | https://console.cloud.google.com/ |
| Credenciales OAuth | https://console.cloud.google.com/apis/credentials |
| Pantalla de consentimiento | https://console.cloud.google.com/apis/credentials/consent |
| Login local | http://localhost:3000/auth/signin |
| Login producción | https://hispanosensuiza.ch/auth/signin |

---

## ✅ Checklist Final

- [ ] Crear/seleccionar proyecto en Google Cloud
- [ ] Configurar pantalla de consentimiento OAuth
- [ ] Crear credenciales OAuth 2.0
- [ ] Añadir orígenes JavaScript autorizados
- [ ] Añadir URIs de redirección
- [ ] Copiar Client ID y Secret
- [ ] Actualizar `.env.local`
- [ ] Reiniciar servidor
- [ ] Probar login con Google
- [ ] Verificar que funciona correctamente

---

**Tiempo estimado total: 5-10 minutos**

*Guía creada: 2026-11-05*
