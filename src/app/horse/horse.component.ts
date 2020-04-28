import { Component, OnInit } from '@angular/core';
import { ScoresService } from '../services/scores.service';
import { Case } from '../case';
import { Player } from '../player';

@Component({
  selector: 'app-horse',
  templateUrl: './horse.component.html',
  styleUrls: ['./horse.component.scss']
})

export class HorseComponent implements OnInit {

  cases = [];
  order = [7, 8, 23, 38, 53, 68, 83, 98, 99, 100, 101, 102, 103, 104, 119, 134, 133, 132,
    131, 130, 129, 128, 143, 158, 173, 188, 203, 218, 217, 216, 201, 186, 171, 156, 141,
    126, 125, 124, 123, 122, 121, 120, 105, 90, 91, 92, 93, 94, 95, 96, 81, 66, 51, 36, 21, 6];
  bases = [27, 28, 42, 43, 192, 193, 207, 208, 181, 182, 196, 197, 16, 17, 31, 32];
  horses: Player[] = [];
  horsesImg = [];
  dice;
  dicesImg = [];
  turn = 0;
  gameEnded = false;
  canPlay = false;

  constructor(private service: ScoresService) {
    this.horsesImg.push('assets/img/red-horse.png', 'assets/img/green-horse.png',
      'assets/img/yellow-horse.png', 'assets/img/blue-horse.png');
    this.dicesImg.push('assets/img/dice-one.png', 'assets/img/dice-two.png', 'assets/img/dice-three.png',
      'assets/img/dice-four.png', 'assets/img/dice-five.png', 'assets/img/dice-six.png');
    for (let i = 0; i < 15 * 15; i++) {
      this.cases.push(new Case(i));
      for (const num of this.order) {
        if (this.cases[i].index === num) {
          this.cases[i].content = 'assets/img/empty-case.png';
        }
      }
    }

    for (let i = 0; i < this.bases.length; i++) {
      if (i < 4) {
        this.horses.push(new Player(i, 0, this.bases[i], this.bases[i], 8, 1,
          'assets/img/red-horse.png', 'assets/img/red-case.png',
          this.cases, this.order, [7, 22, 37, 52, 67, 82, 97], 'start', this.horses, service));
      }
      if (i > 3 && i < 8) {
        this.horses.push(new Player(i, 0, this.bases[i], this.bases[i], 134, 15,
          'assets/img/green-horse.png', 'assets/img/green-case.png',
          this.cases, this.order, [119, 118, 117, 116, 115, 114, 113], 'start', this.horses, service));
      }
      if (i > 7 && i < 12) {
        this.horses.push(new Player(i, 0, this.bases[i], this.bases[i], 216, 29,
          'assets/img/yellow-horse.png', 'assets/img/yellow-case.png',
          this.cases, this.order, [217, 202, 187, 172, 157, 142, 127], 'start', this.horses, service));
      }
      if (i > 11) {
        this.horses.push(new Player(i, 0, this.bases[i], this.bases[i], 90, 43,
          'assets/img/blue-horse.png', 'assets/img/blue-case.png',
          this.cases, this.order, [105, 106, 107, 108, 109, 110, 111], 'start', this.horses, service));
      }
    }
    this.cases[112].content = 'assets/img/end-case.png';

    this.cases[8].content = 'assets/img/red-case.png';
    this.cases[134].content = 'assets/img/green-case.png';
    this.cases[216].content = 'assets/img/yellow-case.png';
    this.cases[90].content = 'assets/img/blue-case.png';

    this.cases[22].content = 'assets/img/red-one.png';
    this.cases[37].content = 'assets/img/red-two.png';
    this.cases[52].content = 'assets/img/red-three.png';
    this.cases[67].content = 'assets/img/red-four.png';
    this.cases[82].content = 'assets/img/red-five.png';
    this.cases[97].content = 'assets/img/red-six.png';

    this.cases[118].content = 'assets/img/green-one.png';
    this.cases[117].content = 'assets/img/green-two.png';
    this.cases[116].content = 'assets/img/green-three.png';
    this.cases[115].content = 'assets/img/green-four.png';
    this.cases[114].content = 'assets/img/green-five.png';
    this.cases[113].content = 'assets/img/green-six.png';

    this.cases[202].content = 'assets/img/yellow-one.png';
    this.cases[187].content = 'assets/img/yellow-two.png';
    this.cases[172].content = 'assets/img/yellow-three.png';
    this.cases[157].content = 'assets/img/yellow-four.png';
    this.cases[142].content = 'assets/img/yellow-five.png';
    this.cases[127].content = 'assets/img/yellow-six.png';

    this.cases[106].content = 'assets/img/blue-one.png';
    this.cases[107].content = 'assets/img/blue-two.png';
    this.cases[108].content = 'assets/img/blue-three.png';
    this.cases[109].content = 'assets/img/blue-four.png';
    this.cases[110].content = 'assets/img/blue-five.png';
    this.cases[111].content = 'assets/img/blue-six.png';
  }

  ngOnInit(): void {
  }
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  heCanPlay(): boolean {
    const img = this.horsesImg[this.turn % 4];
    for (const horse of this.horses) {
      if (horse.img === img && horse.zone !== 'start') {
        return true;
      }
    }
    return false;
  }
  play() {
    let num;
    for (let i = 0; i < 15; i++) {
      num = Math.floor(Math.random() * Math.floor(6) + 1);
      this.dice = num;
    }
    this.canPlay = true;
    if (num !== 6 && !this.heCanPlay()) {
      this.turn++;
      this.canPlay = false;
      this.dice = 0;
    }
  }
  convert(i: number) {
    if (this.canPlay) {
      for (const horse of this.horses) {
        if (horse.currentPosition === i && horse.img === this.horsesImg[this.turn % 4]) {
          horse.move(this.dice);
          if (this.dice !== 6 || horse.won) {
            this.turn++;
          }
          this.canPlay = false;
          this.dice = 0;
        }
      }
    }
  }
}
