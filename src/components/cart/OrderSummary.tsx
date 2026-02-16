import React from 'react';
import { Button } from '@/components/ui/Button';

interface OrderSummaryProps {
    dietName: string;
    kcal: number;
    days: number;
    dailyPrice: number;
    totalPrice: number;
    discountAmount: number;
    onCheckout: () => void;
    canCheckout: boolean;
}

export function OrderSummary({
    dietName,
    kcal,
    days,
    dailyPrice,
    totalPrice,
    discountAmount,
    onCheckout,
    canCheckout
}: OrderSummaryProps) {

    const finalPrice = totalPrice - discountAmount;

    return (
        <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-xl sticky top-24">
            <h2 className="text-xl font-bold mb-6">Podsumowanie</h2>

            <div className="space-y-4 mb-8 text-sm text-gray-300">
                <div className="flex justify-between">
                    <span>Dieta:</span>
                    <span className="text-white font-medium text-right">{dietName}</span>
                </div>
                <div className="flex justify-between">
                    <span>Wariant:</span>
                    <span className="text-white font-medium">{kcal} kcal</span>
                </div>
                <div className="flex justify-between">
                    <span>Długość:</span>
                    <span className="text-white font-medium">{days} dni</span>
                </div>
                <div className="border-t border-gray-700 my-4"></div>
                <div className="flex justify-between">
                    <span>Cena za dzień:</span>
                    <span className="text-white font-medium">{dailyPrice} zł</span>
                </div>
                <div className="flex justify-between">
                    <span>Wartość zamówienia:</span>
                    <span className="text-white font-medium">{totalPrice} zł</span>
                </div>
                {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                        <span>Rabat:</span>
                        <span className="font-medium">-{discountAmount} zł</span>
                    </div>
                )}
            </div>

            <div className="flex justify-between items-end mb-6">
                <span className="text-lg">Do zapłaty:</span>
                <div className="text-right">
                    {discountAmount > 0 && (
                        <span className="block text-sm text-gray-500 line-through mb-1">{totalPrice} zł</span>
                    )}
                    <span className="text-4xl font-bold text-emerald-400">{finalPrice} zł</span>
                </div>
            </div>

            <Button
                onClick={onCheckout}
                disabled={!canCheckout}
                className={`w-full py-4 text-lg font-bold shadow-lg shadow-emerald-500/20 ${!canCheckout ? 'opacity-50 cursor-not-allowed bg-gray-700 text-gray-400' : ''
                    }`}
            >
                {canCheckout ? 'Przejdź do kasy' : 'Uzupełnij dane'}
            </Button>

            <div className="mt-6 flex justify-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Simple mock icons for trust badges */}
                <span title="Visa" className="text-2xl">💳</span>
                <span title="Mastercard" className="text-2xl">💳</span>
                <span title="BLIK" className="text-2xl">💸</span>
                <span title="SSL Secure" className="text-2xl">🔒</span>
            </div>
            <p className="text-center text-xs text-gray-500 mt-2">Bezpieczne płatności przez PayU</p>
        </div>
    );
}
