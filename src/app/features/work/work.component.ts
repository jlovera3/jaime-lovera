import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { LanguageService } from '../../core/i18n/language.service';
import { COMPANIES } from '../../data/experience';
import { CompanyId } from '../../data/data.model';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { SpotlightDirective } from '../../shared/directives/spotlight.directive';
import { IconComponent } from '../../shared/ui/icon.component';
import { SectionHeadingComponent } from '../../shared/ui/section-heading.component';

type Filter = CompanyId | 'all';

@Component({
  selector: 'app-work',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, SpotlightDirective, IconComponent, SectionHeadingComponent],
  templateUrl: 'work.component.html',
  styleUrl: 'work.component.scss',
})
export class WorkComponent {
  private readonly language = inject(LanguageService);
  protected readonly text = computed(() => this.language.content().work);
  protected readonly companies = COMPANIES.map(({ id, name }) => ({ id, name }));
  protected readonly filter = signal<Filter>('all');

  private readonly allApps = COMPANIES.flatMap((company) =>
    company.projects.map((project) => ({ ...project, companyId: company.id, company: company.name })),
  );

  protected readonly apps = computed(() =>
    this.allApps.filter((app) => this.filter() === 'all' || app.companyId === this.filter()),
  );
}
