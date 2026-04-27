# Supabase Auth — Setup & Deployment

This document explains how to wire up Supabase Auth (replacing Keycloak) for the Gemflow backend on Railway and the React frontend on Vercel.

## 1. Supabase project requirements

The backend validates JWTs via the JWKS endpoint at `${SUPABASE_URL}/auth/v1/.well-known/jwks.json`. To make this work the project must use **asymmetric JWT signing keys (RS256)**:

1. Open the Supabase dashboard → your project → **Authentication → Settings → JWT Keys**.
2. Confirm that an asymmetric (RS256/ES256) signing key is active. If only a legacy HS256 secret is shown, click **"Use asymmetric keys (recommended)"** and rotate.
3. Verify that `https://<project-ref>.supabase.co/auth/v1/.well-known/jwks.json` returns a JSON document with at least one key.

You will need three secrets from the dashboard:

| Where to find it | What it is | Used by |
|---|---|---|
| **Settings → API → Project URL** | `SUPABASE_URL` | Backend + frontend |
| **Settings → API → Project API keys → `anon`** | `SUPABASE_ANON_KEY` / `VITE_SUPABASE_ANON_KEY` | Backend (signin grant) + frontend |
| **Settings → API → Project API keys → `service_role`** | `SUPABASE_SERVICE_ROLE_KEY` | Backend only — never ship to frontend |

The `service_role` key bypasses Row Level Security. It must stay on the server.

## 2. Backend env vars (Railway)

Set these on your Railway backend service. The defaults shipped in `application.yml` reference these names:

```
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service_role key>
SUPABASE_ANON_KEY=<anon key>
SUPABASE_JWT_AUDIENCE=authenticated     # default; only override if you customize the aud claim

APP_DATABASE_URL=jdbc:postgresql://aws-0-eu-central-1.pooler.supabase.com:6543/postgres
APP_DATABASE_USERNAME=postgres.<project-ref>
APP_DATABASE_PASSWORD=<db password>

APP_ORGANIZATION_NAME=Gemsflow
APP_ACTIVE_PROFILE=prod
APP_CORS_ALLOWED_ORIGINS=https://gemflow-saas.vercel.app,https://*.vercel.app
APP_FRONTEND_URL=https://gemflow-saas.vercel.app
```

Remove the old Keycloak vars from Railway: `APP_KEYCLOAK_URL`, `APP_KEYCLOAK_REALM`, `APP_KEYCLOAK_ORGANIZATION`, `APP_KEYCLOAK_CLIENT_ID`, `APP_KEYCLOAK_CLIENT_SECRET`, `APP_JWT_ISSUER_URI`.

## 3. Frontend env vars (Vercel)

```
VITE_BACKEND_HOST=https://<railway-backend-host>
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon key>
```

Remove `VITE_AUTH_HOST`, `VITE_AUTH_REALM`, `VITE_AUTH_CLIENT_ID`, `VITE_AUTH_CLIENT_SECRET`, `VITE_AUTH_CLIENT_SCOPE` if still defined.

## 4. User model assumption

The backend resolves the authenticated user by `jwt.sub == atelier_user.oid`. When you create a Supabase user via the backend (`POST /api/v1/users`), the backend stores `auth.users.id` returned by Supabase as the `oid` of the new `atelier_user`. Existing data created during the Keycloak era was wiped, so this works on a clean DB.

If you ever need to create a Supabase user manually (e.g. via the Supabase dashboard) and want it to map to an existing `atelier_user` record, make sure the UUIDs match — either set the `id` explicitly on creation or update `atelier_user.oid` afterwards.

## 5. JWT validation

`application.yml` is configured with:

```yaml
spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          jwk-set-uri: ${SUPABASE_URL}/auth/v1/.well-known/jwks.json
          issuer-uri: ${SUPABASE_URL}/auth/v1
          audiences:
            - ${SUPABASE_JWT_AUDIENCE:authenticated}
```

Spring Security automatically fetches and caches the JWKS, validates RS256 signatures, the `iss` claim, and the `aud` claim. No shared secrets to rotate.

## 6. Auth-related code map

| Concern | File |
|---|---|
| JWT → AuthUser mapping | `src/main/java/io/hearstcorporation/atelier/config/security/AuthUserJwtTokenConverter.java` |
| Spring Security setup | `src/main/java/io/hearstcorporation/atelier/config/security/SecurityConfig.java` |
| Supabase Admin REST clients | `src/main/java/io/hearstcorporation/atelier/config/supabase/SupabaseConfig.java` |
| Supabase config props | `src/main/java/io/hearstcorporation/atelier/config/supabase/property/SupabaseProperties.java` |
| Identity provider abstraction | `src/main/java/io/hearstcorporation/atelier/service/identity/IdentityProviderService.java` |
| Supabase Admin API impl | `src/main/java/io/hearstcorporation/atelier/service/identity/impl/SupabaseIdentityProviderServiceImpl.java` |
| Frontend auth client | `frontend/src/shared/services/supabase.service.ts`, `frontend/src/entities/authorization/api/token.api.ts` |
