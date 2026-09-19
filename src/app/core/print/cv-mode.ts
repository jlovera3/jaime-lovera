import { Lang } from '../i18n/content.model';

/**
 * `?cv=en` / `?cv=es` renders the printable CV instead of the site.
 * It is the page the PDFs are generated from (see scripts/build-cv.mjs).
 */
export function cvLang(): Lang | null {
  const value = new URLSearchParams(location.search).get('cv');
  return value === 'en' || value === 'es' ? value : null;
}
