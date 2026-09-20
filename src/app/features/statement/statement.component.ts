import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { LanguageService } from '../../core/i18n/language.service';
import { tokenizeStatement } from '../../core/util/statement';
import { ScrollProgressDirective } from '../../shared/directives/scroll-progress.directive';

/** A pinned, full-screen sentence that lights up word by word as you scroll through it. */
@Component({
  selector: 'app-statement',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollProgressDirective],
  templateUrl: 'statement.component.html',
  styleUrl: 'statement.component.scss',
})
export class StatementComponent {
  private readonly language = inject(LanguageService);
  protected readonly words = computed(() => tokenizeStatement(this.language.content().statement));
}
