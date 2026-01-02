import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagedCourse } from './managed-course';

describe('ManagedCourse', () => {
  let component: ManagedCourse;
  let fixture: ComponentFixture<ManagedCourse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagedCourse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagedCourse);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
