import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../firebase-service/firebase-service';
import { FirebaseCollections } from '../../firebase-service/firebase-enums';

@Component({
  selector: 'app-managed-intership-program',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './managed-intership-program.html',
  styleUrl: './managed-intership-program.css',
})
export class ManagedIntershipProgram implements OnInit {

  programForm!: FormGroup;

  courses: any[] = [];
  staffList: any[] = [];
  programs: any[] = [];

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCourses();
    this.loadStaff();
    this.loadPrograms();
  }

  initForm() {
    this.programForm = this.fb.group({
      programName: ['', Validators.required],
      courseId: ['', Validators.required],
      duration: ['', Validators.required],
      staffId: ['', Validators.required],
    });
  }

  loadCourses() {
    this.firebaseService
      .getCollection<any>(FirebaseCollections.Course)
      .subscribe((res: any[]) => this.courses = res);
  }

  loadStaff() {
    this.firebaseService
      .getCollection<any>(FirebaseCollections.Staff)
      .subscribe((res: any[]) => this.staffList = res);
  }

  loadPrograms() {
    this.firebaseService
      .getCollection<any>(FirebaseCollections.Intership_program)
      .subscribe((res: any[]) => this.programs = res);
  }

  submit() {
    if (this.programForm.invalid) return;

    const course = this.courses.find(c => c.id === this.programForm.value.courseId);
    const staff = this.staffList.find(s => s.id === this.programForm.value.staffId);

    const programData = {
      programName: this.programForm.value.programName,
      courseId: course.id,
      courseName: course.name,
      duration: this.programForm.value.duration,
      assignedStaffId: staff.id,
      assignedStaffName: staff.name,
      createdAt: new Date(),
    };

    this.firebaseService
      .addDocument(FirebaseCollections.Intership_program, programData)
      .then(() => {
        this.programForm.reset();
        alert('Internship Program Added Successfully');
      });
  }
}
