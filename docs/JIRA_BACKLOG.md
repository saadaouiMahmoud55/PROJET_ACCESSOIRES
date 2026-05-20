# Backlog & Board Jira (simulation)

## Méthodologie Scrum
Le projet est organisé en mode Scrum pour structurer le développement et la livraison.

- Epics : grandes fonctionnalités métier
- User Stories : besoins utilisateurs
- Tasks : découpage technique
- Sprints : périodes de travail courtes (2 semaines)
- Définition de prêt/done : critères d'acceptation, tests, documentation

## Epic 1 - Catalogue et Navigation
- US-1.1: En tant qu'utilisateur, je veux consulter la liste des produits.
  - Tasks:
    - Implémenter l'API `GET /api/accessories`
    - Afficher la grille de produits dans le frontend
    - Ajouter le style et l'affichage responsive
  - Critères d'acceptation:
    - La page liste les accessoires
    - Chaque produit affiche nom, prix, catégorie
    - La page est accessible en desktop et mobile

- US-1.2: En tant qu'utilisateur, je veux filtrer par catégorie et marque.
  - Tasks:
    - Ajouter les paramètres de filtre à l'API
    - Ajouter les filtres frontend
    - Tester le comportement avec Cypress
  - Critères d'acceptation:
    - Les filtres renvoient un résultat cohérent
    - Les filtres peuvent être combinés

## Epic 2 - Gestion des Produits (Admin)
- US-2.1: Ajouter un accessoire
  - Tasks:
    - Créer le formulaire de création produit
    - Valider les champs côté backend et frontend
    - Ajouter un test unitaire et un test d'intégration

- US-2.2: Modifier un accessoire
  - Tasks:
    - Créer un formulaire de modification
    - Pré-remplir les données existantes
    - Ajouter des tests

- US-2.3: Supprimer un accessoire
  - Tasks:
    - Ajouter une action de suppression
    - Confirmer l'action avant suppression
    - Tester le flux de suppression

## Epic 3 - Infrastructure et Qualité
- US-3.1: Déployer PostgreSQL et Redis via Docker Compose
- US-3.2: Configurer le cache Redis pour les lectures
- US-3.3: Ajouter les tests unitaires, d'intégration et E2E

## Sprint 1 (2 semaines)
- US-1.1 (Done)
- US-1.2 (In Progress)
- US-3.1 (Done)

## Sprint 2 (2 semaines)
- US-2.1 (To Do)
- US-2.2 (To Do)
- US-3.3 (To Do)

## Scrum Board
- To Do
  - US-2.1
  - US-2.2
  - US-3.3
- In Progress
  - US-1.2
- Done
  - US-1.1
  - US-3.1

## Jira Import CSV
Voir `docs/jira-import.csv` pour un exemple d'import d'issues Jira.

## Notes
- Les tests unitaires backend utilisent JUnit 5 et Mockito.
- Les tests d'intégration backend utilisent Spring Boot et MockMvc.
- Les tests E2E utilisent Cypress (interface utilisateur) et Selenium (navigateur réel).
