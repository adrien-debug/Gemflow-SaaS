#!/bin/bash

# Mise à jour du mot de passe Supabase correct
sed -i '' 's|APP_DATABASE_PASSWORD=.*|APP_DATABASE_PASSWORD=sU09Oh/Qs2OMXrQbzoee/j/JjW8wKi3zKo5UADCloFS8mXC0FWc8jkeaPBIouGJKNzYJuoyYEZ7WSLTD2fm+aQ==|g' .env.local

echo "✅ Mot de passe mis à jour dans .env.local"
echo ""
echo "Vérification de la configuration :"
grep "DATABASE" .env.local | grep -v "^#"
