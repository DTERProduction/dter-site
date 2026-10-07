import type { APIRoute } from 'astro';
import site from '../data/site.json';
import home from '../data/home.json';
import { getServices } from '../lib/site';

// Résumé du site pour les assistants IA. Généré à partir du contenu : rien à tenir à jour à la main.
export const GET: APIRoute = async ({ site: base }) => {
  const u = (p: string) => new URL(p, base).href;
  const services = await getServices();
  const lines = [
    '# DTER Production',
    '',
    `> ${site.baseline}. ${site.legalName}, dirigée par Thomas Dubois. Production vidéo et photo pour les équipes marketing et communication, en direct avec les marques.`,
    '',
    'Positionnement : pensé comme du marketing, tourné comme du cinéma. Un seul interlocuteur du brief à la livraison.',
    '',
    '## Services et prix de départ (hors TVA)',
    ...services.map((s) => `- [${s.data.name}](${u(`/services/${s.id}/`)}) : ${s.data.short}${s.data.priceFrom ? ` À partir de ${s.data.priceFrom}.` : ''}`),
    '',
    '## Pages utiles',
    `- [Réalisations](${u('/realisations/')}) : projets vidéo par type`,
    `- [Photo](${u('/photo/')}) : galerie photo corporate et événement`,
    `- [Contact et devis](${u('/contact/')}) : formulaire de devis et prise de rendez-vous pour un appel de 20 minutes`,
    `- [Conditions générales de vente](${u(site.legal)})`,
    '',
    '## Questions fréquentes',
    ...(home.faq ?? []).flatMap((f: { q: string; a: string }) => [`### ${f.q}`, f.a, '']),
    '## Contact',
    `- Email : ${site.email}`,
    `- Téléphone : ${site.phone}`,
    '- Siège : Zuidlaan 14, 1560 Hoeilaart, Belgique. Zone couverte : Bruxelles et toute la Belgique.',
    `- Instagram : ${site.instagram}`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
