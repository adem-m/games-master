import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ScoresService } from '../services/scores.service';

@Component({
  selector: 'app-grille',
  templateUrl: './grille.component.html',
  styleUrls: ['./grille.component.scss'],
  animations: [
    trigger('fade', [
      state('visible', style({
        opacity: 1
      })),
      state('invisible', style({
        opacity: 0
      })),
      transition('visible => invisible', [
        animate('0.3s')
      ]),
      transition('invisible => visible', [
        animate('0.3s')
      ]),
    ])
  ]
})
export class GrilleComponent implements OnInit {

  round = 1;
  signes = new Map();
  ended = false;
  draw = false;
  endText: string;
  lastIndex = -1;

  @Input() xName: string;
  @Input() oName: string;

  constructor(private service: ScoresService) {
  }

  ngOnInit(): void {
    for (let i = 0; i < 9; i++) {
      this.signes.set(i, 'assets/img/blankIcon.png');
    }
    this.xName = 'X';
    this.oName = 'O';
  }
  whatSign(index) {
    if (this.round % 2 === 0) {
      if (this.signes.get(index) === 'assets/img/blankIcon.png' && !this.ended) {
        this.signes.set(index, 'assets/img/oIcon.png');
        this.lastIndex = index;
        this.round++;
        this.verif();
      }
    } else {
      if (this.signes.get(index) === 'assets/img/blankIcon.png' && !this.ended) {
        this.signes.set(index, 'assets/img/xIcon.png');
        this.lastIndex = index;
        this.round++;
        this.verif();
      }
    }
  }
  verif() {
    for (let i = 0; i < 7; i += 3) {
      if (this.signes.get(i) === this.signes.get(i + 1) && this.signes.get(i) === this.signes.get(i + 2)
        && this.signes.get(i) !== 'assets/img/blankIcon.png') {
        this.ended = true;
      }
    }
    for (let i = 0; i < 3; i++) {
      if (this.signes.get(i) === this.signes.get(i + 3) && this.signes.get(i) === this.signes.get(i + 6)
        && this.signes.get(i) !== 'assets/img/blankIcon.png') {
        this.ended = true;
      }
    }
    if (this.signes.get(0) === this.signes.get(4) && this.signes.get(0) === this.signes.get(8)
      && this.signes.get(0) !== 'assets/img/blankIcon.png') {
      this.ended = true;
    }
    if (this.signes.get(2) === this.signes.get(4) && this.signes.get(2) === this.signes.get(6)
      && this.signes.get(2) !== 'assets/img/blankIcon.png') {
      this.ended = true;
    }
    if (this.ended) {
      this.endText = 'Bien joué ';
      if (this.signes.get(this.lastIndex) === 'assets/img/oIcon.png') {
        this.service.j2ScoreUpdate();
      } else if (this.signes.get(this.lastIndex) === 'assets/img/xIcon.png') {
        this.service.j1ScoreUpdate();
      }
    }
    let j = 0;
    for (let i = 0; i < 9; i++) {
      if (this.signes.get(i) !== 'assets/img/blankIcon.png') {
        j++;
      }
    }
    if (j === 9 && !this.ended) {
      this.draw = true;
      this.ended = true;
      this.endText = 'Match nul';
    }
  }
  playAgain() {
    for (let i = 0; i < 9; i++) {
      this.signes.set(i, 'assets/img/blankIcon.png');
    }
    this.ended = false;
    this.draw = false;
  }
  whoWon() {
    if (this.signes.get(this.lastIndex) === 'assets/img/oIcon.png') {
      return this.oName;
    } else {
      return this.xName;
    }
  }
  whosNext() {
    if (this.round % 2 === 0) {
      if (this.oName.length === 0) {
        return 'O';
      } else {
        return this.oName;
      }
    } else {
      if (this.xName.length === 0) {
        return 'X';
      } else {
        return this.xName;
      }
    }
  }
}
