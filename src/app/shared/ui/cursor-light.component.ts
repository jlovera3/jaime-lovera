import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject } from '@angular/core';
import { MotionService } from '../../core/motion/motion.service';

/** A soft glow that trails the cursor across the page. Mouse and trackpad only. */
@Component({
  selector: 'app-cursor-light',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: '<div class="light"></div>',
  styles: `
    .light {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1;
      width: 640px;
      height: 640px;
      margin: -320px 0 0 -320px;
      border-radius: 50%;
      background: radial-gradient(circle, var(--cursor-light), transparent 62%);
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.8s;
      will-change: transform;
    }
    .light.on {
      opacity: 1;
    }
  `,
})
export class CursorLightComponent {
  constructor() {
    const motion = inject(MotionService);
    const destroyRef = inject(DestroyRef);
    const host: HTMLElement = inject(ElementRef).nativeElement;

    afterNextRender(() => {
      if (!motion.canHover() || motion.reduced()) return;
      const el = host.querySelector<HTMLElement>('.light');
      if (!el) return;
      let tx = innerWidth / 2;
      let ty = innerHeight / 3;
      let x = tx;
      let y = ty;
      let frame = 0;

      const loop = () => {
        x += (tx - x) * 0.14;
        y += (ty - y) * 0.14;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        frame = Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(loop) : 0;
      };
      const onMove = (event: PointerEvent) => {
        tx = event.clientX;
        ty = event.clientY;
        el.classList.add('on');
        if (!frame) frame = requestAnimationFrame(loop);
      };
      document.addEventListener('pointermove', onMove, { passive: true });
      destroyRef.onDestroy(() => {
        document.removeEventListener('pointermove', onMove);
        cancelAnimationFrame(frame);
      });
    });
  }
}
