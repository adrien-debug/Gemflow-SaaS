#!/bin/bash

# Script de test du mode DEV
# Vérifie que tous les services sont opérationnels

echo "🧪 Test du mode DEV"
echo ""

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test PostgreSQL
echo "1️⃣  Test PostgreSQL..."
if docker compose ps postgres | grep -q "Up"; then
    echo -e "${GREEN}✅ PostgreSQL est démarré${NC}"
else
    echo -e "${RED}❌ PostgreSQL n'est pas démarré${NC}"
    echo "   Lancer: docker compose up -d postgres"
fi
echo ""

# Test Backend
echo "2️⃣  Test Backend..."
if curl -s http://localhost:7001/actuator/health | grep -q "UP"; then
    echo -e "${GREEN}✅ Backend est accessible sur http://localhost:7001${NC}"
    
    # Vérifier le mode DEV
    if curl -s http://localhost:7001/api/v1/roles > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Mode DEV activé (API accessible sans auth)${NC}"
    else
        echo -e "${YELLOW}⚠️  API non accessible (vérifier le profil dev)${NC}"
    fi
else
    echo -e "${RED}❌ Backend n'est pas accessible${NC}"
    echo "   Lancer: ./run-local.sh"
fi
echo ""

# Test Frontend
echo "3️⃣  Test Frontend..."
if curl -s http://localhost:7101 | grep -q "Gemsflow"; then
    echo -e "${GREEN}✅ Frontend est accessible sur http://localhost:7101${NC}"
else
    echo -e "${RED}❌ Frontend n'est pas accessible${NC}"
    echo "   Lancer: cd frontend && npm run dev"
fi
echo ""

# Vérifier les variables d'environnement
echo "4️⃣  Vérification configuration..."
if grep -q "VITE_DEV_MODE=true" frontend/.env.local; then
    echo -e "${GREEN}✅ VITE_DEV_MODE=true (frontend)${NC}"
else
    echo -e "${YELLOW}⚠️  VITE_DEV_MODE non défini dans frontend/.env.local${NC}"
fi
echo ""

# Résumé
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Résumé :"
echo ""
echo "  🌐 Application : http://localhost:7101"
echo "  📚 Swagger UI  : http://localhost:7001/swagger-ui.html"
echo "  💚 Health      : http://localhost:7001/actuator/health"
echo ""
echo "  👤 Auto-login  : Dev User (Super Admin)"
echo "  🔓 Auth        : Désactivée (mode DEV)"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
