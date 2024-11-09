import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';
import { Menu, X } from 'lucide-react';

export default function Layout() {
  const { currentUser } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile header */}
      <div className="lg:hidden">
        <div className="sticky top-0 z-50 flex h-16 shrink-0 items-center border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 px-4 shadow-sm">
          <div className="flex w-full items-center gap-4">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-700 dark:text-gray-200"
            >
              <span className="sr-only">{isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}</span>
              {isSidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            <h1 className="text-lg font-display font-semibold text-gray-900 dark:text-white">
              Persona Path
            </h1>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <ThemeToggle />
            {currentUser && (
              <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {currentUser.email?.[0].toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div 
        className={`fixed inset-0 z-40 lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}
        onClick={() => setIsSidebarOpen(false)}
      >
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        <div className="fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 transform transition-transform duration-300">
          <Sidebar onClose={() => setIsSidebarOpen(false)} />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-72 lg:flex-col">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Desktop header */}
        <div className="hidden lg:block sticky top-0 z-40 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex h-full items-center justify-between px-8">
            <h1 className="text-lg font-display font-semibold text-gray-900 dark:text-white">
              Persona Path
            </h1>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              {currentUser && (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {currentUser.email}
                  </span>
                  <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {currentUser.email?.[0].toUpperCase()}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <main className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}