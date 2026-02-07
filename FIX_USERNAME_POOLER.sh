#!/bin/bash

# Pour le pooler, le username doit avoir le suffixe .pooler
sed -i '' 's|APP_DATABASE_USERNAME=.*|APP_DATABASE_USERNAME=postgres.xlvlcnrkrqstfoadoamk.pooler|g' .env.local

echo "✅ Username corrigé pour le pooler"
echo ""
echo "Configuration finale :"
grep "DATABASE" .env.local | grep -v "^#"
