import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-[#111827] dark:text-[#F8FAFC]">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3.5 text-[#64748B] dark:text-[#94A3B8] pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={`w-full rounded-lg border bg-white dark:bg-[#111827] px-3.5 py-2.5 text-sm text-[#111827] dark:text-[#F8FAFC] placeholder-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 ${
            leftIcon ? 'pl-10' : ''
          } ${rightIcon ? 'pr-10' : ''} ${
            error
              ? 'border-rose-500 focus:ring-rose-500 focus:border-rose-500'
              : 'border-[#E2E8F0] dark:border-[#263244] focus:border-[#2563EB] dark:focus:border-[#60A5FA]'
          } ${className}`}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3.5 text-[#64748B] dark:text-[#94A3B8]">
            {rightIcon}
          </div>
        )}
      </div>
      {error ? (
        <span className="text-xs text-rose-500 font-medium">{error}</span>
      ) : helperText ? (
        <span className="text-xs text-[#64748B] dark:text-[#94A3B8]">{helperText}</span>
      ) : null}
    </div>
  );
};
