import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectivesSelectedComponent } from './electives-selected.component';

describe('ElectivesSelectedComponent', () => {
  let component: ElectivesSelectedComponent;
  let fixture: ComponentFixture<ElectivesSelectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectivesSelectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectivesSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
