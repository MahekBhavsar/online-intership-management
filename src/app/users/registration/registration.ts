import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirebaseService } from '../../firebase-service/firebase-service';
import { FirebaseCollections } from '../../firebase-service/firebase-enums';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registration.html',
})
export class Registration {

  registerForm!: FormGroup;
  private firebaseService = inject(FirebaseService);

  constructor() {
    this.initForm();
  }

  initForm() {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      contact: new FormControl('', Validators.required),
      collegename: new FormControl('', Validators.required),
      degree: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      companyName: new FormControl(''),
      professionalField: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      cv: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
    });
  }

  async onSubmit() {
    if (this.registerForm.invalid) return;

    const data = {
      ...this.registerForm.value,
      createdAt: new Date(),
      status: 'pending'
    };

    try {
      // ✅ CORRECT CALL
      await this.firebaseService.addDocument(
        FirebaseCollections.User,
        data
      );

      alert('User submitted successfully ✅');
      this.registerForm.reset();

    } catch (error) {
      console.error(error);
      alert('Something went wrong ❌');
    }
  }
}
