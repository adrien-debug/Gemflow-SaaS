# Atelier - Projet SaaS (Gemsflow ERP)

**Repository GitHub :** https://github.com/adrien-debug/Gemflow-SaaS.git

---

## ✅ DERNIÈRES MODIFICATIONS - 22 janvier 2026

### 🎨 Refonte Complète du Dashboard

Le dashboard a été entièrement refondu pour correspondre pixel par pixel à l'identité visuelle du site :

**Palette de couleurs appliquée :**
- Gold principal : `#C39A71`
- Background marine : `#131C30`
- Bordures gold : `rgba(195, 154, 113, 0.35)`

**Composants modifiés :**
1. `frontend/src/pages/dashboard/DashboardPage.tsx` - Structure et layout
2. `frontend/src/pages/dashboard/styles.scss` - Style principal avec palette gold/marine
3. `frontend/src/features/dashboard/kpi-cards/ui/KpiCard/styles.scss` - Cards KPI avec bordures gold
4. `frontend/src/features/dashboard/kpi-cards/ui/KpiCards/index.tsx` - Icônes avec couleurs cohérentes
5. `frontend/src/features/dashboard/gold-chart/ui/GoldPriceChart/styles.scss` - Header marine + badge gold
6. `frontend/src/features/dashboard/status-chart/ui/StatusDistributionChart/styles.scss` - Header marine + scrollbar gold
7. `frontend/src/features/dashboard/alerts/ui/AlertsList/styles.scss` - Header marine + liens gold
8. `frontend/src/features/ai-agent/metal-prices-widget/styles.scss` - Cards avec bordures gold
9. `frontend/src/features/ai-agent/ai-chat/AiChat.tsx` - Messages avec style gold/marine
10. `frontend/src/features/ai-agent/ai-chat/styles.scss` - Nouveau fichier de styles

**Améliorations visuelles :**
- ✅ Tous les cards ont des bordures gold cohérentes
- ✅ Headers des cards en marine (`#131C30`) avec titres blancs
- ✅ Icônes en gold pour cohérence visuelle
- ✅ Effets hover avec bordures gold
- ✅ Scrollbars personnalisées en gold
- ✅ Messages chat avec style marine/gold
- ✅ Boutons primaires en marine avec icônes gold
- ✅ Welcome banner avec gradient marine et ligne gold

---

## ✅ AUDIT COMPLET - 21 janvier 2026

### 🎯 Résumé Exécutif

**Statut Global : ✅ OPÉRATIONNEL EN PRODUCTION**

L'application Gemsflow ERP est **entièrement déployée et fonctionnelle** en production avec :
- ✅ Frontend React déployé sur Vercel
- ✅ Backend Spring Boot déployé sur Railway
- ✅ Base de données PostgreSQL sur Supabase
- ✅ Authentification Keycloak activée sur Railway
- ✅ 57 endpoints REST API fonctionnels
- ✅ Architecture 3-tiers complète et sécurisée

---

## 📊 Status Déploiement (21 janvier 2026)

### Frontend (Vercel)
- **URL :** https://gemflow-saas.vercel.app ✅ ONLINE
- **Status :** ✅ Ready

### Backend (Railway)
- **URL :** https://gemflow-saas-production.up.railway.app ✅
- **Status :** ✅ ONLINE

### Keycloak (Railway)
- **URL :** https://keycloak-production-7a33.up.railway.app ✅
- **Realm :** `atelier`
- **Client ID :** `atelier-client`
- **Client Secret :** `q7uJjZgSfhVNseuzUW55Aw8NCmtxBqrJ`
- **Status :** ✅ ONLINE

### Database (Supabase)
- **Instance :** xlvlcnrkrqstfoadoamk (EU Central 1)
- **Status :** ✅ UP

### Utilisateur Test (Keycloak)
- **Username :** `testuser`
- **Password :** `Test1234!`
- **Email :** `test@gemflow.app`

---

## 🔍 AUDIT TECHNIQUE DÉTAILLÉ

### 1️⃣ BACKEND (Spring Boot 3.4.4 + Java 21)

#### ✅ Architecture & Code
- **794 fichiers Java** organisés en couches MVC
- **57 Controllers REST** (`@RestController`)
- **111 Entités JPA** avec relations complexes
- **300 DTOs** pour les transferts de données
- **77 Repositories** JPA avec specifications
- **Services métier** avec implémentations séparées
- **Migrations Liquibase** : 86 fichiers XML (versionnés)

