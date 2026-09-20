import { Injectable } from '@angular/core';

/**
 * One passive scroll/resize listener and one requestAnimationFrame per frame for every effect that
 * follows the scroll position. Effects write CSS variables directly, so no change detection runs.
 */
@Injectable({ providedIn: 'root' })
export class ScrollTicker {
  private readonly ticks = new Set<() => void>();
  private frame = 0;
  private lastY = window.scrollY;

  /** Pixels scrolled since the previous frame (signed) */
  velocity = 0;

  constructor() {
    window.addEventListener('scroll', () => this.schedule(), { passive: true });
    window.addEventListener('resize', () => this.schedule(), { passive: true });
  }

  /** Runs `tick` on every scroll frame (and once on the next frame). Returns an unsubscribe function. */
  add(tick: () => void): () => void {
    this.ticks.add(tick);
    this.schedule();
    return () => this.ticks.delete(tick);
  }

  private schedule() {
    if (this.frame) return;
    this.frame = requestAnimationFrame(() => {
      this.frame = 0;
      this.velocity = window.scrollY - this.lastY;
      this.lastY = window.scrollY;
      this.ticks.forEach((tick) => tick());
    });
  }
}
