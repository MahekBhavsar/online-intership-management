import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-topnav',
  standalone: true, // <--- MAKE SURE THIS IS HERE
  imports: [CommonModule],
  templateUrl: './admin-topnav.html',
})
export class AdminNavbar {} // Check if this name matches your imports