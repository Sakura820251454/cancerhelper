'use client';

// input: components/ui/button
// output: UserProfile 组件，个人档案管理
// pos: 个人档案组件，管理用户基础信息和健康数据
// 一旦我被更新务必更新我的开头注释以及所属文件夹的 md

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface UserProfile {
  name: string;
  gender: string;
  birthDate: string;
  height: number;
  weight: number;
  bloodType: string;
  phone: string;
  email: string;
  pastMedicalHistory: string[];
  allergies: string[];
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}

const UserProfile = () => {
  const [userData, setUserData] = useState<UserProfile>({
    name: '张三',
    gender: '男',
    birthDate: '1970-01-01',
    height: 170,
    weight: 65,
    bloodType: 'A',
    phone: '13800138000',
    email: 'zhangsan@example.com',
    pastMedicalHistory: ['高血压'],
    allergies: ['青霉素'],
    emergencyContact: {
      name: '李四',
      phone: '13900139000',
      relationship: '配偶'
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState<UserProfile>(userData);

  const handleSave = () => {
    setUserData(tempData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData({ ...userData });
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string | number | string[] | { name: string; phone: string; relationship: string }) => {
    setTempData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const BMI = userData.weight ? (userData.weight / ((userData.height / 100) ** 2)).toFixed(1) : 'N/A';
  const BMINumber = BMI !== 'N/A' ? parseFloat(BMI) : 0;

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">个人档案</h1>

      {/* Basic Info Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">基本信息</h2>
          <Button variant="outline" onClick={() => isEditing ? handleCancel() : setIsEditing(!isEditing)}>
            {isEditing ? '取消编辑' : '编辑信息'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
            {isEditing ? (
              <input
                type="text"
                value={tempData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{userData.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">性别</label>
            {isEditing ? (
              <select
                value={tempData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="男">男</option>
                <option value="女">女</option>
              </select>
            ) : (
              <p className="text-gray-900">{userData.gender}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">出生日期</label>
            {isEditing ? (
              <input
                type="date"
                value={tempData.birthDate}
                onChange={(e) => handleInputChange('birthDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{userData.birthDate}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">手机号码</label>
            {isEditing ? (
              <input
                type="tel"
                value={tempData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{userData.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">邮箱地址</label>
            {isEditing ? (
              <input
                type="email"
                value={tempData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{userData.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">血型</label>
            {isEditing ? (
              <select
                value={tempData.bloodType}
                onChange={(e) => handleInputChange('bloodType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">请选择</option>
                <option value="A">A型</option>
                <option value="B">B型</option>
                <option value="AB">AB型</option>
                <option value="O">O型</option>
                <option value="RH-">RH阴性</option>
              </select>
            ) : (
              <p className="text-gray-900">{userData.bloodType}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">身高 (cm)</label>
            {isEditing ? (
              <input
                type="number"
                value={tempData.height}
                onChange={(e) => handleInputChange('height', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{userData.height}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">体重 (kg)</label>
            {isEditing ? (
              <input
                type="number"
                value={tempData.weight}
                onChange={(e) => handleInputChange('weight', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-900">{userData.weight}</p>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="mt-6 flex space-x-4">
            <Button variant="primary" onClick={handleSave}>
              保存
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              取消
            </Button>
          </div>
        )}
      </div>

      {/* Health Stats Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">健康指标</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-800 mb-1">BMI指数</p>
            <p className="text-2xl font-bold text-blue-600">{BMI}</p>
            <p className="text-sm text-blue-600 mt-1">
              {BMI === 'N/A' ? '暂无数据' :
               BMINumber < 18.5 ? '偏瘦' :
               BMINumber < 24 ? '正常' :
               BMINumber < 28 ? '超重' : '肥胖'}
            </p>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-green-800 mb-1">年龄</p>
            <p className="text-2xl font-bold text-green-600">54</p>
            <p className="text-sm text-green-600 mt-1">岁</p>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-purple-800 mb-1">健康管理</p>
            <p className="text-2xl font-bold text-purple-600">良好</p>
            <p className="text-sm text-purple-600 mt-1">持续改善中</p>
          </div>
        </div>
      </div>

      {/* Medical History Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">病史记录</h2>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">既往病史</h3>
          {isEditing ? (
            <div>
              <textarea
                value={tempData.pastMedicalHistory.join('\n')}
                onChange={(e) => handleInputChange('pastMedicalHistory', e.target.value.split('\n').filter(Boolean))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="每行输入一个病史"
              />
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {userData.pastMedicalHistory.map((history, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {history}
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">过敏史</h3>
          {isEditing ? (
            <div>
              <textarea
                value={tempData.allergies.join('\n')}
                onChange={(e) => handleInputChange('allergies', e.target.value.split('\n').filter(Boolean))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="每行输入一个过敏源"
              />
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {userData.allergies.map((allergy, index) => (
                <span key={index} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                  {allergy}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Emergency Contact Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">紧急联系人</h2>

        {isEditing ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
              <input
                type="text"
                value={tempData.emergencyContact.name}
                onChange={(e) => handleInputChange('emergencyContact', {
                  ...tempData.emergencyContact,
                  name: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">关系</label>
              <input
                type="text"
                value={tempData.emergencyContact.relationship}
                onChange={(e) => handleInputChange('emergencyContact', {
                  ...tempData.emergencyContact,
                  relationship: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">电话</label>
              <input
                type="tel"
                value={tempData.emergencyContact.phone}
                onChange={(e) => handleInputChange('emergencyContact', {
                  ...tempData.emergencyContact,
                  phone: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">姓名</p>
              <p className="font-medium text-gray-900">{userData.emergencyContact.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">关系</p>
              <p className="font-medium text-gray-900">{userData.emergencyContact.relationship}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">电话</p>
              <p className="font-medium text-gray-900">{userData.emergencyContact.phone}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;