'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

export const Footer: React.FC = () => {
    const t = useTranslation();

    const footerLinks = {
        oferta: [
            { label: t.footer.columns.ourDiets, href: '/oferta' },
            { label: t.footer.columns.pricing, href: '/cennik' },
            { label: t.footer.columns.currentMenu, href: '/menu' },
            { label: t.footer.columns.deliveryZone, href: '/dowoz' },
        ],
        pomoc: [
            { label: t.header.nav.faq, href: '/faq' },
            { label: t.header.nav.blog, href: '/blog' },
            { label: t.footer.columns.contact, href: '/kontakt' },
            { label: t.footer.columns.regulations, href: '/regulamin' },
        ],
    };

    return (
        <footer className="relative bg-black text-white overflow-hidden">
            {/* Subtle decorative gradients */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -bottom-32 -left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-orange-500/8 to-pink-500/5 blur-[120px]"></div>
                <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-violet-500/6 to-blue-500/4 blur-[100px]"></div>
            </div>

            {/* Top border gradient line */}
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12">

                {/* Main footer content */}
                <div className="pt-16 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

                    {/* Brand Column */}
                    <div className="lg:col-span-5 space-y-6">
                        <Link href="/" className="inline-block group">
                            <span className="text-3xl font-display font-bold tracking-tight">
                                Głodny<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">Niedźwiedź</span>
                            </span>
                        </Link>
                        <p className="text-white/40 text-sm leading-relaxed max-w-sm">
                            {t.footer.brandDesc}
                        </p>

                        {/* Social icons */}
                        <div className="flex items-center gap-3 pt-2">
                            {[
                                {
                                    label: 'Instagram', icon: (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                    )
                                },
                                {
                                    label: 'Facebook', icon: (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                                    )
                                },
                                {
                                    label: 'TikTok', icon: (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
                                    )
                                },
                            ].map((social) => (
                                <a
                                    key={social.label}
                                    href="#"
                                    aria-label={social.label}
                                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="lg:col-span-2">
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 mb-5">{t.footer.columns.offer}</h4>
                        <ul className="space-y-3">
                            {footerLinks.oferta.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-sm text-white/50 hover:text-white transition-colors duration-300">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-2">
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 mb-5">{t.footer.columns.help}</h4>
                        <ul className="space-y-3">
                            {footerLinks.pomoc.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-sm text-white/50 hover:text-white transition-colors duration-300">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div className="lg:col-span-3">
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 mb-5">{t.footer.columns.contact}</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-3 text-white/50">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/25 flex-shrink-0"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                <a href="tel:+48123456789" className="hover:text-white transition-colors duration-300">+48 123 456 789</a>
                            </li>
                            <li className="flex items-center gap-3 text-white/50">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/25 flex-shrink-0"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                <a href="mailto:kontakt@glodnyniedzwiedz.pl" className="hover:text-white transition-colors duration-300 break-all">kontakt@glodnyniedzwiedz.pl</a>
                            </li>
                            <li className="flex items-start gap-3 text-white/50">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/25 flex-shrink-0 mt-0.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                <span>ul. Smaczna 12, 00-001 Warszawa</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/[0.06] py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-white/25">
                        © {new Date().getFullYear()} Głodny Niedźwiedź. {t.footer.copyright}
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="/polityka-prywatnosci" className="text-xs text-white/25 hover:text-white/50 transition-colors">
                            {t.footer.privacyPolicy}
                        </Link>
                        <Link href="/regulamin" className="text-xs text-white/25 hover:text-white/50 transition-colors">
                            {t.footer.columns.regulations}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
