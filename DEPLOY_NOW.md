# 🚀 DÉPLOYER MAINTENANT SUR RAILWAY - Guide Pas à Pas

## 📋 Prérequis
- ✅ Compte GitHub (fait - repo: `adrien-debug/Gemflow-SaaS`)
- ✅ Code restructuré et pushé (fait - commit `49f03c8`)
- ⚠️ Compte Railway (créer sur https://railway.app si pas encore fait)

---

## 🎯 ÉTAPES DE DÉPLOIEMENT

### **ÉTAPE 1 : Créer le projet Railway**

1. Aller sur https://railway.app
2. Cliquer **"New Project"**
3. Sélectionner **"Deploy from GitHub repo"**
4. Autoriser Railway à accéder à GitHub (si première fois)
5. Sélectionner le repo **`adrien-debug/Gemflow-SaaS`**
6. Railway va commencer à analyser le repo

---

### **ÉTAPE 2 : Ajouter PostgreSQL**

1. Dans le projet Railway, cliquer **"+ New"** (en haut à droite)
2. Sélectionner **"Database"**
3. Choisir **"Add PostgreSQL"**
4. Attendre que Postgres soit provisionné (30 secondes)

✅ Railway va automatiquement créer les variables :
- `PGHOST`
- `PGPORT`
- `PGDATABASE`
- `PGUSER`
- `PGPASSWORD`

---

### **ÉTAPE 3 : Configurer les variables d'environnement**

1. Cliquer sur le service **backend** (pas Postgres)
2. Aller dans l'onglet **"Variables"**
3. Cliquer **"+ New Variable"**
4. Ajouter **3 variables obligatoires** :

```bash
# Variable 1
APP_DATABASE_URL
jdbc:postgresql://${{Postgres.PGHOST}}:${{Postgres.PGPORT}}/${{Postgres.PGDATABASE}}

# Variable 2
APP_DATABASE_USERNAME
${{Postgres.PGUSER}}

# Variable 3
APP_DATABASE_PASSWORD
${{Postgres.PGPASSWORD}}
```

5. Cliquer **"Add"** pour chaque variable

---

### **ÉTAPE 4 : Configurer CORS (après premier déploiement)**

Une fois le déploiement réussi, Railway va générer une URL publique.

1. Copier l'URL (ex: `https://gemsflow-production.up.railway.app`)
2. Retourner dans **"Variables"**
3. Ajouter 2 nouvelles variables :

```bash
APP_CORS_ALLOWED_ORIGINS
https://gemsflow-production.up.railway.app

APP_FRONTEND_URL
https://gemsflow-production.up.railway.app
```

---

### **ÉTAPE 5 : Générer un domaine public**

1. Dans le service backend, aller dans **"Settings"**
2. Section **"Networking"**
3. Cliquer **"Generate Domain"**
4. Railway va créer une URL : `https://xxx.up.railway.app`

---

### **ÉTAPE 6 : Vérifier le déploiement**

1. Attendre que le build se termine (2-3 minutes)
2. Ouvrir l'URL générée : `https://xxx.up.railway.app/actuator/health`
3. Tu devrais voir :

```json
{
  "status": "UP"
}
```

4. Vérifier Swagger UI : `https://xxx.up.railway.app/swagger-ui.html`

---

## ✅ CHECKLIST FINALE

- [ ] Projet Railway créé
- [ ] PostgreSQL addon ajouté
- [ ] 3 variables DB configurées
- [ ] Domaine public généré
- [ ] `/actuator/health` retourne `{"status":"UP"}`
- [ ] Swagger UI accessible
- [ ] Variables CORS ajoutées (après déploiement)

---

## 🔧 SI ÇA NE MARCHE PAS

### **Erreur : "Could not resolve placeholder"**
→ Vérifier que les 3 variables DB sont bien configurées

### **Erreur : "Connection refused"**
→ Vérifier que Postgres est bien démarré (voir les logs du service Postgres)

### **Erreur : Liquibase migration failed**
→ Normal la première fois, attendre que les migrations se terminent

### **Build fails : "No pom.xml found"**
→ Vérifier que Railway pointe bien sur la racine (pas un sous-dossier)

### **Logs Railway**
Cliquer sur le service → Onglet **"Deployments"** → Dernier déploiement → **"View Logs"**

---

## 🎨 ÉTAPE 7 : Déployer le Frontend (Optionnel)

Si tu veux déployer le frontend React aussi :

1. Dans le même projet Railway, cliquer **"+ New"** → **"Empty Service"**
2. Aller dans **"Settings"**
3. Section **"Source"** → Connecter au même repo GitHub
4. **Root Directory** : `/frontend`
5. **Build Command** : `npm install && npm run build`
6. **Start Command** : `npx serve -s dist -p $PORT`
7. Générer un domaine pour le frontend
8. Mettre à jour `APP_FRONTEND_URL` et `APP_CORS_ALLOWED_ORIGINS` avec cette nouvelle URL

---

## 📊 COÛT ESTIMÉ

Railway offre **$5 de crédit gratuit / mois** (suffisant pour tester).

Après :
- **Backend** : ~$5-10/mois
- **PostgreSQL** : ~$5/mois
- **Frontend** (optionnel) : ~$2-5/mois

**Total** : ~$12-20/mois pour l'ensemble

---

## 🔗 LIENS UTILES

- **Dashboard Railway** : https://railway.app/dashboard
- **Docs Railway** : https://docs.railway.app/
- **Postgres Plugin** : https://docs.railway.app/databases/postgresql
- **GitHub Repo** : https://github.com/adrien-debug/Gemflow-SaaS

---

## 📞 SUPPORT

Si tu bloques, poster dans :
- Discord Railway : https://discord.gg/railway
- README du projet : Voir `RAILWAY_DEPLOY.md`

---

**🚀 C'EST PARTI ! Va sur Railway et suis les étapes ci-dessus.**

