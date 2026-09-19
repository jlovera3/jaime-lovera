import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { LanguageService } from '../../core/i18n/language.service';
import { formatDuration, formatMonth, monthsBetween } from '../../core/util/duration';
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

  /** Neutral facts (dates, logos, projects) joined with the localized copy */
  protected readonly jobs = computed(() => {
    const t = this.text();
    const locale = this.language.locale();
    return COMPANIES.map((company) => {
      const copy = t.companies[company.id];
      const range = (from: string, to: string | null | undefined) =>
        `${formatMonth(from, locale)} — ${to ? formatMonth(to, locale) : t.present}`;
      const engagements = (company.engagements ?? []).map((engagement) => ({
        ...engagement,
        ...t.engagements[engagement.id],
        period: engagement.start ? range(engagement.start, engagement.end) : null,
      }));
      return {
        ...company,
        engagements,
        role: copy.role,
        highlights: copy.highlights,
        period: range(company.start, company.end),
        duration: formatDuration(monthsBetween(company.start, company.end), t.units),
        appsLabel: t.apps[company.projects.length === 1 ? 0 : 1],
      };
    });
  });

  protected toggle(id: CompanyId) {
    this.openId.update((current) => (current === id ? null : id));
  }
}
