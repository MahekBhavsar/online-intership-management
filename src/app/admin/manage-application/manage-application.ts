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
  staffs: Staff[] = [];

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.loadApplications();
    this.loadStaffs();
  }

loadApplications() {
  this.firebaseService
    .getCollection<Application>(FirebaseCollections.Application)
    .subscribe(data => {
      // Only show pending applications
      const pendingApps = data.filter(app => app.status === 'pending');
      this.applications.set(pendingApps);
    });
}


  loadStaffs() {
    this.firebaseService
      .getCollection<Staff>(FirebaseCollections.Staff)
      .subscribe(data => {
        this.staffs = data;
        console.log('Staff Loaded:', data);
      });
  }

  approveApplication(app: Application) {
    this.firebaseService.updateDocument(
      FirebaseCollections.Application,
      app.id!,
      { status: 'approved' }
    ).then(() => this.loadApplications());
    console.log(this.approveApplication);
  }

  rejectApplication(app: Application) {
    this.firebaseService.updateDocument(
      FirebaseCollections.Application,
      app.id!,
      { status: 'rejected' }
    ).then(() => this.loadApplications());
  }

  assignStaff(app: Application, staffId: string) {
    if (!staffId) return;

    this.firebaseService.updateDocument(
      FirebaseCollections.Application,
      app.id!,
      { assignedStaffId: staffId }
    ).then(() => this.loadApplications());
  }
}
