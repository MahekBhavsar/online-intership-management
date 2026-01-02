import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase-service/firebase-service';
import { FirebaseCollections } from '../firebase-service/firebase-enums';
import { StaffTimetableEntry } from '../Interfaces/staff-timetable';
import { firstValueFrom } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-staff-my-timetable',
  imports:[CommonModule,FormsModule],
  templateUrl: './staff-my-timetable.html',
  styleUrls: ['./staff-my-timetable.css']
})
export class StaffMyTimetable implements OnInit {

  staffId: string = '';  // Logged-in staff
  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  selectedDay = 'Monday';
  slots: StaffTimetableEntry[] = [];
  isLoading = false;

  constructor(
    private firebaseService: FirebaseService,
    private auth: Auth
  ) {}

  async ngOnInit() {
    // Logged-in staff ka UID
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
    try {
      const all = await firstValueFrom(
        this.firebaseService.getCollection<StaffTimetableEntry>(FirebaseCollections.StaffTimetable)
      );

      // Filter only logged-in staff + selected day
      this.slots = all
        .filter(s => s.staffId === this.staffId && s.day === this.selectedDay)
        .sort((a, b) => a.startTime.localeCompare(b.startTime));

    } catch (err) {
      console.error('Error loading slots', err);
    } finally {
      this.isLoading = false;
    }
  }

  async updateSlot(slot: StaffTimetableEntry) {
    if (!slot.id) return;

    this.isLoading = true;
    try {
      await this.firebaseService.updateDocument(
        FirebaseCollections.StaffTimetable,
        slot.id,
        { slotType: slot.slotType, subject: slot.subject }
      );
      await this.loadSlots(); // Refresh
    } catch (err) {
      console.error('Error updating slot', err);
    } finally {
      this.isLoading = false;
    }
  }
}
