import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipementCreate } from './equipement-create';

describe('EquipementCreate', () => {
  let component: EquipementCreate;
  let fixture: ComponentFixture<EquipementCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipementCreate]
    }).compileComponents();

    fixture = TestBed.createComponent(EquipementCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
