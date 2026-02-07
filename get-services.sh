#!/bin/bash

PROJECT_ID="3526c289-1293-4d84-9022-7b8d0258f597"

echo "🔍 Récupération des services du projet..."
echo ""

# Utiliser railway CLI pour obtenir les informations
railway status

echo ""
echo "📋 Pour déployer, vous devez :"
echo "1. Créer un nouveau service dans le dashboard"
echo "2. Ou spécifier un service existant"
echo ""
echo "Ouvrons le dashboard :"
railway open
