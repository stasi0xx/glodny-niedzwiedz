'use client';

import React, { useState, useMemo } from 'react';
import { Container } from '@/components/ui/Container';
import { diets, Diet } from '@/data/diets';
import { DietCard } from '@/components/features/DietCard';
import { DietComparison } from '@/components/features/DietComparison';

export default function OfferPage() {
    const [filterGoal, setFilterGoal] = useState<string>('all');
    const [filterPriceMax, setFilterPriceMax] = useState<number>(100);
    const [compareList, setCompareList] = useState<string[]>([]);

    const filteredDiets = useMemo(() => {
        return diets.filter(diet => {
            const matchesGoal = filterGoal === 'all' || diet.goals.includes(filterGoal as any);
            const matchesPrice = diet.priceFrom <= filterPriceMax;
            return matchesGoal && matchesPrice;
        });
    }, [filterGoal, filterPriceMax]);

    const toggleCompare = (id: string) => {
        setCompareList(prev => {
            if (prev.includes(id)) return prev.filter(i => i !== id);
            if (prev.length >= 3) return prev; // Max 3
            return [...prev, id];
        });
    };

    return (
        <div className="py-12 bg-gray-50/50 min-h-screen pb-40">
            <Container>
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">Nasze Diety</h1>

                    {/* Filters */}
                    <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Cel</label>
                            <select
                                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                value={filterGoal}
                                onChange={(e) => setFilterGoal(e.target.value)}
                            >
                                <option value="all">Wszystkie</option>
                                <option value="lose-weight">Schudnąć</option>
                                <option value="build-muscle">Zbudować formę</option>
                                <option value="health">Zdrowie</option>
                                <option value="energy">Energia</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Cena maksymalna (od): {filterPriceMax} zł
                            </label>
                            <input
                                type="range"
                                min="50"
                                max="100"
                                step="1"
                                className="w-full accent-emerald-500"
                                value={filterPriceMax}
                                onChange={(e) => setFilterPriceMax(Number(e.target.value))}
                            />
                            <div className="flex justify-between text-xs text-gray-400 mt-1">
                                <span>50 zł</span>
                                <span>100 zł</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredDiets.map(diet => (
                        <DietCard
                            key={diet.id}
                            diet={diet}
                            onCompare={toggleCompare}
                            isSelectedForCompare={compareList.includes(diet.id)}
                        />
                    ))}
                </div>

                {filteredDiets.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        Brak diet spełniających kryteria. Spróbuj zmienić filtry.
                    </div>
                )}

            </Container>

            {/* Comparison Drawer */}
            <DietComparison
                selectedDiets={diets.filter(d => compareList.includes(d.id))}
                onRemove={toggleCompare}
            />
        </div>
    );
}
