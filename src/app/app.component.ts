import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ScoresService } from '../app/services/scores.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class AppComponent {
  title = 'rowmaster';
  rules = false;
  isActive = false;
  index = 0;

  constructor(private service: ScoresService) {
  }

  openRules(i: number) {
    this.index = i;
    this.rules = true;
  }
  closeRules() {
    this.rules = !this.rules;
  }
  getScore1() {
    return this.service.j1Score;
  }
  getScore2() {
    return this.service.j2Score;
  }
}
