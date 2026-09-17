import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'teal' | 'green' | 'amber' | 'coral' | 'slate';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'slate', className = '' }) => {
  const variants = {
    blue: 'bg-[#EFF6FF] text-[#1D4ED8] border-[#DBEAFE] dark:bg-[#111827] dark:text-[#60A5FA] dark:border-[#263244]',
    teal: 'bg-[#EFF6FF] text-[#1D4ED8] border-[#DBEAFE] dark:bg-[#111827] dark:text-[#60A5FA] dark:border-[#263244]',
    slate: 'bg-[#F6F9FC] text-[#64748B] border-[#E2E8F0] dark:bg-[#111827] dark:text-[#94A3B8] dark:border-[#263244]',
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-[#111827] dark:text-emerald-400 dark:border-[#263244]',
    amber: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-[#111827] dark:text-amber-400 dark:border-[#263244]',
    coral: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-[#111827] dark:text-rose-400 dark:border-[#263244]',
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
