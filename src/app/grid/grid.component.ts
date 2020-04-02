import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  gridContent = [];
  playerToken = [];
  buttons = [];
  init = '/assets/emptyCase.png';
  count = 0;
  gridIsFull = false;
  thereIsAWinner = false;
  winnerName;

  constructor() {
    this.initialisation();
    this.playerToken[0] = '/assets/blueToken.png';
    this.playerToken[1] = '/assets/greenToken.png';
    for (let i = 0; i < 7; i++) {
      this.buttons[i] = '/assets/blankArrow.png';
    }
  }
  ngOnInit(): void {

  }
  initialisation() {
    for (let i = 0; i < 7; i++) {
      this.gridContent[i] = [];
    }
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 6; j++) {
        this.gridContent[i][j] = this.init;
      }
    }
  }
  placeToken(column) {
    if (!this.gridIsFull && !this.thereIsAWinner) {
      for (let i = 5; i > -1; i--) {
        if (this.gridContent[column][i] === this.init) {
          this.gridContent[column][i] = this.playerToken[this.count % 2];
          this.count++;
          i = -1;
          this.winCheck();
        }
      }
    }
  }
  winCheck() {
    for (let c = 0; c < 7; c++) { //column check
      for (let r = 0; r < 3; r++) {
        if (this.gridContent[c][r] !== this.init &&
          this.gridContent[c][r] === this.gridContent[c][r + 1] &&
          this.gridContent[c][r] === this.gridContent[c][r + 2] &&
          this.gridContent[c][r] === this.gridContent[c][r + 3]) {
          this.thereIsAWinner = true;
          this.winnerName = this.gridContent[c][r];
        }
      }
    }
    for (let c = 0; c < 4; c++) { //row check
      for (let r = 0; r < 6; r++) {
        if (this.gridContent[c][r] !== this.init &&
          this.gridContent[c][r] === this.gridContent[c + 1][r] &&
          this.gridContent[c][r] === this.gridContent[c + 2][r] &&
          this.gridContent[c][r] === this.gridContent[c + 3][r]) {
          this.thereIsAWinner = true;
          this.winnerName = this.gridContent[c][r];
        }
      }
    }
    for (let c = 0; c < 4; c++) { // '\' check
      for (let r = 0; r < 3; r++) {
        if (this.gridContent[c][r] !== this.init &&
          this.gridContent[c][r] === this.gridContent[c + 1][r + 1] &&
          this.gridContent[c][r] === this.gridContent[c + 2][r + 2] &&
          this.gridContent[c][r] === this.gridContent[c + 3][r + 3]) {
          this.thereIsAWinner = true;
          this.winnerName = this.gridContent[c][r];
        }
      }
    }
    for (let c = 3; c < 7; c++) { // '/' check
      for (let r = 0; r < 3; r++) {
        if (this.gridContent[c][r] !== this.init &&
          this.gridContent[c][r] === this.gridContent[c - 1][r + 1] &&
          this.gridContent[c][r] === this.gridContent[c - 2][r + 2] &&
          this.gridContent[c][r] === this.gridContent[c - 3][r + 3]) {
          this.thereIsAWinner = true;
          this.winnerName = this.gridContent[c][r];
        }
      }
    }

    let check = true;
    for (let i = 0; i < 7; i++) {
      if (this.gridContent[i][0] === this.init) {
        check = false;
      }
    }
    if (check) {
      this.gridIsFull = true;
    }
  }
  playAgain() {
    this.initialisation();
    this.gridIsFull = false;
    this.thereIsAWinner = false;
  }
  onMouseOver(index) {
    this.buttons[index] = '/assets/arrow.png';
  }
  onMouseOut(index) {
    this.buttons[index] = '/assets/blankArrow.png';
  }
}
