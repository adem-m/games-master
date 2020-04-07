import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameChoiceComponent } from './name-choice.component';

describe('NameChoiceComponent', () => {
  let component: NameChoiceComponent;
  let fixture: ComponentFixture<NameChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
