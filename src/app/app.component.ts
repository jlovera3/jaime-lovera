import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IntroService } from './core/intro/intro.service';
import { LanguageService } from './core/i18n/language.service';
import { AboutComponent } from './features/about/about.component';
import { cvLang } from './core/print/cv-mode';
import { ContactComponent } from './features/contact/contact.component';
import { CvComponent } from './features/cv/cv.component';
import { ExperienceComponent } from './features/experience/experience.component';
import { HeroComponent } from './features/hero/hero.component';
import { ImpactComponent } from './features/impact/impact.component';
import { MarqueeComponent } from './features/marquee/marquee.component';
import { NavComponent } from './features/nav/nav.component';
import { SkillsComponent } from './features/skills/skills.component';
import { StatementComponent } from './features/statement/statement.component';
import { SplashComponent } from './features/splash/splash.component';
import { WorkComponent } from './features/work/work.component';
import { ScrollProgressDirective } from './shared/directives/scroll-progress.directive';
import { CursorLightComponent } from './shared/ui/cursor-light.component';
import { FooterComponent } from './shared/ui/footer.component';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CvComponent,
    CursorLightComponent,
    ScrollProgressDirective,
    SplashComponent,
    NavComponent,
    HeroComponent,
    MarqueeComponent,
    StatementComponent,
    AboutComponent,
    ImpactComponent,
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
  /** Set when the printable CV is requested (`?cv=en|es`) */
  protected readonly cv = cvLang();
  protected readonly intro = inject(IntroService);
  protected readonly content = inject(LanguageService).content;
}
