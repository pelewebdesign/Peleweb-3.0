import { defineField } from 'sanity';

/** Champ « Ordre » partagé : les petits nombres s'affichent en premier sur le site. */
export const orderField = defineField({
  name: 'order',
  title: 'Ordre d’affichage',
  type: 'number',
  description: '1 = en premier.',
  initialValue: 10,
});

export const byOrder = [{ title: 'Ordre d’affichage', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' as const }] }];
