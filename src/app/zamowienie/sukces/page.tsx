'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { EmailPreview } from '@/components/features/EmailPreview';
import confetti from 'canvas-confetti';

function SuccessContent() {
    const searchParams = useSearchParams();
    const data = {
        name: searchParams.get('name') || 'Kliencie',
        dietName: searchParams.get('dietName'),
        kcal: searchParams.get('kcal'),
        days: searchParams.get('days'),
        startDate: searchParams.get('startDate'),
        price: searchParams.get('price'),
        email: searchParams.get('email')
    };

    const [showEmails, setShowEmails] = useState(false);
    const [isGenerating, setIsGenerating] = useState(true);

    useEffect(() => {
        // Simulate "Generating confirmation..."
        const timer = setTimeout(() => {
            setIsGenerating(false);

            // Fire confetti after generation is done
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
            const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

            const interval = setInterval(function () {
                const timeLeft = animationEnd - Date.now();
                if (timeLeft <= 0) return clearInterval(interval);

                const particleCount = 50 * (timeLeft / duration);

                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
                });
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
                });
            }, 250);

            return () => clearInterval(interval);

        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (isGenerating) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center p-4">
                <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-6"></div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Generowanie potwierdzenia...</h2>
                <p className="text-gray-500">Proszę czekać, zapisujemy Twoje zamówienie.</p>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen py-20 text-center animate-in fade-in duration-700">
            <Container>
                <div className="max-w-4xl mx-auto">
                    <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                        <span className="text-5xl">🎉</span>
                    </div>

                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-indigo-600 mb-6">
                        Dziękujemy za zamówienie!
                    </h1>
                    <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                        Twoja dieta jest już w drodze (mentalnie). Poniżej znajdziesz podsumowanie.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-2xl mx-auto">
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-left">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                🚀 Co teraz?
                            </h3>
                            <ul className="space-y-3 text-sm text-gray-600">
                                <li className="flex gap-2">
                                    <span>1.</span>
                                    <span>Wyślemy potwierdzenie na maila: <strong>{data.email}</strong>.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span>2.</span>
                                    <span>Kucharze rozpoczną przygotowania w przeddzień dostawy.</span>
                                </li>
                                <li className="flex gap-2">
                                    <span>3.</span>
                                    <span>Oczekuj paczki w dniu: <strong>{data.startDate}</strong>.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex flex-col items-center justify-center">
                            <h3 className="font-bold text-emerald-900 mb-2">Sprawdź skrzynkę</h3>
                            <p className="text-sm text-emerald-700 mb-4">Wysłaliśmy do Ciebie ważne maile.</p>
                            <Button variant="outline" size="sm" onClick={() => setShowEmails(!showEmails)}>
                                {showEmails ? 'Ukryj podgląd' : 'Zobacz podgląd maili (Dev Tool)'}
                            </Button>
                        </div>
                    </div>

                    {showEmails && (
                        <div className="animate-in slide-in-from-bottom-10 fade-in duration-500 mb-12 text-left">
                            <div className="mb-4 text-center">
                                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-500 text-xs font-mono rounded-full">
                                    DEVELOPER PREVIEW MODE
                                </span>
                            </div>
                            <EmailPreview data={data} />
                        </div>
                    )}

                    <div className="flex justify-center gap-4">
                        <Link href="/">
                            <Button>Wróć na stronę główną</Button>
                        </Link>
                        <Link href="/blog">
                            <Button variant="ghost">Poczytaj bloga</Button>
                        </Link>
                    </div>

                </div>
            </Container>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={<div className="p-12 text-center">Wczytywanie...</div>}>
            <SuccessContent />
        </Suspense>
    );
}
