import React from 'react';

interface EmailPreviewProps {
    type: 'order' | 'payment';
    data: any;
}

export const EmailPreview: React.FC<EmailPreviewProps> = ({ type, data }) => {
    const today = new Date().toLocaleDateString('pl-PL');
    const orderId = Math.floor(Math.random() * 100000);

    if (type === 'order') {
        return (
            <div className="bg-white border text-left font-sans text-gray-800 p-8 rounded-lg shadow-sm max-w-xl mx-auto">
                <div className="border-b pb-4 mb-4">
                    <h1 className="text-xl font-bold text-gray-900">Potwierdzenie zamówienia #{orderId}</h1>
                    <p className="text-sm text-gray-500">Data: {today}</p>
                </div>
                <p className="mb-4">Cześć {data.name}!</p>
                <p className="mb-4">Dziękujemy za złożenie zamówienia w cateringu Głodny Niedźwiedź. Twoja dieta niedługo do Ciebie wyruszy.</p>

                <div className="bg-gray-50 p-4 rounded mb-6 text-sm">
                    <p><strong>Dieta:</strong> {data.dietName}</p>
                    <p><strong>Wariant:</strong> {data.kcal} kcal</p>
                    <p><strong>Start:</strong> {data.startDate}</p>
                    <p><strong>Dni:</strong> {data.days}</p>
                </div>

                <p className="mb-4">W razie pytań, odpowiedz na tego maila.</p>
                <p className="text-sm text-gray-500">Zespół Głodny Niedźwiedź</p>
            </div>
        );
    }

    if (type === 'payment') {
        return (
            <div className="bg-white border text-left font-sans text-gray-800 p-8 rounded-lg shadow-sm max-w-xl mx-auto">
                <div className="border-b pb-4 mb-4">
                    <h1 className="text-xl font-bold text-gray-900">Płatność przyjęta ✅</h1>
                </div>
                <p className="mb-4">Otrzymaliśmy Twoją wpłatę w wysokości <strong>{data.price} zł</strong>.</p>
                <p className="mb-6">Wszystko jest gotowe. Kurierzy już grzeją silniki!</p>
                <div className="text-center">
                    <a href="#" className="inline-block px-6 py-2 bg-emerald-600 text-white rounded-full no-underline text-sm font-bold">
                        Panel Klienta
                    </a>
                </div>
                <p className="text-sm text-gray-500 mt-6 pt-4 border-t">PayU S.A. dla Głodny Niedźwiedź</p>
            </div>
        );
    }

    return null;
};
