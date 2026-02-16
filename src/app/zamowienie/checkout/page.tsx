'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { diets } from '@/data/diets';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import AddressAutocomplete from '@/components/checkout/AddressAutocomplete';
import { supabase } from '@/lib/supabaseClient';

// Dynamic import for Map to avoid SSR issues
const MapLocationPicker = dynamic(() => import('@/components/checkout/LocationPicker'), {
    ssr: false,
    loading: () => <div className="h-[300px] w-full bg-gray-100 animate-pulse rounded-xl flex items-center justify-center text-gray-400">Ładowanie mapy...</div>
});

type CheckoutStep = 'contact' | 'address' | 'summary';

function CheckoutContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // Order Data from URL
    const dietId = searchParams.get('dietId');
    const kcal = searchParams.get('kcal');
    const days = searchParams.get('days');
    const startDate = searchParams.get('startDate');
    const price = searchParams.get('price');

    const selectedDiet = diets.find(d => d.id === dietId);

    // Form State
    const [step, setStep] = useState<CheckoutStep>('contact');
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        firstName: '',
        lastName: '',
        street: '',
        city: '',
        zip: '',
        notes: '',
        // Invoice
        wantsInvoice: false,
        nip: '',
        companyName: '',
        // Payment & Consents
        paymentMethod: 'blik',
        consentRegulations: false,
        consentPrivacy: false,
        consentMarketing: false
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [isCheckingDelivery, setIsCheckingDelivery] = useState(false);
    const [deliveryStatus, setDeliveryStatus] = useState<'idle' | 'ok' | 'error'>('idle');

    // Map State
    const [coordinates, setCoordinates] = useState<[number, number] | null>(null);

    // Regex Patterns
    const patterns = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^(?:\+48)?\s?\d{3}\s?\d{3}\s?\d{3}$/,
        zip: /^\d{2}-\d{3}$/, // XX-XXX
        nip: /^\d{10}$/ // Simple 10 digit check
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error on change
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }

        // Reset delivery status if zip changes
        if (name === 'zip') {
            setDeliveryStatus('idle');
        }
    };

    // Geocoding: Forward (Address -> Coords)
    const geocodeAddress = async () => {
        if (!formData.city && !formData.zip) return;

        try {
            // Build query based on available fields
            const parts = [];
            if (formData.street) parts.push(formData.street);
            if (formData.zip) parts.push(formData.zip);
            if (formData.city) parts.push(formData.city);

            if (parts.length === 0) return;

            const query = parts.join(', ');
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=pl`);
            const data = await response.json();

            if (data && data.length > 0) {
                const { lat, lon } = data[0];
                setCoordinates([parseFloat(lat), parseFloat(lon)]);
            }
        } catch (error) {
            console.error("Geocoding failed", error);
        }
    };

    // Geocoding: Reverse (Coords -> Address)
    const handleMapClick = async (lat: number, lng: number) => {
        setCoordinates([lat, lng]);

        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
            const data = await response.json();

            if (data && data.address) {
                const addr = data.address;
                const newZip = addr.postcode || '';
                const newCity = addr.city || addr.town || addr.village || '';

                // Construct street with number if available
                let newStreet = addr.road || '';
                if (addr.house_number) {
                    newStreet += ` ${addr.house_number}`;
                }

                setFormData(prev => ({
                    ...prev,
                    city: newCity,
                    zip: newZip,
                    street: newStreet
                }));

                // Clear errors if present
                setErrors(prev => {
                    const next = { ...prev };
                    if (newCity) delete next.city;
                    if (newZip) delete next.zip;
                    if (newStreet) delete next.street;
                    return next;
                });

                // If zip is filled, we could trigger delivery check, or let the user click 'Next'
                if (newZip) {
                    setDeliveryStatus('idle');
                }
            }
        } catch (error) {
            console.error("Reverse geocoding failed", error);
        }
    };

    const handleAutocompleteSelect = ({ street, city, zip, lat, lng }: { street: string, city: string, zip: string, lat: number, lng: number }) => {
        setCoordinates([lat, lng]);
        setFormData(prev => ({
            ...prev,
            street,
            city,
            zip
        }));
        setDeliveryStatus('idle');

        // Clear errors
        setErrors(prev => {
            const next = { ...prev };
            if (city) delete next.city;
            if (zip) delete next.zip;
            if (street) delete next.street;
            return next;
        });
    };

    const validateStep1 = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.firstName) newErrors.firstName = 'Wymagane';
        if (!formData.lastName) newErrors.lastName = 'Wymagane';

        if (!formData.email) newErrors.email = 'Wymagane';
        else if (!patterns.email.test(formData.email)) newErrors.email = 'Błędny format email';

        if (!formData.phone) newErrors.phone = 'Wymagane';
        else if (!patterns.phone.test(formData.phone)) newErrors.phone = 'Wymagane 9 cyfr';

        if (formData.wantsInvoice) {
            if (!formData.nip) newErrors.nip = 'Wymagane';
            else if (!patterns.nip.test(formData.nip.replace(/\D/g, ''))) newErrors.nip = 'NIP musi mieć 10 cyfr';
            if (!formData.companyName) newErrors.companyName = 'Wymagane';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Mock Delivery Zones Database
    const DELIVERY_ZONES = [
        { city: 'Warszawa', zipPrefixes: ['00', '01', '02', '03', '04', '05'] },
        { city: 'Kraków', zipPrefixes: ['30', '31'] },
        { city: 'Wrocław', zipPrefixes: ['50', '51', '52', '53', '54'] },
        { city: 'Poznań', zipPrefixes: ['60', '61'] },
        { city: 'Gdańsk', zipPrefixes: ['80'] },
        { city: 'Łódź', zipPrefixes: ['90', '91', '92'] },
        { city: 'Katowice', zipPrefixes: ['40'] },
        { city: 'Ruda Śląska', zipPrefixes: ['40', '41'] },
    ];

    const validateStep2 = async () => {
        const newErrors: Record<string, string> = {};

        if (!formData.city) newErrors.city = 'Wymagane';
        if (!formData.street) newErrors.street = 'Wymagane';

        if (!formData.zip) newErrors.zip = 'Wymagane';
        else if (!patterns.zip.test(formData.zip)) newErrors.zip = 'Format XX-XXX';

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return false;

        // Check Delivery
        setIsCheckingDelivery(true);
        const deliveryCheck = await checkDeliveryAvailability(formData.zip, formData.city);
        setIsCheckingDelivery(false);

        if (!deliveryCheck.canDeliver) {
            setDeliveryStatus('error');
            if (deliveryCheck.reason === 'zone') {
                setErrors(prev => ({ ...prev, zip: 'Przykro nam, jeszcze tam nie dowozimy 🐻' }));
            } else if (deliveryCheck.reason === 'city_mismatch') {
                setErrors(prev => ({ ...prev, city: `Ten kod pocztowy wskazuje na: ${deliveryCheck.expectedCity}` }));
            }
            return false;
        }

        setDeliveryStatus('ok');
        return true;
    };

    // Robust Delivery Check
    const checkDeliveryAvailability = async (zip: string, city: string): Promise<{ canDeliver: boolean, reason?: 'zone' | 'city_mismatch', expectedCity?: string }> => {
        await new Promise(r => setTimeout(r, 800)); // Sim network

        const prefix = zip.substring(0, 2);
        const zone = DELIVERY_ZONES.find(z => z.zipPrefixes.includes(prefix));

        if (!zone) {
            return { canDeliver: false, reason: 'zone' };
        }

        // Simple fuzzy check (case insensitive)
        const userCityNorm = city.toLowerCase().trim();
        const zoneCityNorm = zone.city.toLowerCase();

        if (!userCityNorm.includes(zoneCityNorm) && !zoneCityNorm.includes(userCityNorm)) {
            return { canDeliver: false, reason: 'city_mismatch', expectedCity: zone.city };
        }

        return { canDeliver: true };
    };

    const nextStep = async () => {
        if (step === 'contact') {
            if (validateStep1()) setStep('address');
        } else if (step === 'address') {
            const isValid = await validateStep2();
            if (isValid) setStep('summary');
        }
    };

    const handlePayment = async () => {
        // Step 3 Validation (Consents)
        if (!formData.consentRegulations || !formData.consentPrivacy) {
            alert('Proszę zaakceptować wymagane zgody.');
            return;
        }

        setIsProcessing(true);

        try {
            // 1. Create or Get Customer ID using RPC
            const { data: customerId, error: customerError } = await supabase.rpc('get_or_create_customer', {
                p_email: formData.email,
                p_first_name: formData.firstName,
                p_last_name: formData.lastName,
                p_phone: formData.phone,
                p_marketing_consent: formData.consentMarketing
            });

            if (customerError) throw customerError;
            if (!customerId) throw new Error("Failed to create customer");

            // 2. Create Address
            // Generate UUID manually to avoid needing RETURNING permission issues
            const addressId = crypto.randomUUID();

            const { error: addressError } = await supabase
                .from('addresses')
                .insert({
                    id: addressId, // Explicit ID
                    customer_id: customerId,
                    city: formData.city,
                    postal_code: formData.zip,
                    street: formData.street,
                    building_no: '1', // Hardcoded for MVP
                    delivery_notes: formData.notes,
                    lat: coordinates ? coordinates[0] : null,
                    lng: coordinates ? coordinates[1] : null,
                    label: 'Dom'
                });

            if (addressError) throw addressError;

            // 3. Find Diet Variant
            if (!selectedDiet) throw new Error("No diet selected");

            const { data: dietData } = await supabase
                .from('diets')
                .select('id')
                .eq('slug', selectedDiet.slug)
                .single();

            if (!dietData) throw new Error("Diet not found in DB");

            const targetMeals = 5;
            const targetKcal = parseInt(kcal || '2000');

            let { data: variantData } = await supabase
                .from('diet_variants')
                .select('id, price_per_day')
                .eq('diet_id', dietData.id)
                .eq('kcal', targetKcal)
                .eq('meals_count', targetMeals)
                .maybeSingle();

            if (!variantData) {
                const { data: anyVariant } = await supabase
                    .from('diet_variants')
                    .select('id, price_per_day')
                    .eq('diet_id', dietData.id)
                    .eq('kcal', targetKcal)
                    .limit(1)
                    .maybeSingle();

                variantData = anyVariant;
            }

            if (!variantData) {
                throw new Error("Diet variant not available");
            }

            // 4. Create Order
            const orderId = crypto.randomUUID();
            const orderEndDate = new Date(startDate || new Date());
            orderEndDate.setDate(orderEndDate.getDate() + parseInt(days || '10'));

            const { error: orderError } = await supabase
                .from('orders')
                .insert({
                    id: orderId, // Explicit ID
                    customer_id: customerId,
                    address_id: addressId,
                    diet_variant_id: variantData.id,
                    status: 'pending_payment',
                    start_date: startDate || new Date().toISOString(),
                    end_date: orderEndDate.toISOString(),
                    customer_notes: formData.notes,
                    internal_notes: formData.wantsInvoice ? `Faktura: ${formData.companyName} NIP: ${formData.nip}` : null,
                    subtotal: parseFloat(price || '0'),
                    discount_amount: 0,
                    total: parseFloat(price || '0'),
                    currency: 'PLN'
                });

            if (orderError) throw orderError;

            // Success!!
            const successParams = new URLSearchParams({
                dietName: selectedDiet?.name || 'Dieta',
                kcal: kcal || '',
                days: days || '',
                startDate: startDate || '',
                price: price || '',
                email: formData.email,
                name: formData.firstName,
                orderId: orderId
            });
            router.push(`/zamowienie/sukces?${successParams.toString()}`);

        } catch (error: any) {
            console.error("Order processing error:", error);
            alert("Błąd: " + (error.message || "Wystąpił błąd"));
        } finally {
            setIsProcessing(false);
        }
    };

    const getInputClass = (name: string) => `input-base ${errors[name] ? 'border-red-500 ring-1 ring-red-500 bg-red-50' : ''}`;

    if (!selectedDiet) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Ups, pusty koszyk!</h1>
                <p className="text-gray-600 mb-8">Wybierz dietę, aby złożyć zamówienie.</p>
                <Link href="/oferta">
                    <Button>Wróć do oferty</Button>
                </Link>
            </div>
        </div>
    );

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <Container>
                <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-8">

                    {/* Left Column: Form Steps */}
                    <div className="lg:col-span-2">
                        {/* Steps Indicator */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                            <div className="flex justify-between relative">
                                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-0 -translate-y-1/2 rounded-full"></div>
                                <div
                                    className={`absolute top-1/2 left-0 h-1 bg-emerald-500 -z-0 -translate-y-1/2 rounded-full transition-all duration-500 ease-in-out`}
                                    style={{ width: step === 'contact' ? '15%' : step === 'address' ? '50%' : '100%' }}
                                ></div>

                                {['contact', 'address', 'summary'].map((s, idx) => (
                                    <div key={s} className={`relative z-10 flex flex-col items-center gap-2 ${step === s ? 'opacity-100' : 'opacity-70'}`}>
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 bg-white transition-colors duration-300 ${step === s || (idx < ['contact', 'address', 'summary'].indexOf(step))
                                            ? 'border-emerald-500 text-emerald-600 font-bold'
                                            : 'border-gray-200 text-gray-400'
                                            }`}>
                                            {idx + 1}
                                        </div>
                                        <span className="text-xs font-medium text-gray-600">
                                            {s === 'contact' ? 'Dane' : s === 'address' ? 'Adres' : 'Płatność'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[400px]">
                            {/* STEP 1: CONTACT */}
                            {step === 'contact' && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
                                    <div className="border-b border-gray-100 pb-4 mb-4">
                                        <h2 className="text-2xl font-bold text-gray-800">Dane zamawiającego</h2>
                                        <p className="text-gray-500 text-sm">Do kogo należy numer telefonu i mail?</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-500 uppercase">Imię</label>
                                            <input name="firstName" placeholder="Jan" className={getInputClass('firstName')} onChange={handleChange} value={formData.firstName} />
                                            {errors.firstName && <span className="text-xs text-red-500">{errors.firstName}</span>}
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-500 uppercase">Nazwisko</label>
                                            <input name="lastName" placeholder="Kowalski" className={getInputClass('lastName')} onChange={handleChange} value={formData.lastName} />
                                            {errors.lastName && <span className="text-xs text-red-500">{errors.lastName}</span>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-500 uppercase">E-mail</label>
                                            <input name="email" type="email" placeholder="jan@example.com" className={getInputClass('email')} onChange={handleChange} value={formData.email} />
                                            {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-500 uppercase">Telefon</label>
                                            <input name="phone" type="tel" placeholder="123 456 789" className={getInputClass('phone')} onChange={handleChange} value={formData.phone} maxLength={12} />
                                            {errors.phone && <span className="text-xs text-red-500">{errors.phone}</span>}
                                        </div>
                                    </div>

                                    {/* Invoice Toggle */}
                                    <div className="border-t border-gray-100 pt-4 mt-6">
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <div className={`w-10 h-6 rounded-full p-1 transition-colors duration-200 ${formData.wantsInvoice ? 'bg-emerald-500' : 'bg-gray-200'}`}>
                                                <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 ${formData.wantsInvoice ? 'translate-x-4' : 'translate-x-0'}`} />
                                            </div>
                                            <input type="checkbox" name="wantsInvoice" checked={formData.wantsInvoice} onChange={handleChange} className="hidden" />
                                            <span className="font-medium text-gray-700 group-hover:text-emerald-600 transition-colors">Chcę otrzymać fakturę VAT</span>
                                        </label>

                                        {formData.wantsInvoice && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 animate-in slide-in-from-top-2 fade-in">
                                                <div className="space-y-1">
                                                    <input name="nip" placeholder="NIP (10 cyfr)" className={getInputClass('nip')} onChange={handleChange} value={formData.nip} maxLength={10} />
                                                    {errors.nip && <span className="text-xs text-red-500">{errors.nip}</span>}
                                                </div>
                                                <div className="space-y-1">
                                                    <input name="companyName" placeholder="Nazwa firmy" className={getInputClass('companyName')} onChange={handleChange} value={formData.companyName} />
                                                    {errors.companyName && <span className="text-xs text-red-500">{errors.companyName}</span>}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="pt-8 flex justify-end">
                                        <Button onClick={nextStep} className="w-full md:w-auto px-12">
                                            Dalej: Adres <span className="ml-2">→</span>
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* STEP 2: ADDRESS */}
                            {step === 'address' && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <div className="border-b border-gray-100 pb-4 mb-4 flex justify-between items-end">
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-800">Adres dostawy</h2>
                                            <p className="text-gray-500 text-sm">Gdzie mamy dostarczać pudełka?</p>
                                        </div>
                                        {/* Status Badge */}
                                        {deliveryStatus === 'ok' && (
                                            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold border border-green-100 animate-in fade-in zoom-in">
                                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                                Dowozimy tutaj! ✅
                                            </div>
                                        )}
                                    </div>

                                    {/* Map Component */}
                                    <div className="mb-6 space-y-4">
                                        <AddressAutocomplete onSelect={handleAutocompleteSelect} />

                                        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-inner">
                                            <Suspense fallback={<div className="h-[300px] w-full bg-gray-50 flex items-center justify-center text-gray-400">Ładowanie mapy...</div>}>
                                                <MapLocationPicker
                                                    position={coordinates}
                                                    onLocationSelect={handleMapClick}
                                                />
                                            </Suspense>
                                        </div>
                                        <p className="text-[10px] text-gray-400 mt-1 text-center">Możesz kliknąć na mapie, aby automatycznie uzupełnić adres.</p>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="col-span-1 space-y-1">
                                            <label className="text-xs font-bold text-gray-500 uppercase">Kod</label>
                                            <input name="zip" placeholder="00-000" className={getInputClass('zip')} onChange={handleChange} onBlur={geocodeAddress} value={formData.zip} maxLength={6} />
                                            {errors.zip && <span className="text-xs text-red-500">{errors.zip}</span>}
                                        </div>
                                        <div className="col-span-2 space-y-1">
                                            <label className="text-xs font-bold text-gray-500 uppercase">Miasto</label>
                                            <input name="city" placeholder="Warszawa" className={getInputClass('city')} onChange={handleChange} onBlur={geocodeAddress} value={formData.city} />
                                            {errors.city && <span className="text-xs text-red-500">{errors.city}</span>}
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Ulica i numer</label>
                                        <input name="street" placeholder="Słoneczna 15/4a" className={getInputClass('street')} onChange={handleChange} onBlur={geocodeAddress} value={formData.street} />
                                        {errors.street && <span className="text-xs text-red-500">{errors.street}</span>}
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Instrukcje (opcjonalne)</label>
                                        <textarea
                                            name="notes"
                                            placeholder="Kod do domofonu, piętro..."
                                            className="input-base w-full min-h-[80px]"
                                            onChange={handleChange}
                                            value={formData.notes}
                                        />
                                    </div>

                                    <div className="pt-8 flex justify-between items-center">
                                        <Button variant="ghost" onClick={() => setStep('contact')}>← Wróć</Button>
                                        <Button onClick={nextStep} disabled={isCheckingDelivery} className="w-full md:w-auto px-12">
                                            {isCheckingDelivery ? 'Sprawdzam strefę...' : 'Dalej: Podsumowanie →'}
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* STEP 3: SUMMARY */}
                            {step === 'summary' && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <div className="border-b border-gray-100 pb-4">
                                        <h2 className="text-2xl font-bold text-gray-800">Podsumowanie i płatność</h2>
                                        <p className="text-gray-500 text-sm">Sprawdź dane i wybierz metodę płatności.</p>
                                    </div>

                                    {/* Data Review */}
                                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="font-bold text-gray-800">Twoje dane</h3>
                                            <button onClick={() => setStep('contact')} className="text-xs text-emerald-600 font-bold hover:underline">Edytuj</button>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-y-2 text-sm text-gray-600">
                                            <p><span className="font-semibold text-gray-900">Odbiorca:</span> {formData.firstName} {formData.lastName}</p>
                                            <p><span className="font-semibold text-gray-900">Adres:</span> {formData.street}, {formData.zip} {formData.city}</p>
                                            <p><span className="font-semibold text-gray-900">Email:</span> {formData.email}</p>
                                            <p><span className="font-semibold text-gray-900">Telefon:</span> {formData.phone}</p>
                                            {formData.notes && <p className="md:col-span-2 mt-2"><span className="font-semibold text-gray-900">Uwagi:</span> {formData.notes}</p>}
                                            {formData.wantsInvoice && <p className="md:col-span-2 mt-2 text-xs text-gray-500 italic">Faktura na: {formData.companyName} ({formData.nip})</p>}
                                        </div>
                                    </div>

                                    {/* Payment Methods */}
                                    <div>
                                        <h3 className="font-bold text-gray-800 mb-4">Metoda płatności</h3>
                                        <div className="space-y-3">
                                            <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.paymentMethod === 'blik' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-emerald-200'}`}>
                                                <input type="radio" name="paymentMethod" value="blik" checked={formData.paymentMethod === 'blik'} onChange={handleChange} className="w-5 h-5 text-emerald-600 focus:ring-emerald-500" />
                                                <div className="flex-1">
                                                    <span className="font-bold text-gray-900 block">BLIK</span>
                                                    <span className="text-xs text-gray-500">Szybka płatność kodem</span>
                                                </div>
                                                <div className="font-bold text-2xl tracking-widest text-gray-400">BLIK</div>
                                            </label>

                                            <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.paymentMethod === 'card' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-emerald-200'}`}>
                                                <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleChange} className="w-5 h-5 text-emerald-600 focus:ring-emerald-500" />
                                                <div className="flex-1">
                                                    <span className="font-bold text-gray-900 block">Karta płatnicza</span>
                                                    <span className="text-xs text-gray-500">Visa, Mastercard, Apple Pay</span>
                                                </div>
                                                <div className="flex gap-2 text-gray-400">VISA / MC</div>
                                            </label>

                                            <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.paymentMethod === 'transfer' ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-emerald-200'}`}>
                                                <input type="radio" name="paymentMethod" value="transfer" checked={formData.paymentMethod === 'transfer'} onChange={handleChange} className="w-5 h-5 text-emerald-600 focus:ring-emerald-500" />
                                                <div className="flex-1">
                                                    <span className="font-bold text-gray-900 block">Szybki przelew</span>
                                                    <span className="text-xs text-gray-500">Przelewy24 / PayU</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Consents */}
                                    <div className="space-y-3 pt-4 border-t border-gray-100">
                                        <label className="flex items-start gap-3 cursor-pointer">
                                            <input type="checkbox" name="consentRegulations" checked={formData.consentRegulations} onChange={handleChange} className="mt-1 w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500" />
                                            <span className="text-sm text-gray-600">
                                                Akceptuję <Link href="/regulamin" target="_blank" className="text-emerald-600 underline">Regulamin</Link> sklepu internetowego (wymagane).
                                            </span>
                                        </label>
                                        <label className="flex items-start gap-3 cursor-pointer">
                                            <input type="checkbox" name="consentPrivacy" checked={formData.consentPrivacy} onChange={handleChange} className="mt-1 w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500" />
                                            <span className="text-sm text-gray-600">
                                                Zapoznałem/am się z <Link href="/polityka-prywatnosci" target="_blank" className="text-emerald-600 underline">Polityką Prywatności</Link> (wymagane).
                                            </span>
                                        </label>
                                        <label className="flex items-start gap-3 cursor-pointer">
                                            <input type="checkbox" name="consentMarketing" checked={formData.consentMarketing} onChange={handleChange} className="mt-1 w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500" />
                                            <span className="text-sm text-gray-600">
                                                Chcę otrzymywać informacje o promocjach i nowościach (opcjonalne).
                                            </span>
                                        </label>
                                    </div>

                                    <div className="pt-8 flex justify-between items-center">
                                        <Button variant="ghost" onClick={() => setStep('address')} disabled={isProcessing}>← Wróć</Button>
                                        <Button onClick={handlePayment} disabled={!formData.consentRegulations || !formData.consentPrivacy || isProcessing} className="w-full md:w-2/3 py-4 text-lg shadow-lg shadow-emerald-200">
                                            {isProcessing ? (
                                                <span className="flex items-center gap-2">
                                                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                    Przetwarzanie...
                                                </span>
                                            ) : `Zapłać ${price} zł`}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Order Summary (Sticky) */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-8">
                            <h3 className="font-bold text-gray-400 text-xs uppercase tracking-widest mb-6">Twoje zamówienie</h3>

                            <div className="flex items-start gap-4 mb-6">
                                <div className={`w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center text-3xl shadow-inner`}>
                                    {selectedDiet.icon || '🥗'}
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-gray-900 leading-tight mb-1">{selectedDiet.name}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase rounded-full tracking-wide">
                                            {selectedDiet.tags[0]}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between items-center py-3 border-t border-gray-50">
                                    <span className="text-gray-500">Kaloryczność</span>
                                    <span className="font-bold text-gray-900">{kcal} kcal</span>
                                </div>
                                <div className="flex justify-between items-center py-3 border-t border-gray-50">
                                    <span className="text-gray-500">Długość diety</span>
                                    <span className="font-bold text-gray-900">{days} dni</span>
                                </div>
                                <div className="flex justify-between items-center py-3 border-t border-gray-50">
                                    <span className="text-gray-500">Start dostaw</span>
                                    <span className="font-bold text-gray-900">{startDate}</span>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t-2 border-dashed border-gray-100">
                                <div className="flex justify-between items-end">
                                    <span className="text-gray-500 font-medium">Do zapłaty:</span>
                                    <span className="text-3xl font-bold text-emerald-600">{price} zł</span>
                                </div>
                                <p className="text-xs text-gray-400 text-right mt-1">Cena zawiera VAT 8%</p>
                            </div>

                            <div className="mt-6 bg-blue-50 p-4 rounded-xl flex gap-3 items-start">
                                <span className="text-xl">🛡️</span>
                                <p className="text-xs text-blue-800 leading-relaxed">
                                    <strong>Gwarancja świeżości.</strong> Jeśli cokolwiek będzie nie tak, zwrócimy Ci pieniądze za ten dzień. Bez pytań.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </Container>
            <style jsx global>{`
                .input-base {
                    @apply w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-300 text-gray-700;
                }
            `}</style>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center p-12 text-emerald-600 font-bold">Ładowanie kasy...</div>}>
            <CheckoutContent />
        </Suspense>
    );
}
