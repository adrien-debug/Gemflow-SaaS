# 🚀 Railway Quick Start - Gemsflow SaaS

## ⚡ Déploiement en 3 minutes

### 1️⃣ Copier les variables (1 min)

**Ouvrir le fichier `.railway-env-minimal`** et copier tout le contenu.

**Aller sur Railway :**
1. https://railway.app → Votre projet
2. Sélectionner le service backend
3. Onglet **Variables** → **Raw Editor**
4. **Coller** tout le contenu

### 2️⃣ Remplacer le mot de passe (30 sec)

**Remplacer cette ligne :**
```bash
APP_DATABASE_PASSWORD=<YOUR_SUPABASE_PASSWORD>
```

**Par le vrai mot de passe Supabase :**
```bash
APP_DATABASE_PASSWORD=VotreMdpSupabase123
```

### 3️⃣ Sauvegarder et déployer (1 min 30)

1. **Cliquer sur "Save"** dans Railway
2. Railway va automatiquement **redéployer**
3. **Attendre** 1-2 minutes que le build se termine

---

## ✅ Vérification

**Tester le healthcheck :**
```bash
curl https://your-app.railway.app/actuator/health
```

**Résultat attendu :**
```json
{"status":"UP"}
```

---

## 🔍 En cas d'erreur

**Voir les logs Railway :**
1. Railway Dashboard → Votre service → **Logs**
2. Chercher les lignes avec `ERROR` ou `Caused by:`

**Erreurs fréquentes :**

### ❌ "Driver claims to not accept jdbcUrl"
**Cause :** Variables DB manquantes ou mal configurées

**Solution :**
1. Vérifier que les 3 variables sont présentes :
   - `APP_DATABASE_URL`
   - `APP_DATABASE_USERNAME`
   - `APP_DATABASE_PASSWORD`
2. Vérifier qu'il n'y a pas de fautes de frappe
3. Re-sauvegarder les variables

### ❌ "Connection refused" ou "Timeout"
**Cause :** Supabase bloque la connexion

**Solution :**
1. Aller sur Supabase Dashboard → Settings → Database
2. Vérifier que **"Allow connections from any IP"** est activé
3. Ou ajouter les IPs de Railway dans la whitelist

### ❌ "Liquibase migration failed"
**Cause :** Problème de migration de base de données

**Solution :**
1. Vérifier que la base Supabase est accessible
2. Vérifier que l'utilisateur a les droits suffisants
3. Voir les logs pour identifier la migration qui échoue

---

## 📚 Documentation complète

- **Guide détaillé** : `RAILWAY_DEPLOY_GUIDE.md`
- **Variables complètes** : `.railway-env-example`
- **Script automatique** : `./setup-railway.sh`

---

## 🎯 Configuration actuelle

**Features actives :**
- ✅ API REST complète
- ✅ Base de données PostgreSQL (Supabase)
- ✅ Migrations Liquibase automatiques
- ✅ Healthcheck `/actuator/health`

**Features désactivées (pas de clés) :**
- ❌ QuickBooks
- ❌ Stripe
- ❌ Email SMTP
- ❌ AWS S3

**Pour activer ces features :**
Voir `RAILWAY_DEPLOY_GUIDE.md` section "Configuration avancée"

---

## 🆘 Support

**Problème de déploiement ?**
1. Vérifier les logs Railway
2. Vérifier la connexion Supabase
3. Consulter `RAILWAY_DEPLOY_GUIDE.md`
