# 🚂 Déploiement Railway - Configuration Minimale

## ✅ Variables **OBLIGATOIRES** (Database)

Railway va les injecter automatiquement si tu ajoutes l'addon **PostgreSQL** :

```bash
DATABASE_URL=postgresql://...  # Auto-injecté par Railway Postgres
```

Ensuite, dans les variables d'environnement Railway, ajouter :

```bash
APP_DATABASE_URL=jdbc:postgresql://[host]:[port]/[database]
APP_DATABASE_USERNAME=postgres
APP_DATABASE_PASSWORD=[password]
```

> **Astuce Railway** : Utilise les variables `${{Postgres.DATABASE_URL}}` pour référencer automatiquement.

---

## 🔧 Variables **OPTIONNELLES** (avec defaults)

Ces variables ont des valeurs par défaut et **ne bloqueront PAS** le déploiement :

| Variable | Default | Description |
|----------|---------|-------------|
| `APP_NAME` | `Gemsflow` | Nom de l'application |
| `APP_ACTIVE_PROFILE` | `prod` | Profil Spring Boot |
| `SERVER_PORT` | `8000` | Port d'écoute |
| `APP_SHOW_SQL` | `false` | Afficher les requêtes SQL |
| `APP_SWAGGER_ENABLE` | `true` | Activer Swagger UI |
| `APP_FILE_SOURCE` | `LOCAL` | Stockage fichiers (LOCAL ou S3) |

---

## 🎨 Frontend & CORS

```bash
APP_CORS_ALLOWED_ORIGINS=http://localhost:7101,https://your-frontend.railway.app
APP_FRONTEND_URL=https://your-frontend.railway.app
```

**Defaults :** `http://localhost:7101`

---

## 🔐 Sécurité / Keycloak (désactivée en dev)

```bash
APP_JWT_ISSUER_URI=https://your-keycloak.com/realms/atelier
APP_KEYCLOAK_URL=https://your-keycloak.com
APP_KEYCLOAK_REALM=atelier
APP_KEYCLOAK_CLIENT_ID=atelier-client
APP_KEYCLOAK_CLIENT_SECRET=secret
```

**Defaults :** Valeurs placeholder (auth désactivée dans `SecurityConfig.java` pour dev)

---

## 💳 Stripe (optionnel)

Ajouter **uniquement si tu veux activer les paiements** :

```bash
STRIPE_API_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_STANDARD_25_MONTHLY=price_...
STRIPE_PRICE_STANDARD_25_YEARLY=price_...
STRIPE_PRICE_STANDARD_20_MONTHLY=price_...
STRIPE_PRICE_STANDARD_20_YEARLY=price_...
```

**Defaults :** Vides (feature Stripe désactivée)

---

## 📊 QuickBooks (optionnel)

Ajouter **uniquement si tu veux l'intégration QuickBooks** :

```bash
QUICKBOOKS_CLIENT_ID=...
QUICKBOOKS_CLIENT_SECRET=...
QUICKBOOKS_REDIRECT_URI=https://your-app.railway.app/integrations/quickbooks/callback
QUICKBOOKS_ENV=production
```

**Defaults :** Vides / `sandbox` (feature QuickBooks désactivée)

---

## 📧 Email (optionnel)

```bash
APP_EMAIL_ENABLE=true
APP_EMAIL_HOST=smtp.gmail.com
APP_EMAIL_PORT=587
APP_EMAIL_USERNAME=your-email@gmail.com
APP_EMAIL_PASSWORD=your-app-password
APP_EMAIL_SENDER=noreply@gemsflow.com
```

**Defaults :** `APP_EMAIL_ENABLE=false` (emails désactivés)

---

## ☁️ S3 (optionnel - si FILE_SOURCE=S3)

```bash
APP_FILE_SOURCE=S3
APP_S3_REGION=us-east-1
APP_S3_ACCESS_KEY=...
APP_S3_SECRET_KEY=...
APP_S3_BUCKET=gemsflow-files
```

**Defaults :** `APP_FILE_SOURCE=LOCAL` (stockage local)

---

## 🚀 Démarrage Minimal sur Railway

### Configuration minimale (3 variables) :

```bash
APP_DATABASE_URL=jdbc:postgresql://[railway-host]:[port]/railway
APP_DATABASE_USERNAME=postgres
APP_DATABASE_PASSWORD=[railway-password]
```

**C'est tout !** L'app démarrera avec les defaults pour tout le reste.

---

## 📋 Checklist Déploiement

1. ✅ **Créer un projet Railway** et connecter le repo GitHub
2. ✅ **Ajouter l'addon PostgreSQL** (injecte DATABASE_URL)
3. ✅ **Configurer les 3 variables DB** ci-dessus
4. ✅ **Déployer** → Railway va détecter Maven automatiquement
5. ✅ **Vérifier** `/actuator/health` → devrait retourner `{"status":"UP"}`
6. ⚠️ **Ajouter Stripe/QuickBooks** plus tard si nécessaire

---

## 🔧 Build & Start Commands (auto-détectés)

Railway utilisera automatiquement :

```bash
# Build
mvn clean package -DskipTests

# Start
java -jar target/atelier-0.0.1-SNAPSHOT.jar
```

Configurés dans `railway.json` et `Procfile`.

---

## 🆘 Troubleshooting

### App crash au démarrage ?

1. Vérifier les logs Railway : chercher `Caused by:`
2. Vérifier que les 3 variables DB sont bien configurées
3. Vérifier que Postgres addon est bien démarré

### Liquibase migration failed ?

Railway Postgres est vide au départ → les migrations vont créer toutes les tables au premier démarrage.

### 403 Forbidden sur les endpoints ?

L'authentification est **désactivée** en dev (voir `SecurityConfig.java`). Tous les endpoints sont en `.permitAll()`.

---

## 📚 Ressources

- [Railway Docs](https://docs.railway.app/)
- [Railway Postgres](https://docs.railway.app/databases/postgresql)
- [Spring Boot Config](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#features.external-config)


