import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../firebase-service/firebase-service';
import { FirebaseCollections } from '../firebase-service/firebase-enums';
import { StaffTimetableEntry } from '../Interfaces/staff-timetable';
import { firstValueFrom } from 'rxjs';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-staff-my-timetable',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './staff-my-timetable.html',
  styleUrls: ['./staff-my-timetable.css']
})
export class StaffMyTimetable implements OnInit {

  staffId!: string;
  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  selectedDay = 'Monday';
  slots: StaffTimetableEntry[] = [];
  isLoading = false;

  constructor(
    private firebaseService: FirebaseService,
    private auth: Auth
  ) {}

  async ngOnInit() {
    // Logged-in staff UID
    this.staffId = this.auth.currentUser?.uid!;
    await this.loadSlots();
  }

  async selectDay(day: string) {
    this.selectedDay = day;
    await this.loadSlots();
  }

  async loadSlots() {
    if (!this.staffId) return;

    this.isLoading = true;

    const all = await firstValueFrom(
      this.firebaseService.getCollection<StaffTimetableEntry>(
        FirebaseCollections.StaffTimetable
      )
    );

    // ONLY admin-created slots for this staff
    this.slots = all
      .filter(
        s => s.staffId === this.staffId && s.day === this.selectedDay
      )
      .sort((a, b) => a.startTime.localeCompare(b.startTime));

    this.isLoading = false;
  }

  async saveSlot(slot: StaffTimetableEntry) {
    if (!slot.id) return;

    await this.firebaseService.updateDocument(
      FirebaseCollections.StaffTimetable,
      slot.id,
      {
        slotType: slot.slotType,
        subject: slot.subject || ''
      }
    );
  }
}
