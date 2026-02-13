import React from 'react';
import { Container } from '@/components/ui/Container';
import { DeliveryChecker } from '@/components/features/DeliveryChecker';
import { deliveryZones } from '@/data/deliveryZones';

export default function DeliveryPage() {
    return (
        <div className="py-20 bg-gray-50 min-h-[60vh]">
            <Container>
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Gdzie dowieziemy Twoją dietę?</h1>
                    <p className="text-lg text-gray-600">
                        Realizujemy dostawy w największych miastach Polski i ich okolicach. Sprawdź, czy jesteśmy u Ciebie.
                    </p>
                </div>

                <div className="max-w-xl mx-auto mb-20">
                    <DeliveryChecker />
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Lista obsługiwanych miast:</h2>
                        <div className="flex flex-wrap gap-2">
                            {deliveryZones.allowedCities.map(city => (
                                <span key={city} className="px-4 py-2 bg-white rounded-full border border-gray-200 text-gray-700 shadow-sm">
                                    {city}
                                </span>
                            ))}
                            <span className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 italic">
                                + okolice (sprawdź kod)
                            </span>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-6">Harmonogram dostaw</h2>
                        <ul className="space-y-4 text-gray-600">
                            <li className="flex gap-3">
                                <span className="text-emerald-500 font-bold">🌙</span>
                                <div>
                                    <span className="font-semibold text-gray-900">Dostawa nocna (18:00 - 23:00)</span>
                                    <p className="text-sm">Dostarczamy dzień przed spożyciem. Idealne, jeśli chcesz mieć gotowe śniadanie zaraz po przebudzeniu.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-emerald-500 font-bold">☀️</span>
                                <div>
                                    <span className="font-semibold text-gray-900">Dostawa poranna (2:00 - 7:00)</span>
                                    <p className="text-sm">Dostawa pod same drzwi w godzinach wczesnoporannych (dostawa bezkontaktowa).</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </Container>
        </div>
    );
}
