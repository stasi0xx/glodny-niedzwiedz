import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { diets } from '@/data/diets';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { DietConfigurator } from '@/components/features/DietConfigurator';
import { DietReviews } from '@/components/features/DietReviews';
// DietMacros is now part of DietTimeline
import { DietSampleMenu } from '@/components/features/DietSampleMenu';
import { OfferFAQ } from '@/components/features/OfferFAQ';
import { DietStickyBottomBar } from '@/components/features/DietStickyBottomBar';
import { DietTimeline } from '@/components/features/DietTimeline';

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
            {/* Hero Section - Redesigned to match main page & inspiration */}
            <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#FAFAFA]">
                {/* Background Blobs (matching main page style) */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-gradient-to-br from-[#FF9A9E] to-[#FECFEF] opacity-20 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-gradient-to-tr from-[#A18CD1] to-[#FBC2EB] opacity-20 blur-[100px] rounded-full pointer-events-none" />

                {/* Subtle Grain Texture if available globally, otherwise just clean */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("/noise.png")' }}></div>

                <Container className="relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                        {/* Left Column: Image (Inspired by screenshot) */}
                        <div className="relative order-2 lg:order-1">
                            {/* Decorative organic shape behind image */}
                            <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] text-emerald-50/80 -z-10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                <path fill="currentColor" d="M42.7,-72.2C56.2,-65.8,68.6,-57.5,77.7,-46.6C86.8,-35.8,92.6,-22.3,91.3,-9.1C90,4.1,81.6,17.1,72.9,28.8C64.2,40.5,55.1,51,44.2,59.3C33.3,67.6,20.6,73.7,7.2,74.9C-6.2,76.1,-20.3,72.4,-32.8,65.6C-45.3,58.8,-56.2,48.9,-65.3,37.3C-74.4,25.7,-81.7,12.4,-80.7,0.6C-79.7,-11.2,-70.4,-21.5,-60.7,-30.9C-51,-40.3,-40.9,-48.8,-29.8,-56.3C-18.7,-63.8,-6.6,-70.3,3.9,-76.8C14.4,-83.3,29.3,-89.8,42.7,-72.2Z" transform="translate(100 100)" />
                            </svg>

                            <div className="relative z-10 p-4">
                                {/* Price Badge */}
                                <div className="absolute -top-4 -right-4 lg:-right-8 lg:-top-8 bg-[#FF4F6E] text-white rounded-full w-28 h-28 lg:w-36 lg:h-36 flex flex-col items-center justify-center shadow-xl rotate-12 z-20 border-[6px] border-white animate-float" style={{ animationDuration: '5s' }}>
                                    <span className="text-[10px] lg:text-xs font-bold uppercase tracking-wide opacity-90">Już od</span>
                                    <span className="text-2xl lg:text-3xl font-bold">{diet.priceFrom} zł</span>
                                    <span className="text-[10px] lg:text-xs opacity-90">za dzień</span>
                                </div>

                                {/* Placeholder Image if diet.image is distinct, else use a nice wrapper */}
                                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-emerald-900/10 rotate-[-2deg] hover:rotate-0 transition-transform duration-500 bg-white p-2">
                                    <div className="rounded-[2rem] overflow-hidden aspect-[4/3] bg-gray-100 relative">
                                        {/* Use img tag directly or Next Image if configured. Using img for safety with external/mock data */}
                                        <img
                                            src={diet.image}
                                            alt={diet.name}
                                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                                        />
                                        {/* Fallback pattern if image fails (simulated) */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 -z-10 flex items-center justify-center text-gray-300 font-bold text-4xl">
                                            {diet.name}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Text Content */}
                        <div className="order-1 lg:order-2 space-y-8 text-center lg:text-left">
                            <Link href="/oferta" className="inline-flex items-center text-gray-500 text-sm font-bold hover:text-black mb-2 transition-colors group">
                                <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span> Wróć do oferty
                            </Link>

                            <div>
                                <h1 className="text-5xl lg:text-7xl font-bold font-display tracking-tight text-[#111111] leading-[0.9] mb-4">
                                    {diet.name}
                                </h1>
                                <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
                                    {diet.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-emerald-100/50 text-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider border border-emerald-100">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                                    {diet.description}
                                </p>
                            </div>

                            {/* Macros Divider - Organic Shapes */}
                            <div className="grid grid-cols-3 gap-2 sm:gap-6 py-8">
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-blue-100/60 rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] blur-sm group-hover:blur-md transition-all duration-500 rotate-12 scale-90"></div>
                                    <div className="relative z-10 text-center p-3">
                                        <p className="text-[10px] uppercase tracking-widest text-blue-800/60 font-bold mb-1">Białko</p>
                                        <p className="font-display font-bold text-gray-900 text-xl sm:text-2xl">{diet.macros.protein.min}-{diet.macros.protein.max}%</p>
                                    </div>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-yellow-100/60 rounded-[50%_50%_30%_70%_/_50%_50%_70%_30%] blur-sm group-hover:blur-md transition-all duration-500 -rotate-6 scale-90"></div>
                                    <div className="relative z-10 text-center p-3">
                                        <p className="text-[10px] uppercase tracking-widest text-yellow-800/60 font-bold mb-1">Tłuszcze</p>
                                        <p className="font-display font-bold text-gray-900 text-xl sm:text-2xl">{diet.macros.fat.min}-{diet.macros.fat.max}%</p>
                                    </div>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-pink-100/60 rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] blur-sm group-hover:blur-md transition-all duration-500 rotate-45 scale-90"></div>
                                    <div className="relative z-10 text-center p-3">
                                        <p className="text-[10px] uppercase tracking-widest text-pink-800/60 font-bold mb-1">Węglowodany</p>
                                        <p className="font-display font-bold text-gray-900 text-xl sm:text-2xl">{diet.macros.carbs.min}-{diet.macros.carbs.max}%</p>
                                    </div>
                                </div>
                            </div>

                            {/* Calories Options - Nicer Presentation */}
                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-2 mb-2 justify-center lg:justify-start">

                                    <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">Dostępne kaloryczności</p>
                                </div>
                                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                                    {diet.kcalOptions.map(k => (
                                        <div key={k} className="group relative cursor-default">
                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-300 to-purple-300 rounded-xl opacity-20 group-hover:opacity-100 blur transition duration-200"></div>
                                            <div className="relative px-5 py-3 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center gap-2 group-hover:-translate-y-1 transition-transform">
                                                <span className="font-bold text-gray-800 text-lg">{k}</span>
                                                <span className="text-[10px] text-gray-400 font-medium uppercase mt-1">kcal</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Link href={`/zamowienie?diet=${diet.slug}`} className="flex-1 sm:flex-none">
                                    <Button className="w-full sm:w-auto bg-[#FF4F6E] hover:bg-[#ff3355] text-white px-8 py-6 rounded-full text-lg shadow-lg shadow-pink-500/30 transition-transform hover:scale-105 active:scale-95">
                                        Zamów dietę →
                                    </Button>
                                </Link>
                                <a href="#menu" className="flex-1 sm:flex-none">
                                    <Button variant="outline" className="w-full sm:w-auto border-2 border-gray-200 text-gray-900 px-8 py-6 rounded-full text-lg hover:border-black hover:bg-transparent transition-colors">
                                        Zobacz menu
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            <Container className="relative z-20 -mt-12 lg:mt-0">
                <div className="grid lg:grid-cols-[1fr,380px] gap-12 items-start">

                    {/* Left Column: Content */}
                    <div className="space-y-16 min-w-0">

                        {/* Sample Menu - Moved Here */}
                        <div className="mb-0">
                            <DietSampleMenu menu={diet.sampleMenu} dietName={diet.name} />
                        </div>

                        {/* Intro & Target Audience - Modernist Redesign */}
                        <section className="bg-white py-8">

                            {/* Creative Title Area */}
                            <div className="mb-16 relative">
                                <span className="absolute -top-6 -left-6 text-9xl text-gray-50 opacity-50 font-display font-bold select-none -z-10">O</span>
                                <h2 className="text-5xl md:text-6xl font-display font-bold text-gray-900 leading-[0.9] tracking-tight">
                                    O diecie <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">{diet.name}</span>
                                </h2>
                                <div className="h-1.5 w-24 bg-black mt-6 mb-8"></div>
                                <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-3xl">
                                    {diet.extendedDescription || diet.description}
                                </p>
                            </div>

                            {/* Split Layout with Divider Line */}
                            <div className="relative grid md:grid-cols-2 gap-12 md:gap-24">
                                {/* Vertical Divider (Desktop) */}
                                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -ml-px"></div>

                                {/* Pros / For Whom */}
                                <div className="space-y-8">
                                    <div className="inline-block relative">
                                        <div className="absolute inset-0 bg-emerald-100 transform -skew-x-12 -z-10"></div>
                                        <h3 className="text-3xl font-bold text-gray-900 px-2">Dla kogo?</h3>
                                    </div>

                                    <ul className="space-y-6">
                                        {diet.targetAudience?.map((item, i) => (
                                            <li key={i} className="group flex items-start gap-5">
                                                <span className="flex items-center justify-center w-8 h-8 rounded-full border border-emerald-500/30 text-emerald-600 text-sm font-bold group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shrink-0">
                                                    {i + 1}
                                                </span>
                                                <span className="text-lg text-gray-700 font-medium leading-relaxed group-hover:text-gray-900 transition-colors">
                                                    {item}
                                                </span>
                                            </li>
                                        )) || <li className="text-gray-400">Brak danych</li>}
                                    </ul>
                                </div>

                                {/* Cons / Not For Whom */}
                                <div className="space-y-8">
                                    <div className="inline-block relative">
                                        <div className="absolute inset-0 bg-red-100 transform -skew-x-12 -z-10"></div>
                                        <h3 className="text-3xl font-bold text-gray-900 px-2">Nie dla Ciebie</h3>
                                    </div>

                                    <ul className="space-y-6">
                                        {diet.notFor?.map((item, i) => (
                                            <li key={i} className="group flex items-start gap-5">
                                                <span className="flex items-center justify-center w-8 h-8 rounded-full border border-red-400/30 text-red-500 text-sm font-bold group-hover:bg-red-500 group-hover:text-white transition-all duration-300 shrink-0">
                                                    ✕
                                                </span>
                                                <span className="text-lg text-gray-700 font-medium leading-relaxed group-hover:text-gray-900 transition-colors">
                                                    {item}
                                                </span>
                                            </li>
                                        )) || <li className="text-gray-400">Brak danych</li>}
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Timeline: Highlights, Macros, Delivery */}
                        <DietTimeline diet={diet} />

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

            {/* Sticky Bottom Bar for user action on scroll */}
            <DietStickyBottomBar name={diet.name} priceFrom={diet.priceFrom} slug={diet.slug} />
        </div>
    );
}
