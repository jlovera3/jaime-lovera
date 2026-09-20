import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject } from '@angular/core';
import { MotionService } from '../../core/motion/motion.service';
import { ScrollTicker } from '../../core/scroll/scroll-ticker.service';
import { SKILL_GROUPS } from '../../data/skills';

const ALL = SKILL_GROUPS.filter((g) => g.id !== 'craft').flatMap((g) => g.items);
const MID = Math.ceil(ALL.length / 2);

/** Two rows of technologies scrolling in opposite directions. Purely decorative, hence aria-hidden. */
@Component({
  selector: 'app-marquee',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="marquee" aria-hidden="true">
      @for (row of rows; track $index) {
        <div class="row" [class.row--reverse]="$index === 1">
          <!-- The list is rendered twice so the -50% translate loops seamlessly -->
          @for (copy of [0, 1]; track copy) {
            <ul class="track">
              @for (item of row; track item) {
                <li><span class="star">✦</span>{{ item }}</li>
              }
            </ul>
          }
        </div>
      }
    </div>
  `,
  styleUrl: 'marquee.component.scss',
})
export class MarqueeComponent {
  protected readonly rows = [ALL.slice(0, MID), ALL.slice(MID)];

  constructor() {
    const host: HTMLElement = inject(ElementRef).nativeElement;
    const ticker = inject(ScrollTicker);
    const motion = inject(MotionService);
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (motion.reduced()) return;
      let rate = 1;
      let boost = 1;
      let frame = 0;

      // Ease the playback rate toward the scroll speed, then let it relax back to 1
      const relax = () => {
        boost = 1 + (boost - 1) * 0.94;
        rate += (boost - rate) * 0.2;
        host.getAnimations({ subtree: true }).forEach((a) => (a.playbackRate = rate));
        frame = rate > 1.01 ? requestAnimationFrame(relax) : 0;
        if (!frame) host.getAnimations({ subtree: true }).forEach((a) => (a.playbackRate = 1));
      };
      const onScroll = () => {
        boost = Math.max(boost, 1 + Math.min(Math.abs(ticker.velocity) / 9, 9));
        if (!frame) frame = requestAnimationFrame(relax);
      };
      destroyRef.onDestroy(ticker.add(onScroll));
      destroyRef.onDestroy(() => cancelAnimationFrame(frame));
    });
  }
}
