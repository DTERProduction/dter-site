# Site DTER Production

Site vitrine de DTER Production SRL (Thomas Dubois, production vidéo et photo, Bruxelles). Ce fichier donne le contexte à toute session qui travaille sur ce dépôt.

## L'essentiel

- **Dépôt** : `DTERProduction/dter-site`, branche `main`.
- **Hébergement** : Netlify, déploiement automatique à chaque push sur `main` (réglages dans `netlify.toml`).
- **Adresse provisoire** : https://cosmic-dodol-d7bf9f.netlify.app
- **Domaine final** : thomasdubois.pro (encore sur Webflow, bascule à faire).
- **Pile technique** : Astro (site statique), GSAP + ScrollTrigger + SplitText et Lenis pour les animations, Decap CMS pour le contenu, Netlify Forms pour les formulaires.

## Commandes

```
npm install
npm run dev      # http://localhost:4321
npm run build    # doit passer sans erreur avant tout push
npm run cms      # CMS en local, avec npm run dev dans un autre terminal
```

## Où se trouve quoi

| Élément | Emplacement |
| --- | --- |
| Projets (un fichier par projet) | `src/content/projects/*.md` |
| Pages service | `src/content/services/*.yml` |
| Landing pages Ads | `src/content/landings/*.yml` |
| Pages de texte (CGV, confidentialité) | `src/content/pages/*.md` |
| Séries photo (une série par fichier) | `src/content/photos/*.yml`, images dans `src/assets/photos/` |
| Accueil, coordonnées, clients, témoignages | `src/data/*.json` |
| Schéma du contenu | `src/content.config.ts` |
| Pages | `src/pages/` |
| Styles (un seul fichier, variables en tête) | `src/styles/global.css` |
| Animations (un seul fichier) | `src/scripts/motion.ts` |
| Configuration du CMS | `public/admin/config.yml` |

Tout champ ajouté au schéma doit aussi être ajouté dans `public/admin/config.yml`, sinon il n'est pas modifiable dans le CMS.

## Règles du site

- **Langue** : français uniquement pour l'instant. Pas de version anglaise.
- **Ton** : direct, concret, sans jargon. Pas de tiret cadratin dans les textes.
- **Un champ vide ne s'affiche pas** : ne jamais mettre de texte de remplissage ni de chiffre inventé.
- **Positionnement** : « Pensé comme du marketing. Tourné comme du cinéma. » Cible : clients directs (responsables marketing et communication), pas les agences. Trois promesses : pensé pour performer, livré vite sans surprise, un seul interlocuteur.
- **SEO** : chaque page service vise une recherche précise avec « Bruxelles » dans le titre. Les landings (`/lp/`) sont sans menu et exclues de l'indexation.
- **Design** : fond clair `#f8f7f3`, blocs sombres `#141413` pour les moments forts, accent `#ff4a1c`, Inter et IBM Plex Mono, coins arrondis, boutons en pilule.
- **Photo** : la vidéo reste le métier principal. La photo a sa galerie sur fond sombre (`/photo/`), un interrupteur Vidéo / Photo dans l'en-tête et sur la page réalisations, et une bande d'images sur l'accueil. Ces trois accès n'apparaissent que si au moins une série contient des photos. Les images sont optimisées à la construction du site, il faut donc les déposer en bonne qualité dans `src/assets/photos/`.
- **Vidéos** : hébergées sur Vimeo, chargées au clic (sauf le fond du hero), avec `dnt=1`.
- **Animations** : toutes désactivées si l'utilisateur a demandé moins d'animations. Les éléments animés sont listés à deux endroits qui doivent rester identiques : le sélecteur `blocks` dans `motion.ts` et la règle `.js-motion` dans `global.css`.
- **Vie privée** : aucun cookie publicitaire ni mesure d'audience. Si un pixel ou un outil de statistiques est ajouté, mettre à jour la politique de confidentialité et ajouter un bandeau de consentement.

## Prix d'appel validés (HTVA)

- Vidéo corporate : 2 500 €
- Aftermovie et événement : 1 500 €
- Brand content : 2 400 €
- Photographie corporate : 750 €
- Post-production : 900 €

## Reste à faire

- Remplacer les 12 vidéos d'exemple par les vidéos définitives, avec de vraies vignettes.
- Compléter les fiches projet : objectif, réponse, résultat, chiffres.
- Ajouter les logos clients et la photo du studio.
- Remplir les séries photo (six séries vides créées d'après la galerie Pic-Time de Thomas).
- Connecter le CMS à GitHub (authentification Decap).
- Tester les formulaires et activer les notifications par email dans Netlify.
- Basculer le domaine, rediriger les anciennes adresses Webflow (`/work/...` vers `/realisations/...`), puis arrêter Webflow.
- Les conditions générales et la politique de confidentialité n'ont pas été relues par un juriste.
