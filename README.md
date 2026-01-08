# Atelier - Projet SaaS (Gemsflow ERP)

**Repository GitHub :** https://github.com/adrien-debug/Gemflow-SaaS.git

---

## 🚀 Déploiement Railway (Quick Start)

### Option 1 : Configuration manuelle (recommandé)

1. **Copier les variables** : Ouvrir `.railway-env-minimal` et copier tout le contenu
2. **Railway Dashboard** → Variables → Raw Editor → Coller
3. **Remplacer** `<YOUR_SUPABASE_PASSWORD>` par le vrai mot de passe
4. **Déployer** : Railway redémarre automatiquement

### Option 2 : Script automatique

```bash
./setup-railway.sh
```

📖 **Guide complet** : Voir `RAILWAY_DEPLOY_GUIDE.md`

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
- `railway.json` : Healthcheck `/actuator/health`

#### 3️⃣ Déployer

- **Déploiement automatique** : Chaque push sur `main` déclenche un redéploiement
- **Healthcheck** : Railway vérifie `/actuator/health` toutes les 5 minutes
- **Logs** : Vérifier les logs Railway pour confirmer le démarrage

**URL Supabase :**
- Dashboard : https://supabase.com/dashboard/project/ldnvfnwkqywdgnsrqxuq
- API URL : https://ldnvfnwkqywdgnsrqxuq.supabase.co

**Migrations :**
Les migrations Liquibase s'appliquent automatiquement au démarrage de l'application.

### ✅ Vérification du déploiement

Une fois déployé, tester :
```bash
curl https://your-app.railway.app/actuator/health
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
- Node.js (version récente)
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

## ⚠️ Configuration de sécurité (développement)

**L'authentification est actuellement désactivée (backend + frontend) pour faciliter le développement local.**

### Backend
Tous les endpoints sont accessibles sans JWT/token.

**Fichier modifié :**
- `src/main/java/io/hearstcorporation/atelier/config/security/SecurityConfig.java`

### Frontend
Le login et les contrôles de rôles sont désactivés.

**Fichiers modifiés :**
- `frontend/src/app_/router/PrivateRoute.tsx` (bypass login check)
- `frontend/src/app_/router/UserRoute.tsx` (bypass role check)
- `frontend/src/shared/providers/UserProvider.tsx` (allow null user)

**⚠️ NE JAMAIS déployer en production avec cette configuration !**

Pour réactiver la sécurité :
- Backend : remplacer tous les `.permitAll()` par les rôles appropriés (`.hasAnyRole(...)` ou `.authenticated()`)
- Frontend : décommenter les vérifications dans les fichiers ci-dessus

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

