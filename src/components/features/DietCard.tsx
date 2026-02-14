import React from 'react';
import Link from 'next/link';
import { Diet } from '@/data/diets';

interface DietCardProps {
    diet: Diet;
    onCompare: (id: string) => void;
    isSelectedForCompare: boolean;
}

export const DietCard: React.FC<DietCardProps> = ({ diet, onCompare, isSelectedForCompare }) => {
    return (
        <div className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
            {/* Image / Header Area */}
            <div className="relative h-48 bg-gray-100 overflow-hidden">
                {/* Placeholder for real image */}
                <div className="absolute inset-0 bg-emerald-50 flex items-center justify-center">
                    <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-90" style={{ backgroundImage: `url(${diet.image})` }}></div>
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {diet.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-white/95 backdrop-blur-sm rounded-lg text-xs font-bold text-gray-800 shadow-sm border border-gray-100/50">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Rating */}
                {diet.rating && (
                    <div className="absolute bottom-4 right-4 flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm">
                        <span className="text-yellow-400 text-sm">★</span>
                        <span className="text-xs font-bold text-gray-800">{diet.rating}</span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col">
                <div className="mb-4">
                    <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                            {diet.name}
                        </h3>
                        {/* Price */}
                        <div className="text-right">
                            <span className="block text-xs text-gray-400">od</span>
                            <span className="text-lg font-bold text-emerald-600">{diet.priceFrom} zł</span>
                            <span className="text-xs text-gray-400">/dzień</span>
                        </div>
                    </div>
                    {/* 1-liner description based on first sentence or specific field if added */}
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                        {diet.description}
                    </p>
                </div>

                {/* Kcal & Meals info */}
                <div className="flex flex-wrap gap-3 mb-6 text-xs text-gray-500 font-medium">
                    <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                        🔥 {Math.min(...diet.kcalOptions)}-{Math.max(...diet.kcalOptions)} kcal
                    </span>
                    <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                        🍽️ {(diet.mealsOptions || [3, 5]).join('/')} pos.
                    </span>
                </div>

                {/* Highlights */}
                <ul className="mb-6 space-y-1">
                    {diet.highlights?.slice(0, 3).map((highlight, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                            {highlight}
                        </li>
                    ))}
                </ul>

                {/* Actions */}
                <div className="mt-auto grid grid-cols-[1fr,auto] gap-3">
                    <Link
                        href={`/diety/${diet.slug}`}
                        className="flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-lg shadow-emerald-500/20"
                    >
                        Wybieram
                    </Link>
                    <button
                        onClick={() => onCompare(diet.id)}
                        className={`w-12 flex items-center justify-center rounded-xl border transition-all ${isSelectedForCompare
                                ? 'bg-emerald-100 border-emerald-500 text-emerald-700'
                                : 'border-gray-200 text-gray-400 hover:border-emerald-300 hover:text-emerald-500'
                            }`}
                        title="Porównaj"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                    </button>
                    {/* <Link href={`/diety/${diet.slug}`} className="col-span-2 text-center text-xs text-gray-400 hover:text-emerald-600 mt-2">
                        Zobacz szczegóły oferty →
                    </Link> */}
                </div>
            </div>
        </div>
    );
};
