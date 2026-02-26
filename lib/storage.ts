// input: lib/types.ts, lib/constants.ts
// output: localStorage wrapper functions for data persistence
// pos: Handles all localStorage operations with proper serialization and error handling
// 一旦我被更新务必更新我的开头注释以及所属文件夹的 md

import type {
  PatientProfile,
  Medication,
  Treatment,
  MedicalReport,
} from './types';
import { STORAGE_KEYS } from './constants';

// Generic storage functions
function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;

  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return defaultValue;
  }
}

function setToStorage<T>(key: string, value: T): boolean {
  if (typeof window === 'undefined') return false;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage key "${key}":`, error);
    return false;
  }
}

// Patient Profile Storage
export function getPatientProfile(): PatientProfile | null {
  return getFromStorage<PatientProfile | null>(STORAGE_KEYS.PATIENT_PROFILE, null);
}

export function savePatientProfile(profile: PatientProfile): boolean {
  return setToStorage(STORAGE_KEYS.PATIENT_PROFILE, profile);
}

export function clearPatientProfile(): void {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(STORAGE_KEYS.PATIENT_PROFILE);
  }
}

// Medication Storage
export function getMedications(): Medication[] {
  return getFromStorage<Medication[]>(STORAGE_KEYS.MEDICATIONS, []);
}

export function saveMedications(medications: Medication[]): boolean {
  return setToStorage(STORAGE_KEYS.MEDICATIONS, medications);
}

export function addMedication(medication: Medication): boolean {
  const medications = getMedications();
  medications.push(medication);
  return saveMedications(medications);
}

export function updateMedication(id: string, updates: Partial<Medication>): boolean {
  const medications = getMedications();
  const index = medications.findIndex(m => m.id === id);
  if (index === -1) return false;

  medications[index] = { ...medications[index], ...updates };
  return saveMedications(medications);
}

export function deleteMedication(id: string): boolean {
  const medications = getMedications().filter(m => m.id !== id);
  return saveMedications(medications);
}

export function getMedicationById(id: string): Medication | undefined {
  return getMedications().find(m => m.id === id);
}

// Treatment Storage
export function getTreatments(): Treatment[] {
  return getFromStorage<Treatment[]>(STORAGE_KEYS.TREATMENTS, []);
}

export function saveTreatments(treatments: Treatment[]): boolean {
  return setToStorage(STORAGE_KEYS.TREATMENTS, treatments);
}

export function addTreatment(treatment: Treatment): boolean {
  const treatments = getTreatments();
  treatments.push(treatment);
  return saveTreatments(treatments);
}

export function updateTreatment(id: string, updates: Partial<Treatment>): boolean {
  const treatments = getTreatments();
  const index = treatments.findIndex(t => t.id === id);
  if (index === -1) return false;

  treatments[index] = { ...treatments[index], ...updates };
  return saveTreatments(treatments);
}

export function deleteTreatment(id: string): boolean {
  const treatments = getTreatments().filter(t => t.id !== id);
  return saveTreatments(treatments);
}

export function getTreatmentById(id: string): Treatment | undefined {
  return getTreatments().find(t => t.id === id);
}

// Report Storage
export function getReports(): MedicalReport[] {
  return getFromStorage<MedicalReport[]>(STORAGE_KEYS.REPORTS, []);
}

export function saveReports(reports: MedicalReport[]): boolean {
  return setToStorage(STORAGE_KEYS.REPORTS, reports);
}

export function addReport(report: MedicalReport): boolean {
  const reports = getReports();
  reports.push(report);
  return saveReports(reports);
}

export function updateReport(id: string, updates: Partial<MedicalReport>): boolean {
  const reports = getReports();
  const index = reports.findIndex(r => r.id === id);
  if (index === -1) return false;

  reports[index] = { ...reports[index], ...updates };
  return saveReports(reports);
}

export function deleteReport(id: string): boolean {
  const reports = getReports().filter(r => r.id !== id);
  return saveReports(reports);
}

export function getReportById(id: string): MedicalReport | undefined {
  return getReports().find(r => r.id === id);
}

// Helper function to generate unique IDs
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Initialize storage with default data if empty
export function initializeStorage(): void {
  if (typeof window === 'undefined') return;

  // These will be populated by the mock data import
  // The initialization happens in the application
}
