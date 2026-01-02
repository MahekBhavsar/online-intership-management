import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  styleUrl: './registration.css',
})
export class Registration {
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
  onSubmit() {
    console.log("Submit");
  }
}
