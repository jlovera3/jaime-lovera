import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
} from '@angular/core';
import { LanguageService } from '../../core/i18n/language.service';
import { MotionService } from '../../core/motion/motion.service';
import { ScrollTicker } from '../../core/scroll/scroll-ticker.service';
import { clamp01 } from '../../core/util/scroll-math';
import { monthsBetween } from '../../core/util/duration';
import { COMPANIES } from '../../data/experience';
import { PROFILE } from '../../data/profile';
import { ScrollProgressDirective } from '../../shared/directives/scroll-progress.directive';

/** Giant figures that count up and light up as they scroll into view. */
@Component({
  selector: 'app-impact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollProgressDirective],
  templateUrl: 'impact.component.html',
  styleUrl: 'impact.component.scss',
})
export class ImpactComponent {
  private readonly language = inject(LanguageService);
  private readonly labels = computed(() => this.language.content().impact);

  /** Derived from the data, so it never goes stale or out of sync with the rest of the page */
  protected readonly stats = computed(() => {
    const labels = this.labels();
    const storeApps = COMPANIES.flatMap((c) => c.projects).filter((p) => p.googleUrl || p.appleUrl).length;
    return [
      { value: Math.floor(monthsBetween(PROFILE.careerStart, null) / 12), suffix: '+', label: labels.years },
      { value: COMPANIES.length, suffix: '', label: labels.companies },
      { value: storeApps, suffix: '', label: labels.apps },
    ];
  });

  constructor() {
    const host: HTMLElement = inject(ElementRef).nativeElement;
    const ticker = inject(ScrollTicker);
    const motion = inject(MotionService);
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const items = [...host.querySelectorAll<HTMLElement>('.stat')];
      const update = () => {
        items.forEach((item, index) => {
          const number = item.querySelector<HTMLElement>('.num')!;
          const target = this.stats()[index].value;
          const rect = item.getBoundingClientRect();
          // Each figure starts a little later than the previous one
          const raw = motion.reduced() ? 1 : clamp01((innerHeight * (0.92 - index * 0.04) - rect.top) / (innerHeight * 0.45));
          const eased = 1 - Math.pow(1 - raw, 3);
          item.style.setProperty('--sp', raw.toFixed(4));
          number.textContent = String(Math.round(target * eased));
        });
      };
      destroyRef.onDestroy(ticker.add(update));
    });
  }
}
