# 🐾 PetBuddy — Backend
> API REST sécurisée pour l'application de suivi du bien-être animal PetBuddy.

[![Frontend App](https://img.shields.io/badge/-Voir%20l'app-000000?style=for-the-badge)](https://mypetbuddy.vercel.app/)
[![Frontend Repo](https://img.shields.io/badge/-Frontend%20Repo-3E3742?style=for-the-badge&logo=github&logoColor=white)](https://github.com/nabila-tamajnit/petbuddy-frontend)

<br>

![Node.js](https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/-Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/-Mongoose-880000?style=for-the-badge)
![JWT](https://img.shields.io/badge/-JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Argon2](https://img.shields.io/badge/-Argon2-4A4A4A?style=for-the-badge)
![Insomnia](https://img.shields.io/badge/-Insomnia-4000BF?style=for-the-badge&logo=insomnia&logoColor=white)

---

## ✨ Fonctionnalités

- **Authentification sécurisée** : Hash des mots de passe Argon2, génération et vérification de tokens JWT (HS512, expiration 7 jours, audience/issuer dédiés).
- **CRUD complet** : Endpoints pour animaux, rappels, suivis de santé et logs de bien-être, avec vérification d'ownership sur chaque ressource.
- **Architecture en couches** : Séparation stricte routes / controllers / services / models — les controllers ne touchent jamais directement MongoDB.
- **IDOR protection** : `userId` dénormalisé sur toutes les collections enfants pour vérifier l'ownership sans requêtes supplémentaires.
- **Soft delete** : Les animaux archivés (`isActive`) restent récupérables, avec cascade de suppression définitive sur demande.
- **Règle un log par jour** : Un seul log de bien-être par animal et par jour, vérifié via une plage de dates.
- **Sécurité production** : Helmet (headers HTTP), rate limiting sur les routes d'auth (10 req/15 min), CORS configuré par origine.
- **Tips contextuels** : Conseils aléatoires par espèce via aggregation MongoDB (`$sample`).

---

## 💡 Compétences clés

- **Architecture REST** : Séparation routes / controllers / services / models avec logique métier exclusivement dans les services.
- **Mongoose** : Schémas typés avec validations, enums, références entre collections et configuration statique par espèce.
- **Sécurité applicative** : Combinaison Helmet + rate limiter + CORS restrictif + JWT avec audience/issuer, adaptée à un déploiement portfolio.
- **Bonnes pratiques** : Pas de logs de debug en production, `return` systématique avant les réponses d'erreur, ordre correct des middlewares Express.

---

## 📡 Endpoints principaux

| Méthode | Route | Description | Auth |
|--------|-------|-------------|------|
| POST | `/api/auth/register` | Créer un compte | — |
| POST | `/api/auth/login` | Connexion | — |
| GET | `/api/animals` | Animaux actifs de l'utilisateur | ✓ |
| POST | `/api/animals` | Ajouter un animal | ✓ |
| PUT | `/api/animals/:id` | Modifier un animal | ✓ owner |
| DELETE | `/api/animals/:id` | Archiver un animal | ✓ owner |
| PATCH | `/api/animals/:id/restore` | Restaurer un animal archivé | ✓ owner |
| DELETE | `/api/animals/:id/permanent` | Supprimer définitivement un animal | ✓ owner |
| GET | `/api/animals/:animalId/health-records` | Suivi santé d'un animal | ✓ owner |
| POST | `/api/animals/:animalId/health-records` | Ajouter un suivi santé | ✓ owner |
| GET | `/api/animals/:animalId/wellness` | Logs de bien-être d'un animal | ✓ owner |
| POST | `/api/animals/:animalId/wellness` | Ajouter un log de bien-être | ✓ owner |
| GET | `/api/animals/:animalId/reminders` | Rappels d'un animal | ✓ owner |
| POST | `/api/animals/:animalId/reminders` | Créer un rappel | ✓ owner |
| PATCH | `/api/animals/:animalId/reminders/:id/done` | Marquer un rappel comme fait | ✓ owner |
| GET | `/api/reminders/pending` | Tous les rappels en attente de l'utilisateur | ✓ |
| GET | `/api/tips/species?species=cat` | Conseils aléatoires par espèce | ✓ |
| GET | `/api/users/me` | Profil de l'utilisateur connecté | ✓ |
| DELETE | `/api/users/me` | Supprimer son compte (cascade) | ✓ owner |

---

## 🔗 Liens

[![Frontend App](https://img.shields.io/badge/-Voir%20l'app-000000?style=for-the-badge)](https://mypetbuddy.vercel.app/)
[![Frontend Repo](https://img.shields.io/badge/-Frontend%20Repo-3E3742?style=for-the-badge&logo=github&logoColor=white)](https://github.com/nabila-tamajnit/petbuddy-frontend)

---

## 👤 Auteur

**Nabila Tamajnit** - Étudiante Full Stack @ Interface3
