'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';

export const SampleMenu = () => {
    // Ref for the pinning container
    const targetRef = useRef<HTMLDivElement>(null);
    const t = useTranslation();

    const sampleMeals = [
        {
            id: 1,
            type: t.sampleMenu.meals[1].type,
            name: t.sampleMenu.meals[1].name,
            macros: `B: ${t.sampleMenu.meals[1].protein} • T: ${t.sampleMenu.meals[1].fat} • W: ${t.sampleMenu.meals[1].carbs} • ${t.sampleMenu.meals[1].calories}`,
            description: t.sampleMenu.meals[1].desc,
            image: 'https://images.unsplash.com/photo-1494390248081-4e521a5940db?q=80&w=800&auto=format&fit=crop',
            color: 'bg-orange-50',
            buttonColor: 'bg-orange-500 hover:bg-orange-600',
        },
        {
            id: 2,
            type: t.sampleMenu.meals[2].type,
            name: t.sampleMenu.meals[2].name,
            macros: `B: ${t.sampleMenu.meals[2].protein} • T: ${t.sampleMenu.meals[2].fat} • W: ${t.sampleMenu.meals[2].carbs} • ${t.sampleMenu.meals[2].calories}`,
            description: t.sampleMenu.meals[2].desc,
            image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=800&auto=format&fit=crop',
            color: 'bg-purple-50',
            buttonColor: 'bg-purple-500 hover:bg-purple-600',
        },
        {
            id: 3,
            type: t.sampleMenu.meals[3].type,
            name: t.sampleMenu.meals[3].name,
            macros: `B: ${t.sampleMenu.meals[3].protein} • T: ${t.sampleMenu.meals[3].fat} • W: ${t.sampleMenu.meals[3].carbs} • ${t.sampleMenu.meals[3].calories}`,
            description: t.sampleMenu.meals[3].desc,
            image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop',
            color: 'bg-emerald-50',
            buttonColor: 'bg-emerald-500 hover:bg-emerald-600',
        },
        {
            id: 4,
            type: t.sampleMenu.meals[4].type,
            name: t.sampleMenu.meals[4].name,
            macros: `B: ${t.sampleMenu.meals[4].protein} • T: ${t.sampleMenu.meals[4].fat} • W: ${t.sampleMenu.meals[4].carbs} • ${t.sampleMenu.meals[4].calories}`,
            description: t.sampleMenu.meals[4].desc,
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop',
            color: 'bg-green-50',
            buttonColor: 'bg-green-600 hover:bg-green-700',
        },
        {
            id: 5,
            type: t.sampleMenu.meals[5].type,
            name: t.sampleMenu.meals[5].name,
            macros: `B: ${t.sampleMenu.meals[5].protein} • T: ${t.sampleMenu.meals[5].fat} • W: ${t.sampleMenu.meals[5].carbs} • ${t.sampleMenu.meals[5].calories}`,
            description: t.sampleMenu.meals[5].desc,
            image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=800&auto=format&fit=crop',
            color: 'bg-blue-50',
            buttonColor: 'bg-blue-500 hover:bg-blue-600',
        },
    ];

    // Scroll progress for the entire pinned section
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Horizontal transformation: Move cards left as we scroll down
    // Range: [0, 1] -> [0%, -85%] (Adjust based on card width/count)
    const x = useTransform(scrollYProgress, [0, 1], ["10%", "-200%"]);

    return (
        <section className="relative bg-white border-t border-gray-100">

            {/* --- DESKTOP VIEW (Pinned Horizontal Scroll) --- */}
            <div ref={targetRef} className="hidden lg:block relative h-[500vh]">
                <div className="sticky top-12 h-screen overflow-hidden flex flex-col justify-center">

                    {/* Section Header (Fixed or Moving? Fixed inside sticky container feels best) */}
                    <div className="absolute top-12 left-12 z-20">
                        <h2 className="text-7xl font-bold font-display tracking-tighter text-black mb-2 leading-[0.9]">
                            {t.sampleMenu.title1} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600">{t.sampleMenu.title2}</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-sm">
                            {t.sampleMenu.subtitle} <br />
                        </p>
                    </div>

                    {/* Horizontal Moving Track */}
                    <motion.div style={{ x }} className="flex gap-24 items-center pl-[30vw]">
                        {sampleMeals.map((meal) => (
                            <div
                                key={meal.id}
                                className="flex-shrink-0 w-[900px] h-[520px] bg-white rounded-[3rem] shadow-2xl p-12 flex items-stretch gap-12 border border-gray-100 relative overflow-hidden group"
                            >
                                {/* Decorative background blob */}
                                <div className={`absolute top-0 right-0 w-64 h-64 ${meal.color} rounded-bl-[200px] -z-10 opacity-40`}></div>

                                {/* Image (Left) */}
                                <div className="w-1/2 rounded-[2rem] overflow-hidden relative shadow-lg flex-shrink-0">
                                    <img
                                        src={meal.image}
                                        alt={meal.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full font-bold text-sm shadow-md z-10">
                                        {meal.type}
                                    </div>
                                </div>

                                {/* Content (Right) */}
                                <div className="w-1/2 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-4xl font-bold font-display text-black leading-tight mb-4">
                                            {meal.name}
                                        </h3>

                                        <p className="text-gray-500 text-lg leading-relaxed line-clamp-3">
                                            {meal.description}
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                                        <p className="text-xs font-bold text-gray-800 tracking-widest uppercase mb-1">{t.sampleMenu.macros}</p>
                                        <p className="text-gray-600 font-medium text-lg">{meal.macros}</p>
                                    </div>

                                    <Link href="/dobierz-diete" className="inline-block w-full">
                                        <button className={`w-full py-5 rounded-full text-white font-bold shadow-lg text-lg transform transition-all hover:-translate-y-1 active:scale-95 ${meal.buttonColor}`}>
                                            {t.sampleMenu.orderDiet}
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>


            {/* --- MOBILE VIEW (Vertical Stack) --- */}
            <div className="lg:hidden py-16 px-4">
                <div className="mb-12 text-center">
                    <h2 className="text-5xl font-bold font-display tracking-tighter text-black mb-4 leading-[0.9]">
                        {t.sampleMenu.title1} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600">{t.sampleMenu.title2}</span>
                    </h2>
                    <p className="text-lg text-gray-600">
                        {t.sampleMenu.mobileSubtitle}
                    </p>
                </div>

                <div className="space-y-8">
                    {sampleMeals.map((meal) => (
                        <div
                            key={meal.id}
                            className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100 flex flex-col"
                        >
                            {/* Image (Top) */}
                            <div className="h-64 relative overflow-hidden group">
                                <img
                                    src={meal.image}
                                    alt={meal.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full font-bold text-xs shadow-md">
                                    {meal.type}
                                </div>
                            </div>

                            {/* Content (Bottom) */}
                            <div className="p-8 relative">
                                <div className={`absolute top-0 right-0 w-24 h-24 ${meal.color} rounded-bl-[80px] -z-10 opacity-50`}></div>

                                <h3 className="text-3xl font-bold font-display text-black mb-3 leading-tight">
                                    {meal.name}
                                </h3>

                                <p className="text-gray-500 mb-6 text-base leading-relaxed">
                                    {meal.description}
                                </p>

                                <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
                                    <p className="text-xs font-bold text-gray-800 tracking-wide uppercase">{t.sampleMenu.macros}</p>
                                    <p className="text-gray-600 font-medium text-sm mt-1">{meal.macros}</p>
                                </div>

                                <Link href="/dobierz-diete">
                                    <button className={`w-full py-4 rounded-full text-white font-bold shadow-md ${meal.buttonColor}`}>
                                        {t.sampleMenu.orderDiet}
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
};
