import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { addDoc, collection, Firestore } from 'firebase/firestore';
interface registrationUser {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  contact: FormControl<string | null>;
  collegename: FormControl<String | null>;
  degree: FormControl<string | null>;
  year: FormControl<string | null>;
  companyName: FormControl<string | null>;
  professionalField: FormControl<string | null>;
  gender: FormControl<string | null>;
  cv: FormControl<string | null>;
  address: FormControl<string | null>;

}
@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule],
  templateUrl: './registration.html',
  standalone:true,
  styleUrl: './registration.css',
})
export class Registration {

  private firestore: Firestore = inject(Firestore);
  registerForm = new FormGroup<registrationUser>({
    name: new FormControl(null, [Validators.required]),
    contact: new FormControl(null, [Validators.required]),
    collegename: new FormControl(null),
    degree: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    companyName: new FormControl(null),
    professionalField: new FormControl(null, [Validators.required]),
    gender: new FormControl(null, [Validators.required]),
    cv: new FormControl(null, [Validators.required]),
    address: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
  })
  isLoading = false;
  statusMessage = '';

  async onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      try {
        const regRef = collection(this.firestore, 'internship-registrations');
        await addDoc(regRef, this.registerForm.value); // ✅ works now
        this.statusMessage = 'Registration submitted successfully!';
        this.registerForm.reset();
      } catch (error) {
        console.error(error);
        this.statusMessage = 'Error submitting registration.';
      } finally {
        this.isLoading = false;
      }
    } else {
      this.statusMessage = 'Please fill all required fields.';
    }
  }

}
