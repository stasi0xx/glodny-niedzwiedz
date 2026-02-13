'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { diets } from '@/data/diets';
import { calculatePrice } from '@/data/pricing';
import Link from 'next/link';

function CartContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [selectedDietId, setSelectedDietId] = useState(diets[0].id);
    const [kcal, setKcal] = useState(2000);
    const [days, setDays] = useState(20);
    const [startDate, setStartDate] = useState('');

    useEffect(() => {
        // Initialize from URL
        const dietSlug = searchParams.get('diet');
        const kcalParam = searchParams.get('kcal');

        if (dietSlug) {
            const found = diets.find(d => d.slug === dietSlug);
            if (found) setSelectedDietId(found.id);
        }
        if (kcalParam) setKcal(Number(kcalParam));

        // Set default start date to tomorrow + 2 days
        const date = new Date();
        date.setDate(date.getDate() + 2);
        setStartDate(date.toISOString().split('T')[0]);
    }, [searchParams]);

    const selectedDiet = diets.find(d => d.id === selectedDietId) || diets[0];

    // Handlers
    const handleDietChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newDiet = diets.find(d => d.id === e.target.value);
        if (newDiet) {
            setSelectedDietId(newDiet.id);
            // Reset kcal if not available in new diet
            if (!newDiet.kcalOptions.includes(kcal)) {
                setKcal(newDiet.kcalOptions[0]);
            }
        }
    };

    const totalPrice = calculatePrice(selectedDiet, kcal, days);
    const dailyPrice = Math.round(totalPrice / days);

    const proceedToCheckout = () => {
        const params = new URLSearchParams({
            dietId: selectedDietId,
            kcal: kcal.toString(),
            days: days.toString(),
            startDate: startDate,
            price: totalPrice.toString()
        });
        router.push(`/zamowienie/checkout?${params.toString()}`);
    };

    return (
        <Container className="py-12">
            <h1 className="text-3xl font-bold mb-8">Twój koszyk 🛒</h1>

            <div className="grid lg:grid-cols-3 gap-12">
                {/* Configuration Form */}
                <div className="lg:col-span-2 space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">

                    {/* Diet Selection */}
                    <div>
                        <label className="block font-semibold mb-2">Wybierz dietę</label>
                        <select
                            value={selectedDietId}
                            onChange={handleDietChange}
                            className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white transition-colors"
                        >
                            {diets.map(d => (
                                <option key={d.id} value={d.id}>{d.name}</option>
                            ))}
                        </select>
                        <p className="text-sm text-gray-500 mt-2">{selectedDiet.description}</p>
                    </div>

                    {/* Grid for Kcal & Days */}
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block font-semibold mb-2">Kaloryczność</label>
                            <select
                                value={kcal}
                                onChange={(e) => setKcal(Number(e.target.value))}
                                className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white"
                            >
                                {selectedDiet.kcalOptions.map(k => (
                                    <option key={k} value={k}>{k} kcal</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block font-semibold mb-2">Liczba dni</label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="range"
                                    min="5" max="30" step="1"
                                    value={days}
                                    onChange={(e) => setDays(Number(e.target.value))}
                                    className="flex-1 accent-emerald-500"
                                />
                                <span className="font-bold w-12 text-right">{days} dni</span>
                            </div>
                        </div>
                    </div>

                    {/* Start Date */}
                    <div>
                        <label className="block font-semibold mb-2">Kiedy startujemy?</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white"
                        />
                        <p className="text-xs text-gray-400 mt-1">Zamówienia złożone do 10:00 realizujemy od pojutrze.</p>
                    </div>

                    {/* Allergens Info */}
                    <div className="bg-yellow-50 p-4 rounded-lg text-sm text-yellow-800 border border-yellow-100">
                        <strong>Alergeny w diecie {selectedDiet.name}:</strong> {selectedDiet.allergens.join(', ')}.
                    </div>
                </div>

                {/* Summary Sidebar */}
                <div>
                    <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-xl sticky top-24">
                        <h2 className="text-xl font-bold mb-6">Podsumowanie</h2>

                        <div className="space-y-4 mb-8 text-sm text-gray-300">
                            <div className="flex justify-between">
                                <span>Dieta:</span>
                                <span className="text-white font-medium">{selectedDiet.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Wariant:</span>
                                <span className="text-white font-medium">{kcal} kcal</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Długość:</span>
                                <span className="text-white font-medium">{days} dni</span>
                            </div>
                            <div className="border-t border-gray-700 my-4"></div>
                            <div className="flex justify-between">
                                <span>Cena za dzień:</span>
                                <span className="text-white font-medium">{dailyPrice} zł</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-end mb-6">
                            <span className="text-lg">Do zapłaty:</span>
                            <span className="text-4xl font-bold text-emerald-400">{totalPrice} zł</span>
                        </div>

                        <Button onClick={proceedToCheckout} className="w-full py-4 text-lg font-bold shadow-lg shadow-emerald-500/20">
                            Przejdź do kasy
                        </Button>

                        <div className="mt-4 text-center">
                            <Link href="/oferta" className="text-sm text-gray-400 hover:text-white underline">
                                Dodaj kolejną dietę
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default function CartPage() {
    return (
        <Suspense fallback={<div className="p-12 text-center">Ładowanie koszyka...</div>}>
            <CartContent />
        </Suspense>
    );
}
