/**
 * Récupère les contenus gérés dans WordPress (projets, clients, avis, FAQ, formules).
 *
 * - Si la variable WP_API_URL est définie (ex. https://cms.peleweb.com),
 *   les contenus viennent de WordPress, au moment du build.
 * - Sinon, le site utilise les contenus de secours de src/data/fallback.json :
 *   pratique pour tester Astro sans WordPress.
 */
import fallback from '../data/fallback.json';

export type Lang = 'fr' | 'en' | 'es';
export const LANGS: Lang[] = ['fr', 'en', 'es'];
type Localized = { fr: string; en: string; es?: string };
type LocalizedList = { fr: string[]; en: string[]; es?: string[] };

interface Raw {
  clients: { name: string; logo: string | null }[];
  projects: {
    name: string; url: string; domain: string;
    image: string | null; image_small: string | null;
    type: Localized; tag: Localized; desc: Localized; short: Localized;
  }[];
  reviews: { name: string; company: string; quote: Localized; featured: boolean; logo?: string | null; photo?: string | null }[];
  faq: { question: Localized; answer: Localized; open: boolean }[];
  pricing: { name: Localized; desc: Localized; price: Localized; items: LocalizedList; featured: boolean }[];
}

let cache: Promise<Raw> | null = null;

async function load(): Promise<Raw> {
  const api = import.meta.env.WP_API_URL as string | undefined;
  if (!api) {
    return fallback as Raw;
  }
  const url = `${api.replace(/\/$/, '')}/wp-json/peleweb/v1/content`;
  // En cas d'erreur, le build échoue volontairement : Netlify garde alors
  // la version en ligne au lieu de publier un site incomplet.
  const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
  if (!res.ok) {
    throw new Error(`WordPress ne répond pas correctement (${res.status}) : ${url}`);
  }
  return (await res.json()) as Raw;
}

const pick = (value: Localized | undefined, lang: Lang) => (value?.[lang] || value?.fr || '').trim();

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
    clients: data.clients ?? [],

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
      items: (p.items?.[lang]?.length ? p.items[lang]! : p.items?.fr) ?? [],
      featured: Boolean(p.featured),
    })),
  };
}
