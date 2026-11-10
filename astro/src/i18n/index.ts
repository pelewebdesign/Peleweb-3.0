/**
 * Textes du site, en français, anglais et espagnol.
 * Modifiez directement fr.json, en.json et es.json : les trois fichiers ont la même structure.
 */
import fr from './fr.json';
import en from './en.json';
import es from './es.json';
import type { Lang } from '../lib/content';

export const dictionaries = { fr, en, es };

export const t = (lang: Lang) => dictionaries[lang];
