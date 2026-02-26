'use client';

// input: components/ui/button
// output: ReportManager 组件，报告管理
// pos: 报告管理组件，上传、解读和分析医疗报告
// 一旦我被更新务必更新我的开头注释以及所属文件夹的 md

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Report {
  id: string;
  title: string;
  type: string;
  uploadDate: string;
  reportDate: string;
  keyIndicators: { name: string; value: string; normal: string }[];
  aiInterpretation?: string;
  hasInterpretation: boolean;
}

const reports: Report[] = [
  {
    id: '1',
    title: '胸部CT检查报告',
    type: 'CT',
    uploadDate: '2024-02-20',
    reportDate: '2024-02-20',
    keyIndicators: [
      { name: '肿瘤大小', value: '2.3cm', normal: '<3cm' },
      { name: '淋巴结', value: '未见异常', normal: '正常' },
      { name: '肺门', value: '清晰', normal: '清晰' }
    ],
    hasInterpretation: true
  },
  {
    id: '2',
    title: '血常规检查',
    type: '血液',
    uploadDate: '2024-02-15',
    reportDate: '2024-02-15',
    keyIndicators: [
      { name: '白细胞计数', value: '3.5×10⁹/L', normal: '4-10×10⁹/L' },
      { name: '血红蛋白', value: '110g/L', normal: '120-160g/L' },
      { name: '血小板计数', value: '150×10⁹/L', normal: '100-300×10⁹/L' }
    ],
    hasInterpretation: false
  }
];

const ReportManager = () => {
  const [activeTab, setActiveTab] = useState<'list' | 'upload' | 'analysis'>('list');

  const getReportTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'CT': 'bg-blue-100 text-blue-800',
      'MRI': 'bg-purple-100 text-purple-800',
      'X光': 'bg-green-100 text-green-800',
      '血液': 'bg-red-100 text-red-800',
      '超声': 'bg-yellow-100 text-yellow-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">报告管理</h1>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
        <Button
          variant={activeTab === 'list' ? 'primary' : 'ghost'}
          onClick={() => setActiveTab('list')}
          className="flex-1"
        >
          报告列表
        </Button>
        <Button
          variant={activeTab === 'upload' ? 'primary' : 'ghost'}
          onClick={() => setActiveTab('upload')}
          className="flex-1"
        >
          上传报告
        </Button>
        <Button
          variant={activeTab === 'analysis' ? 'primary' : 'ghost'}
          onClick={() => setActiveTab('analysis')}
          className="flex-1"
        >
          趋势分析
        </Button>
      </div>

      {/* Content based on active tab */}
      <div className="transition-all duration-300">
        {activeTab === 'list' && (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">我的报告</h2>
              <p className="text-gray-600">管理您的医疗检查报告</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {reports.map((report) => (
                <div key={report.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getReportTypeColor(report.type)}`}>
                          {report.type}
                        </span>
                        {report.hasInterpretation && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                            已解读
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        报告日期：{report.reportDate} | 上传时间：{report.uploadDate}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        查看详情
                      </Button>
                      <Button variant="ghost" size="sm">
                        下载
                      </Button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">关键指标</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {report.keyIndicators.map((indicator, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-3">
                          <p className="text-sm text-gray-600">{indicator.name}</p>
                          <div className="flex items-center justify-between mt-1">
                            <p className="font-medium text-gray-900">{indicator.value}</p>
                            <p className="text-xs text-gray-500">{indicator.normal}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {!report.hasInterpretation && (
                    <div className="flex justify-end">
                      <Button variant="primary" size="sm">
                        AI智能解读
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'upload' && (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">上传报告</h2>
              <p className="text-gray-600">支持 PDF、JPG、PNG 格式</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-gray-600 mb-4">拖拽文件到此处或点击上传</p>
                <input type="file" className="hidden" id="file-upload" accept=".pdf,.jpg,.jpeg,.png" />
                <label htmlFor="file-upload">
                  <Button variant="primary">
                    选择文件
                  </Button>
                </label>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">报告信息</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">报告名称</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="例如：2024年2月胸部CT报告"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">报告类型</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">请选择</option>
                      <option value="CT">CT</option>
                      <option value="MRI">MRI</option>
                      <option value="X光">X光</option>
                      <option value="血液">血液</option>
                      <option value="超声">超声</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">报告日期</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">报告说明（可选）</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="添加报告相关的补充信息"
                />
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <Button variant="outline">取消</Button>
                <Button variant="primary">上传并提取文本</Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">趋势分析</h2>
              <p className="text-gray-600">查看关键指标的历史变化趋势</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">选择指标</label>
                <select className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="白细胞计数">白细胞计数</option>
                  <option value="血红蛋白">血红蛋白</option>
                  <option value="血小板计数">血小板计数</option>
                  <option value="肿瘤大小">肿瘤大小</option>
                </select>
              </div>

              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">图表区域 - 需要集成图表库</p>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-blue-800">最高值</p>
                  <p className="text-xl font-bold text-blue-600">5.2</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-green-800">最低值</p>
                  <p className="text-xl font-bold text-green-600">3.1</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-yellow-800">平均值</p>
                  <p className="text-xl font-bold text-yellow-600">4.2</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <p className="text-sm text-purple-800">趋势</p>
                  <p className="text-xl font-bold text-purple-600">稳定</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportManager;