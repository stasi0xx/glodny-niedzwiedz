export type DietGoal = 'lose-weight' | 'build-muscle' | 'health' | 'energy';

export interface Diet {
    id: string;
    name: string;
    slug: string;
    goals: DietGoal[];
    tags: string[];
    kcalOptions: number[];
    mealsOptions: number[]; // e.g. 3, 5
    priceFrom: number; // daily price from
    description: string;
    allergens: string[];
    highlights: string[];
    image: string; // placeholder path or specific color/pattern
}

export const diets: Diet[] = [
    {
        id: 'd1',
        name: 'Klasyczna',
        slug: 'klasyczna',
        goals: ['health', 'energy'],
        tags: ['Zbilansowana', 'Tradycyjna'],
        kcalOptions: [1200, 1500, 1800, 2000, 2500],
        mealsOptions: [3, 5],
        priceFrom: 55,
        description: 'Idealnie zbilansowana dieta dla osób ceniących różnorodność i tradycyjne smaki w nowoczesnym wydaniu. Pełna warzyw, chudego mięsa i pełnoziarnistych produktów.',
        allergens: ['gluten', 'mleko', 'jaja', 'eler'],
        highlights: ['Brak monotonii', 'Sezonowe produkty', 'Domowe smaki'],
        image: '/images/diets/classic.jpg'
    },
    {
        id: 'd2',
        name: 'Sport',
        slug: 'sport',
        goals: ['build-muscle', 'energy'],
        tags: ['Wysokie białko', 'Regeneracja'],
        kcalOptions: [2000, 2500, 3000, 3500, 4000],
        mealsOptions: [5],
        priceFrom: 65,
        description: 'Dieta stworzona dla osób aktywnych fizycznie. Zwiększona podaż białka i węglowodanów złożonych wspiera budowę masy mięśniowej i regenerację powysiłkową.',
        allergens: ['gluten', 'mleko', 'jaja', 'ryby'],
        highlights: ['Więcej białka', 'Wsparcie treningu', 'Solidne porcje'],
        image: '/images/diets/sport.jpg'
    },
    {
        id: 'd3',
        name: 'Wege',
        slug: 'wege',
        goals: ['health', 'lose-weight'],
        tags: ['Bez mięsa', 'Lekka'],
        kcalOptions: [1200, 1500, 1800, 2000],
        mealsOptions: [3, 5],
        priceFrom: 58,
        description: 'Zbilansowana dieta wegetariańska wykluczająca mięso i ryby. Bogata w roślinne źródła białka, warzywa i owoce.',
        allergens: ['gluten', 'mleko', 'jaja', 'soja', 'orzechy'],
        highlights: ['Wege', 'Dużo warzyw', 'Lekkostrawna'],
        image: '/images/diets/wege.jpg'
    },
    {
        id: 'd4',
        name: 'Keto',
        slug: 'keto',
        goals: ['lose-weight', 'energy'],
        tags: ['Niskie węgle', 'Tłuszczowa'],
        kcalOptions: [1500, 2000, 2500],
        mealsOptions: [3, 4],
        priceFrom: 70,
        description: 'Dieta ketogeniczna o wysokiej zawartości tłuszczów i minimalnej ilości węglowodanów. Skuteczna przy redukcji tkanki tłuszczowej.',
        allergens: ['mleko', 'jaja', 'orzechy', 'ryby'],
        highlights: ['Spalanie tłuszczu', 'Stabilna energia', 'Low carb'],
        image: '/images/diets/keto.jpg'
    },
    {
        id: 'd5',
        name: 'Bez Laktozy',
        slug: 'no-lactose',
        goals: ['health'],
        tags: ['Bez laktozy', 'Lekki brzuch'],
        kcalOptions: [1200, 1500, 1800, 2000, 2500],
        mealsOptions: [3, 5],
        priceFrom: 60,
        description: 'Pełnowartościowa dieta eliminująca produkty zawierające laktozę. Idealna dla osób z nietolerancją pokarmową.',
        allergens: ['gluten', 'jaja'],
        highlights: ['Komfort trawienia', 'Bez nabiału', 'Różnorodna'],
        image: '/images/diets/nolactose.jpg'
    },
    {
        id: 'd6',
        name: 'Low IG',
        slug: 'low-ig',
        goals: ['health', 'lose-weight'],
        tags: ['Niski indeks', 'Cukrzyca'],
        kcalOptions: [1500, 1800, 2000],
        mealsOptions: [3, 5],
        priceFrom: 62,
        description: 'Dieta o niskim indeksie glikemicznym. Stabilizuje poziom cukru we krwi, zapobiega napadom głodu.',
        allergens: ['gluten', 'mleko', 'jaja', 'orzechy'],
        highlights: ['Stabilny cukier', 'Bez skoków', 'Syta'],
        image: '/images/diets/lowig.jpg'
    }
];
