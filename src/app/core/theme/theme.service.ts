import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { MotionService } from '../motion/motion.service';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'theme';
const THEME_COLOR: Record<Theme, string> = { dark: '#06060a', light: '#f7f7fa' };

interface ViewTransitionDocument {
  startViewTransition?: (update: () => void) => { ready: Promise<void> };
}

/**
 * Dark is the default. The saved choice is applied by a tiny inline script in index.html before the
 * first paint (no flash); this service keeps the attribute, browser chrome colour and storage in sync.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly motion = inject(MotionService);

  readonly theme = signal<Theme>(this.doc.documentElement.dataset['theme'] === 'light' ? 'light' : 'dark');

  /** `origin` is where the reveal circle starts (usually the toggle button's centre). */
  toggle(origin?: { x: number; y: number }) {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    const apply = () => this.apply(next);

    const transitions = this.doc as unknown as ViewTransitionDocument;
    if (!origin || this.motion.reduced() || !transitions.startViewTransition) {
      apply();
      return;
    }

    const { x, y } = origin;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    transitions.startViewTransition(apply).ready.then(() => {
      this.doc.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 700, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', pseudoElement: '::view-transition-new(root)' },
      );
    });
  }

  private apply(theme: Theme) {
    this.doc.documentElement.dataset['theme'] = theme;
    this.meta.updateTag({ name: 'theme-color', content: THEME_COLOR[theme] });
    this.theme.set(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Storage can be blocked; the choice just won't persist.
    }
  }
}
