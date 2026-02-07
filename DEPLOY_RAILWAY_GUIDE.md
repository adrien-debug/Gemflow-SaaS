# 🚀 Guide de Déploiement Railway - Gemflow Backend

## 📋 Prérequis

- ✅ Railway CLI installé
- ✅ Connecté à Railway (`railway whoami`)
- ✅ Projet "Gem-Flow" lié

## 🎯 Déploiement Rapide (3 étapes)

### Étape 1 : Créer/Lier le Service

```bash
cd gemflow-backend

# Si le service n'existe pas encore
railway service create gemflow-backend

# Ou lier un service existant
railway service link
```

### Étape 2 : Configurer les Variables d'Environnement

Ouvrir le dashboard Railway :
```bash
railway open
```

Puis dans l'interface web :
1. Aller dans **"Variables"**
2. Cliquer sur **"Raw Editor"**
3. Copier-coller le contenu de `.env.railway`

**OU** en ligne de commande (une par une) :

```bash
# Database
railway variables --set APP_DATABASE_URL="jdbc:postgresql://aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres"
railway variables --set APP_DATABASE_USERNAME="postgres.xlvlcnrkrqstfoadoamk"
railway variables --set APP_DATABASE_PASSWORD="Adrien0334\$\$"

# Application
railway variables --set APP_NAME="Gemsflow"
railway variables --set SPRING_PROFILES_ACTIVE="prod"

# JWT (générer un secret sécurisé)
railway variables --set JWT_SECRET="$(openssl rand -base64 64 | tr -d '\n')"
railway variables --set JWT_EXPIRATION="86400000"

# CORS
railway variables --set CORS_ALLOWED_ORIGINS="*"

# Server
railway variables --set SERVER_PORT="7001"
```

### Étape 3 : Déployer

```bash
railway up
```

## 🔍 Vérification

### Voir le statut
```bash
railway status
```

### Voir les logs
```bash
railway logs
```

### Obtenir l'URL
```bash
railway domain
```

### Tester l'API
```bash
# Remplacer YOUR_DOMAIN par votre domaine Railway
curl https://YOUR_DOMAIN.railway.app/actuator/health
```

## 📊 Configuration des Variables (Détails)

### Variables Obligatoires

| Variable | Valeur | Description |
|----------|--------|-------------|
| `APP_DATABASE_URL` | `jdbc:postgresql://aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres` | URL JDBC Supabase |
| `APP_DATABASE_USERNAME` | `postgres.xlvlcnrkrqstfoadoamk` | Username Supabase |
| `APP_DATABASE_PASSWORD` | `Adrien0334$$` | Password Supabase |
| `SPRING_PROFILES_ACTIVE` | `prod` | Profil Spring Boot |
| `JWT_SECRET` | (64+ caractères) | Secret JWT |
| `SERVER_PORT` | `7001` | Port du serveur |

### Variables Optionnelles

| Variable | Valeur par défaut | Description |
|----------|-------------------|-------------|
| `APP_NAME` | `Gemsflow` | Nom de l'application |
| `CORS_ALLOWED_ORIGINS` | `*` | Origins CORS autorisées |
| `JWT_EXPIRATION` | `86400000` | Expiration JWT (24h) |
| `LOGGING_LEVEL_ROOT` | `INFO` | Niveau de log |

## 🔧 Commandes Utiles

### Redéployer
```bash
railway up --detach
```

### Redémarrer le service
```bash
railway restart
```

### Voir les variables
```bash
railway variables
```

### Ouvrir le dashboard
```bash
railway open
```

### Voir les déploiements
```bash
railway deployments
```

## 🌐 Domaine Personnalisé

### Générer un domaine Railway
```bash
railway domain
```

### Ajouter un domaine personnalisé
1. Ouvrir le dashboard : `railway open`
2. Aller dans **"Settings"** > **"Domains"**
3. Cliquer sur **"Custom Domain"**
4. Entrer votre domaine
5. Configurer les DNS selon les instructions

## 🔍 Debugging

### Logs en temps réel
```bash
railway logs --follow
```

### Logs d'un déploiement spécifique
```bash
railway logs --deployment <deployment-id>
```

### Shell dans le container
```bash
railway shell
```

### Variables d'environnement
```bash
railway variables
```

## ⚠️ Points Importants

1. **JWT_SECRET** : Générer un secret sécurisé unique pour la production
2. **CORS** : En production, remplacer `*` par les domaines autorisés
3. **Logs** : Surveiller les logs après le premier déploiement
4. **Health Check** : Railway utilise `/actuator/health/railway`
5. **Port** : Railway expose automatiquement le port défini dans `SERVER_PORT`

## 📝 Checklist de Déploiement

- [ ] Service créé/lié
- [ ] Variables d'environnement configurées
- [ ] JWT_SECRET généré (64+ caractères)
- [ ] Déploiement lancé (`railway up`)
- [ ] Logs vérifiés (`railway logs`)
- [ ] Health check OK (`/actuator/health`)
- [ ] Domaine configuré
- [ ] API testée

## 🆘 Problèmes Courants

### "No service linked"
```bash
railway service link
```

### "Build failed"
Vérifier les logs :
```bash
railway logs --deployment <last-deployment-id>
```

### "Database connection failed"
Vérifier les variables :
```bash
railway variables | grep DATABASE
```

### "Port already in use"
Railway gère automatiquement les ports, pas besoin de configuration spéciale.

---

**Prêt à déployer ?** Exécutez :
```bash
railway up
```
