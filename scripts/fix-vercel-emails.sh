#!/bin/bash
#
# Script para agregar credenciales de Gmail a Vercel
# Resuelve: Emails NO se envían en producción
#

set -e

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Fix: Configurar emails en Vercel"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Verificar si vercel CLI está instalada
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI no está instalada"
    echo ""
    echo "Instalación:"
    echo "  npm install -g vercel"
    echo ""
    echo "O configura manualmente en:"
    echo "  https://vercel.com/vicnavrob/hispanos-suiza-dev/settings/environment-variables"
    exit 1
fi

echo "Variables a agregar en Vercel:"
echo ""
echo "  1. NEWSLETTER_GMAIL_USER = VNR.IAsolutions@gmail.com"
echo "  2. NEWSLETTER_GMAIL_PASS = mwnmkbgrpjfpjyak"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

read -p "¿Continuar? (y/n): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelado."
    exit 0
fi

echo ""
echo "📧 Agregando NEWSLETTER_GMAIL_USER..."
echo "VNR.IAsolutions@gmail.com" | vercel env add NEWSLETTER_GMAIL_USER production

echo ""
echo "🔑 Agregando NEWSLETTER_GMAIL_PASS..."
echo "mwnmkbgrpjfpjyak" | vercel env add NEWSLETTER_GMAIL_PASS production

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Variables agregadas exitosamente"
echo ""
echo "Ahora necesitas redeploy para que tomen efecto:"
echo ""
echo "  vercel --prod"
echo ""
echo "O esperar al próximo push a GitHub (auto-deploy)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
