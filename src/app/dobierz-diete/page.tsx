import React from 'react';
import { Container } from '@/components/ui/Container';
import { DietWizard } from '@/components/features/DietWizard';

export default function DietWizardPage() {
    return (
        <div className="bg-gradient-to-br from-indigo-50 via-white to-emerald-50 min-h-screen py-20">
            <Container>
                <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-2xl ring-1 ring-gray-900/5">
                    <DietWizard />
                </div>
            </Container>
        </div>
    );
}
