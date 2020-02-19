import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBranchasComponent } from './new-branchas.component';

describe('NewBranchasComponent', () => {
  let component: NewBranchasComponent;
  let fixture: ComponentFixture<NewBranchasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBranchasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBranchasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
