import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipementEdit } from './equipement-edit';

describe('EquipementEdit', () => {
  let component: EquipementEdit;
  let fixture: ComponentFixture<EquipementEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipementEdit]
    }).compileComponents();

    fixture = TestBed.createComponent(EquipementEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
