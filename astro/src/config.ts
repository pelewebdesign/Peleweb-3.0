/**
 * Réglages du site lus au moment du build (variables d'environnement Netlify).
 *
 * PUBLIC_GA_ID             : identifiant de mesure Google Analytics 4, au format G-XXXXXXXXXX
 *                            (Google Analytics › Admin › Flux de données › Web).
 *                            Vide = pas de Google Analytics et pas de bandeau cookies.
 * PUBLIC_GSC_VERIFICATION  : facultatif, code de la balise meta Google Search Console
 *                            (inutile si vous validez le domaine par enregistrement DNS).
 */
export const GA_ID = ((import.meta.env.PUBLIC_GA_ID as string | undefined) || '').trim();
export const GSC_VERIFICATION = ((import.meta.env.PUBLIC_GSC_VERIFICATION as string | undefined) || '').trim();
