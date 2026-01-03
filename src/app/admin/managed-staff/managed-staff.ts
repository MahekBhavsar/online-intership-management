import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable, BehaviorSubject, switchMap } from 'rxjs';

import { FirebaseService } from '../../firebase-service/firebase-service';
import { FirebaseCollections } from '../../firebase-service/firebase-enums';
import { Staff } from '../../Interfaces/staff';
import { AdminNavbar } from '../admin-topnav/admin-topnav';
import { AdminSidebar } from '../admin-sidebar/admin-sidebar';

@Component({
  selector: 'app-managed-staff',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AdminNavbar, AdminSidebar],
  templateUrl: './managed-staff.html',
})
export class ManagedStaff implements OnInit {
  staffForm!: FormGroup;
  
  // 1. Create a trigger that we can 'kick' to refresh data
  private refreshTrigger$ = new BehaviorSubject<void>(undefined);
  
  // 2. The observable now listens to the trigger
  staffList$: Observable<Staff[]> = this.refreshTrigger$.pipe(
    switchMap(() => this.firebaseService.getCollection<Staff>(FirebaseCollections.Staff))
  );

  editMode = false;
  editingDocId: string | null = null; 

  private fb = inject(FormBuilder);
  private firebaseService = inject(FirebaseService);

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.staffForm = this.fb.group({
      staffId: ['', Validators.required],
      password: [''], 
      staffName: ['', Validators.required],
      email: ['', [Validators.email]],
    });
  }

  // 3. Instead of re-assigning, we just tell the existing stream to reload
  loadStaff(): void {
    this.refreshTrigger$.next(); 
  }

  editStaff(staff: Staff): void {
    this.editMode = true;
    this.editingDocId = (staff as any).id || staff.staffId; 

    this.staffForm.patchValue({
      staffId: staff.staffId,
      staffName: staff.staffName,
      email: staff.email,
      password: '', 
    });
  }

  cancelEdit(): void {
    this.editMode = false;
    this.editingDocId = null;
    this.staffForm.reset();
  }

  async submit(): Promise<void> {
    if (this.staffForm.invalid) return;

    const rawValues = this.staffForm.value;
    const staffData: Partial<Staff> = {
      staffId: rawValues.staffId,
      staffName: rawValues.staffName,
      email: rawValues.email,
      role: 'staff'
    };

    if (rawValues.password) {
      staffData.password = rawValues.password;
    }

    try {
      if (this.editMode && this.editingDocId) {
        await this.firebaseService.updateDocument(FirebaseCollections.Staff, this.editingDocId, staffData);
        alert('Staff updated successfully');
      } else {
        (staffData as any).createdAt = new Date();
        await this.firebaseService.addDocument(FirebaseCollections.Staff, staffData);
        alert('Staff added successfully');
      }
      
      this.cancelEdit();
      this.loadStaff(); // This now updates the stream smoothly
    } catch (error: any) {
      alert(`Failed to save: ${error.message}`);
    }
  }

  async deleteStaff(staff: Staff): Promise<void> {
    const docId = (staff as any).id || staff.staffId;
    
    if (confirm(`Are you sure you want to delete ${staff.staffName}?`)) {
      try {
        await this.firebaseService.deleteDocument(FirebaseCollections.Staff, docId);
        alert('Staff deleted successfully');
        this.loadStaff(); 
      } catch (error: any) {
        alert(`Failed to delete: ${error.message}`);
      }
    }
  }
}