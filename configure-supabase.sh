#!/bin/bash

echo "🔧 Configuration de la Connexion Supabase"
echo "=========================================="
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fichier de configuration
ENV_FILE=".env.local"

echo "📋 Instructions :"
echo "  1. Ouvrir : https://supabase.com/dashboard/project/xlvlcnrkrqstfoadoamk/settings/database"
echo "  2. Copier la 'Connection string' (mode Transaction ou Session, port 6543)"
echo ""

# Demander la connection string
echo -n "Coller la connection string complète : "
read CONNECTION_STRING

# Extraire les informations
if [[ $CONNECTION_STRING =~ postgresql://([^:]+):([^@]+)@([^:]+):([0-9]+)/(.+) ]]; then
    DB_USER="${BASH_REMATCH[1]}"
    DB_PASS="${BASH_REMATCH[2]}"
    DB_HOST="${BASH_REMATCH[3]}"
    DB_PORT="${BASH_REMATCH[4]}"
    DB_NAME="${BASH_REMATCH[5]}"
    
    echo ""
    echo "✅ Informations extraites :"
    echo "  Host     : $DB_HOST"
    echo "  Port     : $DB_PORT"
    echo "  Database : $DB_NAME"
    echo "  User     : $DB_USER"
    echo "  Password : ${DB_PASS:0:20}..."
    echo ""
    
    # Construire l'URL JDBC
    JDBC_URL="jdbc:postgresql://${DB_HOST}:${DB_PORT}/${DB_NAME}"
    
    # Tester la connexion
    echo "🔍 Test de connexion..."
    PGPASSWORD="$DB_PASS" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "SELECT version();" > /dev/null 2>&1
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Connexion réussie !${NC}"
        echo ""
        
        # Mettre à jour .env.local
        echo "📝 Mise à jour de $ENV_FILE..."
        
        # Backup de l'ancien fichier
        if [ -f "$ENV_FILE" ]; then
            cp "$ENV_FILE" "${ENV_FILE}.backup-$(date +%Y%m%d-%H%M%S)"
            echo "  Backup créé : ${ENV_FILE}.backup-$(date +%Y%m%d-%H%M%S)"
        fi
        
        # Mettre à jour les variables
        sed -i '' "s|APP_DATABASE_URL=.*|APP_DATABASE_URL=${JDBC_URL}|g" "$ENV_FILE"
        sed -i '' "s|APP_DATABASE_USERNAME=.*|APP_DATABASE_USERNAME=${DB_USER}|g" "$ENV_FILE"
        sed -i '' "s|APP_DATABASE_PASSWORD=.*|APP_DATABASE_PASSWORD=${DB_PASS}|g" "$ENV_FILE"
        
        echo -e "${GREEN}✅ Configuration mise à jour !${NC}"
        echo ""
        echo "🚀 Pour démarrer le backend :"
        echo "  cd gemflow-backend"
        echo "  export \$(cat .env.local | grep -v '^#' | xargs)"
        echo "  ./mvnw spring-boot:run -Dspring-boot.run.profiles=dev"
        
    else
        echo -e "${RED}❌ Échec de connexion${NC}"
        echo ""
        echo "Vérifiez que :"
        echo "  1. La connection string est complète et correcte"
        echo "  2. Le projet Supabase est actif"
        echo "  3. Vous avez copié le bon mot de passe"
    fi
    
else
    echo -e "${RED}❌ Format de connection string invalide${NC}"
    echo ""
    echo "Format attendu :"
    echo "  postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
    echo ""
    echo "Exemple :"
    echo "  postgresql://postgres.xlvlcnrkrqstfoadoamk:MOT_DE_PASSE@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"
fi
