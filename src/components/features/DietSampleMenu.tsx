'use client';

import React, { useState } from 'react';
import { DietDayMenu } from '@/data/diets';

interface DietSampleMenuProps {
    menu: DietDayMenu[];
    dietName: string;
}

export const DietSampleMenu: React.FC<DietSampleMenuProps> = ({ menu, dietName }) => {
    if (!menu || menu.length === 0) return null;

    const [selectedDayIndex, setSelectedDayIndex] = useState(0);
    const dayMenu = menu[selectedDayIndex % menu.length] || menu[0];

    // Generate next 7 days for the UI
    const dates = Array.from({ length: 7 }).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i);
        return {
            date: d.getDate(),
            month: d.toLocaleString('pl-PL', { month: 'short' }).replace('.', ''),
            dayName: d.toLocaleString('pl-PL', { weekday: 'short' }).toUpperCase().replace('.', ''),
            fullDate: d
        };
    });

    return (
        <div className="mt-20 w-full max-w-full animate-fade-in-up">
            <style jsx>{`
                @keyframes mealFadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .meal-anim {
                    animation: mealFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            <div className="text-center mb-10 md:mb-12">
                <h3 className="text-3xl font-display font-bold text-gray-900 tracking-tight uppercase">
                    MENU <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9A9E] to-[#FECFEF]">{dietName}</span>
                </h3>
            </div>

            {/* Date Strip - Scrollable on Mobile - Improved */}
            <div className="w-full mb-6 md:mb-8">
                <div className="flex w-full gap-2 pb-2 overflow-x-auto whitespace-nowrap scrollbar-hide snap-x snap-mandatory px-1 md:justify-between">
                    {dates.map((d, idx) => {
                        const isActive = idx === selectedDayIndex;
                        return (
                            <button
                                key={idx}
                                onClick={() => setSelectedDayIndex(idx)}
                                className={`snap-center shrink-0 flex flex-col items-center justify-center w-[72px] md:flex-1 h-[84px] md:h-[100px] rounded-2xl border-2 transition-colors duration-200 outline-none focus:outline-none ${isActive
                                    ? 'bg-[#FF4F6E] border-[#FF4F6E] text-white'
                                    : 'bg-white border-gray-100 text-gray-400 hover:border-pink-200 hover:bg-pink-50'
                                    }`}
                            >
                                <span className={`text-[10px] md:text-xs font-bold tracking-widest uppercase mb-0.5 ${isActive ? 'text-white' : 'text-gray-400'}`}>
                                    {d.dayName}
                                </span>
                                <span className={`text-2xl md:text-3xl font-display font-bold leading-none mb-0.5 ${isActive ? 'text-white' : 'text-gray-800'}`}>
                                    {d.date}
                                </span>
                                <span className={`text-[9px] lowercase font-medium ${isActive ? 'text-white' : 'text-gray-400'}`}>
                                    {d.month}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Meal List - Compact & Responsive */}
            <div key={selectedDayIndex} className="bg-white rounded-[1.5rem] border-2 border-gray-900 overflow-hidden shadow-sm meal-anim">

                {/* Desktop Headers */}
                <div className="hidden md:grid grid-cols-5 divide-x-2 divide-gray-900 bg-gray-50 border-b-2 border-gray-900">
                    {dayMenu.meals.map((meal, idx) => (
                        <div key={idx} className="p-3 text-center">
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-900 font-display">{meal.type}</span>
                        </div>
                    ))}
                </div>

                {/* Content Row */}
                <div className="grid grid-cols-1 md:grid-cols-5 divide-y-2 md:divide-y-0 md:divide-x-2 divide-gray-900 bg-white">
                    {dayMenu.meals.map((meal, idx) => (
                        <div key={idx} className="p-3 md:p-6 flex flex-row md:flex-col items-center md:items-stretch text-left md:text-center transition-colors hover:bg-pink-50/10 group h-full gap-3 md:gap-0">

                            {/* Mobile Meal Image & Type */}
                            <div className="md:hidden relative shrink-0">
                                <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 border border-gray-100">
                                    <img
                                        src={`https://source.unsplash.com/150x150/?food,healthy,${meal.type === 'Śniadanie' ? 'breakfast' : 'meal'}&sig=${idx * 10}`}
                                        alt={meal.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Desktop Image (Top of col) */}
                            <div className="hidden md:block w-full aspect-square rounded-xl overflow-hidden bg-gray-100 mb-4 border border-gray-100">
                                <img
                                    src={`https://source.unsplash.com/300x300/?food,healthy,${meal.type === 'Śniadanie' ? 'breakfast' : 'meal'}&sig=${idx * 10}`}
                                    alt={meal.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://placehold.co/300x300/f3f4f6/a1a1aa?text=Danie';
                                    }}
                                />
                            </div>

                            <div className="flex-1 flex flex-col md:items-center justify-center">
                                <span className="md:hidden text-[9px] font-bold text-pink-500 uppercase tracking-widest mb-0.5">{meal.type}</span>
                                <h4 className="text-sm font-bold text-gray-900 leading-tight md:mb-2 group-hover:text-pink-600 transition-colors">
                                    {meal.name}
                                </h4>

                                {meal.allergens && meal.allergens.length > 0 && (
                                    <div className="hidden md:flex flex-wrap justify-center gap-1 mt-auto pt-2 opacity-70 group-hover:opacity-100 transition-opacity">
                                        {meal.allergens.map(a => (
                                            <span key={a} className="text-[9px] font-medium text-gray-500 uppercase bg-gray-100 px-1 rounded">{a}</span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Mobile Kcal & Allergens details */}
                            <div className="md:hidden flex flex-col items-end gap-1">
                                <div className="text-xs font-bold text-gray-400 whitespace-nowrap">
                                    {meal.kcal} kcal
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <p className="text-center text-[10px] md:text-xs text-gray-400 mt-8 font-medium tracking-wide uppercase opacity-60">
                * Menu może ulec zmianie w zależności od dostępności produktów
            </p>
        </div>
    );
};
