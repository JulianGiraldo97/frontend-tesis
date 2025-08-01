// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'candidate' | 'employer' | 'admin';
  avatar?: string;
  accessibilityPreferences: AccessibilityPreferences;
}

export interface AccessibilityPreferences {
  highContrast: boolean;
  easyReading: boolean;
  keyboardNavigation: boolean;
  captions: boolean;
  screenReader: boolean;
}

// Authentication types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  role: 'candidate' | 'employer';
}

// Job posting types
export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  category: string;
  description: string;
  requirements: string[];
  benefits: string[];
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  postedDate: string;
  deadline?: string;
  isAccessible: boolean;
  accessibilityFeatures: string[];
}

// Candidate types
export interface Candidate {
  id: string;
  userId: string;
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: string[];
  accessibilityNeeds: string[];
  resumeUrl?: string;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  location: string;
  disability: string[];
  avatar?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
  achievements: string[];
}

// Application types
export interface JobApplication {
  id: string;
  jobId: string;
  candidateId: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
  appliedDate: string;
  coverLetter?: string;
  resumeUrl?: string;
  feedback?: string;
  accessibilityNotes?: string;
}

// Employer types
export interface Employer {
  id: string;
  userId: string;
  companyName: string;
  industry: string;
  size: 'small' | 'medium' | 'large';
  location: string;
  description: string;
  accessibilityCommitment: string;
  logoUrl?: string;
}

// Feedback types
export interface Feedback {
  id: string;
  applicationId: string;
  from: 'employer' | 'candidate';
  message: string;
  type: 'general' | 'accessibility' | 'technical' | 'cultural';
  createdAt: string;
  isRead: boolean;
}

// Navigation types
export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon: string;
  role: 'candidate' | 'employer' | 'admin' | 'all';
}

// Form types
export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'radio';
  required: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
} 