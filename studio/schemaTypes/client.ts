import { defineField, defineType } from 'sanity';
import { orderField, byOrder } from './order';

export const client = defineType({
  name: 'client',
  title: 'Client',
  type: 'document',
  orderings: byOrder,
  fields: [
    defineField({ name: 'name', title: 'Nom du client', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'SVG ou PNG à fond transparent, recadré au plus près. En thème sombre, il s’affiche automatiquement en blanc.',
    }),
    orderField,
  ],
  preview: { select: { title: 'name', media: 'logo' } },
});
