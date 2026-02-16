import React from 'react';
import { EmailLayout } from '../layout/EmailLayout';
import { emailStyles } from '../emailStyles';

interface OrderConfirmationProps {
    orderId: string;
    customerName: string;
    dietName: string;
    kcal: number;
    mealsCount: number;
    daysCount: number;
    startDate: string;
    endDate: string;
    pricePerDay: string;
    discount?: string;
    totalPrice: string;
    deliveryAddress: string;
    deliveryCity: string;
    deliveryNotes?: string;
    cutoffTime: string;
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = (props) => {
    return (
        <EmailLayout
            title={`Potwierdzenie zamówienia #${props.orderId}`}
            previewText={`Twoje zamówienie #${props.orderId} zostało przyjęte. Start: ${props.startDate}.`}
        >
            <h1 style={emailStyles.h1}>Cześć {props.customerName}! 👋</h1>
            <p style={emailStyles.p}>
                Dziękujemy za wybór Głodnego Niedźwiedzia! Twoje zamówienie zostało przyjęte i czeka na płatność (lub potwierdzenie).
            </p>

            <div style={emailStyles.card}>
                <h2 style={{ ...emailStyles.h2, marginTop: '0', marginBottom: '16px' }}>Szczegóły zamówienia</h2>
                <div style={emailStyles.cardRow}>
                    <span style={emailStyles.cardLabel}>Numer:</span>
                    <span style={emailStyles.cardValue}><strong>#{props.orderId}</strong></span>
                </div>
                <div style={emailStyles.cardRow}>
                    <span style={emailStyles.cardLabel}>Dieta:</span>
                    <span style={emailStyles.cardValue}>{props.dietName}</span>
                </div>
                <div style={emailStyles.cardRow}>
                    <span style={emailStyles.cardLabel}>Kaloryczność:</span>
                    <span style={emailStyles.cardValue}>{props.kcal} kcal</span>
                </div>
                <div style={emailStyles.cardRow}>
                    <span style={emailStyles.cardLabel}>Posiłki:</span>
                    <span style={emailStyles.cardValue}>{props.mealsCount} posiłków</span>
                </div>
                <div style={emailStyles.cardRow}>
                    <span style={emailStyles.cardLabel}>Czas trwania:</span>
                    <span style={emailStyles.cardValue}>{props.daysCount} dni</span>
                </div>
                <div style={emailStyles.cardRow}>
                    <span style={emailStyles.cardLabel}>Termin:</span>
                    <span style={emailStyles.cardValue}>{props.startDate} - {props.endDate}</span>
                </div>
                <div style={emailStyles.cardRowLast}>
                    <span style={emailStyles.cardLabel}>Adres:</span>
                    <span style={emailStyles.cardValue}>{props.deliveryAddress}, {props.deliveryCity}</span>
                </div>
            </div>

            <div style={emailStyles.infoBox}>
                <strong>🚚 Instrukcje dla dostawcy:</strong><br />
                {props.deliveryNotes || 'Brak dodatkowych instrukcji.'}<br />
                <em style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginTop: '8px' }}>
                    Dostawy realizujemy w godzinach 02:00 – 08:00 rano.
                </em>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <a href="https://glodny-niedzwiedz.pl/zamowienie/status" style={emailStyles.button}>
                    Zobacz szczegóły zamówienia
                </a>
            </div>

            <div style={emailStyles.card}>
                <h3 style={{ ...emailStyles.h2, margin: '0 0 16px 0', fontSize: '18px' }}>Podsumowanie kosztów</h3>
                <div style={emailStyles.cardRow}>
                    <span style={emailStyles.cardLabel}>Cena za dzień:</span>
                    <span style={emailStyles.cardValue}>{props.pricePerDay}</span>
                </div>
                {props.discount && (
                    <div style={emailStyles.cardRow}>
                        <span style={emailStyles.cardLabel}>Rabat:</span>
                        <span style={{ ...emailStyles.cardValue, ...emailStyles.highlightGreen }}>-{props.discount}</span>
                    </div>
                )}
                <div style={{ ...emailStyles.cardRow, borderBottom: 'none', paddingTop: '8px', fontSize: '18px' }}>
                    <span style={{ ...emailStyles.cardLabel, fontWeight: '800' }}>Do zapłaty:</span>
                    <span style={{ ...emailStyles.cardValue, fontWeight: '800', color: '#10b981' }}>{props.totalPrice}</span>
                </div>
            </div>

            <p style={{ ...emailStyles.p, fontSize: '14px', color: '#6b7280', textAlign: 'center' }}>
                Zmiany w diecie możesz wprowadzać do godziny {props.cutoffTime} dnia poprzedzającego dostawę.
            </p>
        </EmailLayout>
    );
};
