import React from 'react';
import { DietMacro } from '@/data/diets';

interface DietMacrosProps {
    macros: DietMacro;
}

export const DietMacros: React.FC<DietMacrosProps> = ({ macros }) => {
    if (!macros) return null;

    return (
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="p-2 bg-blue-50 text-blue-600 rounded-lg text-lg">📊</span>
                Makroskładniki
            </h3>

            <div className="space-y-6">
                {/* Protein */}
                <div>
                    <div className="flex justify-between mb-2 text-sm font-medium">
                        <span className="text-gray-700">Białko</span>
                        <span className="text-gray-900">{macros.protein.min}-{macros.protein.max}%</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"
                            style={{ width: `${(macros.protein.min + macros.protein.max) / 2}%` }}
                        ></div>
                    </div>
                </div>

                {/* Fat */}
                <div>
                    <div className="flex justify-between mb-2 text-sm font-medium">
                        <span className="text-gray-700">Tłuszcze</span>
                        <span className="text-gray-900">{macros.fat.min}-{macros.fat.max}%</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"
                            style={{ width: `${(macros.fat.min + macros.fat.max) / 2}%` }}
                        ></div>
                    </div>
                </div>

                {/* Carbs */}
                <div>
                    <div className="flex justify-between mb-2 text-sm font-medium">
                        <span className="text-gray-700">Węglowodany</span>
                        <span className="text-gray-900">{macros.carbs.min}-{macros.carbs.max}%</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full"
                            style={{ width: `${(macros.carbs.min + macros.carbs.max) / 2}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            <p className="mt-6 text-xs text-gray-500 leading-relaxed">
                * Wartości makroskładników są uśrednione i mogą się nieznacznie różnić w zależności od wybranego wariantu kalorycznego. Staramy się, aby każdy posiłek był zbilansowany zgodnie z powyższymi wytycznymi.
            </p>
        </div>
    );
};
