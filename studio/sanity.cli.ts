import { defineCliConfig } from 'sanity/cli';

// Lit le fichier .env (Project ID) pour les commandes import / deploy.
try {
  process.loadEnvFile('.env');
} catch {}

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  // Adresse du Studio en ligne : https://peleweb.sanity.studio
  studioHost: 'peleweb',
  deployment: { autoUpdates: true },
});
