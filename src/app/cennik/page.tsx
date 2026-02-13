import React from 'react';
import { Container } from '@/components/ui/Container';
import { pricing } from '@/data/pricing';
import { diets } from '@/data/diets';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function PricingPage() {
    return (
        <div className="py-12 bg-white min-h-screen">
            <Container>
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold mb-4">Cennik</h1>
                    <p className="text-gray-600">Jasne zasady. Im dłużej z nami jesteś, tym mniej płacisz.</p>
                </div>

                {/* Promotions */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 text-white shadow-lg transform hover:-translate-y-1 transition-transform">
                        <div className="text-sm font-bold opacity-80 uppercase tracking-wide mb-2">Promocja na start</div>
                        <h2 className="text-3xl font-bold mb-4">-20% na pierwsze zamówienie</h2>
                        <p className="mb-6 opacity-90">Zamów dowolną dietę na minimum 10 dni i użyj kodu w koszyku. (Rabat nalicza się automatycznie dla nowych klientów).</p>
                        <div className="bg-white/20 inline-block px-4 py-2 rounded-lg font-mono font-bold text-lg border border-white/30">
                            KOD: START20
                        </div>
                    </div>
                    <div className="bg-gray-900 rounded-2xl p-8 text-white shadow-lg transform hover:-translate-y-1 transition-transform">
                        <div className="text-sm font-bold opacity-80 uppercase tracking-wide mb-2">Lojalność</div>
                        <h2 className="text-3xl font-bold mb-4">Skarbonka Niedźwiedzia</h2>
                        <p className="mb-6 opacity-90">Za każde zamówienie otrzymujesz 5% wartości w punktach, które możesz wykorzystać na kolejne diety.</p>
                        <Link href="/oferta">
                            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">Sprawdź ofertę</Button>
                        </Link>
                    </div>
                </div>

                {/* Pricing Table (Mock) */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="py-4 px-6 font-bold text-gray-900">Dieta</th>
                                <th className="py-4 px-6 font-bold text-gray-500">od 10 dni</th>
                                <th className="py-4 px-6 font-bold text-gray-500">od 20 dni</th>
                                <th className="py-4 px-6 font-bold text-emerald-600">od 30 dni (Best)</th>
                                <th className="py-4 px-6"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {diets.map(diet => (
                                <tr key={diet.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6">
                                        <span className="font-bold text-gray-900 block">{diet.name}</span>
                                        <span className="text-xs text-gray-500">{Math.min(...diet.kcalOptions)}-{Math.max(...diet.kcalOptions)} kcal</span>
                                    </td>
                                    <td className="py-4 px-6 text-gray-600">{diet.priceFrom + 2} zł</td>
                                    <td className="py-4 px-6 text-gray-600">{diet.priceFrom} zł</td>
                                    <td className="py-4 px-6 font-bold text-emerald-600">{diet.priceFrom - 2} zł</td>
                                    <td className="py-4 px-6 text-right">
                                        <Link href={`/diety/${diet.slug}`}>
                                            <Button size="sm" variant="ghost">Szczegóły</Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <p className="text-xs text-center text-gray-400 mt-8">
                    * Ceny dotyczą wariantu podstawowego (najniższa kaloryczność). Ceny zawierają VAT i dostawę.
                </p>

            </Container>
        </div>
    );
}
