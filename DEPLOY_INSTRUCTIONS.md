# 🚀 DÉPLOIEMENT RAILWAY - INSTRUCTIONS

## ✅ Prérequis vérifiés
- ✅ Build Maven réussi (`atelier-0.0.1-SNAPSHOT.jar`)
- ✅ Configuration Railway prête (`railway.json`, `nixpacks.toml`)
- ✅ Repo Git connecté : `https://github.com/adrien-debug/Gemflow-SaaS.git`

---

## 📋 ÉTAPE 1 : Copier les variables d'environnement

1. **Ouvrir le fichier** `DEPLOY_RAILWAY_NOW.txt`
2. **Copier TOUT le contenu** (Cmd+A, Cmd+C)
3. **Aller sur Railway** : https://railway.app
4. **Sélectionner ton projet backend**
5. **Onglet "Variables"** → **"Raw Editor"**
6. **Coller** le contenu (Cmd+V)
7. **IMPORTANT** : Remplacer `<YOUR_SUPABASE_PASSWORD>` par ton vrai mot de passe Supabase
8. **Cliquer "Save"**

---

## 📋 ÉTAPE 2 : Déployer via Railway Dashboard

### Option A : Nouveau projet Railway

1. **Aller sur** https://railway.app/new
2. **Cliquer "Deploy from GitHub repo"**
3. **Sélectionner** `adrien-debug/Gemflow-SaaS`
4. **Railway va détecter automatiquement** :
   - Java 21 (via `nixpacks.toml`)
   - Maven build
   - Port 8000
   - Healthcheck `/actuator/health`
5. **Suivre ÉTAPE 1** pour ajouter les variables
6. **Railway va build et déployer automatiquement**

### Option B : Projet Railway existant

1. **Aller sur ton projet Railway existant**
2. **Settings → Connect Repo**
3. **Sélectionner** `adrien-debug/Gemflow-SaaS`
4. **Suivre ÉTAPE 1** pour ajouter les variables
5. **Cliquer "Deploy"**

---

## 📋 ÉTAPE 3 : Vérifier le déploiement

### Attendre le build (2-3 minutes)

Railway va :
1. ✅ Installer Java 21
2. ✅ Build Maven (`./mvnw clean package`)
3. ✅ Créer le JAR
4. ✅ Démarrer l'application
5. ✅ Vérifier le healthcheck

### Tester l'API

Une fois déployé, Railway te donnera une URL (ex: `https://ton-app.railway.app`)

**Tester le healthcheck :**
```bash
curl https://ton-app.railway.app/actuator/health
```

**Résultat attendu :**
```json
{"status":"UP"}
```

**Tester l'API Swagger (si activé) :**
```
https://ton-app.railway.app/swagger-ui.html
```

---

## 🔍 En cas d'erreur

### Voir les logs Railway

1. **Railway Dashboard** → Ton service → **"Logs"**
2. **Chercher** les lignes avec `ERROR` ou `Caused by:`

### Erreurs fréquentes

#### ❌ "Driver claims to not accept jdbcUrl"
**Cause :** Variables DB manquantes ou mal configurées

**Solution :**
- Vérifier que `APP_DATABASE_URL`, `APP_DATABASE_USERNAME`, `APP_DATABASE_PASSWORD` sont présentes
- Vérifier qu'il n'y a pas de fautes de frappe
- Re-sauvegarder les variables

#### ❌ "Connection refused" ou "Timeout"
**Cause :** Supabase bloque la connexion

**Solution :**
1. Aller sur **Supabase Dashboard** → Settings → Database
2. Vérifier que **"Allow connections from any IP"** est activé (0.0.0.0/0)
3. Ou ajouter les IPs de Railway dans la whitelist

#### ❌ "Liquibase migration failed"
**Cause :** Problème de migration de base de données

**Solution :**
1. Vérifier que la base Supabase est accessible
2. Vérifier que l'utilisateur a les droits suffisants
3. Voir les logs pour identifier la migration qui échoue

---

## 🎯 Configuration actuelle

**Features actives :**
- ✅ API REST complète
- ✅ PostgreSQL (Supabase)
- ✅ Migrations Liquibase automatiques
- ✅ Healthcheck `/actuator/health`
- ✅ CORS configuré
- ✅ Java 21 + Spring Boot 3.4.4

**Features désactivées (pas de clés) :**
- ❌ QuickBooks
- ❌ Stripe
- ❌ Email SMTP
- ❌ AWS S3
- ❌ Keycloak (placeholders)

---

## 📞 Support

**Problème de déploiement ?**
1. Vérifier les logs Railway
2. Vérifier la connexion Supabase
3. Vérifier que toutes les variables sont présentes
4. Vérifier que le mot de passe Supabase est correct

**Le backend est prêt à être déployé !** 🚀
