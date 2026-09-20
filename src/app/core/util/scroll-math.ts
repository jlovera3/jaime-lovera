export const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/**
 * 0 → 1 while an element crosses the viewport.
 *  - `pass`: starts when the element's top reaches 90% of the viewport and ends half a viewport later
 *  - `pin`:  progress through a tall section whose content is `position: sticky`
 *  - `exit`: how far the element has scrolled out of view at the top (its own height = 1)
 */
export type ScrollMode = 'pass' | 'pin' | 'exit';

export function scrollProgress(rect: DOMRect, viewportHeight: number, mode: ScrollMode): number {
  switch (mode) {
    case 'pin':
      return clamp01(-rect.top / Math.max(1, rect.height - viewportHeight));
    case 'exit':
      return clamp01(-rect.top / Math.max(1, rect.height));
    default:
      return clamp01((viewportHeight * 0.9 - rect.top) / (viewportHeight * 0.5));
  }
}
