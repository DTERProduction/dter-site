import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://dter.eu',
  trailingSlash: 'always',
  // Chargement anticipé des pages au survol des liens : l'attente du rideau sert à charger la page suivante.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  integrations: [sitemap({ filter: (page) => !page.includes('/lp/') && !page.includes('/merci/') && !page.includes('/thank-you/') })],
});
