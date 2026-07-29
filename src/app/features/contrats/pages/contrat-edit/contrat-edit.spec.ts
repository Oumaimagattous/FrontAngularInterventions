import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratEdit } from './contrat-edit';

describe('ContratEdit', () => {
  let component: ContratEdit;
  let fixture: ComponentFixture<ContratEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContratEdit]
    }).compileComponents();

    fixture = TestBed.createComponent(ContratEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
