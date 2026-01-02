import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Dashboard } from './users/dashboard/dashboard';
import { Registration } from './users/registration/registration';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Registration],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}