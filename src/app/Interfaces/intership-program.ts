export interface InternshipProgram {
  id?: string;
  programName: string;
  courseName: string;
  duration: string;           // 1 Month | 3 Months | 6 Months | Custom
  assignedStaffId: string;
  assignedStaffName: string;
  createdAt: Date;
}
