# Site DTER Production

Site vitrine de DTER Production SRL (Thomas Dubois, production vidéo et photo, Bruxelles). Ce fichier donne le contexte à toute session qui travaille sur ce dépôt.

## L'essentiel

- **Dépôt** : `DTERProduction/dter-site`. Branche de travail : `travail`. Branche en ligne : `main`.
- **Hébergement** : Netlify, déploiement automatique à chaque push sur `main` (réglages dans `netlify.toml`).
- **Publier coûte des crédits Netlify.** Tout le travail se fait sur la branche `travail`, qui ne déclenche aucune mise en ligne. On ne fusionne `travail` dans `main` que lorsque Thomas demande explicitement de publier, en regroupant le plus de changements possible. Ne jamais pousser directement sur `main`.
- **Domaine** : https://dter.eu (domaine principal dans Netlify). L'ancien domaine thomasdubois.pro et l'adresse Netlify `cosmic-dodol-d7bf9f.netlify.app` redirigent vers dter.eu (règles dans `netlify.toml`).
- **Email** : les adresses @dter.eu et @thomasdubois.pro arrivent dans la même boîte Google Workspace (dter.eu est un domaine alias).
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
- **SEO** : chaque page service vise une recherche précise avec « Bruxelles » dans le titre. Les landings (`/lp/`) sont sans menu et exclues de l'indexation. Données structurées : fiche entreprise sur toutes les pages (`Base.astro`), fiche service avec prix sur les pages service, FAQ. Le fichier `/llms.txt`, résumé du site pour les assistants IA, est généré depuis le contenu (`src/pages/llms.txt.ts`).
- **Design** : fond clair `#f8f7f3`, blocs sombres `#141413` pour les moments forts, accent `#ff4a1c`, Inter et IBM Plex Mono, coins arrondis, boutons en pilule.
- **Projets** : chaque projet a une ou plusieurs catégories (`evenement`, `brand-content`, `corporate`, `temoignage`, `social`, `influence`) et peut porter d'autres vidéos dans `videos`, affichées sous la vidéo principale. Un projet sans identifiant Vimeo ou marqué `draft` reste masqué. Les textes des fiches viennent des briefs retrouvés dans les mails de Thomas : ne rien ajouter qui ne soit pas établi, les agences partenaires sont citées dans « Avec », et les retours clients s'affichent avec le nom de la société, jamais celui de la personne.
- **Photo** : la vidéo reste le métier principal. La photo a sa galerie sur fond sombre (`/photo/`), un interrupteur Vidéo / Photo dans l'en-tête et sur la page réalisations, et une bande d'images sur l'accueil. Ces trois accès n'apparaissent que si au moins une série contient des photos. Les images sont optimisées à la construction du site, il faut donc les déposer en bonne qualité dans `src/assets/photos/`.
- **Vidéos** : hébergées sur Vimeo, chargées au clic, avec `dnt=1`. Deux exceptions sur l'accueil : le fond du hero, chargé à l'ouverture, et la vidéo verticale de coulisses de la section studio, chargée en boucle muette quand elle arrive à l'écran.
- **Rideau** : au chargement et à chaque changement de page, deux volets sombres se ferment et s'ouvrent comme une coupe au montage, avec le logo. À la première visite, un compteur de timecode tourne environ une seconde. Tout est dans `motion.ts` (fonctions `openCurtain` et `closeCurtainThen`) et la section « Rideau » de `global.css`.
- **Animations** : toutes désactivées si l'utilisateur a demandé moins d'animations. Tout élément masqué par la règle `.js-motion` de `global.css` doit être révélé par `motion.ts` : soit via le sélecteur `blocks`, soit par une animation dédiée (c'est le cas des `.card`, animées à part). Les courbes sont en entrée et sortie douces (`inOut`).
- **Menu de l'univers photo** : sur `/photo/` et `/services/photographie-corporate/`, le menu devient Galerie, Tarifs et déroulé, Demander un devis.
- **Prise de rendez-vous** : la page contact intègre l'agenda Google (`calendarEmbed` dans `site.json`), chargé seulement au clic sur « Afficher les créneaux ». Les boutons « Réserver un appel » du site mènent à `/contact/#appel`. Si `calendarEmbed` est vide, ils ouvrent le lien `calendar`.
- **Suivi des conversions** : chaque formulaire porte son propre nom (`contact`, `lp-<landing>`) et joint à la demande la page d'envoi et les paramètres d'annonce de l'adresse (`utm_*`, `gclid`, `fbclid`), sans cookie. Après envoi, le visiteur arrive sur `/merci/?demande=<nom du formulaire>`.
- **Vie privée** : aucun cookie publicitaire ni mesure d'audience. Si un pixel ou un outil de statistiques est ajouté, mettre à jour la politique de confidentialité et ajouter un bandeau de consentement.

## Prix d'appel validés (HTVA)

- Vidéo corporate : 2 500 €
- Aftermovie et événement : 1 500 €
- Brand content : 2 400 €
- Photographie corporate : 750 €
- Post-production : 900 €

## Reste à faire

- Retours clients : six citations prêtes dans `docs/retours-clients-en-attente.md`, non affichées en attendant la décision de Thomas.

- Page « À propos » factuelle (année de début, nombre de projets, secteurs, langues) : en attente des informations de Thomas.

- Projets : 24 fiches visibles d'après la liste de Thomas, 5 masquées en attente de leur vidéo sur Vimeo (Mastercard, Mondelez, PIONEERS, PwC Prophix, Nesquik). Fiches encore sans texte : PwC Future of Sales, Pfizer, Cohabs Bota 1, Crodino, Mlle Derrico, Marius Story. Le champ « Avec » cite l'agence partenaire, à la demande de Thomas.
- Ajouter les logos clients et la photo du studio.
- Photo : 26 images en ligne dans cinq séries. Les séries « Conférence internationale » et « Réception officielle » ont un titre provisoire, à remplacer par le vrai nom du projet.
- Connecter le CMS à GitHub (authentification Decap).
- Tester les formulaires et activer les notifications par email dans Netlify.
- Brancher thomasdubois.pro sur Netlify comme second domaine (pour que ses redirections vers dter.eu fonctionnent), puis arrêter Webflow.
- Les conditions générales et la politique de confidentialité n'ont pas été relues par un juriste.
