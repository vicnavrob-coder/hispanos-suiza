#!/bin/bash
# Script automatizado para deployment en Vercel
# Requiere: VERCEL_TOKEN en variables de entorno

set -e

echo "🚀 Deployment Automatizado - Vercel"
echo "======================================"
echo ""

# Verificar que existe el token
if [ -z "$VERCEL_TOKEN" ]; then
    echo "❌ ERROR: VERCEL_TOKEN no encontrado"
    echo ""
    echo "Para obtener tu token:"
    echo "1. Ir a: https://vercel.com/account/tokens"
    echo "2. Click en 'Create Token'"
    echo "3. Nombre: 'CLI Deploy'"
    echo "4. Copiar el token"
    echo ""
    echo "Luego ejecutar:"
    echo "  export VERCEL_TOKEN='tu_token_aqui'"
    echo "  ./scripts/deploy-vercel.sh"
    echo ""
    exit 1
fi

echo "✓ Token encontrado"
echo ""

# Project info
PROJECT_ID="prj_hql17gTDPY4Jn1ucW2GbAI94gmFq"
GITHUB_ORG="vicnavrob-coder"
GITHUB_REPO="hispanos-suiza"
GITHUB_REF="main"

echo "📦 Triggerando deployment..."
echo "  Proyecto: hispanos-suiza"
echo "  Branch: main"
echo "  Commit: $(git rev-parse --short HEAD)"
echo ""

# Trigger deployment
RESPONSE=$(curl -s -X POST "https://api.vercel.com/v13/deployments" \
  -H "Authorization: Bearer ${VERCEL_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"hispanos-suiza\",
    \"gitSource\": {
      \"type\": \"github\",
      \"org\": \"${GITHUB_ORG}\",
      \"repo\": \"${GITHUB_REPO}\",
      \"ref\": \"${GITHUB_REF}\"
    },
    \"target\": \"production\"
  }")

# Extraer deployment ID
DEPLOYMENT_ID=$(echo "$RESPONSE" | python3 -c "import sys, json; d=json.load(sys.stdin); print(d.get('id', ''))")

if [ -z "$DEPLOYMENT_ID" ]; then
    echo "❌ ERROR: No se pudo crear deployment"
    echo ""
    echo "Respuesta de API:"
    echo "$RESPONSE" | python3 -m json.tool
    exit 1
fi

echo "✓ Deployment creado: $DEPLOYMENT_ID"
echo ""
echo "🔄 Esperando que el deployment esté listo..."
echo ""

# Monitorear status
MAX_ATTEMPTS=60
ATTEMPT=0

while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
    STATUS=$(curl -s "https://api.vercel.com/v13/deployments/${DEPLOYMENT_ID}" \
        -H "Authorization: Bearer ${VERCEL_TOKEN}" \
        | python3 -c "import sys, json; d=json.load(sys.stdin); print(d.get('readyState', 'UNKNOWN'))")

    if [ "$STATUS" == "READY" ]; then
        echo "✅ DEPLOYMENT COMPLETADO"
        echo ""

        # Verificar endpoints
        echo "🔍 Verificando endpoints..."
        echo ""

        sleep 5  # Esperar propagación CDN

        NEWSLETTER_STATUS=$(curl -s -I https://hispanosensuiza.ch/newsletter | head -n 1 | awk '{print $2}')
        SWISS_STATUS=$(curl -s -I https://hispanosensuiza.ch/productos/swiss-starter-pack | head -n 1 | awk '{print $2}')

        echo "  Newsletter page: HTTP $NEWSLETTER_STATUS"
        echo "  Swiss Pack page: HTTP $SWISS_STATUS"
        echo ""

        if [ "$NEWSLETTER_STATUS" == "200" ] && [ "$SWISS_STATUS" == "200" ]; then
            echo "✅ VERIFICACIÓN EXITOSA"
            echo ""
            echo "🎉 TODO FUNCIONANDO CORRECTAMENTE"
        else
            echo "⚠️  Algunos endpoints devuelven errores"
            echo "    Espera 1-2 minutos para propagación de CDN"
        fi

        echo ""
        echo "Inspector URL:"
        echo "  https://vercel.com/vnt11/hispanos-suiza/${DEPLOYMENT_ID}"

        exit 0
    elif [ "$STATUS" == "ERROR" ] || [ "$STATUS" == "CANCELED" ]; then
        echo "❌ DEPLOYMENT FALLÓ"
        echo "   Status: $STATUS"
        echo ""
        echo "Inspector URL:"
        echo "  https://vercel.com/vnt11/hispanos-suiza/${DEPLOYMENT_ID}"
        exit 1
    else
        echo -n "."
        sleep 5
        ATTEMPT=$((ATTEMPT + 1))
    fi
done

echo ""
echo "⏱️  Timeout esperando deployment"
echo "   Revisa manualmente en:"
echo "   https://vercel.com/vnt11/hispanos-suiza/${DEPLOYMENT_ID}"
exit 1
