// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Set up for a repo named username.github.io. For any other repo name, see
// "Deploying under a different repo name" in DECISIONS.md.
export default defineConfig({
  site: 'https://kobski001.github.io',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
