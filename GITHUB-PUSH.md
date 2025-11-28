# 🚀 Guide pour pousser vers GitHub

## ✅ Étape 1 : Créer un nouveau repository sur GitHub

1. Allez sur [GitHub.com](https://github.com) et connectez-vous
2. Cliquez sur le bouton **"+"** en haut à droite → **"New repository"**
3. Remplissez les informations :
   - **Repository name** : `aroma-zone-like` (ou le nom de votre choix)
   - **Description** : "E-commerce Aroma-Zone like with AI assistant"
   - **Visibility** : Public ou Private (selon votre choix)
   - ⚠️ **NE COCHEZ PAS** "Initialize with README" (on a déjà un README)
4. Cliquez sur **"Create repository"**

## ✅ Étape 2 : Connecter votre repo local à GitHub

Une fois le repository créé, GitHub vous donnera des commandes. Utilisez celles-ci :

```powershell
# Ajouter le remote (remplacez USERNAME par votre nom d'utilisateur GitHub)
git remote add origin https://github.com/USERNAME/aroma-zone-like.git

# Ou si vous utilisez SSH :
# git remote add origin git@github.com:USERNAME/aroma-zone-like.git

# Renommer la branche en 'main' (si nécessaire)
git branch -M main

# Pousser le code vers GitHub
git push -u origin main
```

## 🔐 Si GitHub demande une authentification

### Option 1 : Personal Access Token (Recommandé)
1. Allez dans GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Créez un nouveau token avec les permissions `repo`
3. Utilisez ce token comme mot de passe lors du push

### Option 2 : GitHub CLI
```powershell
# Installer GitHub CLI si pas déjà fait
winget install GitHub.cli

# Se connecter
gh auth login

# Pousser
git push -u origin main
```

## ✅ Étape 3 : Vérifier

Allez sur votre repository GitHub, vous devriez voir tous vos fichiers !

## 📝 Commandes utiles pour la suite

```powershell
# Voir l'état
git status

# Ajouter des modifications
git add .

# Faire un commit
git commit -m "Description des changements"

# Pousser vers GitHub
git push
```

## 🎉 C'est fait !

Votre code est maintenant sur GitHub !

