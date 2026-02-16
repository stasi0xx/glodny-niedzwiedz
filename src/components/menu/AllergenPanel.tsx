'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AllergenPanelProps {
    excludedAllergens: string[];
    onToggleAllergen: (allergen: string) => void;
    isVisible: boolean;
}

const ALLERGENS = ['Gluten', 'Mleko', 'Jaja', 'Orzechy', 'Ryby', 'Seler', 'Soja', 'Sezam', 'Gorczyca', 'Łubin'];

export const AllergenPanel = ({ excludedAllergens, onToggleAllergen, isVisible }: AllergenPanelProps) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-white border-b border-gray-100 shadow-inner"
                >
                    <div className="max-w-7xl mx-auto px-4 py-6">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                            🛡️ Wybierz alergeny do wykluczenia (symulacja)
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {ALLERGENS.map(allergen => {
                                const isExcluded = excludedAllergens.includes(allergen.toLowerCase());
                                return (
                                    <button
                                        key={allergen}
                                        onClick={() => onToggleAllergen(allergen.toLowerCase())}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isExcluded
                                                ? 'bg-red-500 text-white shadow-md shadow-red-500/20'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {isExcluded ? '✕' : '+'} {allergen}
                                    </button>
                                );
                            })}
                        </div>
                        <p className="text-xs text-gray-500 mt-4">
                            *Zaznaczenie alergenu podświetli dania, które go zawierają. W pełnej wersji oferty możesz zamówić dietę z wykluczeniami.
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
