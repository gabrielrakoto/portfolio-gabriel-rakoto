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

## Stack choisie

HTML/CSS/JS vanilla statique — aucun framework, aucun build. Fichiers : `index.html`, `css/style.css`, `js/data.js` (données + i18n FR/EN), `js/three-scene.js` (scène 3D hero), `js/main.js` (état, navigation, i18n, animations). Déployable tel quel sur Vercel, compatible migration future vers un VPS Hostinger.