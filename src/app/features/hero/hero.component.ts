import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { IntroService } from '../../core/intro/intro.service';
import { LanguageService } from '../../core/i18n/language.service';
import { PROFILE } from '../../data/profile';
import { TiltDirective } from '../../shared/directives/tilt.directive';
import { IconComponent } from '../../shared/ui/icon.component';

interface Word {
  text: string;
  accent: boolean;
}

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TiltDirective, IconComponent],
  templateUrl: 'hero.component.html',
  styleUrl: 'hero.component.scss',
  host: { '[class.is-ready]': 'intro.ready()' },
})
export class HeroComponent {
  protected readonly intro = inject(IntroService);
  private readonly language = inject(LanguageService);
  private readonly content = this.language.content;
  protected readonly cvHref = this.language.cvHref;

  protected readonly name = PROFILE.name;
  protected readonly hero = computed(() => this.content().hero);
  protected readonly cv = computed(() => this.content().cv);
  protected readonly chips = ['Angular', 'TypeScript', 'Ionic', 'Vue.js'];

  protected readonly headline = computed(() => {
    const { before, accent, after } = this.hero().headline;
    const words = (text: string): Word[] =>
      text.split(' ').map((word) => ({ text: word, accent: false }));
    // The accented phrase stays on one line so the gradient reads as a single unit
    return [...words(before), { text: accent, accent: true }, ...words(after)];
  });

  protected readonly plainHeadline = computed(() => this.headline().map((w) => w.text).join(' '));

  protected scrollTo(event: Event, id: string) {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
