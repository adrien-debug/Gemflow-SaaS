#!/bin/bash

echo "🔍 Test des Variantes de Mot de Passe"
echo "======================================"
echo ""

DB_HOST="aws-0-eu-central-1.pooler.supabase.com"
DB_PORT="6543"
DB_NAME="postgres"
DB_USER="postgres"

# Différentes variantes du mot de passe
passwords=(
    "Adrien0334\$\$"
    "Adrien0334$$"
    'Adrien0334$$'
    "Adrien0334\\\$\\\$"
)

for i in "${!passwords[@]}"; do
    echo "Test $((i+1))/4 : ${passwords[$i]:0:10}..."
    PGPASSWORD="${passwords[$i]}" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "SELECT 1;" > /dev/null 2>&1
    
    if [ $? -eq 0 ]; then
        echo "✅ SUCCÈS avec la variante $((i+1)) !"
        echo ""
        echo "Mot de passe correct : ${passwords[$i]}"
        echo ""
        
        # Mettre à jour .env.local
        JDBC_URL="jdbc:postgresql://${DB_HOST}:${DB_PORT}/${DB_NAME}"
        
        cp ".env.local" ".env.local.backup-$(date +%Y%m%d-%H%M%S)"
        
        sed -i '' "s|APP_DATABASE_URL=.*|APP_DATABASE_URL=${JDBC_URL}|g" .env.local
        sed -i '' "s|APP_DATABASE_USERNAME=.*|APP_DATABASE_USERNAME=${DB_USER}|g" .env.local
        sed -i '' "s|APP_DATABASE_PASSWORD=.*|APP_DATABASE_PASSWORD=${passwords[$i]}|g" .env.local
        
        echo "✅ Configuration mise à jour dans .env.local"
        exit 0
    fi
done

echo "❌ Aucune variante n'a fonctionné"
echo ""
echo "Le mot de passe 'Adrien0334\$\$' ne semble pas être le bon."
echo ""
echo "Veuillez vérifier le mot de passe dans Supabase Dashboard :"
echo "https://supabase.com/dashboard/project/xlvlcnrkrqstfoadoamk/settings/database"
