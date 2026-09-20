import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';
import { MotionService } from '../../core/motion/motion.service';
import { ScrollTicker } from '../../core/scroll/scroll-ticker.service';
import { ScrollMode, scrollProgress } from '../../core/util/scroll-math';

/**
 * Exposes scroll progress as the CSS variable `--p` (0 → 1) on the host, so styles can be scrubbed by
 * the scroll position: `<section appScrollProgress="pin">`. Reduced-motion users get the final state.
 */
@Directive({ selector: '[appScrollProgress]' })
export class ScrollProgressDirective {
  readonly mode = input<ScrollMode>('pass', { alias: 'appScrollProgress' });

  constructor() {
    const el: HTMLElement = inject(ElementRef).nativeElement;
    const ticker = inject(ScrollTicker);
    const motion = inject(MotionService);
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (motion.reduced()) {
        el.style.setProperty('--p', this.mode() === 'exit' ? '0' : '1');
        return;
      }
      let last = -1;
      const update = () => {
        const p = scrollProgress(el.getBoundingClientRect(), innerHeight, this.mode());
        if (Math.abs(p - last) < 0.0005) return;
        last = p;
        el.style.setProperty('--p', p.toFixed(4));
      };
      destroyRef.onDestroy(ticker.add(update));
    });
  }
}
