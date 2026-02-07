#!/bin/bash

# Script de test du backend Railway
# Usage: ./test-railway-backend.sh

BACKEND_URL="https://gemflow-saas-production.up.railway.app"
# Mettre à jour cette URL quand le backend sera déployé

echo "🧪 Test du backend Railway : $BACKEND_URL"
echo "================================================"
echo ""

# Test 1 : Healthcheck
echo "📍 Test 1 : /actuator/health"
HEALTH_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BACKEND_URL/actuator/health")
HEALTH_RESPONSE=$(curl -s "$BACKEND_URL/actuator/health")

if [ "$HEALTH_CODE" = "200" ]; then
    echo "✅ Healthcheck OK (200)"
    echo "   Response: $HEALTH_RESPONSE"
else
    echo "❌ Healthcheck FAILED ($HEALTH_CODE)"
    echo "   Response: $HEALTH_RESPONSE"
fi
echo ""

# Test 2 : Root endpoint
echo "📍 Test 2 : / (root)"
ROOT_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BACKEND_URL/")
ROOT_RESPONSE=$(curl -s "$BACKEND_URL/" | head -c 200)

if [ "$ROOT_CODE" = "200" ] || [ "$ROOT_CODE" = "302" ]; then
    echo "✅ Root endpoint OK ($ROOT_CODE)"
else
    echo "❌ Root endpoint FAILED ($ROOT_CODE)"
    echo "   Response: $ROOT_RESPONSE"
fi
echo ""

# Test 3 : API endpoint
echo "📍 Test 3 : /api/v1/health (si existe)"
API_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BACKEND_URL/api/v1/health")
API_RESPONSE=$(curl -s "$BACKEND_URL/api/v1/health")

if [ "$API_CODE" = "200" ]; then
    echo "✅ API health OK (200)"
    echo "   Response: $API_RESPONSE"
else
    echo "⚠️  API health ($API_CODE) - peut être normal si endpoint n'existe pas"
fi
echo ""

# Résumé
echo "================================================"
if [ "$HEALTH_CODE" = "200" ]; then
    echo "✅ BACKEND UP & RUNNING"
    echo ""
    echo "Prochaine étape : Mettre à jour Vercel avec cette URL :"
    echo "VITE_API_BASE_URL=$BACKEND_URL"
else
    echo "❌ BACKEND DOWN"
    echo ""
    echo "Actions à faire :"
    echo "1. Vérifier les logs Railway"
    echo "2. Vérifier les variables d'environnement"
    echo "3. Voir RAILWAY_DIAGNOSTIC.md pour plus de détails"
fi
