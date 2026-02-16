'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

interface MenuOrderBoxProps {
    dietName: string;
    dietSlug: string;
    priceFrom: number;
    currentKcal: number;
}

export const MenuOrderBox = ({ dietName, dietSlug, priceFrom, currentKcal }: MenuOrderBoxProps) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-xl shadow-gray-200 border border-gray-100 sticky top-32">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Twój wybór</h3>
            <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                    <span className="text-gray-500 text-sm">Dieta</span>
                    <span className="font-bold text-emerald-600">{dietName}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                    <span className="text-gray-500 text-sm">Kaloryczność</span>
                    <span className="font-bold text-gray-900">{currentKcal} kcal</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-50">
                    <span className="text-gray-500 text-sm">Cena od</span>
                    <span className="font-bold text-gray-900">{priceFrom} zł / dzień</span>
                </div>
            </div>

            <Button className="w-full bg-[#FF4F6E] hover:bg-[#ff3355] text-white py-4 rounded-xl font-bold shadow-lg shadow-pink-500/20 mb-3 transition-transform hover:scale-105 active:scale-95">
                Zamów tę dietę
            </Button>
            <p className="text-xs text-center text-gray-400">
                Możesz dobrać dni i dodatki w następnym kroku.
            </p>
        </div>
    );
};
