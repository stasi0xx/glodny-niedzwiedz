'use client';

import React from 'react';
import { Diet } from '@/data/diets';

interface DietTimelineProps {
    diet: Diet;
}

export const DietTimeline: React.FC<DietTimelineProps> = ({ diet }) => {
    return (
        <div className="py-12 space-y-20 relative">
            {/* Styling for the blending images */}
            <style jsx>{`
                .image-blend-left {
                    mask-image: linear-gradient(to right, black 50%, transparent 100%);
                    -webkit-mask-image: linear-gradient(to right, black 50%, transparent 100%);
                }
                .image-blend-right {
                    mask-image: linear-gradient(to left, black 50%, transparent 100%);
                    -webkit-mask-image: linear-gradient(to left, black 50%, transparent 100%);
                }
            `}</style>

            <h2 className="text-4xl font-display font-bold text-center mb-16">Dlaczego warto wybrać ten wariant?</h2>

            {/* Stage 1: Zalety (Highlights) */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl skew-y-1 transform transition-transform hover:skew-y-0 duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 z-10" />
                    <img
                        src="https://source.unsplash.com/800x600/?healthy,food,ingredients&sig=1"
                        alt="Zalety diety"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="space-y-6">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="flex items-center justify-center w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full font-bold text-xl">1</span>
                        <h3 className="text-3xl font-display font-bold">Zalety & Korzyści</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {diet.highlights.map((h, i) => (
                            <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow hover:border-emerald-200 group">
                                <p className="font-bold text-gray-800 mb-1 group-hover:text-emerald-600 transition-colors">{h}</p>
                                <p className="text-xs text-gray-500">Kluczowa korzyść dla Twojego zdrowia.</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stage 2: Makro (Macros & Allergens) */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1 space-y-6">
                    <div className="flex items-center gap-4 mb-4 justify-end md:flex-row-reverse">
                        <span className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full font-bold text-xl">2</span>
                        <h3 className="text-3xl font-display font-bold text-right">Makro & Składniki</h3>
                    </div>

                    {/* Macro Tiles */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-4">
                        <div className="bg-blue-50 p-4 rounded-2xl text-center border border-blue-100">
                            <span className="block text-xl lg:text-2xl font-bold text-blue-600">
                                {diet.macros.protein.min}-{diet.macros.protein.max}%
                            </span>
                            <span className="text-xs text-gray-600 font-bold uppercase tracking-wider">Białko</span>
                        </div>
                        <div className="bg-pink-50 p-4 rounded-2xl text-center border border-pink-100">
                            <span className="block text-xl lg:text-2xl font-bold text-pink-600">
                                {diet.macros.fat.min}-{diet.macros.fat.max}%
                            </span>
                            <span className="text-xs text-gray-600 font-bold uppercase tracking-wider">Tłuszcze</span>
                        </div>
                        <div className="bg-amber-50 p-4 rounded-2xl text-center border border-amber-100">
                            <span className="block text-xl lg:text-2xl font-bold text-amber-600">
                                {diet.macros.carbs.min}-{diet.macros.carbs.max}%
                            </span>
                            <span className="text-xs text-gray-600 font-bold uppercase tracking-wider">Węgle</span>
                        </div>
                        <div className="col-span-3 bg-gray-50 p-4 rounded-2xl text-center border border-gray-200 mt-2">
                            <span className="block text-xl font-bold text-gray-900">
                                {Math.min(...diet.kcalOptions)} - {Math.max(...diet.kcalOptions)} kcal
                            </span>
                            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Dostępne warianty kaloryczne</span>
                        </div>
                    </div>

                    {/* Allergens Mini-Tiles */}
                    <div className="pt-4">
                        <p className="text-sm font-bold text-gray-500 mb-3 text-right">Alergeny:</p>
                        <div className="flex flex-wrap gap-2 justify-end">
                            {diet.allergens.map(a => (
                                <span key={a} className="px-3 py-1 bg-gray-100 border border-gray-200 text-gray-600 rounded-lg text-xs font-semibold capitalize">
                                    {a}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="order-1 md:order-2 relative h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl -skew-y-1 transform transition-transform hover:skew-y-0 duration-700">
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/20 z-10" />
                    <img
                        src="https://source.unsplash.com/800x600/?nutrition,vegetables&sig=2"
                        alt="Składniki diety"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Stage 3: Dostawa (Delivery) */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl skew-y-1 transform transition-transform hover:skew-y-0 duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 z-10" />
                    <img
                        src="https://source.unsplash.com/800x600/?delivery,box,food&sig=3"
                        alt="Dostawa diety"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="space-y-6">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-full font-bold text-xl">3</span>
                        <h3 className="text-3xl font-display font-bold">Dostawa & Wygoda</h3>
                    </div>
                    <div className="grid gap-4">
                        <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-start gap-4 hover:border-purple-200 transition-colors">
                            <span className="text-2xl">🌙</span>
                            <div>
                                <h4 className="font-bold text-gray-900">Dostawy nocne</h4>
                                <p className="text-sm text-gray-500">Codziennie między 2:00 a 7:00 rano. <br /> Dieta czeka na wycieraczce.</p>
                            </div>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-start gap-4 hover:border-purple-200 transition-colors">
                            <span className="text-2xl">⚡</span>
                            <div>
                                <h4 className="font-bold text-gray-900">Elastyczne zmiany</h4>
                                <p className="text-sm text-gray-500">Edycja adresu lub pauza zamówienia <br /> do 10:00 (2 dni przed).</p>
                            </div>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-start gap-4 hover:border-purple-200 transition-colors">
                            <span className="text-2xl">🌍</span>
                            <div>
                                <h4 className="font-bold text-gray-900">Szeroki zasięg</h4>
                                <p className="text-sm text-gray-500">Dostarczamy do ponad 3000 miejscowości. <br /> Sprawdź swój kod pocztowy.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
