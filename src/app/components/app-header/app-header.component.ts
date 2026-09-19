import { Component, inject } from '@angular/core';
import { IonHeader } from '@ionic/angular';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'app-header',
  templateUrl: 'app-header.component.html',
  imports: [IonHeader],
})
export class AppHeaderComponent {
  readonly hasNotch = inject(DeviceService).hasNotch;
}
