import { Content, Lang } from '../core/i18n/content.model';
import { EN } from './en';
import { ES } from './es';

export const CONTENT: Record<Lang, Content> = { en: EN, es: ES };

/** BCP 47 locales for Intl formatting */
export const LOCALES: Record<Lang, string> = { en: 'en-GB', es: 'es-ES' };
