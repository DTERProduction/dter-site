import { getCollection } from 'astro:content';
import { categoriesEn, type Lang } from './i18n';

export const categories: Record<string, string> = {
  evenement: 'Événement',
  'brand-content': 'Brand content',
  corporate: 'Corporate',
  temoignage: 'Témoignages',
  social: 'Réseaux sociaux',
  influence: 'Influence',
};
export const catName = (k: string, lang: Lang = 'fr') => (lang === 'en' ? categoriesEn[k] : categories[k]) || photoCategories[k] || k;
export const catLabel = (list: string[], lang: Lang = 'fr') => list.map((k) => catName(k, lang)).join(' · ');

export async function getProjects() {
  const all = await getCollection('projects', ({ data }) => !data.draft && !!data.vimeoId);
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function getServices() {
  const all = await getCollection('services');
  return all.sort((a, b) => a.data.order - b.data.order);
}

export const photoCategories: Record<string, string> = {
  evenement: 'Événement',
  'brand-content': 'Brand content',
  corporate: 'Corporate',
  business: 'Entreprise',
  event: 'Événement',
  sport: 'Sport',
  portrait: 'Portrait',
  mode: 'Mode',
};

// Séries photo qui contiennent au moins une image. Tant qu'il n'y en a aucune, la galerie et ses accès restent masqués.
export async function getPhotoSeries() {
  const all = await getCollection('photos', ({ data }) => data.photos.length > 0);
  return all.sort((a, b) => a.data.order - b.data.order);
}
