import { Component, signal } from '@angular/core';
import { Application } from '../../Interfaces/application';
import { FirebaseService } from '../../firebase-service/firebase-service';
import { FirebaseCollections } from '../../firebase-service/firebase-enums';
import { Staff } from '../../Interfaces/staff';

@Component({
  selector: 'app-manage-application',
  imports: [],
  templateUrl: './manage-application.html',
  styleUrl: './manage-application.css',
})
export class ManageApplication {
 applications = signal<Application[]>([]);

  // Staff list for dropdown
  staffs: Staff[] = [];

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.loadApplications();
    this.loadStaffs(); // 🔥 IMPORTANT
  }

  loadApplications() {
    this.firebaseService
      .getCollection<Application>(FirebaseCollections.Application)
      .subscribe(data => this.applications.set(data));
  }

  loadStaffs() {
    this.firebaseService
      .getCollection<Staff>(FirebaseCollections.Staff)
      .subscribe(data => {
        this.staffs = data;
        console.log('Staff Loaded:', data); // debug
      });
  }

  approveApplication(app: Application) {
    this.firebaseService.updateDocument(
      FirebaseCollections.Application,
      app.id!,
      { status: 'approved' }
    );
  }

  rejectApplication(app: Application) {
    this.firebaseService.updateDocument(
      FirebaseCollections.Application,
      app.id!,
      { status: 'rejected' }
    );
  }

  assignStaff(app: Application, staffId: string) {
    if (!staffId) return;

    this.firebaseService.updateDocument(
      FirebaseCollections.Application,
      app.id!,
      { assignedStaffId: staffId }
    );
  }
}
