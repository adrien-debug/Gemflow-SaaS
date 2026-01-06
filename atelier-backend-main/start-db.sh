#!/bin/bash

echo "🐳 Vérification de Docker..."

# Attendre que Docker soit disponible
MAX_ATTEMPTS=30
ATTEMPT=0

while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
    if docker ps &>/dev/null; then
        echo "✅ Docker est prêt"
        break
    fi
    ATTEMPT=$((ATTEMPT + 1))
    echo "⏳ Attente de Docker... ($ATTEMPT/$MAX_ATTEMPTS)"
    sleep 2
done

if [ $ATTEMPT -eq $MAX_ATTEMPTS ]; then
    echo "❌ Docker n'est pas disponible. Veuillez démarrer Docker Desktop."
    exit 1
fi

# Créer le fichier .env s'il n'existe pas
if [ ! -f .env ]; then
    echo "📝 Création du fichier .env..."
    cat > .env << EOF
DATABASE_NAME=atelier
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
KEYCLOAK_ADMIN_USERNAME=admin
KEYCLOAK_ADMIN_PASSWORD=admin
KEYCLOAK_HOSTNAME=localhost
KEYCLOAK_HOSTNAME_ADMIN=localhost
EOF
fi

echo "🚀 Démarrage de PostgreSQL..."
docker compose up -d postgres

echo "⏳ Attente que PostgreSQL soit prêt..."
sleep 5

# Vérifier que PostgreSQL est prêt
for i in {1..30}; do
    if docker exec database pg_isready -U postgres &>/dev/null; then
        echo "✅ PostgreSQL est prêt!"
        exit 0
    fi
    echo "⏳ Attente de PostgreSQL... ($i/30)"
    sleep 1
done

echo "⚠️  PostgreSQL prend du temps à démarrer. Vérifiez avec: docker compose logs postgres"
exit 0

