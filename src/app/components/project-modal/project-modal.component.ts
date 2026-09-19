import { Component, inject, input } from '@angular/core';
import { IonCard, IonContent, IonHeader, IonIcon, IonLabel, ModalController } from '@ionic/angular';
import { arrowBackCircleOutline } from 'ionicons/icons';
import { Project } from '../../models/project.model';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'app-project-modal',
  templateUrl: 'project-modal.component.html',
  styleUrls: ['project-modal.component.scss'],
  imports: [IonCard, IonContent, IonHeader, IonIcon, IonLabel],
})
export class ProjectModalComponent {
  private readonly modalCtrl = inject(ModalController);

  readonly hasNotch = inject(DeviceService).hasNotch;
  readonly project = input.required<Project>();
  readonly arrowBackCircleOutline = arrowBackCircleOutline;

  back() {
    this.modalCtrl.dismiss();
  }
}