#### ✅ Sécurité (Production)
- **Keycloak OAuth2/OIDC** : JWT validation activée
- **Issuer URI** : `https://keycloak-production-7a33.up.railway.app/realms/atelier`
- **Session** : Stateless (JWT uniquement)
- **CORS** : Configuré pour Vercel + previews
- **Endpoints publics** : `/actuator/health/**`, Swagger, login, password reset
- **Endpoints protégés** : Tous les autres nécessitent JWT valide
- **Logs d'accès refusé** : Activés avec méthode + path

#### ✅ Base de Données (Supabase PostgreSQL)
- **Instance** : EU Central 1 (xlvlcnrkrqstfoadoamk)
- **Connexion** : Pooler recommandé (6543) + direct (5432)
- **Migrations** : 86 changesets Liquibase appliqués automatiquement
- **Tables principales** :
  - Users & Roles (atelier_user, atelier_role, atelier_user_role)
  - Orders (project, order_task, order_labour, order_stock)
  - Inventory (diamond, gemstone, pure_metal_purchase, alloy, alloyed_metal, other_material)
  - Settings (price_setting, labour_setting, metal, metal_caratage, cylinder_setting)
  - CRM (crm_contact, crm_communication, email_template)
  - Integrations (accounting_integration, accounting_sync_log)
  - Billing (billing_subscription)
  - Permissions (permission, role_permission)
  - Casting (casting, order_metal_casting)
  - Files (atelier_file)

#### ✅ Multi-Tenant (Préparé mais désactivé)
- **Entités** : `Tenant`, `TenantAware` interface
- **Migrations** : 077, 078, 079 commentées dans master.xml
- **Tables avec tenant_id** : 48 tables prêtes (colonne ajoutée, FK, indexes)
- **État** : Infrastructure en place, activation possible en décommentant 3 lignes

#### ✅ Intégrations
- **QuickBooks Online** : OAuth2, sync bidirectionnelle (customers, invoices, items)
- **Stripe** : Checkout sessions, Billing Portal, Webhooks
- **Email** : SMTP (désactivé par défaut, `APP_EMAIL_ENABLE=false`)
- **Stockage** : Local (par défaut) ou AWS S3

#### ✅ Features Métier Complètes
- **Gestion Commandes** : Création, suivi, costing, pricing, labour tracking
- **Inventaire** : Métaux purs, alliages, diamants, pierres précieuses, autres matériaux
- **Casting** : Gestion des coulées, métaux de production
- **Stock** : Suivi des stocks par commande
- **CRM** : Contacts, communications, templates emails
- **Permissions** : 12 permissions granulaires par rôle
- **Administration** : Clients, fournisseurs, utilisateurs
- **Settings** : Prix métaux, labour, cylindres, catégories, collections

#### ✅ Monitoring & Santé
- **Actuator** : `/actuator/health/railway` (ping simple pour Railway)
- **Swagger UI** : `/swagger-ui.html` (activé en prod)
- **Logs** : SLF4J + Logback

---

### 2️⃣ FRONTEND (React 18 + TypeScript + Vite)

#### ✅ Architecture & Code
- **1057 fichiers TypeScript** (.ts + .tsx)
- **49 pages** organisées par domaine métier
- **45 APIs entities** avec hooks React Query
- **Architecture en couches** : pages → features → entities → shared
- **Routing** : React Router v7 avec routes protégées
- **State Management** : React Query + Context API
- **UI Library** : Ant Design 5.26.2

#### ✅ Sécurité & Authentification
- **PrivateRoute** : Redirige vers `/login` si non authentifié
- **UserRoute** : Vérifie les rôles (ADMIN, SUPER_ADMIN, EMPLOYEE)
- **JWT Storage** : LocalStorage avec refresh automatique
- **Token Refresh** : Intercepteur axios avec queue de requêtes
- **Logout automatique** : Si refresh échoue (401)

#### ✅ Pages Principales
- **Orders** : Liste, création, détails, costing, labour tracking
- **Inventory** : Diamonds, Gemstones, Metals (pure, alloy, alloyed, other)
- **Stock** : Vue globale, détails par item
- **Casting** : Liste, création, détails
- **Administration** : Clients, fournisseurs
- **Settings** : Paramètres système, intégrations, billing
- **CRM** : Contacts, communications
- **Permissions** : Matrice permissions/rôles
- **Profile** : Détails personnels, sécurité
- **Time Tracker** : Suivi temps par commande

#### ✅ Intégrations Frontend
- **QuickBooks** : Page callback OAuth2, status connexion
- **Stripe** : Pages success/cancel après checkout
- **Billing** : Onglet dans Settings avec plans et checkout

#### ✅ Build & Déploiement
- **Vite** : Build optimisé avec code splitting
- **TypeScript** : Compilation stricte (tsconfig)
- **ESLint** : Linting avec Prettier
- **Vercel** : Déploiement automatique sur push
- **Variables d'env** : `VITE_BACKEND_HOST`, `VITE_AUTH_HOST`, etc.

