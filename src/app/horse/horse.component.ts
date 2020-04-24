import { Component, OnInit } from '@angular/core';
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
  horses = [];
  dice = 0;

  constructor() {

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
          'assets/img/red-horse.png', this.cases, this.order, 'start'));
      }
      if (i > 3 && i < 8) {
        this.horses.push(new Player(i, 0, this.bases[i], this.bases[i], 134, 15,
          'assets/img/green-horse.png', this.cases, this.order, 'start'));
      }
      if (i > 7 && i < 12) {
        this.horses.push(new Player(i, 0, this.bases[i], this.bases[i], 216, 29,
          'assets/img/yellow-horse.png', this.cases, this.order, 'start'));
      }
      if (i > 11) {
        this.horses.push(new Player(i, 0, this.bases[i], this.bases[i], 90, 44,
          'assets/img/blue-horse.png', this.cases, this.order, 'start'));
      }
    }
    this.cases[112].content = 'assets/img/end-case.png';

    this.cases[8].content = 'assets/img/red-case.png';
    this.cases[134].content = 'assets/img/green-case.png';
    this.cases[216].content = 'assets/img/yellow-case.png';
    this.cases[90].content = 'assets/img/blue-case.png';

  }

  ngOnInit(): void {
  }
  move(id, num) {
    this.horses[id].move(num);
  }
  play(id) {
    const num = Math.floor(Math.random() * Math.floor(6) + 1);
    this.dice = num;
    this.move(id, num);
  }

}
