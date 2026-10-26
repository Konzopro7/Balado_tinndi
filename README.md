# Balado Tinndi

Première version du site de Balado Tinndi, construite avec React, TypeScript et Vite. Toutes les pages sont navigables directement et les routes internes fonctionnent au rechargement avec le serveur Vite.

## Lancer la prévisualisation

```bash
npm install
npm run dev
```

Vite affiche l’adresse locale de prévisualisation (habituellement `http://localhost:5173`). Pour générer le site statique :

```bash
npm run build
npm run preview
```

## Déploiement GitHub Pages

Le workflow `.github/workflows/deploy-pages.yml` compile le site et déploie le contenu de `dist`. Dans les paramètres du dépôt, la source GitHub Pages doit être réglée sur **GitHub Actions**. Le workflow construit avec `VITE_BASE_PATH=/Balado_tinndi/`, le chemin du dépôt public. Il génère aussi `dist/404.html` afin que les pages internes restent accessibles lors d’un rechargement direct.

## Mettre à jour le contenu

- Les épisodes, coordonnées, liens sociaux et textes provisoires du concept se trouvent dans `src/data/site.ts`.
- Remplacez les images dans `public/images/`. Le logo vertical fourni a été recadré dans une copie d’affichage afin d’enlever la date; les originaux restent dans le dossier média du projet.
- Les liens vidéo sont facultatifs (`videoUrl`) dans les données d’épisodes. Le lecteur ne s’ouvre et ne charge une vidéo qu’après action explicite. Les fichiers vidéo présents dans le dossier média source ne sont pas copiés au site : fournissez une URL de diffusion validée avant de les rendre accessibles.
- La biographie de Safietou, son portrait individuel, la biographie d’Hadjira, les dates et durées des épisodes, les liens sociaux et les contenus de la rubrique Expressions en pulaar restent à fournir.
- Les textes de vision, valeurs et sujets dans `site.ts` sont des propositions provisoires à faire valider.

## Formulaire

Sans configuration, les formulaires valident les champs puis ouvrent un brouillon `mailto:` adressé à `tinndi17@outlook.com`. Le site n’affirme pas que le message a été envoyé. Pour le formulaire de contact, configurez `VITE_CONTACT_ENDPOINT` dans `.env.local` avec un service qui accepte une requête JSON contenant `name`, `organization`, `email`, `type` et `message`. Pour les inscriptions à l’infolettre, configurez `VITE_NEWSLETTER_ENDPOINT` avec un service qui accepte `{ "email": "..." }`. Les deux services doivent traiter les erreurs avec des codes HTTP appropriés et appliquer leurs protections anti-abus.

## À compléter avant publication

Confirmer les textes provisoires; fournir les biographies, portrait de Safietou en haute résolution, images et résumés éditoriaux; confirmer les liens de diffusion et les catégories de vidéos; fournir les liens sociaux et, si souhaité, un dossier média. Le domaine `baladotinndi.com` n’est pas présumé réservé ni configuré.
