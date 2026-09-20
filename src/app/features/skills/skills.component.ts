import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { LanguageService } from '../../core/i18n/language.service';
import { SKILL_GROUPS } from '../../data/skills';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { SpotlightDirective } from '../../shared/directives/spotlight.directive';
import { SectionHeadingComponent } from '../../shared/ui/section-heading.component';

@Component({
  selector: 'app-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, SpotlightDirective, SectionHeadingComponent],
  templateUrl: 'skills.component.html',
  styleUrl: 'skills.component.scss',
})
export class SkillsComponent {
  private readonly language = inject(LanguageService);
  protected readonly text = computed(() => this.language.content().skills);

  protected readonly groups = computed(() =>
    SKILL_GROUPS.map((group) => {
      const copy = this.text().groups[group.id];
      return { id: group.id, ...copy, items: copy.items ?? group.items };
    }),
  );
}
