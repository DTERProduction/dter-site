import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://dter.eu',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !page.includes('/lp/') && !page.includes('/merci/') && !page.includes('/thank-you/') })],
});
