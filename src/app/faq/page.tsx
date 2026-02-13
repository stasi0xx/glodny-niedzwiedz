import React from 'react';
import { Container } from '@/components/ui/Container';
import { faq } from '@/data/faq';

export default function FAQPage() {
    return (
        <div className="py-12 bg-gray-50 min-h-screen">
            <Container>
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Często zadawane pytania</h1>
                    <p className="text-gray-600">Wszystko, co musisz wiedzieć przed zamówieniem.</p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faq.map((item, index) => (
                        <details key={index} className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
                                <h2 className="text-lg font-medium">
                                    {item.question}
                                </h2>
                                <span className="relative size-5 shrink-0">
                                    <svg className="absolute inset-0 size-5 opacity-100 group-open:opacity-0 transition-opacity" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <svg className="absolute inset-0 size-5 opacity-0 group-open:opacity-100 transition-opacity" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </span>
                            </summary>

                            <p className="mt-4 leading-relaxed text-gray-700 animate-in fade-in slide-in-from-top-2">
                                {item.answer}
                            </p>
                        </details>
                    ))}
                </div>
            </Container>
        </div>
    );
}
