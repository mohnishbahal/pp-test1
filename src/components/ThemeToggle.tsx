import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 ring-1 ring-gray-200 dark:ring-gray-700 transition-all duration-200 ease-in-out shadow-sm"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <Sun className={`w-5 h-5 transition-all duration-300 ease-in-out ${isDark ? 'opacity-0 scale-50 rotate-90' : 'opacity-100 scale-100 rotate-0'} absolute inset-0 m-auto`} />
      <Moon className={`w-5 h-5 transition-all duration-300 ease-in-out ${isDark ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-90'} absolute inset-0 m-auto`} />
      <span className="sr-only">{isDark ? 'Switch to light mode' : 'Switch to dark mode'}</span>
    </button>
  );
}