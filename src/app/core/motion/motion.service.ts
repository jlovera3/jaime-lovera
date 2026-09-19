import { Injectable, signal } from '@angular/core';

/** Tracks the user's motion and pointer capabilities so effects can opt out gracefully. */
@Injectable({ providedIn: 'root' })
export class MotionService {
  private readonly reducedQuery = matchMedia('(prefers-reduced-motion: reduce)');
  private readonly hoverQuery = matchMedia('(hover: hover) and (pointer: fine)');

  readonly reduced = signal(this.reducedQuery.matches);
  /** True on devices with a real cursor (not touch), where hover effects make sense */
  readonly canHover = signal(this.hoverQuery.matches);

  constructor() {
    this.reducedQuery.addEventListener('change', (e) => this.reduced.set(e.matches));
    this.hoverQuery.addEventListener('change', (e) => this.canHover.set(e.matches));
  }
}
