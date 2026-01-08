# Plan d'Implémentation — Features SaaS MVP (Section 10)

**Date :** 6 janvier 2026  
**Projet :** Gemsflow ERP  
**Référence :** Gemsflow ERP | List of features (MVP).pdf

---

## 📋 Vue d'ensemble

### État actuel vs Objectif

| Feature | PDF Ref | État Actuel | Effort |
|---------|---------|-------------|--------|
| Payment system | 10.1 | ❌ 0% | 4-5 sem |
| Multi-tenant signup + invitations | 10.2 | ⚠️ 40% | 3-4 sem |
| Landing page | 10.3 | ❌ 0% | 1-2 sem |
| Basic CRM | 10.4 | ⚠️ 20% | 3-4 sem |
| Permissions management UI | 10.5 | ❌ 0% | 2-3 sem |
| QuickBooks integration | 10.6 | ❌ 0% | 4-5 sem |
| Margin management | 10.7 | ❌ 0% | 1-2 sem |
| Time tracking QR | 10.8 | ❌ 0% | 3-4 sem |
| Localization | - | ❌ 0% | 2-3 sem |
| Proforma invoice | - | ❌ 0% | 1-2 sem |

**Total estimé : 25-35 semaines**

---

## 🎯 Ordre de priorité recommandé

```
Phase A (Fondations SaaS) ──────────────────────────────
│
├── 1. Multi-tenant complet (10.2)     [3-4 sem]
├── 2. Landing page (10.3)              [1-2 sem]
└── 3. Payment system (10.1)            [4-5 sem]
                                        ────────
                                        8-11 sem

Phase B (Features Métier) ──────────────────────────────
│
├── 4. Permissions UI (10.5)            [2-3 sem]
├── 5. Margin management (10.7)         [1-2 sem]
└── 6. Proforma invoice                 [1-2 sem]
                                        ────────
                                        4-7 sem

Phase C (Productivité) ─────────────────────────────────
│
├── 7. Time tracking QR (10.8)          [3-4 sem]
├── 8. Basic CRM (10.4)                 [3-4 sem]
└── 9. Localization                     [2-3 sem]
                                        ────────
                                        8-11 sem

Phase D (Intégrations) ─────────────────────────────────
│
└── 10. QuickBooks/Xero (10.6)          [4-5 sem]
                                        ────────
                                        4-5 sem
```

---

## 📦 Feature 10.1 — Payment System

### Description PDF
> Payment system for subscribers

### Objectif
Permettre aux organisations de s'abonner à un plan (Basic, Pro, Enterprise) et gérer leur facturation.

### Stack recommandée
- **Provider :** Stripe (meilleur pour SaaS)
- **Alternative :** Paddle (gère TVA automatiquement)

### Implémentation

#### Backend (`atelier-backend-main`)

**1. Dépendances Maven**
```xml
<!-- pom.xml -->
<dependency>
    <groupId>com.stripe</groupId>
    <artifactId>stripe-java</artifactId>
    <version>24.0.0</version>
</dependency>
```

**2. Configuration**
```yaml
# application.yml
stripe:
  api-key: ${STRIPE_API_KEY}
  webhook-secret: ${STRIPE_WEBHOOK_SECRET}
  prices:
    basic-monthly: ${STRIPE_PRICE_BASIC_MONTHLY}
    basic-yearly: ${STRIPE_PRICE_BASIC_YEARLY}
    pro-monthly: ${STRIPE_PRICE_PRO_MONTHLY}
    pro-yearly: ${STRIPE_PRICE_PRO_YEARLY}
    enterprise-monthly: ${STRIPE_PRICE_ENTERPRISE_MONTHLY}
    enterprise-yearly: ${STRIPE_PRICE_ENTERPRISE_YEARLY}
```

**3. Fichiers à créer**

