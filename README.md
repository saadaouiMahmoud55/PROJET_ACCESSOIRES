
# Application Accessoires Téléphoniques

## Vue d'ensemble

Cette application permet de gérer un catalogue d'accessoires téléphoniques (coques, chargeurs, protecteurs d'écran, etc.). 

**C'est quoi ?**
- Une boutique en ligne pour les accessoires de téléphones
- Backend Spring Boot qui gère la base de données
- Frontend Angular pour l'interface utilisateur
- Cache Redis pour améliorer la performance

Note importante : les anciennes **Partie 1** et **Partie 2** ont été fusionnées en une seule partie. Le frontend de démonstration (site web non formulaire, grille produits + filtres) est disponible dans `frontend/simple-site`. Vous pouvez le servir localement via Python `http.server` ou l'intégrer au backend.

## Architecture

### Backend (Spring Boot)
- **Langage** : Java 17
- **Framework** : Spring Boot 3.2
- **Base de données** : PostgreSQL (ou H2 en local)
- **Cache** : Redis (optionnel)

### Frontend (Angular)
- **Langage** : TypeScript
- **Framework** : Angular 17
- **Styles** : CSS

### Infrastructure
- **Conteneurs** : Docker & Docker Compose
- **Base de données** : PostgreSQL en container
- **Cache** : Redis en container

## Démarrage Rapide

### Option 1 : Avec Docker (Recommandé)

```bash
# Démarrer les services (PostgreSQL + Redis)
docker-compose up -d

# Démarrer le backend
cd backend
mvn spring-boot:run -Dspring-boot.run.profiles=postgres

# Dans un autre terminal, démarrer le frontend
cd frontend
npm install
ng serve
```

### Option 2 : Sans Docker (Base de données locale H2)

```bash
# Démarrer le backend avec H2 (base de données en mémoire)
cd backend
mvn spring-boot:run

# Dans un autre terminal, démarrer le frontend
cd frontend
npm install
ng serve
```

## Accès à l'application

- **Frontend** : http://localhost:4200
- **Backend API** : http://localhost:8081/api
- **Documentation API** : http://localhost:8081/swagger-ui.html

## Méthodologie Scrum & Jira
Ce projet suit une organisation agile inspirée de Scrum avec une simulation Jira dans `docs/JIRA_BACKLOG.md`.

- Epics, User Stories et tâches clairement définies.
- Sprints de 2 semaines pour chaque ensemble de fonctionnalités.
- Board Jira simulé avec colonnes `To Do`, `In Progress`, `Done`.
- Export CSV possible pour importer les issues dans Jira.

Voir aussi : `docs/JIRA_BACKLOG.md`.

## Tests

### Tests unitaires backend
```bash
cd backend
mvn test
```

### Tests d'intégration backend
```bash
cd backend
mvn -Dtest=*IntegrationTest test
```

### Tests E2E frontend Cypress
```bash
cd frontend
npm install
npm run cypress:open
```

### Tests Selenium frontend
```bash
cd backend
mvn -Dtest=FrontEndSeleniumTest test
```

### Remarque
Le test Selenium attend que l'application frontend soit accessible sur `http://localhost:4200`.

## Les Principales Fonctionnalités

### Gestion des Accessoires
| Action | Endpoint | Description |
|--------|----------|-------------|
| Voir tous | `GET /api/accessories` | Liste tous les accessoires |
| Voir un | `GET /api/accessories/{id}` | Affiche un accessoire spécifique |
| Créer | `POST /api/accessories` | Ajoute un nouvel accessoire |
| Modifier | `PUT /api/accessories/{id}` | Modifie un accessoire existant |
| Supprimer | `DELETE /api/accessories/{id}` | Supprime un accessoire |

### Gestion des Marques
| Action | Endpoint |
|--------|----------|
| Voir tous | `GET /api/brands` |
| Voir une | `GET /api/brands/{id}` |
| Créer | `POST /api/brands` |
| Modifier | `PUT /api/brands/{id}` |
| Supprimer | `DELETE /api/brands/{id}` |

### Gestion des Catégories
| Action | Endpoint |
|--------|----------|
| Voir tous | `GET /api/categories` |
| Voir une | `GET /api/categories/{id}` |
| Créer | `POST /api/categories` |
| Modifier | `PUT /api/categories/{id}` |
| Supprimer | `DELETE /api/categories/{id}` |

## Structure du Projet

