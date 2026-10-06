# Site DTER Production

Site vitrine en Astro, avec le contenu séparé du code et un CMS (Decap) pour le modifier.

## Démarrer en local

```
npm install
npm run dev
```

Le site s'ouvre sur http://localhost:4321.

Pour tester le CMS en local, lancer `npm run cms` dans un second terminal, puis ouvrir http://localhost:4321/admin/.

## Où se trouve le contenu

| Contenu | Emplacement |
| --- | --- |
| Projets | `src/content/projects/` (un fichier par projet) |
| Pages service | `src/content/services/` |
| Landing pages Ads | `src/content/landings/` |
| Accueil, coordonnées, clients, témoignages | `src/data/` |

Un champ laissé vide n'apparaît pas sur le site : une fiche projet sans objectif ni résultat affiche seulement la vidéo.

## Pages

- `/` accueil
- `/realisations/` et `/realisations/<projet>/`
- `/services/<service>/`
- `/contact/`
- `/lp/<landing>/` : pages pour les campagnes Ads, sans menu et exclues de Google

## Mise en ligne

1. Créer un dépôt GitHub et y pousser ce dossier.
2. Relier le dépôt à Netlify (commande de build `npm run build`, dossier publié `dist`).
3. Le CMS est déjà relié au dépôt `DTERProduction/dter-site` dans `public/admin/config.yml`.
4. Configurer la connexion GitHub du CMS (voir la documentation Decap, section "GitHub backend").
5. Les formulaires utilisent Netlify Forms. Sur un autre hébergeur, adapter `src/components/QuoteForm.astro`.

## À faire avant la bascule depuis Webflow

- Remplacer les vidéos d'exemple par les vidéos définitives.
- Compléter les fiches projet (objectif, réponse, résultat, chiffres).
- Ajouter la photo du studio.
- Rediriger les anciennes adresses Webflow (`/work/...`) vers `/realisations/...`.
- Vérifier le domaine dans `astro.config.mjs`.
