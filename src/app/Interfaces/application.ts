export interface Application {
  id?: string;
  userId: string;       // ID of the user who applied
  courseId: string;     // Course selected
  status: 'pending' | 'approved' | 'rejected';
  assignedStaffId?: string; // Staff assigned
  appliedAt: any;       // Timestamp
}
