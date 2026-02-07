# 🔧 Guide Mode DEV - Auto-Login

## ✅ Configuration actuelle

Le mode DEV est maintenant **activé** avec auto-login automatique.

### Fonctionnalités

- ✅ **Pas de page de login** - Accès direct à l'application
- ✅ **Mock user automatique** - Connecté en tant que "Dev User" (Super Admin)
- ✅ **Pas de JWT requis** - Backend en mode DEV sans authentification
- ✅ **Hot Reload** - Modifications en temps réel

## 🚀 Utilisation

### 1. Accéder à l'application

Ouvrir simplement : http://localhost:7101

L'application vous connecte automatiquement avec :
- **Nom** : Dev User
- **Email** : dev@localhost
- **Rôle** : Super Admin
- **Permissions** : Toutes

### 2. Vérifier le mode DEV

Ouvrir la console du navigateur (F12), vous devriez voir :
```
🔧 DEV MODE: Auto-login activé
```

### 3. Navigation

Toutes les pages sont accessibles sans restriction :
- Dashboard : http://localhost:7101/
- Orders : http://localhost:7101/orders
- Inventory : http://localhost:7101/inventory
- Settings : http://localhost:7101/settings
- etc.

## ⚙️ Configuration

### Variables d'environnement

**Frontend** (`frontend/.env.local`) :
```bash
VITE_DEV_MODE=true  # Active le mode DEV
VITE_BACKEND_HOST=http://localhost:7001
```

**Backend** (`run-local.sh`) :
```bash
SPRING_PROFILES_ACTIVE=dev  # Profile sans authentification
```

### Mock User

Le mock user est défini dans `frontend/src/shared/config/dev-mode.config.ts` :

```typescript
export const mockDevUser: User = {
  id: 1,
  firstName: "Dev",
  lastName: "User",
  fullName: "Dev User",
  email: "dev@localhost",
  isActive: true,
  role: {
    id: 1,
    code: "SUPER_ADMIN",
    name: "Super Admin",
  },
  photos: [],
};
```

Vous pouvez modifier ces valeurs si nécessaire.

## 🔄 Désactiver le mode DEV

### Option 1 : Mode avec authentification Keycloak local

1. Modifier `frontend/.env.local` :
```bash
VITE_DEV_MODE=false
```

2. Modifier `run-local.sh` :
```bash
export SPRING_PROFILES_ACTIVE=local
```

3. Démarrer Keycloak :
```bash
docker compose up -d keycloak
```

4. Redémarrer backend et frontend

### Option 2 : Mode production (Keycloak Railway)

1. Modifier `frontend/.env.local` :
```bash
VITE_DEV_MODE=false
```

2. Modifier `run-local.sh` :
```bash
export SPRING_PROFILES_ACTIVE=prod
```

3. Redémarrer backend et frontend

**Credentials Keycloak Railway :**
- Username : `testuser`
- Password : `Test1234!`

## 📝 Fichiers modifiés

### Frontend
1. `frontend/.env.local` - Ajout `VITE_DEV_MODE=true`
2. `frontend/src/shared/config/dev-mode.config.ts` - Configuration mode DEV (nouveau)
3. `frontend/src/app_/router/PrivateRoute.tsx` - Auto-login en mode DEV
4. `frontend/src/shared/providers/UserProvider.tsx` - Mock user en mode DEV
5. `frontend/src/entities/user/hooks/usePersonalDetails.ts` - Retourne mock user en mode DEV

### Backend
1. `src/main/resources/application-dev.yml` - Configuration profil DEV (nouveau)
2. `src/main/java/io/hearstcorporation/atelier/config/security/SecurityConfigDev.java` - Sécurité désactivée (nouveau)
3. `src/main/java/io/hearstcorporation/atelier/config/security/SecurityConfig.java` - Ajout `@Profile("!dev")`
4. `run-local.sh` - Utilise profil `dev`

## 🐛 Troubleshooting

### Le mode DEV ne s'active pas

1. Vérifier `frontend/.env.local` :
```bash
cat frontend/.env.local | grep VITE_DEV_MODE
# Devrait afficher : VITE_DEV_MODE=true
```

2. Redémarrer le frontend :
```bash
# Dans le terminal frontend (Ctrl+C puis)
npm run dev
```

3. Vider le cache du navigateur (Ctrl+Shift+R)

### Erreur "401 Unauthorized"

Le backend n'est pas en mode DEV. Vérifier :

```bash
# Vérifier les logs backend
tail -50 /Users/adrienbeyondcrypto/.cursor/projects/*/terminals/*.txt | grep "SECURITY DISABLED"
# Devrait afficher : ⚠️  SECURITY DISABLED - Running in DEV mode
```

Si absent, redémarrer le backend :
```bash
./run-local.sh
```

### Page de login s'affiche quand même

1. Ouvrir la console du navigateur (F12)
2. Aller dans l'onglet "Application" → "Local Storage"
3. Supprimer toutes les données
4. Rafraîchir la page (F5)

## 💡 Conseils

### Développement rapide

En mode DEV, vous pouvez :
- Tester rapidement les fonctionnalités sans login
- Modifier le code et voir les changements instantanément
- Accéder à toutes les pages sans restrictions
- Utiliser Swagger UI sans token : http://localhost:7001/swagger-ui.html

### Tests avec différents rôles

Pour tester avec un rôle différent, modifier `mockDevUser` dans `dev-mode.config.ts` :

```typescript
// Tester en tant qu'Admin
role: {
  id: 2,
  code: "ADMIN",
  name: "Admin",
}

// Tester en tant qu'Employee
role: {
  id: 3,
  code: "EMPLOYEE",
  name: "Employee",
}
```

Puis rafraîchir le navigateur.

## 🔒 Sécurité

**⚠️ IMPORTANT** : Le mode DEV désactive complètement la sécurité.

- ❌ Ne JAMAIS déployer en production avec `VITE_DEV_MODE=true`
- ❌ Ne JAMAIS déployer en production avec profil `dev`
- ✅ Utiliser uniquement en développement local
- ✅ Toujours vérifier que la sécurité est activée avant le déploiement

## 📚 Ressources

- Backend API : http://localhost:7001
- Swagger UI : http://localhost:7001/swagger-ui.html
- Frontend : http://localhost:7101
- Health Check : http://localhost:7001/actuator/health
