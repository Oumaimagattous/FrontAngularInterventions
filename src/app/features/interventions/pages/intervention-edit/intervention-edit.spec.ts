import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionEdit } from './intervention-edit';

describe('InterventionEdit', () => {
  let component: InterventionEdit;
  let fixture: ComponentFixture<InterventionEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterventionEdit]
    }).compileComponents();

    fixture = TestBed.createComponent(InterventionEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
