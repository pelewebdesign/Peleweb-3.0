/** Plan du site pour Google, Bing et les moteurs IA, avec les versions FR / EN / ES liées entre elles. */
import type { APIRoute } from 'astro';

const SITE = 'https://peleweb.com';
const groups = [
  { fr: '/', en: '/en/', es: '/es/', priority: '1.0' },
  { fr: '/mentions-legales/', en: '/en/legal-notice/', es: '/es/aviso-legal/', priority: '0.2' },
  { fr: '/politique-de-confidentialite/', en: '/en/privacy-policy/', es: '/es/politica-de-privacidad/', priority: '0.2' },
];

export const GET: APIRoute = () => {
  const today = new Date().toISOString().slice(0, 10);
  const urls = groups.flatMap((g) =>
    (['fr', 'en', 'es'] as const).map((lang) => `  <url>
    <loc>${SITE}${g[lang]}</loc>
    <lastmod>${today}</lastmod>
    <priority>${g.priority}</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${SITE}${g.fr}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE}${g.en}"/>
    <xhtml:link rel="alternate" hreflang="es" href="${SITE}${g.es}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${g.fr}"/>
  </url>`),
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
