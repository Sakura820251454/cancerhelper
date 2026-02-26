// input: lucide-react icons
// output: Header component with title and user actions
// pos: Top header with page title and user menu
// 一旦我被更新务必更新我的开头注释以及所属文件夹的 md

'use client';

import React from 'react';
import { User, Bell } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { NAVIGATION_ITEMS } from '../../lib/constants';

interface HeaderProps {
  onMenuToggle?: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const pathname = usePathname();

  // Get page title based on current route
  const currentPage = NAVIGATION_ITEMS.find((item) => item.href === pathname);
  const pageTitle = currentPage?.label || '健康助理';

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onMenuToggle && (
              <button
                onClick={onMenuToggle}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
            <h1 className="text-2xl font-bold text-gray-900">{pageTitle}</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="通知"
            >
              <Bell className="text-gray-600" size={20} />
            </button>
            <button
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="用户"
            >
              <User className="text-gray-600" size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
