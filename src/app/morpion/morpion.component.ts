import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-morpion',
  templateUrl: './morpion.component.html',
  styleUrls: ['./morpion.component.scss']
})
export class MorpionComponent implements OnInit {

  title = 'morpion';

  xName: string;
  oName: string;

  xScore = 0;
  oScore = 0;

  constructor() {
  }

  ngOnInit(): void {
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
