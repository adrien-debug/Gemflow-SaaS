# Deployment Live — Gemflow

Created on 2026-04-27 by automated migration.

## Live endpoints

- **Backend API** : https://gemflow-backend-production.up.railway.app
- **Health** : https://gemflow-backend-production.up.railway.app/actuator/health/railway → `{"status":"UP"}`
- **Frontend** : https://gemflow-smoky.vercel.app (Vercel team `hearst-corporation`, projet `gemflow`)

## Infrastructure

### Supabase
- **Project name** : `gemflow`
- **Project ref** : `pufgnrkfbfsjhiuiehwr`
- **Region** : `eu-central-1` (Frankfurt)
- **Org** : `etcwyazrdadzweuvvxuy` (https://supabase.com)
- **Postgres** : 17.6.1.111
- **Dashboard** : https://supabase.com/dashboard/project/pufgnrkfbfsjhiuiehwr
- **JWT signing** : ES256 asymétrique (JWKS) à `${SUPABASE_URL}/auth/v1/.well-known/jwks.json`

### Railway
- **Project name** : `gemflow`
- **Project id** : `3c25e942-e8fc-45b6-b591-e77d8df26390`
- **Service** : `gemflow-backend` (id `025d9bc4-cb26-4e0b-8103-a3e7813fff25`)
- **Workspace** : `adrien-debug's Projects`
- **Builder** : Nixpacks (Java 21, Maven)
- **Profile actif** : `prod`

## DB Connection

Le pooler Supabase est utilisé en **session mode** (port 5432, IPv4). Direct connection (`db.<ref>.supabase.co`) est IPv6-only sur les nouveaux projets, donc incompatible avec Railway.

```
APP_DATABASE_URL      jdbc:postgresql://aws-1-eu-central-1.pooler.supabase.com:5432/postgres
APP_DATABASE_USERNAME postgres.pufgnrkfbfsjhiuiehwr
APP_DATABASE_PASSWORD (32 chars random, stocké dans .secrets/supabase-db-password.txt)
```

Les 87 migrations Liquibase ont été exécutées avec succès au premier boot, la DB est initialisée vide.

## Secrets (locaux, gitignorés)

Le dossier `.secrets/` est dans `.gitignore`. Il contient :
- `supabase-db-password.txt` — DB password (32 chars)
- `supabase-api-keys.json` — clés `anon` + `service_role` + `sb_publishable` + `sb_secret`
- `supabase-project.json` — payload de création projet
- `supabase-db-config.json` — métadata DB
- `railway.env` — résumé env vars Railway

→ **Backup-les dans ton password manager.** Si tu perds ce dossier, il faudra régénérer les keys via le dashboard Supabase.

## Frontend Vercel — env vars à set

```
VITE_BACKEND_HOST=https://gemflow-backend-production.up.railway.app
VITE_SUPABASE_URL=https://pufgnrkfbfsjhiuiehwr.supabase.co
VITE_SUPABASE_ANON_KEY=<anon key from .secrets/supabase-api-keys.json>
```

À retirer (legacy Keycloak) : `VITE_AUTH_HOST`, `VITE_AUTH_REALM`, `VITE_AUTH_CLIENT_ID`, `VITE_AUTH_CLIENT_SECRET`, `VITE_AUTH_CLIENT_SCOPE`.

## Premier utilisateur — comment se connecter

La DB est vide. Il n'y a aucun user. Trois options :

1. **Créer un user via le backend** (`POST /api/v1/users` — public dans la `SecurityConfig` actuelle) — le backend appellera Supabase Admin API pour créer le compte, et enverra un mail "définissez votre mot de passe" (si `APP_EMAIL_ENABLE=true`).
2. **Créer un user manuellement** dans le dashboard Supabase : Auth → Users → Add user → email + password. Puis insérer manuellement la row correspondante dans `atelier_user` avec `oid = auth.users.id` (UUID Supabase).
3. **Activer le seed dev** : un seed Liquibase existe pour le profil `dev` (user admin par défaut). À explorer dans `db/changelog/` si nécessaire.

L'option **1** est la plus naturelle vu que le frontend est déjà câblé. Mais vérifie d'abord que `APP_EMAIL_ENABLE` est `true` et que le SMTP est configuré, sinon le user créé n'aura jamais le mail de définition de password (et tu devras passer par l'option 2).

## Sécurité — à faire

1. **Rotate le PAT Supabase** que tu as collé en chat : `sbp_824cfcab7a439f4a3f1ab2ada4aa1f11fc66f761` est compromis (visible dans cette conversation). https://supabase.com/dashboard/account/tokens → revoke + recreate.
2. **Vérifier l'audit `SecurityConfig.java`** : 30+ endpoints sont en `permitAll()` (POST/PUT/DELETE sur Inventory, Users, Clients, Suppliers). À auditer un par un, et soit garder volontairement (avec justification), soit basculer en `authenticated()`.
3. **Activer Swagger en non-prod uniquement** : `APP_SWAGGER_ENABLE=false` est set en prod, OK. Vérifier en dev.
4. Les 10 fichiers `.md` racine référencent encore Keycloak (docs obsolètes). À nettoyer ou réécrire.

## Commandes utiles

```bash
# Logs backend
railway logs --service gemflow-backend

# Variables Railway
railway variables --kv

# Redéployer
railway redeploy --service gemflow-backend --yes

# Health
curl https://gemflow-backend-production.up.railway.app/actuator/health/railway

# DB shell (via Supabase pooler)
PGPASSWORD=$(cat .secrets/supabase-db-password.txt) psql \
  -h aws-1-eu-central-1.pooler.supabase.com -p 5432 \
  -U postgres.pufgnrkfbfsjhiuiehwr -d postgres
```
