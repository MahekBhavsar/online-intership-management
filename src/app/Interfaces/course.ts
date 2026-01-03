export interface Course {
  id?: string;
  courseName: string;
  duration: string;          // 👈 ONLY ONE DURATION
  assignedStaffId: string;
  assignedStaffName: string;
  createdAt: Date;
}
