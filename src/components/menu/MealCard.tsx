'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Meal } from '@/data/menuMock';

interface MealCardProps {
    meal: Meal;
    index: number;
}

export const MealCard = ({ meal, index }: MealCardProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-emerald-900/5 transition-all cursor-pointer"
                onClick={() => setIsOpen(true)}
            >
                {/* Image / Header Area */}
                <div className="h-32 bg-gray-100 relative overflow-hidden">
                    {/* Placeholder gradient if no image */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${meal.type === 'Śniadanie' ? 'from-orange-100 to-yellow-100' :
                            meal.type === 'Obiad' ? 'from-emerald-100 to-teal-100' :
                                'from-blue-50 to-indigo-50'
                        }`} />

                    {meal.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={meal.image}
                            alt={meal.name}
                            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                        />
                    )}

                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-gray-600 shadow-sm">
                        {meal.type}
                    </div>
                </div>

                {/* Content */}
                <div className="p-5">
                    <h3 className="font-bold text-gray-900 text-lg leading-snug mb-3 group-hover:text-emerald-700 transition-colors line-clamp-2">
                        {meal.name}
                    </h3>

                    <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-50 pt-3">
                        <div className="flex items-center gap-1">
                            <span>🔥</span>
                            <span className="font-semibold">{meal.kcal} kcal</span>
                        </div>
                        <div className="flex gap-2">
                            {meal.allergens.length > 0 && (
                                <span className="text-xs px-2 py-1 bg-red-50 text-red-600 rounded-md font-medium" title={meal.allergens.join(', ')}>
                                    Alergeny
                                </span>
                            )}
                            {meal.tags.includes('Vege') && (
                                <span className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-md font-medium">
                                    Vege
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Modal Detail View */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />
                        <motion.div
                            layoutId={`meal-card-${index}`}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
                        >
                            <div className="h-48 bg-gray-200 relative">
                                <div className={`absolute inset-0 bg-gradient-to-br ${meal.type === 'Śniadanie' ? 'from-orange-100 to-yellow-100' :
                                        meal.type === 'Obiad' ? 'from-emerald-100 to-teal-100' :
                                            'from-blue-50 to-indigo-50'
                                    }`} />
                                {meal.image && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={meal.image}
                                        alt={meal.name}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                                <button
                                    onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                                    className="absolute top-4 right-4 bg-white/50 hover:bg-white rounded-full p-2 backdrop-blur transition-all"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="p-8 space-y-6">
                                <div>
                                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">{meal.type}</span>
                                    <h2 className="text-2xl font-bold text-gray-900 mt-1 mb-4">{meal.name}</h2>
                                    <p className="text-gray-600 leading-relaxed">{meal.description}</p>
                                </div>

                                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-2xl text-center">
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-1">Białko</div>
                                        <div className="font-bold text-gray-900">{meal.macros.p}g</div>
                                    </div>
                                    <div className="border-x border-gray-200">
                                        <div className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-1">Tłuszcze</div>
                                        <div className="font-bold text-gray-900">{meal.macros.f}g</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-1">Węgle</div>
                                        <div className="font-bold text-gray-900">{meal.macros.c}g</div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-bold text-gray-900 mb-2">Alergeny</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {meal.allergens.length > 0 ? meal.allergens.map(a => (
                                            <span key={a} className="px-3 py-1 bg-red-50 text-red-700 text-sm rounded-lg font-medium border border-red-100">
                                                {a}
                                            </span>
                                        )) : <span className="text-gray-500 text-sm">Brak alergenów</span>}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};
