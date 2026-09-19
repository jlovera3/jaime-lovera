import { DurationUnits } from '../i18n/content.model';

/** Whole months between two ISO year-months ("2023-01"); `end` null means "now". Inclusive of the end month. */
export function monthsBetween(start: string, end: string | null, now = new Date()): number {
  const [sy, sm] = start.split('-').map(Number);
  const [ey, em] = end
    ? end.split('-').map(Number)
    : [now.getUTCFullYear(), now.getUTCMonth() + 1];
  return (ey - sy) * 12 + (em - sm) + 1;
}

export function formatDuration(totalMonths: number, units: DurationUnits): string {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const part = (n: number, [one, many]: [string, string]) => `${n} ${n === 1 ? one : many}`;
  const parts: string[] = [];
  if (years > 0) parts.push(part(years, units.year));
  if (months > 0 || years === 0) parts.push(part(months, units.month));
  return parts.join(' ');
}

/** Formats an ISO year-month using the active locale, e.g. "Jan 2023" / "ene 2023". */
export function formatMonth(iso: string, locale: string): string {
  const [year, month] = iso.split('-').map(Number);
  return new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(Date.UTC(year, month - 1, 1)),
  );
}
