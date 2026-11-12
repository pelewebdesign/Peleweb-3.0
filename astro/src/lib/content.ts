/**
 * Récupère les contenus gérés dans Sanity (projets, clients, avis, FAQ, formules).
 *
 * - Si la variable SANITY_PROJECT_ID est définie, les contenus viennent de Sanity,
 *   au moment du build (Netlify reconstruit le site à chaque publication).
 * - Sinon, le site utilise les contenus de secours de src/data/fallback.json :
 *   pratique pour tester Astro sans Sanity.
 */
import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import fallback from '../data/fallback.json';

export type Lang = 'fr' | 'en' | 'es';
export const LANGS: Lang[] = ['fr', 'en', 'es'];
type Localized = { fr: string; en?: string; es?: string };
type LocalizedList = { fr?: string[]; en?: string[]; es?: string[] };

interface Raw {
  clients: { name: string; logo: string | null }[];
  projects: {
    name: string; url: string; domain: string;
    image: string | null; image_small: string | null;
    type: Localized; tag?: Localized; desc: Localized;
  }[];
  reviews: { name: string; company: string; quote: Localized; featured: boolean; logo?: string | null; photo?: string | null }[];
  faq: { question: Localized; answer: Localized; open: boolean }[];
  pricing: { name: Localized; desc: Localized; price: Localized; items: LocalizedList; featured: boolean }[];
}

const QUERY = `{
  "clients": *[_type == "client"] | order(order asc, _createdAt asc) { name, "logo": logo.asset->url },
  "projects": *[_type == "project"] | order(order asc, _createdAt asc) { name, url, domain, image, type, desc },
  "reviews": *[_type == "review"] | order(order asc, _createdAt asc) { name, company, "logo": logo.asset->url, quote, featured },
  "faq": *[_type == "faq"] | order(order asc, _createdAt asc) { question, answer, open },
  "pricing": *[_type == "offer"] | order(order asc, _createdAt asc) { name, desc, price, items, featured }
}`;

let cache: Promise<Raw> | null = null;

async function load(): Promise<Raw> {
  const projectId = import.meta.env.SANITY_PROJECT_ID as string | undefined;
  if (!projectId) {
    return fallback as Raw;
  }
  const client = createClient({
    projectId,
    dataset: (import.meta.env.SANITY_DATASET as string | undefined) || 'production',
    apiVersion: '2026-11-01',
    useCdn: false, // contenus toujours à jour au moment du build
    perspective: 'published',
  });
  const img = createImageUrlBuilder(client);
  // En cas d'erreur, le build échoue volontairement : Netlify garde alors
  // la version en ligne au lieu de publier un site incomplet.
  const data = await client.fetch(QUERY);
  return {
    ...data,
    projects: data.projects.map((p: any) => ({
      ...p,
      image: p.image?.asset ? img.image(p.image).width(1440).height(900).fit('crop').auto('format').quality(80).url() : null,
      image_small: p.image?.asset ? img.image(p.image).width(720).height(450).fit('crop').auto('format').quality(80).url() : null,
    })),
  } as Raw;
}

const pick = (value: Localized | undefined, lang: Lang) => (value?.[lang] || value?.fr || '').trim();
const pickList = (value: LocalizedList | undefined, lang: Lang) => (value?.[lang]?.length ? value[lang]! : value?.fr) ?? [];

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

export async function getContent(lang: Lang) {
  cache ??= load();
  const data = await cache;

  return {
    clients: (data.clients ?? []).map((c) => ({ name: c.name, logo: c.logo || null })),

    projects: (data.projects ?? []).map((p, i) => ({
      n: `${String(i + 1).padStart(3, '0')} /`,
      name: p.name,
      url: p.url,
      domain: p.domain,
      image: p.image,
      imageSmall: p.image_small || p.image,
      type: pick(p.type, lang),
      tag: pick(p.tag, lang),
      desc: pick(p.desc, lang),
    })),

    reviews: (data.reviews ?? []).map((r) => ({
      name: r.name,
      company: r.company,
      quote: pick(r.quote, lang),
      featured: Boolean(r.featured),
      logo: r.logo || r.photo || null,
      initials: initials(r.name),
    })),

    faq: (data.faq ?? []).map((f) => ({
      question: pick(f.question, lang),
      answer: pick(f.answer, lang),
      open: Boolean(f.open),
    })),

    pricing: (data.pricing ?? []).map((p) => ({
      name: pick(p.name, lang),
      desc: pick(p.desc, lang),
      price: pick(p.price, lang),
      items: pickList(p.items, lang),
      featured: Boolean(p.featured),
    })),
  };
}
