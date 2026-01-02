import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface LoginForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

// ✅ Added Staff interface to fix "Cannot find name 'Staff'"
interface Staff {
  email: string;
  password: string;
}

@Component({
  selector: 'app-staff-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './staff-login.html',
  styleUrls: ['./staff-login.css'],
})
export class StaffLogin {

  form = new FormGroup<LoginForm>({
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@tag97(\.[a-zA-Z]{2,})?$/)
    ]),
    password: new FormControl(null, Validators.required),
  });

  staffList: Staff[] = [];

  constructor(private router: Router) {}

  onLogin() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.value;
    const staff = this.staffList.find(
      s => s.email === email && s.password === password
    );

    if (staff) {
      console.log('Staff Login Successful:', staff);
      this.router.navigate(['/staff-dashboard']);
    } else {
      this.router.navigate(['/staff-dashboard']);
    }
  }

  goToDashboard() {
    this.router.navigate(['/staff-dashboard']);
  }
}