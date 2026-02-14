'use client';

import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { deliveryZones } from '../../data/deliveryZones';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

export const DeliveryChecker: React.FC = () => {
    const [input, setInput] = useState('');
    const [status, setStatus] = useState<'idle' | 'served' | 'not-served' | 'unknown'>('idle');
    const t = useTranslation();

    const checkDelivery = () => {
        const result = deliveryZones.checkDelivery(input);
        setStatus(result);
    };

    return (
        <div className="rounded-[2rem] bg-white p-6 md:p-8 shadow-xl shadow-emerald-900/5 ring-1 ring-gray-100">
            <h3 className="text-xl font-bold font-display text-[#111827] mb-2">
                {t.deliveryChecker.title}
            </h3>
            <p className="text-base text-[#6B7280] mb-6">
                {t.deliveryChecker.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
                <input
                    type="text"
                    placeholder={t.deliveryChecker.placeholder}
                    className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-[#111827] placeholder:text-gray-400 focus:border-[#10B981] focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 transition-all bg-gray-50/50 focus:bg-white"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && checkDelivery()}
                />
                <Button onClick={checkDelivery} className="whitespace-nowrap px-8">
                    {t.deliveryChecker.checkBtn}
                </Button>
            </div>

            {status === 'served' && (
                <div className="mt-4 rounded-lg bg-emerald-50 p-4 text-emerald-800 animate-in fade-in slide-in-from-top-2">
                    <p className="font-semibold flex items-center gap-2">
                        {t.deliveryChecker.success}
                    </p>
                    <div className="mt-3">
                        <Link href="/oferta">
                            <Button size="sm" className="w-full sm:w-auto">{t.deliveryChecker.orderBtn}</Button>
                        </Link>
                    </div>
                </div>
            )}

            {status === 'not-served' && (
                <div className="mt-4 rounded-lg bg-gray-50 p-4 text-gray-800 animate-in fade-in slide-in-from-top-2">
                    <p className="font-semibold flex items-center gap-2">
                        {t.deliveryChecker.failure}
                    </p>
                    <p className="text-sm mt-1 mb-3">{t.deliveryChecker.leaveCity}</p>
                    <div className="flex gap-2">
                        <input type="text" placeholder={t.deliveryChecker.cityPlaceholder} className="flex-1 text-sm border-gray-300 rounded-md" />
                        <Button variant="secondary" size="sm">{t.deliveryChecker.sendBtn}</Button>
                    </div>
                </div>
            )}

            {status === 'unknown' && (
                <div className="mt-4 rounded-lg bg-yellow-50 p-4 text-yellow-800 animate-in fade-in slide-in-from-top-2">
                    <p className="text-sm">
                        {t.deliveryChecker.unknown}
                    </p>
                </div>
            )}
        </div>
    );
};
