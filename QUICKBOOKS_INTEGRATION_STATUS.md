# QuickBooks Integration - État d'Avancement

## ✅ Complété

### 1. Configuration QuickBooks Developer Portal
- ✅ Application créée sur https://developer.intuit.com/
- ✅ Client ID obtenu : `ABfDxzQ1jwvKUva1mMgPSsX0Xi01Jqkr5UAdWsX6SYpvqRu7tb`
- ✅ Client Secret obtenu : `j4iWmw6k0hnQVjNg9ztZkRs5FrB2qTenI02tW3Vp`
- ✅ Redirect URI configurée : `http://localhost:7101/integrations/quickbooks/callback`
- ✅ **Sandbox Company créée** : `Sandbox Company_US_1` (Company ID: `9341456042296932`)

### 2. Backend Spring Boot

#### Configuration
- ✅ `QuickBooksProperties.java` - Propriétés de configuration
- ✅ `QuickBooksConfig.java` - Configuration Spring
- ✅ Variables d'environnement ajoutées dans `.env`

#### Modèles de Données
- ✅ `AccountingIntegration.java` - Entité principale
- ✅ `AccountingSyncLog.java` - Logs de synchronisation
- ✅ Enums : `AccountingProvider`, `IntegrationStatus`, `SyncAction`, `SyncEntityType`, `SyncStatus`

#### DTOs (11 au total)
- ✅ `AccountingIntegrationDto`
- ✅ `QuickBooksAuthUrlDto`
- ✅ `QuickBooksCallbackDto`
- ✅ `QuickBooksTokenDto`
- ✅ `QuickBooksSyncResultDto`
- ✅ `AccountingSyncLogDto`
- ✅ `QuickBooksCompanyInfoDto`
- ✅ `QuickBooksCustomerDto`
- ✅ `QuickBooksInvoiceDto`
- ✅ `QuickBooksItemDto`
- ✅ `QuickBooksDataSummaryDto`

#### Repositories
- ✅ `AccountingIntegrationRepository.java`
- ✅ `AccountingSyncLogRepository.java`

#### Services
- ✅ `QuickBooksAuthService.java` - Gestion OAuth 2.0
- ✅ `QuickBooksApiService.java` - Appels API QuickBooks

#### Controllers
- ✅ `QuickBooksIntegrationController.java` - Endpoints REST

#### Database
- ✅ Migration Liquibase : `083_ACCOUNTING_INTEGRATION.xml`
- ✅ Tables créées : `accounting_integration`, `accounting_sync_log`

### 3. Frontend React + TypeScript

#### Entities
- ✅ `src/entities/quickbooks/models/quickbooks-integration.model.ts`
- ✅ `src/entities/quickbooks/dto/quickbooks-callback.dto.ts`
- ✅ `src/entities/quickbooks/constants/query-keys.ts`
- ✅ `src/entities/quickbooks/api/quickbooks.api.ts`

#### Hooks React Query
- ✅ `useQuickBooksStatus.ts`
- ✅ `useQuickBooksConnect.ts`
- ✅ `useQuickBooksData.ts`

#### Composants UI
- ✅ `features/integrations/quickbooks-connect/` - Connexion QuickBooks
- ✅ `features/integrations/quickbooks-data-viewer/` - Visualisation des données
- ✅ `features/integrations/quickbooks-callback/` - Gestion du callback OAuth

#### Pages
- ✅ `pages/integrations/IntegrationsPage.tsx` - Page principale
- ✅ `pages/integrations/QuickBooksCallbackPage.tsx` - Page de callback

#### Routing
- ✅ Routes ajoutées dans `app/router/AppRouter.tsx`
  - `/integrations` - Page principale
  - `/integrations/quickbooks/callback` - Callback OAuth

## ⚠️ En Attente

### Backend
- ⚠️ **Démarrage du backend bloqué** par problème avec Keycloak (security-server)
- Le conteneur PostgreSQL fonctionne correctement
- Le backend ne peut pas démarrer car il dépend de Keycloak pour l'authentification

### Solutions Possibles

#### Option 1 : Désactiver temporairement Keycloak
Modifier `application.yml` pour désactiver la sécurité OAuth2 :
```yaml
spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: ${APP_JWT_ISSUER_URI:#{null}}
```

Et dans `SecurityConfig.java`, permettre tous les endpoints :
```java
http.authorizeHttpRequests(auth -> auth.anyRequest().permitAll());
```

