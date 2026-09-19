import { Directive, ElementRef, afterNextRender, inject, input, numberAttribute, signal } from '@angular/core';

/**
 * Fades an element in as it scrolls into view. Optional value is a stagger delay in ms:
 * `<li [appReveal]="index * 80">`. The visual states live in styles/_motion.scss.
 */
@Directive({
  selector: '[appReveal]',
  host: {
    class: 'reveal',
    '[class.is-visible]': 'visible()',
    '[style.--reveal-delay]': 'delay()',
  },
})
export class RevealDirective {
  readonly delay = input(0, { alias: 'appReveal', transform: numberAttribute });
  protected readonly visible = signal(false);

  constructor() {
    const el: HTMLElement = inject(ElementRef).nativeElement;
    afterNextRender(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          this.visible.set(true);
          observer.disconnect();
        },
        { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
      );
      observer.observe(el);
    });
  }
}
