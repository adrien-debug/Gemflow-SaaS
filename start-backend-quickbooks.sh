#!/bin/bash

# Charger les variables d'environnement
set -a
source .env
set +a

# Afficher les variables importantes pour debug
echo "APP_DATABASE_URL=$APP_DATABASE_URL"
echo "APP_DATABASE_USERNAME=$APP_DATABASE_USERNAME"
echo "QUICKBOOKS_CLIENT_ID=$QUICKBOOKS_CLIENT_ID"

# Démarrer le backend
mvn spring-boot:run -Dspring-boot.run.arguments="--server.port=7100"





