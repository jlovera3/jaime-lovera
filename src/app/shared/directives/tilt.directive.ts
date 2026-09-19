import { Directive, ElementRef, inject, input, numberAttribute } from '@angular/core';
import { MotionService } from '../../core/motion/motion.service';

/** 3D tilt that follows the cursor. Off for touch devices and reduced-motion users. */
@Directive({
  selector: '[appTilt]',
  host: {
    class: 'tilt',
    '(pointermove)': 'move($event)',
    '(pointerleave)': 'reset()',
  },
})
export class TiltDirective {
  private readonly el: HTMLElement = inject(ElementRef).nativeElement;
  private readonly motion = inject(MotionService);

  /** Max rotation in degrees */
  readonly max = input(8, { alias: 'appTilt', transform: numberAttribute });

  protected move(event: PointerEvent) {
    if (!this.motion.canHover() || this.motion.reduced()) return;
    const rect = this.el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    this.el.classList.add('is-tilting');
    this.el.style.setProperty('--ry', `${x * this.max() * 2}deg`);
    this.el.style.setProperty('--rx', `${-y * this.max() * 2}deg`);
  }

  protected reset() {
    this.el.classList.remove('is-tilting');
    this.el.style.setProperty('--rx', '0deg');
    this.el.style.setProperty('--ry', '0deg');
  }
}
