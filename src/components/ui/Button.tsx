import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'amber' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100';
  
  const variants = {
    primary: 'bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] text-white shadow-sm hover:shadow focus:ring-[#2563EB] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8]',
    secondary: 'bg-[#F6F9FC] hover:bg-[#EFF6FF] text-[#111827] border border-[#E2E8F0] dark:bg-[#111827] dark:hover:bg-[#182234] dark:border-[#263244] dark:text-[#F8FAFC] focus:ring-slate-300',
    outline: 'border border-[#E2E8F0] dark:border-[#263244] bg-white dark:bg-[#111827] text-[#111827] dark:text-[#F8FAFC] hover:border-[#2563EB]/40 hover:bg-[#EFF6FF]/40 dark:hover:border-[#60A5FA]/40 dark:hover:bg-[#182234] focus:ring-[#2563EB]',
    amber: 'bg-[#D99A2B] hover:bg-[#B87F1E] text-white font-medium focus:ring-amber-500',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500',
    ghost: 'text-[#64748B] hover:text-[#111827] dark:text-[#94A3B8] dark:hover:text-[#F8FAFC] hover:bg-[#F6F9FC] dark:hover:bg-[#111827]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-5 py-2.5 text-sm sm:text-base gap-2 font-medium',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
};
