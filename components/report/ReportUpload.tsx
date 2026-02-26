// input: lib/types.ts, lib/constants.ts, ui components
// output: ReportUpload component for uploading medical reports
// pos: Form component for report upload with file selection
// 一旦我被更新务必更新我的开头注释以及所属文件夹的 md

'use client';

import React, { useState, useRef } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { Dialog, DialogActions } from '../ui/Dialog';
import { Input, Textarea } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/button';
import type { MedicalReport, ReportType } from '../../lib/types';
import { REPORT_TYPE_OPTIONS } from '../../lib/constants';
import { generateId, addReport } from '../../lib/storage';

interface ReportUploadProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function ReportUpload({ isOpen, onClose, onSuccess }: ReportUploadProps) {
  const [formData, setFormData] = useState({
    title: '',
    type: 'other' as ReportType,
    reportDate: new Date().toISOString().split('T')[0],
    fileName: '',
    notes: '',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setFormData({
      title: '',
      type: 'other' as ReportType,
      reportDate: new Date().toISOString().split('T')[0],
      fileName: '',
      notes: '',
    });
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (!formData.title) {
        setFormData({ ...formData, title: file.name.replace(/\.[^/.]+$/, '') });
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      if (!formData.title) {
        setFormData({ ...formData, title: file.name.replace(/\.[^/.]+$/, '') });
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.reportDate) {
      alert('请填写必填字段');
      return;
    }

    const report: MedicalReport = {
      id: generateId(),
      title: formData.title!,
      type: formData.type!,
      reportDate: formData.reportDate!,
      uploadDate: new Date().toISOString(),
      fileName: selectedFile?.name || formData.fileName,
      filePath: selectedFile?.name || 'simulated/path',
      notes: formData.notes,
    };

    addReport(report);
    onSuccess();
    resetForm();
    onClose();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} title="上传报告" size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">选择文件</label>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`
              border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
              ${selectedFile ? 'border-green-300 bg-green-50' : ''}
            `}
          >
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
            />

            {selectedFile ? (
              <div className="flex items-center justify-center gap-2">
                <FileText className="text-green-600" size={24} />
                <div className="text-left">
                  <p className="font-medium text-gray-900">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="ml-2 p-1 hover:bg-gray-200 rounded"
                >
                  <X size={16} className="text-gray-500" />
                </button>
              </div>
            ) : (
              <div>
                <Upload className="mx-auto text-gray-400 mb-3" size={32} />
                <p className="text-sm text-gray-600 mb-1">拖拽文件到此处或点击选择</p>
                <p className="text-xs text-gray-400">支持 PDF、JPG、PNG 格式</p>
              </div>
            )}
          </div>
        </div>

        <Input
          label="报告标题 *"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="请输入报告标题"
        />

        <Select
          label="报告类型"
          options={REPORT_TYPE_OPTIONS}
          value={formData.type}
          onChange={(value) => setFormData({ ...formData, type: value as ReportType })}
        />

        <Input
          label="报告日期 *"
          type="date"
          value={formData.reportDate}
          onChange={(e) => setFormData({ ...formData, reportDate: e.target.value })}
        />

        <Textarea
          label="备注"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="添加备注信息..."
          rows={3}
        />

        <DialogActions>
          <Button type="button" variant="ghost" onClick={handleClose}>
            取消
          </Button>
          <Button type="submit">
            上传
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
