# 🔧 Configuration du PATH pour Node.js

Node.js est installé dans `D:\node` mais n'est pas dans votre PATH système.

## ✅ Solution temporaire (session actuelle)

Dans votre PowerShell actuel, Node.js et npm fonctionnent déjà grâce à :
```powershell
$env:PATH += ";D:\node"
```

## 🔄 Solution permanente (recommandée)

Pour que Node.js soit disponible dans tous les terminaux :

### Option 1 : Via l'interface Windows (Recommandé)

1. **Ouvrir les Variables d'environnement**
   - Appuyez sur `Windows + R`
   - Tapez `sysdm.cpl` et appuyez sur Entrée
   - Cliquez sur l'onglet **"Avancé"**
   - Cliquez sur **"Variables d'environnement"**

2. **Ajouter au PATH utilisateur**
   - Dans "Variables utilisateur", trouvez **"Path"**
   - Cliquez sur **"Modifier"**
   - Cliquez sur **"Nouveau"**
   - Ajoutez : `D:\node`
   - Cliquez sur **"OK"** partout

3. **Redémarrer PowerShell**
   - Fermez complètement PowerShell
   - Rouvrez PowerShell
   - Testez : `node --version`

### Option 2 : Via PowerShell (Administrateur)

```powershell
# Exécuter PowerShell en tant qu'administrateur
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";D:\node", [EnvironmentVariableTarget]::User)
```

Puis redémarrer PowerShell.

## 🚀 Après configuration du PATH

Une fois le PATH configuré, vous pourrez utiliser :

```powershell
# Installer les dépendances
npm install

# Convertir le CSV en JSON
npm run convert-csv

# Lancer le projet
npm run dev
```

## ⚡ Solution rapide pour cette session

Si vous voulez juste continuer maintenant sans modifier le PATH :

```powershell
# Ajouter au PATH de cette session
$env:PATH += ";D:\node"

# Puis installer les dépendances
npm install
```

