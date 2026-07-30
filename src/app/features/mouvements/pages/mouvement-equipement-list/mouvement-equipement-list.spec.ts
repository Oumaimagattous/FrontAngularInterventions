import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MouvementEquipementList } from './mouvement-equipement-list';

describe('MouvementEquipementList', () => {
  let component: MouvementEquipementList;
  let fixture: ComponentFixture<MouvementEquipementList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MouvementEquipementList]
    }).compileComponents();

    fixture = TestBed.createComponent(MouvementEquipementList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
