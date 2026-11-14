/**
 * Réglages du site lus au moment du build (variables d'environnement Netlify).
 *
 * PUBLIC_GA_ID             : identifiant de mesure Google Analytics 4, au format G-XXXXXXXXXX
 *                            (Google Analytics › Admin › Flux de données › Web).
 *                            Par défaut : G-3ZEQWTEL51 (Peleweb). Mettre « none » pour désactiver GA et le bandeau.
 * PUBLIC_GSC_VERIFICATION  : facultatif, code de la balise meta Google Search Console
 *                            (inutile si vous validez le domaine par enregistrement DNS).
 */
const ga = ((import.meta.env.PUBLIC_GA_ID as string | undefined) || 'G-3ZEQWTEL51').trim();
export const GA_ID = ga === 'none' ? '' : ga;
export const GSC_VERIFICATION = ((import.meta.env.PUBLIC_GSC_VERIFICATION as string | undefined) || '').trim();
