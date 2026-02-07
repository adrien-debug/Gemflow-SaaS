#!/bin/bash

# ============================================
# SCRIPT FIX CONNEXION BASE DE DONNÉES
# ============================================

echo "🔧 Fix de la connexion base de données..."
echo ""

# Backup du fichier actuel
cp .env.local .env.local.backup
echo "✅ Backup créé : .env.local.backup"

# Mettre à jour l'instance Supabase
sed -i '' 's|db.xlvlcnrkrqstfoadoamk.supabase.co|db.ldnvfnwkqywdgnsrqxuq.supabase.co|g' .env.local
sed -i '' 's|postgres.xlvlcnrkrqstfoadoamk|postgres.ldnvfnwkqywdgnsrqxuq|g' .env.local
sed -i '' 's|APP_DATABASE_PASSWORD=.*|APP_DATABASE_PASSWORD=Adrien0334$$|g' .env.local

echo "✅ Fichier .env.local mis à jour"
echo ""
echo "📋 Nouvelle configuration :"
echo "   Instance : ldnvfnwkqywdgnsrqxuq"
echo "   Host     : db.ldnvfnwkqywdgnsrqxuq.supabase.co"
echo "   User     : postgres.ldnvfnwkqywdgnsrqxuq"
echo ""
echo "🚀 Pour démarrer le backend :"
echo "   export \$(cat .env.local | grep -v '^#' | xargs)"
echo "   ./mvnw spring-boot:run -Dspring-boot.run.profiles=dev"
