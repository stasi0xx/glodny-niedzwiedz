import React from 'react';
import { EmailLayout } from '../layout/EmailLayout';
import { emailStyles } from '../emailStyles';

interface PaymentConfirmationProps {
    orderId: string;
    customerName: string;
    totalAmount: string;
    paymentMethod: string;
    paymentDate: string;
    startDate: string;
    deliveryWindow: string;
    invoiceUrl?: string;
}

export const PaymentConfirmation: React.FC<PaymentConfirmationProps> = (props) => {
    return (
        <EmailLayout
            title={`Płatność potwierdzona ✅`}
            previewText={`Dziękujemy! Twoje zamówienie #${props.orderId} zostało opłacone. Kwota: ${props.totalAmount}.`}
        >
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: '#ecfdf5',
                    color: '#10b981',
                    fontSize: '32px',
                    marginBottom: '16px'
                }}>
                    ✅
                </div>
                <h1 style={emailStyles.h1}>Płatność potwierdzona!</h1>
                <p style={emailStyles.p}>
                    Dziękujemy, {props.customerName}. Twoja wpłata dotarła bezpiecznie.
                </p>
            </div>

            <div style={emailStyles.card}>
                <div style={emailStyles.cardRow}>
                    <span style={emailStyles.cardLabel}>Kwota:</span>
                    <span style={{ ...emailStyles.cardValue, fontSize: '18px', fontWeight: 'bold' }}>{props.totalAmount}</span>
                </div>
                <div style={emailStyles.cardRow}>
                    <span style={emailStyles.cardLabel}>Status:</span>
                    <span style={{ ...emailStyles.cardValue, color: '#10b981', fontWeight: 'bold' }}>OPŁACONE</span>
                </div>
                <div style={emailStyles.cardRow}>
                    <span style={emailStyles.cardLabel}>Metoda:</span>
                    <span style={emailStyles.cardValue}>{props.paymentMethod}</span>
                </div>
                <div style={emailStyles.cardRowLast}>
                    <span style={emailStyles.cardLabel}>Data:</span>
                    <span style={emailStyles.cardValue}>{props.paymentDate}</span>
                </div>
            </div>

            <h2 style={emailStyles.h2}>Co dalej? 🚀</h2>
            <div style={emailStyles.infoBox}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
                    <span style={{ fontSize: '20px' }}>👨‍🍳</span>
                    <div>
                        <strong>Przygotowanie</strong>
                        <div style={{ fontSize: '14px', color: '#4b5563' }}>Rozpoczynamy gotowanie dzień przed Twoją pierwszą dostawą.</div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <span style={{ fontSize: '20px' }}>📦</span>
                    <div>
                        <strong>Dostawa</strong>
                        <div style={{ fontSize: '14px', color: '#4b5563' }}>
                            Pierwsza paczka trafi do Ciebie <strong>{props.startDate}</strong>.<br />
                            Godziny dostaw: {props.deliveryWindow}.
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '32px' }}>
                <a href={`https://glodny-niedzwiedz.pl/zamowienie/status?id=${props.orderId}`} style={emailStyles.button}>
                    Panel Klienta
                </a>
            </div>

            {props.invoiceUrl && (
                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                    <a href={props.invoiceUrl} style={{ ...emailStyles.link, fontSize: '14px' }}>
                        Pobierz fakturę VAT
                    </a>
                </div>
            )}
        </EmailLayout>
    );
};
