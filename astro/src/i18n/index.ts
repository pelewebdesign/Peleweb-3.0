/**
 * Textes du site, en français et en anglais.
 * Modifiez directement fr.json et en.json : les deux fichiers ont la même structure.
 */
import fr from './fr.json';
import en from './en.json';
import type { Lang } from '../lib/content';

export const dictionaries = { fr, en };

export const t = (lang: Lang) => dictionaries[lang];

/** Adresse de la même page dans l'autre langue. */
export const otherLang = (lang: Lang): Lang => (lang === 'fr' ? 'en' : 'fr');
