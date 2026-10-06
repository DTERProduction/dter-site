import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://thomasdubois.pro',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !page.includes('/lp/') && !page.includes('/merci/') })],
});
