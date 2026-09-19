import { Component } from '@angular/core';
import { IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs } from '@ionic/angular';
import { atCircleOutline, bagHandleOutline, homeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage {
  readonly homeOutline = homeOutline;
  readonly bagHandleOutline = bagHandleOutline;
  readonly atCircleOutline = atCircleOutline;
}
