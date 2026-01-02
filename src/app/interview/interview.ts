import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../firebase-service/firebase-service';
import { FirebaseCollections } from '../firebase-service/firebase-enums';
import { RegistrationUserData } from '../Interfaces/application';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-interview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interview.html',
  styleUrls: ['./interview.css'],
})
export class Interview implements OnInit {

  users: (RegistrationUserData & { id: string })[] = [];

  constructor(private firebaseService: FirebaseService) {}

  async ngOnInit() {
    await this.loadApplications();
  }

  // 🔹 GET applications from Firebase (NO subscribe)
  async loadApplications() {
    const data = await firstValueFrom(
      this.firebaseService.getCollection<RegistrationUserData>(
        FirebaseCollections.Application
      )
    );

    this.users = data as any;
  }

  // 🔹 ACCEPT USER
  async acceptUser(user: RegistrationUserData & { id: string }) {
    await this.firebaseService.updateDocument(
      FirebaseCollections.Application,
      user.id,
      { status: 'Accepted' }
    );

    // 🔹 Email simulation (INTERVIEW ANSWER READY)
    console.log(`
      EMAIL SENT
      To: ${user.email}
      Subject: Interview Selected

      Hello ${user.name},
      You are selected for interview.

      Login Credentials:
      Email: ${user.email}
      Password: TEMP@123
    `);

    user.status = 'Accepted';
  }

  // 🔹 REJECT USER
  async rejectUser(user: RegistrationUserData & { id: string }) {
    await this.firebaseService.updateDocument(
      FirebaseCollections.Application,
      user.id,
      { status: 'Rejected' }
    );

    console.log(`
      EMAIL SENT
      To: ${user.email}
      Subject: Interview Result

      Hello ${user.name},
      We regret to inform you that you are rejected.
    `);

    user.status = 'Rejected';
  }
}
