import React from 'react';
import { Container } from '@/components/ui/Container';

interface QuickChoiceProps {
    onSelectGoal: (goal: string) => void;
}

export const QuickChoice: React.FC<QuickChoiceProps> = ({ onSelectGoal }) => {
    const choices = [
        {
            label: 'Chcę schudnąć',
            value: 'lose-weight',
            gradient: 'from-pink-500 via-rose-500 to-red-500',
            pattern: (
                <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 Q 50 0 100 100" stroke="white" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
                </svg>
            )
        },
        {
            label: 'Buduję formę',
            value: 'build-muscle',
            gradient: 'from-blue-600 via-indigo-600 to-violet-600',
            pattern: (
                <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
                    <rect x="10" y="10" width="20" height="20" stroke="white" strokeWidth="2" fill="none" />
                    <rect x="50" y="50" width="30" height="30" stroke="white" strokeWidth="2" fill="none" />
                    <rect x="80" y="20" width="10" height="10" stroke="white" strokeWidth="2" fill="none" />
                </svg>
            )
        },
        {
            label: 'Wege / Vege',
            value: 'health',
            gradient: 'from-emerald-500 via-green-500 to-lime-500',
            pattern: (
                <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
                    <circle cx="20" cy="80" r="15" stroke="white" strokeWidth="2" fill="none" />
                    <circle cx="80" cy="30" r="25" stroke="white" strokeWidth="2" fill="none" />
                </svg>
            )
        },
        {
            label: 'Jem wszystko',
            value: 'all',
            gradient: 'from-orange-500 via-amber-500 to-yellow-500',
            pattern: (
                <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
                    <line x1="0" y1="0" x2="100" y2="100" stroke="white" strokeWidth="2" />
                    <line x1="100" y1="0" x2="0" y2="100" stroke="white" strokeWidth="2" />
                </svg>
            )
        },
    ];

    return (
        <section className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full">
                {choices.map((choice) => (
                    <button
                        key={choice.value}
                        onClick={() => onSelectGoal(choice.value)}
                        className={`relative group h-32 md:h-40 overflow-hidden flex items-center justify-center`}
                    >
                        {/* Gradient Background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${choice.gradient} opacity-90 group-hover:opacity-100 transition-opacity duration-300`}></div>

                        {/* Pattern Overlay */}
                        <div className="absolute inset-0 mix-blend-overlay pointer-events-none transform group-hover:scale-110 transition-transform duration-700">
                            {choice.pattern}
                        </div>

                        {/* Text */}
                        <span className="relative z-10 text-2xl font-bold text-white tracking-tight uppercase drop-shadow-md group-hover:tracking-widest transition-all duration-300">
                            {choice.label}
                        </span>

                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                    </button>
                ))}
            </div>
        </section>
    );
};
