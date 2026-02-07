# 🚨 Action Finale Requise

## ❌ Problème Identifié

Le mot de passe `Adrien0334$$` ne fonctionne pas pour l'instance Supabase `xlvlcnrkrqstfoadoamk`.

**Causes possibles** :
1. Le mot de passe a été changé
2. Le mot de passe contient des caractères spéciaux différents
3. L'instance Supabase a été recréée avec de nouveaux credentials

## ✅ Solution Définitive (1 minute)

### Étape 1 : Récupérer la VRAIE Connection String

1. Ouvrir : https://supabase.com/dashboard/project/xlvlcnrkrqstfoadoamk/settings/database

2. Dans la section **"Connection pooling"**, sélectionner :
   - Mode : **Transaction** ou **Session**
   - Port : **6543** (PAS 5432 !)

3. Copier la connection string complète qui ressemble à :
   ```
   postgresql://postgres:[VOTRE_VRAI_MOT_DE_PASSE]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres
   ```

### Étape 2 : Utiliser le Script de Configuration

```bash
cd gemflow-backend
./configure-supabase.sh
```

Quand le script demande la connection string, **coller exactement** ce que vous avez copié depuis Supabase.

### Étape 3 : Démarrer le Backend

```bash
export $(cat .env.local | grep -v '^#' | xargs)
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

## 🔍 Vérification Importante

**La connection string doit contenir** :
- ✅ `aws-0-eu-central-1.pooler.supabase.com` (le pooler)
- ✅ `:6543` (le port du pooler)
- ❌ PAS `db.xlvlcnrkrqstfoadoamk.supabase.co:5432` (connexion directe bloquée)

## 📝 Exemple de Connection String Correcte

```
postgresql://postgres:MOT_DE_PASSE_REEL@aws-0-eu-central-1.pooler.supabase.com:6543/postgres
```

## 🆘 Si le Problème Persiste

1. Vérifier que le projet `xlvlcnrkrqstfoadoamk` existe et est actif
2. Vérifier que vous avez les droits d'accès au projet
3. Essayer de réinitialiser le mot de passe de la base de données depuis Supabase Dashboard

---

**Important** : Le port 5432 (connexion directe) est **bloqué** depuis l'extérieur par Supabase.  
Il faut **obligatoirement** utiliser le pooler sur le port **6543**.
