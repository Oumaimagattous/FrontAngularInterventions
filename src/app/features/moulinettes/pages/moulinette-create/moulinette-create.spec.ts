import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoulinetteCreate } from './moulinette-create';

describe('MoulinetteCreate', () => {
  let component: MoulinetteCreate;
  let fixture: ComponentFixture<MoulinetteCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoulinetteCreate]
    }).compileComponents();

    fixture = TestBed.createComponent(MoulinetteCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
