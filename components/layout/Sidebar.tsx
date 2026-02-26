// input: lucide-react icons
// output: Sidebar navigation component
// pos: Navigation sidebar with links to main application sections
// 一旦我被更新务必更新我的开头注释以及所属文件夹的 md

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Pill,
  Activity,
  FileText,
  Menu,
  X,
} from 'lucide-react';
import { NAVIGATION_ITEMS } from '../../lib/constants';

interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ isOpen = true, onToggle }: SidebarProps) {
  const pathname = usePathname();

  const iconMap: Record<string, React.ReactNode> = {
    Home: <Home size={20} />,
    Pill: <Pill size={20} />,
    Activity: <Activity size={20} />,
    FileText: <FileText size={20} />,
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-0
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Activity className="text-white" size={20} />
            </div>
            <h1 className="text-xl font-bold text-gray-900">健康助理</h1>
          </div>
          <button
            onClick={onToggle}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-1">
            {NAVIGATION_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => {
                      if (typeof window !== 'undefined' && window.innerWidth < 1024 && onToggle) {
                        onToggle();
                      }
                    }}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                      ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}
                    `}
                  >
                    {iconMap[item.icon]}
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            <p>© 2026 癌症患者健康助理平台</p>
            <p className="mt-1">仅供参考，请以医生诊断为准</p>
          </div>
        </div>
      </aside>
    </>
  );
}

export function MobileMenuButton({ onToggle }: { onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
    >
      <Menu size={24} />
    </button>
  );
}
