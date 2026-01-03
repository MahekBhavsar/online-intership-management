import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Registration } from '../registration/registration';
import { Login } from '../login/login';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

}
