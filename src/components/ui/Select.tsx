import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  helperText,
  className = '',
  id,
  ...props
}) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-[#111827] dark:text-[#F8FAFC]">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`w-full rounded-lg border bg-white dark:bg-[#111827] px-3.5 py-2.5 text-sm text-[#111827] dark:text-[#F8FAFC] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 ${
          error
            ? 'border-rose-500 focus:ring-rose-500 focus:border-rose-500'
            : 'border-[#E2E8F0] dark:border-[#263244] focus:border-[#2563EB] dark:focus:border-[#60A5FA]'
        } ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error ? (
        <span className="text-xs text-rose-500 font-medium">{error}</span>
      ) : helperText ? (
        <span className="text-xs text-[#64748B] dark:text-[#94A3B8]">{helperText}</span>
      ) : null}
    </div>
  );
};
