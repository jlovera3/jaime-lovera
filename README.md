# Jaime Lovera — Portfolio

Personal portfolio and CV: a single-page, bilingual (EN/ES) Angular app with an animated intro,
scroll-driven motion and a dark design system. Zero runtime dependencies beyond Angular.

## Run it

```bash
npm install
npm start          # http://localhost:4200  (add ?intro to replay the splash)
npm test           # unit tests (Vitest)
npm run build      # production build in www/
npm run cv         # regenerate the CV PDFs (see below)
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

## CV (PDF)

The downloadable CV is generated from the same data and copy as the site, in English and Spanish,
so it never drifts out of sync. A print-optimised page lives at `/?cv=en` and `/?cv=es`.

```bash
npm run cv    # builds the app and writes src/assets/cv/Jaime-Lovera-CV-{en,es}.pdf
```

Run it whenever you change `src/app/content/` or `src/app/data/`, then commit the PDFs.
It needs Google Chrome or Chromium (set `CHROME_PATH` if it is not in a standard location).

## Deploy

Hosted on Cloudflare Pages (free tier), connected to this repository: every push to `main` builds and
publishes automatically.

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Build output directory | `www` |
| Node version | `24` (from `.node-version`) |

Security and cache headers live in `src/_headers`. GitHub Actions (`.github/workflows/ci.yml`) runs lint,
tests and a production build on every push and pull request.
