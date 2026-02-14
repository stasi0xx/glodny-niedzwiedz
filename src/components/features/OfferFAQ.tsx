import React from 'react';
import { Container } from '@/components/ui/Container';

export const OfferFAQ = () => {
    const questions = [
        {
            q: 'Czy mogę zmieniać posiłki w diecie?',
            a: 'Tak, w panelu klienta możesz wymieniać posiłki na inne dostępne w danym dniu (w ramach tej samej kaloryczności).'
        },
        {
            q: 'Do której godziny realizowane są dostawy?',
            a: 'Dostarczamy diety codziennie w godzinach nocnych i porannych (2:00 – 7:00), aby czekały na Ciebie pod drzwiami.'
        },
        {
            q: 'Czy mogę wykluczyć składniki, których nie lubię?',
            a: 'Oferujemy diety z wykluczeniami (np. bez laktozy, wege). W ramach wyboru menu możesz też unikać konkretnych dań.'
        },
        {
            q: 'Jak dobrać odpowiednią kaloryczność?',
            a: 'Skorzystaj z naszego kalkulatora kalorii lub quizu "Dobierz dietę", który precyzyjnie wyliczy Twoje zapotrzebowanie.'
        }
    ];

    return (
        <section className="py-16 bg-white">
            <Container>
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">Częste pytania</h2>
                    <div className="space-y-4">
                        {questions.map((item, index) => (
                            <details key={index} className="group bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                                <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-gray-900 group-hover:bg-gray-100 transition-colors list-none">
                                    <span>{item.q}</span>
                                    <span className="transition-transform group-open:rotate-180">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                </summary>
                                <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-100/50">
                                    {item.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
};
