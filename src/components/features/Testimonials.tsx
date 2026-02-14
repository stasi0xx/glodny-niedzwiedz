'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

const staticTestimonials = [
    // Row 1
    {
        id: 1,
        name: 'Marta K.',
        rating: 5,
        avatar: '👩‍💼',
        accent: 'from-pink-400 to-rose-500',
    },
    {
        id: 2,
        name: 'Tomek W.',
        rating: 5,
        avatar: '👨‍💻',
        accent: 'from-blue-400 to-cyan-500',
    },
    {
        id: 3,
        name: 'Ania S.',
        rating: 5,
        avatar: '💪',
        accent: 'from-amber-400 to-orange-500',
    },
    {
        id: 4,
        name: 'Kacper M.',
        rating: 5,
        avatar: '🧑‍🍳',
        accent: 'from-emerald-400 to-green-500',
    },
    {
        id: 5,
        name: 'Ola P.',
        rating: 5,
        avatar: '👩‍🎨',
        accent: 'from-violet-400 to-purple-500',
    },
    {
        id: 6,
        name: 'Bartek R.',
        rating: 5,
        avatar: '🏋️',
        accent: 'from-yellow-400 to-amber-500',
    },
    // Row 2
    {
        id: 7,
        name: 'Magda L.',
        rating: 5,
        avatar: '🌿',
        accent: 'from-green-400 to-emerald-500',
    },
    {
        id: 8,
        name: 'Piotr D.',
        rating: 5,
        avatar: '🚀',
        accent: 'from-cyan-400 to-blue-500',
    },
    {
        id: 9,
        name: 'Karolina N.',
        rating: 4,
        avatar: '👩‍⚕️',
        accent: 'from-purple-400 to-indigo-500',
    },
    {
        id: 10,
        name: 'Michał Z.',
        rating: 5,
        avatar: '🏃',
        accent: 'from-orange-400 to-red-500',
    },
    {
        id: 11,
        name: 'Zuzia T.',
        rating: 5,
        avatar: '💝',
        accent: 'from-rose-400 to-pink-500',
    },
    {
        id: 12,
        name: 'Jakub K.',
        rating: 5,
        avatar: '🎯',
        accent: 'from-teal-400 to-cyan-500',
    },
];

const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
            <svg
                key={i}
                width="14"
                height="14"
                viewBox="0 0 20 20"
                fill={i < rating ? '#FBBF24' : '#E5E7EB'}
                className="drop-shadow-sm"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ))}
    </div>
);

type TestimonialData = typeof staticTestimonials[0] & { role: string; text: string };

const TestimonialCard = ({ testimonial }: { testimonial: TestimonialData }) => (
    <div className="testimonial-card group relative flex-shrink-0 w-[340px] md:w-[400px]">
        <div className={`relative h-full overflow-hidden rounded-[1.5rem] bg-white/70 backdrop-blur-xl border border-white/60 p-6 transition-all duration-500 hover:bg-white/90 hover:border-white/80 hover:shadow-2xl shadow-lg`}>
            {/* Gradient glow on hover */}
            <div className={`absolute -inset-1 rounded-[1.5rem] bg-gradient-to-br ${testimonial.accent} opacity-0 group-hover:opacity-[0.1] transition-opacity duration-700 blur-xl -z-10`}></div>

            {/* Rating */}
            <div className="flex items-center justify-between mb-4">
                <StarRating rating={testimonial.rating} />
                <span className={`text-2xl`}>{testimonial.avatar}</span>
            </div>

            {/* Quote */}
            <p className="text-gray-700 text-sm leading-relaxed mb-5 line-clamp-4">
                &ldquo;{testimonial.text}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 mt-auto">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.accent} flex items-center justify-center text-white text-xs font-bold shadow-md`}>
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                    <p className="font-bold text-sm text-gray-900">{testimonial.name}</p>
                    <p className="text-xs text-gray-400">{testimonial.role}</p>
                </div>
            </div>

            {/* Decorative corner */}
            <div className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl ${testimonial.accent} opacity-[0.06] rounded-tl-[80px]`}></div>
        </div>
    </div>
);

export const Testimonials = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
    const t = useTranslation();

    // Merge static data with translations
    const testimonialsData: TestimonialData[] = staticTestimonials.map(item => ({
        ...item,
        role: t.testimonials.items[item.id as keyof typeof t.testimonials.items].role,
        text: t.testimonials.items[item.id as keyof typeof t.testimonials.items].text,
    }));

    const row1 = testimonialsData.slice(0, 6);
    const row2 = testimonialsData.slice(6, 12);

    return (
        <section className="relative py-16 md:py-24 overflow-hidden bg-white" id="opinie">

            <div className="relative z-10">
                {/* Section Header */}
                <div ref={sectionRef} className="mb-14 text-center max-w-3xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="inline-block py-1.5 px-5 rounded-full border border-black/5 bg-white/40 backdrop-blur-md text-xs font-bold tracking-[0.2em] uppercase text-gray-900 mb-4">
                            {t.testimonials.badge}
                        </span>
                    </motion.div>

                    <motion.h2
                        className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-[#111111] mb-4 tracking-tighter leading-[0.9]"
                        initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                        animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                        transition={{ duration: 0.8, delay: 0.15 }}
                    >
                        {t.testimonials.title1}{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-600">
                            {t.testimonials.title2}
                        </span>
                    </motion.h2>

                    <motion.p
                        className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.35 }}
                    >
                        {t.testimonials.description}
                    </motion.p>
                </div>

                {/* Tilted Scrolling Rows */}
                <motion.div
                    className="testimonials-tilt"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 1, delay: 0.4 }}
                >
                    {/* Row 1 – scrolls to the right */}
                    <div className="testimonials-row mb-6">
                        <div className="testimonials-track testimonials-scroll-right">
                            {/* Triple the items for seamless loop */}
                            {[...row1, ...row1, ...row1].map((t, i) => (
                                <TestimonialCard key={`row1-${i}`} testimonial={t} />
                            ))}
                        </div>
                    </div>

                    {/* Row 2 – scrolls to the left */}
                    <div className="testimonials-row">
                        <div className="testimonials-track testimonials-scroll-left">
                            {/* Triple the items for seamless loop */}
                            {[...row2, ...row2, ...row2].map((t, i) => (
                                <TestimonialCard key={`row2-${i}`} testimonial={t} />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
