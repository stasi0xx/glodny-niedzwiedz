import React from 'react';

export interface AddressData {
    city: string;
    zip: string;
    street: string;
    buildingNumber: string;
    apartmentNumber?: string;
    floor?: string;
    accessCode?: string;
    notes?: string;
}

interface DeliveryAddressProps {
    address: AddressData;
    onChange: (field: keyof AddressData, value: string) => void;
    errors: Partial<Record<keyof AddressData, string>>;
}

export function DeliveryAddress({ address, onChange, errors }: DeliveryAddressProps) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                <span className="text-2xl">🏠</span>
                Gdzie dowieźć?
            </h3>

            <div className="space-y-4">
                {/* City & Zip Code */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Miasto *</label>
                        <input
                            type="text"
                            value={address.city}
                            onChange={(e) => onChange('city', e.target.value)}
                            className={`w-full p-3 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all ${errors.city ? 'border-red-500' : 'border-gray-200'
                                }`}
                            placeholder="np. Warszawa"
                        />
                        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Kod pocztowy *</label>
                        <input
                            type="text"
                            value={address.zip}
                            onChange={(e) => onChange('zip', e.target.value)}
                            className={`w-full p-3 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all ${errors.zip ? 'border-red-500' : 'border-gray-200'
                                }`}
                            placeholder="00-000"
                        />
                        {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip}</p>}
                    </div>
                </div>

                {/* Street & Numbers */}
                <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ulica *</label>
                        <input
                            type="text"
                            value={address.street}
                            onChange={(e) => onChange('street', e.target.value)}
                            className={`w-full p-3 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all ${errors.street ? 'border-red-500' : 'border-gray-200'
                                }`}
                            placeholder="np. Marszałkowska"
                        />
                        {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nr domu *</label>
                        <input
                            type="text"
                            value={address.buildingNumber}
                            onChange={(e) => onChange('buildingNumber', e.target.value)}
                            className={`w-full p-3 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all ${errors.buildingNumber ? 'border-red-500' : 'border-gray-200'
                                }`}
                        />
                        {errors.buildingNumber && <p className="text-red-500 text-xs mt-1">{errors.buildingNumber}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nr lokalu</label>
                        <input
                            type="text"
                            value={address.apartmentNumber}
                            onChange={(e) => onChange('apartmentNumber', e.target.value)}
                            className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all"
                        />
                    </div>
                </div>

                {/* Extra info */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Piętro</label>
                        <input
                            type="text"
                            value={address.floor}
                            onChange={(e) => onChange('floor', e.target.value)}
                            className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Kod do domofonu</label>
                        <input
                            type="text"
                            value={address.accessCode}
                            onChange={(e) => onChange('accessCode', e.target.value)}
                            className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Instrukcje dla kuriera</label>
                    <textarea
                        rows={3}
                        value={address.notes}
                        onChange={(e) => onChange('notes', e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all"
                        placeholder="np. Zostawić pod drzwiami, zadzwonić domofonem..."
                    />
                </div>
            </div>
        </div>
    );
}
