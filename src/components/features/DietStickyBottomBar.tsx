'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface DietStickyBottomBarProps {
    name: string;
    priceFrom: number;
    slug: string;
}

export const DietStickyBottomBar: React.FC<DietStickyBottomBarProps> = ({ name, priceFrom, slug }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show bar after scrolling past the hero section (approx 600px)
            const showThreshold = 600;
            if (window.scrollY > showThreshold) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Initial check
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 shadow-[0_-5px_30px_rgba(0,0,0,0.08)] z-50 transition-transform duration-500 ease-out transform ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
        >
            <div className="container mx-auto px-4 py-3 md:py-4">
                <div className="flex items-center justify-between gap-4 max-w-5xl mx-auto">

                    {/* Diet Info (Hidden on very small screens to save space for CTA) */}
                    <div className="hidden sm:flex flex-col">
                        <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-0.5">Wybrana dieta</span>
                        <h3 className="text-lg font-bold text-gray-900 leading-none">{name}</h3>
                    </div>

                    {/* Price & Action */}
                    <div className="flex items-center gap-4 md:gap-8 flex-1 sm:flex-none justify-between sm:justify-end w-full sm:w-auto">
                        <div className="flex flex-col items-end sm:items-start">
                            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-0.5 sm:text-right">Cena od</p>
                            <p className="text-lg sm:text-xl font-bold text-gray-900 leading-none">{priceFrom} zł <span className="text-xs text-gray-400 font-normal">/dzień</span></p>
                        </div>
                        <Link href={`/zamowienie?diet=${slug}`}>
                            <Button className="bg-[#FF4F6E] hover:bg-[#ff3355] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-base font-bold shadow-lg shadow-pink-500/30 transition-all hover:scale-105 active:scale-95 whitespace-nowrap">
                                Zamów dietę
                            </Button>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};
