# 🇲🇦 Maison Beldi — Frontend Application

Application web client moderne et réactive pour le restaurant **Maison Beldi** (*Table & Terroir Marocain*), construite avec **React 18**, **Vite** et **TailwindCSS**.


---

## 🌟 Fonctionnalités Clés

- **Accueil & Storytelling** : Bannière Hero authentique avec tajine marocain de saison, présentation du savoir-faire artisanal et témoignages.
- **La Carte Culinaire** : Catalogue complet des spécialités (Tajines, Couscous, Pastillas, Briouates, Salades Beldi, Desserts & Thé à la menthe) avec recherche en temps réel et filtres par catégorie.
- **Gestion du Panier & Tiroir Interactif** : Tiroir latéral animé (*Framer Motion*) avec gestion des quantités, seuil de livraison offerte (gratuit dès 120 MAD) et affichage en Dirhams Marocains (**MAD**).
- **Tunnel de Commande (Checkout)** : Formulaire de livraison adapté au Maroc (villes, quartiers, téléphone), options de paiement à la livraison (Cash) ou Carte Bancaire.
- **Réservation de Table en Ligne** : Formulaire direct sur la page Contact avec confirmation immédiate via l'API Laravel.
- **Espace Client (Dashboard)** : Suivi de l'historique des commandes, statut en temps réel et gestion des informations personnelles.
- **Espace Administration** : Tableau de bord complet pour la gestion des plats, catégories, commandes clients et réservations.

---

## 🛠️ Stack Technique

| Outil / Bibliothèque | Rôle |
| :--- | :--- |
| **React 18** | Bibliothèque UI composable |
| **Vite 7** | Bundler ultra-rapide avec HMR |
| **TailwindCSS v4** | Framework utilitaire CSS |
| **React Router v6** | Routage applicatif côté client |
| **Lucide React** | Icônes vectorielles modernes et légères |
| **Framer Motion** | Micro-interactions et animations douces |
| **Axios** | Client HTTP pour la communication avec l'API Laravel |
| **React Hot Toast** | Notifications toast fluides et discrètes |

---

## 📁 Architecture du Code (`src/`)

```
src/
├── assets/          # Ressources statiques et médias
├── components/      # Composants partagés et réutilisables
│   ├── Navbar.jsx       # Barre de navigation responsive avec icônes borderless
│   ├── Footer.jsx       # Pied de page avec horaires, adresses et liens
│   ├── CartDrawer.jsx   # Tiroir latéral animé du panier
│   ├── Logo.jsx         # Logo artisanal vectoriel Maison Beldi
│   └── ProtectedRoute.jsx # Gardien de route (Auth & Rôles Admin/Client)
├── context/         # Gestion d'état global (Context API)
│   ├── AuthContext.jsx  # État utilisateur, connexion, déconnexion, rôle
│   └── CartContext.jsx  # Panier persistant (localStorage) et calculs
├── pages/           # Vues principales de l'application
│   ├── Home.jsx         # Page d'accueil avec Hero artisanal
│   ├── Products.jsx     # La Carte avec filtres par catégorie
│   ├── ProductDetails.jsx # Fiche détaillée d'un plat
│   ├── Cart.jsx         # Vue complète du panier
│   ├── Checkout.jsx     # Tunnel de commande et validation
│   ├── Contact.jsx      # Coordonnées, horaires & formulaire de réservation
│   ├── Locations.jsx    # Adresses de nos restaurants
│   ├── Login.jsx        # Connexion utilisateur et administrateur
│   ├── Register.jsx     # Création de compte client
│   ├── UserDashboard.jsx # Espace client personnel
│   └── admin/           # Modules de gestion administration
│       ├── Dashboard.jsx
│       ├── Overview.jsx
│       ├── ManageProducts.jsx
│       ├── ManageCategories.jsx
│       ├── ManageOrders.jsx
│       ├── ManageReservations.jsx
│       └── Customers.jsx
├── services/        # Configuration du client Axios (`api.js`)
├── utils/           # Fonctions utilitaires & résolveur d'images (`dishImages.js`)
├── App.jsx          # Configuration des routes et masquage header/footer
└── index.css        # Design tokens, typographie et classes utilitaires
```

---

## 🚀 Démarrage Rapide

### 1. Installation des dépendances
```bash
npm install
```

### 2. Configuration d'environnement
Créez un fichier `.env` à la racine de `frontend/` (si différent du port par défaut) :
```env
VITE_API_URL=http://127.0.0.1:8000/api
```

### 3. Lancer le serveur de développement
```bash
npm run dev
```
L'application sera accessible sur : **`http://localhost:5173`**

### 4. Compiler pour la production
```bash
npm run build
```
Les fichiers optimisés seront générés dans le dossier `dist/`.

---

## 🔑 Rôles & Accès
Les routes `/admin/*` sont protégées et réservées au compte Administrateur, tandis que `/dashboard/*` est réservé aux clients connectés.
