import { Content } from '../i18n/content.model';
import { COMPANIES } from '../../data/experience';
import { formatDuration, formatMonth, monthsBetween } from './duration';

/** Language-neutral facts (dates, logos, projects) joined with the localized copy. Used by the site and the CV. */
export function buildJobs(t: Content['experience'], locale: string) {
  return COMPANIES.map((company) => {
    const copy = t.companies[company.id];
    const range = (from: string, to: string | null | undefined) =>
      `${formatMonth(from, locale)} — ${to ? formatMonth(to, locale) : t.present}`;
    const engagements = (company.engagements ?? []).map((engagement) => ({
      ...engagement,
      ...t.engagements[engagement.id],
      period: engagement.start ? range(engagement.start, engagement.end) : null,
    }));
    return {
      ...company,
      engagements,
      role: copy.role,
      highlights: copy.highlights,
      period: range(company.start, company.end),
      duration: formatDuration(monthsBetween(company.start, company.end), t.units),
      appsLabel: t.apps[company.projects.length === 1 ? 0 : 1],
    };
  });
}
