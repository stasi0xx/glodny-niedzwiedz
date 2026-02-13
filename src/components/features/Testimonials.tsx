'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const testimonials = [
    // Row 1 – scrolls right
    [
        {
            id: 1,
            name: 'Marta K.',
            role: 'Klientka od 8 miesięcy',
            rating: 5,
            text: 'Najlepsza dieta pudełkowa jaką próbowałam. Każdy posiłek to małe kulinarne dzieło sztuki – i wreszcie schudłam 12 kg!',
            avatar: '👩‍💼',
            accent: 'from-pink-400 to-rose-500',
        },
        {
            id: 2,
            name: 'Tomek W.',
            role: 'Klient od roku',
            rating: 5,
            text: 'Przeszedłem z innego cateringu i różnica jest kosmiczna. Smak, świeżość, punktualność – wszystko na najwyższym poziomie.',
            avatar: '👨‍💻',
            accent: 'from-blue-400 to-cyan-500',
        },
        {
            id: 3,
            name: 'Ania S.',
            role: 'Dieta Sport',
            rating: 5,
            text: 'Jako trenerka personalna polecam Głodnego Niedźwiedzia wszystkim swoim podopiecznym. Makra idealnie dobrane!',
            avatar: '💪',
            accent: 'from-amber-400 to-orange-500',
        },
        {
            id: 4,
            name: 'Kacper M.',
            role: 'Dieta Redukcja',
            rating: 5,
            text: 'W końcu dieta, na której nie czuję się głodny. Posiłki są sycące, smaczne i urozmaicone. Polecam każdemu!',
            avatar: '🧑‍🍳',
            accent: 'from-emerald-400 to-green-500',
        },
        {
            id: 5,
            name: 'Ola P.',
            role: 'Klientka od 3 miesięcy',
            rating: 5,
            text: 'Elastyczność jest niesamowita – mogę zmieniać posiłki z dnia na dzień. Do tego aplikacja jest super wygodna!',
            avatar: '👩‍🎨',
            accent: 'from-violet-400 to-purple-500',
        },
        {
            id: 6,
            name: 'Bartek R.',
            role: 'Dieta Keto',
            rating: 5,
            text: 'Keto bez wyrzeczeń? Tak, to jest możliwe! Świetne tłuszcze, zero cukru i smak, który zaskakuje każdego dnia.',
            avatar: '🏋️',
            accent: 'from-yellow-400 to-amber-500',
        },
    ],
    // Row 2 – scrolls left
    [
        {
            id: 7,
            name: 'Magda L.',
            role: 'Dieta Wege',
            rating: 5,
            text: 'Myślałam, że dieta wegańska będzie nudna. Głodny Niedźwiedź udowodnił mi, że się myliłam – jest wspaniale!',
            avatar: '🌿',
            accent: 'from-green-400 to-emerald-500',
        },
        {
            id: 8,
            name: 'Piotr D.',
            role: 'Klient od 6 miesięcy',
            rating: 5,
            text: 'Dostawa zawsze przed 6 rano, ciepłe jeszcze posiłki i zero plastiku. Tak powinien wyglądać catering w 2025!',
            avatar: '🚀',
            accent: 'from-cyan-400 to-blue-500',
        },
        {
            id: 9,
            name: 'Karolina N.',
            role: 'Dieta Low IG',
            rating: 4,
            text: 'Mój cukier się ustabilizował po 2 tygodniach. Lekarz był zdziwiony wynikami – ja nie, bo wiem co jem!',
            avatar: '👩‍⚕️',
            accent: 'from-purple-400 to-indigo-500',
        },
        {
            id: 10,
            name: 'Michał Z.',
            role: 'Dieta Sport',
            rating: 5,
            text: 'Przygotowania do maratonu z Głodnym Niedźwiedziem to strzał w dziesiątkę. Energia na treningach jest na max!',
            avatar: '🏃',
            accent: 'from-orange-400 to-red-500',
        },
        {
            id: 11,
            name: 'Zuzia T.',
            role: 'Klientka od 4 miesięcy',
            rating: 5,
            text: 'Moja mama zamówiła mi na urodziny – teraz zamawiamy razem! Najlepszy prezent jaki dostałam. Polecam z całego ♥️',
            avatar: '💝',
            accent: 'from-rose-400 to-pink-500',
        },
        {
            id: 12,
            name: 'Jakub K.',
            role: 'Dieta Bez Laktozy',
            rating: 5,
            text: 'Wreszcie catering, który traktuje nietolerancje poważnie. Żadnych wpadek, a smak jak z restauracji!',
            avatar: '🎯',
            accent: 'from-teal-400 to-cyan-500',
        },
    ],
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

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0][0] }) => (
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
                            Opinie klientów
                        </span>
                    </motion.div>

                    <motion.h2
                        className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-[#111111] mb-4 tracking-tighter leading-[0.9]"
                        initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                        animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                        transition={{ duration: 0.8, delay: 0.15 }}
                    >
                        Nasi klienci{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-600">
                            mówią za nas.
                        </span>
                    </motion.h2>

                    <motion.p
                        className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.35 }}
                    >
                        Ponad 2 300 opinii na Google z oceną 4.9/5. Przekonaj się sam.
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
                            {[...testimonials[0], ...testimonials[0], ...testimonials[0]].map((t, i) => (
                                <TestimonialCard key={`row1-${i}`} testimonial={t} />
                            ))}
                        </div>
                    </div>

                    {/* Row 2 – scrolls to the left */}
                    <div className="testimonials-row">
                        <div className="testimonials-track testimonials-scroll-left">
                            {/* Triple the items for seamless loop */}
                            {[...testimonials[1], ...testimonials[1], ...testimonials[1]].map((t, i) => (
                                <TestimonialCard key={`row2-${i}`} testimonial={t} />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
