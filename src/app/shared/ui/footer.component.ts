import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { LanguageService } from '../../core/i18n/language.service';
import { PROFILE } from '../../data/profile';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
  template: `
    <footer class="container">
      <p>© {{ year }} {{ name }} · {{ text().built }}</p>
      <a class="top" href="#top" (click)="toTop($event)">
        {{ label() }}
        <app-icon name="arrow-up" />
      </a>
    </footer>
  `,
  styles: `
    footer {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding-block: 2rem 3rem;
      border-top: 1px solid var(--border);
      font-size: 0.85rem;
      color: var(--text-subtle);
    }
    .top {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      color: var(--text-muted);
      transition: color 0.3s;
      &:hover {
        color: var(--text);
      }
    }
  `,
})
export class FooterComponent {
  private readonly language = inject(LanguageService);
  protected readonly text = computed(() => this.language.content().footer);
  protected readonly label = computed(() => this.language.content().a11y.backToTop);
  protected readonly name = PROFILE.name;
  protected readonly year = new Date().getFullYear();

  protected toTop(event: Event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
