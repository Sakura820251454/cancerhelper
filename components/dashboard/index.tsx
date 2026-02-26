// input: components/ui/button
// output: HealthDashboard 组件，健康概览
// pos: 健康Dashboard组件，展示用药提醒、治疗进度和快捷操作
// 一旦我被更新务必更新我的开头注释以及所属文件夹的 md

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const HealthDashboard = () => {
  // Mock data
  const todayMedications = [
    { id: 1, name: '阿托伐他汀钙片', dosage: '20mg', time: '08:00', status: 'pending' },
    { id: 2, name: '奥沙利铂', dosage: '150mg/m²', time: '14:00', status: 'pending' },
    { id: 3, name: '枸橼酸他莫昔芬', dosage: '10mg', time: '20:00', status: 'taken' }
  ];

  const activeTreatments = [
    { id: 1, name: '新辅助化疗', progress: 40, doctor: '李医生' },
    { id: 2, name: '内分泌治疗', progress: 30, doctor: '张医生' }
  ];

  const recentReports = [
    { id: 1, title: '血常规检查', date: '2024-02-20', type: '血液' },
    { id: 2, title: '胸部CT', date: '2024-02-15', type: 'CT' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'taken': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'missed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTreatmentColor = (progress: number) => {
    if (progress < 30) return 'bg-red-500';
    if (progress < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getProgressText = (progress: number) => {
    if (progress < 30) return '进行中';
    if (progress < 70) return '稳定';
    return '良好';
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">健康概览</h1>

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-2">早上好，张先生</h2>
        <p className="text-blue-100 mb-4">今天是您治疗的第 42 天，加油！</p>
        <div className="flex items-center space-x-4">
          <div className="text-sm">
            <p>下次复诊</p>
            <p className="font-semibold">2024年3月1日</p>
          </div>
          <div className="w-px h-8 bg-white/30"></div>
          <div className="text-sm">
            <p>用药依从率</p>
            <p className="font-semibold">95%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">个人档案</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">姓名</p>
                <p className="font-medium text-gray-900">张三</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">病情</p>
                <p className="font-medium text-gray-900">乳腺癌（化疗中）</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">主治医生</p>
                <p className="font-medium text-gray-900">李医生</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">紧急联系人</p>
                <p className="font-medium text-gray-900">李四（配偶）</p>
              </div>
            </div>
            <Link href="/profile">
              <Button variant="outline" className="w-full mt-4">
                编辑档案
              </Button>
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">快捷操作</h3>
            <div className="space-y-3">
              <Link href="/medications">
                <Button variant="outline" className="w-full justify-start">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  记录用药
                </Button>
              </Link>
              <Link href="/treatments">
                <Button variant="outline" className="w-full justify-start">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  添加治疗
                </Button>
              </Link>
              <Link href="/reports">
                <Button variant="outline" className="w-full justify-start">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  上传报告
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Medication */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">今日用药</h3>
              <Link href="/medications">
                <Button variant="ghost" size="sm">
                  查看全部
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              {todayMedications.map((med) => (
                <div key={med.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                    <div>
                      <p className="font-medium text-gray-900">{med.name}</p>
                      <p className="text-sm text-gray-600">{med.dosage}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">{med.time}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(med.status)}`}>
                      {med.status === 'taken' ? '已服用' : '待服用'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <span className="font-medium">提示：</span>请按时服药，如有不适请及时联系医生
              </p>
            </div>
          </div>

          {/* Treatment Progress */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">治疗进度</h3>
              <Link href="/treatments">
                <Button variant="ghost" size="sm">
                  查看详情
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {activeTreatments.map((treatment) => (
                <div key={treatment.id}>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="font-medium text-gray-900">{treatment.name}</p>
                      <p className="text-sm text-gray-600">主治医生：{treatment.doctor}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-700">{getProgressText(treatment.progress)}</span>
                      <span className="text-sm text-gray-500">{treatment.progress}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getTreatmentColor(treatment.progress)}`}
                      style={{ width: `${treatment.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reports */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">最近报告</h3>
              <Link href="/reports">
                <Button variant="ghost" size="sm">
                  查看全部
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              {recentReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{report.title}</p>
                    <p className="text-sm text-gray-600">{report.date}</p>
                  </div>
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                    {report.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthDashboard;