import { Component, OnInit, inject, input, signal } from '@angular/core';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  ModalController,
} from '@ionic/angular';
import { closeOutline } from 'ionicons/icons';
import { Company } from '../../models/company.model';
import { ProjectComponent } from '../project/project.component';

@Component({
  selector: 'app-company-modal',
  templateUrl: 'company-modal.component.html',
  styleUrls: ['company-modal.component.scss'],
  imports: [IonCard, IonCardContent, IonCardHeader, IonContent, IonHeader, IonIcon, IonItem, IonLabel, ProjectComponent],
})
export class CompanyModalComponent implements OnInit {
  private readonly modalCtrl = inject(ModalController);

  readonly company = input.required<Company>();
  readonly animatedProjects = signal<number[]>([]);
  readonly closeOutline = closeOutline;

  ngOnInit() {
    this.company().projects.forEach((_, index) => {
      setTimeout(() => this.animatedProjects.update((list) => [...list, index]), index * 100);
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
