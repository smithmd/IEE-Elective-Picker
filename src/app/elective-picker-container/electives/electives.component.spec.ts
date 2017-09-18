import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectivesComponent } from './electives.component';

describe('ElectivesComponent', () => {
  let component: ElectivesComponent;
  let fixture: ComponentFixture<ElectivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