```
src/main/java/io/hearstcorporation/atelier/
├── config/
│   └── stripe/
│       ├── StripeConfig.java
│       └── StripeProperties.java
├── controller/
│   └── billing/
│       ├── SubscriptionController.java
│       └── WebhookController.java
├── dto/
│   └── billing/
│       ├── SubscriptionDto.java
│       ├── CreateCheckoutSessionDto.java
│       └── BillingPortalDto.java
├── model/
│   └── billing/
│       ├── Subscription.java
│       └── Invoice.java
└── service/
    └── billing/
        ├── StripeService.java
        └── SubscriptionService.java
```

**4. Migration DB**
```sql
-- 080_SUBSCRIPTION.xml
CREATE TABLE subscription (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenant(id),
    stripe_subscription_id VARCHAR(64) UNIQUE,
    stripe_customer_id VARCHAR(64) NOT NULL,
    plan VARCHAR(32) NOT NULL, -- BASIC, PRO, ENTERPRISE
    billing_cycle VARCHAR(16) NOT NULL, -- MONTHLY, YEARLY
    status VARCHAR(24) NOT NULL, -- ACTIVE, PAST_DUE, CANCELED, TRIALING
    current_period_start TIMESTAMP NOT NULL,
    current_period_end TIMESTAMP NOT NULL,
    cancel_at_period_end BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

CREATE TABLE invoice (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenant(id),
    stripe_invoice_id VARCHAR(64) UNIQUE,
    amount_paid DECIMAL(10,2),
    currency VARCHAR(3) DEFAULT 'USD',
    status VARCHAR(24),
    invoice_pdf_url TEXT,
    created_at TIMESTAMP NOT NULL
);
```

**5. Endpoints**

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/billing/checkout-session` | Créer session Stripe Checkout |
| GET | `/api/v1/billing/portal` | Lien vers Billing Portal Stripe |
| GET | `/api/v1/billing/subscription` | Détails abonnement actuel |
| POST | `/api/v1/billing/webhook` | Webhook Stripe (events) |

**6. Webhooks à gérer**
- `checkout.session.completed` → Créer subscription
- `invoice.paid` → Enregistrer paiement
- `invoice.payment_failed` → Alerter admin
- `customer.subscription.updated` → Sync status
- `customer.subscription.deleted` → Marquer cancelled

#### Frontend (`atelier-frontend-dev`)

**1. Pages à créer**

```
src/features/billing/
├── pages/
│   ├── PricingPage.tsx          # Affichage des plans
│   ├── CheckoutPage.tsx         # Redirection Stripe
│   └── BillingPage.tsx          # Gestion abonnement
├── components/
│   ├── PricingCard.tsx
│   ├── SubscriptionStatus.tsx
│   └── InvoiceList.tsx
└── services/
    └── billingService.ts
```

**2. Routes**
```typescript
// router.tsx
{ path: '/pricing', element: <PricingPage /> }
{ path: '/billing', element: <BillingPage /> }
{ path: '/checkout/success', element: <CheckoutSuccessPage /> }
{ path: '/checkout/cancel', element: <CheckoutCancelPage /> }
```

### Tests requis
- [ ] Création session checkout
- [ ] Webhook signature validation
- [ ] Upgrade/downgrade plan
- [ ] Annulation abonnement
- [ ] Historique factures

### Effort : 4-5 semaines

---

## 📦 Feature 10.2 — Multi-tenant Signup + Invitations

### Description PDF
> Multi tenant sign up + ability to invite someone to start using the platform

### État actuel
- ✅ Entity `Tenant.java` avec plans et status
- ✅ `TenantContext.java` + `TenantFilter.java`
- ✅ Interface `TenantAware.java`
- ✅ Migrations 077-079 (tenant_id sur tables principales)
- ⚠️ 38 entities restantes à modifier (voir `PHASE_1_2_ENTITY_MODIFICATIONS.md`)
- ❌ Signup public
- ❌ Système d'invitations

### Implémentation restante

#### A. Compléter multi-tenant backend (1-2 sem)

**1. Modifier entities restantes**

Fichier de suivi : `PHASE_1_2_ENTITY_MODIFICATIONS.md`

Pattern à appliquer sur chaque entity :
```java
// AVANT
public class EntityName extends BaseModel {

// APRÈS
public class EntityName extends BaseModel implements TenantAware {
    @Column(name = "tenant_id", nullable = false)
    private Long tenantId;
```

**Entities restantes (38) :**

| Catégorie | Entities |
|-----------|----------|
| Users (3) | Token, UserImage, HallmarkLogo |
| Inventory (10) | GemstoneImage, PureMetalSummary, PureMetalPurchase, Alloy, AlloyPurchase, AlloyedMetal, AlloyedMetalPurchase, OtherMaterial, OtherMaterialTransaction |
| Orders (15) | OrderTaskImage, OrderTaskMetal, OrderMaterial, OrderDiamond, OrderLabour, OrderLabourTracker, OrderStock, OrderMetalCasting, OrderProfit, OrderMetalTotal, OrderMetalProduction, OrderTechnicalSheet, OrderTechnicalSheetImage |
| Settings (10) | LabourSetting, ItemCategory, Collection, BusinessLocation, Location, Casting, GemsPayment |

**2. Ajouter filtrage automatique**

Option A : `@Where` annotation (simple mais moins flexible)
```java
@Entity
@Where(clause = "tenant_id = current_tenant_id()")
public class Order extends BaseModel implements TenantAware {
```

Option B : Hibernate Filter (recommandé)
```java
// TenantFilterConfig.java
@Component
public class TenantFilterConfig {
    @PersistenceContext
    private EntityManager entityManager;
    
