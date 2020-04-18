import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fade', [
      state('visible', style({
      })),
      state('invisible', style({
        opacity: 0,
        height: 0
      })),
      transition('visible => invisible', [
        animate('0.3s')
      ]),
      transition('invisible => visible', [
        animate('0.3s')
      ]),
    ]),
  ]
})
export class AppComponent {
  title = 'rowmaster';
  rules = false;
  isActive = false;
  index = 0;
  chaine;

  openRules(i) {
    this.index = i;
    this.rules = true;
  }
  closeRules() {
    this.rules = !this.rules;
  }
}
