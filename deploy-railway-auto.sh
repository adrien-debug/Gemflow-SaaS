#!/bin/bash

echo "🚀 Déploiement Automatique Railway"
echo "===================================="
echo ""

PROJECT_ID="3526c289-1293-4d84-9022-7b8d0258f597"
SERVICE_ID="fd9d2ada-f167-4451-9577-7ca99aeb2a39"

echo "📊 Configuration :"
echo "  Project ID : $PROJECT_ID"
echo "  Service ID : $SERVICE_ID"
echo ""

# Lire les variables depuis .env.railway.ready
if [ ! -f ".env.railway.ready" ]; then
    echo "❌ Fichier .env.railway.ready introuvable"
    exit 1
fi

echo "✅ Variables trouvées dans .env.railway.ready"
echo ""

# Déployer avec Railway CLI en spécifiant le service
echo "🚀 Déploiement en cours..."
echo ""

railway up --service $SERVICE_ID --detach

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ DÉPLOIEMENT LANCÉ !"
    echo ""
    echo "📊 Voir le statut :"
    echo "  railway status --service $SERVICE_ID"
    echo ""
    echo "📝 Voir les logs :"
    echo "  railway logs --service $SERVICE_ID"
    echo ""
    echo "🌐 Obtenir l'URL :"
    echo "  railway domain --service $SERVICE_ID"
else
    echo ""
    echo "❌ Échec du déploiement"
    echo ""
    echo "Voir les logs :"
    echo "  railway logs --service $SERVICE_ID"
fi
