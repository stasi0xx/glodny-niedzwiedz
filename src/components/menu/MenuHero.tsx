'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';

export const MenuHero = () => {
    return (
        <div className="relative pt-32 pb-16 overflow-hidden bg-[#FAFAFA]">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] bg-gradient-to-br from-[#FF9A9E] to-[#FECFEF] opacity-20 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[500px] h-[500px] bg-gradient-to-tr from-[#A18CD1] to-[#FBC2EB] opacity-20 blur-[80px] rounded-full pointer-events-none" />

            <Container className="relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-emerald-100/50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4">
                        Menu na ten tydzień
                    </span>
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-6 leading-tight">
                        Menu, które naprawdę <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                            chce się jeść.
                        </span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
                        Zero nudy. Codziennie inna podróż kulinarna, dopasowana do Twoich celów.
                        Świeże składniki, autorskie przepisy i smak, który pokochasz.
                    </p>

                    {/* Trust Pills */}
                    <div className="flex flex-wrap justify-center gap-4 mb-10">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-100 shadow-sm">
                            <span className="text-emerald-500 text-xl">🥗</span>
                            <span className="text-sm font-bold text-gray-700">35 dań tygodniowo</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-100 shadow-sm">
                            <span className="text-emerald-500 text-xl">🔄</span>
                            <span className="text-sm font-bold text-gray-700">Nowe menu co tydzień</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-100 shadow-sm">
                            <span className="text-emerald-500 text-xl">✅</span>
                            <span className="text-sm font-bold text-gray-700">Pełne makro</span>
                        </div>
                    </div>

                    <div className="flex justify-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-[#FF4F6E] hover:bg-[#ff3355] text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-pink-500/30 transition-colors"
                        >
                            Dobierz dietę
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 px-8 py-3 rounded-full font-bold transition-colors"
                        >
                            Sprawdź dowóz
                        </motion.button>
                    </div>
                </motion.div>
            </Container>
        </div>
    );
};
