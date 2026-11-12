/**
 * Prépare l'import des contenus de départ dans Sanity.
 *
 * Lit astro/src/data/fallback.json (les contenus actuels du site) et écrit seed/seed.ndjson,
 * avec les images de astro/public/images. Lancez ensuite :  npm run seed
 * (le script « seed » fait les deux étapes d'un coup).
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const astro = resolve(here, '../../astro');
const data = JSON.parse(readFileSync(resolve(astro, 'src/data/fallback.json'), 'utf8'));

const image = (publicPath) => {
  if (!publicPath) return undefined;
  const file = resolve(astro, 'public', publicPath.replace(/^\//, ''));
  if (!existsSync(file)) return undefined;
  return { _type: 'image', _sanityAsset: `image@${pathToFileURL(file).href}` };
};
const slug = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const loc = (v, type) => (v ? { _type: type, fr: v.fr ?? '', en: v.en ?? '', es: v.es ?? '' } : undefined);

const docs = [];
data.clients.forEach((c, i) => docs.push({ _id: `client-${slug(c.name)}`, _type: 'client', name: c.name, logo: image(c.logo), order: i + 1 }));
data.projects.forEach((p, i) => docs.push({
  _id: `project-${slug(p.name)}`, _type: 'project', name: p.name, url: p.url, domain: p.domain,
  image: image(p.image), type: loc(p.type, 'localeString'), desc: loc(p.desc, 'localeText'), order: i + 1,
}));
data.reviews.forEach((r, i) => docs.push({
  _id: `review-${slug(r.name)}`, _type: 'review', name: r.name, company: r.company, logo: image(r.logo),
  quote: loc(r.quote, 'localeText'), featured: Boolean(r.featured), order: i + 1,
}));
data.faq.forEach((f, i) => docs.push({
  _id: `faq-${i + 1}`, _type: 'faq', question: loc(f.question, 'localeString'), answer: loc(f.answer, 'localeText'), open: Boolean(f.open), order: i + 1,
}));
data.pricing.forEach((o, i) => docs.push({
  _id: `offer-${slug(o.name.fr)}`, _type: 'offer', name: loc(o.name, 'localeString'), price: loc(o.price, 'localeString'),
  desc: loc(o.desc, 'localeText'), featured: Boolean(o.featured), order: i + 1,
  items: { _type: 'localeList', fr: o.items.fr ?? [], en: o.items.en ?? [], es: o.items.es ?? [] },
}));

const clean = (o) => JSON.parse(JSON.stringify(o)); // retire les champs vides
writeFileSync(resolve(here, 'seed.ndjson'), docs.map((d) => JSON.stringify(clean(d))).join('\n') + '\n');
console.log(`${docs.length} contenus prêts dans seed/seed.ndjson`);
