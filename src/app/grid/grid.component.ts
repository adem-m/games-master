import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Observable, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  animations: [
    trigger('fade', [
      state('visible', style({
        opacity: 1,
      })),
      state('invisible', style({
        opacity: 0,
        height: 0,
        margin: 0,
        padding: 0
      })),
      transition('visible => invisible', [
        animate('0.3s')
      ]),
      transition('invisible => visible', [
        animate('0.3s')
      ]),
    ]),
    trigger('blink', [
      state('visible', style({
        opacity: 1
      })),
      state('invisible', style({
        opacity: 0
      })),
      transition('visible <=> invisible', [
        animate('0.3s')
      ]),
    ]),
  ],
})
export class GridComponent implements OnInit {

  gridContent = [];
  playerToken = [];
  buttons = [];
  init = 'assets/emptyCase.png';
  count = 0;
  draw = false;
  thereIsAWinner = false;
  firstMove = true;
  counterSubscription: Subscription = null;
  winnerName;


  constructor() {
    this.initialisation();
    this.playerToken[0] = 'assets/blueToken.png';
    this.playerToken[1] = 'assets/purpleToken.png';
    for (let i = 0; i < 7; i++) {
      this.buttons[i] = 'assets/blankArrow.png';
    }
  }
  ngOnInit(): void {
  }
  ngOnDestroy() {
    if (this.counterSubscription !== null) {
      this.counterSubscription.unsubscribe();
    }
  }
  initialisation() {
    for (let i = 0; i < 7; i++) {
      this.gridContent[i] = [];
    }
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 6; j++) {
        this.gridContent[i][j] = [];
        this.gridContent[i][j][0] = this.init;
        this.gridContent[i][j][1] = false;
      }
    }
    if (this.counterSubscription !== null) {
      this.counterSubscription.unsubscribe();
    }
  }
  placeToken(column) {
    if (!this.draw && !this.thereIsAWinner) {
      for (let i = 5; i > -1; i--) {
        if (this.gridContent[column][i][0] === this.init) {
          this.gridContent[column][i][0] = this.playerToken[this.count % 2];
          this.count++;
          i = -1;
          this.winCheck();
          this.firstMove = false;
        }
      }
    }
  }
  winCheck() {
    for (let c = 0; c < 7; c++) { //column check
      for (let r = 0; r < 3; r++) {
        if (this.gridContent[c][r][0] !== this.init &&
          this.gridContent[c][r][0] === this.gridContent[c][r + 1][0] &&
          this.gridContent[c][r][0] === this.gridContent[c][r + 2][0] &&
          this.gridContent[c][r][0] === this.gridContent[c][r + 3][0] && !this.thereIsAWinner) {
          this.thereIsAWinner = true;
          this.winnerName = this.gridContent[c][r][0];
          this.makeBlink(c, r, c, r + 1, c, r + 2, c, r + 3);
        }
      }
    }
    for (let c = 0; c < 4; c++) { //row check
      for (let r = 0; r < 6; r++) {
        if (this.gridContent[c][r][0] !== this.init &&
          this.gridContent[c][r][0] === this.gridContent[c + 1][r][0] &&
          this.gridContent[c][r][0] === this.gridContent[c + 2][r][0] &&
          this.gridContent[c][r][0] === this.gridContent[c + 3][r][0] && !this.thereIsAWinner) {
          this.thereIsAWinner = true;
          this.winnerName = this.gridContent[c][r][0];
          this.makeBlink(c, r, c + 1, r, c + 2, r, c + 3, r);
        }
      }
    }
    for (let c = 0; c < 4; c++) { // '\' check
      for (let r = 0; r < 3; r++) {
        if (this.gridContent[c][r][0] !== this.init &&
          this.gridContent[c][r][0] === this.gridContent[c + 1][r + 1][0] &&
          this.gridContent[c][r][0] === this.gridContent[c + 2][r + 2][0] &&
          this.gridContent[c][r][0] === this.gridContent[c + 3][r + 3][0] && !this.thereIsAWinner) {
          this.thereIsAWinner = true;
          this.winnerName = this.gridContent[c][r][0];
          this.makeBlink(c, r, c + 1, r + 1, c + 2, r + 2, c + 3, r + 3);
        }
      }
    }
    for (let c = 3; c < 7; c++) { // '/' check
      for (let r = 0; r < 3; r++) {
        if (this.gridContent[c][r][0] !== this.init &&
          this.gridContent[c][r][0] === this.gridContent[c - 1][r + 1][0] &&
          this.gridContent[c][r][0] === this.gridContent[c - 2][r + 2][0] &&
          this.gridContent[c][r][0] === this.gridContent[c - 3][r + 3][0] && !this.thereIsAWinner) {
          this.thereIsAWinner = true;
          this.winnerName = this.gridContent[c][r][0];
          this.makeBlink(c, r, c - 1, r + 1, c - 2, r + 2, c - 3, r + 3);
        }
      }
    }

    let check = true;
    for (let i = 0; i < 7; i++) {
      if (this.gridContent[i][0][0] === this.init) {
        check = false;
      }
    }
    if (check) {
      this.draw = true;
    }
  }
  playAgain() {
    this.initialisation();
    this.draw = false;
    this.thereIsAWinner = false;
  }
  onMouseOver(index) {
    this.buttons[index] = 'assets/arrow.svg';
  }
  onMouseOut(index) {
    this.buttons[index] = 'assets/blankArrow.png';
  }
  makeBlink(c1, r1, c2, r2, c3, r3, c4, r4) {
    const counter = interval(500);
    if (this.thereIsAWinner) {
      this.counterSubscription = counter.subscribe(
        (value) => {
          this.gridContent[c1][r1][1] = !this.gridContent[c1][r1][1];
          this.gridContent[c2][r2][1] = !this.gridContent[c2][r2][1];
          this.gridContent[c3][r3][1] = !this.gridContent[c3][r3][1];
          this.gridContent[c4][r4][1] = !this.gridContent[c4][r4][1];
        },
        (error) => {
          console.log('Uh-oh, an error occurred! : ' + error);
        },
        () => {
          console.log('Observable complete!');
        }
      );
    }
  }
}