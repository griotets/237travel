# EnjoyTravel - Plateforme de Voyage Cameroun

Une application React moderne pour la recherche et la réservation de voyages en bus et train à travers le Cameroun.

## 🚀 Caractéristiques

- **Design Futuriste** : Interface moderne avec animations fluides
- **Couleurs Thématiques** : Lavande (principal) et Orange (secondaire)
- **Responsive** : Optimisé pour tous les appareils
- **Recherche Avancée** : Filtres et tri des résultats
- **Panier Intégré** : Système de réservation complet
- **Authentification** : Système de connexion/inscription
- **Paiements Locaux** : MTN Mobile Money et Orange Money
- **Focus Cameroun** : Toutes les destinations camerounaises

## 🛠️ Technologies

- **React 18** avec Vite
- **Tailwind CSS** pour le styling
- **Framer Motion** pour les animations
- **React Router** pour la navigation
- **Lucide React** pour les icônes
- **Date-fns** pour la gestion des dates

## 📦 Installation

1. **Installer les dépendances**
   ```bash
   npm install
   ```

2. **Démarrer le serveur de développement**
   ```bash
   npm run dev
   ```

3. **Accéder à l'application**
   L'application sera disponible sur `http://localhost:8080`

## 🏗️ Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── Navbar.jsx      # Navigation principale
│   ├── Footer.jsx      # Pied de page
│   ├── AuthModal.jsx   # Modal de connexion/inscription
│   ├── CartSlider.jsx  # Panier latéral
│   └── ...
├── pages/              # Pages principales
│   ├── Home.jsx        # Page d'accueil
│   ├── SearchResults.jsx # Résultats de recherche
│   └── ...
├── contexts/           # Contextes React
│   ├── AuthContext.jsx # Gestion de l'authentification
│   └── CartContext.jsx # Gestion du panier
└── index.css          # Styles globaux Tailwind
```

## 🎨 Palette de Couleurs

- **Lavande (Principal)** : #7c3aed (primary-600)
- **Orange (Secondaire)** : #f97316 (secondary-500)
- **Accent Vert** : #22c55e (accent-500)

## 🌍 Destinations Couvertes

L'application couvre toutes les régions du Cameroun :
- Centre (Yaoundé)
- Littoral (Douala)
- Ouest (Bafoussam, Dschang)
- Nord-Ouest (Bamenda)
- Sud-Ouest (Buea, Limbe)
- Nord (Garoua)
- Extrême-Nord (Maroua)
- Adamaoua (Ngaoundéré)
- Sud (Ebolowa)
- Est (Bertoua)

## 💳 Méthodes de Paiement

- MTN Mobile Money
- Orange Money

## 🚌 Types de Transport

- Bus Standard
- Bus VIP
- Bus Luxe
- Train (à venir)

## 📱 Fonctionnalités

### Pour les Voyageurs
- Recherche de voyages par ville et date
- Comparaison des prix et horaires
- Réservation en ligne
- Paiement mobile sécurisé
- E-tickets avec QR codes
- Historique des voyages

### Pour les Agences
- Tableau de bord administrateur
- Gestion des horaires et prix
- Suivi des réservations
- Statistiques de vente

## 🔧 Scripts Disponibles

- `npm run dev` - Démarre le serveur de développement
- `npm run build` - Crée la version de production
- `npm run preview` - Prévisualise la version de production
- `npm run lint` - Vérifie la qualité du code

## 🚀 Déploiement

1. **Build de production**
   ```bash
   npm run build
   ```

2. **Les fichiers générés seront dans le dossier `dist/`**

## 📧 Contact

Pour toute question ou suggestion :
- Email : contact@enjoytravel.cm
- Téléphone : +237 6XX XXX XXX

## 📄 Licence

Ce projet est sous licence MIT.
