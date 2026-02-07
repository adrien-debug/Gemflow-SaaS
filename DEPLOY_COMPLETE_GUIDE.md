# 🚀 GUIDE COMPLET DÉPLOIEMENT RAILWAY

## 📋 Vue d'ensemble

Tu dois déployer **2 services** sur Railway :
1. **Backend** (Spring Boot Java) → API REST
2. **Frontend** (React + Vite) → Interface utilisateur

---

## 🔧 SERVICE 1 : BACKEND (API)

### Configuration Railway

| Paramètre | Valeur |
|-----------|--------|
| **Source Repo** | `adrien-debug/Gemflow-SaaS` |
| **Root Directory** | `/` (racine) ou **VIDE** |
| **Branch** | `main` |

### Variables d'environnement

**Copier depuis** `DEPLOY_RAILWAY_NOW.txt` :

```bash
APP_DATABASE_URL=jdbc:postgresql://db.ldnvfnwkqywdgnsrqxuq.supabase.co:5432/postgres
APP_DATABASE_USERNAME=postgres.ldnvfnwkqywdgnsrqxuq
APP_DATABASE_PASSWORD=<TON_MOT_DE_PASSE_SUPABASE>

APP_NAME=Gemsflow
APP_ACTIVE_PROFILE=prod
SERVER_PORT=8000
PORT=8000

APP_SHOW_SQL=false
APP_SWAGGER_ENABLE=false

APP_CORS_ALLOWED_ORIGINS=https://${{RAILWAY_PUBLIC_DOMAIN}},http://localhost:7101
APP_FRONTEND_URL=https://${{RAILWAY_PUBLIC_DOMAIN}}

APP_JWT_ISSUER_URI=https://placeholder-keycloak.com/realms/atelier
APP_KEYCLOAK_URL=https://placeholder-keycloak.com
APP_KEYCLOAK_REALM=atelier
APP_KEYCLOAK_CLIENT_ID=atelier-client
APP_KEYCLOAK_CLIENT_SECRET=
APP_KEYCLOAK_ORGANIZATION=Gemsflow

APP_EMAIL_ENABLE=false
APP_FILE_SOURCE=LOCAL

QUICKBOOKS_CLIENT_ID=
QUICKBOOKS_CLIENT_SECRET=
QUICKBOOKS_REDIRECT_URI=https://${{RAILWAY_PUBLIC_DOMAIN}}/integrations/quickbooks/callback
QUICKBOOKS_ENV=sandbox

STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=
```

### ⚠️ IMPORTANT

**Remplacer** `<TON_MOT_DE_PASSE_SUPABASE>` par ton vrai mot de passe Supabase !

### Vérification

Une fois déployé, tester :
```bash
curl https://ton-backend.railway.app/actuator/health
```

Résultat attendu :
```json
{"status":"UP"}
```

---

## 🎨 SERVICE 2 : FRONTEND (UI)

### Configuration Railway

| Paramètre | Valeur |
|-----------|--------|
| **Source Repo** | `adrien-debug/Gemflow-SaaS` |
| **Root Directory** | `/frontend` |
| **Branch** | `main` |

### Variables d'environnement

**Copier depuis** `frontend/DEPLOY_RAILWAY_FRONTEND.txt` :

```bash
# Remplacer par l'URL de ton backend Railway
VITE_BACKEND_HOST=https://ton-backend.railway.app

# Auth (optionnel - laisser vide si pas utilisé)
VITE_AUTH_HOST=
VITE_AUTH_REALM=
VITE_AUTH_CLIENT_ID=
VITE_AUTH_CLIENT_SECRET=
VITE_AUTH_CLIENT_SCOPE=

PORT=3000
```

### ⚠️ IMPORTANT

**Remplacer** `https://ton-backend.railway.app` par l'URL réelle de ton service backend Railway !

### Vérification

Une fois déployé, ouvrir l'URL du frontend dans le navigateur.

---

## 📝 ÉTAPES DE DÉPLOIEMENT

### 1. Déployer le BACKEND d'abord

