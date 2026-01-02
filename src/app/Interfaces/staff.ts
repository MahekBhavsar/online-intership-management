export interface Staff {
  id?: string;                 // Firestore document ID
  staffId: string;             // UNIQUE Login ID (mandatory)
  password: string;            // Login Password (mandatory)
  staffName: string;           // Display Name
  email?: string;              // Optional
  role: 'staff';               // Fixed role
  assignedCourseIds?: string[]; // Courses staff can manage
  createdAt: Date;
}
