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
  ],
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
  getName1() {
    return this.service.j1Name;
  }
  getName2() {
    return this.service.j2Name;
  }
  setName1(name: string) {
    if (name.length === 0) {
      this.service.j1Name = 'Joueur 1';
    } else {
      this.service.j1Name = name;
    }
  }
  setName2(name: string) {
    if (name.length === 0) {
      this.service.j2Name = 'Joueur 2';
    } else {
      this.service.j2Name = name;
    }
  }
}
