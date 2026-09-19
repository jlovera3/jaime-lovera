import { Component } from '@angular/core';
import { IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList } from '@ionic/angular';
import { locationOutline } from 'ionicons/icons';
import { AppHeaderComponent } from '../../components/app-header/app-header.component';

@Component({
  selector: 'app-intro',
  templateUrl: 'intro.page.html',
  imports: [IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, AppHeaderComponent],
})
export class IntroPage {
  readonly locationOutline = locationOutline;
}
