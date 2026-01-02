import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirebaseService } from '../../firebase-service/firebase-service';
import { RegistrationUserData } from '../../Interfaces/application';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registration.html',
  styleUrl: './registration.css',
})
export class Registration {

  private fire = inject(FirebaseService);

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    contact: new FormControl('', Validators.required),
    collegename: new FormControl(''),
    degree: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
    companyName: new FormControl(''),
    professionalField: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    cv: new FormControl(null, Validators.required),
    address: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  async onSubmit() {
  if (this.registerForm.invalid) {
    this.registerForm.markAllAsTouched();
    return;
  }

  try {
    const formData = this.registerForm.value as RegistrationUserData;

    await this.fire.addApplication(formData);

    alert('Application submitted successfully ✅');
    this.registerForm.reset();

  } catch (error) {
    console.error(error);
    alert('Failed to submit application ❌');
  }
}

}
