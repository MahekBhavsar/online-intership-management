import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { FirebaseService } from '../../firebase-service/firebase-service';
import { FirebaseCollections } from '../../firebase-service/firebase-enums';

export interface Staff {
  id?: string;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  staffList$!: Observable<Staff[]>;

  private firebaseService = inject(FirebaseService);

  ngOnInit(): void {
    // ✅ GET STAFF COLLECTION FROM FIRESTORE
    this.staffList$ = this.firebaseService.getCollection<Staff>(
      FirebaseCollections.Staff
    );
  }
}
