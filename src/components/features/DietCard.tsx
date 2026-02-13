import React from 'react';
import Link from 'next/link';
import { Diet } from '../../data/diets';
import { Button } from '../ui/Button';

interface DietCardProps {
    diet: Diet;
    onCompare?: (id: string) => void;
    isSelectedForCompare?: boolean;
}

export const DietCard: React.FC<DietCardProps> = ({ diet, onCompare, isSelectedForCompare }) => {
    return (
        <div className="flex flex-col h-full rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-48 bg-gray-200 relative">
                {/* Placeholder image logic - in real app use diet.image */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-gray-500/20 flex items-center justify-center text-4xl font-bold text-gray-400/50">
                    {diet.name.substring(0, 2)}
                </div>
                <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-bold text-emerald-800 shadow-sm">
                        od {diet.priceFrom} zł
                    </span>
                </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{diet.name}</h3>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {diet.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-md">
                            {tag}
                        </span>
                    ))}
                </div>

                <p className="text-sm text-gray-600 mb-6 flex-1 line-clamp-3">
                    {diet.description}
                </p>

                <div className="flex gap-2 text-sm text-gray-500 mb-6">
                    <span>🔥 {Math.min(...diet.kcalOptions)} - {Math.max(...diet.kcalOptions)} kcal</span>
                </div>

                <div className="flex gap-3 mt-auto">
                    <Link href={`/diety/${diet.slug}`} className="flex-1">
                        <Button className="w-full">Wybieram</Button>
                    </Link>
                    {onCompare && (
                        <button
                            onClick={() => onCompare(diet.id)}
                            className={`p-3 rounded-full border transition-colors ${isSelectedForCompare
                                    ? 'bg-emerald-100 border-emerald-500 text-emerald-700'
                                    : 'border-gray-200 text-gray-400 hover:text-emerald-500 hover:border-emerald-500'
                                }`}
                            title="Dodaj do porównania"
                        >
                            🆚
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
