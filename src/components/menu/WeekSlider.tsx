'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface WeekSliderProps {
    days: { day: string; date: string }[];
    activeDayIndex: number;
    onDaySelect: (index: number) => void;
}

export const WeekSlider = ({ days, activeDayIndex, onDaySelect }: WeekSliderProps) => {
    return (
        <div className="w-full overflow-x-auto pb-4 pt-2 scrollbar-hide snap-x">
            <div className="flex gap-4 px-4 min-w-max mx-auto justify-center md:justify-start">
                {days.map((day, index) => {
                    const isActive = index === activeDayIndex;
                    return (
                        <motion.button
                            key={index}
                            onClick={() => onDaySelect(index)}
                            className={`relative flex flex-col items-center justify-center p-4 rounded-2xl min-w-[100px] snap-center transition-all ${isActive
                                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 scale-105'
                                    : 'bg-white text-gray-400 hover:bg-gray-50 border border-gray-100'
                                }`}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className={`text-xs font-bold uppercase tracking-widest mb-1 ${isActive ? 'text-emerald-100' : 'text-gray-400'}`}>
                                {day.day.slice(0, 3)}
                            </span>
                            <span className={`text-2xl font-bold font-display ${isActive ? 'text-white' : 'text-gray-900'}`}>
                                {day.date}
                            </span>

                            {isActive && (
                                <motion.div
                                    layoutId="activeDayIndicator"
                                    className="absolute -bottom-2 w-1.5 h-1.5 bg-emerald-400 rounded-full"
                                />
                            )}
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
};