    public void enableTenantFilter() {
        Session session = entityManager.unwrap(Session.class);
        session.enableFilter("tenantFilter")
               .setParameter("tenantId", TenantContext.getTenantId());
    }
}
```

**3. Migration pour fonction SQL**
```sql
-- 080_TENANT_FILTER_FUNCTION.sql
CREATE OR REPLACE FUNCTION current_tenant_id() RETURNS BIGINT AS $$
BEGIN
    RETURN current_setting('app.current_tenant_id', true)::BIGINT;
END;
$$ LANGUAGE plpgsql;
```

#### B. Signup public (1 sem)

**1. Controller**
```java
// TenantSignupController.java
@RestController
@RequestMapping("/api/v1/signup")
public class TenantSignupController {
    
    @PostMapping
    public TenantSignupResponseDto signup(@Valid @RequestBody TenantSignupRequestDto request) {
        // 1. Créer tenant
        // 2. Créer user admin
        // 3. Envoyer email vérification
        // 4. (Optionnel) Créer trial subscription
    }
    
    @PostMapping("/verify")
    public void verifyEmail(@RequestParam String token) {
        // Activer tenant + user
    }
}
```

**2. DTO**
```java
// TenantSignupRequestDto.java
public record TenantSignupRequestDto(
    @NotBlank String organizationName,
    @NotBlank String subdomain,
    @Email String adminEmail,
    @NotBlank String adminFirstName,
    @NotBlank String adminLastName,
    @NotBlank @Size(min = 8) String password
) {}
```

**3. Migration**
```sql
-- Ajouter colonnes sur tenant
ALTER TABLE tenant ADD COLUMN email_verified BOOLEAN DEFAULT FALSE;
ALTER TABLE tenant ADD COLUMN trial_ends_at TIMESTAMP;
```

#### C. Système d'invitations (1 sem)

**1. Table invitation**
```sql
-- 081_INVITATION.xml
CREATE TABLE invitation (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenant(id),
    email VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL,
    token VARCHAR(128) UNIQUE NOT NULL,
    invited_by BIGINT REFERENCES atelier_user(id),
    expires_at TIMESTAMP NOT NULL,
    accepted_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL
);
```

**2. Controller**
```java
// InvitationController.java
@RestController
@RequestMapping("/api/v1/invitations")
public class InvitationController {
    
    @PostMapping
    public InvitationDto invite(@Valid @RequestBody InviteUserDto request) {
        // 1. Créer invitation
        // 2. Envoyer email avec lien
    }
    
    @GetMapping("/{token}")
    public InvitationDetailsDto getInvitation(@PathVariable String token) {
        // Afficher détails pour accepter
    }
    
