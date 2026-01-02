import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
interface userLogin{
  email:FormControl <string|null>;
  password:FormControl<string|null>;
}
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  form = new FormGroup<userLogin>({
    email:new FormControl(null,[Validators.required]),
    password:new FormControl(null,[Validators.required])
  })

  onSubmit(){
    console.log("submit");
  }
}
