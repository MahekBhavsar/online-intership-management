export interface Course {
  id?: string;               // Firestore document id
  courseName: string;        // Only course name entered by Admin
  assignedStaffId: string;   // Staff UID
  assignedStaffName: string; // Staff Name (for display)
  createdAt: Date;
  department:string;
  duration:string;
  fees:string
}