    @PostMapping("/{token}/accept")
    public void acceptInvitation(@PathVariable String token, 
                                  @RequestBody AcceptInvitationDto dto) {
        // 1. Valider token
        // 2. Créer user dans tenant
        // 3. Marquer invitation acceptée
    }
}
```

**3. Email template**
```java
// EmailTemplates.java
public static final String INVITATION_EMAIL_TEMPLATE = """
    Hello,
    
    You have been invited to join %s on Gemsflow ERP.
    
    Click here to accept: %s
    
    This invitation expires on %s.
    """;
```

#### Frontend

**1. Pages à créer**

```
src/features/auth/
├── pages/
│   ├── SignupPage.tsx           # Inscription organisation
│   ├── VerifyEmailPage.tsx      # Vérification email
│   └── AcceptInvitationPage.tsx # Accepter invitation
└── components/
    └── SignupForm.tsx

src/features/settings/
├── pages/
│   └── TeamPage.tsx             # Gestion équipe + invitations
└── components/
    ├── InviteUserModal.tsx
    ├── PendingInvitations.tsx
    └── TeamMembersList.tsx
```

### Effort : 3-4 semaines

---

## 📦 Feature 10.3 — Landing Page

### Description PDF
> Landing page to sign up

### Implémentation

#### Option A : Page intégrée au frontend React (recommandé)

```
src/features/landing/
├── pages/
│   └── LandingPage.tsx
├── components/
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── Pricing.tsx
│   ├── Testimonials.tsx
│   └── CTASection.tsx
└── styles/
    └── landing.scss
```

**Route publique :**
```typescript
{ path: '/', element: <LandingPage />, public: true }
```

#### Option B : Site statique séparé (Next.js/Astro)

Avantages : SEO optimisé, build séparé
Inconvénients : Maintenance additionnelle

### Sections de la page

1. **Hero** — Titre + CTA "Start Free Trial"
2. **Features** — Liste des fonctionnalités principales
3. **Pricing** — Plans avec prix
4. **Testimonials** — Avis clients (si disponibles)
5. **CTA Final** — Bouton inscription

### Effort : 1-2 semaines

---

## 📦 Feature 10.4 — Basic CRM

### Description PDF
> Basic CRM (copy functionality from existing system). Send emails, etc.

### État actuel
- ✅ EmailService avec SMTP
- ✅ Templates new user / restore password
- ❌ Historique communications
- ❌ Contacts management
- ❌ Email campaigns

### Implémentation

#### Backend

**1. Tables**

```sql
-- 082_CRM_CONTACT.xml
CREATE TABLE crm_contact (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenant(id),
    client_id BIGINT REFERENCES client(id),
    email VARCHAR(255) NOT NULL,
    first_name VARCHAR(128),
    last_name VARCHAR(128),
    phone VARCHAR(32),
    company VARCHAR(256),
    notes TEXT,
    tags VARCHAR(255)[], -- PostgreSQL array
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

-- 083_CRM_COMMUNICATION.xml
CREATE TABLE crm_communication (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenant(id),
    contact_id BIGINT REFERENCES crm_contact(id),
    type VARCHAR(32) NOT NULL, -- EMAIL, CALL, MEETING, NOTE
    direction VARCHAR(16), -- INBOUND, OUTBOUND
    subject VARCHAR(512),
    content TEXT,
    sent_at TIMESTAMP,
    created_by BIGINT REFERENCES atelier_user(id),
    created_at TIMESTAMP NOT NULL
);

-- 084_EMAIL_TEMPLATE.xml
CREATE TABLE email_template (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenant(id),
    name VARCHAR(128) NOT NULL,
    subject VARCHAR(512) NOT NULL,
    body TEXT NOT NULL,
    variables VARCHAR(64)[], -- {{client_name}}, {{order_id}}
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);
```

**2. Endpoints**

```
/api/v1/crm/contacts          # CRUD contacts
/api/v1/crm/communications    # Historique communications
/api/v1/crm/emails/send       # Envoyer email
/api/v1/crm/templates         # CRUD templates
```

**3. Intégration 3rd party (optionnel)**

Si besoin de fonctionnalités avancées :
- **SendGrid** — Emails transactionnels + tracking
- **Mailchimp** — Campaigns
- **Twilio** — SMS

#### Frontend

```
src/features/crm/
├── pages/
│   ├── ContactsPage.tsx
│   ├── ContactDetailPage.tsx
│   ├── CommunicationsPage.tsx
│   └── EmailTemplatesPage.tsx
├── components/
│   ├── ContactForm.tsx
│   ├── CommunicationTimeline.tsx
│   ├── SendEmailModal.tsx
│   └── TemplateEditor.tsx
└── services/
    └── crmService.ts
```

### Effort : 3-4 semaines

---

## 📦 Feature 10.5 — Permissions Management UI

### Description PDF
> Permissions management (tick boxes to control permissions). Hide name of the clients, costing, intellectual property, STL should be locked.

### Implémentation

#### Backend

**1. Table permissions**

```sql
-- 085_PERMISSION.xml
CREATE TABLE permission (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(128) NOT NULL,
    description TEXT,
    category VARCHAR(64) -- CLIENTS, ORDERS, INVENTORY, SETTINGS, REPORTS
);

-- 086_ROLE_PERMISSION.xml
CREATE TABLE role_permission (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenant(id),
    role VARCHAR(32) NOT NULL, -- ADMIN, DESIGNER, MOUNTER, STONE_SETTER, etc.
    permission_id BIGINT NOT NULL REFERENCES permission(id),
    granted BOOLEAN DEFAULT TRUE,
    UNIQUE(tenant_id, role, permission_id)
);

-- Insert default permissions
INSERT INTO permission (code, name, category) VALUES
('VIEW_CLIENT_NAMES', 'View client names', 'CLIENTS'),
('VIEW_COSTING', 'View cost breakdown', 'ORDERS'),
('VIEW_PRICING', 'View pricing information', 'ORDERS'),
('DOWNLOAD_STL', 'Download STL files', 'ORDERS'),
('EDIT_ORDERS', 'Edit orders', 'ORDERS'),
('DELETE_ORDERS', 'Delete orders', 'ORDERS'),
('MANAGE_INVENTORY', 'Manage inventory', 'INVENTORY'),
('VIEW_REPORTS', 'View reports', 'REPORTS'),
('MANAGE_USERS', 'Manage users', 'SETTINGS'),
('MANAGE_SETTINGS', 'Manage settings', 'SETTINGS');
```

**2. Service de vérification**

```java
// PermissionService.java
@Service
public class PermissionService {
    
    public boolean hasPermission(Long userId, String permissionCode) {
        // 1. Get user role
        // 2. Check role_permission table
        // 3. Return granted status
    }
    
    public Set<String> getUserPermissions(Long userId) {
        // Return all granted permissions for user
    }
}
```

**3. Annotation custom**

```java
// RequirePermission.java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface RequirePermission {
    String value();
}

// PermissionAspect.java
@Aspect
@Component
public class PermissionAspect {
    
