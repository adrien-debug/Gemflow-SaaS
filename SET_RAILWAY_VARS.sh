#!/bin/bash

echo "⚙️  Configuration des Variables Railway"
echo "========================================"
echo ""

# Variables Supabase
echo "📊 Configuration Supabase..."
railway variables set APP_DATABASE_URL="jdbc:postgresql://aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres"
railway variables set APP_DATABASE_USERNAME="postgres.xlvlcnrkrqstfoadoamk"
railway variables set APP_DATABASE_PASSWORD='Adrien0334$$'

# Variables Application
echo "🔧 Configuration Application..."
railway variables set APP_NAME="Gemsflow"
railway variables set APP_VERSION="1.0.0"
railway variables set SPRING_PROFILES_ACTIVE="prod"

# Variables JWT
echo "🔐 Configuration JWT..."
JWT_SECRET=$(openssl rand -base64 64 | tr -d '\n')
railway variables set JWT_SECRET="$JWT_SECRET"
railway variables set JWT_EXPIRATION="86400000"
railway variables set JWT_REFRESH_EXPIRATION="604800000"

# Variables CORS
echo "🌐 Configuration CORS..."
railway variables set CORS_ALLOWED_ORIGINS="*"

# Variables Serveur
echo "⚡ Configuration Serveur..."
railway variables set SERVER_PORT="7001"

echo ""
echo "✅ Variables configurées avec succès !"
echo ""
echo "📋 Variables définies :"
railway variables
