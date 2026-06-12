import React from 'react'
import { useTheme } from '../../context/ThemeContext'

const Card = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
    const { theme } = useTheme()
    const darkModeClasses = theme === 'dark'
        ? 'bg-slate-900 border-slate-800 shadow-black/20'
        : 'bg-white border-slate-100 shadow-sm'

    return (
        <div className={`rounded-2xl border p-5 transition-colors duration-200 ${darkModeClasses} ${className}`}>
            {children}
        </div>
    );
}

export default Card