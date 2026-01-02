import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-course',
  imports: [ReactiveFormsModule],
  templateUrl: './course.html',
  styleUrl: './course.css',
})
export class Course {
  courseForm = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    department: new FormControl(''),
    duration: new FormControl(''),
    fees: new FormControl('', Validators.required)
  });

  onSubmit() {
    if (this.courseForm.valid) {
      console.log(this.courseForm.value);
      this.courseForm.reset();
    }
  }

}
