import React from 'react';
import { DietDayMenu } from '@/data/diets';

interface DietSampleMenuProps {
    menu: DietDayMenu[];
}

export const DietSampleMenu: React.FC<DietSampleMenuProps> = ({ menu }) => {
    if (!menu || menu.length === 0) return null;

    // MVP: only showing first day available
    const dayMenu = menu[0];

    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="bg-gray-50/50 p-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-900">Przykładowe menu</h3>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                    Dzień {dayMenu.day}
                </span>
            </div>

            <div className="divide-y divide-gray-100">
                {dayMenu.meals.map((meal, idx) => (
                    <div key={idx} className="p-4 hover:bg-gray-50/50 transition-colors flex items-start gap-4">
                        <div className="min-w-[80px] pt-1">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-1">{meal.type}</span>
                            <span className="inline-block text-[10px] font-medium bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                                {meal.kcal} kcal
                            </span>
                        </div>
                        <div className="flex-1">
                            <p className="text-gray-900 font-medium leading-snug mb-1">{meal.name}</p>
                            {meal.allergens && meal.allergens.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {meal.allergens.map(a => (
                                        <span key={a} className="text-[10px] text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-100/50">
                                            {a}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 bg-gray-50/30 text-center border-t border-gray-100">
                <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700 hover:underline">
                    Zobacz menu na cały tydzień →
                </button>
            </div>
        </div>
    );
};
