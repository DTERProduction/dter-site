import { getCollection } from 'astro:content';

export const categories: Record<string, string> = {
  aftermovie: 'Aftermovie',
  'brand-content': 'Brand content',
  interview: 'Interviews',
  corporate: 'Corporate',
  social: 'Réseaux sociaux',
};

export async function getProjects() {
  const all = await getCollection('projects', ({ data }) => !data.draft);
  return all.sort((a, b) => a.data.order - b.data.order);
}

export async function getServices() {
  const all = await getCollection('services');
  return all.sort((a, b) => a.data.order - b.data.order);
}

export const photoCategories: Record<string, string> = {
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
