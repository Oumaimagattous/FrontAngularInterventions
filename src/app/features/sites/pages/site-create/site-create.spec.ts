import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteCreate } from './site-create';

describe('SiteCreate', () => {
  let component: SiteCreate;
  let fixture: ComponentFixture<SiteCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteCreate]
    }).compileComponents();

    fixture = TestBed.createComponent(SiteCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
