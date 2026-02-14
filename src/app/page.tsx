'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { DeliveryChecker } from '@/components/features/DeliveryChecker';
import { HowItWorks } from '@/components/features/HowItWorks';
import { DietSelectionCTA } from '@/components/features/DietSelectionCTA';
import { SampleMenu } from '@/components/features/SampleMenu';
import { WhyUs } from '@/components/features/WhyUs';
import { Testimonials } from '@/components/features/Testimonials';
import { CtaBanner } from '@/components/features/CtaBanner';
import { useTranslation } from '@/hooks/useTranslation';

export default function Home() {
  const t = useTranslation();

  return (
    <div className="flex flex-col min-h-screen font-sans selection:bg-pink-200">

      {/* Hero Section - Utilizing Global Grainy Background */}
      <section className="relative pt-32 pb-40 lg:pt-48 lg:pb-56 overflow-hidden">
        {/* Subtle Extra Gradient Blobs for Hero Focus */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Keep these but very subtle, to highlight the hero area specifically */}
          <div className="absolute -top-[10%] -right-[5%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#FF9A9E] to-[#FECFEF] opacity-40 blur-[100px] mix-blend-multiply animate-pulse" style={{ animationDuration: '8s' }}></div>
          <div className="absolute top-[5%] -left-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#A18CD1] to-[#FBC2EB] opacity-30 blur-[90px] mix-blend-multiply animate-pulse" style={{ animationDuration: '10s' }}></div>
        </div>

        <Container className="relative z-10 text-center lg:text-left">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Typography Content */}
            <div className="space-y-8">
              <span className="inline-block py-1.5 px-4 rounded-full border border-black/5 bg-white/40 backdrop-blur-md text-xs font-bold tracking-widest uppercase text-gray-900 mb-2 shadow-sm">
                {t.hero.badge}
              </span>

              <h1 className="text-6xl md:text-8xl font-bold font-display tracking-tighter text-[#111111] leading-[0.9] text-balance drop-shadow-sm">
                {t.hero.title1} <br />
                <span className="italic font-serif font-light text-[#111111] opacity-90">{t.hero.title2}</span> <br />
                {t.hero.title3}
              </h1>

              <p className="text-xl md:text-2xl font-light text-gray-800/90 max-w-lg leading-relaxed text-balance">
                {t.hero.subtitle} <span className="font-medium text-black">{t.hero.subtitleBold}</span>
              </p>

              <div className="pt-8 flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start">
                <Link href="/dobierz-diete">
                  <button className="bg-black text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-gray-800 transition-transform hover:scale-105 active:scale-95 shadow-2xl shadow-black/20 flex items-center gap-3 group">
                    {t.hero.ctaMatch}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </button>
                </Link>

                <Link href="/oferta" className="group flex items-center gap-2 text-black font-semibold text-lg hover:underline underline-offset-4 decoration-2">
                  <span>{t.hero.ctaMenu}</span>
                </Link>
              </div>

              {/* Decorative Arrow/Line */}
              <div className="hidden lg:block absolute left-0 bottom-10 w-64 h-[1px] bg-black/10 origin-left">
                <div className="absolute right-0 -top-[5px] rotate-45 w-2 h-2 border-t border-r border-black/20"></div>
              </div>
            </div>

            {/* Visual Element / Delivery Checker as Glass Card */}
            <div className="relative perspective-distant">
              <div className="relative z-10 glass-card-strong rounded-[40px] p-2 shadow-2xl shadow-pink-500/10 rotate-1 hover:rotate-0 transition-all duration-500">
                <div className="bg-white/80 backdrop-blur-xl rounded-[32px] overflow-hidden p-8 border border-white/60">
                  <div className="flex justify-between items-center mb-8">
                    <span className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-xl">01.</span>
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">{t.hero.locationLabel}</p>
                      <p className="font-bold text-lg text-gray-900">{t.hero.locationValue}</p>
                    </div>
                  </div>
                  <DeliveryChecker />
                </div>
              </div>

              {/* Floating aesthetic elements */}
              <div className="absolute top-1/2 -right-8 -translate-y-1/2 bg-black text-white p-6 rounded-[2rem] shadow-xl rotate-6 animate-float z-20" style={{ animationDuration: '6s' }}>
                <p className="font-display font-bold text-3xl">4.9</p>
                <div className="flex text-yellow-400 text-sm">★★★★★</div>
                <p className="text-xs text-gray-400 mt-1">{t.hero.trustpilot}</p>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* Marquee / Brands / Trust Section */}
      <section className="py-8 bg-black overflow-hidden border-y border-white/10">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {/* First Copy */}
          <div className="flex items-center gap-12 px-6 font-display text-4xl font-bold uppercase text-white tracking-widest">
            <span>{t.marquee.freshness}</span> <span className="text-emerald-500">•</span>
            <span>{t.marquee.eco}</span> <span className="text-emerald-500">•</span>
            <span>{t.marquee.taste}</span> <span className="text-emerald-500">•</span>
            <span>{t.marquee.health}</span> <span className="text-emerald-500">•</span>
            <span>{t.marquee.comfort}</span> <span className="text-emerald-500">•</span>
          </div>
          {/* Duplicate Copy for infinite loop */}
          <div className="flex items-center gap-12 px-6 font-display text-4xl font-bold uppercase text-white tracking-widest">
            <span>{t.marquee.freshness}</span> <span className="text-emerald-500">•</span>
            <span>{t.marquee.eco}</span> <span className="text-emerald-500">•</span>
            <span>{t.marquee.taste}</span> <span className="text-emerald-500">•</span>
            <span>{t.marquee.health}</span> <span className="text-emerald-500">•</span>
            <span>{t.marquee.comfort}</span> <span className="text-emerald-500">•</span>
          </div>
          {/* Third Copy for buffer on wide screens */}
          <div className="flex items-center gap-12 px-6 font-display text-4xl font-bold uppercase text-white tracking-widest">
            <span>{t.marquee.freshness}</span> <span className="text-emerald-500">•</span>
            <span>{t.marquee.eco}</span> <span className="text-emerald-500">•</span>
            <span>{t.marquee.taste}</span> <span className="text-emerald-500">•</span>
            <span>{t.marquee.health}</span> <span className="text-emerald-500">•</span>
            <span>{t.marquee.comfort}</span> <span className="text-emerald-500">•</span>
          </div>
          {/* Fourth Copy for buffer on very wide screens */}
          <div className="flex items-center gap-12 px-6 font-display text-4xl font-bold uppercase text-white tracking-widest">
            <span>{t.marquee.freshness}</span> <span className="text-emerald-500">•</span>
            <span>{t.marquee.eco}</span> <span className="text-emerald-500">•</span>
            <span>{t.marquee.taste}</span> <span className="text-emerald-500">•</span>
            <span>{t.marquee.health}</span> <span className="text-emerald-500">•</span>
            <span>{t.marquee.comfort}</span> <span className="text-emerald-500">•</span>
          </div>
        </div>
      </section>

      {/* Quick Choice / Diet Types Section */}
      <section className="py-24 px-4 lg:px-12 bg-white relative">
        <div className="max-w-[1700px] mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-7xl font-bold font-display tracking-tighter text-black mb-6 leading-[0.9]">
                {t.quickChoice.title1} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5757] to-pink-500">{t.quickChoice.title2}</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-lg">{t.quickChoice.description}</p>
            </div>
            <Link href="/dobierz-diete">
              <button className="bg-black text-white px-8 py-4 rounded-full font-bold shadow-xl hover:bg-gray-800 transition-transform active:scale-95 flex items-center gap-3 text-lg group">
                {t.quickChoice.ctaQuiz}
                <span className="bg-white/20 group-hover:bg-white/30 rounded-full w-8 h-8 flex items-center justify-center text-sm transition-colors">?</span>
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card Items */}
            {[
              { id: '01', title: t.quickChoice.diets.reduction.title, subtitle: t.quickChoice.diets.reduction.subtitle, gradient: 'from-pink-100 to-pink-50', href: '/oferta?diet=redukcja', image: null },
              { id: '02', title: t.quickChoice.diets.sport.title, subtitle: t.quickChoice.diets.sport.subtitle, gradient: 'from-orange-100 to-orange-50', href: '/oferta?diet=sport', image: null },
              { id: '03', title: t.quickChoice.diets.wege.title, subtitle: t.quickChoice.diets.wege.subtitle, gradient: 'from-green-100 to-green-50', href: '/oferta?diet=wege', image: null },
              { id: '04', title: t.quickChoice.diets.lactoseFree.title, subtitle: t.quickChoice.diets.lactoseFree.subtitle, gradient: 'from-sky-100 to-sky-50', href: '/oferta?diet=bez-laktozy', image: null },
              { id: '05', title: t.quickChoice.diets.lowIg.title, subtitle: t.quickChoice.diets.lowIg.subtitle, gradient: 'from-purple-100 to-purple-50', href: '/oferta?diet=low-ig', image: null },
              { id: '06', title: t.quickChoice.diets.keto.title, subtitle: t.quickChoice.diets.keto.subtitle, gradient: 'from-yellow-100 to-yellow-50', href: '/oferta?diet=keto', image: null },
            ].map((item) => (
              <Link href={item.href} key={item.id} className="group relative bg-[#F8F8F8] rounded-[3rem] p-8 min-h-[500px] flex flex-col justify-between overflow-hidden hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 hover:bg-[#F2F2F2]">

                {/* Top Section */}
                <div className="relative z-10 flex justify-between items-start w-full mb-8">
                  <span className="font-display font-bold text-sm text-gray-400 tracking-widest">{item.id}</span>
                  <div className="w-14 h-14 rounded-full border border-black/5 bg-white flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300 shadow-sm">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-rotate-45 transition-transform duration-300"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                  </div>
                </div>

                {/* Image Placeholder Area */}
                <div className={`w-full aspect-square rounded-[2rem] bg-gradient-to-br ${item.gradient} mb-8 flex items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500`}>
                  {/* Placeholder for uploaded image */}
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-gray-400/50 font-display font-bold text-6xl opacity-50 select-none">IMG</div>
                  )}

                  {/* Decorative internal noise/grain for placeholder */}
                  <div className="absolute inset-0 opacity-20 bg-noise mix-blend-overlay"></div>
                </div>

                {/* Bottom Section */}
                <div className="relative z-10">
                  <h3 className="text-4xl font-bold font-display text-black mb-2 leading-none">{item.title}</h3>
                  <p className="text-gray-500 font-medium group-hover:text-black transition-colors">{item.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />


      {/* Quiz CTA Section */}
      <DietSelectionCTA />

      {/* Sample Menu Section */}
      <SampleMenu />

      {/* Why Us / USP Section */}
      <WhyUs />

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Banner Section */}
      <CtaBanner />


    </div>
  );
}
