# 📦 Guide d'Installation - Node.js & npm

## ⚠️ Problème détecté

Node.js et npm ne sont pas installés ou ne sont pas dans votre PATH.

## 🚀 Solution : Installer Node.js

### Option 1 : Installation via le site officiel (Recommandé)

1. **Télécharger Node.js**
   - Allez sur [https://nodejs.org/](https://nodejs.org/)
   - Téléchargez la version **LTS** (Long Term Support)
   - Version recommandée : **Node.js 18.x ou 20.x**

2. **Installer Node.js**
   - Exécutez le fichier d'installation téléchargé
   - Suivez l'assistant d'installation
   - ✅ **Important** : Cochez l'option "Add to PATH" si proposée

3. **Redémarrer PowerShell**
   - Fermez complètement PowerShell
   - Rouvrez PowerShell
   - Ou redémarrez votre ordinateur

4. **Vérifier l'installation**
   ```powershell
   node --version
   npm --version
   ```

### Option 2 : Installation via Chocolatey (si installé)

Si vous avez Chocolatey installé :

```powershell
choco install nodejs-lts
```

### Option 3 : Installation via winget (Windows 10/11)

```powershell
winget install OpenJS.NodeJS.LTS
```

## ✅ Après l'installation

Une fois Node.js installé, vous pourrez :

```powershell
# 1. Installer les dépendances du projet
npm install

# 2. Convertir le CSV en JSON
npm run convert-csv

# 3. Lancer le serveur de développement
npm run dev
```

## 🔍 Vérification du PATH

Si Node.js est installé mais toujours non reconnu :

1. **Vérifier l'installation**
   - Cherchez "Node.js" dans le menu Démarrer
   - Si trouvé, Node.js est installé mais pas dans le PATH

2. **Ajouter Node.js au PATH manuellement**
   - Ouvrez "Variables d'environnement" dans Windows
   - Ajoutez le chemin d'installation de Node.js (généralement `C:\Program Files\nodejs\`)
   - Redémarrez PowerShell

## 📝 Versions requises

- **Node.js** : 18.x ou supérieur
- **npm** : Inclus avec Node.js (généralement 9.x ou supérieur)

## 🆘 Besoin d'aide ?

Si vous rencontrez toujours des problèmes :
1. Vérifiez que Node.js est bien installé : cherchez "Node.js" dans le menu Démarrer
2. Redémarrez complètement votre ordinateur
3. Réessayez dans un nouveau terminal PowerShell