#### Option 2 : Démarrer Keycloak séparément
```bash
cd atelier-backend-main
docker compose up -d security-server
```

#### Option 3 : Utiliser un profil Spring Boot sans sécurité
Créer un profil `dev-nosec` qui désactive la sécurité.

## 📋 Endpoints API Disponibles

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/v1/integrations/quickbooks/connect` | Obtenir l'URL d'autorisation OAuth |
| GET | `/api/v1/integrations/quickbooks/callback` | Callback OAuth (redirection) |
| POST | `/api/v1/integrations/quickbooks/sync` | Synchroniser les données |
| GET | `/api/v1/integrations/quickbooks/status` | Statut de la connexion |
| POST | `/api/v1/integrations/quickbooks/disconnect` | Déconnecter |
| GET | `/api/v1/integrations/quickbooks/company-info` | Infos entreprise |
| GET | `/api/v1/integrations/quickbooks/summary` | Résumé des données |
| GET | `/api/v1/integrations/quickbooks/customers` | Liste des clients |
| GET | `/api/v1/integrations/quickbooks/invoices` | Liste des factures |
| GET | `/api/v1/integrations/quickbooks/items` | Liste des articles |

## 🚀 Prochaines Étapes

1. **Résoudre le démarrage du backend** (voir solutions ci-dessus)
2. **Tester le flux OAuth complet** :
   - Accéder à `http://localhost:7101/integrations`
   - Cliquer sur "Connect to QuickBooks"
   - Autoriser l'accès à la Sandbox
   - Vérifier le callback et le stockage des tokens
3. **Implémenter la synchronisation** :
   - Récupérer les données de QuickBooks (Customers, Invoices, Items)
   - Mapper les données vers le modèle Atelier
   - Synchroniser bidirectionnellement
4. **Ajouter la gestion des erreurs** :
   - Logs détaillés
   - Gestion des tokens expirés
   - Retry logic
5. **Tests** :
   - Tests unitaires des services
   - Tests d'intégration de l'API
   - Tests E2E du flux OAuth

## 📁 Structure des Fichiers

```
atelier-backend-main/
├── src/main/java/.../
│   ├── config/quickbooks/
│   │   ├── QuickBooksConfig.java
│   │   └── property/QuickBooksProperties.java
│   ├── model/integration/
│   │   ├── AccountingIntegration.java
│   │   ├── AccountingSyncLog.java
│   │   └── enums/
│   ├── dto/model/integration/
│   │   └── [11 DTOs]
│   ├── repository/integration/
│   │   ├── AccountingIntegrationRepository.java
│   │   └── AccountingSyncLogRepository.java
│   ├── service/integration/
│   │   ├── QuickBooksAuthService.java
│   │   └── QuickBooksApiService.java
│   └── controller/integration/
│       └── QuickBooksIntegrationController.java
├── src/main/resources/
│   ├── application.yml (+ config QuickBooks)
│   └── db/changelog/1.0.0/
│       └── 083_ACCOUNTING_INTEGRATION.xml
└── .env (+ variables QuickBooks)

atelier-frontend-dev/
├── src/
│   ├── entities/quickbooks/
│   │   ├── api/quickbooks.api.ts
│   │   ├── hooks/
│   │   ├── models/
│   │   ├── dto/
│   │   └── constants/
│   ├── features/integrations/
│   │   ├── quickbooks-connect/
│   │   ├── quickbooks-data-viewer/
│   │   └── quickbooks-callback/
│   ├── pages/integrations/
│   │   ├── IntegrationsPage.tsx
│   │   └── QuickBooksCallbackPage.tsx
│   └── app/router/
│       └── AppRouter.tsx (+ routes)
```

## 🔗 Ressources

- [QuickBooks API Documentation](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/account)
- [OAuth 2.0 Playground](https://developer.intuit.com/app/developer/playground)
- [Sandbox Management](https://developer.intuit.com/sandbox-companies)
- Application Dashboard : https://developer.intuit.com/app/developer/myapps

## 📝 Notes

- Le backend utilise les SDK officiels QuickBooks :
  - `ipp-v3-java-data:6.3.0`
  - `oauth2-platform-api:6.3.0`
- Le frontend utilise React Query pour la gestion d'état
- Les tokens OAuth sont stockés dans la table `accounting_integration`
- Les logs de synchronisation sont dans `accounting_sync_log`
- L'environnement est configuré en mode `sandbox` pour le développement






