'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LanguageSwitcher } from '@/components/features/LanguageSwitcher';
import { useTranslation } from '@/hooks/useTranslation';

export const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const t = useTranslation();

    const navLinks = [
        { label: t.header.nav.offer, href: '/oferta' },
        { label: t.header.nav.menu, href: '/menu' },
        { label: t.header.nav.pricing, href: '/cennik' },
        { label: t.header.nav.faq, href: '/faq' },
        { label: t.header.nav.blog, href: '/blog' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="sticky top-0 z-50 w-full">
            {/* Top Bar */}
            <div className="bg-gradient-to-r from-[#1a1025] via-[#15132b] to-[#0f1a2e] py-1.5 text-center text-[11px] font-medium text-white/90 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-6 flex-wrap">
                    <span className="flex items-center gap-1.5">
                        <span>🚚</span> {t.header.delivery}
                    </span>
                    <span className="hidden sm:inline-flex items-center gap-1.5">
                        <span className="w-[3px] h-[3px] rounded-full bg-white/30"></span>
                    </span>
                    <span className="hidden sm:flex items-center gap-1.5">
                        <span>🥬</span> {t.header.localProducts}
                    </span>
                    <span className="hidden sm:inline-flex items-center gap-1.5">
                        <span className="w-[3px] h-[3px] rounded-full bg-white/30"></span>
                    </span>
                    <span className="flex items-center gap-1.5">
                        <span>⭐</span> {t.header.reviews}
                    </span>
                    <span className="hidden sm:inline-flex items-center gap-1.5">
                        <span className="w-[3px] h-[3px] rounded-full bg-white/30"></span>
                    </span>
                </div>
            </div>

            {/* Main Nav */}
            <div className={`transition-all duration-300 ${isScrolled
                ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-black/[0.03] border-b border-black/[0.04]'
                : 'bg-white/60 backdrop-blur-md border-b border-transparent'
                }`}
            >
                <div className="max-w-[1600px] mx-auto px-4 lg:px-12 flex h-16 items-center justify-between">
                    {/* Logo – full text on desktop, icon on mobile */}
                    <Link href="/" className="flex items-center gap-2 group">
                        {/* Mobile icon */}
                        <span className="md:hidden text-2xl" aria-label="Głodny Niedźwiedź">🐻</span>
                        {/* Desktop full name */}
                        <span className="hidden md:inline text-2xl font-display font-bold tracking-tight text-[#111]">
                            Głodny<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">Niedźwiedź</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="relative px-4 py-2 text-sm font-medium text-gray-500 hover:text-black rounded-full hover:bg-black/[0.04] transition-all duration-200"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right side – desktop */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* Language Switcher */}
                        <LanguageSwitcher />

                        <Link href="/dowoz">
                            <button className="text-sm font-semibold text-gray-500 hover:text-black px-4 py-2 rounded-full hover:bg-black/[0.04] transition-all duration-200">
                                {t.header.checkDelivery}
                            </button>
                        </Link>
                        <Link href="/dobierz-diete">
                            <button className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-gray-800 transition-all hover:scale-[1.03] active:scale-[0.97] shadow-md shadow-black/10 flex items-center gap-2 group">
                                {t.header.chooseDiet}
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </button>
                        </Link>
                        <Link href="/koszyk" className="relative p-2.5 text-gray-400 hover:text-black hover:bg-black/[0.04] rounded-full transition-all duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                        </Link>
                    </div>

                    {/* Right side – mobile: CTA + hamburger */}
                    <div className="md:hidden flex items-center gap-2">
                        {/* Language Switcher Mobile */}
                        <div className="scale-90">
                            <LanguageSwitcher />
                        </div>

                        <Link href="/dowoz">
                            <button className="text-xs font-bold text-black border border-black/10 px-4 py-2 rounded-full hover:bg-black/[0.04] transition-all">
                                {t.header.checkDelivery}
                            </button>
                        </Link>
                        <button
                            className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/[0.04] transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <div className="w-5 flex flex-col gap-[5px]">
                                <span className={`block h-[1.5px] bg-black rounded-full transition-all duration-300 origin-center ${isMenuOpen ? 'rotate-45 translate-y-[3.25px]' : ''}`}></span>
                                <span className={`block h-[1.5px] bg-black rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100'}`}></span>
                                <span className={`block h-[1.5px] bg-black rounded-full transition-all duration-300 origin-center ${isMenuOpen ? '-rotate-45 -translate-y-[3.25px]' : ''}`}></span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="bg-white/95 backdrop-blur-xl border-b border-black/5 shadow-xl shadow-black/5 px-6 py-6">
                    <nav className="flex flex-col gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-base font-medium text-gray-700 hover:text-black hover:bg-black/[0.03] px-4 py-3 rounded-2xl transition-all"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/koszyk"
                            className="text-base font-medium text-gray-700 hover:text-black hover:bg-black/[0.03] px-4 py-3 rounded-2xl transition-all"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {t.header.cart}
                        </Link>

                        <div className="h-[1px] bg-black/5 my-3"></div>

                        <div className="flex flex-col gap-3 mt-1">
                            <Link href="/dowoz" onClick={() => setIsMenuOpen(false)}>
                                <button className="w-full py-3.5 rounded-full border border-black/10 text-sm font-bold text-black hover:bg-black/[0.03] transition-all">
                                    {t.header.checkDelivery}
                                </button>
                            </Link>
                            <Link href="/dobierz-diete" onClick={() => setIsMenuOpen(false)}>
                                <button className="w-full py-3.5 rounded-full bg-black text-white text-sm font-bold hover:bg-gray-800 transition-all shadow-md shadow-black/10 flex items-center justify-center gap-2">
                                    {t.header.chooseDiet}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                </button>
                            </Link>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};
