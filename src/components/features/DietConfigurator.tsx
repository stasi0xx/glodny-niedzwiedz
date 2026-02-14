'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Diet } from '@/data/diets';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface DietConfiguratorProps {
    diet: Diet;
}

export const DietConfigurator: React.FC<DietConfiguratorProps> = ({ diet }) => {
    const searchParams = useSearchParams();
    const [selectedKcal, setSelectedKcal] = useState<number>(diet.kcalOptions[0]);
    const [selectedMeals, setSelectedMeals] = useState<number>(diet.mealsOptions[0]);

    // Simple mock price logic: base price + (kcal/1000 * 5) + (meals * 2)
    // This is just a placeholder logic to show price variation
    const [price, setPrice] = useState<number>(diet.priceFrom);

    useEffect(() => {
        // Mock price calculation
        const base = diet.priceFrom;
        const kcalFactor = (selectedKcal - diet.kcalOptions[0]) / 500 * 5;
        const mealsFactor = (selectedMeals - diet.mealsOptions[0]) * 3;
        setPrice(base + kcalFactor + mealsFactor);
    }, [selectedKcal, selectedMeals, diet]);


    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 sticky top-24">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Skonfiguruj dietę</h3>

            {/* Kcal Selection */}
            <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-3">Kaloryczność (kcal)</label>
                <div className="flex flex-wrap gap-2">
                    {diet.kcalOptions.map((kcal) => (
                        <button
                            key={kcal}
                            onClick={() => setSelectedKcal(kcal)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border-2 ${selectedKcal === kcal
                                    ? 'bg-emerald-50 border-emerald-500 text-emerald-700 scale-105'
                                    : 'bg-white border-gray-100 text-gray-600 hover:border-emerald-200'
                                }`}
                        >
                            {kcal}
                        </button>
                    ))}
                </div>
            </div>

            {/* Meals Selection */}
            <div className="mb-8">
                <label className="block text-sm font-bold text-gray-700 mb-3">Liczba posiłków</label>
                <div className="flex flex-wrap gap-2">
                    {diet.mealsOptions.map((meals) => (
                        <button
                            key={meals}
                            onClick={() => setSelectedMeals(meals)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border-2 ${selectedMeals === meals
                                    ? 'bg-emerald-50 border-emerald-500 text-emerald-700 scale-105'
                                    : 'bg-white border-gray-100 text-gray-600 hover:border-emerald-200'
                                }`}
                        >
                            {meals}
                        </button>
                    ))}
                </div>
            </div>

            {/* Summary & Price */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6 flex justify-between items-end border border-gray-100">
                <div>
                    <span className="block text-xs text-gray-500 font-medium mb-1">Cena za dzień</span>
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-gray-900">{price}</span>
                        <span className="text-sm font-bold text-gray-500">zł</span>
                    </div>
                </div>
                <div className="text-right">
                    <span className="block text-xs text-gray-500 font-medium mb-1">Szacunkowy koszt 20 dni</span>
                    <span className="text-lg font-bold text-emerald-600">{price * 20} zł</span>
                </div>
            </div>

            {/* CTA */}
            <Link
                href={`/koszyk?diet=${diet.slug}&kcal=${selectedKcal}&meals=${selectedMeals}`}
                className="block w-full"
            >
                <Button size="lg" className="w-full py-4 text-lg shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40 transition-shadow">
                    Zamów teraz
                </Button>
            </Link>

            <p className="text-center text-xs text-gray-400 mt-4">
                Darmowa dostawa na terenie całej Polski
            </p>
        </div>
    );
};
