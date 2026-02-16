import React from 'react';

interface DeliveryConfigProps {
    days: number;
    startDate: string;
    onDaysChange: (days: number) => void;
    onStartDateChange: (date: string) => void;
}

export function DeliveryConfig({ days, startDate, onDaysChange, onStartDateChange }: DeliveryConfigProps) {
    const today = new Date();
    // Start date ideally from tomorrow + buffer
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 2);
    const minDateString = minDate.toISOString().split('T')[0];

    const predefinedDays = [5, 10, 20];

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                <span className="text-2xl">📅</span>
                Kiedy dostarczamy?
            </h3>

            <div className="space-y-6">
                {/* Duration */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Liczba dni zamówienia</label>
                    <div className="flex flex-wrap gap-2">
                        {predefinedDays.map(d => (
                            <button
                                key={d}
                                onClick={() => onDaysChange(d)}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${days === d
                                        ? 'bg-emerald-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {d} dni
                            </button>
                        ))}
                        {/* Option for custom input if needed, keeping simple for now */}
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                        <span className="text-sm text-gray-500">Lub suwakiem:</span>
                        <input
                            type="range"
                            min="3" max="30" step="1"
                            value={days}
                            onChange={(e) => onDaysChange(Number(e.target.value))}
                            className="flex-1 accent-emerald-500"
                        />
                        <span className="font-bold text-gray-800 w-12 text-center">{days}</span>
                    </div>
                </div>

                {/* Start Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Data pierwszego posiłku</label>
                    <input
                        type="date"
                        value={startDate}
                        min={minDateString}
                        onChange={(e) => onStartDateChange(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all"
                    />
                    <p className="text-xs text-gray-400 mt-2">
                        📦 Zamówienia złożone do godz. 10:00 realizujemy od pojutrze.
                    </p>
                </div>

                {/* Days of week placeholder - purely mock for MVP */}
                <div className="opacity-70 pointer-events-none grayscale">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Dni dostaw (Wkrótce dostępne)</label>
                    <div className="flex gap-2 text-xs">
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold">Pon-Pt</span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-400 rounded-full">Pon-Sob</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
