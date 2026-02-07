# 🔐 Instructions de Connexion Supabase

## ❌ Problème Actuel

La connexion à la base de données Supabase échoue avec l'erreur :
```
FATAL: Tenant or user not found
```

## 🎯 Solution

Vous devez récupérer les **vraies informations de connexion** depuis votre dashboard Supabase.

### Étape 1 : Accéder aux Paramètres de la Base de Données

1. Ouvrir : https://supabase.com/dashboard/project/xlvlcnrkrqstfoadoamk/settings/database
2. Se connecter si nécessaire

### Étape 2 : Récupérer la Connection String

Dans la section **"Connection string"**, vous trouverez une chaîne de connexion au format :

```
postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres
```

**Important** : Utilisez la version **"Transaction"** ou **"Session"** du pooler (port 6543), PAS la connexion directe (port 5432).

### Étape 3 : Extraire les Informations

De cette connection string, extrayez :

- **Username** : `postgres.xlvlcnrkrqstfoadoamk` (la partie avant `:[YOUR-PASSWORD]`)
- **Password** : La partie après `:` et avant `@`
- **Host** : `aws-0-eu-central-1.pooler.supabase.com`
- **Port** : `6543`
- **Database** : `postgres`

### Étape 4 : Mettre à Jour le Fichier .env.local

Éditez le fichier `gemflow-backend/.env.local` :

```bash
APP_DATABASE_URL=jdbc:postgresql://aws-0-eu-central-1.pooler.supabase.com:6543/postgres
APP_DATABASE_USERNAME=postgres.xlvlcnrkrqstfoadoamk
APP_DATABASE_PASSWORD=[VOTRE_MOT_DE_PASSE_ICI]
```

**⚠️ ATTENTION** : 
- Si le username contient `.pooler` dans la connection string, gardez-le
- Si le username ne contient PAS `.pooler`, ne l'ajoutez pas
- Le mot de passe peut contenir des caractères spéciaux - copiez-le exactement

### Étape 5 : Tester la Connexion

```bash
cd gemflow-backend
./test-db-connection.sh
```

Si vous voyez `✅ Connexion réussie !`, vous pouvez démarrer le backend :

```bash
export $(cat .env.local | grep -v '^#' | xargs)
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

## 🔍 Vérifications Alternatives

### Option 1 : Utiliser la Connection String Complète

Si vous avez la connection string complète, vous pouvez la tester directement :

```bash
psql "postgresql://postgres.xlvlcnrkrqstfoadoamk:[PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"
```

### Option 2 : Vérifier dans Supabase Dashboard

1. Aller sur : https://supabase.com/dashboard/project/xlvlcnrkrqstfoadoamk
2. Cliquer sur "Settings" (en bas à gauche)
3. Cliquer sur "Database"
4. Copier la **"Connection pooling"** string (Transaction mode)

## 📝 Notes Importantes

1. **Ne PAS utiliser le port 5432** (connexion directe bloquée depuis l'extérieur)
2. **Utiliser le port 6543** (pooler Supabase)
3. **Le mot de passe est sensible à la casse** - copiez-le exactement
4. **Le username peut varier** selon le mode de connexion (avec ou sans `.pooler`)

## 🆘 Besoin d'Aide ?

Si vous ne trouvez pas les informations :

1. Vérifiez que vous êtes bien connecté au bon projet Supabase
2. Vérifiez que le projet `xlvlcnrkrqstfoadoamk` existe et est actif
3. Si le projet a été supprimé/recréé, les credentials ont changé

---

**Dernière mise à jour** : 7 février 2026
