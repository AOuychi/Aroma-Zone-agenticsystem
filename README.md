# 🌿 Aroma-Zone Like - Site E-commerce avec Assistant IA

Site e-commerce complet inspiré d'Aroma-Zone, construit avec Next.js 15, TypeScript, TailwindCSS et un système d'IA pour les recommandations de produits.

## ✨ Fonctionnalités

- 🏠 **Page d'accueil** moderne avec hero section, catégories et produits populaires
- 🛍️ **Boutique complète** avec filtres avancés (catégorie, qualité, prix, recherche)
- 📦 **Pages produits détaillées** avec descriptions complètes
- 🤖 **Assistant IA** pour recommandations personnalisées et recherche intelligente
- 🎨 **Design minimaliste** inspiré d'Aroma-Zone (couleurs vert pastel, beige, blanc)
- 📱 **Responsive** et optimisé pour tous les écrans

## 🚀 Installation

### Prérequis

- Node.js 18+ 
- npm ou yarn

### Étapes

1. **Cloner ou télécharger le projet**

```bash
cd agenticsystem
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Convertir le CSV en JSON**

```bash
npm run convert-csv
```

Cette commande va :
- Lire `products.csv`
- Convertir en JSON propre
- Sauvegarder dans `data/products.json`

4. **Lancer le serveur de développement**

```bash
npm run dev
```

5. **Ouvrir dans le navigateur**

```
http://localhost:3000
```

## 📁 Structure du projet

```
agenticsystem/
├── app/
│   ├── api/
│   │   └── assistant/
│   │       └── route.ts          # API du chatbot IA
│   ├── products/
│   │   ├── page.tsx              # Page boutique (listing)
│   │   └── [id]/
│   │       └── page.tsx          # Page détail produit
│   ├── assistant/
│   │   └── page.tsx              # Page assistant IA
│   ├── layout.tsx                # Layout principal
│   ├── page.tsx                  # Page d'accueil
│   ├── globals.css                # Styles globaux
│   └── not-found.tsx             # Page 404
├── components/
│   ├── NavbarMegaMenu.tsx        # Navigation avec méga-menu
│   ├── Footer.tsx                 # Footer
│   ├── ProductCard.tsx            # Carte produit
│   ├── ProductGrid.tsx            # Grille de produits
│   ├── ProductFilters.tsx         # Filtres produits
│   ├── ProductDetails.tsx         # Détails produit
│   └── ChatUI.tsx                 # Interface chat IA
├── lib/
│   ├── loadProducts.ts            # Chargement produits
│   └── ai/
│       ├── productSearch.ts       # Recherche produits
│       └── recommendationAgent.ts # Agent de recommandation
├── data/
│   └── products.json              # Produits (généré depuis CSV)
├── scripts/
│   └── convert-csv-to-json.js    # Script conversion CSV → JSON
├── utils/
│   └── format.ts                  # Utilitaires formatage
└── products.csv                   # Fichier CSV source
```

## 🎨 Design & Couleurs

Le design utilise la palette Aroma-Zone :

- **Vert pastel** : `#e8f5e9` (aroma-green-light)
- **Vert foncé** : `#6c8f6a` (aroma-green)
- **Beige** : `#f4f1ea` (aroma-beige)
- **Blanc** : `#ffffff` (aroma-white)

## 🤖 Système IA

### Fonctionnalités

1. **Recherche de produits** (`productSearch.ts`)
   - Recherche par nom
   - Recherche par mots-clés dans descriptions
   - Recherche par catégorie
   - Score de pertinence

2. **Recommandations** (`recommendationAgent.ts`)
   - Mapping intelligent des besoins utilisateur
   - Détection automatique : "peau sèche", "cheveux gras", "acné", etc.
   - Score de pertinence basé sur les descriptions produits

3. **API Assistant** (`/api/assistant`)
   - Détection d'intention (recherche vs recommandation)
   - Réponses contextuelles
   - Retour JSON avec produits recommandés

### Exemples de questions

- "Je cherche une crème hydratante"
- "J'ai la peau sèche, que me conseillez-vous ?"
- "Produit pour cheveux gras"
- "Recommandez-moi quelque chose pour l'acné"
- "J'ai besoin d'aide pour le stress"

## 📝 Format CSV

Le fichier `products.csv` doit contenir les colonnes suivantes :

- `product_category_lvl1`, `product_category_lvl2`, `product_category_lvl3`
- `product_name`
- `product_short_description`, `product_long_description`
- `product_quality_lvl1`, `product_quality_lvl2`, `product_quality_lvl3`
- `price`
- `available_quantity`

## 🔧 Scripts disponibles

```bash
# Développement
npm run dev

# Build production
npm run build

# Démarrer production
npm start

# Convertir CSV → JSON
npm run convert-csv

# Linter
npm run lint
```

## 🚀 Déploiement

### Vercel (recommandé)

1. Push sur GitHub
2. Importer le projet sur Vercel
3. Vercel détectera automatiquement Next.js
4. Le build fonctionnera automatiquement

### Autres plateformes

Le projet est compatible avec toute plateforme supportant Next.js :
- Netlify
- AWS Amplify
- Railway
- etc.

## 🔮 Évolutions futures

Le système est prévu pour être connecté à :
- **OpenAI API** pour des réponses plus intelligentes
- **Agentic System** pour des recommandations avancées
- **Base de données** (PostgreSQL, MongoDB) pour remplacer le JSON
- **Système de panier** et checkout
- **Authentification utilisateur**

## 📄 Licence

Ce projet est un exemple éducatif.

## 👤 Support

Pour toute question ou problème, ouvrez une issue sur GitHub.

---

**Bon développement ! 🌿**

