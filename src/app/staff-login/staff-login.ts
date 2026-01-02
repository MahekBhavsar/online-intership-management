import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase-service/firebase-service';
import { FirebaseCollections } from '../firebase-service/firebase-enums';
import { firstValueFrom } from 'rxjs';
import { Staff } from '../Interfaces/staff';


interface LoginForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-staff-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './staff-login.html',
  styleUrls: ['./staff-login.css'],
})
export class StaffLogin implements OnInit {

  form = new FormGroup<LoginForm>({
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail(\.[a-zA-Z]{2,})?$/)
    ]),
    password: new FormControl(null, Validators.required),
  });

  staffList: Staff[] = []; // 🔹 Now using Staff interface
  showError = false;

  constructor(
    private router: Router,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.loadStaff();
  }

  // 🔹 Load staff using async/await instead of subscribe
  async loadStaff() {
    try {
      const data = await firstValueFrom(
        this.firebaseService.getCollection<Staff>(FirebaseCollections.Staff)
      );
      this.staffList = data;
      console.log('Staff List:', this.staffList);
    } catch (error) {
      console.error('Error fetching staff:', error);
    }
  }

  async onLogin() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const email = this.form.value.email!;
    const password = this.form.value.password!;

    // 🔹 Make sure staffList is loaded
    if (this.staffList.length === 0) {
      await this.loadStaff();
    }

    const staff = this.staffList.find(
      s => s.email === email && s.password === password
    );

    if (staff) {
      this.showError = false;
      console.log('Staff Login Successful:', staff);
      this.router.navigate(['/staff-dashboard']);
    } else {
      this.showError = true;
    }
  }

  closePopup() {
    this.showError = false;
  }

  goToDashboard() {
    this.router.navigate(['/staff-dashboard']);
  }
}
