import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectivesPeriodsComponent } from './electives-periods.component';

describe('ElectivesPeriodsComponent', () => {
  let component: ElectivesPeriodsComponent;
  let fixture: ComponentFixture<ElectivesPeriodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectivesPeriodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectivesPeriodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
