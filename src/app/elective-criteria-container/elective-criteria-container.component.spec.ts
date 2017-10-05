import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectiveCriteriaContainerComponent } from './elective-criteria-container.component';

describe('ElectiveCriteriaContainerComponent', () => {
  let component: ElectiveCriteriaContainerComponent;
  let fixture: ComponentFixture<ElectiveCriteriaContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectiveCriteriaContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectiveCriteriaContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
