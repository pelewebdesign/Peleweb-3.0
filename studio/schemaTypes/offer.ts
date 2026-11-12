import { defineField, defineType } from 'sanity';
import { orderField, byOrder } from './order';

export const offer = defineType({
  name: 'offer',
  title: 'Formule',
  type: 'document',
  orderings: byOrder,
  fields: [
    defineField({ name: 'name', title: 'Nom', type: 'localeString' }),
    defineField({ name: 'price', title: 'Prix', type: 'localeString', description: 'ex. 499 € / €499 / 499 €' }),
    defineField({ name: 'desc', title: 'Description', type: 'localeText' }),
    defineField({ name: 'items', title: 'Ce qui est inclus', type: 'localeList', description: 'Un élément par ligne.' }),
    defineField({ name: 'featured', title: 'Mettre en avant (carte en dégradé)', type: 'boolean', initialValue: false }),
    orderField,
  ],
  preview: { select: { title: 'name.fr', subtitle: 'price.fr' } },
});
