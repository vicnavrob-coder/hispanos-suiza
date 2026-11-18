#!/bin/bash
# Setup y deployment automatizado
# Este script te guiará paso a paso

set -e

echo ""
echo "╔════════════════════════════════════════════════════════╗"
echo "║   🚀 DEPLOYMENT AUTOMÁTICO - Hispanos en Suiza        ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Verificar si ya existe el token
if [ -n "$VERCEL_TOKEN" ]; then
    echo "✓ Token de Vercel encontrado en variables de entorno"
    echo ""
    exec ./scripts/deploy-vercel.sh
fi

# Pedir el token al usuario
echo "Para hacer el deployment necesito tu token de Vercel."
echo ""
echo "📋 PASO 1: Obtener Token"
echo "------------------------"
echo "1. Abre: https://vercel.com/account/tokens"
echo "2. Click en 'Create Token'"
echo "3. Nombre: CLI Deploy"
echo "4. Scope: Full Account"
echo "5. Click 'Create'"
echo "6. COPIA el token (solo se muestra una vez)"
echo ""
echo "El token empieza con: vcp_..."
echo ""
read -p "¿Ya tienes el token? (s/n): " HAS_TOKEN

if [ "$HAS_TOKEN" != "s" ] && [ "$HAS_TOKEN" != "S" ]; then
    echo ""
    echo "Por favor, obtén el token primero y luego ejecuta este script de nuevo."
    echo ""
    exit 0
fi

echo ""
read -sp "Pega tu token aquí: " USER_TOKEN
echo ""
echo ""

if [ -z "$USER_TOKEN" ]; then
    echo "❌ No se ingresó ningún token"
    exit 1
fi

# Validar formato del token
if [[ ! "$USER_TOKEN" =~ ^vcp_ ]]; then
    echo "⚠️  Advertencia: El token no empieza con 'vcp_'"
    read -p "¿Continuar de todas formas? (s/n): " CONTINUE

    if [ "$CONTINUE" != "s" ] && [ "$CONTINUE" != "S" ]; then
        exit 0
    fi
fi

# Exportar token y ejecutar deployment
export VERCEL_TOKEN="$USER_TOKEN"

echo "✓ Token configurado"
echo ""
echo "📦 Iniciando deployment..."
echo ""

# Ejecutar script de deployment
exec ./scripts/deploy-vercel.sh
