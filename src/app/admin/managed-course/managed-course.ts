import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FirebaseService } from '../../firebase-service/firebase-service';
import { FirebaseCollections } from '../../firebase-service/firebase-enums';
import { Course } from '../../Interfaces/course';


@Component({
  selector: 'app-managed-course',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './managed-course.html',
  styleUrl: './managed-course.css',
})
export class ManagedCourse implements OnInit {

  courseForm!: FormGroup;
  staffList: any[] = [];
  courses: Course[] = [];

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadStaff();
    this.loadCourses();
  }

  initForm() {
    this.courseForm = this.fb.group({
      courseName: ['', Validators.required],
      staffId: ['', Validators.required],
    });
  }

  loadStaff() {
    this.firebaseService
      .getCollection<any>(FirebaseCollections.Staff)
      .subscribe((res: any[]) => this.staffList = res);
  }

  loadCourses() {
    this.firebaseService
      .getCollection<Course>(FirebaseCollections.Course)
      .subscribe((res: Course[]) => this.courses = res);
  }

  submit() {
    if (this.courseForm.invalid) return;

    const staff = this.staffList.find(
      s => s.id === this.courseForm.value.staffId
    );

    const courseData: Course = {
      courseName: this.courseForm.value.courseName,
      assignedStaffId: staff.id,
      assignedStaffName: staff.name,
      createdAt: new Date(),
    };

    this.firebaseService
      .addDocument(FirebaseCollections.Course, courseData)
      .then(() => {
        this.courseForm.reset();
        alert('Course added successfully');
      });
  }
}
