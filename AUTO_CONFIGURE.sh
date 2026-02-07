#!/bin/bash

echo "🔧 Configuration Automatique de Supabase"
echo "========================================"
echo ""

# Informations extraites de la connection string
DB_HOST="db.xlvlcnrkrqstfoadoamk.supabase.co"
DB_PORT="5432"
DB_NAME="postgres"
DB_USER="postgres"
DB_PASS="Adrien0334\$\$"

# Construire l'URL JDBC
JDBC_URL="jdbc:postgresql://${DB_HOST}:${DB_PORT}/${DB_NAME}"

echo "Configuration extraite :"
echo "  Host     : $DB_HOST"
echo "  Port     : $DB_PORT"
echo "  Database : $DB_NAME"
echo "  User     : $DB_USER"
echo "  Password : ${DB_PASS:0:10}..."
echo ""

# Test de connexion
echo "🔍 Test de connexion..."
PGPASSWORD="$DB_PASS" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "SELECT version();" > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo "✅ Connexion réussie !"
    echo ""
    
    # Backup de l'ancien fichier
    if [ -f ".env.local" ]; then
        cp ".env.local" ".env.local.backup-$(date +%Y%m%d-%H%M%S)"
        echo "📦 Backup créé"
    fi
    
    # Mettre à jour .env.local
    sed -i '' "s|APP_DATABASE_URL=.*|APP_DATABASE_URL=${JDBC_URL}|g" .env.local
    sed -i '' "s|APP_DATABASE_USERNAME=.*|APP_DATABASE_USERNAME=${DB_USER}|g" .env.local
    sed -i '' "s|APP_DATABASE_PASSWORD=.*|APP_DATABASE_PASSWORD=${DB_PASS}|g" .env.local
    
    echo "✅ Configuration mise à jour dans .env.local"
    echo ""
    echo "🚀 Démarrage du backend..."
    echo ""
    
else
    echo "❌ Échec de connexion"
    echo ""
    echo "Le port 5432 est probablement bloqué."
    echo "Essayons avec le pooler (port 6543)..."
    echo ""
    
    # Essayer avec le pooler
    DB_HOST_POOLER="aws-0-eu-central-1.pooler.supabase.com"
    DB_PORT_POOLER="6543"
    JDBC_URL_POOLER="jdbc:postgresql://${DB_HOST_POOLER}:${DB_PORT_POOLER}/${DB_NAME}"
    
    PGPASSWORD="$DB_PASS" psql -h "$DB_HOST_POOLER" -p "$DB_PORT_POOLER" -U "$DB_USER" -d "$DB_NAME" -c "SELECT version();" > /dev/null 2>&1
    
    if [ $? -eq 0 ]; then
        echo "✅ Connexion réussie avec le pooler !"
        echo ""
        
        # Backup de l'ancien fichier
        if [ -f ".env.local" ]; then
            cp ".env.local" ".env.local.backup-$(date +%Y%m%d-%H%M%S)"
            echo "📦 Backup créé"
        fi
        
        # Mettre à jour .env.local
        sed -i '' "s|APP_DATABASE_URL=.*|APP_DATABASE_URL=${JDBC_URL_POOLER}|g" .env.local
        sed -i '' "s|APP_DATABASE_USERNAME=.*|APP_DATABASE_USERNAME=${DB_USER}|g" .env.local
        sed -i '' "s|APP_DATABASE_PASSWORD=.*|APP_DATABASE_PASSWORD=${DB_PASS}|g" .env.local
        
        echo "✅ Configuration mise à jour dans .env.local (avec pooler)"
        echo ""
        echo "🚀 Démarrage du backend..."
        echo ""
    else
        echo "❌ Échec de connexion avec le pooler également"
        exit 1
    fi
fi
