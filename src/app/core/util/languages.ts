import { LANGUAGES } from '../../data/languages';
import { Content } from '../i18n/content.model';

/** Language-neutral scores joined with the localized names and level labels (site and CV). */
export function buildLanguages(t: Content['languages']) {
  return LANGUAGES.map((entry) => ({ ...entry, ...t.items[entry.id] }));
}
