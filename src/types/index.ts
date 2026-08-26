export type CameraState = 
  | 'Online'
  | 'Live'
  | 'Recording'
  | 'Offline'
  | 'Preparing'
  | 'Stream Error';

export type VideoState = 
  | 'Draft'
  | 'Submitted'
  | 'Under Review'
  | 'Changes Requested'
  | 'Approved'
  | 'Published'
  | 'Rejected'
  | 'Archived';

export type UserRole = 'student' | 'professor_psychologist' | 'supervisor' | 'admin';

export interface User {
  id: string;
  fullName: string;
  avatarUrl: string;
  email: string;
  role: UserRole;
  roleLabel: string;
  faculty: string;
  department: string;
  // Student specific
  academicYear?: string;
  groupNumber?: string;
  studentId?: string;
  // Professor/Psychologist specific
  academicTitle?: string;
  specialization?: string;
  licenseNumber?: string;
  capabilities?: string[];
  // Supervisor specific
  supervisionArea?: string;
  // Status
  status?: 'Faol' | 'Nofaol' | 'Ta’tilda';
}

export interface Camera {
  id: string;
  name: string;
  roomNumber: string;
  floor: number;
  state: CameraState;
  resolution: string;
  fps: number;
  currentActivity?: string;
  currentProfessor?: string;
  patientCode?: string; // Anonymized e.g. "PT-9012"
  activeSessionId?: string;
  startedAt?: string;
  thumbnailUrl?: string;
  cameraType?: 'PTZ' | 'Panorama' | 'Fixed HD';
  recordingEnabled?: boolean;
  lastActivity?: string;
}

export interface LiveSession {
  id: string;
  cameraId: string;
  roomNumber: string;
  title: string;
  activityType: string;
  psychologicalMethod: string;
  professorName: string;
  professorAvatar: string;
  professorTitle: string;
  patientCode: string; // Anonymous, e.g. "PT-9012"
  startedAt: string;
  viewerCount: number;
  description: string;
  sessionObjectives: string[];
  cameraState: CameraState;
  relatedCaseId?: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl?: string;
  duration: string; // e.g. "45:20"
  activityType: string; // e.g. "Individual konsultatsiya", "Guruh terapiyasi", "Diagnostik suhbat"
  method: string; // e.g. "KBT (Kognitiv-xulq-atvor)", "Gestalt", "Faol tinglash", "Art-terapiya"
  professor: string;
  professorTitle: string;
  professorAvatar: string;
  department: string;
  recordedDate: string;
  viewCount: number;
  status: VideoState;
  patientCode?: string; // Anonymous e.g. "PT-9012"
  educationalObjective?: string;
  supervisorComment?: string;
  appliedMethods: {
    title: string;
    description: string;
    timestamp: string;
  }[];
  relatedMaterialIds: string[];
  relatedCaseId?: string;
}

export interface Material {
  id: string;
  title: string;
  description: string;
  fileType: 'pdf' | 'docx' | 'pptx';
  fileSize: string;
  author: string;
  authorTitle: string;
  department: string;
  category: 'Metodik qo‘llanma' | 'Diagnostika shabloni' | 'Taqdimot' | 'Protokol';
  pagesCount: number;
  updatedAt: string;
  downloadCount: number;
  relatedVideoIds?: string[];
  relatedCaseIds?: string[];
  tableOfContents?: string[];
  summary?: string;
  subject?: string;
  tags?: string[];
  status?: 'Published' | 'Draft' | 'Archived';
}

export interface CaseStudy {
  id: string;
  caseNumber: string; // e.g. "Case #024"
  patientCode: string; // e.g. "PT-9012" (strictly anonymized)
  title: string;
  topic: string;
  ageGroup: string; // e.g. "Kattalar (25–35 yosh)", "O‘smirlar (14–17 yosh)"
  method: string;
  difficulty: 'Boshlang‘ich' | 'O‘rta' | 'Murakkab';
  presentingProblem: string;
  observedSymptoms: string[];
  approachDescription: string;
  outcomeSummary: string;
  relatedVideoId?: string;
  relatedMaterialIds: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'live' | 'video' | 'material' | 'case' | 'system';
  link: string;
}

export interface ProfessorSession {
  id: string;
  title: string;
  date: string;
  activityType: string;
  roomNumber: string;
  duration: string;
  status: VideoState;
  psychologicalDirection: string;
  topic: string;
  method: string;
  educationalObjective: string;
  difficulty: 'Boshlang‘ich' | 'O‘rta' | 'Murakkab';
  tags: string[];
  patientCode: string; // Strictly anonymized e.g. "PT-9012"
  ageGroup: string;
  minimalPatientInfo: string;
}

export interface TeachingActivity {
  id: string;
  subject: string;
  time: string;
  type: 'Ma’ruza' | 'Amaliy seminar' | 'Laboratoriya';
  group: string;
  room: string;
}

export interface PracticalActivity {
  id: string;
  title: string;
  time: string;
  roomNumber: string;
  patientCode: string;
  type: string;
  method: string;
  status: 'Kutilmoqda' | 'Jarayonda' | 'Tugallandi';
}

// Supervisor Models
export interface ReviewActionLog {
  id: string;
  videoId: string;
  videoTitle: string;
  professorName: string;
  action: 'Approved' | 'Changes Requested' | 'Rejected';
  date: string;
  comment?: string;
  supervisorName: string;
}

// Admin Models
export interface Faculty {
  id: string;
  name: string;
  dean: string;
  departmentsCount: number;
  studentsCount: number;
  description: string;
}

export interface Department {
  id: string;
  name: string;
  facultyId: string;
  facultyName: string;
  headOfDepartment: string;
  professorsCount: number;
  description: string;
}

export interface Room {
  id: string;
  name: string;
  roomNumber: string;
  floor: number;
  faculty: string;
  department: string;
  purpose: string;
  cameraCount: number;
  status: 'Faol' | 'Band' | 'Bo‘sh' | 'Texnik xizmat';
}

export interface AnonymousPatient {
  id: string;
  patientCode: string; // e.g. "PT-9012"
  ageGroup: string; // e.g. "Kattalar (26 yosh)"
  totalSessions: number;
  firstVisitDate: string;
  lastVisitDate: string;
  primaryTopic: string;
  assignedProfessor: string;
  status: 'Faol' | 'Yakunlangan' | 'Kutilmoqda';
}
