import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolvingWithWeightingComponent } from './solving-with-weighting.component';

describe('SolvingWithWeightingComponent', () => {
  let component: SolvingWithWeightingComponent;
  let fixture: ComponentFixture<SolvingWithWeightingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolvingWithWeightingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolvingWithWeightingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
