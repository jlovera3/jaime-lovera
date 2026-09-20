import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { LanguageService } from '../../core/i18n/language.service';
import { buildLanguages } from '../../core/util/languages';
import { EDUCATION } from '../../data/education';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { SpotlightDirective } from '../../shared/directives/spotlight.directive';
import { IconComponent } from '../../shared/ui/icon.component';
import { SectionHeadingComponent } from '../../shared/ui/section-heading.component';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, SpotlightDirective, IconComponent, SectionHeadingComponent],
  templateUrl: 'about.component.html',
  styleUrl: 'about.component.scss',
})
export class AboutComponent {
  private readonly language = inject(LanguageService);

  protected readonly about = computed(() => this.language.content().about);
  protected readonly education = EDUCATION;
  protected readonly languages = computed(() => buildLanguages(this.language.content().languages));
  protected readonly languagesTitle = computed(() => this.language.content().languages.title);
  protected readonly levels = [1, 2, 3, 4, 5];
}
