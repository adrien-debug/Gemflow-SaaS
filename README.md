# Atelier - Projet SaaS

## Structure du projet

```
.
├── atelier-backend-main/     # Backend Spring Boot (Java 21)
└── atelier-frontend-dev/     # Frontend React + TypeScript + Vite
```

## Démarrage local

### Backend

**Prérequis :**
- Java 21
- Maven
- Docker Desktop (recommandé)

**Commandes :**
```bash
cd atelier-backend-main
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
cd atelier-frontend-dev
npm install
npm run dev
```

**Port :**
- Frontend : http://localhost:7101

## ⚠️ Configuration de sécurité (développement)

**L'authentification est actuellement désactivée (backend + frontend) pour faciliter le développement local.**

### Backend
Tous les endpoints sont accessibles sans JWT/token.

**Fichier modifié :**
- `atelier-backend-main/src/main/java/io/hearstcorporation/atelier/config/security/SecurityConfig.java`

### Frontend
Le login et les contrôles de rôles sont désactivés.

**Fichiers modifiés :**
- `atelier-frontend-dev/src/app/router/PrivateRoute.tsx` (bypass login check)
- `atelier-frontend-dev/src/app/router/UserRoute.tsx` (bypass role check)
- `atelier-frontend-dev/src/shared/providers/UserProvider.tsx` (allow null user)

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

- Backend : Voir `atelier-backend-main/START_LOCAL.md` pour plus de détails.
- Frontend : Voir `atelier-frontend-dev/README.md` pour la configuration Vite/React.
- **Audit complet** : Voir `RAPPORT_AUDIT_COMPLET.md` pour l'audit de sécurité, l'état d'avancement MVP et les recommandations.

