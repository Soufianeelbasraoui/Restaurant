# 🍽️ Restaurant App 

Application web full-stack de gestion de restaurant construite avec **Laravel** (backend) et **React + Vite** (frontend).

## 📋 Technologies

| Couche          | Stack                                |
| --------------- | ------------------------------------ |
| Frontend        | React 18, Vite, React Router         |
| Backend         | Laravel 12, PHP 8.2+                 |
| Base de données | MySQL                                |
| Style           | CSS personnalisé (thème Luxe Bistro) |

## 🔑 Comptes de Test

| Rôle | Email | Mot de passe |
| :--- | :--- | :--- |
| **Admin** | `admin@restaurant.com` | `admin123` |
| **Client** | `soufiane@example.com` | `password` |

## 🚀 Installation

### Prérequis

- **PHP** >= 8.2 (avec extension `zip`, `pdo_mysql`)
- **Composer**
- **Node.js** >= 18
- **MySQL** (XAMPP)

### Backend (Laravel 12)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan storage:link
php artisan migrate --seed
php artisan serve
```

### Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

## 📁 Structure du Projet

```
Restaurant/
├── backend/          # API Laravel
│   ├── app/          # Models, Controllers, Middleware
│   ├── database/     # Migrations et Seeders
│   ├── routes/       # Routes API
│   └── ...
├── frontend/         # Application React
│   ├── src/
│   │   ├── components/  # Composants réutilisables
│   │   ├── pages/       # Pages (Admin, User, Public)
│   │   ├── contexts/    # Contextes React (Auth, Cart)
│   │   └── ...
│   └── ...
└── README.md
```

## 👤 Auteur

- **Soufiane El Basraoui** — [GitHub](https://github.com/Soufianeelbasraoui)
