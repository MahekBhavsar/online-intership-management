import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs'; // Import Observable

import { FirebaseService } from '../../firebase-service/firebase-service';
import { FirebaseCollections } from '../../firebase-service/firebase-enums';
import { Staff } from '../../Interfaces/staff';
import { AdminNavbar } from '../admin-topnav/admin-topnav';
import { AdminLogin } from '../Adminlogin/admin-login';
import { AdminSidebar } from '../admin-sidebar/admin-sidebar';

@Component({
  selector: 'app-managed-staff',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,AdminNavbar,AdminSidebar],
  templateUrl: './managed-staff.html',
})
export class ManagedStaff implements OnInit {
  staffForm!: FormGroup;
  
  // 1. Change to an Observable
  staffList$!: Observable<Staff[]>; 

  private fb = inject(FormBuilder);
  private firebaseService = inject(FirebaseService);

  ngOnInit(): void {
    this.initForm();
    this.loadStaff();
  }

  initForm() {
    this.staffForm = this.fb.group({
      staffId: ['', Validators.required],
      password: ['', Validators.required],
      staffName: ['', Validators.required],
      email: [''],
    });
  }

  loadStaff() {
    // 2. Assign the observable directly instead of subscribing manually
    this.staffList$ = this.firebaseService.getCollection<Staff>(FirebaseCollections.Staff);
  }

  async submit() {
    if (this.staffForm.invalid) return;

    const staffData: Staff = {
      ...this.staffForm.value,
      role: 'staff',
      createdAt: new Date(),
    };

    try {
      await this.firebaseService.addDocument(FirebaseCollections.Staff, staffData);
      this.staffForm.reset();
      alert('Staff added successfully');
      // No need to manually reload if your Firebase service uses real-time updates (onSnapshot),
      // but if it's a one-time fetch, calling loadStaff() again works:
      this.loadStaff(); 
    } catch (error) {
      console.error('Error adding staff:', error);
      alert('Failed to add staff.');
    }
  }
}