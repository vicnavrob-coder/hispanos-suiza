#!/bin/bash

# Script para renovar tokens de Facebook/Instagram y publicar update del template
# Uso: ./scripts/renovar-tokens-publicar.sh

set -e

echo "╔══════════════════════════════════════════════════════════╗"
echo "║  🇨🇭 Renovar Tokens y Publicar Actualización Template  ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

echo "📋 PASO 1: Obtener Token de Facebook"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Abre esta URL en tu navegador:"
echo "   👉 https://developers.facebook.com/tools/explorer/"
echo ""
echo "2. En la página:"
echo "   • Selecciona la aplicación (o crea una nueva)"
echo "   • Haz clic en 'Get User Access Token'"
echo "   • Selecciona estos permisos:"
echo "     ✓ pages_show_list"
echo "     ✓ pages_read_engagement"
echo "     ✓ pages_manage_posts"
echo "     ✓ pages_manage_metadata"
echo "     ✓ instagram_basic"
echo "     ✓ instagram_content_publish"
echo ""
echo "3. Haz clic en 'Generate Access Token'"
echo "4. Autoriza si te lo pide"
echo "5. Copia el token que aparece"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

read -p "Pega el Access Token aquí: " ACCESS_TOKEN

if [ -z "$ACCESS_TOKEN" ]; then
    echo "❌ Error: Token vacío"
    exit 1
fi

echo ""
echo "✅ Token recibido (${#ACCESS_TOKEN} caracteres)"
echo ""

# Guardar tokens en .env.local
echo "📝 PASO 2: Guardando tokens en .env.local..."

ENV_FILE=".env.local"

# Backup del .env.local actual
cp "$ENV_FILE" "${ENV_FILE}.backup.$(date +%Y%m%d_%H%M%S)"

# Actualizar o añadir tokens
grep -v "FACEBOOK_ACCESS_TOKEN\|INSTAGRAM_ACCESS_TOKEN" "$ENV_FILE" > "${ENV_FILE}.tmp" || true
echo "FACEBOOK_ACCESS_TOKEN=$ACCESS_TOKEN" >> "${ENV_FILE}.tmp"
echo "INSTAGRAM_ACCESS_TOKEN=$ACCESS_TOKEN" >> "${ENV_FILE}.tmp"
mv "${ENV_FILE}.tmp" "$ENV_FILE"

echo "✅ Tokens guardados"
echo ""

# Verificar que los IDs estén en el .env
if ! grep -q "FACEBOOK_PAGE_ID" "$ENV_FILE"; then
    echo "FACEBOOK_PAGE_ID=1264239076783291" >> "$ENV_FILE"
fi

if ! grep -q "INSTAGRAM_BUSINESS_ACCOUNT_ID" "$ENV_FILE"; then
    echo "INSTAGRAM_BUSINESS_ACCOUNT_ID=17841415256784068" >> "$ENV_FILE"
fi

echo "📱 PASO 3: Publicando en redes sociales..."
echo ""

# Ejecutar script de publicación
export $(grep -E '^(FACEBOOK|INSTAGRAM)_' "$ENV_FILE" | xargs)

node /tmp/publish-template.js

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ ¡Proceso completado!"
echo ""
echo "📊 Próximos pasos:"
echo "  • Verifica los posts en Facebook e Instagram"
echo "  • Monitorea métricas en los próximos días"
echo "  • Los tokens duran ~60 días"
echo ""
