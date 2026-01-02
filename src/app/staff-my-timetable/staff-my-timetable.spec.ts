import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffMyTimetable } from './staff-my-timetable';

describe('StaffMyTimetable', () => {
  let component: StaffMyTimetable;
  let fixture: ComponentFixture<StaffMyTimetable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffMyTimetable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffMyTimetable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
