import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicienCreate } from './technicien-create';

describe('TechnicienCreate', () => {
  let component: TechnicienCreate;
  let fixture: ComponentFixture<TechnicienCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicienCreate]
    }).compileComponents();

    fixture = TestBed.createComponent(TechnicienCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
