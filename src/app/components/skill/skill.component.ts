import { Component, OnInit, input, signal } from '@angular/core';
import { IonIcon } from '@ionic/angular';
import { Skill } from '../../models/skill.model';

@Component({
  selector: 'app-skill',
  templateUrl: 'skill.component.html',
  styleUrls: ['skill.component.scss'],
  imports: [IonIcon],
})
export class SkillComponent implements OnInit {
  readonly skill = input.required<Skill>();
  readonly progressWidth = signal('0%');

  ngOnInit() {
    this.startAnimation();
  }

  startAnimation() {
    this.progressWidth.set('0%');
    setTimeout(() => this.progressWidth.set(`${this.skill().percentage}%`), 100);
  }
}
