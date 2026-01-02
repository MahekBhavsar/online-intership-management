import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirebaseService } from '../firebase-service/firebase-service';
import { FirebaseCollections } from '../firebase-service/firebase-enums';
import { firstValueFrom } from 'rxjs';
import { Course  } from '../Interfaces/course';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './course.html',
  styleUrls: ['./course.css'],
})
export class course {
  courseForm = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    department: new FormControl(''),
    duration: new FormControl(''),
    fees: new FormControl('', Validators.required)
  });

  courseList: Course[] = []; 

  constructor(private firebaseService: FirebaseService) {}

  async ngOnInit() {
    await this.loadCourses(); 
  }

  
  async loadCourses() {
    try {
      const data = await firstValueFrom(
        this.firebaseService.getCollection<Course>(FirebaseCollections.Course)
      );
      this.courseList = data;
      console.log('Courses:', this.courseList);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }

  // 🔹 Submit new course
  async onSubmit() {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      return;
    }

    const newCourse: Course = this.courseForm.value as Course;

    try {
      await this.firebaseService.addDocument<Course>(
        FirebaseCollections.Course,
        newCourse
      );
      console.log('Course added:', newCourse);

      // Reload course list
      await this.loadCourses();

      // Reset form
      this.courseForm.reset();
    } catch (error) {
      console.error('Error adding course:', error);
    }
  }
}
