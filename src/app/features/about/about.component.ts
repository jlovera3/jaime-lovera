import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { LanguageService } from '../../core/i18n/language.service';
import { monthsBetween } from '../../core/util/duration';
import { COMPANIES } from '../../data/experience';
import { EDUCATION } from '../../data/education';
import { PROFILE } from '../../data/profile';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { SpotlightDirective } from '../../shared/directives/spotlight.directive';
import { CountUpComponent } from '../../shared/ui/count-up.component';
import { IconComponent } from '../../shared/ui/icon.component';
import { SectionHeadingComponent } from '../../shared/ui/section-heading.component';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RevealDirective,
    SpotlightDirective,
    CountUpComponent,
    IconComponent,
    SectionHeadingComponent,
  ],
  templateUrl: 'about.component.html',
  styleUrl: 'about.component.scss',
})
export class AboutComponent {
  private readonly language = inject(LanguageService);

  protected readonly about = computed(() => this.language.content().about);
  protected readonly education = EDUCATION;

  /** Derived from the data, so it never goes stale or out of sync with the rest of the page */
  protected readonly stats = computed(() => {
    const labels = this.about().stats;
    const storeApps = COMPANIES.flatMap((c) => c.projects).filter(
      (p) => p.googleUrl || p.appleUrl,
    ).length;
    return [
      { value: Math.floor(monthsBetween(PROFILE.careerStart, null) / 12), suffix: '+', label: labels.years },
      { value: COMPANIES.length, suffix: '', label: labels.companies },
      { value: storeApps, suffix: '', label: labels.apps },
    ];
  });
}
