#!/bin/bash

echo "🚀 Déploiement Railway - Gemflow Backend"
echo "=========================================="
echo ""

# Vérifier que Railway CLI est installé
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI n'est pas installé"
    echo ""
    echo "Installation :"
    echo "  npm install -g @railway/cli"
    echo ""
    echo "Puis relancer ce script."
    exit 1
fi

echo "✅ Railway CLI détecté"
echo ""

# Vérifier la connexion Railway
echo "🔍 Vérification de la connexion Railway..."
railway whoami > /dev/null 2>&1

if [ $? -ne 0 ]; then
    echo "❌ Non connecté à Railway"
    echo ""
    echo "Connexion :"
    railway login
    echo ""
fi

echo "✅ Connecté à Railway"
echo ""

# Lister les projets
echo "📋 Projets Railway disponibles :"
railway list
echo ""

# Demander de lier le projet
echo "🔗 Liaison au projet..."
echo ""
echo "Si le projet existe déjà, sélectionnez-le."
echo "Sinon, créez-en un nouveau."
echo ""

railway link

if [ $? -ne 0 ]; then
    echo "❌ Échec de liaison au projet"
    exit 1
fi

echo ""
echo "✅ Projet lié"
echo ""

# Configuration des variables d'environnement
echo "⚙️  Configuration des variables d'environnement..."
echo ""

# Variables Supabase
railway variables set APP_DATABASE_URL="jdbc:postgresql://aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres"
railway variables set APP_DATABASE_USERNAME="postgres.xlvlcnrkrqstfoadoamk"
railway variables set APP_DATABASE_PASSWORD="Adrien0334\$\$"

# Variables Application
railway variables set APP_NAME="Gemsflow"
railway variables set APP_VERSION="1.0.0"
railway variables set SPRING_PROFILES_ACTIVE="prod"

# Variables JWT (générer des secrets sécurisés)
JWT_SECRET=$(openssl rand -base64 64 | tr -d '\n')
railway variables set JWT_SECRET="$JWT_SECRET"
railway variables set JWT_EXPIRATION="86400000"
railway variables set JWT_REFRESH_EXPIRATION="604800000"

# Variables CORS
railway variables set CORS_ALLOWED_ORIGINS="*"

# Variables Serveur
railway variables set SERVER_PORT="7001"

echo ""
echo "✅ Variables d'environnement configurées"
echo ""

# Déploiement
echo "🚀 Déploiement en cours..."
echo ""

railway up

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ DÉPLOIEMENT RÉUSSI !"
    echo ""
    echo "📊 Informations du déploiement :"
    railway status
    echo ""
    echo "🌐 URL du backend :"
    railway domain
    echo ""
    echo "📝 Voir les logs :"
    echo "  railway logs"
    echo ""
    echo "🔧 Ouvrir le dashboard :"
    echo "  railway open"
else
    echo ""
    echo "❌ Échec du déploiement"
    echo ""
    echo "Voir les logs :"
    echo "  railway logs"
fi