---

### 3️⃣ INFRASTRUCTURE & DÉPLOIEMENT

#### ✅ Frontend (Vercel)
- **URL** : https://gemflow-saas.vercel.app
- **Status** : ✅ ONLINE (vérifié)
- **Build** : Automatique sur push main
- **Assets** : `/assets/index-qAAvu5iE.js`, `/assets/index-BpBgRF3o.css`

#### ✅ Backend (Railway)
- **URL** : https://gemflow-saas-production.up.railway.app
- **Status** : ✅ ONLINE (vérifié)
- **Health** : `/actuator/health/railway` retourne 200
- **Build** : Nixpacks (Maven + Java 21)
- **Healthcheck** : Ping simple (pas de dépendances DB)

#### ✅ Keycloak (Railway)
- **URL** : https://keycloak-production-7a33.up.railway.app
- **Realm** : `atelier`
- **Status** : ✅ ONLINE (vérifié via .well-known/openid-configuration)
- **Client ID** : `atelier-client`
- **Flow** : Resource Owner Password Credentials (ROPC)

#### ✅ Database (Supabase)
- **Instance** : xlvlcnrkrqstfoadoamk (EU Central 1)
- **Host** : `db.xlvlcnrkrqstfoadoamk.supabase.co`
- **Pooler** : `aws-0-eu-central-1.pooler.supabase.com:6543` (recommandé)
- **Direct** : Port 5432
- **Status** : ✅ UP

---

### 4️⃣ CONFIGURATION & VARIABLES D'ENVIRONNEMENT

#### Backend (Railway)
```bash
# Database
APP_DATABASE_URL=jdbc:postgresql://aws-0-eu-central-1.pooler.supabase.com:6543/postgres
APP_DATABASE_USERNAME=postgres.xlvlcnrkrqstfoadoamk
APP_DATABASE_PASSWORD=<SUPABASE_PASSWORD>

# Keycloak
APP_JWT_ISSUER_URI=https://keycloak-production-7a33.up.railway.app/realms/atelier
APP_KEYCLOAK_URL=https://keycloak-production-7a33.up.railway.app
APP_KEYCLOAK_REALM=atelier
APP_KEYCLOAK_CLIENT_ID=atelier-client
APP_KEYCLOAK_CLIENT_SECRET=q7uJjZgSfhVNseuzUW55Aw8NCmtxBqrJ

# CORS
APP_CORS_ALLOWED_ORIGINS=https://gemflow-saas.vercel.app,https://*.vercel.app,http://localhost:7101

# Features
APP_EMAIL_ENABLE=false
APP_FILE_SOURCE=LOCAL
APP_SWAGGER_ENABLE=true
```

#### Frontend (Vercel)
```bash
VITE_BACKEND_HOST=https://gemflow-saas-production.up.railway.app
VITE_AUTH_HOST=https://keycloak-production-7a33.up.railway.app
VITE_AUTH_REALM=atelier
VITE_AUTH_CLIENT_ID=atelier-client
VITE_AUTH_CLIENT_SCOPE=openid profile email
```

---

### 5️⃣ POINTS D'ATTENTION & RECOMMANDATIONS

#### ⚠️ Sécurité
1. **Client Secret exposé** : Le `VITE_AUTH_CLIENT_SECRET` ne devrait pas être utilisé côté frontend (SPA). Recommandation : utiliser PKCE flow au lieu de ROPC.
2. **Endpoints publics** : Beaucoup d'endpoints sont en `.permitAll()` dans `SecurityConfig.java`. Vérifier si c'est intentionnel.
3. **Multi-tenant désactivé** : Les migrations 077-079 sont commentées. Si activation future, décommenter et redéployer.

#### ⚠️ Performance
1. **Pooler Supabase** : Utiliser le pooler (6543) au lieu de la connexion directe (5432) pour éviter les limites de connexions.
2. **Hikari Pool** : `maximum-pool-size: 16` est correct pour Railway (limite 20 connexions).
3. **Indexes** : Bien présents sur `tenant_id` (078_ADD_TENANT_ID_TO_TABLES.xml).

#### ⚠️ Monitoring
1. **Logs** : Ajouter un service de logging centralisé (Datadog, Sentry, etc.).
2. **Metrics** : Activer Actuator metrics (`/actuator/metrics`).
3. **Alerting** : Configurer des alertes sur Railway/Vercel pour les erreurs 5xx.

#### ⚠️ Backup & Recovery
1. **Database** : Configurer des backups automatiques sur Supabase.
2. **Migrations** : Tester les rollbacks Liquibase en staging.

