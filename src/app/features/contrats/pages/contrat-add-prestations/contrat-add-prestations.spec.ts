import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratAddPrestations } from './contrat-add-prestations';

describe('ContratAddPrestations', () => {
  let component: ContratAddPrestations;
  let fixture: ComponentFixture<ContratAddPrestations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContratAddPrestations]
    }).compileComponents();

    fixture = TestBed.createComponent(ContratAddPrestations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
