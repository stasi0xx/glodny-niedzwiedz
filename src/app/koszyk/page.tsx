'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { diets } from '@/data/diets';
import { calculatePrice } from '@/data/pricing';
import { DietSummary } from '@/components/cart/DietSummary';
import { DeliveryConfig } from '@/components/cart/DeliveryConfig';
import { DiscountCode } from '@/components/cart/DiscountCode';
import { OrderSummary } from '@/components/cart/OrderSummary';

function CartContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // --- State ---
    const [selectedDietId, setSelectedDietId] = useState(diets[0].id);
    const [kcal, setKcal] = useState(2000);
    const [days, setDays] = useState(20);
    const [startDate, setStartDate] = useState('');

    // Discount State
    const [appliedCode, setAppliedCode] = useState<string | undefined>(undefined);
    const [discountAmount, setDiscountAmount] = useState(0);

    // --- Initialization ---
    useEffect(() => {
        // Initialize from URL
        const dietSlug = searchParams.get('diet');
        const kcalParam = searchParams.get('kcal');

        if (dietSlug) {
            const found = diets.find(d => d.slug === dietSlug);
            if (found) setSelectedDietId(found.id);
        }
        if (kcalParam) setKcal(Number(kcalParam));

        // Set default start date to tomorrow + 2 days
        const date = new Date();
        date.setDate(date.getDate() + 2);
        setStartDate(date.toISOString().split('T')[0]);
    }, [searchParams]);

    const selectedDiet = diets.find(d => d.id === selectedDietId) || diets[0];

    // --- Calculations ---
    const rawPrice = calculatePrice(selectedDiet, kcal, days);
    // Apply discount logic (simple pct or fixed amount)
    // For MVP: if code is "RABAT10", give 10% off. "GLODNY20" gives 20zl off.
    useEffect(() => {
        if (!appliedCode) {
            setDiscountAmount(0);
            return;
        }
        if (appliedCode === 'RABAT10') {
            setDiscountAmount(Math.round(rawPrice * 0.1));
        } else if (appliedCode === 'GLODNY20') {
            setDiscountAmount(20);
        } else {
            setDiscountAmount(0);
        }
    }, [appliedCode, rawPrice]);

    const dailyPrice = Math.round(rawPrice / days);

    // --- Handlers ---
    const handleApplyDiscount = async (code: string): Promise<boolean> => {
        // Mock API check
        if (['RABAT10', 'GLODNY20'].includes(code.toUpperCase())) {
            setAppliedCode(code.toUpperCase());
            return true;
        }
        return false;
    };

    const handleRemoveDiscount = () => {
        setAppliedCode(undefined);
    };

    const proceedToCheckout = () => {
        const params = new URLSearchParams({
            dietId: selectedDietId,
            kcal: kcal.toString(),
            days: days.toString(),
            startDate: startDate,
            price: (rawPrice - discountAmount).toString(),
            discount: discountAmount.toString(),
        });
        router.push(`/zamowienie/checkout?${params.toString()}`);
    };

    return (
        <Container className="py-12">
            <h1 className="text-3xl font-bold mb-8">Twój koszyk 🛒</h1>

            <div className="grid lg:grid-cols-3 gap-12">
                {/* Left Column: Configuration */}
                <div className="lg:col-span-2 space-y-8">

                    <DietSummary
                        diet={selectedDiet}
                        kcal={kcal}
                        days={days}
                        // Optional: allow changing kcal here if needed
                        onKcalChange={setKcal}
                    />

                    <DeliveryConfig
                        days={days}
                        startDate={startDate}
                        onDaysChange={setDays}
                        onStartDateChange={setStartDate}
                    />

                    <DiscountCode
                        onApply={handleApplyDiscount}
                        appliedCode={appliedCode}
                        onRemove={handleRemoveDiscount}
                    />
                </div>

                {/* Right Column: Summary */}
                <div>
                    <OrderSummary
                        dietName={selectedDiet.name}
                        kcal={kcal}
                        days={days}
                        dailyPrice={dailyPrice}
                        totalPrice={rawPrice} // passing total BEFORE discount to show strikethrough logic if needed
                        discountAmount={discountAmount}
                        onCheckout={proceedToCheckout}
                        canCheckout={true}
                    />
                </div>
            </div>
        </Container>
    );
}

export default function CartPage() {
    return (
        <Suspense fallback={<div className="p-12 text-center">Ładowanie koszyka...</div>}>
            <CartContent />
        </Suspense>
    );
}
