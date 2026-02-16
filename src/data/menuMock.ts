export interface MenuMacro {
    protein: number;
    fat: number;
    carbs: number;
}

export interface Meal {
    name: string;
    type: 'Śniadanie' | 'II Śniadanie' | 'Obiad' | 'Podwieczorek' | 'Kolacja';
    kcal: number;
    macros: MenuMacro;
    allergens: string[];
    tags: string[];
    image?: string;
    description: string;
}

export interface DailyMenu {
    day: string; // 'Poniedziałek', 'Wtorek', etc.
    date: string; // '20.02' mock date
    summaryKcal: number;
    summaryMacros: MenuMacro;
    tags: string[]; // e.g. 'High Protein', 'Wytrawny'
    meals: Meal[];
}

export interface WeeklyMenu {
    dietSlug: string;
    days: DailyMenu[];
}

// Helpers to generate mock data
const generateMeals = (dayIndex: number): Meal[] => {
    const mealTypes = ['Śniadanie', 'II Śniadanie', 'Obiad', 'Podwieczorek', 'Kolacja'] as const;
    const baseMeals = [
        [
            { name: 'Omlet z szynką parmeńską, rukolą i pomidorkami cherry', k: 450, m: { p: 25, f: 30, c: 10 }, a: ['jaja'], t: ['Wytrawne'] },
            { name: 'Zielone smoothie z jarmużem, bananem i cytryną', k: 200, m: { p: 5, f: 2, c: 35 }, a: [], t: ['Witaminy'] },
            { name: 'Pierś z kurczaka sous-vide z puree z batatów', k: 600, m: { p: 45, f: 15, c: 60 }, a: [], t: ['High Protein'] },
            { name: 'Sałatka z pieczonym burakiem i kozim serem', k: 250, m: { p: 10, f: 15, c: 15 }, a: ['mleko'], t: ['Vege'] },
            { name: 'Krem z pieczonej papryki z grzankami pełnoziarnistymi', k: 350, m: { p: 10, f: 10, c: 45 }, a: ['gluten'], t: ['Rozgrzewające'] },
        ],
        [
            { name: 'Owsianka na mleku kokosowym z mango i kardamonem', k: 420, m: { p: 12, f: 18, c: 55 }, a: ['orzechy'], t: ['Słodkie'] },
            { name: 'Twarożek z rzodkiewką i szczypiorkiem', k: 220, m: { p: 25, f: 5, c: 10 }, a: ['mleko'], t: ['Lekkie'] },
            { name: 'Łosoś pieczony w ziołach z kaszą bulgur', k: 650, m: { p: 35, f: 30, c: 50 }, a: ['ryby', 'gluten'], t: ['Omega-3'] },
            { name: 'Deser chia z musem malinowym', k: 200, m: { p: 8, f: 12, c: 20 }, a: [], t: ['Superfood'] },
            { name: 'Sałatka Cezar z kurczakiem i grzankami', k: 380, m: { p: 30, f: 20, c: 15 }, a: ['gluten', 'jaja', 'mleko'], t: ['Klasyk'] },
        ],
        // ... more days variations can be procedurally generated or hardcoded
    ];

    const menuBase = baseMeals[dayIndex % 2]; // Alternate between 2 mock sets for variety

    return menuBase.map((m, i) => ({
        name: m.name,
        type: mealTypes[i],
        kcal: m.k,
        macros: m.m,
        allergens: m.a,
        tags: m.t,
        description: 'Pyszne i zbilansowane danie przygotowane ze świeżych składników.',
        image: `/images/meals/meal-${(dayIndex * 5) + i + 1}.jpg`
    }));
};

const days = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
const formatDay = (day: string) => day.slice(0, 3); // Pon, Wto...

export const generateWeeklyMenu = (dietSlug: string): WeeklyMenu => {
    return {
        dietSlug,
        days: days.map((day, i) => {
            const meals = generateMeals(i);
            const summaryKcal = meals.reduce((acc, m) => acc + m.kcal, 0);
            const summaryMacros = meals.reduce((acc, m) => ({
                protein: acc.protein + m.macros.protein,
                fat: acc.fat + m.macros.fat,
                carbs: acc.carbs + m.macros.carbs
            }), { protein: 0, fat: 0, carbs: 0 });

            return {
                day,
                date: `2${i}.02`,
                summaryKcal,
                summaryMacros,
                tags: i % 2 === 0 ? ['High Protein'] : ['Light Day'],
                meals
            };
        })
    };
};

export const menuMock: Record<string, WeeklyMenu> = {
    'klasyczna': generateWeeklyMenu('klasyczna'),
    'sport': generateWeeklyMenu('sport'),
    'wege': generateWeeklyMenu('wege'),
    'keto': generateWeeklyMenu('keto'),
    'low-ig': generateWeeklyMenu('low-ig'),
    'no-lactose': generateWeeklyMenu('no-lactose'),
};
