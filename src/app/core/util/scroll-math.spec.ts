import { describe, expect, it } from 'vitest';
import { scrollProgress } from './scroll-math';

const rect = (top: number, height: number) => ({ top, height }) as DOMRect;

describe('scrollProgress', () => {
  it('pin: 0 at the start of the section, 1 when its sticky range is used up', () => {
    expect(scrollProgress(rect(0, 3000), 1000, 'pin')).toBe(0);
    expect(scrollProgress(rect(-1000, 3000), 1000, 'pin')).toBe(0.5);
    expect(scrollProgress(rect(-2000, 3000), 1000, 'pin')).toBe(1);
    expect(scrollProgress(rect(-9000, 3000), 1000, 'pin')).toBe(1);
  });

  it('exit: grows as the element leaves through the top', () => {
    expect(scrollProgress(rect(100, 800), 900, 'exit')).toBe(0);
    expect(scrollProgress(rect(-400, 800), 900, 'exit')).toBe(0.5);
  });

  it('pass: 0 below the trigger line, 1 half a viewport later', () => {
    expect(scrollProgress(rect(1000, 400), 1000, 'pass')).toBe(0);
    expect(scrollProgress(rect(400, 400), 1000, 'pass')).toBe(1);
  });
});