    @Around("@annotation(requirePermission)")
    public Object checkPermission(ProceedingJoinPoint joinPoint, 
                                   RequirePermission requirePermission) {
        if (!permissionService.hasPermission(getCurrentUserId(), 
                                              requirePermission.value())) {
            throw new AccessDeniedException("Permission denied");
        }
        return joinPoint.proceed();
    }
}
```

**4. Endpoints**

```
GET  /api/v1/permissions                    # Liste toutes permissions
GET  /api/v1/roles/{role}/permissions       # Permissions d'un rôle
PUT  /api/v1/roles/{role}/permissions       # Modifier permissions rôle
GET  /api/v1/users/{id}/permissions         # Permissions effectives user
```

#### Frontend

```
src/features/settings/
├── pages/
│   └── PermissionsPage.tsx
└── components/
    ├── RolePermissionsGrid.tsx    # Grille checkboxes
    ├── PermissionToggle.tsx
    └── RoleSelector.tsx
```

**UI : Grille de checkboxes**

```
                    ADMIN  DESIGNER  MOUNTER  SETTER
──────────────────────────────────────────────────────
View client names    ☑      ☐         ☐        ☐
View costing         ☑      ☑         ☐        ☐
Download STL         ☑      ☑         ☑        ☐
Edit orders          ☑      ☑         ☐        ☐
...
```

### Effort : 2-3 semaines

---

## 📦 Feature 10.6 — Accounting Integration (QuickBooks/Xero)

### Description PDF
> Integration with accounting software. QuickBooks first, Xero and other later.

### Implémentation QuickBooks

#### Backend

**1. Dépendances**

```xml
<!-- pom.xml -->
<dependency>
    <groupId>com.intuit.quickbooks-online</groupId>
    <artifactId>ipp-v3-java-data</artifactId>
    <version>6.3.0</version>
</dependency>
<dependency>
    <groupId>com.intuit.quickbooks-online</groupId>
    <artifactId>oauth2-platform-api</artifactId>
    <version>6.3.0</version>
</dependency>
```

**2. Configuration**

```yaml
# application.yml
quickbooks:
  client-id: ${QUICKBOOKS_CLIENT_ID}
  client-secret: ${QUICKBOOKS_CLIENT_SECRET}
  redirect-uri: ${QUICKBOOKS_REDIRECT_URI}
  environment: ${QUICKBOOKS_ENV:sandbox}  # sandbox or production
```

**3. Tables**

```sql
-- 087_ACCOUNTING_INTEGRATION.xml
CREATE TABLE accounting_integration (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenant(id),
    provider VARCHAR(32) NOT NULL, -- QUICKBOOKS, XERO
    access_token TEXT,
    refresh_token TEXT,
    realm_id VARCHAR(64), -- QuickBooks company ID
    token_expires_at TIMESTAMP,
    connected_at TIMESTAMP,
    last_sync_at TIMESTAMP,
    status VARCHAR(24) DEFAULT 'DISCONNECTED'
);

-- 088_ACCOUNTING_SYNC_LOG.xml
CREATE TABLE accounting_sync_log (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenant(id),
    entity_type VARCHAR(32), -- INVOICE, CUSTOMER, ITEM
    entity_id BIGINT,
    external_id VARCHAR(64),
    action VARCHAR(16), -- CREATE, UPDATE, DELETE
    status VARCHAR(16), -- SUCCESS, FAILED
    error_message TEXT,
    synced_at TIMESTAMP NOT NULL
);
```

**4. Flow OAuth2**

```
1. User clicks "Connect QuickBooks"
2. Redirect to QuickBooks auth URL
3. User authorizes app
4. QuickBooks redirects to callback with code
5. Exchange code for tokens
6. Store tokens encrypted in DB
```

**5. Endpoints**

```
GET  /api/v1/integrations/quickbooks/connect    # Start OAuth flow
GET  /api/v1/integrations/quickbooks/callback   # OAuth callback
POST /api/v1/integrations/quickbooks/sync       # Trigger sync
GET  /api/v1/integrations/quickbooks/status     # Connection status
DELETE /api/v1/integrations/quickbooks          # Disconnect
```

**6. Sync logic**

```java
// QuickBooksSyncService.java
@Service
public class QuickBooksSyncService {
    
