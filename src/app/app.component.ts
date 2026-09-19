import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IntroService } from './core/intro/intro.service';
import { LanguageService } from './core/i18n/language.service';
import { AboutComponent } from './features/about/about.component';
import { ContactComponent } from './features/contact/contact.component';
import { ExperienceComponent } from './features/experience/experience.component';
import { HeroComponent } from './features/hero/hero.component';
import { MarqueeComponent } from './features/marquee/marquee.component';
import { NavComponent } from './features/nav/nav.component';
import { SkillsComponent } from './features/skills/skills.component';
import { SplashComponent } from './features/splash/splash.component';
import { WorkComponent } from './features/work/work.component';
import { FooterComponent } from './shared/ui/footer.component';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SplashComponent,
    NavComponent,
    HeroComponent,
    MarqueeComponent,
    AboutComponent,
    ExperienceComponent,
    WorkComponent,
    SkillsComponent,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.scss',
})
export class AppComponent {
  protected readonly intro = inject(IntroService);
  protected readonly content = inject(LanguageService).content;
}
