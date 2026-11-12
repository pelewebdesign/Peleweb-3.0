import { defineType } from 'sanity';

/**
 * Champs traduits : chaque texte existe en français, anglais et espagnol.
 * Le français est obligatoire ; si une traduction manque, le site affiche le français.
 */
const langs = [
  { name: 'fr', title: 'Français' },
  { name: 'en', title: 'English' },
  { name: 'es', title: 'Español' },
];

export const localeString = defineType({
  name: 'localeString',
  title: 'Texte traduit',
  type: 'object',
  options: { columns: 3 },
  fields: langs.map((l) => ({
    name: l.name,
    title: l.title,
    type: 'string',
    validation: l.name === 'fr' ? (r: any) => r.required() : undefined,
  })),
});

export const localeText = defineType({
  name: 'localeText',
  title: 'Paragraphe traduit',
  type: 'object',
  fields: langs.map((l) => ({
    name: l.name,
    title: l.title,
    type: 'text',
    rows: 3,
    validation: l.name === 'fr' ? (r: any) => r.required() : undefined,
  })),
});

export const localeList = defineType({
  name: 'localeList',
  title: 'Liste traduite',
  type: 'object',
  fields: langs.map((l) => ({
    name: l.name,
    title: l.title,
    type: 'array',
    of: [{ type: 'string' }],
  })),
});
