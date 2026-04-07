import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
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