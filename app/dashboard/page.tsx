// input: components/dashboard
// output: DashboardPage 组件，健康概览页面
// pos: 健康概览路由页面
// 一旦我被更新务必我的开头注释以及所属文件夹的 md

import HealthDashboard from "@/components/dashboard";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HealthDashboard />
    </div>
  );
}