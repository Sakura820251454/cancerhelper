// input: components/profile
// output: ProfilePage 组件，个人档案页面
// pos: 个人档案路由页面
// 一旦我被更新务必更新我的开头注释以及所属文件夹的 md

import UserProfile from "@/components/profile";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <UserProfile />
    </div>
  );
}