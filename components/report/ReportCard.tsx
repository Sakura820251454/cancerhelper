// input: lib/types.ts, lucide-react, ui components
// output: ReportCard component for displaying individual medical report
// pos: Card component showing report details with type and date
// 一旦我被更新务必更新我的开头注释以及所属文件夹的 md

'use client';

import React from 'react';
import { FileText, Calendar, MoreVertical, Trash2, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import type { MedicalReport, ReportType } from '../../lib/types';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface ReportCardProps {
  report: MedicalReport;
  onDelete: (id: string) => void;
  onView?: (id: string) => void;
}

const typeConfig: Record<ReportType, { variant: 'primary' | 'info' | 'success' | 'warning' | 'gray'; label: string }> = {
  ct: { variant: 'primary', label: 'CT检查' },
  mri: { variant: 'info', label: 'MRI检查' },
  blood: { variant: 'success', label: '血液检查' },
  pathology: { variant: 'warning', label: '病理报告' },
  other: { variant: 'gray', label: '其他' },
};

export function ReportCard({ report, onDelete, onView }: ReportCardProps) {
  const typeInfo = typeConfig[report.type];

  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="text-green-600" size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-900 truncate">{report.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={typeInfo.variant}>{typeInfo.label}</Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
              <Calendar size={16} />
              <span>
                报告日期：{format(new Date(report.reportDate), 'yyyy年M月d日', { locale: zhCN })}
              </span>
            </div>

            {report.keyIndicators && Object.keys(report.keyIndicators).length > 0 && (
              <div className="mb-3">
                <p className="text-sm font-medium text-gray-700 mb-2">关键指标：</p>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(report.keyIndicators).slice(0, 4).map(([key, value]) => (
                    <div key={key} className="text-xs">
                      <span className="text-gray-500">{key}：</span>
                      <span className="text-gray-900 font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {report.notes && (
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">{report.notes}</p>
            )}
          </div>

          <div className="ml-4">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 rounded hover:bg-gray-100"
            >
              <MoreVertical size={18} className="text-gray-500" />
            </button>

            {showMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                  {onView && (
                    <button
                      onClick={() => {
                        onView(report.id);
                        setShowMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <ExternalLink size={14} />
                      查看详情
                    </button>
                  )}
                  <button
                    onClick={() => {
                      onDelete(report.id);
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Trash2 size={14} />
                    删除
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
