import { describe, expect, it } from 'vitest';
import { formatDuration, formatMonth, monthsBetween } from './duration';

const EN_UNITS = { year: ['yr', 'yrs'], month: ['mo', 'mos'] } as const;

describe('duration utils', () => {
  it('counts months inclusively', () => {
    expect(monthsBetween('2023-01', '2025-01')).toBe(25);
    expect(monthsBetween('2021-06', '2021-10')).toBe(5);
  });

  it('uses the current month for an open-ended position', () => {
    expect(monthsBetween('2026-01', null, new Date(Date.UTC(2026, 8, 20)))).toBe(9);
  });

  it('formats years and months with singular/plural units', () => {
    expect(formatDuration(25, { ...EN_UNITS } as never)).toBe('2 yrs 1 mo');
    expect(formatDuration(12, { ...EN_UNITS } as never)).toBe('1 yr');
    expect(formatDuration(5, { ...EN_UNITS } as never)).toBe('5 mos');
  });

  it('formats months per locale without timezone drift', () => {
    expect(formatMonth('2023-01', 'en-GB')).toBe('Jan 2023');
    expect(formatMonth('2023-01', 'es-ES')).toMatch(/ene\.? 2023/);
  });
});
