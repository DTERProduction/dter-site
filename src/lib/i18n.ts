// Deux langues : le français à la racine du site, l'anglais sous /en/.
// Les textes d'interface sont ici. Les contenus (projets, services, landings, accueil) portent leur traduction dans un bloc « en ».
export type Lang = 'fr' | 'en';

export const langOf = (url: URL): Lang => (url.pathname === '/en' || url.pathname.startsWith('/en/') ? 'en' : 'fr');

// Adresses anglaises des pages service et des landings.
export const serviceEn: Record<string, string> = {
  'video-corporate': 'corporate-video',
  'aftermovie-evenement': 'event-aftermovie',
  'brand-content': 'brand-content',
  'photographie-corporate': 'corporate-photography',
  'post-production': 'post-production',
};
export const landingEn: Record<string, string> = {
  'aftermovie-evenement': 'event-aftermovie',
  'video-corporate': 'corporate-video',
};
const flip = (m: Record<string, string>) => Object.fromEntries(Object.entries(m).map(([k, v]) => [v, k]));

/** Transforme une adresse française en son équivalent dans la langue demandée. */
export function link(lang: Lang, p: string): string {
  if (lang === 'fr' || !p.startsWith('/')) return p;
  if (p.startsWith('/conditions-generales') || p.startsWith('/politique-de-confidentialite')) return p; // pages légales : français uniquement
  const q = p
    .replace(/^\/realisations\//, '/work/')
    .replace(/^\/merci\//, '/thank-you/')
    .replace(/^\/services\/([^/]+)\//, (_m, id) => `/services/${serviceEn[id] || id}/`)
    .replace(/^\/lp\/([^/]+)\//, (_m, id) => `/lp/${landingEn[id] || id}/`);
  return `/en${q}`;
}

/** Adresse de la même page dans l'autre langue, pour le sélecteur FR / EN et pour Google. */
export function counterpart(pathname: string): { fr: string; en: string } {
  if (langOf(new URL(pathname, 'https://x')) === 'en') {
    const s = flip(serviceEn), l = flip(landingEn);
    const fr = (pathname.replace(/^\/en/, '') || '/')
      .replace(/^\/work\//, '/realisations/')
      .replace(/^\/thank-you\//, '/merci/')
      .replace(/^\/services\/([^/]+)\//, (_m, id) => `/services/${s[id] || id}/`)
      .replace(/^\/lp\/([^/]+)\//, (_m, id) => `/lp/${l[id] || id}/`);
    return { fr, en: pathname };
  }
  return { fr: pathname, en: link('en', pathname) };
}

/** Contenu dans la langue demandée : le bloc « en » remplace les champs français quand il est rempli. */
export function loc<T extends Record<string, any>>(data: T, lang: Lang): T {
  if (lang !== 'en' || !data?.en) return data;
  const en = Object.fromEntries(Object.entries(data.en).filter(([, v]) => v !== '' && v != null && !(Array.isArray(v) && v.length === 0)));
  return { ...data, ...en };
}

const ui = {
  fr: {
    'nav.main': 'Navigation principale', 'nav.photo': 'Navigation photo', 'nav.projects': 'Projets', 'nav.services': 'Services', 'nav.method': 'Méthode', 'nav.faq': 'FAQ',
    'nav.quote': 'Demander un devis', 'nav.getQuote': 'Recevoir un devis', 'nav.gallery': 'Galerie', 'nav.pricing': 'Tarifs et déroulé', 'nav.home': 'DTER, accueil', 'nav.lang': 'Langue', 'nav.menu': 'Menu', 'nav.close': 'Fermer', 'nav.contact': 'Contact',
    'switch.label': 'Vidéo ou photo', 'switch.video': 'Vidéo', 'switch.photo': 'Photo',
    'footer.links': 'Liens de pied de page', 'footer.terms': 'Conditions générales', 'footer.privacy': 'Confidentialité', 'footer.city': 'Bruxelles',
    'cta.call': 'Réserver un appel',
    'home.scroll': 'Défiler ↓', 'home.talk': 'Parler à Thomas', 'home.slot': 'Choisir un créneau', 'home.founder': 'Fondateur de DTER · appel de 20 min',
    'home.brands': 'Marques', 'home.why': 'Pourquoi DTER', 'home.allProjects': 'Tous les projets', 'home.testimonials': 'Témoignages', 'home.method': 'Méthode',
    'home.studio': 'Le studio', 'home.meet': 'Faire connaissance →', 'home.move': 'Bougez la souris', 'home.withSound': 'avec le son', 'home.bts': "Coulisses d'un tournage DTER",
    'band.title': 'Et quand il faut des images fixes, on les fait aussi.', 'band.cta': 'Voir la photo',
    'form.deadline': 'Échéance souhaitée', 'form.message': 'Votre projet en quelques lignes', 'form.send': 'Envoyer ma demande', 'form.free': 'Gratuit et sans engagement.',
    'form.name': 'Nom et prénom', 'form.company': 'Société', 'form.email': 'Email professionnel', 'form.phone': 'Téléphone', 'form.type': 'Type de projet',
    'form.t1': 'Vidéo corporate', 'form.t2': 'Aftermovie, événement', 'form.t3': 'Brand content, réseaux sociaux', 'form.t4': 'Photographie', 'form.t5': 'Post-production seule', 'form.t6': 'Autre',
    'form.personal': 'Réponse de Thomas, fondateur de DTER, en personne. ', 'form.data': 'Vos données servent uniquement à vous répondre.', 'form.policy': 'Politique de confidentialité',
    'form.subject': 'Demande de devis', 'form.getMine': 'Recevoir mon devis',
    'contact.seoTitle': 'Contact et devis · DTER Production, Bruxelles', 'contact.seoDesc': 'Demandez un devis pour votre vidéo corporate, aftermovie, brand content ou shooting photo. Thomas vous répond en personne.',
    'contact.title': 'Parlons de votre projet.', 'contact.lead': 'Décrivez votre besoin en quelques lignes. Thomas vous répond en personne, avec un devis clair et un délai.',
    'contact.phone': 'Téléphone', 'contact.whatsapp': 'Écrire sur WhatsApp', 'contact.call': 'Appel de 20 min', 'contact.place': 'Bruxelles, Belgique', 'contact.formTitle': 'Demander un devis',
    'book.eyebrow': 'Appel découverte', 'book.title': '20 minutes pour cadrer votre projet.', 'book.p1': 'Vous choisissez un créneau, la confirmation arrive par email.', 'book.p2': 'On parle objectif, public, délai et budget.',
    'book.p3': 'Vous recevez un devis clair dans la foulée.', 'book.note': 'Gratuit et sans engagement. En visio ou par téléphone.', 'book.agenda': 'Agenda de Thomas', 'book.show': 'Afficher les créneaux',
    'book.newTab': 'Ouvrir dans un nouvel onglet', 'book.google': 'Le calendrier est fourni par Google et se charge à votre demande.', 'book.frame': 'Choisir un créneau pour un appel avec Thomas',
    'thanks.seoTitle': 'Merci · DTER Production', 'thanks.eyebrow': 'Demande envoyée', 'thanks.title': "Merci, c'est bien reçu.", 'thanks.lead': 'Thomas revient vers vous rapidement avec un devis clair et un délai.', 'thanks.cta': 'Voir nos réalisations',
    '404.seoTitle': 'Page introuvable · DTER Production', '404.eyebrow': 'Erreur 404', '404.title': "Cette page n'existe pas.", '404.cta': "Retour à l'accueil",
    'photo.seoTitle': 'Photographie corporate et événementielle à Bruxelles · DTER', 'photo.seoDesc': "Portraits, reportages d'entreprise et photos d'événement réalisés par DTER Production, à Bruxelles et en Belgique.",
    'photo.title': 'La photo, avec le même regard.', 'photo.lead': "Portraits, reportages d'entreprise et événements. Des images cohérentes avec vos films, souvent réalisées le même jour, par la même équipe.",
    'photo.filter': 'Filtrer par type de photo', 'photo.all': 'Toutes', 'photo.gallery': 'Galerie photo', 'photo.zoom': 'Agrandir la photo', 'photo.soon': 'La galerie arrive bientôt.',
    'photo.cta': 'Vidéo et photo, le même jour.', 'photo.pricing': 'Tarifs et déroulé →', 'lb.label': 'Photo agrandie', 'lb.close': 'Fermer', 'lb.prev': 'Photo précédente', 'lb.next': 'Photo suivante',
    'lp.example': 'Exemple de réalisation', 'lp.or': 'ou',
    'project.back': '← Toutes les réalisations', 'project.more': 'Autres vidéos du projet', 'project.sheet': 'Fiche du projet', 'project.client': 'Client', 'project.format': 'Format', 'project.with': 'Avec',
    'project.year': 'Année', 'project.delivered': 'Livré en', 'project.goal': "L'objectif", 'project.answer': 'Notre réponse', 'project.result': 'Le résultat', 'project.next': 'Projet suivant',
    'project.cta': 'Un projet du même type ?', 'project.desc': 'réalisé par DTER Production à Bruxelles.',
    'work.seoTitle': 'Réalisations vidéo et photo · DTER Production, Bruxelles', 'work.seoDesc': 'Aftermovies, brand content, interviews et films corporate réalisés par DTER pour des marques belges et internationales.',
    'work.eyebrow': 'Réalisations', 'work.title': 'Nos réalisations vidéo et photo', 'work.lead': "Événements, brand content, films corporate, témoignages et formats réseaux sociaux, pour des marques belges et internationales. Chaque projet part d'un objectif.",
    'work.filter': 'Filtrer par type de projet', 'work.all': 'Tous', 'work.list': 'Liste des projets', 'work.cta': "Le prochain projet, c'est le vôtre ?",
    'service.seeGallery': 'Voir la galerie photo', 'service.seeExamples': 'Voir des exemples', 'service.what': 'Pour quoi faire', 'service.included': 'Ce qui est inclus', 'service.includedTitle': 'Un projet complet, un seul interlocuteur.',
    'service.steps': 'Du brief à la livraison, en quatre temps.', 'service.allWork': 'Toutes les réalisations →', 'service.pricing': 'Tarifs',
    'service.priceText': 'Le prix dépend de la durée du tournage, du format et des déclinaisons. Chaque devis détaille les postes, sans frais cachés.', 'service.from': 'À partir de', 'service.vat': 'HTVA',
    'service.preciseQuote': 'Recevoir un devis précis', 'service.cta': 'Parlons de votre objectif.',
    'legal.eyebrow': 'Mentions légales', 'legal.updated': 'Dernière mise à jour :',
    'badge.ring': 'REGARDER · LECTURE · REGARDER · LECTURE ·',
    'biz.desc': 'Vidéo corporate, aftermovie et événement, brand content, photographie corporate et post-production pour les équipes marketing et communication.',
  },
  en: {
    'nav.main': 'Main navigation', 'nav.photo': 'Photo navigation', 'nav.projects': 'Work', 'nav.services': 'Services', 'nav.method': 'Process', 'nav.faq': 'FAQ',
    'nav.quote': 'Request a quote', 'nav.getQuote': 'Get a quote', 'nav.gallery': 'Gallery', 'nav.pricing': 'Pricing and process', 'nav.home': 'DTER, home', 'nav.lang': 'Language', 'nav.menu': 'Menu', 'nav.close': 'Close', 'nav.contact': 'Contact',
    'switch.label': 'Video or photo', 'switch.video': 'Video', 'switch.photo': 'Photo',
    'footer.links': 'Footer links', 'footer.terms': 'Terms (in French)', 'footer.privacy': 'Privacy (in French)', 'footer.city': 'Brussels',
    'cta.call': 'Book a call',
    'home.scroll': 'Scroll ↓', 'home.talk': 'Talk to Thomas', 'home.slot': 'Pick a time slot', 'home.founder': 'Founder of DTER · 20-minute call',
    'home.brands': 'Brands', 'home.why': 'Why DTER', 'home.allProjects': 'All projects', 'home.testimonials': 'Testimonials', 'home.method': 'Process',
    'home.studio': 'The studio', 'home.meet': 'Get in touch →', 'home.move': 'Move your mouse', 'home.withSound': 'with sound', 'home.bts': 'Behind the scenes of a DTER shoot',
    'band.title': 'And when you need stills, we shoot those too.', 'band.cta': 'See the photography',
    'form.deadline': 'Preferred deadline', 'form.message': 'Your project in a few lines', 'form.send': 'Send my request', 'form.free': 'Free, no obligation.',
    'form.name': 'Full name', 'form.company': 'Company', 'form.email': 'Work email', 'form.phone': 'Phone', 'form.type': 'Type of project',
    'form.t1': 'Corporate video', 'form.t2': 'Aftermovie, event', 'form.t3': 'Brand content, social media', 'form.t4': 'Photography', 'form.t5': 'Post-production only', 'form.t6': 'Other',
    'form.personal': 'A reply from Thomas, founder of DTER, in person. ', 'form.data': 'Your details are only used to reply to you.', 'form.policy': 'Privacy policy (in French)',
    'form.subject': 'Quote request', 'form.getMine': 'Get my quote',
    'contact.seoTitle': 'Contact and quotes · DTER Production, Brussels', 'contact.seoDesc': 'Request a quote for your corporate video, aftermovie, brand content or photo shoot. Thomas replies in person.',
    'contact.title': "Let's talk about your project.", 'contact.lead': 'Describe what you need in a few lines. Thomas replies in person, with a clear quote and a deadline.',
    'contact.phone': 'Phone', 'contact.whatsapp': 'Message on WhatsApp', 'contact.call': '20-minute call', 'contact.place': 'Brussels, Belgium', 'contact.formTitle': 'Request a quote',
    'book.eyebrow': 'Discovery call', 'book.title': '20 minutes to frame your project.', 'book.p1': 'You pick a time slot, the confirmation arrives by email.', 'book.p2': 'We talk goal, audience, deadline and budget.',
    'book.p3': 'You receive a clear quote right after.', 'book.note': 'Free, no obligation. By video call or phone.', 'book.agenda': "Thomas's calendar", 'book.show': 'Show available slots',
    'book.newTab': 'Open in a new tab', 'book.google': 'The calendar is provided by Google and only loads when you ask for it.', 'book.frame': 'Pick a time slot for a call with Thomas',
    'thanks.seoTitle': 'Thank you · DTER Production', 'thanks.eyebrow': 'Request sent', 'thanks.title': 'Thank you, we got it.', 'thanks.lead': 'Thomas will get back to you shortly with a clear quote and a deadline.', 'thanks.cta': 'See our work',
    '404.seoTitle': 'Page not found · DTER Production', '404.eyebrow': 'Error 404', '404.title': "This page doesn't exist.", '404.cta': 'Back to home',
    'photo.seoTitle': 'Corporate and event photography in Brussels · DTER', 'photo.seoDesc': 'Portraits, corporate reportage and event photography by DTER Production, in Brussels and across Belgium.',
    'photo.title': 'Photography, with the same eye.', 'photo.lead': 'Portraits, corporate reportage and events. Images consistent with your films, often shot the same day, by the same crew.',
    'photo.filter': 'Filter by type of photo', 'photo.all': 'All', 'photo.gallery': 'Photo gallery', 'photo.zoom': 'Enlarge photo', 'photo.soon': 'The gallery is coming soon.',
    'photo.cta': 'Video and photo, on the same day.', 'photo.pricing': 'Pricing and process →', 'lb.label': 'Enlarged photo', 'lb.close': 'Close', 'lb.prev': 'Previous photo', 'lb.next': 'Next photo',
    'lp.example': 'Example of our work', 'lp.or': 'or',
    'project.back': '← All work', 'project.more': 'More videos from this project', 'project.sheet': 'Project details', 'project.client': 'Client', 'project.format': 'Format', 'project.with': 'With',
    'project.year': 'Year', 'project.delivered': 'Delivered in', 'project.goal': 'The goal', 'project.answer': 'Our answer', 'project.result': 'The result', 'project.next': 'Next project',
    'project.cta': 'A similar project in mind?', 'project.desc': 'produced by DTER Production in Brussels.',
    'work.seoTitle': 'Video and photo work · DTER Production, Brussels', 'work.seoDesc': 'Aftermovies, brand content, interviews and corporate films made by DTER for Belgian and international brands.',
    'work.eyebrow': 'Work', 'work.title': 'Our video and photo work', 'work.lead': 'Events, brand content, corporate films, testimonials and social formats, for Belgian and international brands. Every project starts from a goal.',
    'work.filter': 'Filter by type of project', 'work.all': 'All', 'work.list': 'List of projects', 'work.cta': 'Is the next project yours?',
    'service.seeGallery': 'See the photo gallery', 'service.seeExamples': 'See examples', 'service.what': 'What it is for', 'service.included': "What's included", 'service.includedTitle': 'A complete project, one point of contact.',
    'service.steps': 'From brief to delivery, in four steps.', 'service.allWork': 'All work →', 'service.pricing': 'Pricing',
    'service.priceText': 'The price depends on the length of the shoot, the format and the cutdowns. Every quote details each item, with no hidden costs.', 'service.from': 'From', 'service.vat': 'excl. VAT',
    'service.preciseQuote': 'Get a precise quote', 'service.cta': "Let's talk about your goal.",
    'legal.eyebrow': 'Legal', 'legal.updated': 'Last updated:',
    'badge.ring': 'WATCH · PLAY · WATCH · PLAY · WATCH ·',
    'biz.desc': 'Corporate video, event aftermovies, brand content, corporate photography and post-production for marketing and communications teams.',
  },
} as const;

export type UiKey = keyof (typeof ui)['fr'];
export const useT = (lang: Lang) => (k: UiKey): string => (ui[lang] as Record<string, string>)[k] ?? ui.fr[k];

export const categoriesEn: Record<string, string> = {
  evenement: 'Events', 'brand-content': 'Brand content', corporate: 'Corporate', temoignage: 'Testimonials', social: 'Social media', influence: 'Influencer',
};
