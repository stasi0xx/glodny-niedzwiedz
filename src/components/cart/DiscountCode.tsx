import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface DiscountCodeProps {
    onApply: (code: string) => Promise<boolean>; // Returns true if valid
    appliedCode?: string;
    onRemove: () => void;
}

export function DiscountCode({ onApply, appliedCode, onRemove }: DiscountCodeProps) {
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!code) return;

        setIsLoading(true);
        setError('');

        // Simulate API call delay
        await new Promise(r => setTimeout(r, 600));

        try {
            const isValid = await onApply(code);
            if (!isValid) {
                setError('Kod jest nieprawidłowy lub wygasł.');
            } else {
                setCode('');
            }
        } catch (err) {
            setError('Wystąpił błąd podczas sprawdzania kodu.');
        } finally {
            setIsLoading(false);
        }
    };

    if (appliedCode) {
        return (
            <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex justify-between items-center">
                <div>
                    <span className="text-emerald-800 text-sm font-semibold block">Kod rabatowy aktywny:</span>
                    <span className="text-emerald-900 font-bold">{appliedCode}</span>
                </div>
                <button
                    onClick={onRemove}
                    className="text-emerald-600 hover:text-emerald-800 text-sm underline font-medium"
                >
                    Usuń
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                🏷️ Masz kod rabatowy?
            </h3>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Wpisz kod (np. WITAJ10)"
                    className="flex-1 p-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all uppercase"
                />
                <Button
                    type="submit"
                    disabled={!code || isLoading}
                    className="whitespace-nowrap bg-gray-900 hover:bg-gray-800 text-white"
                >
                    {isLoading ? '...' : 'Zastosuj'}
                </Button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
    );
}
