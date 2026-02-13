'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const uspPoints = [
    {
        id: 1,
        stat: '100%',
        statLabel: 'świeżych składników',
        title: 'Jakość bez kompromisów',
        description: 'Żadnych mrożonek, proszków ani sztucznych barwników. Codziennie rano dostawy od lokalnych dostawców.',
        highlight: 'Lokalnie. Świeżo. Zawsze.',
        color: 'from-amber-400 to-orange-500',
        shadowColor: 'shadow-orange-500/30',
    },
    {
        id: 2,
        stat: '12',
        statLabel: 'kucharzy & dietetyków',
        title: 'Zespół ekspertów',
        description: 'Każdy posiłek projektuje dietetyk kliniczny i przygotowuje szef kuchni z min. 5-letnim doświadczeniem.',
        highlight: 'Nauka + Pasja',
        color: 'from-violet-400 to-purple-600',
        shadowColor: 'shadow-purple-500/30',
    },
    {
        id: 3,
        stat: '5:30',
        statLabel: 'dostawa przed',
        title: 'Logistyka jak zegarek',
        description: 'Własna flota chłodzona. GPS tracking w czasie rzeczywistym. 98.7% dostaw na czas – codziennie.',
        highlight: '98.7% punktualności',
        color: 'from-cyan-400 to-blue-500',
        shadowColor: 'shadow-blue-500/30',
    },
    {
        id: 4,
        stat: '24h',
        statLabel: 'na zmianę menu',
        title: 'Elastyczność na życzenie',
        description: 'Zmień dietę, pauzuj, modyfikuj kaloryczność lub zamień posiłek – do 24h przed dostawą, bez opłat.',
        highlight: 'Bez ukrytych kosztów',
        color: 'from-emerald-400 to-green-500',
        shadowColor: 'shadow-emerald-500/30',
    },
    {
        id: 5,
        stat: '4.9/5',
        statLabel: 'średnia ocena',
        title: 'Smak, który uzależnia',
        description: 'Ponad 2 300 opinii na Google i Trustpilot. 94% klientów zamawia ponownie w ciągu miesiąca.',
        highlight: '94% powraca',
        color: 'from-pink-400 to-rose-500',
        shadowColor: 'shadow-rose-500/30',
    },
];

// Different animation variants for each card
const cardAnimations = [
    // Card 1: Slide from left + rotate
    {
        hidden: { opacity: 0, x: -120, rotate: -8 },
        visible: { opacity: 1, x: 0, rotate: 0, transition: { type: 'spring' as const, stiffness: 60, damping: 15, duration: 0.8 } },
    },
    // Card 2: Scale up from center
    {
        hidden: { opacity: 0, scale: 0.3, y: 60 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring' as const, stiffness: 80, damping: 14, duration: 0.7 } },
    },
    // Card 3: Slide from right + rotate
    {
        hidden: { opacity: 0, x: 120, rotate: 8 },
        visible: { opacity: 1, x: 0, rotate: 0, transition: { type: 'spring' as const, stiffness: 60, damping: 15, duration: 0.8 } },
    },
    // Card 4: Slide from bottom + scale
    {
        hidden: { opacity: 0, y: 100, scale: 0.8 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring' as const, stiffness: 70, damping: 16, duration: 0.8 } },
    },
    // Card 5: Flip in from top
    {
        hidden: { opacity: 0, y: -80, rotateX: 45 },
        visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: 'spring' as const, stiffness: 60, damping: 14, duration: 0.9 } },
    },
];

