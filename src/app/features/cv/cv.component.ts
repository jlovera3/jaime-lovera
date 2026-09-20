import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { CONTENT, LOCALES } from '../../content';
import { Lang } from '../../core/i18n/content.model';
import { buildJobs } from '../../core/util/jobs';
import { buildLanguages } from '../../core/util/languages';
import { EDUCATION } from '../../data/education';
import { PROFILE } from '../../data/profile';
import { SKILL_GROUPS } from '../../data/skills';

/**
 * Printable, single-column CV rendered from the same data as the site.
 * Visit `/?cv=en` or `/?cv=es`; `npm run cv` prints both to PDF.
 */
@Component({
  selector: 'app-cv',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'cv.component.html',
  styleUrl: 'cv.component.scss',
})
export class CvComponent {
  private readonly doc = inject(DOCUMENT);

  readonly lang = input.required<Lang>();

  protected readonly t = computed(() => CONTENT[this.lang()]);
  protected readonly name = PROFILE.name;
  protected readonly email = PROFILE.email;
  protected readonly education = EDUCATION;

  protected readonly contact = computed(() => [
    { label: PROFILE.email, href: `mailto:${PROFILE.email}` },
    ...PROFILE.links.map((link) => ({ label: this.display(link.url), href: link.url })),
    { label: this.display(PROFILE.website), href: PROFILE.website },
  ]);

  protected readonly jobs = computed(() =>
    buildJobs(this.t().experience, LOCALES[this.lang()]).map((job) => ({
      ...job,
      // Companies with client engagements describe their work there; the others list their apps
      apps: job.engagements.length ? '' : job.projects.map((p) => p.name).join(', '),
    })),
  );

  protected readonly languages = computed(() => buildLanguages(this.t().languages));

  protected readonly skills = computed(() =>
    SKILL_GROUPS.map((group) => ({
      title: this.t().skills.groups[group.id].title,
      items: (this.t().skills.groups[group.id].items ?? group.items).join(' · '),
    })),
  );

  constructor() {
    effect(() => {
      const root = this.doc.documentElement;
      root.lang = this.lang();
      root.classList.add('cv-mode');
      this.doc.title = `${PROFILE.name} — CV`;
    });
  }

  private display(url: string): string {
    return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
  }
}
