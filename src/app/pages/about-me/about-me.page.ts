import { Component } from '@angular/core';
import { IonContent, IonLabel } from '@ionic/angular';
import { AppHeaderComponent } from '../../components/app-header/app-header.component';

@Component({
  selector: 'app-about-me',
  templateUrl: 'about-me.page.html',
  imports: [IonContent, IonLabel, AppHeaderComponent],
})
export class AboutMePage {
  // TODO: skills section (see data/skills.ts and app-skill), still TBD as in the Vue app
}
