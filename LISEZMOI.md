# Peleweb — Astro + Sanity

| Dossier | Rôle |
|---|---|
| `astro/` | Le site public (FR/EN/ES, sombre/clair), hébergé sur Netlify. |
| `studio/` | Le **Sanity Studio** : l'interface où vous modifiez projets, logos clients, avis, FAQ et formules. Hébergé gratuitement par Sanity sur `peleweb.sanity.studio`. |

**Comment ça marche :** vous publiez un contenu dans le Studio. Sanity prévient Netlify, qui reconstruit le site en une à deux minutes. Le site reste 100 % statique : rapide, sans base de données ni cookie.

```
Sanity Studio  ──contenus──▶  Astro (build sur Netlify)  ──▶  peleweb.com
```

Le plan gratuit de Sanity suffit largement pour ce site.

---

## Étape 1 — Mettre à jour le dépôt GitHub

Le dépôt `Peleweb-3.0` doit contenir **deux dossiers** à la racine : `astro/` et `studio/`.

1. Dans GitHub Desktop, remplacez le contenu du dossier du dépôt par celui de ce zip (gardez le dossier caché `.git`).
2. Supprimez l'ancien dossier `wordpress/` s'il existe : il n'est plus utilisé.
3. **Commit** puis **Push**. Netlify redéploie le site automatiquement (Base directory : `astro`, comme aujourd'hui).

Sans Sanity, le site fonctionne déjà avec les contenus de `astro/src/data/fallback.json`.

---

## Étape 2 — Créer le projet Sanity

Il faut **Node.js 22.23.4 ou plus récent** (nodejs.org).

1. Créez un compte sur **sanity.io** (connexion Google ou GitHub possible), puis sur **sanity.io/manage** cliquez sur **Create new project**, nommez-le « Peleweb ». Si on vous demande un dataset, gardez **production** en visibilité **public**. Notez le **Project ID** affiché en haut de la page du projet.
2. Dans le dossier `studio/`, copiez `.env.example` en `.env` et remplacez `votre_project_id` par votre Project ID. Ouvrez ensuite un terminal dans `studio/` et tapez :
   ```
   npm install
   npx sanity login
   ```
3. Importez les contenus actuels du site (projets, logos, captures, avis, FAQ, formules en FR/EN/ES) :
   ```
   npm run seed
   ```
4. Lancez le Studio en local pour vérifier : `npm run dev`, puis ouvrez **http://localhost:3333**.
5. Mettez-le en ligne : `npm run deploy`. Le Studio est accessible sur **https://peleweb.sanity.studio** (si le nom est pris, la commande vous en propose un autre).

---

## Étape 3 — Relier Netlify à Sanity

1. **Sur Netlify** › Site configuration › **Environment variables** › Add :
   - `SANITY_PROJECT_ID` = votre Project ID
   - `SANITY_DATASET` = `production`
   - Supprimez l'ancienne variable `WP_API_URL` si elle existe.
2. **Sur Netlify** › Build & deploy › **Build hooks** › Add build hook, nommez-le « Sanity » et copiez l'adresse.
3. **Sur sanity.io/manage** › votre projet › **API** › **Webhooks** › Create webhook :
   - URL : l'adresse du build hook ;
   - Dataset : `production` ;
   - Trigger on : Create, Update, Delete ;
   - HTTP method : **POST**.
4. Relancez un déploiement sur Netlify (Deploys › Trigger deploy). Désormais, chaque publication dans le Studio met le site à jour.

> Si Sanity ne répond pas pendant un build, le build échoue volontairement : Netlify garde la version en ligne au lieu de publier un site vide.

---

## Étape 4 — Brancher peleweb.com

1. Sur Netlify : **Domain management › Add a domain** › `peleweb.com`.
2. Chez OVH, **Noms de domaine › peleweb.com › Zone DNS** :
   - enregistrement **A** de `peleweb.com` → l'adresse IP indiquée par Netlify ;
   - **CNAME** de `www` → votre adresse `xxx.netlify.app` ;
   - **ne touchez pas aux enregistrements MX** : vos emails continuent de fonctionner.
3. Le certificat HTTPS est créé automatiquement (comptez quelques heures pour la propagation).

---

## Au quotidien : où modifier quoi ?

| Je veux modifier… | Où ? |
|---|---|
| Un projet, sa capture, un logo client, un avis, la FAQ, une formule | Dans le **Studio Sanity** : publiez, le site se met à jour tout seul. L'ordre se règle avec le champ « Ordre d'affichage ». |
| Les textes de la page (titres, services, méthode, maintenance, CTA…) | `astro/src/i18n/fr.json`, `en.json` et `es.json`, puis Commit + Push. |
| Mentions légales, politique de confidentialité | `astro/src/components/Legal.astro`. **Ajoutez votre SIRET** (cherchez « SIRET » en haut du fichier). |
| Les couleurs, polices, animations | `astro/src/styles/global.css`. |
| La structure d'une section | `astro/src/components/` : un fichier par section. |
| Le portrait illustré du hero | `astro/src/components/PortraitSvg.astro` (dessin) et `Hero.astro` (bulle « Salut ! », badge). |

### Images

- **Captures des projets** : 1440 × 900 px. Sanity crée automatiquement la version mobile et le format WebP/AVIF. Le point d'intérêt (« hotspot ») permet de choisir la zone gardée lors du recadrage.
- **Logos** : SVG ou PNG **à fond transparent**, recadrés au plus près. Ils s'affichent en couleur en thème clair et **en blanc en thème sombre**.

### Cookies et RGPD

- Le site ne dépose aucun cookie et ne contacte aucun service tiers : les polices sont hébergées sur le site. **Aucun bandeau de cookies n'est donc nécessaire.**
- Si vous ajoutez un jour un outil de statistiques (Google Analytics, Meta Pixel…), il faudra un bandeau de consentement : CookieYes fera alors l'affaire. Une solution sans cookie comme Plausible ou Netlify Analytics permet de s'en passer.
