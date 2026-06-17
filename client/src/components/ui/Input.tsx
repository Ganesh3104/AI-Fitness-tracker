import React, { useEffect, useRef } from 'react';

interface InputProps {
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  min?: string | number;
  max?: string | number;
}

export default function Input({
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  className = '',
  required = false,
  min,
  max
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    if (!inputRef.current) return;

    const updateStyles = () => {
      const isDark = document.documentElement.classList.contains('dark');
      if (inputRef.current) {
        inputRef.current.style.backgroundColor = isDark ? '#020617' : '#ffffff';
        inputRef.current.style.color = isDark ? '#ffffff' : '#0f172a';
        inputRef.current.style.borderColor = isDark ? '#334155' : '#cbd5e1';
      }
      if (labelRef.current) {
        labelRef.current.style.color = isDark ? '#ffffff' : '#0f172a';
      }
    };

    updateStyles();

    const observer = new MutationObserver(updateStyles);
    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label ref={labelRef} className="block text-sm font-medium text-slate-900 dark:text-white">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <input
        ref={inputRef}
        type={type}
        value={value}
        onChange={(e) =>
          onChange(type === 'number' ? parseFloat(e.target.value) : e.target.value)
        }
        placeholder={placeholder}
        min={min}
        max={max}
        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
      />
    </div>
  );
}
