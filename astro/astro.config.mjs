// @ts-check
import { defineConfig } from 'astro/config';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: 'https://peleweb.com',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en', 'es'],
    routing: {
      // Le français est à la racine (peleweb.com/), l'anglais sous /en/, l'espagnol sous /es/.
      prefixDefaultLocale: false,
    },
  },
});
