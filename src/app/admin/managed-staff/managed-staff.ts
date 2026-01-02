import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { FirebaseService } from '../../firebase-service/firebase-service';
import { FirebaseCollections } from '../../firebase-service/firebase-enums';
import { Staff } from '../../Interfaces/staff';

@Component({
  selector: 'app-managed-staff',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './managed-staff.html',
})
export class ManagedStaff implements OnInit {

  staffForm!: FormGroup;
  staffList: Staff[] = [];

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService
  ) {}

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
  this.firebaseService
    .getCollection<Staff>(FirebaseCollections.Staff)
    .subscribe(res => {
      this.staffList = res;
    });
}

  submit() {
    if (this.staffForm.invalid) return;

    const staffData: Staff = {
      staffId: this.staffForm.value.staffId,
      password: this.staffForm.value.password,
      staffName: this.staffForm.value.staffName,
      email: this.staffForm.value.email,
      role: 'staff',
      createdAt: new Date(),
    };

    this.firebaseService
      .addDocument(FirebaseCollections.Staff, staffData)
      .then(() => {
        this.staffForm.reset();
        alert('Staff added successfully');
      });
  }
}
