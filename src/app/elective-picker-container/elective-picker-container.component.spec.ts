import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectivePickerContainerComponent } from './elective-picker-container.component';

describe('ElectivePickerContainerComponent', () => {
  let component: ElectivePickerContainerComponent;
  let fixture: ComponentFixture<ElectivePickerContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectivePickerContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectivePickerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
