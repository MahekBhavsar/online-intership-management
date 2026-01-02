import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagedIntershipProgram } from './managed-intership-program';

describe('ManagedIntershipProgram', () => {
  let component: ManagedIntershipProgram;
  let fixture: ComponentFixture<ManagedIntershipProgram>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagedIntershipProgram]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagedIntershipProgram);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