    public void syncInvoices() {
        // 1. Get pending orders with status COMPLETED
        // 2. Create invoices in QuickBooks
        // 3. Log sync results
    }
    
    public void syncCustomers() {
        // Sync clients as QuickBooks customers
    }
    
    public void syncItems() {
        // Sync products as QuickBooks items
    }
}
```

#### Frontend

```
src/features/integrations/
├── pages/
│   └── IntegrationsPage.tsx
└── components/
    ├── QuickBooksConnect.tsx
    ├── IntegrationStatus.tsx
    └── SyncHistory.tsx
```

### Effort : 4-5 semaines (QuickBooks seul)

---

## 📦 Feature 10.7 — Margin Management

### Description PDF
> Manage margin for different client types, apply default margin, change manually if needed.

### Implémentation

#### Backend

**1. Migration**

```sql
-- 089_MARGIN_SETTINGS.xml
-- Ajouter colonnes sur client_category
ALTER TABLE client_category ADD COLUMN default_margin_percent DECIMAL(5,2) DEFAULT 0;

-- Ajouter colonne sur order
ALTER TABLE atelier_order ADD COLUMN margin_percent DECIMAL(5,2);
ALTER TABLE atelier_order ADD COLUMN margin_override BOOLEAN DEFAULT FALSE;

-- Table pour historique
CREATE TABLE margin_setting (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenant(id),
    client_category_id BIGINT REFERENCES client_category(id),
    margin_percent DECIMAL(5,2) NOT NULL,
    effective_from DATE NOT NULL,
    effective_to DATE,
    created_by BIGINT REFERENCES atelier_user(id),
    created_at TIMESTAMP NOT NULL
);
```

**2. Logic**

```java
// MarginService.java
@Service
public class MarginService {
    
