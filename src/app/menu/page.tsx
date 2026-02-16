'use client';

import React, { useState } from 'react';
import { MenuHero } from '@/components/menu/MenuHero';
import { MenuControls } from '@/components/menu/MenuControls';
import { WeekSlider } from '@/components/menu/WeekSlider';
import { DailyMenu } from '@/components/menu/DailyMenu';
import { MenuOrderBox } from '@/components/menu/MenuOrderBox';
import { AllergenPanel } from '@/components/menu/AllergenPanel';
import { Container } from '@/components/ui/Container';
import { menuMock } from '@/data/menuMock';
import { diets } from '@/data/diets';

export default function MenuPage() {
    const [currentDietSlug, setCurrentDietSlug] = useState('klasyczna');
    const [currentKcal, setCurrentKcal] = useState(2000);
    const [activeDayIndex, setActiveDayIndex] = useState(0);
    const [showAllergens, setShowAllergens] = useState(false);
    const [excludedAllergens, setExcludedAllergens] = useState<string[]>([]);

    const activeDiet = diets.find(d => d.slug === currentDietSlug) || diets[0];
    const weeklyMenu = menuMock[currentDietSlug] || menuMock['klasyczna'];
    const activeDayMenu = weeklyMenu.days[activeDayIndex];

    const toggleAllergen = (allergen: string) => {
        setExcludedAllergens(prev =>
            prev.includes(allergen)
                ? prev.filter(a => a !== allergen)
                : [...prev, allergen]
        );
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] font-sans">
            <MenuHero />

            <MenuControls
                currentDietSlug={currentDietSlug}
                onDietChange={(slug) => {
                    setCurrentDietSlug(slug);
                    setActiveDayIndex(0); // Reset day on diet change for better UX
                }}
                currentKcal={currentKcal}
                onKcalChange={setCurrentKcal}
                showAllergens={showAllergens}
                onToggleAllergens={() => setShowAllergens(!showAllergens)}
            />

            <AllergenPanel
                isVisible={showAllergens}
                excludedAllergens={excludedAllergens}
                onToggleAllergen={toggleAllergen}
            />

            <Container className="py-12">
                <div className="grid lg:grid-cols-[1fr,350px] gap-12 items-start">

                    {/* Left Column: Calendar & Menu */}
                    <div className="min-w-0 space-y-8">

                        {/* Week Slider */}
                        <div>
                            <div className="flex items-center justify-between mb-4 px-2">
                                <h3 className="text-xl font-bold text-gray-900">Rozkład tygodnia</h3>
                                <span className="text-sm font-medium text-gray-500">
                                    Przesuń, aby zobaczyć kolejne dni →
                                </span>
                            </div>
                            <WeekSlider
                                days={weeklyMenu.days.map(d => ({ day: d.day, date: d.date }))}
                                activeDayIndex={activeDayIndex}
                                onDaySelect={setActiveDayIndex}
                            />
                        </div>

                        {/* Daily Menu (Meals) */}
                        <DailyMenu dailyMenu={activeDayMenu} />

                        {/* Social Proof Section (Bestsellers) */}
                        <div className="pt-12 border-t border-gray-100">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Ulubieńcy tygodnia ❤️</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center text-2xl">🥞</div>
                                    <div>
                                        <div className="text-xs text-orange-500 font-bold uppercase">Słodkie śniadanie</div>
                                        <div className="font-bold text-gray-900">Pankejki z karmelem</div>
                                        <div className="text-xs text-gray-500 mt-1">⭐️ 4.9/5 (120 opinii)</div>
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center text-2xl">🍝</div>
                                    <div>
                                        <div className="text-xs text-red-500 font-bold uppercase">Obiad</div>
                                        <div className="font-bold text-gray-900">Spaghetti Bolognese</div>
                                        <div className="text-xs text-gray-500 mt-1">⭐️ 4.8/5 (98 opinii)</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sticky Order Box (Desktop Only) - Mobile version handled via sticky bottom bar in future or just simple link */}
                    <div className="hidden lg:block">
                        <MenuOrderBox
                            dietName={activeDiet.name}
                            dietSlug={activeDiet.slug}
                            priceFrom={activeDiet.priceFrom}
                            currentKcal={currentKcal}
                        />

                        {/* Rotation Info */}
                        <div className="mt-8 bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
                            <h4 className="font-bold text-emerald-900 mb-3 flex items-center gap-2">
                                <span>↻</span> Jak działa rotacja?
                            </h4>
                            <ul className="space-y-3 text-sm text-emerald-800">
                                <li className="flex gap-2">
                                    <span className="font-bold">•</span>
                                    Menu zmienia się co tydzień, abyś nigdy się nie nudził.
                                </li>
                                <li className="flex gap-2">
                                    <span className="font-bold">•</span>
                                    Korzystamy tylko z sezonowych produktów od lokalnych dostawców.
                                </li>
                                <li className="flex gap-2">
                                    <span className="font-bold">•</span>
                                    Masz wpływ na menu! Głosuj na swoje ulubione dania w panelu.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Container>

            {/* Mobile Sticky CTA */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 lg:hidden z-50 flex items-center justify-between shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
                <div>
                    <div className="text-xs text-gray-500 uppercase font-bold">Wybrano:</div>
                    <div className="font-bold text-gray-900">{activeDiet.name}, {currentKcal} kcal</div>
                </div>
                <button className="bg-[#FF4F6E] text-white px-6 py-3 rounded-xl font-bold font-display shadow-lg shadow-pink-500/30">
                    Zamów od {activeDiet.priceFrom} zł
                </button>
            </div>
        </div>
    );
}
