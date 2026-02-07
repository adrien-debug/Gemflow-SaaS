#!/bin/bash

set -e

PROJECT_ID="3526c289-1293-4d84-9022-7b8d0258f597"
SERVICE_ID="523c4581-3c56-40ee-a765-32283a73d9a6"
RAILWAY_TOKEN="14f98f88-ea4a-4fce-a45a-7ee3ecfc1522"

echo "🚀 Configuration Railway via API"
echo "================================="
echo ""

# Fonction pour appeler l'API Railway
call_railway_api() {
    local query="$1"
    curl -s -X POST https://backboard.railway.app/graphql/v2 \
        -H "Authorization: Bearer $RAILWAY_TOKEN" \
        -H "Content-Type: application/json" \
        -d "$query"
}

# Configurer chaque variable
echo "⚙️  Configuration des variables d'environnement..."

variables=(
    "APP_DATABASE_URL:jdbc:postgresql://aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres"
    "APP_DATABASE_USERNAME:postgres.xlvlcnrkrqstfoadoamk"
    "APP_DATABASE_PASSWORD:Adrien0334\$\$"
    "APP_NAME:Gemsflow"
    "APP_VERSION:1.0.0"
    "SPRING_PROFILES_ACTIVE:prod"
    "JWT_SECRET:65cegngWXmSNjqVs/OuJI2Q3NZY/H6ON6ha+CWz2PNt5PwE9R2FNNtjUA87rdM6QLEKSqa0b8wT2sKYgZiiM/g=="
    "JWT_EXPIRATION:86400000"
    "JWT_REFRESH_EXPIRATION:604800000"
    "CORS_ALLOWED_ORIGINS:*"
    "SERVER_PORT:7001"
    "LOGGING_LEVEL_ROOT:INFO"
    "LOGGING_LEVEL_IO_HEARSTCORPORATION:DEBUG"
)

for var in "${variables[@]}"; do
    IFS=':' read -r name value <<< "$var"
    echo "  • $name"
    
    query=$(cat <<QUERY
{
  "query": "mutation VariableUpsert(\$input: VariableUpsertInput!) { variableUpsert(input: \$input) }",
  "variables": {
    "input": {
      "projectId": "$PROJECT_ID",
      "serviceId": "$SERVICE_ID",
      "name": "$name",
      "value": "$value"
    }
  }
}
QUERY
)
    
    result=$(call_railway_api "$query")
    
    if echo "$result" | grep -q "error"; then
        echo "    ⚠️  Erreur: $result"
    fi
done

echo ""
echo "✅ Variables configurées"
echo ""

# Déclencher un déploiement
echo "🚀 Déclenchement du déploiement..."

deploy_query=$(cat <<'QUERY'
{
  "query": "mutation ServiceInstanceRedeploy($serviceId: String!) { serviceInstanceRedeploy(serviceId: $serviceId) }",
  "variables": {
    "serviceId": "523c4581-3c56-40ee-a765-32283a73d9a6"
  }
}
QUERY
)

result=$(call_railway_api "$deploy_query")

echo ""
if echo "$result" | grep -q "error"; then
    echo "⚠️  Réponse API: $result"
    echo ""
    echo "Le déploiement se fera automatiquement après connexion du repo GitHub"
else
    echo "✅ Déploiement déclenché !"
fi

echo ""
echo "📊 Statut du service :"
railway status

