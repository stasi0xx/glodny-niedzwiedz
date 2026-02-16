import React from 'react';
import { emailStyles } from '../emailStyles';

interface EmailLayoutProps {
    title: string;
    previewText?: string;
    children: React.ReactNode;
}

export const EmailLayout: React.FC<EmailLayoutProps> = ({ title, previewText, children }) => {
    return (
        <div style={emailStyles.body}>
            {/* Hidden Preview Text */}
            <div style={{ display: 'none', maxHeight: '0px', overflow: 'hidden' }}>
                {previewText || title}
                {/* Zeros width non-joiners to prevent preview text capture from the body */}
                {'&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;'.repeat(20)}
            </div>

            <div style={emailStyles.container}>
                {/* Header */}
                <div style={emailStyles.header}>
                    <a href="https://glodny-niedzwiedz.pl" style={emailStyles.logo}>
                        🐻 Głodny Niedźwiedź
                    </a>
                </div>

                {/* Main Content */}
                <div style={emailStyles.content}>
                    {children}
                </div>

                {/* Footer */}
                <div style={emailStyles.footer}>
                    <p style={{ margin: '0 0 12px 0' }}>
                        Masz pytania? Odpowiedz na tę wiadomość lub zadzwoń: <a href="tel:+48500600700" style={emailStyles.link}>+48 500 600 700</a>
                    </p>
                    <p style={{ margin: '0 0 24px 0' }}>
                        Głodny Niedźwiedź Catering Sp. z o.o.<br />
                        ul. Smaczna 12, 00-123 Warszawa<br />
                        NIP: 1234567890
                    </p>
                    <div>
                        <a href="https://glodny-niedzwiedz.pl/regulamin" style={emailStyles.footerLink}>Regulamin</a>
                        <a href="https://glodny-niedzwiedz.pl/polityka-prywatnosci" style={emailStyles.footerLink}>Polityka Prywatności</a>
                    </div>
                    <p style={{ margin: '24px 0 0 0', color: '#d1d5db' }}>
                        © {new Date().getFullYear()} Głodny Niedźwiedź. Wszelkie prawa zastrzeżone.
                    </p>
                </div>
            </div>
        </div>
    );
};
