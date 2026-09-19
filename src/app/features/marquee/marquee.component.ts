import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SKILL_GROUPS } from '../../data/skills';

const ALL = SKILL_GROUPS.filter((g) => g.id !== 'craft').flatMap((g) => g.items);
const MID = Math.ceil(ALL.length / 2);

/** Two rows of technologies scrolling in opposite directions. Purely decorative, hence aria-hidden. */
@Component({
  selector: 'app-marquee',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="marquee" aria-hidden="true">
      @for (row of rows; track $index) {
        <div class="row" [class.row--reverse]="$index === 1">
          <!-- The list is rendered twice so the -50% translate loops seamlessly -->
          @for (copy of [0, 1]; track copy) {
            <ul class="track">
              @for (item of row; track item) {
                <li><span class="star">✦</span>{{ item }}</li>
              }
            </ul>
          }
        </div>
      }
    </div>
  `,
  styleUrl: 'marquee.component.scss',
})
export class MarqueeComponent {
  protected readonly rows = [ALL.slice(0, MID), ALL.slice(MID)];
}
