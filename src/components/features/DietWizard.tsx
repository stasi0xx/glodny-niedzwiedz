'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { diets, Diet } from '../../data/diets';
import Link from 'next/link';

type Step = 'intro' | 'goal' | 'bio' | 'activity' | 'exclusions' | 'analyzing' | 'result';
type Gender = 'female' | 'male';

export const DietWizard: React.FC = () => {
    const [step, setStep] = useState<Step>('intro');
    const [answers, setAnswers] = useState({
        goal: '',
        gender: 'female' as Gender,
        age: '',
        weight: '',
        height: '',
        activity: '',
        exclusions: [] as string[]
    });
    const [recommendation, setRecommendation] = useState<{
        primary: Diet | null,
        alternatives: Diet[],
        kcal: number
    }>({ primary: null, alternatives: [], kcal: 0 });

    const handleAnswer = (key: string, value: any) => {
        setAnswers(prev => ({ ...prev, [key]: value }));
    };

    const nextStep = (next: Step) => setStep(next);

    const calculateRecommendation = () => {
        setStep('analyzing');

        // Mock AI "Thinking" time
        setTimeout(() => {
            // Heuristic Logic
            let recommendedDiets = [...diets];

            // Filter by goal
            if (answers.goal === 'Schudnąć') {
                recommendedDiets = recommendedDiets.filter(d => d.goals.includes('lose-weight'));
            } else if (answers.goal === 'Zbudować formę') {
                recommendedDiets = recommendedDiets.filter(d => d.goals.includes('build-muscle'));
            }

            // Exclusions
            if (answers.exclusions.includes('Mięso')) {
                recommendedDiets = recommendedDiets.filter(d => d.slug === 'wege' || d.slug === 'wege-fish' || d.slug === 'keto'); // Simplified
            }

            // Calculate BMR (Mifflin-St Jeor)
            const w = Number(answers.weight) || 70;
            const h = Number(answers.height) || 170;
            const a = Number(answers.age) || 30;
            let bmr = 10 * w + 6.25 * h - 5 * a;
            bmr = answers.gender === 'male' ? bmr + 5 : bmr - 161;

            // Activity multiplier
            const activityMap: Record<string, number> = {
                'Niska': 1.2,
                'Średnia': 1.55,
                'Wysoka': 1.9
            };
            const tdee = bmr * (activityMap[answers.activity] || 1.375);

            // Goal adjustment
            let targetKcal = tdee;
            if (answers.goal === 'Schudnąć') targetKcal -= 500;
            if (answers.goal === 'Zbudować formę') targetKcal += 300;

            // Round to nearest diet option available (usually 1200, 1500, etc.)
            const availableKcal = [1200, 1500, 1800, 2000, 2500, 3000];
            const bestKcal = availableKcal.reduce((prev, curr) =>
                Math.abs(curr - targetKcal) < Math.abs(prev - targetKcal) ? curr : prev
            );

            // Select diets
            const primary = recommendedDiets[0] || diets[0];
            const alternatives = diets.filter(d => d.id !== primary.id).slice(0, 2);

            setRecommendation({
                primary,
                alternatives,
                kcal: bestKcal
            });
            setStep('result');

        }, 2000);
    };


    // --- Steps Components ---

    if (step === 'intro') {
        return (
            <div className="text-center space-y-6 animate-in fade-in">
                <h2 className="text-3xl font-bold">Dobierz idealną dietę w 2 minuty ⏱️</h2>
                <p className="text-lg text-gray-600">Nasz algorytm AI przeanalizuje Twoje zapotrzebowanie.</p>
                <Button size="lg" onClick={() => nextStep('goal')}>Rozpocznij ankietę</Button>
            </div>
        );
    }

    if (step === 'goal') return (
        <div className="space-y-6 animate-in slide-in-from-right-8 fade-in">
            <h2 className="text-2xl font-bold text-center">Jaki jest Twój główny cel? 🎯</h2>
            <div className="grid gap-4 sm:grid-cols-2">
                {['Schudnąć', 'Zdrowo jeść', 'Zbudować formę', 'Mieć więcej energii'].map(goal => (
                    <button
                        key={goal}
                        onClick={() => { handleAnswer('goal', goal); nextStep('bio'); }}
                        className="p-6 rounded-xl border-2 border-gray-100 hover:border-emerald-500 hover:bg-emerald-50 transition-all font-medium text-lg text-left"
                    >
                        {goal}
                    </button>
                ))}
            </div>
        </div>
    );

    if (step === 'bio') return (
        <div className="space-y-6 animate-in slide-in-from-right-8 fade-in max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center">Opowiedz nam o sobie 👤</h2>

            <div className="flex justify-center gap-4 mb-6">
                <button
                    onClick={() => handleAnswer('gender', 'female')}
                    className={`px-6 py-2 rounded-full border ${answers.gender === 'female' ? 'bg-emerald-500 text-white border-emerald-500' : 'border-gray-300'}`}
                >Kobieta</button>
                <button
                    onClick={() => handleAnswer('gender', 'male')}
                    className={`px-6 py-2 rounded-full border ${answers.gender === 'male' ? 'bg-emerald-500 text-white border-emerald-500' : 'border-gray-300'}`}
                >Mężczyzna</button>
            </div>

            <div className="space-y-4">
                <input type="number" placeholder="Wiek (lat)" className="w-full p-3 border rounded-lg" onChange={e => handleAnswer('age', e.target.value)} />
                <input type="number" placeholder="Waga (kg)" className="w-full p-3 border rounded-lg" onChange={e => handleAnswer('weight', e.target.value)} />
                <input type="number" placeholder="Wzrost (cm)" className="w-full p-3 border rounded-lg" onChange={e => handleAnswer('height', e.target.value)} />
            </div>

            <Button className="w-full" onClick={() => nextStep('activity')} disabled={!answers.age || !answers.weight || !answers.height}>Dalej</Button>
        </div>
    );

    if (step === 'activity') return (
        <div className="space-y-6 animate-in slide-in-from-right-8 fade-in">
            <h2 className="text-2xl font-bold text-center">Jak wygląda Twój dzień? 🏃</h2>
            <div className="space-y-3">
                {[
                    { label: 'Niska', desc: 'Praca siedząca, brak treningów' },
                    { label: 'Średnia', desc: 'Praca siedząca, 2-3 treningi w tygodniu / spacery' },
                    { label: 'Wysoka', desc: 'Praca fizyczna lub codzienne treningi' }
                ].map(act => (
                    <button
                        key={act.label}
                        onClick={() => { handleAnswer('activity', act.label); nextStep('exclusions'); }}
                        className="w-full p-4 rounded-xl border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 text-left transition-all"
                    >
                        <div className="font-bold">{act.label}</div>
                        <div className="text-sm text-gray-500">{act.desc}</div>
                    </button>
                ))}
            </div>
        </div>
    );

    if (step === 'exclusions') return (
        <div className="space-y-6 animate-in slide-in-from-right-8 fade-in">
            <h2 className="text-2xl font-bold text-center">Czego nie jesz? 🚫</h2>
            <p className="text-center text-sm text-gray-500">Zaznacz, jeśli chcesz wykluczyć (opcjonalne)</p>
            <div className="grid grid-cols-2 gap-3">
                {['Mięso', 'Ryby', 'Laktoza', 'Gluten'].map(item => (
                    <button
                        key={item}
                        onClick={() => {
                            const newEx = answers.exclusions.includes(item)
                                ? answers.exclusions.filter(i => i !== item)
                                : [...answers.exclusions, item];
                            handleAnswer('exclusions', newEx);
                        }}
                        className={`p-3 rounded-lg border text-sm font-medium transition-colors ${answers.exclusions.includes(item)
                                ? 'bg-red-50 border-red-500 text-red-700'
                                : 'bg-white border-gray-200 text-gray-700'
                            }`}
                    >
                        {item}
                    </button>
                ))}
            </div>
            <Button className="w-full" onClick={() => calculateRecommendation()}>Oblicz moją dietę</Button>
        </div>
    );

    if (step === 'analyzing') return (
        <div className="text-center py-20 animate-pulse">
            <div className="text-6xl mb-6">🧠</div>
            <h3 className="text-xl font-bold mb-2">Analizuję Twoje odpowiedzi...</h3>
            <p className="text-gray-500">Kalkuluję zapotrzebowanie kaloryczne (BMR/TDEE)...</p>
            <p className="text-gray-500 mt-1">Dobieram najlepszy wariant...</p>
        </div>
    );

    if (step === 'result' && recommendation.primary) return (
        <div className="animate-in zoom-in-95 duration-500">
            <div className="text-center mb-8">
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-bold mb-4">
                    Twoja rekomendacja
                </span>
                <h2 className="text-3xl font-bold">Zalecana kaloryczność: <span className="text-emerald-500">{recommendation.kcal} kcal</span></h2>
                <p className="text-gray-600 mt-2">Pomoże Ci to osiągnąć cel: <strong>{answers.goal}</strong>.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100 mb-12 transform hover:scale-[1.01] transition-transform">
                <div className="bg-emerald-500 px-6 py-4 text-white flex justify-between items-center">
                    <h3 className="text-xl font-bold">{recommendation.primary.name}</h3>
                    <span className="text-emerald-50 bg-white/20 px-3 py-1 rounded-full text-sm">Najlepszy wybór</span>
                </div>
                <div className="p-6">
                    <p className="text-gray-700 mb-6">{recommendation.primary.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {recommendation.primary.highlights.map(h => (
                            <span key={h} className="text-xs font-semibold px-2 py-1 bg-gray-100 rounded-md text-gray-600">
                                {h}
                            </span>
                        ))}
                    </div>
                    <div className="flex items-center justify-between mt-8 border-t pt-6">
                        <div>
                            <span className="block text-xs text-gray-500">Cena od</span>
                            <span className="text-2xl font-bold text-gray-900">{recommendation.primary.priceFrom} zł</span>
                            <span className="text-sm text-gray-500"> / dzień</span>
                        </div>
                        <Link href={`/koszyk?diet=${recommendation.primary.slug}&kcal=${recommendation.kcal}`}>
                            <Button>Wybieram tę dietę</Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="text-center">
                <h4 className="text-gray-500 mb-4">Alternatywy:</h4>
                <div className="flex justify-center gap-4 flex-wrap">
                    {recommendation.alternatives.map(diet => (
                        <Link key={diet.id} href={`/diety/${diet.slug}`} className="text-emerald-600 hover:underline font-medium">
                            {diet.name}
                        </Link>
                    ))}
                </div>
                <div className="mt-8">
                    <Button variant="outline" onClick={() => setStep('intro')}>Zacznij od nowa</Button>
                </div>
            </div>
        </div>
    );

    return null;
};
