#!/bin/bash

# Utiliser le pooler Supabase (port 6543) au lieu du port direct (5432)
sed -i '' 's|APP_DATABASE_URL=.*|APP_DATABASE_URL=jdbc:postgresql://aws-0-eu-central-1.pooler.supabase.com:6543/postgres|g' .env.local

# Le username doit être au format postgres.xlvlcnrkrqstfoadoamk (sans le .pooler)
sed -i '' 's|APP_DATABASE_USERNAME=.*|APP_DATABASE_USERNAME=postgres.xlvlcnrkrqstfoadoamk|g' .env.local

echo "✅ Configuration mise à jour pour utiliser le pooler Supabase"
echo ""
echo "Configuration finale :"
grep "DATABASE" .env.local | grep -v "^#"
