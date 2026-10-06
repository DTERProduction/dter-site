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
