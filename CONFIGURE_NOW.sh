#!/bin/bash

echo "🔧 Configuration Automatique avec la Connection String"
echo "======================================================"
echo ""

# Informations extraites
DB_HOST="aws-1-ap-southeast-1.pooler.supabase.com"
DB_PORT="5432"
DB_NAME="postgres"
DB_USER="postgres.xlvlcnrkrqstfoadoamk"
DB_PASS="Adrien0334\$\$"

# URL JDBC
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
PGPASSWORD="$DB_PASS" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "SELECT version();" 2>&1 | head -5

if [ ${PIPESTATUS[0]} -eq 0 ]; then
    echo ""
    echo "✅ CONNEXION RÉUSSIE !"
    echo ""
    
    # Backup
    if [ -f ".env.local" ]; then
        cp ".env.local" ".env.local.backup-$(date +%Y%m%d-%H%M%S)"
        echo "📦 Backup créé"
    fi
    
    # Mise à jour
    sed -i '' "s|APP_DATABASE_URL=.*|APP_DATABASE_URL=${JDBC_URL}|g" .env.local
    sed -i '' "s|APP_DATABASE_USERNAME=.*|APP_DATABASE_USERNAME=${DB_USER}|g" .env.local
    sed -i '' "s|APP_DATABASE_PASSWORD=.*|APP_DATABASE_PASSWORD=${DB_PASS}|g" .env.local
    
    echo "✅ Configuration mise à jour dans .env.local"
    echo ""
    echo "Configuration finale :"
    grep "DATABASE" .env.local | grep -v "^#"
    echo ""
    echo "🚀 Prêt à démarrer le backend !"
    echo ""
    echo "Commande :"
    echo "  export \$(cat .env.local | grep -v '^#' | xargs)"
    echo "  ./mvnw spring-boot:run -Dspring-boot.run.profiles=dev"
    
else
    echo ""
    echo "❌ Échec de connexion"
    echo ""
    echo "Vérifiez que psql est installé : brew install postgresql"
fi
