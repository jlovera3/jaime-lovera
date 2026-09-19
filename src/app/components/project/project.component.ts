import { Component, inject, input } from '@angular/core';
import { IonCard, ModalController } from '@ionic/angular';
import { Project } from '../../models/project.model';
import { ProjectModalComponent } from '../project-modal/project-modal.component';

@Component({
  selector: 'app-project',
  templateUrl: 'project.component.html',
  imports: [IonCard],
})
export class ProjectComponent {
  private readonly modalCtrl = inject(ModalController);

  readonly project = input.required<Project>();

  async openProject() {
    const modal = await this.modalCtrl.create({
      component: ProjectModalComponent,
      componentProps: { project: this.project() },
    });
    await modal.present();
  }
}
