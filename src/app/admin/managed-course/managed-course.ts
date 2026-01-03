import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable, take } from 'rxjs';

import { FirebaseService } from '../../firebase-service/firebase-service';
import { FirebaseCollections } from '../../firebase-service/firebase-enums';
import { Course } from '../../Interfaces/course';
import { Staff } from '../../Interfaces/staff';

@Component({
  selector: 'app-managed-course',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './managed-course.html',
})
export class ManagedCourse implements OnInit {
  courseForm!: FormGroup;
  
  // These MUST be Observables for the | async pipe to work
  staffList$!: Observable<Staff[]>;
  courses$!: Observable<Course[]>;

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadData();
  }

initForm() {
  this.courseForm = this.fb.group({
    courseName: ['', Validators.required],
    duration: ['', Validators.required],   // 👈 dropdown
    staffId: ['', Validators.required],
  });
}


  loadData() {
    // Directly assign the service call to the Observable variables
    this.staffList$ = this.firebaseService.getCollection<Staff>(FirebaseCollections.Staff);
    this.courses$ = this.firebaseService.getCollection<Course>(FirebaseCollections.Course);
  }
async submit() {
  if (this.courseForm.invalid) return;

  const staffList = await new Promise<Staff[]>(resolve =>
    this.staffList$.pipe(take(1)).subscribe(resolve)
  );

  const staff = staffList.find(
    s => s.staffId === this.courseForm.value.staffId
  );

  if (!staff) {
    alert('Staff not found');
    return;
  }

  const courseData: Course = {
    courseName: this.courseForm.value.courseName,
    duration: this.courseForm.value.duration, // 👈 single value
    assignedStaffId: staff.staffId,
    assignedStaffName: staff.staffName,
    createdAt: new Date(),
  };

  await this.firebaseService.addDocument(
    FirebaseCollections.Course,
    courseData
  );

  this.courseForm.reset({ staffId: '' });
  alert('Course added successfully');
  this.loadData();
}

}