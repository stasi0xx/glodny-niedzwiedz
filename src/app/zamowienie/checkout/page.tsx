'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { diets } from '@/data/diets';

type CheckoutStep = 'contact' | 'address' | 'summary';

function CheckoutContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // Order Data from URL
    const dietId = searchParams.get('dietId');
    const kcal = searchParams.get('kcal');
    const days = searchParams.get('days');
    const startDate = searchParams.get('startDate');
    const price = searchParams.get('price');

    const selectedDiet = diets.find(d => d.id === dietId);

    // Form State
    const [step, setStep] = useState<CheckoutStep>('contact');
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        firstName: '',
        lastName: '',
        street: '',
        city: '',
        zip: '',
        notes: ''
    });
    const [isProcessing, setIsProcessing] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const nextStep = () => {
        if (step === 'contact') setStep('address');
        else if (step === 'address') setStep('summary');
    };

    const handlePayment = () => {
        setIsProcessing(true);

        // Simulate API call
        setTimeout(() => {
            // Prepare success URL params to pass data for email preview
            const successParams = new URLSearchParams({
                dietName: selectedDiet?.name || 'Dieta',
                kcal: kcal || '',
                days: days || '',
                startDate: startDate || '',
                price: price || '',
                email: formData.email,
                name: formData.firstName
            });
            router.push(`/zamowienie/sukces?${successParams.toString()}`);
        }, 2000);
    };

    if (!selectedDiet) return <div className="p-12 text-center">Błąd: Brak danych zamówienia. Wróć do koszyka.</div>;

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <Container>
                <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">

                    {/* Main Form Area */}
                    <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        {/* Steps Indicator */}
                        <div className="flex justify-between mb-8 border-b pb-4">
                            <div className={`text-sm font-bold ${step === 'contact' ? 'text-emerald-600' : 'text-gray-400'}`}>1. Dane</div>
                            <div className={`text-sm font-bold ${step === 'address' ? 'text-emerald-600' : 'text-gray-400'}`}>2. Adres</div>
                            <div className={`text-sm font-bold ${step === 'summary' ? 'text-emerald-600' : 'text-gray-400'}`}>3. Podsumowanie</div>
                        </div>

                        {step === 'contact' && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-left-4">
                                <h2 className="text-xl font-bold mb-4">Dane kontaktowe</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <input name="firstName" placeholder="Imię" className="input-base" onChange={handleChange} value={formData.firstName} />
                                    <input name="lastName" placeholder="Nazwisko" className="input-base" onChange={handleChange} value={formData.lastName} />
                                </div>
                                <input name="email" type="email" placeholder="Email" className="input-base w-full" onChange={handleChange} value={formData.email} />
                                <input name="phone" type="tel" placeholder="Telefon" className="input-base w-full" onChange={handleChange} value={formData.phone} />

                                <div className="pt-4 flex justify-end">
                                    <Button onClick={nextStep} disabled={!formData.email || !formData.firstName}>Dalej</Button>
                                </div>
                            </div>
                        )}

                        {step === 'address' && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                                <h2 className="text-xl font-bold mb-4">Adres dostawy</h2>
                                <div className="grid grid-cols-3 gap-4">
                                    <input name="zip" placeholder="Kod pocztowy" className="input-base col-span-1" onChange={handleChange} value={formData.zip} />
                                    <input name="city" placeholder="Miasto" className="input-base col-span-2" onChange={handleChange} value={formData.city} />
                                </div>
                                <input name="street" placeholder="Ulica i numer" className="input-base w-full" onChange={handleChange} value={formData.street} />
                                <input name="notes" placeholder="Instrukcje dla kuriera (np. kod do klatki)" className="input-base w-full" onChange={handleChange} value={formData.notes} />

                                <div className="pt-4 flex justify-between">
                                    <Button variant="ghost" onClick={() => setStep('contact')}>Wróć</Button>
                                    <Button onClick={nextStep} disabled={!formData.street || !formData.city}>Dalej</Button>
                                </div>
                            </div>
                        )}

                        {step === 'summary' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                                <h2 className="text-xl font-bold mb-4">Potwierdzenie danych</h2>

                                <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-2">
                                    <p><strong>Odbiorca:</strong> {formData.firstName} {formData.lastName}</p>
                                    <p><strong>Email:</strong> {formData.email}</p>
                                    <p><strong>Telefon:</strong> {formData.phone}</p>
                                    <p><strong>Adres:</strong> {formData.street}, {formData.zip} {formData.city}</p>
                                    {formData.notes && <p><strong>Uwagi:</strong> {formData.notes}</p>}
                                </div>

                                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                                    <h3 className="font-bold text-emerald-800 mb-2">Metoda płatności</h3>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name="payment" defaultChecked className="accent-emerald-500" />
                                            <span>Szybki przelew / BLIK (PayU)</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name="payment" className="accent-emerald-500" />
                                            <span>Karta płatnicza</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-between">
                                    <Button variant="ghost" onClick={() => setStep('address')} disabled={isProcessing}>Wróć</Button>
                                    <Button onClick={handlePayment} disabled={isProcessing} className="w-1/2">
                                        {isProcessing ? 'Przetwarzanie...' : `Zapłać ${price} zł`}
                                    </Button>
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Sidebar Summary */}
                    <div className="h-fit bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                        <h3 className="font-bold text-gray-500 text-sm uppercase mb-4">Twoje zamówienie</h3>
                        <div className="flex items-start gap-4 mb-4">
                            {/* Placeholder Img */}
                            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-400 font-bold">
                                IMG
                            </div>
                            <div>
                                <h4 className="font-bold">{selectedDiet.name}</h4>
                                <p className="text-sm text-gray-500">{kcal} kcal</p>
                            </div>
                        </div>
                        <div className="space-y-2 text-sm border-t pt-4 border-gray-100">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Długość:</span>
                                <span>{days} dni</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Start:</span>
                                <span>{startDate}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg pt-2 mt-2 border-t border-gray-100">
                                <span>Suma:</span>
                                <span>{price} zł</span>
                            </div>
                        </div>
                    </div>

                </div>
            </Container>
            <style jsx global>{`
            .input-base {
                @apply w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all;
            }
        `}</style>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div className="p-12 text-center">Ładowanie kasy...</div>}>
            <CheckoutContent />
        </Suspense>
    );
}
