'use client';

import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSent(true);
    };

    return (
        <div className="py-12 bg-white min-h-screen">
            <Container>
                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h1 className="text-4xl font-bold mb-6">Skontaktuj się z nami 👋</h1>
                        <p className="text-lg text-gray-600 mb-8">
                            Masz pytania dotyczące diety? A może chcesz nawiązać współpracę? Jesteśmy do dyspozycji.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600 text-xl">📍</div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Adres</h3>
                                    <p className="text-gray-600">ul. Smaczna 12<br />00-001 Warszawa</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600 text-xl">📞</div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Telefon</h3>
                                    <p className="text-gray-600">+48 123 456 789<br /><span className="text-sm text-gray-400">Pn-Pt 8:00 - 18:00</span></p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600 text-xl">✉️</div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Email</h3>
                                    <p className="text-gray-600">kontakt@glodnyniedzwiedz.pl</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                        {sent ? (
                            <div className="h-full flex flex-col items-center justify-center text-center">
                                <div className="text-5xl mb-4">✅</div>
                                <h3 className="text-xl font-bold mb-2">Wiadomość wysłana!</h3>
                                <p className="text-gray-600">Odezwiemy się najszybciej jak to możliwe.</p>
                                <Button className="mt-8" onClick={() => setSent(false)} variant="outline">Wyślij kolejną</Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <h2 className="text-xl font-bold mb-4">Formularz kontaktowy</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <input required placeholder="Imię" className="input-field" />
                                    <input required placeholder="Email" type="email" className="input-field" />
                                </div>
                                <input required placeholder="Temat" className="input-field" />
                                <textarea required placeholder="Treść wiadomości..." rows={5} className="input-field"></textarea>

                                <Button type="submit" className="w-full">Wyślij wiadomość</Button>
                            </form>
                        )}
                    </div>
                </div>
            </Container>
            <style jsx>{`
        .input-field {
            @apply w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none bg-white;
        }
      `}</style>
        </div>
    );
}
