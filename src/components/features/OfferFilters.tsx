import React, { useState } from 'react';
import { DietGoal } from '@/data/diets';

interface OfferFiltersProps {
    activeGoal: string;
    setActiveGoal: (goal: string) => void;
    priceMax: number;
    setPriceMax: (price: number) => void;
    activeMeals: number | null;
    setActiveMeals: (meals: number | null) => void;
    activeKcal: number | null;
    setActiveKcal: (kcal: number | null) => void;
    onClear: () => void;
}

export const OfferFilters: React.FC<OfferFiltersProps> = ({
    activeGoal,
    setActiveGoal,
    priceMax,
    setPriceMax,
    activeMeals,
    setActiveMeals,
    activeKcal,
    setActiveKcal,
    onClear,
}) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="mb-6 flex items-center justify-between">
                <h3 className="font-bold text-lg text-gray-900">Filtrowanie</h3>
                <button
                    onClick={onClear}
                    className="text-sm text-gray-500 hover:text-emerald-600 transition-colors"
                >
                    Wyczyść filtry
                </button>
            </div>

            <div className="space-y-8">
                {/* Goal */}
                <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">Cel</label>
                    <div className="space-y-2">
                        {[
                            { label: 'Wszystkie', value: 'all' },
                            { label: 'Schudnąć', value: 'lose-weight' },
                            { label: 'Budować formę', value: 'build-muscle' },
                            { label: 'Zdrowie', value: 'health' },
                            { label: 'Energia', value: 'energy' },
                        ].map((option) => (
                            <label key={option.value} className="flex items-center cursor-pointer group">
                                <input
                                    type="radio"
                                    name="goal"
                                    value={option.value}
                                    checked={activeGoal === option.value}
                                    onChange={(e) => setActiveGoal(e.target.value)}
                                    className="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500"
                                />
                                <span className={`ml-3 text-sm group-hover:text-emerald-700 ${activeGoal === option.value ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                                    {option.label}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price */}
                <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                        Cena do: <span className="text-emerald-600">{priceMax} zł</span> / dzień
                    </label>
                    <input
                        type="range"
                        min="50"
                        max="100"
                        step="1"
                        value={priceMax}
                        onChange={(e) => setPriceMax(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>50 zł</span>
                        <span>100 zł</span>
                    </div>
                </div>

                {/* Meals */}
                <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">Liczba posiłków</label>
                    <div className="flex gap-2">
                        {[3, 4, 5].map((count) => (
                            <button
                                key={count}
                                onClick={() => setActiveMeals(activeMeals === count ? null : count)}
                                className={`flex-1 py-2 text-sm border rounded-lg transition-all ${activeMeals === count
                                        ? 'bg-emerald-50 border-emerald-500 text-emerald-700 font-medium'
                                        : 'border-gray-200 text-gray-600 hover:border-emerald-200'
                                    }`}
                            >
                                {count}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Kcal */}
                <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">Kaloryczność</label>
                    <select
                        value={activeKcal || ''}
                        onChange={(e) => setActiveKcal(e.target.value ? Number(e.target.value) : null)}
                        className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50"
                    >
                        <option value="">Dowolna</option>
                        <option value="1200">1200 kcal</option>
                        <option value="1500">1500 kcal</option>
                        <option value="1800">1800 kcal</option>
                        <option value="2000">2000 kcal</option>
                        <option value="2500">2500 kcal</option>
                        <option value="3000">3000 kcal ++</option>
                    </select>
                </div>
            </div>
        </div>
    );
};
