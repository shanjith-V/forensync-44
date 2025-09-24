// Mock data for the forensic evidence tracking system

export const mockUsers = [
  { id: 1, name: "Dr. Sarah Johnson", email: "s.johnson@forensics.gov", role: "Lead Investigator", status: "Active" },
  { id: 2, name: "Detective Mike Chen", email: "m.chen@forensics.gov", role: "Investigator", status: "Active" },
  { id: 3, name: "Lab Tech Alex Rodriguez", email: "a.rodriguez@forensics.gov", role: "Lab Technician", status: "Active" },
  { id: 4, name: "Admin Jane Smith", email: "j.smith@forensics.gov", role: "Administrator", status: "Active" }
];

export const mockCases = [
  {
    id: "CASE-2024-001",
    title: "Downtown Robbery Investigation",
    investigator: "Dr. Sarah Johnson",
    status: "Active",
    dateCreated: "2024-01-15",
    location: "Downtown Financial District",
    description: "Armed robbery at First National Bank",
    evidenceCount: 5
  },
  {
    id: "CASE-2024-002", 
    title: "Vehicle Theft Case",
    investigator: "Detective Mike Chen",
    status: "Under Review",
    dateCreated: "2024-01-12",
    location: "Parking Garage Level 3",
    description: "Stolen vehicle recovered with additional evidence",
    evidenceCount: 3
  },
  {
    id: "CASE-2024-003",
    title: "Cyber Crime Investigation",
    investigator: "Dr. Sarah Johnson", 
    status: "Closed",
    dateCreated: "2024-01-08",
    location: "Tech Office Building",
    description: "Data breach investigation completed",
    evidenceCount: 8
  }
];

export const mockEvidence = [
  {
    id: "EV-001",
    rfidId: "RFID-7854A2B1",
    caseId: "CASE-2024-001",
    description: "Security camera hard drive",
    status: "In Analysis",
    location: "Lab Storage A-12",
    handledBy: "Lab Tech Alex Rodriguez",
    dateCollected: "2024-01-15",
    chain: [
      { date: "2024-01-15T10:30:00", action: "Collected", user: "Dr. Sarah Johnson", location: "Crime Scene" },
      { date: "2024-01-15T14:20:00", action: "Logged", user: "Lab Tech Alex Rodriguez", location: "Evidence Room" },
      { date: "2024-01-16T09:15:00", action: "Analysis Started", user: "Lab Tech Alex Rodriguez", location: "Lab A" }
    ]
  },
  {
    id: "EV-002", 
    rfidId: "RFID-9B2C4D3E",
    caseId: "CASE-2024-001",
    description: "Fingerprint samples from vault",
    status: "Analyzed",
    location: "Lab Storage B-05",
    handledBy: "Dr. Sarah Johnson",
    dateCollected: "2024-01-15",
    chain: [
      { date: "2024-01-15T11:45:00", action: "Collected", user: "Dr. Sarah Johnson", location: "Crime Scene" },
      { date: "2024-01-15T15:30:00", action: "Processed", user: "Lab Tech Alex Rodriguez", location: "Lab B" },
      { date: "2024-01-17T13:20:00", action: "Analysis Complete", user: "Dr. Sarah Johnson", location: "Lab B" }
    ]
  }
];

export const mockRfidScans = [
  {
    id: 1,
    rfidId: "RFID-7854A2B1",
    caseId: "CASE-2024-001",
    timestamp: "2024-01-17T09:15:23",
    location: "Lab Storage A-12",
    user: "Lab Tech Alex Rodriguez",
    action: "Access"
  },
  {
    id: 2,
    rfidId: "RFID-9B2C4D3E", 
    caseId: "CASE-2024-001",
    timestamp: "2024-01-17T08:30:45",
    location: "Lab Storage B-05",
    user: "Dr. Sarah Johnson",
    action: "Retrieval"
  },
  {
    id: 3,
    rfidId: "RFID-1F3G5H7J",
    caseId: "CASE-2024-002",
    timestamp: "2024-01-16T16:22:11",
    location: "Evidence Room",
    user: "Detective Mike Chen",
    action: "Storage"
  }
];

// Simulated login credentials
export const loginCredentials = {
  email: "admin@forensics.gov",
  password: "forensics2024"
};