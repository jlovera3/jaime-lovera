import { describe, expect, it } from 'vitest';
import { tokenizeStatement } from './statement';

describe('tokenizeStatement', () => {
  it('splits words and flags asterisk-wrapped phrases', () => {
    expect(tokenizeStatement('Clean *fast interfaces* win')).toEqual([
      { text: 'Clean', highlight: false },
      { text: 'fast', highlight: true },
      { text: 'interfaces', highlight: true },
      { text: 'win', highlight: false },
    ]);
  });

  it('glues punctuation that touches a highlighted phrase to the word before it', () => {
    expect(tokenizeStatement('feels *right*, done').map((w) => w.text)).toEqual(['feels', 'right,', 'done']);
  });

  it('keeps separate words between adjacent highlighted phrases and normal text', () => {
    const words = tokenizeStatement('*Clean architecture.* *Fast interfaces.* Teams win');
    expect(words.map((w) => w.text)).toEqual(['Clean', 'architecture.', 'Fast', 'interfaces.', 'Teams', 'win']);
  });

  it('ignores extra whitespace and empty input', () => {
    expect(tokenizeStatement('  a   b ')).toHaveLength(2);
    expect(tokenizeStatement('')).toEqual([]);
  });
});
