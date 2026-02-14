import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export const OfferCTA = () => {
    return (
        <section className="py-20 bg-emerald-900 relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/3 translate-y-1/3"></div>

            <Container className="relative z-10 text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                    Gotowy na zmianę?
                </h2>
                <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto">
                    Dobierz idealną dietę w 60 sekund i ciesz się pysznym jedzeniem już od jutra!
                </p>
                <Link
                    href="/dobierz-diete"
                    className="inline-block bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold py-4 px-10 rounded-full transition-transform transform hover:scale-105 shadow-xl shadow-orange-900/20"
                >
                    Dobierz dietę teraz
                </Link>
            </Container>
        </section>
    );
};
