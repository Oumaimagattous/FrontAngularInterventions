import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicienEdit } from './technicien-edit';

describe('TechnicienEdit', () => {
  let component: TechnicienEdit;
  let fixture: ComponentFixture<TechnicienEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicienEdit]
    }).compileComponents();

    fixture = TestBed.createComponent(TechnicienEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
