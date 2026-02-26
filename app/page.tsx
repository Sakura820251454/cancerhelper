// input: components/dashboard, components/profile, components/report
// output: Home 组件，应用的首页
// pos: 首页组件，应用的默认路由页面，展示健康概览
// 一旦我被更新务必更新我的开头注释以及所属文件夹的 md

import HealthDashboard from "@/components/dashboard";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HealthDashboard />
    </div>
  );
}