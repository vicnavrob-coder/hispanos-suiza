# 📊 Dashboard de Sistemas - HispanosEnSuiza

**Sistema de monitoreo completo para todos los componentes del proyecto**

---

## 🎯 Uso Rápido

### Ver Dashboard Visual (HTML)
```bash
npm run dashboard
```
Abre automáticamente el dashboard HTML en tu navegador.

### Ver Estado en Terminal
```bash
npm run status
```
Muestra el estado de todos los sistemas directamente en la terminal.

---

## 📋 Sistemas Monitoreados

### 1. **Deployment & Hosting** 🚀
- **Vercel Production:** Estado del sitio en producción
- **Latest Deployment:** Último deployment y su estado

### 2. **Frontend Pages** 📄
- **Newsletter Landing:** /newsletter
- **Swiss Starter Pack:** /productos/swiss-starter-pack
- **Template Emigrar:** /productos/template-emigrar-suiza
- **Home Page:** Página principal

### 3. **API Endpoints** 🔌
- **Newsletter API (valid):** Acepta valores correctos
- **Newsletter API (validation):** Rechaza valores incorrectos

### 4. **Database & Storage** 💾
- **GitHub Gist:** Base de datos de suscriptores y compras

### 5. **Email System** 📧
- **Environment Variables:** Verifica variables de Gmail SMTP

### 6. **Payment System** 💳
- **Stripe:** Modo LIVE/TEST y estado

### 7. **Build System** 🔧
- **Dependencies:** Paquetes npm instalados

---

## 🎨 Dashboard Visual

El dashboard HTML incluye:

- **Resumen ejecutivo:** Porcentaje de salud del sistema
- **Cards de métricas:** Operativos, Advertencias, Errores
- **Vista por secciones:** Cada sistema agrupado lógicamente
- **Indicadores visuales:**
  - 🟢 Verde: Operativo
  - 🟡 Amarillo: Advertencia
  - 🔴 Rojo: Error
- **Auto-refresh:** Se actualiza automáticamente cada 5 minutos
- **Responsive:** Funciona en desktop y móvil

---

## 📊 Interpretación de Estados

### ✅ Operativo (OK)
Sistema funcionando correctamente. No requiere acción.

**Ejemplos:**
- Vercel Production: HTTP 200
- Newsletter API: Acepta requests válidos
- Stripe: Modo LIVE configurado

### ⚠️ Advertencia (WARNING)
Sistema funciona pero requiere atención.

**Ejemplos:**
- Latest Deployment: No se pudo obtener info (token faltante)
- Environment Variables: Alguna variable faltante
- Stripe: En modo TEST (debería estar en LIVE)

### ❌ Error (ERROR)
Sistema con fallo crítico que requiere corrección inmediata.

**Ejemplos:**
- Newsletter API: No responde
- GitHub Gist: No se puede acceder
- Build System: Dependencias faltantes

---

## 🔧 Troubleshooting

### Dashboard no se genera

**Problema:** `FileNotFoundError` o error de Python

**Solución:**
```bash
# Verificar que Python 3 está instalado
python3 --version

# Hacer scripts ejecutables
chmod +x scripts/check-systems.py scripts/generate-dashboard.py

# Ejecutar manualmente
cd ~/hispanos-suiza-dev
python3 scripts/generate-dashboard.py
```

### Variables de entorno no detectadas

**Problema:** Sistema reporta variables faltantes

**Solución:**
1. Verificar que `.env.local` existe en la raíz del proyecto
2. Verificar que contiene las variables necesarias:
   ```
   NEWSLETTER_GMAIL_USER=...
   NEWSLETTER_GMAIL_PASS=...
   STRIPE_SECRET_KEY=...
   GITHUB_TOKEN=...
   ```

### API endpoints fallan

**Problema:** APIs devuelven 500 o timeout

**Solución:**
1. Verificar que el sitio está desplegado en Vercel
2. Verificar variables de entorno en Vercel Dashboard
3. Revisar logs en: https://vercel.com/vnt11/hispanos-suiza/logs

### Latest Deployment muestra warning

**Problema:** No se puede obtener info del último deployment

