import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipementDetail } from './equipement-detail';

describe('EquipementDetail', () => {
  let component: EquipementDetail;
  let fixture: ComponentFixture<EquipementDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipementDetail]
    }).compileComponents();

    fixture = TestBed.createComponent(EquipementDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
