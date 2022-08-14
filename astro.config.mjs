import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
  integrations: [preact()],
  legacy: {
    // Example: Add support for legacy Markdown features
    astroFlavoredMarkdown: true,
  },
});