**Solución:**
1. Verificar que `VERCEL_TOKEN` está en `.env.local`
2. Obtener token en: https://vercel.com/account/tokens
3. Agregar a `.env.local`:
   ```
   VERCEL_TOKEN=vcp_...
   ```

---

## 📁 Archivos Generados

### `system-status.json`
JSON con el estado detallado de todos los sistemas.

**Ubicación:** Raíz del proyecto

**Uso:**
```bash
# Leer con jq (si está instalado)
cat system-status.json | jq .

# O simplemente abrir en editor
```

### `dashboard.html`
Dashboard visual HTML con todos los sistemas.

**Ubicación:** Raíz del proyecto

**Uso:**
```bash
open dashboard.html
# o
npm run dashboard
```

---

## 🔄 Automatización

### Monitoreo Continuo

Puedes configurar CRON para ejecutar verificaciones periódicas:

```bash
# Cada hora
0 * * * * cd ~/hispanos-suiza-dev && python3 scripts/check-systems.py >> logs/health-check.log 2>&1
```

### Integración CI/CD

Agregar a GitHub Actions para verificar en cada deployment:

```yaml
- name: Check Systems Health
  run: npm run status
```

---

## 🎓 Extender el Dashboard

### Agregar Nuevo Sistema

1. **Editar `check-systems.py`:**
   ```python
   # Agregar nueva verificación
   def check_mi_sistema():
       # Tu lógica aquí
       return {'status': 'ok', 'info': '...'}

   # En generate_report():
   mi_check = check_mi_sistema()
   report['systems']['mi_sistema'] = mi_check
   ```

2. **Editar `generate-dashboard.py`:**
   ```python
   # Agregar a sections
   sections = {
       'Mi Nueva Sección': [
           'mi_sistema'
       ]
   }

   # Agregar nombre formateado
   names = {
       'mi_sistema': 'Mi Sistema Custom'
   }
   ```

### Agregar Métricas Custom

Puedes agregar checks adicionales como:
- Tiempo de respuesta de APIs
- Número de suscriptores actual
- Ventas del mes
- Tráfico del sitio
- Errores en logs

---

## 📊 Métricas de Salud

### Excelente (100%)
Todos los sistemas operativos. Ninguna advertencia.

**Acción:** Ninguna. Todo perfecto.

### Bueno (80-99%)
Mayoría de sistemas operativos con algunas advertencias menores.

**Acción:** Revisar advertencias cuando tengas tiempo.

### Crítico (<80%)
Múltiples sistemas con errores.

**Acción:** Revisar inmediatamente. Algo importante está fallando.

---

## 🚀 Mejoras Futuras

### Implementadas ✅
- Dashboard visual HTML
- Verificación de endpoints
- Estado de deployment
- Métricas de build
- Auto-refresh

### Planeadas 📋
- [ ] Dashboard en tiempo real (WebSocket)
- [ ] Historial de estados (gráficas)
- [ ] Alertas por email/Telegram
- [ ] Integración con Vercel Analytics
- [ ] Métricas de performance
- [ ] Monitoreo de CRON jobs
- [ ] Estado de redes sociales (Meta API)

---

## 📞 Soporte

### Dashboard no muestra datos correctos

1. **Regenerar dashboard:**
   ```bash
   npm run dashboard
   ```

2. **Verificar timestamp:**
   - En el dashboard HTML mira "Última actualización"
   - Debe ser reciente (<5 min)

3. **Revisar system-status.json:**
   - Debe tener datos frescos
   - Timestamp debe coincidir con ejecución

### Sistemas marcan error pero funcionan

Esto puede ocurrir si:
- El check es muy estricto
- Timeout muy corto
- Variables de entorno en memoria pero no en .env.local

**Solución:** Revisar lógica del check en `check-systems.py`

---

## 📖 Documentación Relacionada

- **Deployment:** `DEPLOYMENT-COMPLETO-18-NOV-2026-FIX-VALIDATION.md`
- **Scripts de deployment:** `DEPLOY-NOW.md`
- **Estado del proyecto:** `ESTADO-PROYECTO-COMPLETO.md`

---

**Creado:** 18 Nov 2026
**Última actualización:** 18 Nov 2026
**Mantenido por:** Claude Sonnet 4.5
