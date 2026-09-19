import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RevealDirective } from '../directives/reveal.directive';

@Component({
  selector: 'app-section-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective],
  template: `
    <p class="eyebrow" appReveal>
      <span class="index">{{ index() }}</span>
      <span class="rule"></span>
      {{ eyebrow() }}
    </p>
    <h2 [appReveal]="80">{{ title() }}</h2>
    @if (subtitle()) {
      <p class="subtitle" [appReveal]="160">{{ subtitle() }}</p>
    }
  `,
  styles: `
    :host {
      display: block;
      max-width: 46rem;
    }
    .eyebrow {
      margin-bottom: 1.25rem;
    }
    .index {
      color: var(--accent);
    }
    .rule {
      width: 2.5rem;
      height: 1px;
      background: var(--border-strong);
    }
    h2 {
      font-size: var(--text-h2);
      line-height: 1.05;
      letter-spacing: -0.035em;
      font-weight: 600;
      text-wrap: balance;
    }
    .subtitle {
      margin-top: 1.25rem;
      font-size: var(--text-lead);
      color: var(--text-muted);
      text-wrap: pretty;
    }
  `,
})
export class SectionHeadingComponent {
  readonly index = input.required<string>();
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly subtitle = input<string>();
}