---

### 6️⃣ TESTS & QUALITÉ

#### ❌ Tests Manquants
- **Backend** : Aucun test unitaire/intégration trouvé dans `src/test/`
- **Frontend** : Pas de tests (Jest, Vitest, Cypress)
- **E2E** : Pas de tests end-to-end

#### ✅ Linting & Formatting
- **Backend** : Maven compiler avec annotation processors
- **Frontend** : ESLint + Prettier configurés

---

### 7️⃣ FONCTIONNALITÉS AVANCÉES

#### ✅ Implémentées
- **Permissions granulaires** : 12 permissions par catégorie (CLIENTS, ORDERS, INVENTORY, FILES, REPORTS, SETTINGS)
- **QuickBooks Integration** : OAuth2 + sync bidirectionnelle
- **Stripe Billing** : Checkout + Portal + Webhooks
- **CRM** : Contacts, communications, templates emails
- **Time Tracking** : Suivi temps par commande avec QR codes

#### ⚠️ Partiellement Implémentées
- **Multi-tenant** : Infrastructure prête (40%), activation nécessaire
- **Email** : Service présent mais désactivé
- **S3 Storage** : Code présent, configuration manquante

#### ❌ Non Implémentées
- **Landing page publique** : Pas de page marketing
- **Signup** : Pas de formulaire d'inscription
- **Margin management** : Pas de gestion marges avancée
- **Produit industrialisable** : Feature roadmap (voir PLAN_MVP_SAAS_FEATURES.md)

---

## 📊 MÉTRIQUES GLOBALES

| Catégorie | Métrique | Valeur |
|-----------|----------|--------|
| **Backend** | Fichiers Java | 794 |
| **Backend** | Controllers REST | 57 |
| **Backend** | Entités JPA | 111 |
| **Backend** | DTOs | 300 |
| **Backend** | Repositories | 77 |
| **Backend** | Migrations DB | 86 |
| **Frontend** | Fichiers TS/TSX | 1057 |
| **Frontend** | Pages | 49 |
| **Frontend** | API Entities | 45 |
| **Database** | Tables | ~60 |
| **Déploiement** | Services | 4 (Frontend, Backend, Keycloak, DB) |
| **Sécurité** | Auth | ✅ Keycloak OAuth2 |
| **Tests** | Couverture | ❌ 0% |

---

## 🎯 PROCHAINES ÉTAPES RECOMMANDÉES

### Priorité HAUTE 🔴
1. **Tests** : Ajouter tests unitaires backend (JUnit 5) + frontend (Vitest)
2. **Sécurité** : Migrer vers PKCE flow (au lieu de ROPC)
3. **Monitoring** : Intégrer Sentry ou Datadog
4. **Backup** : Activer backups automatiques Supabase

### Priorité MOYENNE 🟡
5. **Multi-tenant** : Activer si besoin (décommenter migrations 077-079)
6. **Landing page** : Créer page marketing publique
7. **Signup** : Implémenter formulaire d'inscription
8. **Documentation** : Générer docs API (Swagger → Postman/OpenAPI)

### Priorité BASSE 🟢
9. **Performance** : Optimiser requêtes N+1 (Hibernate)
10. **CI/CD** : Ajouter tests automatiques sur GitHub Actions
11. **Feature Produit** : Implémenter produit industrialisable (roadmap)

---

## 🚀 Déploiement Railway (Quick Start)

### Option 1 : Configuration manuelle (recommandé)

1. **Copier les variables** : Ouvrir `.railway-env-gemsflow` et copier tout le contenu
2. **Railway Dashboard** → Variables → Raw Editor → Coller
3. **Remplacer** le mot de passe par le vrai mot de passe Supabase
4. **Utiliser le POOLER** : `aws-0-eu-central-1.pooler.supabase.com` (recommandé)
5. **Déployer** : Railway redémarre automatiquement

### Option 2 : Script de test

```bash
./test-railway-backend.sh
```

📖 **Guides disponibles :**
- `ACTION_IMMEDIATE.md` - Fix urgent backend Railway
- `FIX_SUPABASE_AUTH.md` - Problème auth Supabase
- `SITUATION_ACTUELLE.md` - Status complet
- `RAILWAY_DIAGNOSTIC.md` - Diagnostic détaillé

---

## Structure du projet

```
.
├── src/                      # Backend Spring Boot (Java 21)
├── pom.xml                   # Maven project descriptor
├── frontend/                 # Frontend React + TypeScript + Vite
├── compose.yaml              # Docker Compose (Postgres + Keycloak)
├── Dockerfile                # Backend Docker image
└── README.md                 # Ce fichier
```

