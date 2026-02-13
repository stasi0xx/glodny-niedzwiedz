import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    className = '',
    children,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center rounded-2xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    const variants = {
        primary: "bg-[#10B981] text-white hover:bg-[#059669] shadow-sm hover:shadow-md focus:ring-[#10B981]",
        secondary: "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 focus:ring-gray-200",
        outline: "border-2 border-[#10B981] text-[#10B981] hover:bg-emerald-50 focus:ring-[#10B981]",
        ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500"
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
