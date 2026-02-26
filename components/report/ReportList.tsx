// input: lib/types.ts, lucide-react, ui components, report components
// output: ReportList component for displaying all medical reports
// pos: List component showing all reports with empty state
// 一旦我被更新务必更新我的开头注释以及所属文件夹的 md

'use client';

import React, { useState } from 'react';
import { Upload, FileText } from 'lucide-react';
import { ReportCard } from './ReportCard';
import { ReportUpload } from './ReportUpload';
import { Button } from '../ui/button';
import type { MedicalReport } from '../../lib/types';
import { deleteReport, getReportById } from '../../lib/storage';

interface ReportListProps {
  reports: MedicalReport[];
  onUpdate: () => void;
}

export function ReportList({ reports, onUpdate }: ReportListProps) {
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const handleDelete = (id: string) => {
    if (confirm('确定要删除这份报告吗？')) {
      deleteReport(id);
      onUpdate();
    }
  };

  const handleView = (id: string) => {
    const report = getReportById(id);
    if (report) {
      // In MVP, we'll just show a simple alert
      let details = `报告：${report.title}\n类型：${report.type}\n报告日期：${report.reportDate}\n上传日期：${report.uploadDate}`;
      if (report.fileName) {
        details += `\n文件名：${report.fileName}`;
      }
      if (report.keyIndicators) {
        details += '\n\n关键指标：';
        Object.entries(report.keyIndicators).forEach(([key, value]) => {
          details += `\n  ${key}: ${value}`;
        });
      }
      if (report.notes) {
        details += `\n\n备注：${report.notes}`;
      }
      alert(details);
    }
  };

  if (reports.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-gray-100 rounded-full">
            <FileText className="text-gray-400" size={48} />
          </div>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">暂无报告记录</h3>
        <p className="text-gray-500 mb-6">点击下方按钮上传您的第一份报告</p>
        <Button onClick={() => setIsUploadOpen(true)}>
          <Upload size={18} className="mr-2" />
          上传报告
        </Button>

        <ReportUpload
          isOpen={isUploadOpen}
          onClose={() => setIsUploadOpen(false)}
          onSuccess={onUpdate}
        />
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex justify-end">
        <Button onClick={() => setIsUploadOpen(true)}>
          <Upload size={18} className="mr-2" />
          上传报告
        </Button>
      </div>

      <div className="grid gap-4">
        {reports.map((report) => (
          <ReportCard
            key={report.id}
            report={report}
            onDelete={handleDelete}
            onView={handleView}
          />
        ))}
      </div>

      <ReportUpload
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSuccess={onUpdate}
      />
    </>
  );
}
