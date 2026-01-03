export interface Application {
  id?: string;
  name: string;       // ID of the user who applied
  email: string;     // Course selected
  status: 'pending' | 'approved' | 'rejected';
  assignedStaffId?: string; // Staff assigned
  // appliedAt: any;       // Timestamp
}
export interface RegistrationUserData {
  name: string | null;
  email: string | null;
  contact: string | null;
  collegename: string | null;
  degree: string | null;
  year: string | null;
  companyName: string | null;
  professionalField: string | null;
  gender: string | null;
  cv: string | null;
  address: string | null;
}
