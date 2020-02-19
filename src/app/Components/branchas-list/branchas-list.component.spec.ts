import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchasListComponent } from './branchas-list.component';

describe('BranchasListComponent', () => {
  let component: BranchasListComponent;
  let fixture: ComponentFixture<BranchasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
