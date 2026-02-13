'use client';

import React, { Suspense, useState } from 'react';
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

    React.useEffect(() => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-white min-h-screen py-20 text-center">
            <Container>
                <div className="max-w-2xl mx-auto">
                    <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                        <span className="text-5xl">🎉</span>
                    </div>

                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-indigo-600 mb-6">
                        Dziękujemy za zamówienie!
                    </h1>
                    <p className="text-xl text-gray-600 mb-12">
                        Twoja dieta jest już w drodze (mentalnie). Poniżej znajdziesz podsumowanie.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mb-12">
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
                                {showEmails ? 'Ukryj podgląd' : 'Zobacz podgląd maili'}
                            </Button>
                        </div>
                    </div>

                    {showEmails && (
                        <div className="space-y-8 animate-in slide-in-from-bottom-10 fade-in duration-500 mb-12">
                            <div>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Email 1: Potwierdzenie</span>
                                <EmailPreview type="order" data={data} />
                            </div>
                            <div>
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Email 2: Płatność</span>
                                <EmailPreview type="payment" data={data} />
                            </div>
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
        <Suspense fallback={<div className="p-12 text-center">Finalizowanie...</div>}>
            <SuccessContent />
        </Suspense>
    );
}
