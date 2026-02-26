// input: components/report
// output: ReportsPage 组件，报告管理页面
// pos: 报告管理路由页面
// 一旦我被更新务必更新我的开头注释以及所属文件夹的 md

import ReportManager from "@/components/report";

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ReportManager />
    </div>
  );
}