```
projet_accessoires/
├── backend/                          # Code Java Spring Boot
│   ├── src/main/java/com/example/accessories/
│   │   ├── entity/                  # Classes JPA (Accessory, Brand, Category)
│   │   ├── service/                 # Logique métier (caching, validation)
│   │   ├── controller/              # Endpoints REST
│   │   └── repository/              # Requêtes base de données
│   ├── src/test/java/              # Tests unitaires (JUnit + Mockito)
│   └── pom.xml                     # Dépendances Maven
│
├── frontend/                         # Code Angular TypeScript
│   ├── src/app/
│   │   ├── models/                 # Interfaces TypeScript
│   │   ├── services/               # Services HTTP
│   │   ├── app.component.ts        # Composant principal
│   │   └── app.component.html      # Template
│   ├── cypress/                    # Tests E2E
│   └── package.json               # Dépendances npm
│
├── database/                        # Scripts SQL
│   └── init-db.sql                # Schéma et données initiales
│
└── docker-compose.yml             # Configuration des conteneurs
```

## Technologie : Qu'est-ce qui se passe sous le capot ?

### Validation des données
Les données sont validées en Java avec des annotations comme `@NotBlank` et `@Min`. Si vous envoyez des données invalides, le backend rejette la requête avec un message d'erreur.

### Cache Redis
Quand vous récupérez une liste d'accessoires, le backend la garde en cache (mémoire rapide). Lors du prochain appel, il retourne la version en cache au lieu de faire une nouvelle requête à la base de données. C'est beaucoup plus rapide !

**Comment ça marche :**
- La première fois : Requête → Base de données → Résultat en cache
- Les fois suivantes : Requête → Cache → Résultat immédiat
- Lors d'une modification : Cache vidé → Nouvelle requête requise

### Relations entre les données
- Une **marque** peut avoir plusieurs **accessoires**
- Une **catégorie** peut avoir plusieurs **accessoires**
- Un **accessoire** est lié à une marque ET une catégorie

Exemple :
```
Marque: Apple
  └─ Accessoire: Coque iPhone (Catégorie: Coque)
  └─ Accessoire: Chargeur iPhone (Catégorie: Chargeur)

Marque: Samsung
  └─ Accessoire: Coque Galaxy (Catégorie: Coque)
```

## Tests

### Tests Unitaires Backend
```bash
cd backend
mvn test
```
Les tests vérifient que chaque fonction (créer, modifier, supprimer) fonctionne correctement isolément.

### Tests E2E Frontend
```bash
cd frontend
npx cypress open    # Interface graphique
# ou
npx cypress run     # En ligne de commande
```
Les tests E2E cliquent dans l'interface et vérifient que tout fonctionne comme prévu.

## Configuration Avancée

### Profils Spring Boot

**Mode développement (H2)** :
```bash
mvn spring-boot:run
# Utilise une base de données en mémoire H2 - aucun setup nécessaire
```

**Mode PostgreSQL** :
```bash
mvn spring-boot:run -Dspring-boot.run.profiles=postgres
# Utilise PostgreSQL (doit être en cours d'exécution via Docker)
```

### Variables d'environnement
Voir `application.properties` pour configurer le port, la base de données, Redis, etc.

## Troubleshooting

**Le frontend ne peut pas se connecter au backend**
- Vérifiez que le backend écoute sur `http://localhost:8081`
- Vérifiez les erreurs CORS dans la console du navigateur

**PostgreSQL refuse la connexion**
- Assurez-vous que Docker est en cours d'exécution
- Vérifiez les credentials : `spring.datasource.username=postgres` et `password=postgres`

**Redis ne fonctionne pas**
- Redis est optionnel - l'application fonctionne sans lui
- Vérifiez que le conteneur Redis est en cours d'exécution : `docker ps`

## Améliorations futures possibles

- [ ] Ajouter un système de panier/commande
- [ ] Implémenter une authentification utilisateur
- [ ] Ajouter des images pour chaque accessoire
- [ ] Implémenter des avis/commentaires
- [ ] Dashboard d'admin
- [ ] Recherche et filtres avancés

## Contribution

Pour apporter des modifications :
1. Créer une branche : `git checkout -b feature/ma-fonctionnalité`
2. Faire vos changements
3. Tester localement
4. Créer une merge request

## Licence

Projet d'apprentissage - usage libre

---

**Questions ou problèmes ?** Vérifiez d'abord les logs du terminal et consultez la documentation de Spring Boot et Angular.

# PROJET_ACCESSOIRES
