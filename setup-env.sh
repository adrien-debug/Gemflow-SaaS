#!/bin/bash

# Script d'initialisation de l'environnement local

echo "🔧 Configuration de l'environnement local pour Atelier Backend"
echo ""

# Vérifier si .env existe déjà
if [ -f .env ]; then
    echo "⚠️  Le fichier .env existe déjà."
    read -p "Voulez-vous le remplacer ? (o/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Oo]$ ]]; then
        echo "✅ Configuration annulée. Le fichier .env existant est conservé."
        exit 0
    fi
fi

# Vérifier si .env.example existe
if [ ! -f .env.example ]; then
    echo "❌ Le fichier .env.example n'existe pas."
    exit 1
fi

# Copier .env.example vers .env
cp .env.example .env

echo "✅ Fichier .env créé avec succès !"
echo ""
echo "📝 Prochaines étapes :"
echo "1. Éditer le fichier .env si nécessaire (notamment les mots de passe)"
echo "2. Démarrer PostgreSQL : docker compose up -d postgres"
echo "3. Lancer l'application : ./run-local.sh"
echo ""




