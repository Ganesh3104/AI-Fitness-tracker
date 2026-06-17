import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    variant?: 'primary' | 'secondary' | 'danger';
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

export default function Button({ children, onClick, variant = 'primary', className = '', type = 'button', disabled = false }: ButtonProps) {
    const { theme } = useTheme();
    const baseStyles = 'px-5 py-3 flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

    const variants = {
        primary: 'bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-500 active:scale-[0.98]',
        secondary: theme === 'dark'
            ? 'bg-slate-950 text-slate-100 hover:bg-slate-900 border border-slate-700 focus:ring-slate-400'
            : 'bg-slate-100 text-slate-900 hover:bg-slate-200 border border-slate-200 focus:ring-slate-400',
        danger: theme === 'dark'
            ? 'bg-red-900/20 text-red-400 hover:bg-red-900/30 focus:ring-red-400'
            : 'bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-400',
    };

    return (
        <button type={type} onClick={onClick} disabled={disabled} className={`${baseStyles} ${variants[variant]} ${className}`}>
            {children}
        </button>
    );
}
