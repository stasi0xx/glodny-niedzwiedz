'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { diets } from '@/data/diets';

interface MenuControlsProps {
    currentDietSlug: string;
    onDietChange: (slug: string) => void;
    currentKcal: number;
    onKcalChange: (kcal: number) => void;
    showAllergens: boolean;
    onToggleAllergens: () => void;
}

export const MenuControls = ({
    currentDietSlug,
    onDietChange,
    currentKcal,
    onKcalChange,
    showAllergens,
    onToggleAllergens
}: MenuControlsProps) => {

    const currentDiet = diets.find(d => d.slug === currentDietSlug) || diets[0];

    return (
        <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4 shadow-sm transition-all">
            <Container>
                <div className="flex flex-col lg:flex-row items-center justify-between gap-4">

                    {/* Diet Selector */}
                    <div className="flex items-center gap-3 overflow-x-auto max-w-full pb-2 lg:pb-0 scrollbar-hide">
                        <span className="font-bold text-gray-400 text-sm whitespace-nowrap">Dieta:</span>
                        {diets.map(diet => (
                            <button
                                key={diet.slug}
                                onClick={() => onDietChange(diet.slug)}
                                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${currentDietSlug === diet.slug
                                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {diet.name}
                            </button>
                        ))}
                    </div>

                    {/* Filters Right Side */}
                    <div className="flex items-center gap-4 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">

                        {/* Kcal Selector */}
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-400 text-sm whitespace-nowrap">Kcal:</span>
                            <div className="flex bg-gray-100 rounded-full p-1">
                                {currentDiet.kcalOptions.slice(0, 3).map(kcal => ( // Limit to 3 for space
                                    <button
                                        key={kcal}
                                        onClick={() => onKcalChange(kcal)}
                                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${currentKcal === kcal
                                                ? 'bg-white text-gray-900 shadow-sm'
                                                : 'text-gray-500 hover:text-gray-900'
                                            }`}
                                    >
                                        {kcal}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Allergen Toggle */}
                        <button
                            onClick={onToggleAllergens}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border transition-all whitespace-nowrap ${showAllergens
                                    ? 'border-red-200 bg-red-50 text-red-600'
                                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                                }`}
                        >
                            <span className="text-lg">⚠️</span>
                            {showAllergens ? 'Ukryj alergeny' : 'Pokaż alergeny'}
                        </button>
                    </div>
                </div>
            </Container>
        </div>
    );
};
