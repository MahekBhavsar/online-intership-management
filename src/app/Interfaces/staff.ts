export interface Staff {
  staffId: string;
  password: string;
  staffName: string;
  email?: string;
  role: string;
  createdAt: Date; // Ensure this is spelled correctly here
}