#!/bin/bash

echo "🚀 Déploiement Railway via API"
echo "==============================="
echo ""

PROJECT_ID="3526c289-1293-4d84-9022-7b8d0258f597"
SERVICE_ID="fd9d2ada-f167-4451-9577-7ca99aeb2a39"

# Obtenir le token Railway
RAILWAY_TOKEN=$(railway whoami 2>&1 | grep -o 'Logged in as.*' | cut -d' ' -f4-)

if [ -z "$RAILWAY_TOKEN" ]; then
    echo "❌ Impossible de récupérer le token Railway"
    echo "Vérifiez que vous êtes connecté : railway whoami"
    exit 1
fi

echo "✅ Token Railway récupéré"
echo ""

# Lire les variables depuis .env.railway.ready
if [ ! -f ".env.railway.ready" ]; then
    echo "❌ Fichier .env.railway.ready introuvable"
    exit 1
fi

echo "📊 Configuration des variables d'environnement..."
echo ""

# Construire le JSON des variables
VARIABLES_JSON='{'
while IFS='=' read -r key value; do
    # Ignorer les commentaires et lignes vides
    [[ "$key" =~ ^#.*$ ]] && continue
    [[ -z "$key" ]] && continue
    
    # Échapper les caractères spéciaux dans la valeur
    value=$(echo "$value" | sed 's/"/\\"/g')
    
    VARIABLES_JSON="$VARIABLES_JSON\"$key\":\"$value\","
done < .env.railway.ready

# Enlever la dernière virgule et fermer le JSON
VARIABLES_JSON="${VARIABLES_JSON%,}}"

echo "Variables préparées"
echo ""

# Créer un fichier de build pour Railway
echo "📦 Préparation du déploiement..."
echo ""

# Déployer avec railway up
echo "🚀 Lancement du déploiement..."
railway up --detach

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ DÉPLOIEMENT LANCÉ !"
    echo ""
    echo "📊 Informations :"
    echo "  Project ID : $PROJECT_ID"
    echo "  Service ID : $SERVICE_ID"
    echo ""
    echo "📝 Voir les logs :"
    echo "  railway logs"
    echo ""
    echo "🌐 Obtenir l'URL :"
    echo "  railway domain"
    echo ""
    echo "⏳ Le déploiement peut prendre 5-10 minutes..."
else
    echo ""
    echo "❌ Échec du déploiement"
    echo ""
    echo "Essayez manuellement :"
    echo "  1. railway open"
    echo "  2. Configurer les variables dans le dashboard"
    echo "  3. Connecter le repository GitHub"
fi
