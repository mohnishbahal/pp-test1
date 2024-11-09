import React, { ReactNode } from 'react';
import { X } from 'lucide-react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  onRemove?: () => void;
}

export function Badge({ children, variant = 'default', onRemove }: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    primary: 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300',
    success: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300',
    warning: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300',
    danger: 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300'
  };

  return (
    <span className={`
      inline-flex items-center px-2 py-1 rounded-md text-sm font-medium
      ${variants[variant]}
    `}>
      {children}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 p-0.5 hover:bg-black/5 dark:hover:bg-white/5 rounded"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
}