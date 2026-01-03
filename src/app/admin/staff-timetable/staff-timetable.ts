import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../../firebase-service/firebase-service';
import { FirebaseCollections } from '../../firebase-service/firebase-enums';
import { StaffTimetableEntry } from '../../Interfaces/staff-timetable';
import { firstValueFrom } from 'rxjs';
import { AdminNavbar } from '../admin-topnav/admin-topnav';
import { AdminSidebar } from '../admin-sidebar/admin-sidebar';

@Component({
  selector: 'app-staff-timetable',
  standalone: true,
  imports: [CommonModule, FormsModule,AdminNavbar,AdminSidebar],
  templateUrl: './staff-timetable.html',
  styleUrls: ['./staff-timetable.css'],
})
export class StaffTimetable implements OnInit {
  staffList = signal<any[]>([]);
  timetableEntries = signal<StaffTimetableEntry[]>([]);
  
  selectedStaffId = ''; 
  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  adminStartTime = '09:00';
  adminEndTime = '17:00';
  isLoading = false;
  selectedEntry: StaffTimetableEntry | null = null; 

  constructor(private firebaseService: FirebaseService) {}

  async ngOnInit() {
    // Just load the list of staff, don't load a timetable yet
    const users = await firstValueFrom(this.firebaseService.getCollection<any>(FirebaseCollections.Staff));
    this.staffList.set(users.filter(u => u.role === 'staff'));
  }

  async onStaffChange(newId: string) {
    this.selectedStaffId = newId;
    if (this.selectedStaffId) {
      await this.loadTimetable();
    } else {
      this.timetableEntries.set([]); // Clear if no one selected
    }
  }

  async loadTimetable() {
    if (!this.selectedStaffId) return;
    this.isLoading = true;
    try {
      const all = await firstValueFrom(this.firebaseService.getCollection<StaffTimetableEntry>(FirebaseCollections.StaffTimetable));
      const filtered = all
        .filter(e => String(e.staffId) === String(this.selectedStaffId))
        .sort((a, b) => a.startTime.localeCompare(b.startTime));
      
      this.timetableEntries.set(filtered);
    } finally {
      this.isLoading = false;
    }
  }

  async generateFullWeek() {
    if (!this.selectedStaffId) {
      alert("Please select a staff member first!");
      return;
    }
    this.isLoading = true;
    const start = parseInt(this.adminStartTime.split(':')[0]);
    const end = parseInt(this.adminEndTime.split(':')[0]);

    // Clear current entries first
    for (const entry of this.timetableEntries()) {
      if (entry.id) await this.firebaseService.deleteDocument(FirebaseCollections.StaffTimetable, entry.id);
    }

    const batch = [];
    for (const day of this.daysOfWeek) {
      for (let hour = start; hour < end; hour++) {
        const isBusy = (hour - start) % 2 === 0; 
        batch.push(this.firebaseService.addDocument(FirebaseCollections.StaffTimetable, {
          staffId: this.selectedStaffId,
          day: day,
          startTime: `${hour.toString().padStart(2, '0')}:00`,
          endTime: `${(hour + 1).toString().padStart(2, '0')}:00`,
          slotType: isBusy ? 'busy' : 'free',
          subject: isBusy ? 'Staff Work' : 'Interview/Free',
          location: ''
        }));
      }
    }
    await Promise.all(batch);
    await this.loadTimetable();
  }

  openEditModal(entry: StaffTimetableEntry) {
    this.selectedEntry = { ...entry }; // Shallow copy for editing
  }

  async saveEdit() {
    if (this.selectedEntry && this.selectedEntry.id) {
      this.isLoading = true;
      await this.firebaseService.updateDocument(
        FirebaseCollections.StaffTimetable, 
        this.selectedEntry.id, 
        this.selectedEntry
      );
      this.selectedEntry = null;
      await this.loadTimetable();
    }
  }
}