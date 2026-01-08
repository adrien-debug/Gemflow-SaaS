#!/bin/bash
# ============================================
# Script de configuration Railway - Gemsflow
# ============================================

set -e

echo "🚂 Configuration Railway - Gemsflow SaaS"
echo "=========================================="
echo ""

# Vérifier si Railway CLI est installé
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI n'est pas installé."
    echo ""
    echo "Installation :"
    echo "  npm install -g @railway/cli"
    echo "  ou"
    echo "  brew install railway"
    echo ""
    exit 1
fi

# Vérifier si l'utilisateur est connecté
if ! railway whoami &> /dev/null; then
    echo "❌ Vous n'êtes pas connecté à Railway."
    echo ""
    echo "Connexion :"
    echo "  railway login"
    echo ""
    exit 1
fi

echo "✅ Railway CLI installé et connecté"
echo ""

# Demander le nom du service
read -p "📝 Nom du service Railway (ex: Gemflow-SaaS) : " SERVICE_NAME
if [ -z "$SERVICE_NAME" ]; then
    echo "❌ Le nom du service est obligatoire"
    exit 1
fi

# Demander le mot de passe Supabase
read -sp "🔐 Mot de passe Supabase PostgreSQL : " SUPABASE_PASSWORD
echo ""
if [ -z "$SUPABASE_PASSWORD" ]; then
    echo "❌ Le mot de passe Supabase est obligatoire"
    exit 1
fi

# Demander l'URL du frontend (optionnel)
read -p "🌐 URL du frontend Railway (optionnel, Enter pour skip) : " FRONTEND_URL
if [ -z "$FRONTEND_URL" ]; then
    FRONTEND_URL="http://localhost:7101"
fi

echo ""
echo "📋 Résumé de la configuration :"
echo "  - Service : $SERVICE_NAME"
echo "  - Database : Supabase PostgreSQL"
echo "  - Frontend : $FRONTEND_URL"
echo ""

read -p "✅ Confirmer et déployer ? (y/N) : " CONFIRM
if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
    echo "❌ Configuration annulée"
    exit 0
fi

echo ""
echo "🚀 Configuration des variables d'environnement..."
echo ""

# Configurer les variables
railway variables set \
  --service "$SERVICE_NAME" \
  APP_DATABASE_URL="jdbc:postgresql://db.ldnvfnwkqywdgnsrqxuq.supabase.co:5432/postgres" \
  APP_DATABASE_USERNAME="postgres.ldnvfnwkqywdgnsrqxuq" \
  APP_DATABASE_PASSWORD="$SUPABASE_PASSWORD" \
  APP_NAME="Gemsflow" \
  APP_ACTIVE_PROFILE="prod" \
  SERVER_PORT="8000" \
  APP_SHOW_SQL="false" \
  APP_SWAGGER_ENABLE="false" \
  APP_CORS_ALLOWED_ORIGINS="http://localhost:7101,$FRONTEND_URL" \
  APP_FRONTEND_URL="$FRONTEND_URL" \
  APP_JWT_ISSUER_URI="https://placeholder-keycloak.com/realms/atelier" \
  APP_KEYCLOAK_URL="https://placeholder-keycloak.com" \
  APP_KEYCLOAK_REALM="atelier" \
  APP_KEYCLOAK_CLIENT_ID="atelier-client" \
  APP_EMAIL_ENABLE="false" \
  APP_FILE_SOURCE="LOCAL"

echo ""
echo "✅ Variables configurées avec succès !"
echo ""
echo "🚀 Déploiement en cours..."
echo ""

# Lancer le déploiement
railway up --service "$SERVICE_NAME"

echo ""
echo "✅ Déploiement terminé !"
echo ""
echo "📊 Vérifier le statut :"
echo "  railway status --service $SERVICE_NAME"
echo ""
echo "📋 Voir les logs :"
echo "  railway logs --service $SERVICE_NAME"
echo ""
echo "🌐 Tester le healthcheck :"
echo "  curl https://your-app.railway.app/actuator/health"
echo ""
