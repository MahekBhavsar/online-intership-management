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
  interviewEnded = false;

  constructor(private firebaseService: FirebaseService) {}

  async ngOnInit() {
    await this.loadApplications();
    await this.checkInterviewTime();
  }

  // 🔹 Load interview applications
  async loadApplications() {
    const data = await firstValueFrom(
      this.firebaseService.getCollection<RegistrationUserData>(
        FirebaseCollections.Application
      )
    );
    this.users = data as any;
  }

  // 🔹 Check interview time from Admin timetable
  async checkInterviewTime() {
    const slots = await firstValueFrom(
      this.firebaseService.getCollection<any>(
        FirebaseCollections.StaffTimetable
      )
    );

    // Interview slot find karo
    const interviewSlot = slots.find(
      s => s.subject === 'Interview'
    );

    if (!interviewSlot) {
      this.interviewEnded = false;
      return;
    }

    const now = new Date();

    const [endHour, endMin] = interviewSlot.endTime.split(':').map(Number);
    const interviewEnd = new Date();
    interviewEnd.setHours(endHour, endMin + 5, 0, 0);

    this.interviewEnded = now >= interviewEnd;
  }

  // 🔹 ACCEPT USER
  async acceptUser(user: RegistrationUserData & { id: string }) {
    await this.firebaseService.updateDocument(
      FirebaseCollections.Application,
      user.id,
      { status: 'Accepted' }
    );

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
