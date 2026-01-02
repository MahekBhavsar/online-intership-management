import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../firebase-service/firebase-service';
import { FirebaseCollections } from '../../firebase-service/firebase-enums';

import { Observable } from 'rxjs';

interface Staff {
  id?: string;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  staff$!: Observable<Staff | undefined>;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    // Fetch one staff document
    this.staff$ = this.firebaseService.getDocument<Staff>(
      FirebaseCollections.Staff,
      'abc123' // replace with actual staff document ID
    );
  }
}
