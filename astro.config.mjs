import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  server: { port: 4322 },
  integrations: [svelte(), tailwind()],
  site: 'https://your-agency-domain.com',
  base: '/',
  vite: {
    build: {
      commonjsOptions: {
        include: [/node_modules/]
      }
    }
  }
});