/**
 * Données structurées (JSON-LD) et texte pour les moteurs de recherche et les IA.
 * Tout est généré à partir des mêmes contenus que la page : Sanity + fichiers de traduction.
 */
import type { Lang } from './content';

export const SITE = 'https://peleweb.com';
export const EMAIL = 'contact@peleweb.com';
export const PHONE = '+33765580006';
export const WHATSAPP = 'https://wa.me/33765580006';
export const MALT = 'https://www.malt.fr/profile/umbertopersichini';
export const HOME_PATHS = { fr: '/', en: '/en/', es: '/es/' } as const;
const INLANG = { fr: 'fr-FR', en: 'en', es: 'es' } as const;

const SERVICES = ['s1', 's2', 's3', 's4', 's5', 's6'] as const;

/** Extrait un nombre d'un prix affiché (« 1 490 € » → 1490). */
const amount = (price: string) => {
  const n = price.replace(/[^\d.,]/g, '').replace(/[.,](?=\d{3}\b)/g, '').replace(',', '.');
  return n ? Number(n) : undefined;
};

export function homeJsonLd(lang: Lang, t: any, data: any) {
  const url = SITE + HOME_PATHS[lang];
  const person = {
    '@type': 'Person',
    '@id': `${SITE}/#umberto`,
    name: 'Umberto Persichini',
    jobTitle: t.hero.who.split(' — ')[1] ?? 'Développeur web freelance',
    email: `mailto:${EMAIL}`,
    image: `${SITE}/images/about/umberto-440.webp`,
    url: SITE + '/',
    sameAs: [MALT],
    knowsLanguage: ['fr', 'en', 'es'],
    knowsAbout: ['WordPress', 'WooCommerce', 'SEO', 'Web design', 'Web hosting', 'Website maintenance'],
    worksFor: { '@id': `${SITE}/#peleweb` },
  };
  const business = {
    '@type': 'ProfessionalService',
    '@id': `${SITE}/#peleweb`,
    name: 'Peleweb',
    url: SITE + '/',
    logo: `${SITE}/favicon.svg`,
    image: `${SITE}/og/og-${lang}.jpg`,
    description: t.meta.description,
    email: EMAIL,
    telephone: PHONE,
    founder: { '@id': `${SITE}/#umberto` },
    address: { '@type': 'PostalAddress', streetAddress: '7 rue de l’Amazone', postalCode: '95490', addressLocality: 'Vauréal', addressCountry: 'FR' },
    areaServed: [{ '@type': 'Country', name: 'France' }, { '@type': 'Place', name: 'Europe' }],
    availableLanguage: ['French', 'English', 'Spanish'],
    priceRange: '€€',
    sameAs: [MALT],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: t.svc.h2a + ' ' + t.svc.h2b,
      itemListElement: SERVICES.map((k) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: t.svc[k].title, description: t.svc[k].text },
      })),
    },
    makesOffer: [
      ...data.pricing.map((p: any) => ({
        '@type': 'Offer',
        name: p.name,
        description: p.desc,
        priceCurrency: 'EUR',
        priceSpecification: { '@type': 'PriceSpecification', minPrice: amount(p.price), priceCurrency: 'EUR', valueAddedTaxIncluded: true },
      })),
      ...t.tar.maint.items.map((m: any) => ({
        '@type': 'Offer',
        name: m.name,
        description: m.desc,
        priceCurrency: 'EUR',
        priceSpecification: { '@type': 'UnitPriceSpecification', minPrice: amount(m.price), priceCurrency: 'EUR', unitText: 'MON', valueAddedTaxIncluded: true },
      })),
    ],
  };
  const website = {
    '@type': 'WebSite',
    '@id': `${SITE}/#website`,
    url: SITE + '/',
    name: 'Peleweb',
    inLanguage: ['fr-FR', 'en', 'es'],
    publisher: { '@id': `${SITE}/#peleweb` },
  };
  const page = {
    '@type': 'WebPage',
    '@id': `${url}#page`,
    url,
    name: t.meta.title,
    description: t.meta.description,
    inLanguage: INLANG[lang],
    isPartOf: { '@id': `${SITE}/#website` },
    about: { '@id': `${SITE}/#peleweb` },
  };
  const faq = data.faq.length && {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    inLanguage: INLANG[lang],
    mainEntity: data.faq.map((f: any) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
  const portfolio = data.projects.length && {
    '@type': 'ItemList',
    '@id': `${url}#projets`,
    name: t.proj.h2a + ' ' + t.proj.h2b,
    itemListElement: data.projects.map((p: any, i: number) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: { '@type': 'CreativeWork', name: p.name, url: p.url, description: p.desc, creator: { '@id': `${SITE}/#umberto` } },
    })),
  };
  return { '@context': 'https://schema.org', '@graph': [website, page, business, person, faq, portfolio].filter(Boolean) };
}
