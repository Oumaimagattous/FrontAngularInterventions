import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratCreate } from './contrat-create';

describe('ContratCreate', () => {
  let component: ContratCreate;
  let fixture: ComponentFixture<ContratCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContratCreate]
    }).compileComponents();

    fixture = TestBed.createComponent(ContratCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
