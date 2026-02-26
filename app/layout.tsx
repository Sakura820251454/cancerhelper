// input: next/font/google, ./globals.css, React, components/layout
// output: RootLayout 组件, metadata 元数据
// pos: 根布局组件，整个应用的最外层结构，包含侧边栏和主内容区
// 一旦我被更新务必更新我的开头注释以及所属文件夹的 md

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "癌症患者健康助理平台",
  description: "面向癌症患者的个人健康管理助手",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        {children}
      </body>
    </html>
  );
}
