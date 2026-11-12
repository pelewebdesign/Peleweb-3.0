import { defineField, defineType } from 'sanity';
import { orderField, byOrder } from './order';

export const review = defineType({
  name: 'review',
  title: 'Avis',
  type: 'document',
  orderings: byOrder,
  fields: [
    defineField({ name: 'name', title: 'Prénom et nom', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'company', title: 'Entreprise', type: 'string' }),
    defineField({ name: 'logo', title: 'Logo de l’entreprise', type: 'image', description: 'Fond transparent de préférence.' }),
    defineField({ name: 'quote', title: 'Avis', type: 'localeText', description: 'Sans guillemets : ils sont ajoutés par le site.' }),
    defineField({ name: 'featured', title: 'Mettre en avant (carte en dégradé)', type: 'boolean', initialValue: false }),
    orderField,
  ],
  preview: { select: { title: 'name', subtitle: 'company', media: 'logo' } },
});
