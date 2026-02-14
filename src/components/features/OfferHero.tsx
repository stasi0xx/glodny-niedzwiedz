import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export const OfferHero = () => {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#F8F9FA]">
            {/* Subtle Gradient Blobs - Matching Home Page */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-[10%] -right-[5%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#FF9A9E] to-[#FECFEF] opacity-40 blur-[100px] mix-blend-multiply animate-pulse" style={{ animationDuration: '8s' }}></div>
                <div className="absolute top-[5%] -left-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#A18CD1] to-[#FBC2EB] opacity-30 blur-[90px] mix-blend-multiply animate-pulse" style={{ animationDuration: '10s' }}></div>
            </div>

            <Container className="relative z-10 text-center">
                <span className="inline-block py-1.5 px-4 rounded-full border border-black/5 bg-white/40 backdrop-blur-md text-xs font-bold tracking-widest uppercase text-gray-900 mb-6 shadow-sm">
                    Pełna Oferta
                </span>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display tracking-tighter text-[#111111] leading-[0.9] mb-8 text-balance drop-shadow-sm">
                    Znajdź Dietę, <br />
                    <span className="italic font-serif font-light text-[#111111] opacity-90">Idealną</span> dla Ciebie.
                </h1>

                <p className="text-xl md:text-2xl font-light text-gray-800/90 max-w-2xl mx-auto mb-10 leading-relaxed text-balance">
                    Sprawdź nasze wszystkie warianty lub <span className="font-medium text-black">skorzystaj z quizu</span>, abyśmy dobrali ją za Ciebie.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        href="/dobierz-diete"
                        className="bg-black text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-gray-800 transition-transform hover:scale-105 active:scale-95 shadow-xl shadow-black/20 flex items-center gap-3 group"
                    >
                        Dobierz dietę (Quiz)
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </Link>
                    <Link
                        href="/dowoz"
                        className="px-10 py-5 rounded-full text-lg font-bold text-gray-900 border border-gray-200 hover:border-black hover:bg-gray-50 transition-all active:scale-95"
                    >
                        Sprawdź dowóz
                    </Link>
                </div>
            </Container>
        </section>
    );
};
