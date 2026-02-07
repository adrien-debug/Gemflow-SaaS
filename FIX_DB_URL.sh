#!/bin/bash

# Corriger l'URL de la base de données (utiliser URL directe au lieu du pooler)
sed -i '' 's|APP_DATABASE_URL=.*|APP_DATABASE_URL=jdbc:postgresql://db.xlvlcnrkrqstfoadoamk.supabase.co:5432/postgres|g' .env.local

echo "✅ URL de base de données corrigée"
echo ""
echo "Configuration finale :"
grep "DATABASE" .env.local | grep -v "^#"
