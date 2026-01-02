import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagedUser } from './managed-user';

describe('ManagedUser', () => {
  let component: ManagedUser;
  let fixture: ComponentFixture<ManagedUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagedUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagedUser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
