export const emailStyles = {
    body: {
        backgroundColor: '#f3f4f6',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        padding: '40px 0',
        color: '#1f2937',
        lineHeight: '1.5',
    },
    container: {
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '16px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '0',
        overflow: 'hidden',
    },
    header: {
        padding: '32px 40px',
        textAlign: 'center' as const,
        borderBottom: '1px solid #f3f4f6',
        backgroundColor: '#ffffff',
    },
    logo: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#10b981', // Emerald-500
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
    },
    content: {
        padding: '40px 40px',
        textAlign: 'left' as const,
    },
    h1: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#111827',
        margin: '0 0 24px 0',
        lineHeight: '1.3',
    },
    h2: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#374151',
        margin: '32px 0 16px 0',
    },
    p: {
        fontSize: '16px',
        color: '#4b5563',
        margin: '0 0 16px 0',
    },
    button: {
        display: 'inline-block',
        backgroundColor: '#10b981',
        color: '#ffffff',
        padding: '14px 28px',
        borderRadius: '8px',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '16px',
        textAlign: 'center' as const,
        margin: '24px 0',
    },
    link: {
        color: '#10b981',
        textDecoration: 'underline',
    },
    divider: {
        borderTop: '1px solid #e5e7eb',
        margin: '32px 0',
    },
    footer: {
        padding: '32px 40px',
        backgroundColor: '#f9fafb',
        borderTop: '1px solid #f3f4f6',
        textAlign: 'center' as const,
        fontSize: '12px',
        color: '#9ca3af',
    },
    footerLink: {
        color: '#6b7280',
        textDecoration: 'underline',
        margin: '0 8px',
    },
    // Cards & Specific Modules
    card: {
        backgroundColor: '#f9fafb',
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        padding: '24px',
        margin: '24px 0',
    },
    cardRow: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '12px',
        borderBottom: '1px dashed #e5e7eb',
        paddingBottom: '12px',
    },
    cardRowLast: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '0',
        paddingBottom: '0',
    },
    cardLabel: {
        fontWeight: 'bold',
        color: '#4b5563',
        minWidth: '120px',
    },
    cardValue: {
        textAlign: 'right' as const,
        color: '#111827',
    },
    highlightGreen: {
        color: '#059669',
        fontWeight: 'bold',
    },
    infoBox: {
        backgroundColor: '#ecfdf5', // emerald-50
        border: '1px solid #d1fae5', // emerald-100
        borderRadius: '8px',
        padding: '16px',
        margin: '24px 0',
        color: '#065f46', // emerald-800
        fontSize: '14px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse' as const,
    },
    th: {
        textAlign: 'left' as const,
        padding: '8px 0',
        color: '#6b7280',
        fontSize: '12px',
        textTransform: 'uppercase' as const,
        letterSpacing: '0.05em',
    },
    td: {
        padding: '8px 0',
        color: '#111827',
        fontSize: '14px',
    }
};
