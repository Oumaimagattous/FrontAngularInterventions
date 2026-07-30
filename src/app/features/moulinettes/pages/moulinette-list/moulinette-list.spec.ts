import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoulinetteList } from './moulinette-list';

describe('MoulinetteList', () => {
  let component: MoulinetteList;
  let fixture: ComponentFixture<MoulinetteList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoulinetteList]
    }).compileComponents();

    fixture = TestBed.createComponent(MoulinetteList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
