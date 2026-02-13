import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { diets } from '@/data/diets';
import { menuMock } from '@/data/menuMock';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

// Fix: Params need to be awaited in Next.js 15+ (and 16 potentially) but depending on version types can vary.
// Safest for "latest" is to treat props as Promise or match exact type if known.
// But standard functional component usage often infers.
// Given Next 15+ changes, params is a Promise.

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return diets.map((diet) => ({
        slug: diet.slug,
    }));
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const diet = diets.find((d) => d.slug === slug);
    if (!diet) return { title: 'Dieta nie znaleziona' };
    return {
        title: `${diet.name} - Głodny Niedźwiedź`,
        description: diet.description,
    };
}

export default async function DietDetailsPage({ params }: PageProps) {
    const { slug } = await params;
    const diet = diets.find((d) => d.slug === slug);

    if (!diet) {
        notFound();
    }

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Hero Header */}
            <div className="bg-gray-900 py-16 text-white">
                <Container>
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-1">
                            <Link href="/oferta" className="text-emerald-400 text-sm hover:underline mb-4 block">← Wróć do oferty</Link>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">{diet.name}</h1>
                            <p className="text-xl text-gray-300 mb-6">{diet.description}</p>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {diet.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-sm backdrop-blur-sm border border-white/20">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="text-center md:text-right bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                            <p className="text-gray-400 mb-1">Cena już od</p>
                            <p className="text-4xl font-bold text-emerald-400 mb-4">{diet.priceFrom} zł <span className="text-lg text-gray-400 font-normal">/ dzień</span></p>
                            <Link href={`/koszyk?diet=${diet.slug}`}>
                                <Button size="lg" className="w-full shadow-lg shadow-emerald-500/20">Zamów teraz</Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>

            <Container className="py-12">
                <div className="grid md:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-12">

                        {/* Highlights */}
                        <section>
                            <h2 className="text-2xl font-bold mb-6">Dlaczego warto?</h2>
                            <div className="grid sm:grid-cols-3 gap-4">
                                {diet.highlights.map((h, i) => (
                                    <div key={i} className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-900 font-medium text-center">
                                        ✅ {h}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Sample Menu */}
                        <section>
                            <h2 className="text-2xl font-bold mb-6">Przykładowe menu (1 dzień)</h2>
                            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                {menuMock[0].meals.map((meal, i) => (
                                    <div key={i} className="flex items-center gap-4 py-3 border-b last:border-0 border-gray-200">
                                        <span className="text-sm font-bold text-gray-400 uppercase w-24">{meal.type}</span>
                                        <span className="font-medium text-gray-900">{meal.name}</span>
                                        <span className="ml-auto text-xs text-gray-500 bg-white px-2 py-1 rounded border">{meal.kcal} kcal</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Details */}
                        <section className="grid sm:grid-cols-2 gap-8">
                            <div>
                                <h3 className="font-bold mb-2 flex items-center gap-2">🔥 Dostępne warianty</h3>
                                <div className="flex flex-wrap gap-2">
                                    {diet.kcalOptions.map(kcal => (
                                        <span key={kcal} className="px-3 py-1 bg-gray-100 rounded-md text-gray-700">{kcal} kcal</span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold mb-2 flex items-center gap-2">🍽️ Posiłki</h3>
                                <div className="flex flex-wrap gap-2">
                                    {diet.mealsOptions.map(m => (
                                        <span key={m} className="px-3 py-1 bg-gray-100 rounded-md text-gray-700">{m} posiłków</span>
                                    ))}
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-8">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                            <h3 className="font-bold text-lg mb-4">Alergeny</h3>
                            <p className="text-gray-600 mb-4 text-sm">
                                W tej diecie mogą występować:
                            </p>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {diet.allergens.map(a => (
                                    <span key={a} className="text-xs px-2 py-1 bg-red-50 text-red-700 rounded border border-red-100 capitalize">
                                        {a}
                                    </span>
                                ))}
                            </div>
                            <div className="p-4 bg-blue-50 text-blue-800 text-sm rounded-lg">
                                ℹ️ Pamiętaj, że nasz zakład przetwarza gluten, orzechy i inne alergeny.
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
