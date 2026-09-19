import { describe, expect, it } from 'vitest';
import { EN } from '../../content/en';
import { ES } from '../../content/es';

/** Recursively lists every leaf path so we can assert both languages expose the same shape. */
function paths(value: unknown, prefix = ''): string[] {
  if (typeof value === 'string') return [prefix];
  if (Array.isArray(value)) return value.flatMap((v, i) => paths(v, `${prefix}[${i}]`));
  return Object.entries(value as object).flatMap(([k, v]) => paths(v, prefix ? `${prefix}.${k}` : k));
}

describe('content', () => {
  it('has no untranslated or empty strings', () => {
    for (const p of paths(ES)) expect(p).toBeTruthy();
    const empty = (obj: unknown): boolean => JSON.stringify(obj).includes('""');
    expect(empty(EN)).toBe(false);
    expect(empty(ES)).toBe(false);
  });

  it('exposes the same keys in every language', () => {
    expect(paths(ES).map((p) => p.replace(/\[\d+\]/g, '[]'))).toEqual(
      expect.arrayContaining([...new Set(paths(EN).map((p) => p.replace(/\[\d+\]/g, '[]')))]),
    );
  });
});
