export interface StatementWord {
  text: string;
  highlight: boolean;
}

/**
 * Splits a statement into words; `*phrases in asterisks*` are flagged as highlighted.
 * Punctuation that touches a word (no space between them) stays glued to it, so a line never
 * wraps right before a comma.
 */
export function tokenizeStatement(source: string): StatementWord[] {
  const parts = source.split(/(\*[^*]+\*)/).map((part) => ({
    highlight: part.length > 1 && part.startsWith('*') && part.endsWith('*'),
    text: part.replace(/\*/g, ''),
  }));

  const words: StatementWord[] = [];
  parts.forEach((part, index) => {
    const previous = parts[index - 1]?.text ?? '';
    const touchesPrevious = previous.length > 0 && !/\s$/.test(previous) && !/^\s/.test(part.text);
    part.text
      .split(/\s+/)
      .filter(Boolean)
      .forEach((text, i) => {
        if (i === 0 && touchesPrevious && words.length) words[words.length - 1].text += text;
        else words.push({ text, highlight: part.highlight });
      });
  });
  return words;
}
