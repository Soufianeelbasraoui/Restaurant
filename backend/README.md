# 🇲🇦 Maison Beldi — Backend API (Laravel 12)

API RESTful performante et sécurisée pour la gestion de l'application de restauration **Maison Beldi**, développée avec **Laravel 12** et **PHP 8.2+**.

---

## 🛠️ Stack Technique

| Composant | Technologie |
| :--- | :--- |
| **Framework** | Laravel 12 |
| **Langage** | PHP 8.2+ |
| **Base de données** | MySQL (compatible MariaDB) |
| **Authentification** | Laravel Sanctum (Tokens d'API) |
| **Documentation & Tests** | PHPUnit 11 |

---

## 🏛️ Modèles de Données & Relations

- **`User`** : Utilisateurs avec gestion des rôles (`admin`, `customer`).
- **`Category`** : Catégories culinaires (Tajines, Couscous, Pastillas, Entrées & Salades, Douceurs, Boissons).
- **`Product`** : Plats de la carte avec prix en Dirhams Marocains (**MAD**), description, visuel et disponibilité.
- **`Order` & `OrderItem`** : Commandes clients avec numéro unique, statut (`pending`, `processing`, `completed`, `cancelled`), coordonnées de livraison et détails des articles.
- **`Reservation`** : Demandes de réservation de table (nom, contact, convives, date, heure, statut).
- **`Setting`** : Paramètres globaux du restaurant (horaires, adresse, informations de contact).

---

## 🔌 Référentiel des Endpoints API

Toutes les routes API sont préfixées par `/api`.

### 1. Authentification (`/api`)
| Méthode | Route | Description | Accès |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Inscription d'un nouveau compte client | Public |
| `POST` | `/login` | Connexion et émission du jeton Sanctum | Public |
| `POST` | `/logout` | Révocation du jeton actuel | Authentifié |
| `GET` | `/user` | Données de l'utilisateur connecté | Authentifié |

### 2. Carte & Produits (`/api`)
| Méthode | Route | Description | Accès |
| :--- | :--- | :--- | :--- |
| `GET` | `/products` | Liste de tous les plats disponibles | Public |
| `GET` | `/products/{id}` | Détail d'un plat spécifique | Public |
| `GET` | `/categories` | Liste des catégories culinaires | Public |
| `GET` | `/categories/{id}` | Plats d'une catégorie donnée | Public |

### 3. Commandes & Panier (`/api`)
| Méthode | Route | Description | Accès |
| :--- | :--- | :--- | :--- |
| `GET` | `/orders` | Historique des commandes du client connecté | Client |
| `POST` | `/orders` | Création et enregistrement d'une commande | Authentifié |
| `GET` | `/orders/{id}` | Détails d'une commande | Authentifié |

### 4. Réservations (`/api`)
| Méthode | Route | Description | Accès |
| :--- | :--- | :--- | :--- |
| `POST` | `/reservations` | Soumettre une demande de réservation de table | Public |
| `GET` | `/reservations` | Liste des réservations du client | Client |

### 5. Administration (`/api/admin`)
| Méthode | Route | Description | Accès |
| :--- | :--- | :--- | :--- |
| `GET` | `/admin/overview` | Statistiques globales (ventes, commandes, clients) | Admin |
| `GET` | `/admin/orders` | Gestion de toutes les commandes | Admin |
| `PATCH` | `/admin/orders/{id}` | Mise à jour du statut d'une commande | Admin |
| `POST` | `/admin/products` | Création d'un nouveau plat | Admin |
| `PUT` | `/admin/products/{id}` | Modification d'un plat | Admin |
| `DELETE` | `/admin/products/{id}` | Suppression d'un plat | Admin |
| `GET` | `/admin/reservations` | Consultation de toutes les réservations | Admin |
| `PATCH` | `/admin/reservations/{id}` | Valider ou refuser une réservation | Admin |

---

## 🚀 Installation & Configuration

### 1. Prérequis
- **PHP** >= 8.2 (extensions actives : `pdo_mysql`, `mbstring`, `openssl`, `curl`, `zip`)
- **Composer** (dernière version)
- **MySQL** (ex: serveur local XAMPP)

### 2. Cloner et installer les dépendances
```bash
cd backend
composer install
```

### 3. Fichier d'environnement
Copiez le modèle `.env.example` en `.env` :
```bash
cp .env.example .env
```

Vérifiez la configuration de la base de données dans `.env` :
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=restaurant_db
DB_USERNAME=root
DB_PASSWORD=
```

### 4. Clé d'application & Liens symboliques
```bash
php artisan key:generate
php artisan storage:link
```

### 5. Migration et Alimentation (Seeders)
Exécutez les migrations avec le jeu de données marocain complet :
```bash
php artisan migrate:fresh --seed
```

### 6. Démarrer le serveur API
```bash
php artisan serve --host=127.0.0.1 --port=8000
```
L'API sera disponible sur : **`http://127.0.0.1:8000/api`**

---

## 🔑 Comptes de Test Intégrés

Le seeder pré-configure les comptes suivants :

| Rôle | Adresse Email | Mot de passe | Permissions |
| :--- | :--- | :--- | :--- |
| **Administrateur** | `admin@restaurant.com` | `admin123` | Accès complet au dashboard `/admin` |
| **Client Test** | `soufiane@example.com` | `password` | Commandes, réservations et profil |

---

## 🧪 Tests Unitaires & Fonctionnels

Pour exécuter la suite de tests PHPUnit :
```bash
php artisan test
```
