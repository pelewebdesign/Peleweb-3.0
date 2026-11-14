import { defineCliConfig } from 'sanity/cli';


export default defineCliConfig({
  api: {
    projectId: 'cxqgbx8m',
    dataset: 'production',
  },
  // Adresse du Studio en ligne : https://peleweb.sanity.studio
  studioHost: 'peleweb',
  deployment: { autoUpdates: true },
});
