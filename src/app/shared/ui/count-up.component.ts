import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  input,
  signal,
} from '@angular/core';
import { MotionService } from '../../core/motion/motion.service';

/** Animates from 0 to `value` the first time it scrolls into view. */
@Component({
  selector: 'app-count-up',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `{{ shown() }}{{ suffix() }}`,
  styles: `
    :host {
      font-variant-numeric: tabular-nums;
    }
  `,
})
export class CountUpComponent {
  readonly value = input.required<number>();
  readonly suffix = input('');
  readonly duration = input(1600);

  protected readonly shown = signal(0);

  private readonly motion = inject(MotionService);

  constructor() {
    const el: HTMLElement = inject(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      let frame = 0;
      const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        this.run(
          (id) => (frame = id),
        );
      });
      observer.observe(el);
      destroyRef.onDestroy(() => {
        observer.disconnect();
        cancelAnimationFrame(frame);
      });
    });
  }

  private run(track: (frameId: number) => void) {
    const target = this.value();
    if (this.motion.reduced()) {
      this.shown.set(target);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / this.duration(), 1);
      // easeOutExpo: fast start, long soft landing
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      this.shown.set(Math.round(target * eased));
      if (t < 1) track(requestAnimationFrame(tick));
    };
    track(requestAnimationFrame(tick));
  }
}