    public BigDecimal calculateMargin(Order order) {
        if (order.isMarginOverride()) {
            return order.getMarginPercent();
        }
        
        Client client = order.getClient();
        return client.getCategory().getDefaultMarginPercent();
    }
    
    public BigDecimal applyMargin(BigDecimal cost, BigDecimal marginPercent) {
        return cost.multiply(BigDecimal.ONE.add(marginPercent.divide(100)));
    }
}
```

**3. Endpoints**

```
GET  /api/v1/settings/margins                  # Liste margins par catégorie
PUT  /api/v1/settings/margins/{categoryId}     # Modifier margin catégorie
PUT  /api/v1/orders/{id}/margin                # Override margin ordre
```

#### Frontend

- Ajouter section dans Settings → Clients → Categories
- Ajouter champ "Margin %" dans formulaire ordre (avec toggle override)

### Effort : 1-2 semaines

---

## 📦 Feature 10.8 — Time Tracking avec QR Codes

### Description PDF
> Time tracking with QR codes and mobile interface for employees

### Implémentation

#### Backend

**1. Tables**

```sql
-- 090_TIME_TRACKING.xml
CREATE TABLE time_entry (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenant(id),
    user_id BIGINT NOT NULL REFERENCES atelier_user(id),
    order_id BIGINT REFERENCES atelier_order(id),
    order_task_id BIGINT REFERENCES order_task(id),
    clock_in TIMESTAMP NOT NULL,
    clock_out TIMESTAMP,
    duration_minutes INTEGER, -- Calculated
    notes TEXT,
    source VARCHAR(16) DEFAULT 'MANUAL', -- MANUAL, QR_CODE
    created_at TIMESTAMP NOT NULL
);

-- Table pour QR codes
CREATE TABLE qr_code (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL REFERENCES tenant(id),
    code VARCHAR(64) UNIQUE NOT NULL,
    entity_type VARCHAR(32) NOT NULL, -- ORDER, ORDER_TASK
    entity_id BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    expires_at TIMESTAMP
);
```

**2. Génération QR**

```java
// QRCodeService.java
@Service
public class QRCodeService {
    
    public String generateQRCode(String entityType, Long entityId) {
        String code = UUID.randomUUID().toString();
        // Save to DB
        // Generate QR image using ZXing library
        return code;
    }
    
