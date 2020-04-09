import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-morpion',
  templateUrl: './morpion.component.html',
  styleUrls: ['./morpion.component.scss']
})
export class MorpionComponent implements OnInit {

  title = 'morpion';

  xName: string;
  oName: string;

  xScore: number = 0;
  oScore: number = 0;

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