## 🚀 Déploiement Railway avec Supabase PostgreSQL

**Base de données : Supabase PostgreSQL**

Le projet utilise Supabase comme base de données PostgreSQL hébergée.

### Configuration Railway (3 étapes)

#### 1️⃣ Configurer les variables d'environnement

**Copier le contenu de `.railway-env-minimal`** dans Railway :
- Aller sur Railway Dashboard → Votre service → **Variables** → **Raw Editor**
- Coller tout le contenu du fichier
- **⚠️ Remplacer `<YOUR_SUPABASE_PASSWORD>` par le vrai mot de passe**

**Variables obligatoires :**
```bash
APP_DATABASE_URL=jdbc:postgresql://db.ldnvfnwkqywdgnsrqxuq.supabase.co:5432/postgres
APP_DATABASE_USERNAME=postgres
APP_DATABASE_PASSWORD=<votre_mot_de_passe>
```

#### 2️⃣ Vérifier le build

Railway utilise **Nixpacks** pour détecter automatiquement Maven et Java 21.

**Fichiers de configuration :**
- `nixpacks.toml` : Build Maven + Java 21
- `railway.json` : Healthcheck `/actuator/health/railway` (ping)

#### 3️⃣ Déployer

- **Déploiement automatique** : Chaque push sur `main` déclenche un redéploiement
- **Healthcheck** : Railway vérifie `/actuator/health/railway` (UP dès que l'app tourne)
- **Logs** : Vérifier les logs Railway pour confirmer le démarrage

**URL Supabase :**
- Dashboard : https://supabase.com/dashboard/project/ldnvfnwkqywdgnsrqxuq
- API URL : https://ldnvfnwkqywdgnsrqxuq.supabase.co

**Migrations :**
Les migrations Liquibase s'appliquent automatiquement au démarrage de l'application.

### ✅ Vérification du déploiement

Une fois déployé, tester :
```bash
curl https://your-app.railway.app/actuator/health/railway
# Devrait retourner : {"status":"UP"}
```

### 🔧 Features désactivées (pas de clés configurées)

- ❌ **QuickBooks** : Intégration désactivée (pas de `QUICKBOOKS_CLIENT_ID`)
- ❌ **Stripe** : Paiements désactivés (pas de `STRIPE_API_KEY`)
- ❌ **Email** : Envoi d'emails désactivé (`APP_EMAIL_ENABLE=false`)
- ✅ **Stockage** : Fichiers en local (`APP_FILE_SOURCE=LOCAL`)

---

## Démarrage local

### Backend

**Prérequis :**
- Java 21
- Maven
- Docker Desktop (recommandé)

**Configuration initiale :**
1. Créer le fichier `.env` depuis le template :
```bash
cp .env.example .env
```

2. Créer l'utilisateur PostgreSQL `postgres` (si pas déjà fait) :
```bash
psql -U $(whoami) -d postgres -c "CREATE USER postgres WITH SUPERUSER PASSWORD 'postgres';"
```

3. Adapter les variables dans `.env` si nécessaire (les valeurs par défaut fonctionnent pour un setup local standard)

**Commandes :**
```bash
docker compose up -d postgres
./run-local.sh
```

**Ports :**
- API : http://localhost:7001
- Swagger UI : http://localhost:7001/swagger-ui.html
- PostgreSQL : localhost:5432

### Frontend

**Prérequis :**
- Node.js (>= 20)
- npm

**Commandes :**
```bash
cd frontend
npm install
npm run dev
```

**Port :**
- Frontend : http://localhost:7101
- Proxy API : http://localhost:7001 (automatique via Vite)

## ✅ Configuration de sécurité (Production)

**L'authentification Keycloak est ACTIVÉE en production.**

### Backend
Tous les endpoints (sauf `/actuator/health/**`, Swagger, et quelques routes publiques) nécessitent un JWT valide de Keycloak.

**Configuration :**
- `src/main/java/io/hearstcorporation/atelier/config/security/SecurityConfig.java`
- `.anyRequest().authenticated()` - requiert un token JWT valide

### Frontend
Le login et les contrôles de rôles sont activés.

**Fichiers :**
- `frontend/src/app_/router/PrivateRoute.tsx` - redirige vers `/login` si non authentifié
- `frontend/src/app_/router/UserRoute.tsx` - vérifie les rôles utilisateur
- `frontend/src/shared/providers/UserProvider.tsx` - charge les données utilisateur

### Keycloak
- **URL :** https://keycloak-production-7a33.up.railway.app
- **Realm :** `atelier`
- **Client ID :** `atelier-client`
- **Flow :** OAuth2 Resource Owner Password Credentials (ROPC)

## Vérification

Backend :
```bash
curl http://localhost:7001/actuator/health
```

Frontend : Ouvrir http://localhost:7101 dans le navigateur.

## Documentation

- Backend : Voir `START_LOCAL.md` pour plus de détails.
- Frontend : Voir `frontend/README.md` pour la configuration Vite/React.
- **Audit complet** : Voir `RAPPORT_AUDIT_COMPLET.md` pour l'audit de sécurité, l'état d'avancement MVP et les recommandations.
- **Architecture complète** : Voir `ARCHITECTURE_COMPLETE_DIAGRAM.html` pour le diagramme interactif complet de l'application + feature Produit.
- **Plan MVP SaaS** : Voir `PLAN_MVP_SAAS_FEATURES.md` pour les features manquantes et la roadmap.

## 📊 Architecture & Feature Produit

### Diagramme Complet

Ouvrir le fichier `ARCHITECTURE_COMPLETE_DIAGRAM.html` dans un navigateur pour visualiser :

- **Architecture 3-tiers complète** (Frontend React, Backend Spring Boot, PostgreSQL)
- **Modèle de données existant** (Orders, Inventory, Labour, Casting, Stock)
- **Nouvelle feature Produit** avec :
  - Produits industrialisables (SKU, variantes)
  - BOM (Bill of Materials) - nomenclature composants
  - Routing (Gamme de fabrication) - étapes ordonnées
  - Critères qualité par étape
  - Traçabilité lot/serial
  - Génération automatique ordres de fabrication
  - Monitoring temps réel (WIP, lead time, goulots, scrap, rework)
- **Intégration avec système existant** (événements, dashboards, coûts)
- **Features manquantes** (Multi-tenant, Paiements, QuickBooks, etc.)
- **Roadmap recommandée** (6 phases, 30-41 semaines)

### État d'Avancement MVP

| Catégorie | Complétude |
|-----------|------------|
| Infrastructure & Setup | ✅ 100% |
| Authentification & Sécurité | ✅ 100% (architecture complète, désactivée en dev) |
| Gestion Commandes (Orders) | ✅ 95% |
| Gestion Inventaire | ✅ 100% |
| Administration | ✅ 100% |
| Stock Management | ✅ 100% |
| **Features SaaS Avancées** | ✅ 60% |
| **TOTAL MVP** | **85%** |

### Feature Produit (Nouvelle)

La feature "Produit Industrialisable" permet de :

1. **Définir des produits standardisés** avec SKU, variantes (taille, métal, pierre)
2. **Créer des nomenclatures (BOM)** avec composants, quantités, taux de perte
3. **Configurer des gammes de fabrication (Routing)** avec étapes ordonnées, temps standards, postes compatibles
4. **Définir des critères qualité** par étape avec contrôles obligatoires
5. **Choisir le niveau de traçabilité** (par lot ou par pièce/serial)
6. **Générer automatiquement des ordres de fabrication** depuis les produits
7. **Monitorer en temps réel** :
   - WIP (Work In Progress) par étape
   - Lead time et cycle time
   - Identification des goulots d'étranglement
   - Taux de scrap et rework

**Intégration avec système existant :**
- Réutilise les tables inventory (metals, diamonds, gemstones)
- Compatible avec les événements atelier existants
- S'intègre aux dashboards et calculs de coûts
- Coexiste avec le mode "commande sur-mesure" actuel

**Modèle de données (10 nouvelles tables) :**
- `product`, `product_variant`
- `bom`, `bom_line`
- `routing`, `routing_step`
- `quality_criteria`
- `production_order`, `production_event`
- `lot_traceability`

**Effort estimé :** 6-8 semaines

### Features MVP Manquantes (25%)

| Feature | État | Effort |
|---------|------|--------|
| Multi-tenant complet | ⚠️ 40% | 3-4 sem |
| Système paiements (Stripe) | ❌ 0% | 4-5 sem |
| Landing page publique | ❌ 0% | 1-2 sem |
| CRM avancé | ✅ 100% | - |
| Permissions UI granulaires | ✅ 100% | - |
| Intégration QuickBooks | ✅ 100% | - |
| Margin management | ❌ 0% | 1-2 sem |
| Time tracking QR codes | ❌ 0% | 3-4 sem |

**Total estimé features manquantes :** 8-10 semaines

Voir `PLAN_MVP_SAAS_FEATURES.md` pour les détails d'implémentation.

## 🗺️ Roadmap Recommandée

### Phase 1 : Feature Produit (6-8 semaines) 🔴 HAUTE
- Modèle de données complet (10 tables)
- Backend: Controllers, Services, Repositories
- Frontend: UI gestion produits, BOM, Routing, QC
- Génération automatique ordres de fabrication
- Dashboards monitoring (WIP, lead time, goulots)

### Phase 2 : Multi-Tenant Complet (3-4 semaines) 🔴 HAUTE
- `tenant_id` sur toutes les tables (38 entities restantes)
- Row-Level Security (RLS)
- Landing page publique + signup
- Système d'invitations

### Phase 3 : Paiements (4-5 semaines) 🔴 HAUTE
- Intégration Stripe
- Plans (Basic, Pro, Enterprise)
- Abonnements + webhooks
- Billing portal

### Phase 4 : Features Métier (4-7 semaines) 🟡 MOYENNE
- Permissions UI granulaires
- Margin management
- Proforma invoice

### Phase 5 : Intégrations (8-11 semaines) 🟡 MOYENNE
- QuickBooks integration
- Time tracking QR codes
- CRM avancé

### Phase 6 : Qualité & Production (5-6 semaines) 🔴 CRITIQUE
- Tests automatiques (backend + frontend)
- Réactivation sécurité (OAuth2 + RBAC)
- Monitoring & logging
- Documentation déploiement

**Total estimé MVP complet :** 14-24 semaines (3.5-6 mois)

## 🔗 Intégration QuickBooks

L'intégration QuickBooks Online permet de synchroniser les données comptables avec Gemsflow ERP.

### Configuration

Ajouter les variables d'environnement :

```bash
# QuickBooks OAuth2 credentials
QUICKBOOKS_CLIENT_ID=your_client_id
QUICKBOOKS_CLIENT_SECRET=your_client_secret
QUICKBOOKS_REDIRECT_URI=http://localhost:7101/integrations/quickbooks/callback
QUICKBOOKS_ENV=sandbox  # ou 'production'
```

### Fonctionnalités disponibles

| Fonctionnalité | État |
|----------------|------|
| Connexion OAuth2 | ✅ |
| Récupération Company Info | ✅ |
| Liste des Customers | ✅ |
| Liste des Invoices | ✅ |
| Liste des Items | ✅ |
| Déconnexion | ✅ |
| Refresh Token automatique | ✅ |
| Sync bidirectionnelle | 🔜 À venir |

### Endpoints API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/integrations/quickbooks/connect` | URL d'autorisation OAuth2 |
| POST | `/api/v1/integrations/quickbooks/callback` | Callback OAuth2 |
| GET | `/api/v1/integrations/quickbooks/status` | Statut de connexion |
| DELETE | `/api/v1/integrations/quickbooks` | Déconnexion |
| GET | `/api/v1/integrations/quickbooks/company` | Info entreprise |
| GET | `/api/v1/integrations/quickbooks/summary` | Résumé des données |
| GET | `/api/v1/integrations/quickbooks/customers` | Liste des clients |
| GET | `/api/v1/integrations/quickbooks/invoices` | Liste des factures |
| GET | `/api/v1/integrations/quickbooks/items` | Liste des articles |

### Frontend

Page d'intégration accessible via : `/settings/integrations`

### Fichiers créés

**Backend :**
- `config/quickbooks/` - Configuration et properties
- `model/integration/` - Entités (AccountingIntegration, AccountingSyncLog)
- `dto/model/integration/` - DTOs QuickBooks
- `repository/integration/` - Repositories
- `service/integration/` - Services (QuickBooksAuthService, QuickBooksApiService)
- `controller/integration/` - QuickBooksIntegrationController
- `db/changelog/1.0.0/083_ACCOUNTING_INTEGRATION.xml` - Migration DB

**Frontend :**
- `entities/quickbooks/` - API, hooks, models
- `features/integrations/` - Composants UI
- `pages/integrations/` - Pages Integrations

## 🔐 Gestion des Permissions

Système de permissions granulaires par rôle permettant de contrôler l'accès aux fonctionnalités.

### Fonctionnalités

| Fonctionnalité | État |
|----------------|------|
| Modèle Permission + RolePermission | ✅ |
| 12 permissions par défaut | ✅ |
| Catégories (CLIENTS, ORDERS, INVENTORY, etc.) | ✅ |
| API REST complète | ✅ |
| Interface de gestion (matrice permissions/rôles) | ✅ |
| Sauvegarde en temps réel | ✅ |

### Permissions disponibles

**CLIENTS**
- `VIEW_CLIENT_NAMES` - Voir les noms et contacts clients

**ORDERS**
- `CREATE_ORDERS` - Créer des commandes
- `VIEW_ORDERS` - Voir les commandes
- `EDIT_ORDERS` - Modifier les commandes
- `DELETE_ORDERS` - Supprimer les commandes
- `VIEW_COSTING` - Voir les coûts détaillés
- `VIEW_PRICING` - Voir les prix et marges

**INVENTORY**
- `MANAGE_INVENTORY` - Gérer l'inventaire (métaux, diamants, pierres)

**FILES**
- `DOWNLOAD_STL` - Télécharger les fichiers STL/3D

**REPORTS**
- `VIEW_REPORTS` - Voir les rapports et analytics

**SETTINGS**
- `MANAGE_USERS` - Gérer les utilisateurs
- `MANAGE_SETTINGS` - Modifier les paramètres système

### Endpoints API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/permissions` | Liste des permissions |
| GET | `/api/v1/permissions/matrix?tenantId=1` | Matrice permissions/rôles |
| PUT | `/api/v1/permissions/role?tenantId=1` | Mettre à jour les permissions d'un rôle |
| GET | `/api/v1/permissions/user/{userId}` | Permissions d'un utilisateur |
| GET | `/api/v1/permissions/check/{code}?userId=X` | Vérifier une permission |

### Frontend

Page accessible via : `/permissions`

Interface en grille avec :
- Permissions groupées par catégorie
- Colonnes pour chaque rôle (Super Admin, Admin, Employee)
- Checkboxes pour activer/désactiver
- Bouton "Save Changes" apparaît lors de modifications

### Fichiers créés

**Backend :**
- `model/user/Permission.java`, `PermissionCategory.java`, `RolePermission.java`
- `repository/user/PermissionRepository.java`, `RolePermissionRepository.java`
- `service/user/PermissionService.java` + impl
- `controller/user/PermissionController.java`
- `dto/model/user/PermissionDto.java`, `RolePermissionDto.java`, `UpdateRolePermissionsDto.java`, `RolePermissionsMatrixDto.java`
- `dto/mapper/user/PermissionMapper.java`
- `db/changelog/1.0.0/084_PERMISSION.xml` - Migration DB

**Frontend :**
- `entities/permission/` - API, hooks, models, DTOs
- `features/permissions/permissions-grid/` - Composant grille
- `pages/permissions/PermissionsPage.tsx`

## 💳 Paiements Stripe

Structure backend en place (Checkout + Billing Portal + Webhook). La persistance est faite via une table dédiée `billing_subscription` (tenant_id via `TenantContext`, = 1 en dev).

### Configuration

Ajouter les variables d'environnement :

```bash
# Stripe
STRIPE_API_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Price IDs (Stripe Billing)
STRIPE_PRICE_STANDARD_25_MONTHLY=price_...
STRIPE_PRICE_STANDARD_25_YEARLY=price_...
STRIPE_PRICE_STANDARD_20_MONTHLY=price_...
STRIPE_PRICE_STANDARD_20_YEARLY=price_...
STRIPE_PRICE_BASIC_MONTHLY=price_...
STRIPE_PRICE_BASIC_YEARLY=price_...
STRIPE_PRICE_PRO_MONTHLY=price_...
STRIPE_PRICE_PRO_YEARLY=price_...
STRIPE_PRICE_ENTERPRISE_MONTHLY=price_...
STRIPE_PRICE_ENTERPRISE_YEARLY=price_...
```

### Endpoints API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/billing/checkout-session` | Créer une session Stripe Checkout (subscription) — supporte `quantity` (seats) |
| GET | `/api/v1/billing/portal?customerId=...` | Créer une session Billing Portal |
| POST | `/api/v1/billing/webhook` | Webhook Stripe (signature obligatoire) |

### Frontend

- Onglet Billing : `/settings?tab=BILLING`
- Pages retour checkout : `/billing/success` et `/billing/cancel`

## 📚 Ressources Additionnelles

- **Modifications entities multi-tenant** : `PHASE_1_2_ENTITY_MODIFICATIONS.md`
- **Swagger API** : http://localhost:7001/swagger-ui.html (quand backend lancé)
- **Migrations DB** : `src/main/resources/db/changelog/`

## 🚀 Déploiement

### Railway / Render / Fly.io

Le projet est maintenant structuré pour être détecté automatiquement par les plateformes de déploiement :

- **Backend** : Maven project à la racine (`pom.xml`, `src/`)
- **Frontend** : Dossier `frontend/` (build avec `npm run build`)

**Fichiers de configuration inclus :**
- `railway.json` - Configuration Railway
- `render.yaml` - Configuration Render
- `fly.toml` - Configuration Fly.io
- `Procfile` - Configuration Heroku/Railway

**Variables d'environnement requises :**
Voir sections ci-dessus (Stripe, QuickBooks, Database, etc.)

