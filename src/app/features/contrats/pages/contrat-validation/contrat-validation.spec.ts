import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratValidation } from './contrat-validation';

describe('ContratValidation', () => {
  let component: ContratValidation;
  let fixture: ComponentFixture<ContratValidation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContratValidation]
    }).compileComponents();

    fixture = TestBed.createComponent(ContratValidation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
