import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTopnav } from './admin-topnav';

describe('AdminTopnav', () => {
  let component: AdminTopnav;
  let fixture: ComponentFixture<AdminTopnav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTopnav]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTopnav);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
