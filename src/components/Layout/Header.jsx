import React from 'react';
import { Calendar, User, Bell } from 'lucide-react';
import { format } from 'date-fns';
import { CommandPalette } from '../Common';

/**
 * Header Component
 * 
 * Top header bar with:
 * - Page title
 * - Command Palette (Ctrl+K)
 * - Date display
 * - User profile
 */

const pageTitles = {
  dashboard: 'Dashboard Overview',
  visitors: 'Analisis Kunjungan',
  loans: 'Analisis Peminjaman',
  recommendations: 'Sistem Rekomendasi',
};

function Header({ activePage, onNavigate }) {
  const today = new Date();
  
  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-6 transition-colors">
      {/* Page Title */}
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-slate-100">
          {pageTitles[activePage] || 'Dashboard'}
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Command Palette Trigger */}
        <CommandPalette onNavigate={onNavigate} />

        {/* Date Display */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-dark-800 rounded-xl text-sm text-gray-600 dark:text-slate-400">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span>{format(today, 'd MMM yyyy')}</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
          <Bell className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile */}
        <button className="flex items-center gap-2 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
          <div className="w-8 h-8 bg-gray-900 dark:bg-indigo-600 rounded-lg flex items-center justify-center">
            <User className="w-4 h-4 text-slate-100" />
          </div>
          <span className="hidden md:inline text-sm font-medium text-gray-700 dark:text-slate-300">Admin</span>
        </button>
      </div>
    </header>
  );
}

export default Header;

