'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

export const CtaBanner = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section className="relative bg-white py-16 md:py-24 overflow-hidden" id="cta-banner">
            <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-4 lg:px-12">
                <motion.div
                    className="relative rounded-[2.5rem] overflow-hidden"
                    initial={{ opacity: 0, y: 60, scale: 0.96 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.8, type: 'spring', stiffness: 60, damping: 16 }}
                >
                    {/* Card with dark gradient */}
                    <div className="relative bg-[#111111] rounded-[2.5rem] px-8 py-14 md:px-16 md:py-20 text-center overflow-hidden">

                        {/* Decorative gradient blobs */}
                        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-orange-500/30 to-pink-500/20 blur-[100px]"></div>
                        <div className="absolute -bottom-20 -right-20 w-[350px] h-[350px] rounded-full bg-gradient-to-br from-violet-500/20 to-blue-500/15 blur-[100px]"></div>

                        {/* Subtle grid pattern */}
                        <div className="absolute inset-0 opacity-[0.04]" style={{
                            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                            backgroundSize: '40px 40px',
                        }}></div>

                        {/* Content */}
                        <div className="relative z-10">
                            <motion.span
                                className="inline-block py-1.5 px-5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-bold tracking-[0.2em] uppercase text-white/70 mb-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                Zacznij już dziś
                            </motion.span>

                            <motion.h2
                                className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 tracking-tighter leading-[0.95]"
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.7, delay: 0.3 }}
                            >
                                Gotowy na zmianę?
                            </motion.h2>

                            <motion.p
                                className="text-lg md:text-xl text-white/60 max-w-xl mx-auto mb-10 leading-relaxed"
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: 1 } : {}}
                                transition={{ duration: 0.6, delay: 0.45 }}
                            >
                                Dobierz idealną dietę lub sprawdź, czy dowozimy w Twoją okolicę.
                            </motion.p>

                            <motion.div
                                className="flex flex-col sm:flex-row items-center justify-center gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.55 }}
                            >
                                <Link href="/dobierz-diete">
                                    <button className="bg-white text-black px-10 py-5 rounded-full text-lg font-bold hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-white/10 flex items-center gap-3 group">
                                        Dobierz Dietę
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                    </button>
                                </Link>

                                <Link href="/#hero">
                                    <button className="border border-white/20 text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-white/10 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 group backdrop-blur-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-y-0.5 transition-transform"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                        Sprawdź Dowóz
                                    </button>
                                </Link>
                            </motion.div>
                        </div>

                        {/* Decorative corner accents */}
                        <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-white/10 rounded-tl-xl"></div>
                        <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-white/10 rounded-br-xl"></div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
