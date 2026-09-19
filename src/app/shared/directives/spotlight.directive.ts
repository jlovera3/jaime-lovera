import { Directive, ElementRef, inject } from '@angular/core';

/** Feeds the cursor position to the `.spotlight` glow in styles/_components.scss. */
@Directive({
  selector: '[appSpotlight]',
  host: {
    class: 'spotlight',
    '(pointermove)': 'move($event)',
  },
})
export class SpotlightDirective {
  private readonly el: HTMLElement = inject(ElementRef).nativeElement;

  protected move(event: PointerEvent) {
    const rect = this.el.getBoundingClientRect();
    this.el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    this.el.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }
}
