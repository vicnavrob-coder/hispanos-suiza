# 🎉 Sistema de Eventos en Suiza

Sistema automático de agregación de eventos culturales, fiestas, mercadillos y festivales en Suiza.

## 📋 Características

- ✅ **Scraping automático** de múltiples fuentes
- ✅ **Traducción automática** al español (Claude AI)
- ✅ **Categorización inteligente** por tipo de evento
- ✅ **10 ciudades principales** de Suiza
- ✅ **Actualización automática** semanal (GitHub Actions)
- ✅ **SEO optimizado** para tráfico orgánico
- ✅ **Interfaz responsive** con filtros

## 🗺️ Ciudades Incluidas

1. Zürich
2. Ginebra
3. Basilea
4. Berna
5. Lausana
6. Lucerna
7. Lugano
8. St. Gallen
9. Winterthur
10. Biel/Bienne

## 🏷️ Categorías de Eventos

- 🎄 Mercadillos Navideños
- 🎭 Cultura y Arte
- 🎵 Música y Conciertos
- 🏃 Deportes
- 🍴 Gastronomía
- 🎊 Festivales
- 👨‍👩‍👧 Familia y Niños
- 🌳 Aire Libre
- 🎉 Otros Eventos

## 🛠️ Arquitectura Técnica

### Backend (Scraping)
```
scripts/eventos/
├── scrape_events.py     # Script principal de scraping
├── setup_gist.py        # Crear Gist inicial
└── requirements.txt     # Dependencias Python
```

### Frontend (Next.js)
```
src/
├── app/eventos/
│   ├── page.tsx        # Página principal
│   └── layout.tsx      # Metadata SEO
├── components/
│   ├── EventoCard.tsx  # Card individual
│   └── FiltrosEventos.tsx
├── lib/
│   └── eventos.ts      # Funciones de datos
└── app/api/eventos/
    └── route.ts        # API endpoint
```

### Automation
```
.github/workflows/
└── scrape-eventos.yml  # CRON job semanal
```

## 🚀 Setup Inicial

### 1. Instalar Dependencias Python

```bash
cd scripts/eventos
pip install -r requirements.txt
```

### 2. Crear GitHub Gist

```bash
cd scripts/eventos
python setup_gist.py
```

Esto creará un Gist y te dará el ID. Copia el ID y agrégalo a `.env.local`:

```bash
GIST_ID_EVENTOS=tu_gist_id_aqui
NEXT_PUBLIC_GIST_ID_EVENTOS=tu_gist_id_aqui
```

### 3. Variables de Entorno Necesarias

En `.env.local`:
```bash
# Anthropic (traducción)
ANTHROPIC_API_KEY=sk-ant-...

# GitHub (almacenamiento)
GITHUB_TOKEN=ghp_...
GIST_ID_EVENTOS=...
NEXT_PUBLIC_GIST_ID_EVENTOS=...
```

### 4. Ejecutar Scraping Manual (Primera Vez)

```bash
cd scripts/eventos
python scrape_events.py
```

Esto:
- Scrapeará eventos de múltiples fuentes
- Los traducirá al español
- Los categorizará automáticamente
- Los guardará en el Gist

**Nota:** La primera ejecución puede tomar 10-15 minutos debido a la traducción.

### 5. Verificar en Frontend

```bash
npm run dev
```

Visita: http://localhost:3000/eventos

## 🔄 Actualización Automática

### GitHub Actions CRON Job

El sistema se actualiza automáticamente cada **lunes a las 2:00 AM CET**.

Workflow: `.github/workflows/scrape-eventos.yml`

**Configurar en GitHub:**
1. Ve a Settings > Secrets and variables > Actions
2. Agrega estos secrets:
   - `ANTHROPIC_API_KEY`
   - `GITHUB_TOKEN` (ya existe)
   - `GIST_ID_EVENTOS`

**Ejecutar manualmente:**
1. Ve a Actions > Scrape Eventos Suiza
2. Click en "Run workflow"

## 📊 Fuentes de Datos

### Actuales
- **MySwitzerland.com** - Turismo oficial
- Más fuentes pueden agregarse en el futuro

### Potenciales (TODO)
- EventFrog.ch
- Eventbrite API
- Ticketcorner.ch
- Sitios web oficiales de ciudades

