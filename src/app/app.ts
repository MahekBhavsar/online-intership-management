import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Registration } from './users/registration/registration';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Registration],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('online-intership-management');
}
