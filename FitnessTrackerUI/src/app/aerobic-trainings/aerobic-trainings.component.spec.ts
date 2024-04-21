import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AerobicTrainingsComponent } from './aerobic-trainings.component';

describe('AerobicTrainingsComponent', () => {
  let component: AerobicTrainingsComponent;
  let fixture: ComponentFixture<AerobicTrainingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AerobicTrainingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AerobicTrainingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
