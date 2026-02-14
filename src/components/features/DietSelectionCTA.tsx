import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { useTranslation } from '@/hooks/useTranslation';

export const DietSelectionCTA = () => {
    const t = useTranslation();

    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background with Gradient and Grain */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF9A9E] via-[#FECFEF] to-[#A18CD1]"></div>
            <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay"></div>

            {/* Decorative Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-1/2 -left-1/4 w-[1000px] h-[1000px] rounded-full bg-white opacity-20 blur-[120px] mix-blend-overlay animate-pulse" style={{ animationDuration: '10s' }}></div>
                <div className="absolute -bottom-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-purple-500 opacity-30 blur-[100px] mix-blend-multiply animate-pulse" style={{ animationDuration: '8s' }}></div>
            </div>

            <Container className="relative z-10 text-center">
                <div className="max-w-3xl mx-auto space-y-8">
                    <h2 className="text-4xl md:text-6xl font-bold font-display tracking-tighter text-black leading-[1.1] drop-shadow-sm">
                        {t.dietSelectionCTA.title} <br />
                        <span className="text-white drop-shadow-md italic serif">{t.dietSelectionCTA.title2}</span>
                    </h2>

                    <p className="text-xl md:text-2xl text-black/80 font-medium max-w-2xl mx-auto leading-relaxed">
                        {t.dietSelectionCTA.subtitle}
                    </p>

                    <div className="pt-4">
                        <Link href="/dobierz-diete">
                            <button className="bg-black text-white px-12 py-6 rounded-full text-xl font-bold hover:bg-gray-900 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-purple-900/20 flex items-center gap-3 mx-auto group">
                                {t.dietSelectionCTA.ctaButton}
                                <span className="bg-white text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold group-hover:rotate-12 transition-transform">
                                    ?
                                </span>
                            </button>
                        </Link>
                    </div>

                    <div className="flex justify-center items-center gap-8 pt-8 opacity-70">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className={`w-10 h-10 rounded-full border-2 border-white/50 bg-gray-200 flex items-center justify-center overflow-hidden`}>
                                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-300"></div>
                                </div>
                            ))}
                        </div>
                        <p className="text-sm font-bold text-black/60 uppercase tracking-widest">
                            {t.dietSelectionCTA.joinText}
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    );
};
