import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MouvementEquipementDetail } from './mouvement-equipement-detail';

describe('MouvementEquipementDetail', () => {
  let component: MouvementEquipementDetail;
  let fixture: ComponentFixture<MouvementEquipementDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MouvementEquipementDetail]
    }).compileComponents();

    fixture = TestBed.createComponent(MouvementEquipementDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
