import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
<<<<<<< HEAD
import { StaffLogin } from "./staff-login/staff-login";
=======
import { Dashboard } from './users/dashboard/dashboard';
>>>>>>> 30cdca5b4bf3551dfb77a34b44b4163a540aaf16

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Dashboard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}