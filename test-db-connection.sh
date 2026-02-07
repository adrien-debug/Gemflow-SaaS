#!/bin/bash

echo "🔍 Test de connexion à Supabase..."
echo ""

# Configuration
DB_HOST="aws-0-eu-central-1.pooler.supabase.com"
DB_PORT="6543"
DB_NAME="postgres"
DB_USER="postgres.xlvlcnrkrqstfoadoamk.pooler"
DB_PASS="sU09Oh/Qs2OMXrQbzoee/j/JjW8wKi3zKo5UADCloFS8mXC0FWc8jkeaPBIouGJKNzYJuoyYEZ7WSLTD2fm+aQ=="

echo "Configuration :"
echo "  Host: $DB_HOST"
echo "  Port: $DB_PORT"
echo "  Database: $DB_NAME"
echo "  User: $DB_USER"
echo "  Password: ${DB_PASS:0:20}..."
echo ""

# Test avec psql
echo "Test de connexion avec psql..."
PGPASSWORD="$DB_PASS" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "SELECT version();" 2>&1

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Connexion réussie !"
else
    echo ""
    echo "❌ Échec de connexion"
    echo ""
    echo "📋 Vérifiez :"
    echo "  1. Le mot de passe est correct"
    echo "  2. Le username est au bon format (.pooler pour le pooler)"
    echo "  3. L'instance Supabase est active"
fi
