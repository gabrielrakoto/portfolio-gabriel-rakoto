# PROJET

**Date** : 2026-08-05

## Prompt initial

peut-u créer un repo git hub pour ce portofolio je m'occupe de le publier sur vercel. Et est que c'est grave si je le publie sur vercel et que apres je le publie sur mon vps hostinger avec un vrai nom de domaine acheté?

## Décisions importantes

- Repo GitHub créé : `portfolio-gabriel-rakoto`, public.
- Déploiement initial prévu sur Vercel (géré par Gabriel) ; migration possible plus tard vers un VPS Hostinger avec nom de domaine propre — simple changement DNS, aucun risque.
- Le premier `index.html` déployé était un export cassé d'un outil de design propriétaire (balises `<x-dc>`, syntaxe `{{ t.xxx }}` non interprétable par un navigateur) — affichait du texte brut non résolu en prod. Site entièrement reconstruit en HTML/CSS/JS vanilla statique fidèle au design d'origine (contenu, couleurs, typographie Syne/DM Sans, animations scroll-driven, scène 3D three.js du hero).
- Formulaire de contact : reproduit à l'identique du prototype (affiche un état "envoyé" en JS, sans envoi réseau réel pour l'instant — à brancher plus tard sur un vrai service).
- Images orphelines (`delice-de-manille.png`, `jmc-mecanique.png`) conservées dans `assets/` sans être utilisées (aucun projet correspondant affiché).
- Poids des images projets (~1-2.8 Mo chacune) non optimisé pour l'instant — à convertir en WebP avant mise en prod pour un meilleur score de performance/SEO.
- Mise en conformité Loi 25 (2026-08-31) : page "Politique de confidentialité" ajoutée (`page-privacy`, contenu bilingue dans `js/data.js`, RPRP = Gabriel Rakoto), lien dans le footer sur toutes les pages, case de consentement obligatoire sur le formulaire de contact. Aucune bannière de cookies nécessaire : le site n'utilise ni cookie ni analytics, seulement `localStorage` pour la préférence de langue (usage fonctionnel exempté). Français déjà confirmé comme langue par défaut (Loi 96), aucun changement requis.
- Audit SEO (2026-09-02) : score de gravité global 7/10 avant correctifs. Deux points critiques identifiés — (1) le site était une SPA à URL unique (toutes les "pages" étaient des sections `display:none` togglées en JS, donc impossibles à indexer/partager séparément), (2) le contenu texte dépendait entièrement du JS pour s'afficher (spans vides remplis via `data-i18n`), avec un risque réel sur les aperçus de partage (réseaux sociaux) qui n'exécutent pas de JS.
- Correction des points critiques : le site est passé d'une SPA à une **vraie architecture multi-pages** — `index.html` (accueil), `projets.html`, `services.html`, `contact.html`, `confidentialite.html` — chacune avec sa propre URL, son `<title>` et sa `<meta description>` uniques, et une balise `<link rel="canonical">` (URL de prod : `https://portfolio-gabriel-rakoto.vercel.app/`). Le hack `display:none`/`is-active` a été retiré de `css/style.css` ; la navigation JS (`setPage`, `wireNavigation`) a été supprimée de `js/main.js` au profit de vrais liens `<a href>`. Testé en local (5 pages, aucune erreur console, navigation et animations scroll-stack fonctionnelles).
- Points restants (🟠/🟡, non critiques) identifiés par l'audit mais pas encore corrigés : balises Open Graph/Twitter Card absentes, pas de JSON-LD `LocalBusiness`, pas de `robots.txt`/`sitemap.xml`, images de projets sans `alt` descriptif, images orphelines non converties en WebP, pas de `<noscript>` de secours.

## Stack choisie

HTML/CSS/JS vanilla statique — aucun framework, aucun build. Architecture **multi-pages** (une URL réelle par page) : `index.html` (accueil), `projets.html`, `services.html`, `contact.html`, `confidentialite.html`. Fichiers partagés : `css/style.css`, `js/data.js` (données + i18n FR/EN), `js/three-scene.js` (scène 3D hero, chargée uniquement sur `index.html`), `js/main.js` (i18n, animations, formulaire — plus de routage JS). Déployable tel quel sur Vercel, compatible migration future vers un VPS Hostinger.