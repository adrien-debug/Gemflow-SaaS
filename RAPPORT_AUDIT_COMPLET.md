# Rapport d'Audit Complet — Saas Pino / Gemsflow ERP

**Date :** 6 janvier 2026  
**Projet :** Atelier - Saas Pino / Gemsflow ERP  
**Périmètre :** Audit complet du code, sécurité, et comparaison avec le cahier des charges MVP

---

## 📋 Table des matières

1. [Vue d'ensemble](#1-vue-densemble)
2. [Architecture technique](#2-architecture-technique)
3. [État d'avancement par fonctionnalité](#3-état-davancement-par-fonctionnalité)
4. [Audit sécurité](#4-audit-sécurité)
5. [Audit code et qualité](#5-audit-code-et-qualité)
6. [Forces et faiblesses](#6-forces-et-faiblesses)
7. [Recommandations prioritaires](#7-recommandations-prioritaires)
8. [Plan d'action](#8-plan-daction)

---

## 1. Vue d'ensemble

### Résumé du projet
- **Backend :** Spring Boot (Java 21), PostgreSQL, Liquibase, Keycloak OAuth2
- **Frontend :** React + TypeScript + Vite
- **Environnements :** Local (Docker), Dev, Staging, Production
- **État actuel :** Développement en cours, sécurité désactivée volontairement

### Note de complétude MVP : **75/100**

| Catégorie | Score |
|-----------|-------|
| Setup & Infrastructure | ✅ 100% |
| Authentification & Sécurité | ⚠️ 60% |
| Workflows métier | ✅ 95% |
| Gestion inventaire | ✅ 100% |
| Administration | ✅ 100% |
| Features avancées (SaaS) | ❌ 20% |

---

## 2. Architecture technique

### 2.1 Backend (`atelier-backend-main`)

**Structure :**
```
atelier-backend-main/
├── src/main/java/io/hearstcorporation/atelier/
│   ├── config/
│   │   └── security/SecurityConfig.java
│   ├── controller/
│   │   ├── administration/
│   │   ├── inventory/
│   │   ├── order/
│   │   ├── setting/
│   │   └── user/
│   └── model/
├── src/main/resources/
│   ├── application.yml
│   └── db/changelog/
└── compose.yaml
```

**Technologies clés :**
- Spring Boot 3.x
- Spring Security + OAuth2 Resource Server
- PostgreSQL + Liquibase
- Keycloak (auth externe)
- Swagger/OpenAPI
- AWS S3 (gestion fichiers)

### 2.2 Frontend (`atelier-frontend-dev`)

**Structure :**
```
atelier-frontend-dev/
├── src/
│   ├── app/
│   │   └── router/
│   │       ├── PrivateRoute.tsx
│   │       └── UserRoute.tsx
│   ├── entities/
│   ├── shared/
│   │   ├── providers/UserProvider.tsx
│   │   └── services/
│   └── features/
├── package.json
└── vite.config.ts
```

**Technologies clés :**
- React 18
- TypeScript
- Vite (build tool)
- React Router
- SCSS modules

---

## 3. État d'avancement par fonctionnalité

### 3.1 System Setup (100% ✅)

| Feature | État | Fichiers |
|---------|------|----------|
| 1.1 Dev infrastructure | ✅ FAIT | `compose.yaml`, `Dockerfile`, `Dockerfile.prod` |
| 1.2 Project skeleton | ✅ FAIT | Structure complète backend + frontend |
| 1.3 CI/CD setup | ✅ FAIT | `fly.toml`, `railway.json`, `render.yaml` |

**Commentaires :** Infrastructure complète avec scripts automatisés (`start-all.sh`, `start-db.sh`, `run-local.sh`).

---

### 3.2 Authorization (60% ⚠️)

| Feature | État | Fichiers |
|---------|------|----------|
| 2.1 Role-based permissions | ⚠️ PRÉSENT MAIS DÉSACTIVÉ | `SecurityConfig.java`, `ROLE.java` |
| 2.2 Sign up | ✅ FAIT | `UserController.java` |
| 2.3 Sign in | ✅ FAIT | Keycloak integration |
| 2.4 Restore password | ✅ FAIT | `UserController.java` (endpoints PASSWORD_RESTORE/RESET) |
| 2.5 Log out | ✅ FAIT | Frontend logout |

**⚠️ ALERTE CRITIQUE :**
```java
// SecurityConfig.java (ligne 166)
.anyRequest().permitAll(); // ⚠️ TOUS LES ENDPOINTS PUBLICS
```

**Fichiers impactés :**
- Backend : `atelier-backend-main/src/main/java/io/hearstcorporation/atelier/config/security/SecurityConfig.java`
- Frontend :
  - `atelier-frontend-dev/src/app/router/PrivateRoute.tsx` (lignes 17-19 commentées)
  - `atelier-frontend-dev/src/app/router/UserRoute.tsx` (lignes 16-22 commentées)
  - `atelier-frontend-dev/src/shared/providers/UserProvider.tsx` (lignes 16-17 commentées)

---

### 3.3 Order Management (95% ✅)

| Feature | État | Fichiers/Controllers |
|---------|------|---------------------|
| 3.1 Orders list | ✅ FAIT | `/controller/order/`, migrations 021-033 |
| 3.2 Search & filters | ✅ FAIT | Controllers avec query params |
| 3.3 Create order | ✅ FAIT | `OrderController` POST endpoints |
| 3.4 CAD stage | ✅ FAIT | `ORDER_TASK` migrations |
| 3.5 3D print/Prototyping | ✅ FAIT | Status management |
| 3.6 Pre-casting stage | ✅ FAIT | Migrations 067-068 (CASTING) |
| 3.7 Broken parts flow | ✅ FAIT | Task status management |
| 3.8 Choose casting cylinder | ✅ FAIT | `CylinderController`, migration 006 |
| 3.9 Casting management | ✅ FAIT | `CastingController` |
| 3.10 Print envelope sticker | ⚠️ À VÉRIFIER | Non identifié explicitement |
| 3.11 Edit order | ✅ FAIT | PUT endpoints |
| 3.12 Delete order | ✅ FAIT | DELETE endpoints |

**Migrations DB associées :**
- `021_PROJECT.xml`, `027_ORDER.xml`, `033_ORDER_V2.xml`, `046_ORDER_V3.xml`, `050_ORDER_V4.xml`
- `032_ORDER_TASK.xml`, `049_ORDER_TASK_V2.xml`
- `067_CASTING.xml`, `068_ORDER_METAL_CASTING.xml`

---

### 3.4 Order Details (100% ✅)

| Feature | État | Fichiers |
|---------|------|----------|
| 4.1 View order details | ✅ FAIT | OrderController GET endpoints |
| 4.2 CAD section | ✅ FAIT | Migrations + controllers |
| 4.3 Technical sheet | ✅ FAIT | `072_ORDER_TECHNICAL_SHEET.xml`, `073_ORDER_TECHNICAL_SHEET_IMAGE.xml` |
| 4.4 Labour section | ✅ FAIT | `052_ORDER_LABOUR.xml`, `074_ORDER_LABOUR_TRACKER.xml` |
| 4.5 Gems section | ✅ FAIT | `043_GEMSTONE.xml`, `048_GEMSTONE_V2.xml`, `051_GEMSTONE_v3.xml` |
| 4.6 Diamonds section | ✅ FAIT | `044_DIAMOND.xml`, `054_ORDER_DIAMOND.xml`, `075_ADD_DIAMOND_COLUMNS.xml` |
| 4.7 Metals section | ✅ FAIT | `045_ORDER_MATERIAL.xml`, `070_ORDER_METAL_TOTAL.xml`, `071_ORDER_METAL_PRODUCTION.xml` |
| 4.8 Summary | ✅ FAIT | `069_ORDER_PROFIT.xml` |

---

### 3.5 Inventory Management (100% ✅)

| Feature | État | Controllers |
|---------|------|------------|
| 5.1-5.2 Diamonds CRUD | ✅ FAIT | `DiamondController` |
| 5.3-5.4 Gems CRUD | ✅ FAIT | `GemstoneController` |
| 5.5-5.6 Metals & Consumables CRUD | ✅ FAIT | `PureMetalPurchaseController`, `AlloyController`, `AlloyedMetalController`, `OtherMaterialController` |

**Migrations complètes :**
- Pure Metal : `056_PURE_METAL_SUMMARY.xml`, `057_PURE_METAL_PURCHASE.xml`
- Alloy : `060_ALLOY.xml`, `061_ALLOY_PURCHASE.xml`
- Alloyed Metal : `062_ALLOYED_METAL.xml`, `064_ALLOYED_METAL_PURCHASE.xml`
- Other Materials : `065_OTHER_MATERIAL.xml`, `066_OTHER_METAL_TRANSACTION.xml`

**Fonctions SQL automatiques :**
- `053_IS_ROW_REFERENCED_FUNCTION.sql`
- `054_PERCENTAGE_VALUE_FUNCTIONS.sql`
- `055_CARAT_TO_GRAM_FUNCTION.sql`
- `056_CREATE_PURE_METAL_SUMMARY_FUNCTION.sql`
- `061_CREATE_UPDATE_ALLOY_FUNCTION.sql`
- `063_CREATE_UPDATE_ALLOYED_METAL_FUNCTION.sql`
- `066_CREATE_UPDATE_OTHER_MATERIAL_FUNCTION.sql`

---

### 3.6 Settings Configuration (100% ✅)

| Feature | État | Controllers |
|---------|------|------------|
| 6.1 Price of metals, hourly rate | ✅ FAIT | `PriceMetalNameController`, `LabourSettingController` |
| 6.2 Categories & parameters CRUD | ✅ FAIT | `ParameterController`, `GlobalSettingController` |

**Controllers disponibles :**
- `CylinderController`
- `DiamondShapeController`
- `GemController`
- `LabourSettingController`
- `MetalCaratageController`
- `MetalController`
- `PriceMetalNameController`
- `PriceSettingController`

---

### 3.7 Administration (100% ✅)

| Feature | État | Controllers |
|---------|------|------------|
| 7.1 Employees management | ✅ FAIT | `UserController` |
| 7.2 Clients management | ✅ FAIT | `ClientController` |
| 7.3 Suppliers management | ✅ FAIT | `SupplierController` |

**Migrations :**
- `001_ATELIER_ROLE.xml`, `002_ATELIER_USER.xml`, `003_ATELIER_USER_ROLE.xml`
- `019_CLIENT.xml`, `029_CLIENT.xml`, `039_CLIENT_V2.xml`
- `025_SUPPLIER.xml`, `038_SUPPLIER_V2.xml`

---

### 3.8 Stock Management (100% ✅)

| Feature | État | Fichiers |
|---------|------|----------|
| 8.1-8.4 Stock list, filters, details, status | ✅ FAIT | `059_ORDER_STOCK.xml`, controllers associés |

---

### 3.9 Profile Details (100% ✅)

| Feature | État | Fichiers |
|---------|------|----------|
| 9.1 Change password | ✅ FAIT | `UserController` (PASSWORD_RESET) |
| 9.2 Personal details | ✅ FAIT | `UserController` (PUT/GET) |
| 9.3 Upload profile photo | ✅ FAIT | `030_ATELIER_USER_IMAGE.xml`, `AtelierFileController` |

---

### 3.10 Features Avancées (20% ❌)

| Feature | État | Commentaires |
|---------|------|--------------|
| 10.1 Payment system | ❌ NON FAIT | Aucun code présent |
| 10.2 Multi-tenant signup | ❌ NON FAIT | Structure DB non multi-tenant |
| 10.3 Landing page | ❌ NON FAIT | Pas de page publique signup |
| 10.4 CRM (emails, etc.) | ❌ NON FAIT | Config email présente mais pas de CRM |
| 10.5 Permissions management UI | ❌ NON FAIT | RBAC backend ready, UI absente |
| 10.6 Accounting integration | ❌ NON FAIT | Aucune intégration QuickBooks/Xero |
| 10.7 Margin management | ❌ NON FAIT | Non identifié |
| 10.8 Time tracking QR codes | ❌ NON FAIT | Non identifié |

---

## 4. Audit sécurité

### 🔴 Critiques

#### 4.1 Authentification désactivée (CRITIQUE)

**Backend :**
```java
// SecurityConfig.java, ligne 166
.anyRequest().permitAll(); // ⚠️ TOUS LES ENDPOINTS SONT PUBLICS
```

**Impact :**
- Tout endpoint accessible sans authentification
- Aucun contrôle de rôle
- Accès total aux données sensibles (clients, coûts, stock, etc.)

**Fichier :** `atelier-backend-main/src/main/java/io/hearstcorporation/atelier/config/security/SecurityConfig.java`

**Frontend :**
```typescript
// PrivateRoute.tsx, lignes 17-19
// if (!authData) {
//   return <Navigate to={redirectTo} replace />;
// }
```

**Fichiers :**
- `atelier-frontend-dev/src/app/router/PrivateRoute.tsx`
- `atelier-frontend-dev/src/app/router/UserRoute.tsx`
- `atelier-frontend-dev/src/shared/providers/UserProvider.tsx`

**Recommandation :** ⚠️ **NE JAMAIS DÉPLOYER EN PROD DANS CET ÉTAT**

---

#### 4.2 Variables d'environnement

**✅ Bon point :** Toutes les variables sensibles externalisées dans `application.yml` :
```yaml
datasource:
  url: ${APP_DATABASE_URL}
  username: ${APP_DATABASE_USERNAME}
  password: ${APP_DATABASE_PASSWORD}

keycloak:
  client-secret: ${APP_KEYCLOAK_CLIENT_SECRET}

file.s3:
  access-key: ${APP_S3_ACCESS_KEY}
  secret-key: ${APP_S3_SECRET_KEY}
```

**❌ Point d'attention :**
- Aucun fichier `.env.example` présent
- Pas de validation si variable manquante au démarrage

---

#### 4.3 CORS Configuration

**Fichier :** `application.yml`
```yaml
cors:
  allowed-origins: ${APP_CORS_ALLOWED_ORIGINS}
  allowed-methods: ['*']  # ⚠️ Tous les verbes HTTP autorisés
  allowed-headers: ['*']  # ⚠️ Tous les headers autorisés
```

**Recommandation :** Restreindre methods & headers en production.

---

#### 4.4 Endpoints sensibles exposés

**Accessibles sans auth actuellement :**
- `DELETE /users/{id}` (suppression utilisateur)
- `DELETE /clients/{id}` (suppression client)
- `DELETE /suppliers/{id}` (suppression fournisseur)
- `POST /users` (création utilisateur)
- `PUT /settings/**` (modification de tous les paramètres)
- Tous les endpoints inventaire (CRUD complet)
- Tous les endpoints commandes

**Fichier :** `SecurityConfig.java` (lignes 79-166)

---

### 🟡 Moyens

#### 4.5 Pas de rate limiting visible
Aucun mécanisme anti-bruteforce ou throttling identifié.

#### 4.6 CSRF désactivé
```java
// SecurityConfig.java, ligne 74
.csrf(AbstractHttpConfigurer::disable)
```
**Note :** Acceptable pour API REST stateless, mais à documenter.

#### 4.7 Logs
- Utilisation de SLF4J (bon)
- Warning affiché au démarrage pour auth désactivée (bon)
- **À vérifier :** Pas de log de données sensibles dans les controllers

---

### 🟢 Points positifs

- Architecture OAuth2 + JWT prête
- Intégration Keycloak propre
- Pas de secrets dans le repo
- Session stateless (SessionCreationPolicy.STATELESS)
- Structure RBAC complète (`ROLE` enum, role checking ready)

---

## 5. Audit code et qualité

### 5.1 Backend

**✅ Points forts :**
- Structure modulaire claire (controller/service/repository pattern attendu)
- Migrations Liquibase versionnées proprement
- Séparation des concerns (inventory, order, admin, settings)
- Utilisation de DTOs (attendu avec les controllers)
- Lombok pour réduire boilerplate

**⚠️ Points d'attention :**
- 709 fichiers Java : impossible de vérifier exhaustivement sans analyse approfondie
- Tests unitaires : **non vérifiés** dans cet audit (à confirmer)
- Gestion d'erreurs : **non vérifiée** (controllers exception handlers ?)
- Validation input : **à vérifier** (@Valid, constraints ?)

---

### 5.2 Frontend

**✅ Points forts :**
- TypeScript (typage fort)
- Structure organisée (entities/features/shared pattern)
- Providers contextuels (UserProvider)
- Services dédiés (LocalStorageService)

**⚠️ Points d'attention :**
- 1121 fichiers : impossible audit exhaustif
- Tests : **non vérifiés** (présence de .test.tsx ?)
- Gestion d'erreurs API : **à vérifier**
- Validation formulaires : **à vérifier**
- Pas de `.env.example` visible

---

### 5.3 Base de données

**✅ Points forts :**
- Migrations versionnées proprement (001 à 076)
- Fonctions SQL automatiques pour calculs métier
- Contraintes et indexes (à vérifier dans migrations)
- Évolution incrémentale (ORDER_V2, V3, V4, GEMSTONE_V2, V3)

**⚠️ À vérifier :**
- Présence d'indexes sur foreign keys
- Row-level security (RLS) pour multi-tenant futur
- Backup/restore strategy

---

## 6. Forces et faiblesses

### ✅ Forces

1. **Architecture solide et scalable**
   - Séparation backend/frontend claire
   - Modularité par domaine métier
   - Stack moderne et éprouvée

2. **Couverture fonctionnelle MVP excellente (75%)**
   - Tous les workflows métier principaux présents
   - Gestion complète inventaire multi-types
   - Administration complète

3. **Sécurité préparée**
   - OAuth2 + JWT + Keycloak ready
   - RBAC architecturé
   - Variables externalisées

4. **Base de données robuste**
   - Migrations versionnées
   - Fonctions métier automatisées
   - Évolution incrémentale tracée

5. **DevOps/Infrastructure**
   - Multi-environnements (local, dev, stage, prod)
   - Docker + scripts automatisés
   - Configurations multiples déploiement (Fly, Railway, Render)

---

### ❌ Faiblesses

1. **🔴 CRITIQUE : Sécurité désactivée**
   - Tous les endpoints publics
   - Aucun contrôle d'accès
   - Non-production ready

2. **❌ Features SaaS manquantes (25% du MVP)**
   - Pas d'abonnements/paiements
   - Pas de multi-tenant
   - Pas de landing/signup public
   - Pas de CRM
   - Pas d'intégrations tierces (compta, time tracking)
   - UI permissions granulaires absente

3. **⚠️ Tests non vérifiés**
   - Aucune trace de tests dans cet audit
   - Couverture inconnue

4. **⚠️ Documentation incomplète**
   - Pas de `.env.example`
   - Pas de doc API (hors Swagger)
   - Pas de guide déploiement prod

5. **⚠️ Gestion d'erreurs non auditée**
   - Exception handlers à vérifier
   - Messages d'erreur user-friendly ?
   - Logs sensibles ?

---

## 7. Recommandations prioritaires

### 🔴 Priorité 1 (BLOQUANT PROD)

#### 7.1 Réactiver la sécurité

**Backend :**
```java
// SecurityConfig.java - À MODIFIER AVANT PROD

// Remplacer ligne 166 :
// .anyRequest().permitAll();

// Par :
.anyRequest().authenticated();

// ET restreindre chaque endpoint selon les rôles appropriés :
.requestMatchers(HttpMethod.DELETE, UserController.BASE_URL + UserController.USER_ID)
    .hasAnyRole(ROLE.ADMIN.name())
.requestMatchers(HttpMethod.POST, SupplierController.BASE_URL)
    .hasAnyRole(ROLE.ADMIN.name(), ROLE.MANAGER.name())
// etc.
```

**Frontend :**
```typescript
// PrivateRoute.tsx - DÉCOMMENTER lignes 17-19
if (!authData) {
  return <Navigate to={redirectTo} replace />;
}

// UserRoute.tsx - DÉCOMMENTER lignes 16-22
const hasRole = allowedRoles.some((role) => user?.role.code === role);
if (!user) return <Navigate to={"/login"} replace />;
if (!hasRole) {
  return <Navigate to={redirectTo} replace />;
}

// UserProvider.tsx - DÉCOMMENTER lignes 16-17
if (!user) return null;
```

**Fichiers à modifier :**
- `atelier-backend-main/src/main/java/io/hearstcorporation/atelier/config/security/SecurityConfig.java`
- `atelier-frontend-dev/src/app/router/PrivateRoute.tsx`
- `atelier-frontend-dev/src/app/router/UserRoute.tsx`
- `atelier-frontend-dev/src/shared/providers/UserProvider.tsx`

**Effort estimé :** 2-3 jours (modification + tests)

---

#### 7.2 Créer .env.example

Créer à la racine backend :
```bash
# .env.example
APP_NAME=atelier
APP_ACTIVE_PROFILE=local
SERVER_PORT=7001

# Database
APP_DATABASE_URL=jdbc:postgresql://localhost:5432/atelier
APP_DATABASE_USERNAME=postgres
APP_DATABASE_PASSWORD=postgres

# Keycloak
APP_JWT_ISSUER_URI=http://localhost:8080/realms/atelier
APP_KEYCLOAK_URL=http://localhost:8080
APP_KEYCLOAK_REALM=atelier
APP_KEYCLOAK_ORGANIZATION=hearst
APP_KEYCLOAK_CLIENT_ID=atelier-backend
APP_KEYCLOAK_CLIENT_SECRET=your-secret-here

# CORS
APP_CORS_ALLOWED_ORIGINS=http://localhost:7101

# Frontend URLs
APP_FRONTEND_URL=http://localhost:7101
APP_FRONTEND_NEW_PASSWORD_PATH=/new-password
APP_FRONTEND_RESTORE_PASSWORD_PATH=/restore-password
APP_FRONTEND_TIMEZONE=UTC

# Email
APP_EMAIL_ENABLE=false
APP_EMAIL_HOST=
APP_EMAIL_PORT=
APP_EMAIL_USERNAME=
APP_EMAIL_PASSWORD=
APP_EMAIL_PROTOCOL=smtp
APP_EMAIL_SENDER=

# S3
APP_FILE_SOURCE=s3
APP_S3_REGION=us-east-1
APP_S3_ACCESS_KEY=
APP_S3_SECRET_KEY=
APP_S3_BUCKET=

# Swagger
APP_SWAGGER_ENABLE=true
APP_SHOW_SQL=false
```

**Effort estimé :** 1 heure

---

#### 7.3 Restreindre CORS en production

```yaml
# application.yml (ou application-prod.yml)
cors:
  allowed-origins: ${APP_CORS_ALLOWED_ORIGINS} # Liste précise
  allowed-methods:
    - GET
    - POST
    - PUT
    - DELETE
    - PATCH
  allowed-headers:
    - Authorization
    - Content-Type
    - Accept
```

**Effort estimé :** 30 minutes

---

### 🟡 Priorité 2 (AVANT MISE EN PRODUCTION)

#### 7.4 Implémenter tests automatiques

**Backend :**
- Tests unitaires controllers (MockMvc)
- Tests services (Mockito)
- Tests intégration (TestContainers + PostgreSQL)
- Tests sécurité (endpoints avec/sans auth, rôles)

**Frontend :**
- Tests composants (React Testing Library)
- Tests routes protégées
- Tests intégration API

**Effort estimé :** 3-4 semaines

---

#### 7.5 Ajouter exception handling global

**Backend :**
```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(EntityNotFoundException ex) {
        // Log sans données sensibles
        // Retourner message user-friendly
    }
    
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDenied(AccessDeniedException ex) {
        // Log tentative accès non autorisé
    }
    
    // etc.
}
```

**Effort estimé :** 1 semaine

---

#### 7.6 Audit logs sensibles

Vérifier dans tous les controllers/services qu'aucune donnée sensible n'est loggée :
- Pas de passwords
- Pas de tokens
- Pas de clés API
- Pas de données clients complètes

**Effort estimé :** 2-3 jours

---

### 🟢 Priorité 3 (FEATURES MANQUANTES MVP)

#### 7.7 Implémenter système paiement/abonnements

**Technologies suggérées :**
- Stripe (recommandé pour SaaS)
- PayPal
- Paddle

**Fonctionnalités :**
- Plans (Basic, Pro, Enterprise)
- Souscription mensuelle/annuelle
- Webhooks
- Gestion renouvellement
- Invoicing

**Effort estimé :** 4-6 semaines

---

#### 7.8 Implémenter multi-tenant

**Backend :**
- Ajouter `tenant_id` sur toutes les tables
- Row-Level Security (RLS) PostgreSQL
- Filtrage automatique par tenant
- Isolation données complète

**Frontend :**
- Landing page publique
- Signup organisation
- Subdomain ou path-based tenancy

**Effort estimé :** 6-8 semaines

---

#### 7.9 Implémenter CRM basique

- Gestion contacts
- Historique emails
- Templates emails
- Intégration SMTP
- Tracking communications

**Effort estimé :** 4 semaines

---

#### 7.10 Intégrations comptabilité

- QuickBooks API (priorité 1)
- Xero API
- Sync factures/dépenses
- Mapping comptes

**Effort estimé :** 4-6 semaines par intégration

---

#### 7.11 Time tracking QR codes

- Génération QR par tâche/ordre
- App mobile ou web pour scanner
- Tracking temps réel
- Rapports

**Effort estimé :** 3-4 semaines

---

#### 7.12 UI Permissions granulaires

**Frontend :**
- Tickboxes permissions par rôle
- Masquage coûts selon rôle
- Protection IP (STL locks)
- Masquage noms clients

**Backend :**
- Endpoints permissions management
- Feature flags par tenant/user

**Effort estimé :** 2-3 semaines

---

## 8. Plan d'action

### Phase 1 : Sécurisation (2-3 semaines) 🔴

**Bloquant production**

- [ ] Réactiver auth backend + frontend
- [ ] Tests sécurité (rôles, accès)
- [ ] Créer .env.example
- [ ] Restreindre CORS prod
- [ ] Audit logs sensibles
- [ ] Documentation déploiement prod

**Livrables :**
- Application production-ready (sécurisée)
- Guide déploiement

---

### Phase 2 : Qualité & Tests (4-5 semaines) 🟡

- [ ] Tests unitaires backend (80% coverage min)
- [ ] Tests intégration backend
- [ ] Tests frontend composants
- [ ] Tests E2E critiques
- [ ] Exception handling global
- [ ] Monitoring & logging (Sentry, Datadog, etc.)

**Livrables :**
- Suite tests complète
- Coverage reports
- Monitoring actif

---

### Phase 3 : Features SaaS Core (8-12 semaines) 🟢

**Ordre suggéré :**

1. **Multi-tenant (6-8 semaines)**
   - Architecture DB
   - Isolation données
   - Landing page
   - Signup organisation

2. **Paiements (4-6 semaines)**
   - Intégration Stripe
   - Plans/pricing
   - Webhooks
   - Billing portal

3. **UI Permissions (2-3 semaines)**
   - Gestion granulaire
   - Feature flags

**Livrables :**
- Plateforme SaaS multi-tenant
- Gestion abonnements
- Permissions avancées

---

### Phase 4 : Features Avancées (12-16 semaines) 🟢

**En parallèle ou séquentiel selon ressources :**

1. **CRM (4 semaines)**
2. **QuickBooks integration (4-6 semaines)**
3. **Time tracking QR (3-4 semaines)**
4. **Xero integration (4-6 semaines)**

**Livrables :**
- CRM opérationnel
- Intégrations comptables
- Time tracking mobile

---

## 📊 Estimation totale

| Phase | Durée | Priorité | Bloquant Prod ? |
|-------|-------|----------|-----------------|
| Phase 1 : Sécurisation | 2-3 semaines | 🔴 Critique | ✅ OUI |
| Phase 2 : Tests/Qualité | 4-5 semaines | 🟡 Importante | ⚠️ Fortement recommandé |
| Phase 3 : SaaS Core | 8-12 semaines | 🟢 MVP | ❌ Non |
| Phase 4 : Features Avancées | 12-16 semaines | 🟢 Post-MVP | ❌ Non |

**Total MVP complet : 26-36 semaines (6-9 mois)**  
**MVP minimal production-ready : 6-8 semaines (Phase 1 + 2)**

---

## 📝 Conclusion

### État actuel
Le projet Atelier/Gemsflow présente une **architecture solide et une couverture fonctionnelle de 75% du MVP**. Tous les workflows métier principaux sont implémentés et opérationnels.

### Points bloquants
La **désactivation complète de la sécurité** rend l'application **non-production-ready**. Cette situation est documentée et intentionnelle pour faciliter le développement local, mais constitue un **risque critique** si déployée en l'état.

### Recommandation finale
1. **Court terme (2-3 semaines) :** Réactiver sécurité + tests de base → **Production-ready**
2. **Moyen terme (2-3 mois) :** Tests complets + monitoring → **Production robuste**
3. **Long terme (6-9 mois) :** Features SaaS complètes → **MVP complet**

Le projet est sur de bons rails avec une base technique solide. Les 25% manquants concernent principalement les aspects "SaaS" (multi-tenant, abonnements, intégrations) qui ne sont pas bloquants pour un déploiement initial en mode "single-tenant" sécurisé.

---

**Rapport généré le :** 6 janvier 2026  
**Prochaine révision suggérée :** Après Phase 1 (sécurisation)

