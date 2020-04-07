import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {

  @Input() xScore;
  @Input() oScore;

  constructor() {
    this.xScore = 0;
    this.oScore = 0;
  }

  ngOnInit(): void {
  }

}