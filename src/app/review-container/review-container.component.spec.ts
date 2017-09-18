import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewContainerComponent } from './review-container.component';

describe('ReviewContainerComponent', () => {
  let component: ReviewContainerComponent;
  let fixture: ComponentFixture<ReviewContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
