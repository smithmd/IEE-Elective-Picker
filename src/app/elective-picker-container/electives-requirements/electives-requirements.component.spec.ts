import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectivesRequirementsComponent } from './electives-requirements.component';

describe('ElectivesRequirementsComponent', () => {
  let component: ElectivesRequirementsComponent;
  let fixture: ComponentFixture<ElectivesRequirementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectivesRequirementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectivesRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
