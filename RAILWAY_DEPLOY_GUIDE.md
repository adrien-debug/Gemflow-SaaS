# 🚂 Guide de Déploiement Railway - Gemsflow SaaS

## 📋 Prérequis

- ✅ Compte Railway : https://railway.app
- ✅ Compte Supabase : https://supabase.com
- ✅ Repository GitHub connecté à Railway

---

## 🚀 Déploiement en 5 étapes

### 1️⃣ Créer le service sur Railway

1. Aller sur https://railway.app
2. **New Project** → **Deploy from GitHub repo**
3. Sélectionner le repo `Gemflow-SaaS`
4. Railway va détecter automatiquement le projet Java/Maven

### 2️⃣ Configurer les variables d'environnement

**Copier le contenu de `.railway-env-minimal`** :

```bash
# Aller dans Railway Dashboard
→ Sélectionner votre service
→ Onglet "Variables"
→ Cliquer sur "Raw Editor"
→ Coller tout le contenu de .railway-env-minimal
```

**⚠️ IMPORTANT : Remplacer les valeurs suivantes :**

```bash
# Remplacer par le vrai mot de passe Supabase
APP_DATABASE_PASSWORD=<YOUR_SUPABASE_PASSWORD>

# Remplacer par l'URL de votre frontend Railway (si déployé)
APP_CORS_ALLOWED_ORIGINS=http://localhost:7101,https://your-frontend.railway.app
APP_FRONTEND_URL=https://your-frontend.railway.app
```

**Variables obligatoires minimum :**
```bash
APP_DATABASE_URL=jdbc:postgresql://db.ldnvfnwkqywdgnsrqxuq.supabase.co:5432/postgres
APP_DATABASE_USERNAME=postgres
APP_DATABASE_PASSWORD=<votre_mot_de_passe>
```

### 3️⃣ Vérifier la configuration du build

Railway utilise **Nixpacks** pour détecter automatiquement le projet.

**Fichiers de configuration (déjà présents) :**

- `nixpacks.toml` : Configure Java 21 + Maven
- `railway.json` : Configure le healthcheck `/actuator/health`
- `Procfile` : Commande de démarrage

**Build automatique :**
```bash
# Railway exécute automatiquement :
./mvnw -B -DskipTests clean package
java -jar target/atelier-0.0.1-SNAPSHOT.jar
```

### 4️⃣ Déployer

1. **Sauvegarder les variables** → Railway va automatiquement redéployer
2. **Suivre les logs** dans Railway Dashboard → Logs
3. **Attendre** que le build se termine (~3-5 minutes)

### 5️⃣ Vérifier le déploiement

**Tester le healthcheck :**
```bash
curl https://your-app.railway.app/actuator/health
```

**Réponse attendue :**
```json
{"status":"UP"}
```

**Tester Swagger UI (si activé) :**
```
https://your-app.railway.app/swagger-ui.html
```

---

## 🔍 Troubleshooting

### ❌ Erreur : "Driver claims to not accept jdbcUrl, ${APP_DATABASE_URL}"

**Cause :** Les variables d'environnement ne sont pas configurées.

**Solution :**
1. Vérifier que les 3 variables DB sont bien définies dans Railway
2. Vérifier qu'il n'y a pas de fautes de frappe
3. Re-déployer manuellement depuis Railway Dashboard

### ❌ Erreur : "Connection refused" ou "Timeout"

**Cause :** Supabase bloque la connexion.

**Solution :**
1. Aller sur Supabase Dashboard → Settings → Database
2. Vérifier que **"Allow connections from any IP"** est activé
3. Ou ajouter les IPs de Railway dans la whitelist

### ❌ Erreur : "Liquibase migration failed"

**Cause :** Les migrations Liquibase échouent.

**Solution :**
1. Vérifier les logs Railway pour voir quelle migration échoue
2. Vérifier que la base Supabase est accessible
3. Vérifier que l'utilisateur `postgres` a les droits suffisants

### ❌ Application crash au démarrage

**Vérifier les logs Railway :**
```bash
# Dans Railway Dashboard → Logs
# Chercher les lignes avec "ERROR" ou "Caused by:"
```

**Causes fréquentes :**
- Variables DB manquantes ou incorrectes
- Base de données Supabase inaccessible
- Port déjà utilisé (Railway gère automatiquement via `PORT`)

---

## 🎯 Configuration Minimale (Sans QuickBooks/Stripe)

Le déploiement actuel **ne nécessite PAS** :
- ❌ QuickBooks (pas de clés configurées)
- ❌ Stripe (pas de clés configurées)
- ❌ Email SMTP (désactivé par défaut)
- ❌ AWS S3 (stockage local par défaut)

**Features actives :**
- ✅ API REST complète
- ✅ Base de données PostgreSQL (Supabase)
- ✅ Migrations Liquibase automatiques
- ✅ Swagger UI (si `APP_SWAGGER_ENABLE=true`)
- ✅ Healthcheck `/actuator/health`

---

## 📊 Monitoring

### Healthcheck Railway

Railway vérifie automatiquement `/actuator/health` toutes les 5 minutes.

**Configuration dans `railway.json` :**
```json
{
  "deploy": {
    "healthcheckPath": "/actuator/health",
    "healthcheckTimeout": 300
  }
}
```

### Logs

**Voir les logs en temps réel :**
1. Railway Dashboard → Votre service → **Logs**
2. Filtrer par niveau : `ERROR`, `WARN`, `INFO`

**Logs importants à surveiller :**
- ✅ `Starting AtelierBackendApplication` : Démarrage OK
- ✅ `Tomcat initialized with port` : Port détecté
- ✅ `HikariPool-1 - Starting...` : Connexion DB en cours
- ✅ `Liquibase: Update has been successful` : Migrations OK
- ❌ `Driver claims to not accept jdbcUrl` : Variables DB manquantes

---

## 🔐 Sécurité

### Variables sensibles

**⚠️ NE JAMAIS commiter :**
- Mot de passe Supabase
- Clés API Stripe/QuickBooks (si ajoutées plus tard)
- Secrets JWT/Keycloak

**Utiliser Railway Secrets :**
Les variables dans Railway sont automatiquement chiffrées.

### CORS

**Configuration actuelle :**
```yaml
APP_CORS_ALLOWED_ORIGINS=http://localhost:7101,https://your-frontend.railway.app
```

**⚠️ Remplacer** `https://your-frontend.railway.app` par l'URL réelle de votre frontend.

---

## 📚 Ressources

- [Railway Docs](https://docs.railway.app/)
- [Nixpacks Docs](https://nixpacks.com/)
- [Supabase Docs](https://supabase.com/docs)
- [Spring Boot Actuator](https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html)

---

## 🆘 Support

**En cas de problème :**
1. Vérifier les logs Railway
2. Vérifier la connexion Supabase
3. Vérifier les variables d'environnement
4. Consulter le fichier `RAILWAY_DEPLOY.md` pour plus de détails
