import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { ScoresService } from '../app/services/scores.service';
import { MatTooltipModule, TooltipComponent } from '@angular/material/tooltip';


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
  active;
  scores = [0, 0, 0, 0];
  horsesImg = [];

  constructor(private service: ScoresService, private router: Router) {
    this.horsesImg.push('assets/img/red-horse.png', 'assets/img/green-horse.png',
      'assets/img/yellow-horse.png', 'assets/img/blue-horse.png');
  }

  OnInit(): void {
  }
  getScore(i: number) {
    return this.service.horsesScore[i];
  }
  getIndex() {
    if (this.router.url === '/grid-master') {
      return 1;
    }
    if (this.router.url === '/horse-master') {
      return 2;
    }
    return 0;
  }
  openRules() {
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
