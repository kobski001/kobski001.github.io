// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Set up for a repo named username.github.io. For any other repo name, add
// base: '/repo-name' next to site and update the sitemap URL in public/robots.txt.
export default defineConfig({
  site: 'https://kobski001.github.io',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
