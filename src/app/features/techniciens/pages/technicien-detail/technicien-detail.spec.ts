import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicienDetail } from './technicien-detail';

describe('TechnicienDetail', () => {
  let component: TechnicienDetail;
  let fixture: ComponentFixture<TechnicienDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicienDetail]
    }).compileComponents();

    fixture = TestBed.createComponent(TechnicienDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