const USPCard = ({ point, index }: { point: typeof uspPoints[0]; index: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <motion.div
            ref={ref}
            variants={cardAnimations[index]}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className={`relative group ${index >= 3 ? 'lg:col-span-3' : 'lg:col-span-2'}`}
        >
            <div className={`relative h-full overflow-hidden rounded-[2rem] bg-white/70 backdrop-blur-xl border border-white/60 p-6 md:p-8 transition-all duration-500 hover:bg-white/90 hover:border-white/80 hover:-translate-y-2 ${point.shadowColor} hover:shadow-2xl shadow-lg`}>

                {/* Gradient glow behind card on hover */}
                <div className={`absolute -inset-1 rounded-[2rem] bg-gradient-to-br ${point.color} opacity-0 group-hover:opacity-[0.12] transition-opacity duration-700 blur-xl -z-10`}></div>

                {/* Top Row: Highlight Badge */}
                <div className="flex items-center justify-end mb-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-gradient-to-r ${point.color} text-white shadow-md`}>
                        {point.highlight}
                    </span>
                </div>

                {/* Big Stat */}
                <div className="mb-3">
                    <motion.span
                        className={`text-5xl md:text-6xl font-display font-black tracking-tight bg-gradient-to-r ${point.color} text-transparent bg-clip-text leading-none`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                    >
                        {point.stat}
                    </motion.span>
                    <motion.p
                        className="text-gray-500 text-xs font-semibold uppercase tracking-widest mt-1"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                    >
                        {point.statLabel}
                    </motion.p>
                </div>

                {/* Title + Desc */}
                <h3 className="text-xl md:text-2xl font-display font-bold text-black mb-2 leading-tight">
                    {point.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                    {point.description}
                </p>

                {/* Decorative corner gradient */}
                <div className={`absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl ${point.color} opacity-[0.08] rounded-tl-[100px]`}></div>
            </div>
        </motion.div>
    );
};

export const WhyUs = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section className="relative py-16 md:py-24 overflow-hidden" id="dlaczego-my">
            {/* === HERO-STYLE GRADIENT BACKGROUND === */}
            <div className="absolute inset-0 bg-[#FDFBF7]"></div>

            {/* Animated gradient orbs – matching hero */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -right-[5%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#FF9A9E] to-[#FECFEF] opacity-40 blur-[100px] mix-blend-multiply animate-pulse" style={{ animationDuration: '8s' }}></div>
                <div className="absolute top-[5%] -left-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#A18CD1] to-[#FBC2EB] opacity-30 blur-[90px] mix-blend-multiply animate-pulse" style={{ animationDuration: '10s' }}></div>
                <div className="absolute bottom-[0%] right-[20%] w-[400px] h-[400px] rounded-full bg-gradient-to-r from-[#fde68a] to-[#FECFEF] opacity-25 blur-[100px] mix-blend-multiply animate-pulse" style={{ animationDuration: '12s' }}></div>
            </div>

            {/* Noise overlay */}
            <div className="absolute inset-0 opacity-[0.04]" style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E\")",
            }}></div>

            <div className="relative z-10 max-w-[1600px] mx-auto px-4 lg:px-12">

                {/* === SECTION HEADER === */}
                <div ref={sectionRef} className="mb-12 text-center max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={titleInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="inline-block py-1.5 px-5 rounded-full border border-black/5 bg-white/40 backdrop-blur-md text-xs font-bold tracking-[0.2em] uppercase text-gray-900 mb-4">
                            Dlaczego Głodny Niedźwiedź?
                        </span>
                    </motion.div>

                    <motion.h2
                        className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-[#111111] mb-4 tracking-tighter leading-[0.9]"
                        initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                        animate={titleInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                        transition={{ duration: 0.8, delay: 0.15 }}
                    >
                        Nie obiecujemy.{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600">
                            Dowodzimy.
                        </span>
                    </motion.h2>

                    <motion.p
                        className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={titleInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.35 }}
                    >
                        Konkretne liczby. Realni ludzie. Bez marketingowego bełkotu.
                    </motion.p>
                </div>

                {/* === USP CARDS GRID (Unconventional Bento) === */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 lg:gap-6">
                    {uspPoints.map((point, index) => (
                        <USPCard key={point.id} point={point} index={index} />
                    ))}
                </div>

                {/* === BOTTOM TRUST BAR === */}
                <motion.div
                    className="mt-12 flex flex-wrap items-center justify-center gap-8 md:gap-14"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    {[
                        { value: '2 300+', label: 'Opinii Google' },
                        { value: '15 000+', label: 'Dostarczonych diet' },
                        { value: '3 lata', label: 'Na rynku' },
                        { value: '0 zł', label: 'Opłata za zmiany' },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            className="text-center"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * i + 0.4, duration: 0.5 }}
                        >
                            <span className="block text-2xl md:text-3xl font-display font-black text-[#111111] tracking-tight">
                                {item.value}
                            </span>
                            <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                                {item.label}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
