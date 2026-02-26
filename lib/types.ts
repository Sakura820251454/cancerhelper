// input: none
// output: TypeScript type definitions for the entire application
// pos: Type definitions for all data models used across the application
// 一旦我被更新务必更新我的开头注释以及所属文件夹的 md

// Patient Profile Types
export interface PatientProfile {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'other';
  birthDate: string; // ISO date string
  height?: number; // in cm
  weight?: number; // in kg
  bloodType?: string;
  pastMedicalHistory?: string[];
  allergies?: string[];
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  notes?: string;
}

// Medication Types
export type MedicationFrequency = 'daily' | 'weekly' | 'monthly' | 'as_needed';
export type MedicationStatus = 'active' | 'completed' | 'paused';

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: MedicationFrequency;
  scheduleTimes: string[]; // ['08:00', '20:00']
  startDate: string; // ISO date string
  endDate?: string; // ISO date string
  notes?: string;
  status: MedicationStatus;
}

// Treatment Types
export type TreatmentType = 'chemotherapy' | 'radiation' | 'surgery' | 'immunotherapy' | 'other';
export type TreatmentStatus = 'active' | 'completed' | 'paused';

export interface Treatment {
  id: string;
  name: string;
  type: TreatmentType;
  startDate: string; // ISO date string
  endDate?: string; // ISO date string
  status: TreatmentStatus;
  expectedEffect?: string;
  doctorAdvice?: string;
  notes?: string;
}

// Medical Report Types
export type ReportType = 'ct' | 'mri' | 'blood' | 'pathology' | 'other';

export interface MedicalReport {
  id: string;
  title: string;
  type: ReportType;
  reportDate: string; // ISO date string
  uploadDate: string; // ISO date string
  fileName?: string;
  filePath?: string; // In MVP, this will be a simulated path
  keyIndicators?: Record<string, string>; // Key values extracted from report
  notes?: string;
  rawContent?: string; // Extracted text from the report
}

// Form Types
export type FormMode = 'create' | 'edit';
