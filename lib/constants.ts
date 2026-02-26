// input: none
// output: Constants and configuration values for the application
// pos: Shared constants for medications, treatments, reports, and UI
// 一旦我被更新务必更新我的开头注释以及所属文件夹的 md

// Medication Frequency Options
export const MEDICATION_FREQUENCY_OPTIONS = [
  { value: 'daily', label: '每日' },
  { value: 'weekly', label: '每周' },
  { value: 'monthly', label: '每月' },
  { value: 'as_needed', label: '按需' },
] as const;

// Medication Status Options
export const MEDICATION_STATUS_OPTIONS = [
  { value: 'active', label: '进行中' },
  { value: 'completed', label: '已完成' },
  { value: 'paused', label: '已暂停' },
] as const;

// Treatment Type Options
export const TREATMENT_TYPE_OPTIONS = [
  { value: 'chemotherapy', label: '化疗' },
  { value: 'radiation', label: '放疗' },
  { value: 'surgery', label: '手术' },
  { value: 'immunotherapy', label: '免疫治疗' },
  { value: 'other', label: '其他' },
] as const;

// Treatment Status Options
export const TREATMENT_STATUS_OPTIONS = [
  { value: 'active', label: '进行中' },
  { value: 'completed', label: '已完成' },
  { value: 'paused', label: '已暂停' },
] as const;

// Report Type Options
export const REPORT_TYPE_OPTIONS = [
  { value: 'ct', label: 'CT检查' },
  { value: 'mri', label: 'MRI检查' },
  { value: 'blood', label: '血液检查' },
  { value: 'pathology', label: '病理报告' },
  { value: 'other', label: '其他' },
] as const;

// Gender Options
export const GENDER_OPTIONS = [
  { value: 'male', label: '男' },
  { value: 'female', label: '女' },
  { value: 'other', label: '其他' },
] as const;

// Blood Type Options
export const BLOOD_TYPE_OPTIONS = [
  { value: 'A', label: 'A型' },
  { value: 'B', label: 'B型' },
  { value: 'AB', label: 'AB型' },
  { value: 'O', label: 'O型' },
  { value: '', label: '未知' },
] as const;

// Navigation Items
export const NAVIGATION_ITEMS = [
  { href: '/', label: '健康概览', icon: 'Home' },
  { href: '/medications', label: '用药管理', icon: 'Pill' },
  { href: '/treatments', label: '治疗管理', icon: 'Activity' },
  { href: '/reports', label: '报告管理', icon: 'FileText' },
] as const;

// Storage Keys
export const STORAGE_KEYS = {
  PATIENT_PROFILE: 'cancerhelper_patient_profile',
  MEDICATIONS: 'cancerhelper_medications',
  TREATMENTS: 'cancerhelper_treatments',
  REPORTS: 'cancerhelper_reports',
} as const;

// Default Schedule Times
export const DEFAULT_SCHEDULE_TIMES = ['08:00', '12:00', '18:00', '22:00'] as const;
