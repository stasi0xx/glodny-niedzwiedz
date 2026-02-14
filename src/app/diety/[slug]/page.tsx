import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { diets } from '@/data/diets';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { DietConfigurator } from '@/components/features/DietConfigurator';
import { DietReviews } from '@/components/features/DietReviews';
import { DietMacros } from '@/components/features/DietMacros';
import { DietSampleMenu } from '@/components/features/DietSampleMenu';
import { OfferFAQ } from '@/components/features/OfferFAQ';

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
        <div className="bg-white min-h-screen pb-20 font-sans">
            {/* Hero Section */}
            <div className="relative bg-gray-900 pt-24 pb-32 text-white overflow-hidden">
                {/* Background Pattern/Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900/40 z-0"></div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-no-repeat bg-right-top opacity-10" style={{ backgroundImage: `url(${diet.image})`, backgroundSize: 'cover' }}></div>

                <Container className="relative z-10">
                    <div className="max-w-4xl">
                        <Link href="/oferta" className="inline-flex items-center text-emerald-400 text-sm font-bold hover:text-emerald-300 mb-6 transition-colors">
                            <span className="mr-2">←</span> Wróć do oferty
                        </Link>

                        <div className="flex flex-wrap gap-3 mb-6">
                            {diet.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-xs font-bold tracking-wide uppercase text-emerald-300">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
                            {diet.name}
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl mb-8">
                            {diet.description}
                        </p>

                        <div className="flex flex-wrap gap-8 text-sm font-medium text-gray-400">
                            <div className="flex items-center gap-2">
                                <span className="p-1.5 bg-white/5 rounded-md">🔥</span>
                                {Math.min(...diet.kcalOptions)}-{Math.max(...diet.kcalOptions)} kcal
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="p-1.5 bg-white/5 rounded-md">🍽️</span>
                                {(diet.mealsOptions || [3, 5]).join('/')} posiłków
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="p-1.5 bg-white/5 rounded-md">💰</span>
                                od {diet.priceFrom} zł / dzień
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            <Container className="transform -translate-y-12 relative z-20">
                <div className="grid lg:grid-cols-[1fr,380px] gap-12 items-start">

                    {/* Left Column: Content */}
                    <div className="space-y-16">

                        {/* Intro & Target Audience */}
                        <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold mb-6 text-gray-900">O diecie {diet.name}</h2>
                            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                                {diet.extendedDescription || diet.description}
                            </p>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <span className="text-emerald-500">✅</span> Dla kogo?
                                    </h3>
                                    <ul className="space-y-3">
                                        {diet.targetAudience?.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                                                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0"></span>
                                                {item}
                                            </li>
                                        )) || <li className="text-gray-400 text-sm">Brak danych</li>}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <span className="text-red-400">❌</span> Nie dla ciebie, jeśli...
                                    </h3>
                                    <ul className="space-y-3">
                                        {diet.notFor?.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                                                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-red-300 flex-shrink-0"></span>
                                                {item}
                                            </li>
                                        )) || <li className="text-gray-400 text-sm">Brak danych</li>}
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* USP / Highlights */}
                        <section>
                            <h2 className="text-2xl font-bold mb-8 text-gray-900">Dlaczego warto wybrać ten wariant?</h2>
                            <div className="grid sm:grid-cols-3 gap-6">
                                {diet.highlights.map((h, i) => (
                                    <div key={i} className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100/50 hover:bg-emerald-50 transition-colors">
                                        <div className="text-3xl mb-4">✨</div>
                                        <h3 className="font-bold text-gray-900 mb-2">{h}</h3>
                                        <p className="text-sm text-gray-500">
                                            Krótki opis benefitu, który reinforces why this is a good choice.
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Macros & Menu */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <DietMacros macros={diet.macros} />

                            {/* Allergens & Details */}
                            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                                        <span className="p-2 bg-red-50 text-red-500 rounded-lg text-lg">⚠️</span>
                                        Alergeny i wykluczenia
                                    </h3>
                                    <div className="space-y-6">
                                        <div>
                                            <p className="text-sm font-bold text-gray-700 mb-2">Zawiera:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {diet.allergens.map(a => (
                                                    <span key={a} className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium capitalize">
                                                        {a}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        {diet.detailedExclusions && diet.detailedExclusions.length > 0 && (
                                            <div>
                                                <p className="text-sm font-bold text-gray-700 mb-2">Wyklucza:</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {diet.detailedExclusions.map(a => (
                                                        <span key={a} className="px-2.5 py-1 bg-red-50 text-red-600 rounded-md text-xs font-medium border border-red-100">
                                                            {a}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl text-xs text-gray-500 leading-relaxed">
                                            <strong>Uwaga:</strong> Nasz zakład przetwarza gluten, orzechy, seler i inne jaja. Produkt może zawierać śladowe ilości tych alergenów.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sample Menu */}
                        <div className="space-y-6">
                            <DietSampleMenu menu={diet.sampleMenu} />
                        </div>

                        {/* Delivery & Logistics */}
                        <section className="bg-blue-50/50 rounded-3xl p-8 border border-blue-100/50">
                            <h2 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-3">
                                <span className="bg-blue-100 p-2 rounded-lg text-blue-600">🚚</span>
                                Dostawa i zmiany
                            </h2>
                            <div className="grid sm:grid-cols-3 gap-8">
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-2 text-sm">Godziny dostaw</h4>
                                    <p className="text-sm text-gray-600">Dostarczamy codziennie w nocy i nad ranem (2:00 – 7:00), aby dieta czekała pod drzwiami.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-2 text-sm">Zmiany w diecie</h4>
                                    <p className="text-sm text-gray-600">Edycja zamówienia, zmiana adresu lub pauza możliwa do godz. 10:00 dwa dni przed dostawą.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-2 text-sm">Strefa dostaw</h4>
                                    <p className="text-sm text-gray-600">Dozowimy do ponad 2000 miejscowości w całej Polsce. Sprawdź kod pocztowy w koszyku.</p>
                                </div>
                            </div>
                        </section>

                        {/* Reviews */}
                        <DietReviews reviews={diet.reviews} />

                        {/* FAQ */}
                        <div className="pt-8 border-t border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Najczęściej zadawane pytania</h2>
                            <OfferFAQ />
                        </div>

                    </div>

                    {/* Right Column: Sticky Configurator */}
                    <div className="hidden lg:block">
                        <DietConfigurator diet={diet} />

                        {/* Trust Badges under sticky box */}
                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                <span className="text-2xl">🥬</span>
                                <span className="text-xs font-bold text-gray-600">Świeże składniki</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                <span className="text-2xl">👩‍🍳</span>
                                <span className="text-xs font-bold text-gray-600">Szef kuchni</span>
                            </div>
                        </div>
                    </div>

                </div>
            </Container>

            {/* Mobile Bottom Bar for action */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-50">
                <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
                    <div>
                        <p className="text-xs text-gray-500">Cena od</p>
                        <p className="text-xl font-bold text-emerald-600">{diet.priceFrom} zł <span className="text-xs text-gray-400 font-normal">/dzień</span></p>
                    </div>
                    <Link href={`/koszyk?diet=${diet.slug}`} className="flex-1">
                        <Button className="w-full shadow-lg shadow-emerald-500/20">Wybierz</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