## 🎨 Componentes Frontend

### EventoCard
Muestra un evento individual con:
- Imagen
- Título y descripción
- Fecha y ubicación
- Categoría
- Precio
- Link externo

### FiltrosEventos
Permite filtrar por:
- Ciudad
- Categoría
- Fecha (hoy, esta semana, este mes)

### API Route
`/api/eventos` - Sirve los eventos desde el Gist con caché de 1 hora

## 🔍 SEO

### Metadata
- Título optimizado para búsquedas
- Descripción persuasiva
- Keywords relevantes
- Open Graph para redes sociales

### Sitemap
La ruta `/eventos` está incluida en `sitemap.ts` con:
- Priority: 0.9
- Change frequency: daily

### Keywords Objetivo
- eventos suiza
- fiestas suiza
- mercadillos navideños suiza
- festivales suiza
- eventos zürich
- eventos ginebra
- fiestas latinas suiza

## 🐛 Troubleshooting

### El scraping falla

1. Verificar que las variables de entorno estén configuradas
2. Verificar límites de API de Anthropic
3. Revisar logs en GitHub Actions

### No aparecen eventos en el frontend

1. Verificar que `NEXT_PUBLIC_GIST_ID_EVENTOS` esté configurado
2. Limpiar caché de Next.js: `rm -rf .next`
3. Verificar que el Gist tenga eventos

### Errores de traducción

1. Verificar API key de Anthropic
2. Verificar límites de rate limiting
3. El script tiene delays para evitar saturar la API

## 📈 Monitoreo

### Ver eventos en Gist
Ve a: `https://gist.github.com/{tu_username}/{GIST_ID_EVENTOS}`

### Ver logs de scraping
GitHub Actions > Scrape Eventos Suiza > Última ejecución

### Analytics
Los eventos se trackean automáticamente con Vercel Analytics

## 🔧 Mantenimiento

### Agregar nueva fuente

1. Edita `scripts/eventos/scrape_events.py`
2. Agrega función `scrape_nueva_fuente()`
3. Llámala desde `scrape_all_sources()`
4. Testea localmente
5. Deploy

### Agregar nueva categoría

1. Edita `CATEGORIAS` en `scrape_events.py`
2. Actualiza `FiltrosEventos.tsx` con el nuevo emoji/nombre
3. Redeploy

### Cambiar frecuencia CRON

Edita `.github/workflows/scrape-eventos.yml`:
```yaml
schedule:
  - cron: '0 1 * * 1'  # Cada lunes a las 2 AM CET
```

Sintaxis CRON: `minuto hora día_mes mes día_semana`

## 💰 Costos

### APIs Gratuitas
- GitHub Gist: Gratis
- GitHub Actions: 2000 minutos/mes gratis

### APIs de Pago
- **Anthropic API:** ~$0.003 por evento traducido
  - 100 eventos/semana = $0.30/semana = $1.20/mes
  - 500 eventos/semana = $1.50/semana = $6/mes

**Estimado mensual: $5-10/mes**

## 🚧 Roadmap

### Fase 1 (Actual) ✅
- [x] Scraping básico MySwitzerland
- [x] Traducción automática
- [x] Categorización IA
- [x] Frontend con filtros
- [x] CRON job semanal

### Fase 2 (Próximo mes)
- [ ] Agregar más fuentes (EventFrog, Eventbrite)
- [ ] Mapa interactivo con ubicaciones
- [ ] Sistema de favoritos (guardar eventos)
- [ ] Notificaciones por email de eventos nuevos

### Fase 3 (Futuro)
- [ ] API pública para terceros
- [ ] Integración con Google Calendar
- [ ] Reviews y ratings de eventos
- [ ] Sistema de tickets integrado

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en GitHub Actions
2. Verifica las variables de entorno
3. Contacta al equipo de desarrollo

## 📝 Changelog

### v1.0.0 (23 Nov 2026)
- ✅ Sistema inicial implementado
- ✅ 10 ciudades incluidas
- ✅ 9 categorías de eventos
- ✅ Traducción automática
- ✅ CRON job configurado
- ✅ SEO optimizado

---

**Última actualización:** 23 de noviembre de 2026
**Versión:** 1.0.0
**Estado:** ✅ En producción
