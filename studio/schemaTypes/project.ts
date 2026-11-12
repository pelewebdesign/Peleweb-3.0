import { defineField, defineType } from 'sanity';
import { orderField, byOrder } from './order';

export const project = defineType({
  name: 'project',
  title: 'Projet',
  type: 'document',
  orderings: byOrder,
  fields: [
    defineField({ name: 'name', title: 'Nom du projet', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'url', title: 'Adresse du site', type: 'url' }),
    defineField({ name: 'domain', title: 'Domaine affiché', type: 'string', description: 'ex. axotime.com' }),
    defineField({
      name: 'image',
      title: 'Capture du site',
      type: 'image',
      description: '1440 × 900 px. Le site crée automatiquement les autres tailles.',
      options: { hotspot: true },
    }),
    defineField({ name: 'type', title: 'Type de site', type: 'localeString', description: 'ex. Site vitrine / Business website / Web corporativa' }),
    defineField({ name: 'desc', title: 'Description', type: 'localeText' }),
    orderField,
  ],
  preview: { select: { title: 'name', subtitle: 'domain', media: 'image' } },
});
