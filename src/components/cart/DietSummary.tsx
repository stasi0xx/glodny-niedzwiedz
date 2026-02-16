import React from 'react';
import { Diet } from '@/data/diets';

interface DietSummaryProps {
    diet: Diet;
    kcal: number;
    days: number;
    // We might want to allow editing here or just display
    onKcalChange?: (kcal: number) => void;
}

export function DietSummary({ diet, kcal, days, onKcalChange }: DietSummaryProps) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                <span className="text-2xl">🥗</span>
                Twój wybór
            </h3>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Image / Icon placeholder if we had images in diet object, 
                    for now just using a colored div or similar */}
                <div className="w-full md:w-32 h-32 bg-emerald-100 rounded-xl flex items-center justify-center text-4xl shadow-inner">
                    🍽️
                </div>

                <div className="flex-1 space-y-4">
                    <div>
                        <h4 className="text-lg font-bold text-gray-900">{diet.name}</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {diet.tags && diet.tags.map(tag => (
                                <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Kaloryczność</label>
                            {onKcalChange ? (
                                <select
                                    value={kcal}
                                    onChange={(e) => onKcalChange(Number(e.target.value))}
                                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                                >
                                    {diet.kcalOptions.map(k => (
                                        <option key={k} value={k}>{k} kcal</option>
                                    ))}
                                </select>
                            ) : (
                                <div className="font-bold text-gray-800">{kcal} kcal</div>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">Posiłki</label>
                            <div className="font-bold text-gray-800">5 posiłków</div> {/* Hardcoded for MVP as per most diets */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-50 text-sm text-gray-500">
                <span className="font-semibold text-emerald-600">Tip:</span> Możesz zmienić konfigurację diety w każdej chwili przed zamówieniem.
            </div>
        </div>
    );
}
