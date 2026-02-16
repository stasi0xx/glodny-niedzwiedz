'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DailyMenu as DailyMenuType } from '@/data/menuMock';
import { MealCard } from './MealCard';

interface DailyMenuProps {
    dailyMenu: DailyMenuType;
}

export const DailyMenu = ({ dailyMenu }: DailyMenuProps) => {
    return (
        <div className="py-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                key={dailyMenu.day} // Re-animate on day change
                transition={{ duration: 0.3 }}
            >
                {/* Header Card */}
                <div className="bg-white rounded-3xl p-6 mb-8 border border-gray-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <span className="text-9xl font-bold">🥗</span>
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h2 className="text-3xl font-display font-bold text-gray-900">
                                    {dailyMenu.day}
                                </h2>
                                {dailyMenu.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-md shadow-emerald-500/20">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <p className="text-gray-500">
                                Pełnowartościowy zestaw na cały dzień.
                            </p>
                        </div>

                        <div className="flex gap-4 md:gap-8">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-900">{dailyMenu.summaryKcal}</div>
                                <div className="text-xs uppercase tracking-wide text-gray-400 font-bold">kcal</div>
                            </div>
                            <div className="w-px bg-gray-100 h-10"></div>
                            <div className="text-center">
                                <div className="text-xl font-bold text-gray-900">{dailyMenu.summaryMacros.protein}g</div>
                                <div className="text-xs uppercase tracking-wide text-gray-400 font-bold">Białko</div>
                            </div>
                            <div className="text-center">
                                <div className="text-xl font-bold text-gray-900">{dailyMenu.summaryMacros.fat}g</div>
                                <div className="text-xs uppercase tracking-wide text-gray-400 font-bold">Tłuszcz</div>
                            </div>
                            <div className="text-center">
                                <div className="text-xl font-bold text-gray-900">{dailyMenu.summaryMacros.carbs}g</div>
                                <div className="text-xs uppercase tracking-wide text-gray-400 font-bold">Węgle</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Meals Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {dailyMenu.meals.map((meal, index) => (
                        <MealCard key={`${dailyMenu.day}-${index}`} meal={meal} index={index} />
                    ))}
                </div>
            </motion.div>
        </div>
    );
};
