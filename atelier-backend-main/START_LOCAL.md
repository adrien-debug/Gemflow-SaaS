# Guide de démarrage local

## Prérequis
- Java 21
- Maven
- Docker (pour PostgreSQL et Keycloak) OU PostgreSQL installé localement

## Démarrage rapide

### Option 1 : Avec Docker Compose (recommandé)

1. Démarrer Docker Desktop
2. Démarrer les services nécessaires :
```bash
docker compose up -d postgres
```

3. Lancer l'application :
```bash
./run-local.sh
```

### Option 2 : Sans Docker

1. Installer PostgreSQL localement
2. Créer une base de données :
```sql
CREATE DATABASE atelier;
```

3. Lancer l'application :
```bash
./run-local.sh
```

## Ports utilisés

- **Backend** : http://localhost:8000
- **Swagger UI** : http://localhost:8000/swagger-ui.html
- **PostgreSQL** : localhost:5432
- **Keycloak** : localhost:8081 (si démarré avec Docker Compose)

## Vérification

Une fois l'application démarrée, vous pouvez vérifier qu'elle fonctionne :
```bash
curl http://localhost:8000/actuator/health
```

