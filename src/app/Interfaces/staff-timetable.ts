export interface StaffTimetableEntry {
  id?: string;           // Firestore document ID (optional)
  staffId: string;       // ID of the staff member
  day: string;           // Day of week, e.g. 'Monday'
  startTime: string;     // Start time in 'HH:mm' format
  endTime: string;       // End time in 'HH:mm' format
  slotType: 'busy' | 'free';  // Type of slot
  subject?: string;      // Optional, like meeting/interview title
  location?: string;     // Optional location/room
}
