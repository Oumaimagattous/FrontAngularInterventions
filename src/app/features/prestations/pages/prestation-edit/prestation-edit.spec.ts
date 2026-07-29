import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestationEdit } from './prestation-edit';

describe('PrestationEdit', () => {
  let component: PrestationEdit;
  let fixture: ComponentFixture<PrestationEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrestationEdit]
    }).compileComponents();

    fixture = TestBed.createComponent(PrestationEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
