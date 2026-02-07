#!/bin/bash

# ============================================
# SCRIPT DE CONFIGURATION ENVIRONNEMENT LOCAL
# ============================================
# Ce script configure votre backend local pour se connecter à Supabase

echo "🚀 Configuration de l'environnement local..."

# Créer le fichier .env.local
cat > .env.local << 'EOF'
# ============================================
# CONFIGURATION LOCALE - CONNEXION À SUPABASE
# ============================================
# Ce fichier configure votre backend local pour se connecter à la base Supabase

# === DATABASE SUPABASE (PRODUCTION) ===
# Connexion directe à Supabase PostgreSQL
APP_DATABASE_URL=jdbc:postgresql://db.xlvlcnrkrqstfoadoamk.supabase.co:5432/postgres
APP_DATABASE_USERNAME=postgres.xlvlcnrkrqstfoadoamk
APP_DATABASE_PASSWORD=YOUR_SUPABASE_PASSWORD_HERE

# Alternative : Utiliser le pooler (recommandé pour production)
# APP_DATABASE_URL=jdbc:postgresql://aws-0-eu-central-1.pooler.supabase.com:6543/postgres

# === APPLICATION ===
APP_NAME=Gemsflow
APP_ACTIVE_PROFILE=dev
SERVER_PORT=7001

# === LOGS & DEBUG ===
APP_SHOW_SQL=true
LOGGING_LEVEL_ROOT=INFO
LOGGING_LEVEL_APP=DEBUG

# === SWAGGER (activé en local) ===
APP_SWAGGER_ENABLE=true

# === CORS (autoriser frontend local) ===
APP_CORS_ALLOWED_ORIGINS=http://localhost:7101,http://localhost:3000,https://gemflow-saas.vercel.app

# === KEYCLOAK (PRODUCTION RAILWAY) ===
APP_KEYCLOAK_URL=https://keycloak-production-7a33.up.railway.app
APP_KEYCLOAK_REALM=atelier
APP_KEYCLOAK_CLIENT_ID=atelier-client
APP_KEYCLOAK_CLIENT_SECRET=q7uJjZgSfhVNseuzUW55Aw8NCmtxBqrJ
APP_JWT_ISSUER_URI=https://keycloak-production-7a33.up.railway.app/realms/atelier

# === EMAIL (désactivé en local) ===
APP_EMAIL_ENABLE=false

# === STORAGE (local) ===
APP_FILE_SOURCE=LOCAL
APP_FILE_STORAGE_PATH=./uploads

# === QUICKBOOKS (désactivé - pas de clés) ===
# Décommenter et configurer si besoin
# QUICKBOOKS_CLIENT_ID=your_client_id
# QUICKBOOKS_CLIENT_SECRET=your_client_secret
# QUICKBOOKS_REDIRECT_URI=http://localhost:7001/api/v1/integrations/quickbooks/callback
# QUICKBOOKS_ENV=sandbox

# === STRIPE (désactivé - pas de clés) ===
# Décommenter et configurer si besoin
# STRIPE_API_KEY=sk_test_...
# STRIPE_WEBHOOK_SECRET=whsec_...
EOF

echo "✅ Fichier .env.local créé"
echo ""
echo "⚠️  ACTION REQUISE :"
echo "1. Ouvrir le fichier .env.local"
echo "2. Remplacer YOUR_SUPABASE_PASSWORD_HERE par votre vrai mot de passe Supabase"
echo ""
echo "📍 Fichier créé : $(pwd)/.env.local"
echo ""
echo "🔗 Pour obtenir votre mot de passe Supabase :"
echo "   → https://supabase.com/dashboard/project/xlvlcnrkrqstfoadoamk/settings/database"
echo ""
echo "🚀 Après configuration, démarrer le backend avec :"
echo "   ./mvnw spring-boot:run -Dspring-boot.run.profiles=dev"
