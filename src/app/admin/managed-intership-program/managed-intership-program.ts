import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable, take } from 'rxjs';

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

  // Define Observables for the Async pipe
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
    // Directly assign the service calls to the Observables
    this.courses$ = this.firebaseService.getCollection(FirebaseCollections.Course);
    this.staffList$ = this.firebaseService.getCollection(FirebaseCollections.Staff);
    this.programs$ = this.firebaseService.getCollection(FirebaseCollections.Intership_program);
  }

  async submit() {
    if (this.programForm.invalid) return;

    try {
      // 1. Get current snapshots of both lists to find the names
      const [courses, staffList] = await Promise.all([
        new Promise<any[]>(res => this.courses$.pipe(take(1)).subscribe(res)),
        new Promise<any[]>(res => this.staffList$.pipe(take(1)).subscribe(res))
      ]);

      const selectedCourse = courses.find(c => c.id === this.programForm.value.courseId);
      const selectedStaff = staffList.find(s => s.staffId === this.programForm.value.staffId);

      if (!selectedCourse || !selectedStaff) {
        alert('Selection error: Course or Staff not found.');
        return;
      }

      const programData = {
        programName: this.programForm.value.programName,
        courseId: selectedCourse.id,
        courseName: selectedCourse.courseName,
        duration: this.programForm.value.duration,
        assignedStaffId: selectedStaff.staffId,
        assignedStaffName: selectedStaff.staffName,
        createdAt: new Date(),
      };

      await this.firebaseService.addDocument(FirebaseCollections.Intership_program, programData);
      
      this.programForm.reset({ courseId: '', staffId: '' });
      alert('Program added successfully!');
      
      // Refresh list
      this.loadData();
    } catch (error) {
      console.error('Save error:', error);
      alert('Error saving program.');
    }
  }
}