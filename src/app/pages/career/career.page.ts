import { Component, inject } from '@angular/core';
import { IonCard, IonCardContent, IonContent, ModalController } from '@ionic/angular';
import { AppHeaderComponent } from '../../components/app-header/app-header.component';
import { CompanyModalComponent } from '../../components/company-modal/company-modal.component';
import { COMPANIES } from '../../data/companies';
import { Company } from '../../models/company.model';

@Component({
  selector: 'app-career',
  templateUrl: 'career.page.html',
  imports: [IonCard, IonCardContent, IonContent, AppHeaderComponent],
})
export class CareerPage {
  private readonly modalCtrl = inject(ModalController);

  readonly companies = COMPANIES;

  async openDetails(company: Company) {
    const modal = await this.modalCtrl.create({
      component: CompanyModalComponent,
      componentProps: { company },
    });
    await modal.present();
  }
}
