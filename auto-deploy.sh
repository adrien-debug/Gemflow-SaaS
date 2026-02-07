#!/bin/bash

set -e

echo "🚀 Déploiement Automatique Railway - Gemflow Backend"
echo "====================================================="
echo ""

# Vérifier que nous sommes dans le bon dossier
if [ ! -f "pom.xml" ]; then
    echo "❌ Erreur : pom.xml introuvable"
    echo "Assurez-vous d'être dans le dossier gemflow-backend"
    exit 1
fi

echo "✅ Dossier backend vérifié"
echo ""

# Vérifier la connexion Railway
echo "🔍 Vérification de la connexion Railway..."
railway whoami > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "❌ Non connecté à Railway"
    exit 1
fi
echo "✅ Connecté à Railway"
echo ""

# Vérifier le projet
echo "📋 Projet actuel :"
railway status
echo ""

# Créer un commit si nécessaire (Railway déploie depuis Git)
echo "📦 Préparation du code..."
git add -A 2>/dev/null || true
git diff --cached --quiet || git commit -m "Deploy to Railway - $(date +%Y%m%d-%H%M%S)" 2>/dev/null || true
echo "✅ Code prêt"
echo ""

# Déployer
echo "🚀 Lancement du déploiement..."
echo ""
echo "⏳ Cela peut prendre 5-10 minutes..."
echo ""

# Essayer de déployer
railway up

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ DÉPLOIEMENT LANCÉ AVEC SUCCÈS !"
    echo ""
    echo "📊 Voir le statut :"
    echo "  railway status"
    echo ""
    echo "📝 Voir les logs :"
    echo "  railway logs"
    echo ""
    echo "🌐 Obtenir l'URL :"
    echo "  railway domain"
else
    echo ""
    echo "⚠️  Le déploiement nécessite une configuration manuelle"
    echo ""
    echo "Ouvrez le dashboard Railway :"
    railway open
    echo ""
    echo "Puis suivez le guide : DEPLOY_RAILWAY_MANUEL_FINAL.md"
fi
