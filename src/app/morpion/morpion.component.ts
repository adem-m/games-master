import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ScoresService } from '../services/scores.service';

@Component({
  selector: 'app-morpion',
  templateUrl: './morpion.component.html',
  styleUrls: ['./morpion.component.scss'],
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
export class MorpionComponent implements OnInit {

  title = 'morpion';

  xName: string;
  oName: string;
  xScore = 0;
  oScore = 0;

  round = 1;
  signes = new Map();
  ended = false;
  draw = false;
  endText: string;
  lastIndex = -1;

  constructor(private service: ScoresService) {
  }

  ngOnInit(): void {
    for (let i = 0; i < 9; i++) {
      this.signes.set(i, 'assets/img/blankIcon.png');
    }
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
      this.endText = 'Victoire de ';
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
  whosNextName() {
    if (this.round % 2 === 1) {
      return this.service.j1Name;
    }
    return this.service.j2Name;
  }
  apostrophe() {
    for (const vowel of this.service.vowels) {
      if (this.whosNextName()[0] === vowel) {
        return '\'';
      }
    }
    return 'e ';
  }
  whosNextImg() {
    if (this.round % 2 === 0) {
      return 'assets/img/oIcon.png';
    } else {
      return 'assets/img/xIcon.png';
    }
  }

  setXName(name: string) {
    this.xName = name;
  }

  setOName(name: string) {
    this.oName = name;
  }

  setXScore(score: number) {
    this.xScore = score;
  }

  setOScore(score: number) {
    this.oScore = score;
  }
}
