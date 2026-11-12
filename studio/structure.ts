import type { StructureResolver } from 'sanity/structure';
import { DocumentsIcon } from '@sanity/icons/Documents';
import { UsersIcon } from '@sanity/icons/Users';
import { CommentIcon } from '@sanity/icons/Comment';
import { HelpCircleIcon } from '@sanity/icons/HelpCircle';
import { TagIcon } from '@sanity/icons/Tag';

/** Menu de gauche du Studio, dans l'ordre des sections du site. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenus du site')
    .items([
      S.documentTypeListItem('project').title('Projets').icon(DocumentsIcon),
      S.documentTypeListItem('client').title('Clients (logos)').icon(UsersIcon),
      S.documentTypeListItem('offer').title('Formules').icon(TagIcon),
      S.documentTypeListItem('review').title('Avis clients').icon(CommentIcon),
      S.documentTypeListItem('faq').title('FAQ').icon(HelpCircleIcon),
    ]);
