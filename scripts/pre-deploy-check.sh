#!/bin/bash

# Script de verificación pre-deploy
# Ejecutar antes de cada push a producción

set -e

echo "🔍 Verificación Pre-Deploy Iniciada..."
echo ""

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0

# 1. Verificar que estamos en el directorio correcto
echo "📁 Verificando directorio..."
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: No estás en el directorio del proyecto${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Directorio correcto${NC}"

# 2. Verificar que no hay cambios sin commitear
echo ""
echo "📝 Verificando git status..."
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${YELLOW}⚠️  Advertencia: Hay cambios sin commitear${NC}"
    git status --short
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}✓ Git status limpio${NC}"
fi

# 3. Verificar que .env.local no está en git
echo ""
echo "🔐 Verificando archivos sensibles..."
if git ls-files | grep -q "\.env\.local"; then
    echo -e "${RED}❌ Error: .env.local está en git!${NC}"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}✓ No hay archivos sensibles en git${NC}"
fi

# 4. Verificar que el build local funciona
echo ""
echo "🏗️  Ejecutando build local..."
if npm run build > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Build exitoso${NC}"
else
    echo -e "${RED}❌ Error: Build falló${NC}"
    echo "Ejecuta 'npm run build' para ver el error completo"
    ERRORS=$((ERRORS + 1))
fi

# 5. Verificar archivos críticos
echo ""
echo "📄 Verificando archivos críticos..."
CRITICAL_FILES=(
    "src/app/eventos/page.tsx"
    "src/lib/eventos.ts"
    "public/data/eventos-ejemplo.json"
    "src/components/EventoCard.tsx"
    "src/components/FiltrosEventos.tsx"
)

for file in "${CRITICAL_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓ $file${NC}"
    else
        echo -e "${RED}❌ Falta: $file${NC}"
        ERRORS=$((ERRORS + 1))
    fi
done

# 6. Verificar que las variables de entorno existen localmente
echo ""
echo "🔑 Verificando variables de entorno locales..."
if [ -f ".env.local" ]; then
    REQUIRED_VARS=(
        "ANTHROPIC_API_KEY"
        "GITHUB_TOKEN"
        "STRIPE_SECRET_KEY"
        "NEXTAUTH_SECRET"
    )

    for var in "${REQUIRED_VARS[@]}"; do
        if grep -q "^$var=" .env.local; then
            echo -e "${GREEN}✓ $var${NC}"
        else
            echo -e "${YELLOW}⚠️  $var no encontrada (OK si está en Vercel)${NC}"
        fi
    done
else
    echo -e "${YELLOW}⚠️  .env.local no existe (OK si está en Vercel)${NC}"
fi

# Resumen
echo ""
echo "======================================"
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✅ VERIFICACIÓN EXITOSA${NC}"
    echo "Es seguro hacer deploy"
    echo ""
    echo "Para deployar:"
    echo "  git push origin main"
    exit 0
else
    echo -e "${RED}❌ VERIFICACIÓN FALLÓ ($ERRORS errores)${NC}"
    echo "Corrige los errores antes de deployar"
    exit 1
fi
