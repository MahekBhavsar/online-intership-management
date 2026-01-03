import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true, // <--- MAKE SURE THIS IS HERE
  imports: [CommonModule, RouterModule], // <--- MUST INCLUDE ROUTERMODULE FOR LINKS
  templateUrl: './admin-sidebar.html', // Check if path is correct
})
export class AdminSidebar {} // Check if this name matches your imports