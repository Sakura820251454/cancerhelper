'use client';

// input: components/ui/button
// output: SymptomChecker 组件，症状自查工具
// pos: 症状自查组件，帮助用户了解可能的健康状况
// 一旦我被更新务必更新我的开头注释以及所属文件夹的 md

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Symptom {
  id: number;
  name: string;
  category: string;
}

interface SymptomGroup {
  id: number;
  name: string;
  symptoms: Symptom[];
}

const symptomGroups: SymptomGroup[] = [
  {
    id: 1,
    name: '全身症状',
    symptoms: [
      { id: 101, name: '发热', category: '全身' },
      { id: 102, name: '乏力', category: '全身' },
      { id: 103, name: '体重下降', category: '全身' },
      { id: 104, name: '盗汗', category: '全身' },
      { id: 105, name: '食欲不振', category: '全身' },
      { id: 106, name: '贫血', category: '全身' }
    ]
  },
  {
    id: 2,
    name: '呼吸系统',
    symptoms: [
      { id: 201, name: '咳嗽', category: '呼吸' },
      { id: 202, name: '咳血', category: '呼吸' },
      { id: 203, name: '胸痛', category: '呼吸' },
      { id: 204, name: '呼吸困难', category: '呼吸' },
      { id: 205, name: '声音嘶哑', category: '呼吸' },
      { id: 206, name: '喘息', category: '呼吸' }
    ]
  },
  {
    id: 3,
    name: '消化系统',
    symptoms: [
      { id: 301, name: '吞咽困难', category: '消化' },
      { id: 302, name: '腹痛', category: '消化' },
      { id: 303, name: '便血', category: '消化' },
      { id: 304, name: '腹胀', category: '消化' },
      { id: 305, name: '恶心', category: '消化' },
      { id: 306, name: '呕吐', category: '消化' }
    ]
  },
  {
    id: 4,
    name: '泌尿系统',
    symptoms: [
      { id: 401, name: '尿频', category: '泌尿' },
      { id: 402, name: '尿急', category: '泌尿' },
      { id: 403, name: '尿痛', category: '泌尿' },
      { id: 404, name: '血尿', category: '泌尿' },
      { id: 405, name: '排尿困难', category: '泌尿' }
    ]
  }
];

const SymptomChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState<'select' | 'analyze'>('select');
  const [symptomDuration, setSymptomDuration] = useState('');
  const [symptomSeverity, setSymptomSeverity] = useState('');

  const toggleSymptom = (symptomId: number) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const analyzeSymptoms = () => {
    if (selectedSymptoms.length === 0) return;
    setCurrentStep('analyze');
  };

  const resetChecker = () => {
    setSelectedSymptoms([]);
    setCurrentStep('select');
    setSymptomDuration('');
    setSymptomSeverity('');
  };

  const getSelectedSymptomNames = () => {
    return symptomGroups
      .flatMap(group => group.symptoms)
      .filter(symptom => selectedSymptoms.includes(symptom.id))
      .map(symptom => symptom.name);
  };

  const getPossibleConditions = () => {
    // This is a simplified analysis - in a real application, this would use medical knowledge base
    const conditions = [];

    if (selectedSymptoms.includes(102) || selectedSymptoms.includes(202)) {
      conditions.push({
        name: '呼吸系统疾病',
        description: '建议尽快就医检查肺部健康状况',
        urgency: '高'
      });
    }

    if (selectedSymptoms.includes(302) || selectedSymptoms.includes(303)) {
      conditions.push({
        name: '消化系统疾病',
        description: '建议进行消化道检查',
        urgency: '中'
      });
    }

    if (selectedSymptoms.includes(104) || selectedSymptoms.includes(103)) {
      conditions.push({
        name: '全身性疾病',
        description: '建议进行全面体检',
        urgency: '高'
      });
    }

    if (selectedSymptoms.includes(401) || selectedSymptoms.includes(404)) {
      conditions.push({
        name: '泌尿系统疾病',
        description: '建议进行泌尿系统检查',
        urgency: '中'
      });
    }

    // Default response
    if (conditions.length === 0) {
      conditions.push({
        name: '一般性症状',
        description: '建议观察症状变化，如持续或加重请及时就医',
        urgency: '低'
      });
    }

    return conditions;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">症状自查工具</h1>

      {currentStep === 'select' ? (
        <div className="space-y-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm">
              <strong>注意：</strong>此工具仅供参考，不能替代专业医疗诊断。
              如有严重不适，请立即就医。
            </p>
          </div>

          <div className="mb-6">
            <p className="text-lg text-gray-700 mb-4">
              请选择您正在经历的症状（可多选）：
            </p>
            <div className="text-sm text-gray-500 mb-2">
              已选择 {selectedSymptoms.length} 个症状
            </div>
          </div>

          <div className="space-y-6">
            {symptomGroups.map((group) => (
              <div key={group.id} className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {group.name}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {group.symptoms.map((symptom) => (
                    <button
                      key={symptom.id}
                      onClick={() => toggleSymptom(symptom.id)}
                      className={`px-4 py-3 rounded-lg text-center transition-colors ${
                        selectedSymptoms.includes(symptom.id)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {symptom.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={resetChecker}>
              重置
            </Button>
            <Button
              onClick={analyzeSymptoms}
              disabled={selectedSymptoms.length === 0}
            >
              开始分析
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">分析结果</h2>

            {/* Selected Symptoms */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-2">您选择的症状：</h3>
              <div className="flex flex-wrap gap-2">
                {getSelectedSymptomNames().map((name, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {name}
                  </span>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  症状持续时间
                </label>
                <select
                  value={symptomDuration}
                  onChange={(e) => setSymptomDuration(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">请选择</option>
                  <option value="less-than-week">少于1周</option>
                  <option value="1-4-weeks">1-4周</option>
                  <option value="1-3-months">1-3个月</option>
                  <option value="more-than-3-months">3个月以上</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  症状严重程度
                </label>
                <select
                  value={symptomSeverity}
                  onChange={(e) => setSymptomSeverity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">请选择</option>
                  <option value="mild">轻度</option>
                  <option value="moderate">中度</option>
                  <option value="severe">重度</option>
                </select>
              </div>
            </div>

            {/* Possible Conditions */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-700 mb-4">可能的健康状况：</h3>
              <div className="space-y-4">
                {getPossibleConditions().map((condition, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">{condition.name}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        condition.urgency === '高'
                          ? 'bg-red-100 text-red-800'
                          : condition.urgency === '中'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {condition.urgency}优先级
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{condition.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                重要提醒
              </h3>
              <ul className="text-yellow-700 text-sm space-y-1">
                <li>• 此分析结果仅供参考，不能替代专业医疗诊断</li>
                <li>• 如症状严重或持续加重，请立即就医</li>
                <li>• 建议到正规医院进行详细检查</li>
                <li>• 请勿自行诊断或用药</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <Button variant="outline" onClick={resetChecker}>
              重新检查
            </Button>
            <Button variant="primary">
              寻找专家医生
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomChecker;