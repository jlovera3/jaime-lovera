# Jaime Lovera — Portfolio

Personal portfolio and CV: a single-page, bilingual (EN/ES) Angular app with an animated intro,
scroll-driven motion and a dark design system. Zero runtime dependencies beyond Angular.

## Run it

```bash
npm install
npm start          # http://localhost:4200  (add ?intro to replay the splash)
npm test           # unit tests (Vitest)
npm run build      # production build in www/
```

## Where things live

```
src/app/
  core/       language, intro and motion services + small utils
  content/    all copy, one typed file per language (en.ts, es.ts)
  data/       language-neutral facts: companies, apps, skills, education, profile
  shared/     reusable directives (reveal, spotlight, tilt) and UI pieces
  features/   one folder per section: splash, nav, hero, about, experience, work, skills, contact
src/styles/   design tokens and global styles
```

- **Edit text:** `src/app/content/en.ts` and `es.ts`. Both must expose the same keys or the build fails.
- **Edit facts** (jobs, apps, skills, links): `src/app/data/`.
- **Add LinkedIn / GitHub:** fill `links` in `src/app/data/profile.ts`; the UI picks it up.
- **Design tokens:** `src/styles/_tokens.scss`.

## Deploy

Every push to `main` builds and publishes to GitHub Pages via `.github/workflows/deploy.yml`.
One-time setup: repository **Settings → Pages → Source: GitHub Actions**.
