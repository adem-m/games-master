import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-name-choice',
  templateUrl: './name-choice.component.html',
  styleUrls: ['./name-choice.component.scss']
})
export class NameChoiceComponent implements OnInit {

  xName: string;
  oName: string;

  @Output() xNameChanged = new EventEmitter<string>();
  @Output() oNameChanged = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  xNameUpdate(name: string) {
    this.xNameChanged.emit(name);
  }
  oNameUpdate(name: string) {
    this.oNameChanged.emit(name);
  }
  getXName() {
    return this.xName;
  }
  getOName() {
    return this.oName;
  }

}
