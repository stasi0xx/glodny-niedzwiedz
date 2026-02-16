import React, { useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { OrderConfirmation } from '../emails/templates/OrderConfirmation';
import { PaymentConfirmation } from '../emails/templates/PaymentConfirmation';
import { Button } from '@/components/ui/Button';

interface EmailPreviewProps {
    data: any; // In a real app, strict typing would be better
}

type TemplateType = 'order' | 'payment';
type ViewMode = 'visual' | 'html';

export const EmailPreview: React.FC<EmailPreviewProps> = ({ data }) => {
    const [activeTemplate, setActiveTemplate] = useState<TemplateType>('order');
    const [viewMode, setViewMode] = useState<ViewMode>('visual');
    const [isSending, setIsSending] = useState(false);

    // Mock Data Enrichment
    const enrichedData = {
        orderId: '12345',
        customerName: data.name || 'Jan Kowalski',
        email: data.email || 'jan@example.com',
        dietName: data.dietName || 'Sport', // Default from params or fallback
        kcal: Number(data.kcal) || 2500,
        mealsCount: 5,
        daysCount: Number(data.days) || 20,
        startDate: data.startDate || '2024-01-01',
        endDate: '2024-01-20', // Mock calc
        pricePerDay: '65.00 zł',
        discount: '130.00 zł', // Mock
        totalPrice: data.price ? `${data.price} zł` : '1170.00 zł',
        deliveryAddress: 'ul. Kwiatowa 12/5',
        deliveryCity: 'Warszawa',
        deliveryNotes: 'Kod do domofonu: 1234',
        cutoffTime: '14:00',
        paymentMethod: 'BLIK',
        paymentDate: new Date().toLocaleDateString('pl-PL'),
        deliveryWindow: '02:00 – 06:00',
        invoiceUrl: '#',
    };

    const renderTemplate = (type: TemplateType) => {
        if (type === 'order') {
            return (
                <OrderConfirmation
                    orderId={enrichedData.orderId}
                    customerName={enrichedData.customerName}
                    dietName={enrichedData.dietName}
                    kcal={enrichedData.kcal}
                    mealsCount={enrichedData.mealsCount}
                    daysCount={enrichedData.daysCount}
                    startDate={enrichedData.startDate}
                    endDate={enrichedData.endDate}
                    pricePerDay={enrichedData.pricePerDay}
                    discount={enrichedData.discount}
                    totalPrice={enrichedData.totalPrice}
                    deliveryAddress={enrichedData.deliveryAddress}
                    deliveryCity={enrichedData.deliveryCity}
                    deliveryNotes={enrichedData.deliveryNotes}
                    cutoffTime={enrichedData.cutoffTime}
                />
            );
        }
        return (
            <PaymentConfirmation
                orderId={enrichedData.orderId}
                customerName={enrichedData.customerName}
                totalAmount={enrichedData.totalPrice}
                paymentMethod={enrichedData.paymentMethod}
                paymentDate={enrichedData.paymentDate}
                startDate={enrichedData.startDate}
                deliveryWindow={enrichedData.deliveryWindow}
                invoiceUrl={enrichedData.invoiceUrl}
            />
        );
    };

    const handleSendMock = async () => {
        setIsSending(true);
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: activeTemplate,
                    email: enrichedData.email,
                    data: enrichedData,
                }),
            });

            const result = await response.json();

            if (result.success) {
                alert(`Wysłano maila! ID: ${result.id}`);
            } else {
                alert(`Błąd wysyłania: ${result.error}`);
            }
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Wystąpił błąd podczas wysyłania maila.');
        } finally {
            setIsSending(false);
        }
    };

    const emailComponent = renderTemplate(activeTemplate);
    const htmlString = renderToStaticMarkup(emailComponent);

    return (
        <div className="bg-white border text-left font-sans text-gray-800 rounded-lg shadow-sm max-w-4xl mx-auto overflow-hidden">
            {/* Control Bar */}
            <div className="bg-gray-50 border-b p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="flex gap-2">
                    <button
                        onClick={() => setActiveTemplate('order')}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTemplate === 'order'
                            ? 'bg-white text-emerald-600 shadow-sm ring-1 ring-gray-200'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        Potwierdzenie Zamówienia
                    </button>
                    <button
                        onClick={() => setActiveTemplate('payment')}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTemplate === 'payment'
                            ? 'bg-white text-emerald-600 shadow-sm ring-1 ring-gray-200'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        Potwierdzenie Płatności
                    </button>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setViewMode(viewMode === 'visual' ? 'html' : 'visual')}
                    >
                        {viewMode === 'visual' ? 'Pokaż HTML' : 'Pokaż Podgląd'}
                    </Button>
                    <Button
                        size="sm"
                        onClick={handleSendMock}
                        disabled={isSending}
                    >
                        {isSending ? 'Wysyłanie...' : 'Wyślij Test (Mock)'}
                    </Button>
                </div>
            </div>

            {/* Preview Area */}
            <div className="bg-gray-100 p-8 min-h-[600px] overflow-auto">
                {viewMode === 'visual' ? (
                    <div className="mx-auto transform transition-all duration-300 origin-top">
                        {emailComponent}
                    </div>
                ) : (
                    <div className="bg-gray-900 rounded-lg p-6 shadow-inner w-full max-w-4xl mx-auto">
                        <pre className="text-xs text-green-400 font-mono overflow-auto whitespace-pre-wrap break-all max-h-[600px]">
                            {htmlString}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
};
