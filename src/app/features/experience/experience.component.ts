import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { LanguageService } from '../../core/i18n/language.service';
import { buildJobs } from '../../core/util/jobs';
import { COMPANIES } from '../../data/experience';
import { CompanyId } from '../../data/data.model';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { SpotlightDirective } from '../../shared/directives/spotlight.directive';
import { IconComponent } from '../../shared/ui/icon.component';
import { SectionHeadingComponent } from '../../shared/ui/section-heading.component';

@Component({
  selector: 'app-experience',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, SpotlightDirective, IconComponent, SectionHeadingComponent],
  templateUrl: 'experience.component.html',
  styleUrl: 'experience.component.scss',
})
export class ExperienceComponent {
  private readonly language = inject(LanguageService);

  protected readonly text = computed(() => this.language.content().experience);
  /** One job open at a time; the most recent starts expanded */
  protected readonly openId = signal<CompanyId | null>(COMPANIES[0].id);

  protected readonly jobs = computed(() => buildJobs(this.text(), this.language.locale()));

  protected toggle(id: CompanyId) {
    this.openId.update((current) => (current === id ? null : id));
  }
}