    public byte[] generateQRImage(String code) {
        // Use ZXing to generate PNG
    }
}
```

**3. Endpoints**

```
POST /api/v1/time/clock-in                     # Pointer entrée
POST /api/v1/time/clock-out                    # Pointer sortie
GET  /api/v1/time/current                      # Session en cours
GET  /api/v1/time/entries                      # Historique
POST /api/v1/qr/scan                           # Scanner QR → clock in/out
GET  /api/v1/qr/{entityType}/{entityId}        # Générer QR (image)
```

#### Frontend

**1. Interface mobile-friendly**

```
src/features/timetracking/
├── pages/
│   ├── TimeClockPage.tsx         # Interface pointage
│   ├── TimeHistoryPage.tsx       # Historique
│   └── QRScannerPage.tsx         # Scanner QR (caméra)
└── components/
    ├── ClockButton.tsx           # Gros bouton Clock In/Out
    ├── CurrentSession.tsx        # Timer en cours
    ├── QRScanner.tsx             # Composant caméra
    └── TimeEntryList.tsx
```

**2. PWA pour mobile**

Ajouter manifest.json pour installation sur mobile :
```json
{
  "name": "Gemsflow Time",
  "short_name": "GF Time",
  "start_url": "/time",
  "display": "standalone",
  "theme_color": "#000000"
}
```

**3. Impression QR**

Ajouter bouton "Print QR" sur page Order/Task pour imprimer étiquette.

### Effort : 3-4 semaines

---

## 📦 Features additionnelles (du PDF)

### Localization (i18n)

**Backend :**
- Messages d'erreur multi-langues
- Fichiers `messages_en.properties`, `messages_fr.properties`

**Frontend :**
- Utiliser `react-i18next`
- Fichiers JSON par langue

**Effort : 2-3 semaines**

### Proforma Invoice

**Description :** Générer facture proforma + tracking dépôt + démarrage production.

**Tables :**
```sql
CREATE TABLE proforma_invoice (
    id BIGSERIAL PRIMARY KEY,
    tenant_id BIGINT NOT NULL,
    order_id BIGINT NOT NULL REFERENCES atelier_order(id),
    invoice_number VARCHAR(32) UNIQUE,
    amount DECIMAL(12,2),
    deposit_amount DECIMAL(12,2),
    deposit_paid BOOLEAN DEFAULT FALSE,
    deposit_paid_at TIMESTAMP,
    sent_to_client_at TIMESTAMP,
    pdf_file_id BIGINT REFERENCES atelier_file(id),
    created_at TIMESTAMP NOT NULL
);
```

**Flow :**
1. Créer proforma depuis Order
2. Générer PDF
3. Envoyer email au client
4. Client paie dépôt
5. Marquer dépôt payé → Order passe en production

**Effort : 1-2 semaines**

---

## 📅 Planning récapitulatif

### Phase A : Fondations SaaS (8-11 sem)

| Semaine | Feature | Livrables |
|---------|---------|-----------|
| 1-4 | Multi-tenant complet | Entities, filtrage, signup, invitations |
| 5-6 | Landing page | Page publique + pricing |
| 7-11 | Payment system | Stripe, plans, billing portal |

### Phase B : Features Métier (4-7 sem)

| Semaine | Feature | Livrables |
|---------|---------|-----------|
| 12-14 | Permissions UI | Grille checkboxes, RBAC |
| 15-16 | Margin management | Settings + override |
| 17-18 | Proforma invoice | PDF, emails, tracking |

### Phase C : Productivité (8-11 sem)

| Semaine | Feature | Livrables |
|---------|---------|-----------|
| 19-22 | Time tracking QR | Clock in/out, scanner, PWA |
| 23-26 | Basic CRM | Contacts, communications, templates |
| 27-29 | Localization | EN + FR + structure i18n |

### Phase D : Intégrations (4-5 sem)

| Semaine | Feature | Livrables |
|---------|---------|-----------|
| 30-34 | QuickBooks | OAuth, sync invoices/customers |

---

## ✅ Checklist de démarrage

Avant de commencer l'implémentation :

- [ ] Valider ordre de priorité avec product owner
- [ ] Créer compte Stripe (test mode)
- [ ] Créer compte QuickBooks Developer (sandbox)
- [ ] Définir plans/pricing exact (Basic, Pro, Enterprise)
- [ ] Définir liste complète des permissions
- [ ] Définir langues supportées (EN, FR, ...)
- [ ] Valider design UI/UX des nouvelles pages

---

**Document créé le :** 6 janvier 2026  
**Auteur :** Audit automatique  
**Prochaine révision :** Après Phase A

