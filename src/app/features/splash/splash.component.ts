import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { IntroService } from '../../core/intro/intro.service';
import { LanguageService } from '../../core/i18n/language.service';
import { PROFILE } from '../../data/profile';

const LOAD_MS = 2200;
const HOLD_MS = 300;
const CURTAIN_MS = 1100;

interface Letter {
  char: string;
  index: number;
}

@Component({
  selector: 'app-splash',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'splash.component.html',
  styleUrl: 'splash.component.scss',
})
export class SplashComponent {
  private readonly intro = inject(IntroService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly content = inject(LanguageService).content;
  protected readonly name = PROFILE.name;
  protected readonly count = signal(0);
  protected readonly exiting = signal(false);
  protected readonly year = new Date().getFullYear();

  /** Name split into words → letters, with a running index so the stagger flows across words */
  protected readonly words: Letter[][] = (() => {
    let index = 0;
    return PROFILE.name
      .toUpperCase()
      .split(' ')
      .map((word) => [...word].map((char) => ({ char, index: index++ })));
  })();

  private frame = 0;
  private readonly timers: ReturnType<typeof setTimeout>[] = [];

  constructor() {
    afterNextRender(() => this.load());
    this.destroyRef.onDestroy(() => {
      cancelAnimationFrame(this.frame);
      this.timers.forEach(clearTimeout);
    });
  }

  protected skip() {
    cancelAnimationFrame(this.frame);
    this.count.set(100);
    this.exit();
  }

  /** Drives the 0→100 counter with an ease-in-out so it feels like real loading */
  private load() {
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / LOAD_MS, 1);
      const eased = t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
      this.count.set(Math.round(eased * 100));
      if (t < 1) {
        this.frame = requestAnimationFrame(tick);
      } else {
        this.timers.push(setTimeout(() => this.exit(), HOLD_MS));
      }
    };
    this.frame = requestAnimationFrame(tick);
  }

  private exit() {
    if (this.exiting()) return;
    this.exiting.set(true);
    this.intro.reveal();
    this.timers.push(setTimeout(() => this.intro.finish(), CURTAIN_MS));
  }
}
