'use client';

import React, { useState, useEffect, useRef } from 'react';

interface AddressSuggestion {
    display_name: string;
    lat: string;
    lon: string;
    address: {
        road?: string;
        house_number?: string;
        postcode?: string;
        city?: string;
        town?: string;
        village?: string;
    };
}

interface AddressAutocompleteProps {
    onSelect: (address: { street: string; city: string; zip: string; lat: number; lng: number }) => void;
    defaultValue?: string;
}

export default function AddressAutocomplete({ onSelect, defaultValue = '' }: AddressAutocompleteProps) {
    const [query, setQuery] = useState(defaultValue);
    const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.length > 2 && isOpen) {
                fetchSuggestions(query);
            }
        }, 500); // Debounce 500ms

        return () => clearTimeout(timer);
    }, [query, isOpen]);

    const fetchSuggestions = async (search: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(search)}&addressdetails=1&countrycodes=pl&limit=5`
            );
            const data = await response.json();
            setSuggestions(data);
        } catch (error) {
            console.error("Error fetching address suggestions:", error);
            setSuggestions([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelect = (item: AddressSuggestion) => {
        const city = item.address.city || item.address.town || item.address.village || '';
        const zip = item.address.postcode || '';
        const street = item.address.road ? `${item.address.road} ${item.address.house_number || ''}`.trim() : '';

        // Display nice label in input
        setQuery(item.display_name);
        setIsOpen(false);

        onSelect({
            street,
            city,
            zip,
            lat: parseFloat(item.lat),
            lng: parseFloat(item.lon)
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        setIsOpen(true);
    };

    return (
        <div ref={wrapperRef} className="relative w-full">
            <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Wyszukaj adres (autouzupełnianie)</label>
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Wpisz ulicę i miasto..."
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-300 text-gray-700 pl-10"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                {isLoading && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500 animate-spin">⟳</span>
                )}
            </div>

            {/* Suggestions Dropdown */}
            {isOpen && suggestions.length > 0 && (
                <ul className="absolute z-[10000] w-full bg-white border border-gray-100 rounded-xl mt-1 shadow-xl max-h-60 overflow-y-auto">
                    {suggestions.map((item, idx) => (
                        <li
                            key={idx}
                            onClick={() => handleSelect(item)}
                            className="px-4 py-3 hover:bg-emerald-50 cursor-pointer border-b border-gray-50 last:border-0 transition-colors text-sm text-gray-700 flex items-start gap-2"
                        >
                            <span className="mt-0.5 text-gray-400">📍</span>
                            <span>{item.display_name}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
