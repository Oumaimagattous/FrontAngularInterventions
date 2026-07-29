import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestationCreate } from './prestation-create';

describe('PrestationCreate', () => {
  let component: PrestationCreate;
  let fixture: ComponentFixture<PrestationCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrestationCreate]
    }).compileComponents();

    fixture = TestBed.createComponent(PrestationCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
