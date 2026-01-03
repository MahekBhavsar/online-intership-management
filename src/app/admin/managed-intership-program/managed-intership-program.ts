import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable, firstValueFrom } from 'rxjs';

import { FirebaseService } from '../../firebase-service/firebase-service';
import { FirebaseCollections } from '../../firebase-service/firebase-enums';

@Component({
  selector: 'app-managed-intership-program',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './managed-intership-program.html',
})
export class ManagedPIntershiprogram implements OnInit {
  programForm!: FormGroup;

  courses$!: Observable<any[]>;
  staffList$!: Observable<any[]>;
  programs$!: Observable<any[]>;

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadData();
    this.setupAdminAutoFill();
  }

  initForm() {
    this.programForm = this.fb.group({
      programName: ['', Validators.required],
      courseId: ['', Validators.required],
      duration: ['', Validators.required],
      staffId: ['', Validators.required],
    });
  }

  loadData() {
    this.courses$ = this.firebaseService.getCollection(FirebaseCollections.Course);
    this.staffList$ = this.firebaseService.getCollection(FirebaseCollections.Staff);
    this.programs$ = this.firebaseService.getCollection(FirebaseCollections.Intership_program);
  }

  // Admin Feature: Auto-fill fields when Course is selected
  setupAdminAutoFill() {
    this.programForm.get('courseId')?.valueChanges.subscribe(async (selectedId) => {
      if (!selectedId) return;

      const courses = await firstValueFrom(this.courses$);
      const course = courses.find(c => c.id === selectedId);

      if (course) {
        this.programForm.patchValue({
          duration: course.duration,
          staffId: course.staffId || course.assignedStaffId
        });
      }
    });
  }

  async submit() {
    if (this.programForm.invalid) return;

    try {
      const [courses, staffList] = await Promise.all([
        firstValueFrom(this.courses$),
        firstValueFrom(this.staffList$)
      ]);

      const selectedCourse = courses.find(c => c.id === this.programForm.value.courseId);
      const selectedStaff = staffList.find(s => s.staffId === this.programForm.value.staffId);

      const programData = {
        ...this.programForm.value,
        courseName: selectedCourse?.courseName || '',
        assignedStaffName: selectedStaff?.staffName || '',
        isActive: true, // Default to active
        createdAt: new Date(),
      };

      await this.firebaseService.addDocument(FirebaseCollections.Intership_program, programData);
      
      this.programForm.reset({ courseId: '', staffId: '' });
      this.loadData(); // Refresh list
      alert('Program added successfully!');
    } catch (error) {
      console.error('Save error:', error);
    }
  }

  // Feature: Enable/Disable Toggle
  async toggleStatus(program: any) {
    try {
      const newStatus = !program.isActive;
      await this.firebaseService.updateDocument(
        FirebaseCollections.Intership_program,
        program.id,
        { isActive: newStatus }
      );
      this.loadData(); // Refresh list to show new status
    } catch (error) {
      console.error('Toggle error:', error);
    }
  }
}