import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestationDetail } from './prestation-detail';

describe('PrestationDetail', () => {
  let component: PrestationDetail;
  let fixture: ComponentFixture<PrestationDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrestationDetail]
    }).compileComponents();

    fixture = TestBed.createComponent(PrestationDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
