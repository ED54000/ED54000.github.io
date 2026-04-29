# Portfolio Éloi Duchêne

Portfolio personnel créé pour présenter mon parcours, mes compétences et mes projets.

## 🚀 Déploiement sur GitHub Pages

### Étapes pour déployer :

1. **Créer un nouveau repository sur GitHub**
   - Nom du repository : `votre-username.github.io` (par exemple : `ED54000.github.io`)
   - Public repository
   - Ne pas initialiser avec README

2. **Cloner et pousser le code**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Portfolio website"
   git branch -M main
   git remote add origin https://github.com/votre-username/votre-username.github.io.git
   git push -u origin main
   ```

3. **Activer GitHub Pages**
   - Aller dans Settings > Pages
   - Source : Deploy from a branch
   - Branch : main / (root)
   - Save

4. **Accéder au site**
   - Votre site sera disponible à : `https://votre-username.github.io`
   - Cela peut prendre quelques minutes

## 📁 Structure du projet

```
.
├── index.html          # Page principale
├── style.css           # Styles CSS
├── script.js           # Animations JavaScript
└── README.md          # Ce fichier
```

## 🎨 Fonctionnalités

- ✅ Design éditorial raffiné avec typographie distinctive
- ✅ Animations fluides et micro-interactions
- ✅ Responsive (mobile, tablette, desktop)
- ✅ Barre de progression de scroll
- ✅ Effets de parallaxe
- ✅ Animation de typing pour le statut
- ✅ Easter egg (Konami code) 🎮
- ✅ Texture grain pour effet papier
- ✅ Optimisé pour les performances

## 🛠️ Personnalisation

### Modifier les couleurs
Dans `style.css`, modifier les variables CSS :
```css
:root {
    --color-accent: #c84630;  /* Couleur principale */
    --color-bg: #faf8f5;      /* Couleur de fond */
    /* ... */
}
```

### Ajouter une section
1. Ajouter le HTML dans `index.html`
2. Utiliser les classes existantes pour la cohérence
3. Ajouter l'animation dans `style.css`

## 📱 Compatibilité

- ✅ Chrome, Firefox, Safari, Edge (versions récentes)
- ✅ Mobile iOS et Android
- ✅ Tablettes

## 📝 Licence

© 2025 Éloi Duchêne. Tous droits réservés.

---

**Créé avec passion** ❤️
