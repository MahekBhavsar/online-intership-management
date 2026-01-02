import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Course } from './course/course';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Course],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('online-intership-management');
}