1. **Aller sur** https://railway.app/new
2. **Cliquer** "Deploy from GitHub repo"
3. **Sélectionner** `adrien-debug/Gemflow-SaaS`
4. **Root Directory** : `/` ou **vide**
5. **Variables** → Raw Editor → Coller le contenu de `DEPLOY_RAILWAY_NOW.txt`
6. **Remplacer** le mot de passe Supabase
7. **Save** → Attendre le déploiement (2-3 min)
8. **Copier l'URL** du backend (ex: `https://backend-production-abc123.railway.app`)

### 2. Déployer le FRONTEND ensuite

1. **Dans le même projet Railway** → **New Service**
2. **Cliquer** "Deploy from GitHub repo"
3. **Sélectionner** `adrien-debug/Gemflow-SaaS`
4. **Root Directory** : `/frontend`
5. **Variables** → Raw Editor → Coller le contenu de `frontend/DEPLOY_RAILWAY_FRONTEND.txt`
6. **Remplacer** `VITE_BACKEND_HOST` par l'URL du backend (étape 1.8)
7. **Save** → Attendre le déploiement (2-3 min)

### 3. Tester l'application complète

1. **Ouvrir** l'URL du frontend dans le navigateur
2. **Vérifier** que l'interface se charge
3. **Tester** une requête API (ex: login, liste de données)

---

## 🔍 DÉPANNAGE

### Backend : Erreur "password authentication failed"

**Solution :**
- Vérifier le mot de passe Supabase dans `APP_DATABASE_PASSWORD`
- Aller sur Supabase Dashboard → Settings → Database → Copier le mot de passe
- Mettre à jour dans Railway Variables

### Backend : Erreur "Connection refused"

**Solution :**
- Aller sur Supabase Dashboard → Settings → Database
- Activer "Allow connections from any IP" (0.0.0.0/0)

### Frontend : Erreur "Cannot find module @rollup/rollup-linux-x64-gnu"

**Solution :**
- ✅ Déjà fixé avec `frontend/nixpacks.toml`
- Vérifier que le fichier est bien dans le repo
- Redéployer

### Frontend : Erreur "Failed to fetch" ou "Network Error"

**Solution :**
- Vérifier que `VITE_BACKEND_HOST` pointe vers la bonne URL backend
- Vérifier que le backend est bien déployé et accessible
- Vérifier les CORS dans le backend (`APP_CORS_ALLOWED_ORIGINS`)

---

## 📊 RÉCAPITULATIF

| Service | Root Directory | Port | URL Exemple |
|---------|----------------|------|-------------|
| **Backend** | `/` | 8000 | `https://backend-production-abc123.railway.app` |
| **Frontend** | `/frontend` | 3000 | `https://frontend-production-xyz789.railway.app` |

---

## ✅ CHECKLIST FINALE

### Backend
- [ ] Service créé sur Railway
- [ ] Root Directory = `/` ou vide
- [ ] Variables copiées depuis `DEPLOY_RAILWAY_NOW.txt`
- [ ] Mot de passe Supabase remplacé
- [ ] Déploiement réussi
- [ ] Healthcheck OK (`/actuator/health`)

### Frontend
- [ ] Service créé sur Railway
- [ ] Root Directory = `/frontend`
- [ ] Variables copiées depuis `frontend/DEPLOY_RAILWAY_FRONTEND.txt`
- [ ] URL backend remplacée dans `VITE_BACKEND_HOST`
- [ ] Déploiement réussi
- [ ] Interface accessible dans le navigateur

---

## 🎯 PROCHAINES ÉTAPES

Une fois les 2 services déployés :

1. **Configurer un domaine personnalisé** (optionnel)
   - Railway Dashboard → Service → Settings → Domains

2. **Activer les features désactivées** (optionnel)
   - QuickBooks : Ajouter `QUICKBOOKS_CLIENT_ID` et `QUICKBOOKS_CLIENT_SECRET`
   - Stripe : Ajouter `STRIPE_API_KEY` et les price IDs
   - Email : Activer `APP_EMAIL_ENABLE=true` et configurer SMTP
   - S3 : Changer `APP_FILE_SOURCE=S3` et configurer les clés AWS

3. **Monitorer les logs**
   - Railway Dashboard → Service → Logs

---

**Tout est prêt pour le déploiement ! 🚀**
