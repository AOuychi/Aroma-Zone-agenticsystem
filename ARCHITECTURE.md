# 🏗️ Architecture du Projet

## Structure des dossiers

```
agenticsystem/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── assistant/            # API Assistant IA
│   │   └── products/             # API Liste produits
│   ├── products/                 # Pages produits
│   │   ├── page.tsx              # Listing avec filtres
│   │   └── [id]/                 # Détail produit dynamique
│   ├── assistant/                # Page Assistant IA
│   ├── layout.tsx                # Layout global
│   ├── page.tsx                  # Page d'accueil
│   └── globals.css                # Styles globaux
│
├── components/                   # Composants React réutilisables
│   ├── NavbarMegaMenu.tsx        # Navigation avec méga-menu
│   ├── Footer.tsx                # Footer
│   ├── ProductCard.tsx           # Carte produit
│   ├── ProductGrid.tsx           # Grille produits
│   ├── ProductFilters.tsx        # Filtres (client-side)
│   ├── ProductDetails.tsx        # Détails produit
│   └── ChatUI.tsx                # Interface chat IA
│
├── lib/                          # Logique métier
│   ├── loadProducts.ts           # Chargement produits (server-side)
│   └── ai/                       # Système IA
│       ├── productSearch.ts      # Recherche produits
│       └── recommendationAgent.ts # Recommandations
│
├── data/                         # Données
│   └── products.json             # Produits (généré depuis CSV)
│
├── scripts/                      # Scripts utilitaires
│   └── convert-csv-to-json.js    # Conversion CSV → JSON
│
└── utils/                        # Utilitaires
    └── format.ts                 # Formatage (prix, slug, etc.)
```

## Flux de données

### Chargement des produits

1. **Server Components** (page.tsx, products/[id]/page.tsx)
   - Utilisent directement `loadProducts()` qui lit `data/products.json`
   - Pas de fetch nécessaire

2. **Client Components** (products/page.tsx)
   - Utilisent `/api/products` pour charger les produits
   - Permet le filtrage côté client

### Système IA

1. **User** envoie un message via `ChatUI`
2. **POST /api/assistant** reçoit le message
3. **Détection d'intention** :
   - Recherche → `productSearch.ts`
   - Recommandation → `recommendationAgent.ts`
4. **Réponse JSON** avec `answer` et `products[]`
5. **ChatUI** affiche la réponse et les produits

## Technologies

- **Next.js 15** : Framework React avec App Router
- **TypeScript** : Typage statique
- **TailwindCSS** : Styles utilitaires
- **csv-parse** : Parsing CSV

## API Routes

### GET /api/products
Retourne tous les produits en JSON.

### POST /api/assistant
Body: `{ message: string }`
Retourne: `{ answer: string, products: Product[] }`

## Composants clés

### ProductFilters (Client Component)
- Filtres : recherche, catégorie, qualité, prix
- Filtrage en temps réel
- Utilise `useState` et `useEffect`

### ChatUI (Client Component)
- Interface chat complète
- Scroll automatique
- Affichage des produits recommandés
- Appels API vers `/api/assistant`

### NavbarMegaMenu
- Navigation sticky
- Méga-menu au survol
- Responsive

## Évolutions possibles

1. **Base de données** : Remplacer JSON par PostgreSQL/MongoDB
2. **OpenAI** : Intégrer GPT pour réponses plus intelligentes
3. **Agentic System** : Système d'agents multi-étapes
4. **Panier** : Ajouter gestion panier et checkout
5. **Auth** : Authentification utilisateur
6. **Images** : Ajouter vraies images produits

