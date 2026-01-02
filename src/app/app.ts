import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Dashboard } from './users/dashboard/dashboard';
import { Interview } from "./interview/interview";
import { Login } from "./users/login/login";
import { StaffLogin } from "./staff-login/staff-login";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Dashboard, Interview,  StaffLogin],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}