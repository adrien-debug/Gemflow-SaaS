#!/bin/bash

# Script pour déployer les variables sur Railway
# Usage: ./deploy-railway-vars.sh

SERVICE_ID="c316e130-a0e3-4273-b769-cb8f28d293c3"

echo "🚀 Déploiement des variables Railway..."
echo ""

# Lire les variables depuis le fichier
VARS_FILE="railway-vars-complete.txt"

if [ ! -f "$VARS_FILE" ]; then
    echo "❌ Fichier $VARS_FILE introuvable"
    exit 1
fi

# Convertir le fichier en JSON pour Railway API
echo "📦 Préparation des variables..."

# Utiliser railway CLI
railway variables --set-all < "$VARS_FILE"

echo ""
echo "✅ Variables déployées !"
echo "⏳ Attends 3-5 minutes que Railway redéploie..."
echo ""
echo "Pour vérifier les logs :"
echo "  railway logs"
