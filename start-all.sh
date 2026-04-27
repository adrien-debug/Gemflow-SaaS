#!/bin/bash

# Script pour démarrer tous les services nécessaires

export PATH="/opt/homebrew/opt/openjdk@21/bin:/opt/homebrew/bin:$PATH"
export JAVA_HOME="/opt/homebrew/opt/openjdk@21"

# Variables d'environnement pour Docker Compose
export DATABASE_NAME=atelier
export DATABASE_USERNAME=postgres
export DATABASE_PASSWORD=postgres

echo "🔍 Vérification de Docker..."

# Attendre que Docker soit disponible
MAX_RETRIES=30
RETRY_COUNT=0

while ! docker info > /dev/null 2>&1; do
    if [ $RETRY_COUNT -eq 0 ]; then
        echo "⏳ Docker n'est pas démarré. Démarrage de Docker Desktop..."
        open -a Docker
    fi
    
    RETRY_COUNT=$((RETRY_COUNT + 1))
    
    if [ $RETRY_COUNT -ge $MAX_RETRIES ]; then
        echo "❌ Docker n'est pas disponible après $MAX_RETRIES tentatives."
        echo "⚠️  Veuillez démarrer Docker Desktop manuellement et réessayer."
        exit 1
    fi
    
    echo "⏳ Attente de Docker... ($RETRY_COUNT/$MAX_RETRIES)"
    sleep 2
done

echo "✅ Docker est disponible"

# Démarrer PostgreSQL
echo ""
echo "🐘 Démarrage de PostgreSQL..."
docker compose up -d postgres

# Attendre que PostgreSQL soit prêt
echo "⏳ Attente que PostgreSQL soit prêt..."
sleep 5

MAX_RETRIES=30
RETRY_COUNT=0
while ! docker exec database pg_isready -U postgres -d atelier > /dev/null 2>&1; do
    RETRY_COUNT=$((RETRY_COUNT + 1))
    if [ $RETRY_COUNT -ge $MAX_RETRIES ]; then
        echo "❌ PostgreSQL n'est pas prêt après $MAX_RETRIES tentatives."
        exit 1
    fi
    sleep 1
done

echo "✅ PostgreSQL est prêt"

# Lancer l'application
echo ""
echo "🚀 Démarrage de l'application sur le port 8000..."
export SERVER_PORT=8000
export SPRING_PROFILES_ACTIVE=local

cd "$(dirname "$0")"
mvn spring-boot:run -Dspring-boot.run.profiles=local -Dspring-boot.run.arguments="--server.port=8000"

