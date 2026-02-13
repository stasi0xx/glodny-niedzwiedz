import React from 'react';
import { Diet } from '../../data/diets';
import { Button } from '../ui/Button';
import Link from 'next/link';

interface DietComparisonProps {
    selectedDiets: Diet[];
    onRemove: (id: string) => void;
}

export const DietComparison: React.FC<DietComparisonProps> = ({ selectedDiets, onRemove }) => {
    if (selectedDiets.length === 0) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-40 transform transition-transform duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900">Porównanie ({selectedDiets.length}/3)</h3>
                    {selectedDiets.length > 0 && (
                        <button onClick={() => selectedDiets.forEach(d => onRemove(d.id))} className="text-sm text-red-500 hover:underline">Wyczyść</button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-x-auto pb-2">
                    {selectedDiets.map(diet => (
                        <div key={diet.id} className="relative p-4 rounded-xl bg-gray-50 border border-gray-100 flex flex-col">
                            <button
                                onClick={() => onRemove(diet.id)}
                                className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                            >
                                ✕
                            </button>
                            <div className="font-bold text-emerald-800 mb-1">{diet.name}</div>
                            <div className="text-xs text-gray-500 mb-2">{Math.min(...diet.kcalOptions)}-{Math.max(...diet.kcalOptions)} kcal</div>

                            <div className="space-y-1 text-xs mb-3">
                                <div className="flex justify-between">
                                    <span>Cena od:</span>
                                    <span className="font-bold">{diet.priceFrom} zł</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Posiłki:</span>
                                    <span>{diet.mealsOptions.join('/')}</span>
                                </div>
                            </div>

                            <Link href={`/diety/${diet.slug}`} className="mt-auto">
                                <Button size="sm" variant="outline" className="w-full text-xs py-1 h-8">Szczegóły</Button>
                            </Link>
                        </div>
                    ))}
                    {selectedDiets.length < 3 && (
                        <div className="hidden md:flex items-center justify-center p-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-sm">
                            Wybierz kolejną dietę
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
