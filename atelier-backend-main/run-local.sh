#!/bin/bash

# Script pour lancer l'application en local
# Port par défaut: 8000
# Vous pouvez changer le port en définissant la variable SERVER_PORT

PORT=${SERVER_PORT:-8000}

echo "🚀 Démarrage de l'application Atelier Backend sur le port $PORT"
echo ""

# Vérifier que Java 21 est installé
if ! command -v java &> /dev/null; then
    echo "❌ Java n'est pas installé. Veuillez installer Java 21."
    exit 1
fi

JAVA_VERSION=$(java -version 2>&1 | head -n 1 | cut -d'"' -f2 | cut -d'.' -f1)
if [ "$JAVA_VERSION" -lt 21 ]; then
    echo "⚠️  Java 21 est requis. Version actuelle: $JAVA_VERSION"
fi

# Vérifier que Maven est installé
if ! command -v mvn &> /dev/null; then
    echo "❌ Maven n'est pas installé. Veuillez installer Maven."
    exit 1
fi

# Vérifier PostgreSQL
echo "🔍 Vérification de PostgreSQL..."
if pg_isready -h localhost -p 5432 &>/dev/null; then
    echo "✅ PostgreSQL est accessible"
else
    echo "⚠️  PostgreSQL n'est pas accessible sur localhost:5432"
    echo ""
    echo "Options pour démarrer PostgreSQL:"
    echo "1. Avec Docker Compose: docker compose up -d postgres"
    echo "2. Installer PostgreSQL localement"
    echo ""
    read -p "Voulez-vous essayer de démarrer PostgreSQL avec Docker Compose? (o/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Oo]$ ]]; then
        if command -v docker &> /dev/null; then
            echo "🐳 Démarrage de PostgreSQL avec Docker Compose..."
            docker compose up -d postgres
            echo "⏳ Attente du démarrage de PostgreSQL..."
            sleep 5
            if pg_isready -h localhost -p 5432 &>/dev/null; then
                echo "✅ PostgreSQL est maintenant accessible"
            else
                echo "❌ Échec du démarrage de PostgreSQL"
                exit 1
            fi
        else
            echo "❌ Docker n'est pas installé"
            exit 1
        fi
    else
        echo "❌ PostgreSQL est requis pour démarrer l'application"
        exit 1
    fi
fi

# Lancer l'application avec le profil local
export SERVER_PORT=$PORT
export SPRING_PROFILES_ACTIVE=local

echo ""
echo "📦 Compilation et lancement de l'application..."
echo "🌐 L'application sera accessible sur http://localhost:$PORT"
echo "📚 Swagger UI sera accessible sur http://localhost:$PORT/swagger-ui.html"
echo ""

mvn spring-boot:run -Dspring-boot.run.profiles=local -Dspring-boot.run.arguments="--server.port=$PORT"

