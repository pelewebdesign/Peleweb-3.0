/**
 * /llms.txt : résumé du site au format Markdown, pensé pour les assistants IA
 * (ChatGPT, Claude, Perplexity, Gemini…). Généré au build à partir des mêmes contenus
 * que la page d'accueil (Sanity + fichiers de traduction) : il reste toujours à jour.
 */
import type { APIRoute } from 'astro';
import { getContent } from '../lib/content';
import { t as dictionary } from '../i18n';
import { SITE, EMAIL, MALT } from '../lib/seo';

export const GET: APIRoute = async () => {
  const fr = dictionary('fr');
  const en = dictionary('en');
  const es = dictionary('es');
  const d = await getContent('fr');
  const svc = ['s1', 's2', 's3', 's4', 's5', 's6'].map((k) => fr.svc[k]);

  const md = `# Peleweb — Umberto Persichini, développeur web freelance spécialisé WordPress

> ${fr.meta.description}

Peleweb est l’activité de développeur web freelance d’Umberto Persichini (micro-entreprise française, Vauréal, Val-d’Oise, Île-de-France). Il conçoit, développe, héberge et maintient des sites WordPress et des boutiques WooCommerce pour les artisans, indépendants, professions libérales, PME et agences, en France et à l’international, en français, anglais et espagnol.

## En bref

- Nom : Umberto Persichini — marque : Peleweb
- Métier : ${fr.hero.who.split(' — ')[1]}, spécialiste WordPress et WooCommerce
- Expérience : ${fr.hero.n1} ${fr.hero.s1}, ${fr.hero.n2} ${fr.hero.s2}
- Langues de travail : français, anglais, espagnol
- Zone : France (Île-de-France) et à distance partout dans le monde
- Contact : ${EMAIL} (devis gratuit et personnalisé)
- Profil et avis : ${MALT}
- Site : ${SITE}/ (FR), ${SITE}/en/ (EN), ${SITE}/es/ (ES)

## Services

${svc.map((s: any) => `- **${s.title}** : ${s.text}`).join('\n')}

## Pour qui

${fr.who.rows.map((r: any) => `- **${r.title}** : ${r.text}`).join('\n')}

## Tarifs

${fr.tar.lead}

${d.pricing.map((p) => `- **${p.name}** — ${fr.tar.from.toLowerCase()} ${p.price} ${fr.tar.tax} : ${p.desc}${p.items.length ? ` Inclus : ${p.items.join(', ')}.` : ''}`).join('\n')}

Maintenance mensuelle (${fr.tar.maint.tax}) :

${fr.tar.maint.items.map((m: any) => `- **${m.name}** — ${m.from ? m.from.toLowerCase() + ' ' : ''}${m.price} : ${m.desc}`).join('\n')}

## Méthode

${['c1', 'c2', 'c3'].map((k, i) => `${i + 1}. **${fr.proc[k].k}** : ${fr.proc[k].title} (${fr.proc[k].chips.join(', ')})`).join('\n')}

## Réalisations

${d.projects.map((p) => `- [${p.name}](${p.url}) — ${p.type} : ${p.desc}`).join('\n')}

## Avis clients

${d.reviews.map((r) => `- « ${r.quote} » — ${r.name}${r.company ? `, ${r.company}` : ''}`).join('\n')}

## Questions fréquentes

${d.faq.map((f) => `### ${f.question}\n\n${f.answer}`).join('\n\n')}

## Pages

- [Accueil (français)](${SITE}/)
- [Home (English)](${SITE}/en/)
- [Inicio (español)](${SITE}/es/)
- [Mentions légales](${SITE}/mentions-legales/)
- [Politique de confidentialité](${SITE}/politique-de-confidentialite/)

## English summary

${en.meta.description} Based in France (Vauréal, near Paris), working remotely worldwide in French, English and Spanish. Contact: ${EMAIL}.

## Resumen en español

${es.meta.description} Con sede en Francia (Vauréal, cerca de París), trabaja a distancia en todo el mundo en francés, inglés y español. Contacto: ${EMAIL}.
`;
  return new Response(md, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
