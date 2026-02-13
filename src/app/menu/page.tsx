import React from 'react';
import { Container } from '@/components/ui/Container';
import { menuMock } from '@/data/menuMock';

export default function MenuPage() {
    return (
        <div className="py-12 bg-gray-50/50 min-h-screen">
            <Container>
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Aktualne Menu 🍲</h1>
                    <p className="text-gray-600">Sprawdź, co nasi szefowie kuchni przygotowali na ten tydzień.</p>
                </div>

                <div className="space-y-8">
                    {menuMock.map((dayMenu, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="bg-emerald-600 px-6 py-3 text-white font-bold text-lg">
                                {dayMenu.day}
                            </div>
                            <div className="p-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                                {dayMenu.meals.map((meal, mIndex) => (
                                    <div key={mIndex} className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col h-full">
                                        <span className="text-xs font-bold text-emerald-600 uppercase mb-2">{meal.type}</span>
                                        <h3 className="font-semibold text-gray-900 mb-2 flex-1">{meal.name}</h3>
                                        <span className="text-xs text-gray-500">{meal.kcal} kcal</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}
