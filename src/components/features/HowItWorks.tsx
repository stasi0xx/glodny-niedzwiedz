import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

export const HowItWorks = () => {
    const t = useTranslation();

    return (
        <section className="bg-white relative" id="how-it-works">
            <div className="max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

                {/* Left Side: Sticky Text Area */}
                <div className="hidden lg:block">
                    <div className="sticky top-0 h-screen flex flex-col justify-center px-12">
                        <div className="space-y-8 relative z-10">
                            <h2 className="text-6xl md:text-8xl font-bold font-display tracking-tighter text-[#111111] leading-[0.9]">
                                {t.howItWorks.title1} <br />
                                <span className="italic font-serif font-light text-[#111111] opacity-90">{t.howItWorks.title2}</span> <br />
                                {t.howItWorks.title3}
                            </h2>
                            <p className="text-xl md:text-2xl font-light text-gray-800/90 max-w-lg leading-relaxed text-balance">
                                {t.howItWorks.subtitle} <br />
                                <span className="font-semibold text-black">{t.howItWorks.subtitleBold}</span>
                            </p>
                            <p className="text-gray-500 text-lg">
                                {t.howItWorks.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Mobile Title (visible only on smaller screens) */}
                <div className="lg:hidden px-4 pt-16">
                    <h2 className="text-5xl font-bold font-display tracking-tighter text-[#111111] leading-[0.9] mb-4">
                        {t.howItWorks.title1} <span className="italic font-serif font-light opacity-90">{t.howItWorks.title2}</span> {t.howItWorks.title3}
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                        {t.howItWorks.subtitle} {t.howItWorks.subtitleBold}
                    </p>
                </div>

                {/* Right Side: Scrollable Stacking Cards */}
                <div className="flex flex-col px-4 lg:px-12 pb-24 lg:pb-48 pt-12 lg:pt-0">

                    {/* Card 1 */}
                    <div className="sticky top-[20vh] mb-[40vh] min-h-[450px] bg-[#FF9A9E] rounded-[3rem] p-10 flex flex-col justify-between shadow-2xl shadow-pink-500/20 transition-transform duration-500 hover:scale-[1.02] border border-black/5 z-10">
                        <div className="flex justify-between items-start">
                            <span className="text-7xl font-bold font-display text-white/90">01.</span>
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-3xl">👇</div>
                        </div>
                        <div className="mt-8">
                            <h3 className="text-5xl font-bold font-display text-white mb-4">{t.howItWorks.steps[1].title}</h3>
                            <p className="text-white/90 text-xl font-medium max-w-sm leading-relaxed">
                                {t.howItWorks.steps[1].desc}
                            </p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="sticky top-[25vh] mb-[33vh] min-h-[450px] bg-[#A18CD1] rounded-[3rem] p-10 flex flex-col justify-between shadow-2xl shadow-purple-500/20 transition-transform duration-500 hover:scale-[1.02] border border-black/5 z-20">
                        <div className="flex justify-between items-start">
                            <span className="text-7xl font-bold font-display text-white/90">02.</span>
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-3xl">👨‍🍳</div>
                        </div>
                        <div className="mt-8">
                            <h3 className="text-5xl font-bold font-display text-white mb-4">{t.howItWorks.steps[2].title}</h3>
                            <p className="text-white/90 text-xl font-medium max-w-sm leading-relaxed">
                                {t.howItWorks.steps[2].desc}
                            </p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="sticky top-[20vh] mb-[20vh] min-h-[450px] bg-[#8FD3F4] rounded-[3rem] p-10 flex flex-col justify-between shadow-2xl shadow-sky-500/20 transition-transform duration-500 hover:scale-[1.02] border border-black/5 z-30">
                        <div className="flex justify-between items-start">
                            <span className="text-7xl font-bold font-display text-black/80">03.</span>
                            <div className="w-16 h-16 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-3xl">🚀</div>
                        </div>
                        <div className="mt-8">
                            <h3 className="text-5xl font-bold font-display text-black mb-4">{t.howItWorks.steps[3].title}</h3>
                            <p className="text-black/70 text-xl font-medium max-w-sm leading-relaxed">
                                {t.howItWorks.steps[3].desc}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
