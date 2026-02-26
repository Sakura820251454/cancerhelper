// input: lib/types.ts
// output: Mock data for initial application demonstration
// pos: Provides sample data for medications, treatments, reports, and patient profile
// 一旦我被更新务必更新我的开头注释以及所属文件夹的 md

import type {
  PatientProfile,
  Medication,
  Treatment,
  MedicalReport,
} from '../lib/types';
import { generateId } from '../lib/storage';
import {
  getPatientProfile,
  getMedications,
  getTreatments,
  getReports,
  savePatientProfile,
  saveMedications,
  saveTreatments,
  saveReports,
} from '../lib/storage';

// Mock Patient Profile
export const mockPatientProfile: PatientProfile = {
  id: generateId(),
  name: '张女士',
  gender: 'female',
  birthDate: '1972-05-15',
  height: 165,
  weight: 58,
  bloodType: 'A',
  pastMedicalHistory: [
    '2024-01-10：左乳腺癌确诊',
    '2024-01-20：乳腺癌改良根治术',
  ],
  allergies: ['青霉素'],
  emergencyContactName: '李先生',
  emergencyContactPhone: '138****1234',
  notes: '目前处于术后化疗康复期',
};

// Mock Medications
export const mockMedications: Medication[] = [
  {
    id: generateId(),
    name: '阿那曲唑片',
    dosage: '1mg',
    frequency: 'daily',
    scheduleTimes: ['08:00'],
    startDate: '2024-02-01',
    endDate: '2026-02-01',
    status: 'active',
    notes: '每日早餐后服用',
  },
  {
    id: generateId(),
    name: '甲氨蝶呤片',
    dosage: '10mg',
    frequency: 'weekly',
    scheduleTimes: ['09:00'],
    startDate: '2024-02-05',
    endDate: '2024-06-05',
    status: 'active',
    notes: '每周一服用，饭后服用',
  },
  {
    id: generateId(),
    name: '奥美拉唑肠溶胶囊',
    dosage: '20mg',
    frequency: 'daily',
    scheduleTimes: ['07:00'],
    startDate: '2024-02-01',
    status: 'active',
    notes: '保护胃黏膜，餐前服用',
  },
  {
    id: generateId(),
    name: '多潘立酮片',
    dosage: '10mg',
    frequency: 'as_needed',
    scheduleTimes: [],
    startDate: '2024-02-10',
    status: 'active',
    notes: '出现恶心呕吐时服用，每日最多3次',
  },
];

// Mock Treatments
export const mockTreatments: Treatment[] = [
  {
    id: generateId(),
    name: '术后辅助化疗',
    type: 'chemotherapy',
    startDate: '2024-02-01',
    endDate: '2024-05-01',
    status: 'active',
    expectedEffect: '清除可能残留的癌细胞，降低复发风险',
    doctorAdvice: '化疗期间注意血常规监测，如有不适及时就医',
    notes: '已完成第2个周期，共6个周期',
  },
  {
    id: generateId(),
    name: '左乳腺癌改良根治术',
    type: 'surgery',
    startDate: '2024-01-20',
    endDate: '2024-01-20',
    status: 'completed',
    expectedEffect: '切除肿瘤组织',
    doctorAdvice: '术后注意伤口护理，避免上肢过度活动',
    notes: '手术顺利，恢复良好',
  },
  {
    id: generateId(),
    name: '放射治疗',
    type: 'radiation',
    startDate: '2024-05-15',
    endDate: '2024-06-15',
    status: 'paused',
    expectedEffect: '进一步清除局部病灶',
    doctorAdvice: '放疗期间注意保护皮肤',
    notes: '待化疗结束后进行',
  },
];

// Mock Medical Reports
export const mockReports: MedicalReport[] = [
  {
    id: generateId(),
    title: '术后病理报告',
    type: 'pathology',
    reportDate: '2024-01-25',
    uploadDate: '2024-01-26',
    fileName: 'pathology_report_20240125.pdf',
    keyIndicators: {
      '肿瘤大小': '2.5cm x 2.0cm',
      '淋巴结转移': '0/15',
      'ER': '阳性(95%)',
      'PR': '阳性(90%)',
      'HER2': '阴性',
      'Ki-67': '20%',
    },
    notes: '病理分期：T2N0M0，I期',
  },
  {
    id: generateId(),
    title: '血常规检查',
    type: 'blood',
    reportDate: '2024-02-15',
    uploadDate: '2024-02-16',
    fileName: 'blood_test_20240215.pdf',
    keyIndicators: {
      '白细胞': '3.2 ×10^9/L',
      '红细胞': '4.1 ×10^12/L',
      '血红蛋白': '118 g/L',
      '血小板': '186 ×10^9/L',
      '中性粒细胞': '1.8 ×10^9/L',
    },
    notes: '白细胞轻度降低，建议继续观察',
  },
  {
    id: generateId(),
    title: '胸部CT平扫',
    type: 'ct',
    reportDate: '2024-02-20',
    uploadDate: '2024-02-21',
    fileName: 'ct_scan_20240220.pdf',
    keyIndicators: {
      '术区情况': '未见明显异常强化',
      '肺野': '清晰',
      '纵隔': '淋巴结未见肿大',
    },
    notes: '术后复查，未见复发迹象',
  },
  {
    id: generateId(),
    title: '肿瘤标志物检测',
    type: 'blood',
    reportDate: '2024-03-01',
    uploadDate: '2024-03-02',
    fileName: 'tumor_markers_20240301.pdf',
    keyIndicators: {
      'CEA': '2.3 ng/mL',
      'CA15-3': '18.5 U/mL',
      'CA125': '15.2 U/mL',
    },
    notes: '肿瘤标志物在正常范围内',
  },
];

// Function to initialize mock data in localStorage
export function initializeMockData(): void {
  if (typeof window === 'undefined') return;

  if (!getPatientProfile()) {
    savePatientProfile(mockPatientProfile);
  }

  if (getMedications().length === 0) {
    saveMedications(mockMedications);
  }

  if (getTreatments().length === 0) {
    saveTreatments(mockTreatments);
  }

  if (getReports().length === 0) {
    saveReports(mockReports);
  }
}
