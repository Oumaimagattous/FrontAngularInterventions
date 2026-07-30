import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoulinetteDetail } from './moulinette-detail';

describe('MoulinetteDetail', () => {
  let component: MoulinetteDetail;
  let fixture: ComponentFixture<MoulinetteDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoulinetteDetail]
    }).compileComponents();

    fixture = TestBed.createComponent(MoulinetteDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
