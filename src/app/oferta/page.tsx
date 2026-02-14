'use client';

import React, { useState, useMemo } from 'react';
import { diets, Diet } from '@/data/diets';
import { DietCard } from '@/components/features/DietCard';
import { DietComparison } from '@/components/features/DietComparison';
import { OfferHero } from '@/components/features/OfferHero';
import { OfferFilters } from '@/components/features/OfferFilters';
import { QuickChoice } from '@/components/features/QuickChoice';
import { OfferFAQ } from '@/components/features/OfferFAQ';
import { OfferCTA } from '@/components/features/OfferCTA';
import { Container } from '@/components/ui/Container';

export default function OfferPage() {
    // Filter States
    const [filterGoal, setFilterGoal] = useState<string>('all');
    const [filterPriceMax, setFilterPriceMax] = useState<number>(100);
    const [filterMeals, setFilterMeals] = useState<number | null>(null);
    const [filterKcal, setFilterKcal] = useState<number | null>(null);

    // Sorting State
    const [sortBy, setSortBy] = useState<string>('popularity'); // popularity, price-asc, rating

    // Comparison State
    const [compareList, setCompareList] = useState<string[]>([]);

    // Quick Choice Handler
    const handleQuickChoice = (goal: string) => {
        setFilterGoal(goal);
        // Put user in the diet list view smoothly
        const element = document.getElementById('diets-list');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Derived Data
    const filteredDiets = useMemo(() => {
        let result = diets.filter(diet => {
            // Goal
            const matchesGoal = filterGoal === 'all' || diet.goals.includes(filterGoal as any);
            // Price
            const matchesPrice = diet.priceFrom <= filterPriceMax;
            // Meals
            const matchesMeals = filterMeals === null || (diet.mealsOptions && diet.mealsOptions.includes(filterMeals));
            // Kcal - check if diet offers this kcal option
            const matchesKcal = filterKcal === null || (diet.kcalOptions && diet.kcalOptions.includes(filterKcal));

            return matchesGoal && matchesPrice && matchesMeals && matchesKcal;
        });

        // Sorting
        result = result.sort((a, b) => {
            if (sortBy === 'price-asc') return a.priceFrom - b.priceFrom;
            if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
            return (b.popularity || 0) - (a.popularity || 0); // Default popularity
        });

        return result;
    }, [filterGoal, filterPriceMax, filterMeals, filterKcal, sortBy]);

    const toggleCompare = (id: string) => {
        setCompareList(prev => {
            if (prev.includes(id)) return prev.filter(i => i !== id);
            if (prev.length >= 3) return prev; // Max 3
            return [...prev, id];
        });
    };

    const clearFilters = () => {
        setFilterGoal('all');
        setFilterPriceMax(100);
        setFilterMeals(null);
        setFilterKcal(null);
        setSortBy('popularity');
    };

    return (
        <div className="bg-gray-50/50 min-h-screen pb-0">
            {/* Hero */}
            <OfferHero />

            {/* Quick Choice */}
            <QuickChoice onSelectGoal={handleQuickChoice} />

            <Container className="py-12 md:py-16" id="diets-list">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-80 flex-shrink-0 lg:sticky lg:top-24 z-20">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-0 overflow-hidden">
                            <OfferFilters
                                activeGoal={filterGoal}
                                setActiveGoal={setFilterGoal}
                                priceMax={filterPriceMax}
                                setPriceMax={setFilterPriceMax}
                                activeMeals={filterMeals}
                                setActiveMeals={setFilterMeals}
                                activeKcal={filterKcal}
                                setActiveKcal={setFilterKcal}
                                onClear={clearFilters}
                            />
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 w-full">
                        {/* Check matches count */}
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                            <h2 className="text-xl font-bold text-gray-800">
                                Znaleziono {filteredDiets.length} {filteredDiets.length === 1 ? 'dietę' : (filteredDiets.length > 1 && filteredDiets.length < 5 ? 'diety' : 'diet')}
                            </h2>

                            {/* Sorting */}
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500 font-medium whitespace-nowrap">Sortuj:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="border-none bg-transparent font-bold text-gray-900 focus:ring-0 cursor-pointer text-sm"
                                >
                                    <option value="popularity">Najpopularniejsze</option>
                                    <option value="price-asc">Najtańsze</option>
                                    <option value="rating">Najwyżej oceniane</option>
                                </select>
                            </div>
                        </div>

                        {/* Grid */}
                        {filteredDiets.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                                {filteredDiets.map(diet => (
                                    <DietCard
                                        key={diet.id}
                                        diet={diet}
                                        onCompare={toggleCompare}
                                        isSelectedForCompare={compareList.includes(diet.id)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl p-12 text-center border dashed border-gray-200">
                                <div className="text-4xl mb-4">🔍</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Brak wyników</h3>
                                <p className="text-gray-500 mb-6">Nie znaleźliśmy diet spełniających Twoje kryteria.</p>
                                <button
                                    onClick={clearFilters}
                                    className="text-emerald-600 font-bold hover:underline"
                                >
                                    Wyczyść filtry
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </Container>

            {/* Comparison Drawer */}
            <DietComparison
                selectedDiets={diets.filter(d => compareList.includes(d.id))}
                onRemove={toggleCompare}
            />

            {/* FAQ */}
            <OfferFAQ />

            {/* CTA */}
            <OfferCTA />
        </div>
    );
}
