# 🚀 Démarrage Rapide

## Installation en 3 étapes

### 1. Installer les dépendances
```bash
npm install
```

### 2. Convertir le CSV en JSON
```bash
npm run convert-csv
```

Cette commande va créer `data/products.json` à partir de `products.csv`.

### 3. Lancer le serveur
```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## ✅ Vérification

Une fois lancé, vous devriez voir :
- ✅ Page d'accueil avec produits
- ✅ Boutique accessible via `/products`
- ✅ Assistant IA accessible via `/assistant`
- ✅ Pages produits détaillées fonctionnelles

## 🐛 Problèmes courants

### Erreur "Cannot find module 'csv-parse'"
```bash
npm install
```

### Erreur "products.json not found"
```bash
npm run convert-csv
```

### Erreur de build TypeScript
Vérifiez que tous les fichiers `.ts` et `.tsx` sont bien présents.

## 📝 Notes

- Le fichier `products.csv` doit être à la racine du projet
- Le dossier `data/` sera créé automatiquement lors de la conversion
- Les produits sont chargés depuis `data/products.json` au runtime

