import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Dashboard } from './users/dashboard/dashboard';
<<<<<<< HEAD
import { Interview } from "./interview/interview";
import { Login } from "./users/login/login";
import { StaffLogin } from "./staff-login/staff-login";
=======
import { Registration } from './users/registration/registration';
>>>>>>> 278a7a24e5589207fa07d8c2034373f036e17751

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Registration],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}