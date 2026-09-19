import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { LanguageService } from '../../core/i18n/language.service';
import { PROFILE } from '../../data/profile';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { IconComponent } from '../../shared/ui/icon.component';
import { SectionHeadingComponent } from '../../shared/ui/section-heading.component';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, IconComponent, SectionHeadingComponent],
  templateUrl: 'contact.component.html',
  styleUrl: 'contact.component.scss',
})
export class ContactComponent {
  private readonly language = inject(LanguageService);
  protected readonly text = computed(() => this.language.content().contact);
  protected readonly email = PROFILE.email;
  protected readonly links = PROFILE.links;
  protected readonly copied = signal(false);

  private timer?: ReturnType<typeof setTimeout>;

  protected async copy() {
    try {
      await navigator.clipboard.writeText(this.email);
    } catch {
      return; // Clipboard unavailable: the mailto button is still there
    }
    this.copied.set(true);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.copied.set(false), 2000);
  }
}
