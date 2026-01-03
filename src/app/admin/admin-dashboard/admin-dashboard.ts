import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { RouterModule } from '@angular/router';
import { FirebaseService } from '../../firebase-service/firebase-service';
import { FirebaseCollections } from '../../firebase-service/firebase-enums';
import { AdminNavbar } from '../admin-topnav/admin-topnav';
import { AdminSidebar } from '../admin-sidebar/admin-sidebar';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  // Add CommonModule and RouterModule so your @if/async and links work
  imports: [
    CommonModule, 
    RouterModule, 
    AdminNavbar, 
    AdminSidebar
  ], 
  templateUrl: './admin-dashboard.html',
})
export class AdminDashboard implements OnInit {
  // Observables for real-time counts
  today: Date = new Date();
  totalUsers$!: Observable<number>;
  totalStaff$!: Observable<number>;
  pendingApps$!: Observable<number>;
  totalPrograms$!: Observable<number>;
  recentApplications$!: Observable<any[]>;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    // Mapping collections to lengths for the stats cards
    this.totalUsers$ = this.firebaseService.getCollection(FirebaseCollections.User).pipe(map(c => c.length));
    this.totalStaff$ = this.firebaseService.getCollection(FirebaseCollections.Staff).pipe(map(c => c.length));
    this.pendingApps$ = this.firebaseService.getCollection(FirebaseCollections.Application).pipe(map(c => c.filter((a:any) => a.status === 'Pending').length));
    this.totalPrograms$ = this.firebaseService.getCollection(FirebaseCollections.Intership_program).pipe(map(c => c.length));
    
    // Get the actual list for the table
    this.recentApplications$ = this.firebaseService.getCollection(FirebaseCollections.Application);
  }
}