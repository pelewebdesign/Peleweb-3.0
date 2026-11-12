import { defineField, defineType } from 'sanity';
import { orderField, byOrder } from './order';

export const faq = defineType({
  name: 'faq',
  title: 'Question',
  type: 'document',
  orderings: byOrder,
  fields: [
    defineField({ name: 'question', title: 'Question', type: 'localeString' }),
    defineField({ name: 'answer', title: 'Réponse', type: 'localeText' }),
    defineField({ name: 'open', title: 'Ouverte par défaut', type: 'boolean', initialValue: false }),
    orderField,
  ],
  preview: { select: { title: 'question.fr' } },
});
