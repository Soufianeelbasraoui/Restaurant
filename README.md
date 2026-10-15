# 🇲🇦 Maison Beldi — Table & Terroir Marocain

Application web full-stack d'un restaurant gastronomique marocain traditionnel et moderne, développée avec **Laravel 12** (Backend API) et **React 18 + Vite** (Frontend SPA).

---

## 🌟 Présentation

- **Enseigne** : Maison Beldi — Table & Terroir Marocain
- **Devise** : Dirham Marocain (**MAD**)
- **Expérience** : Interface moderne et réactive, catalogue complet de spécialités marocaines authentiques, commande en ligne et réservation de table en direct.

---

## 📋 Stack Technique

| Couche | Technologies Clés |
| :--- | :--- |
| **Frontend** | React 18, Vite 7, TailwindCSS v4, React Router 6, Framer Motion, Lucide React, Axios |
| **Backend** | Laravel 12, PHP 8.2+, Laravel Sanctum (Tokens API), Eloquent ORM |
| **Base de Données** | MySQL (XAMPP) |
| **Architecture** | Séparation SPA / API REST découplée |

---

## 🔑 Comptes de Démonstration (Pré-configurés)

Le système dispose de comptes prêts à l'emploi après exécution du seeder :

| Espace | Email | Mot de passe | Rôle |
| :--- | :--- | :--- | :--- |
| **Administration** | `admin@restaurant.com` | `admin123` | Gestion globale (Plats, Catégories, Commandes, Réservations) |
| **Espace Client** | `soufiane@example.com` | `password` | Passage de commandes, réservations, historique |

---

## 🚀 Installation & Démarrage Rapide

### Prérequis
- **PHP** >= 8.2 (extensions `pdo_mysql`, `mbstring`, `zip`)
- **Composer**
- **Node.js** >= 18
- **MySQL** (ex: serveur local XAMPP)

---

### 1. Démarrer le Backend (Laravel 12)

```bash
cd backend

# 1. Installer les dépendances PHP
composer install

# 2. Configurer l'environnement
cp .env.example .env
php artisan key:generate
php artisan storage:link

# 3. Créer la base de données et charger les données marocaines
php artisan migrate:fresh --seed

# 4. Lancer le serveur d'API
php artisan serve --port=8000
```
> Le serveur backend sera accessible sur : **`http://127.0.0.1:8000`**

---

### 2. Démarrer le Frontend (React + Vite)

Dans un second terminal :

```bash
cd frontend

# 1. Installer les modules Node.js
npm install

# 2. Lancer le serveur de développement Vite
npm run dev
```
> L'application client sera accessible sur : **`http://localhost:5173`**

---

## 📁 Architecture du Dépôt

```
Restaurant/
├── backend/                  # API RESTful Laravel 12
│   ├── app/
│   │   ├── Http/Controllers/Api/  # Contrôleurs API (Auth, Plats, Commandes, Réservations, Admin)
│   │   └── Models/                 # Modèles Eloquent (User, Product, Category, Order, etc.)
│   ├── database/
│   │   ├── migrations/             # Schémas de base de données relationnelle
│   │   └── seeders/DatabaseSeeder.php # Données culinaires marocaines & comptes tests
│   ├── routes/api.php              # Définition des routes de l'API REST
│   └── README.md                   # Documentation détaillée du backend
│
├── frontend/                 # Client SPA React 18 + Vite
│   ├── src/
│   │   ├── components/       # Navbar borderless, CartDrawer, Footer, Logo, etc.
│   │   ├── pages/            # Home (Hero Tajine), Products (La Carte), Checkout (MAD), Contact, etc.
│   │   ├── context/          # AuthContext & CartContext
│   │   └── utils/            # dishImages.js (Résolveur de visuels culinaires)
│   ├── public/               # hero_tagine.jpg & ressources statiques
│   └── README.md             # Documentation détaillée du frontend
│
└── README.md                 # Vue d'ensemble du projet
```

---

## 👤 Auteur & Maintenance

- **Soufiane El Basraoui** — [GitHub](https://github.com/Soufianeelbasraoui)
- Projet : [Restaurant (Maison Beldi)](https://github.com/Soufianeelbasraoui/Restaurant)
