import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { OrderConfirmation } from '@/components/emails/templates/OrderConfirmation';
import { PaymentConfirmation } from '@/components/emails/templates/PaymentConfirmation';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { type, email, data } = body;

        // Validation
        if (!email || !type || !data) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        let emailComponent;
        let subject;

        // Select Template
        if (type === 'order') {
            emailComponent = <OrderConfirmation {...data} />;
            subject = `Potwierdzenie zamówienia #${data.orderId} - Głodny Niedźwiedź 🐻`;
        } else if (type === 'payment') {
            emailComponent = <PaymentConfirmation {...data} />;
            subject = `Płatność potwierdzona ✅ - Zamówienie #${data.orderId}`;
        } else {
            return NextResponse.json({ error: 'Invalid email type' }, { status: 400 });
        }

        // Send Email
        const { data: responseData, error } = await resend.emails.send({
            from: 'Głodny Niedźwiedź <powiadomienia@szkolaonline.com>',
            to: [email],
            subject: subject,
            react: emailComponent,
        });

        if (error) {
            console.error('Resend Error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, id: responseData?.id });

    } catch (error) {
        console.error('SERVER ERROR:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
