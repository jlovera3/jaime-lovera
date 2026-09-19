import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, computed, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { IntroService } from '../../core/intro/intro.service';
import { LanguageService } from '../../core/i18n/language.service';
import { MotionService } from '../../core/motion/motion.service';
import { IconComponent } from '../../shared/ui/icon.component';

export const SECTION_IDS = ['about', 'experience', 'work', 'skills', 'contact'] as const;
type SectionId = (typeof SECTION_IDS)[number];

@Component({
  selector: 'app-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  templateUrl: 'nav.component.html',
  styleUrl: 'nav.component.scss',
  host: {
    '[class.is-ready]': 'intro.ready()',
    '[class.is-scrolled]': 'scrolled()',
    '(document:keydown.escape)': 'closeMenu()',
  },
})
export class NavComponent {
  protected readonly intro = inject(IntroService);
  protected readonly language = inject(LanguageService);
  private readonly motion = inject(MotionService);
  private readonly doc = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly content = this.language.content;
  protected readonly items = computed(() =>
    SECTION_IDS.map((id) => ({ id, label: this.content().nav[id] })),
  );

  protected readonly active = signal<SectionId | null>(null);
  protected readonly scrolled = signal(false);
  protected readonly menuOpen = signal(false);

  constructor() {
    afterNextRender(() => {
      // Scroll-spy: the section crossing the middle of the viewport is "active"
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) this.active.set(entry.target.id as SectionId);
          }
        },
        { rootMargin: '-45% 0px -50% 0px' },
      );
      SECTION_IDS.forEach((id) => {
        const el = this.doc.getElementById(id);
        if (el) observer.observe(el);
      });

      const onScroll = () => this.scrolled.set(window.scrollY > 24);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });

      this.destroyRef.onDestroy(() => {
        observer.disconnect();
        window.removeEventListener('scroll', onScroll);
        this.doc.documentElement.classList.remove('menu-open');
      });
    });
  }

  protected go(event: Event, id: string) {
    event.preventDefault();
    this.closeMenu();
    const target = id === 'top' ? this.doc.body : this.doc.getElementById(id);
    target?.scrollIntoView({ behavior: this.motion.reduced() ? 'auto' : 'smooth', block: 'start' });
  }

  protected toggleMenu() {
    this.menuOpen.update((open) => !open);
    this.doc.documentElement.classList.toggle('menu-open', this.menuOpen());
  }

  protected closeMenu() {
    if (!this.menuOpen()) return;
    this.menuOpen.set(false);
    this.doc.documentElement.classList.remove('menu-open');
  }
}
