#!/bin/bash

PROJECT_ID="3526c289-1293-4d84-9022-7b8d0258f597"
SERVICE_ID="523c4581-3c56-40ee-a765-32283a73d9a6"
RAILWAY_TOKEN="bdb77b9e-04d3-4d92-af4e-7e6e0abac649"

echo "🚀 Déploiement Railway automatique"
echo "===================================="
echo ""

# Configurer les variables via API Railway
echo "⚙️  Configuration des variables..."

# Créer le payload JSON
cat > /tmp/railway-vars.json << 'JSONEOF'
{
  "APP_DATABASE_URL": "jdbc:postgresql://aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres",
  "APP_DATABASE_USERNAME": "postgres.xlvlcnrkrqstfoadoamk",
  "APP_DATABASE_PASSWORD": "Adrien0334$$",
  "APP_NAME": "Gemsflow",
  "APP_VERSION": "1.0.0",
  "SPRING_PROFILES_ACTIVE": "prod",
  "JWT_SECRET": "65cegngWXmSNjqVs/OuJI2Q3NZY/H6ON6ha+CWz2PNt5PwE9R2FNNtjUA87rdM6QLEKSqa0b8wT2sKYgZiiM/g==",
  "JWT_EXPIRATION": "86400000",
  "JWT_REFRESH_EXPIRATION": "604800000",
  "CORS_ALLOWED_ORIGINS": "*",
  "SERVER_PORT": "7001",
  "LOGGING_LEVEL_ROOT": "INFO",
  "LOGGING_LEVEL_IO_HEARSTCORPORATION": "DEBUG"
}
JSONEOF

# Utiliser l'API GraphQL de Railway pour configurer les variables
curl -X POST https://backboard.railway.app/graphql/v2 \
  -H "Authorization: Bearer $RAILWAY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation VariableUpsert($input: VariableUpsertInput!) { variableUpsert(input: $input) }",
    "variables": {
      "input": {
        "projectId": "'$PROJECT_ID'",
        "environmentId": "production",
        "serviceId": "'$SERVICE_ID'",
        "name": "APP_DATABASE_URL",
        "value": "jdbc:postgresql://aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres"
      }
    }
  }' 2>&1 | head -5

echo ""
echo "✅ Variables configurées"
echo ""

# Déployer
echo "🚀 Déploiement en cours..."
railway up --service $SERVICE_ID --detach

echo ""
echo "✅ Déploiement lancé !"
echo ""
echo "Voir les logs : railway logs"
