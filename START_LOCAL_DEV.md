# 🚀 Guide de démarrage local (Mode DEV)

## Démarrage rapide

### 1️⃣ Démarrer PostgreSQL

```bash
docker compose up -d postgres
```

### 2️⃣ Lancer le backend (Terminal 1)

```bash
./run-local.sh
```

**Attendez le message :**
```
Started AtelierBackendApplication in X.XXX seconds
```

### 3️⃣ Lancer le frontend (Terminal 2)

```bash
cd frontend
npm install  # Première fois uniquement
npm run dev
```

**Attendez le message :**
```
➜  Local:   http://localhost:7101/
```

## ✅ Vérification

### Test automatique
```bash
./test-dev-mode.sh
```

### Backend
```bash
curl http://localhost:7001/actuator/health
# Devrait retourner : {"status":"UP"}
```

### API (sans authentification)
```bash
curl http://localhost:7001/api/v1/roles
# Devrait retourner la liste des rôles
```

### Frontend
Ouvrir http://localhost:7101 dans le navigateur.

**✨ Auto-login activé** : Vous serez automatiquement connecté en tant que "Dev User" (Super Admin) sans page de login.

## 🔧 URLs utiles

| Service | URL |
|---------|-----|
| **Frontend** | http://localhost:7101 |
| **Backend API** | http://localhost:7001 |
| **Swagger UI** | http://localhost:7001/swagger-ui.html |
| **Health Check** | http://localhost:7001/actuator/health |
| **PostgreSQL** | localhost:5432 (user: postgres, pass: postgres, db: atelier) |

## 🛑 Arrêter les services

### Backend
Dans le terminal backend, appuyer sur `Ctrl+C`

### Frontend
Dans le terminal frontend, appuyer sur `Ctrl+C`

### PostgreSQL
```bash
docker compose down
```

## ⚙️ Configuration

### Mode DEV
- ✅ **Auto-login activé** - Pas de page de connexion
- ✅ **Mock user** - Connecté automatiquement en tant que "Dev User" (Super Admin)
- ✅ **Authentification désactivée** (pas de JWT requis)
- ✅ **Tous les endpoints publics**
- ✅ **CORS activé** pour localhost:7101
- ✅ **Logs SQL activés** (show-sql: true)
- ✅ **Hot reload** (backend via Maven, frontend via Vite)

### Utilisateur DEV
- **Nom** : Dev User
- **Email** : dev@localhost
- **Rôle** : Super Admin
- **Permissions** : Toutes

📖 **Guide détaillé** : Voir `DEV_MODE_GUIDE.md`

### Fichiers de configuration
- Backend : `src/main/resources/application-dev.yml`
- Frontend : `frontend/.env.local`
- Sécurité DEV : `src/main/java/io/hearstcorporation/atelier/config/security/SecurityConfigDev.java`

## 🔍 Troubleshooting

### PostgreSQL ne démarre pas
```bash
# Vérifier Docker
docker ps

# Voir les logs
docker compose logs postgres

# Redémarrer
docker compose restart postgres
```

### Backend ne démarre pas
```bash
# Vérifier Java
java -version  # Doit être 21+

# Vérifier Maven
mvn -version

# Nettoyer et recompiler
mvn clean install
```

### Frontend ne démarre pas
```bash
# Vérifier Node
node -v  # Doit être >= 20

# Nettoyer et réinstaller
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Port déjà utilisé
```bash
# Backend (7001)
lsof -ti:7001 | xargs kill -9

# Frontend (7101)
lsof -ti:7101 | xargs kill -9
```

## 📝 Notes

### Profils disponibles
- `dev` - Mode développement sans authentification (actuel)
- `local` - Mode local avec Keycloak local
- `prod` - Mode production avec Keycloak Railway

### Passer en mode avec authentification
Modifier `run-local.sh` :
```bash
# Changer
export SPRING_PROFILES_ACTIVE=dev

# En
export SPRING_PROFILES_ACTIVE=local
```

Puis démarrer Keycloak :
```bash
docker compose up -d keycloak
```

### Base de données
Les migrations Liquibase s'appliquent automatiquement au démarrage.
- 174 changesets sont déjà appliqués
- Aucune migration manuelle nécessaire

### Hot Reload
- **Backend** : Maven recompile automatiquement les changements
- **Frontend** : Vite recharge automatiquement (HMR)
