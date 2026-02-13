export interface Meal {
    name: string;
    type: 'Śniadanie' | 'II Śniadanie' | 'Obiad' | 'Podwieczorek' | 'Kolacja';
    kcal: number;
}

export interface DailyMenu {
    day: string; // e.g. 'Poniedziałek'
    meals: Meal[];
}

export const menuMock: DailyMenu[] = [
    {
        day: 'Poniedziałek',
        meals: [
            { name: 'Owsianka z borówkami i migdałami', type: 'Śniadanie', kcal: 450 },
            { name: 'Smoothie szpinakowo-bananowe', type: 'II Śniadanie', kcal: 200 },
            { name: 'Pieczony łosoś z kaszą bulgur i brokułami', type: 'Obiad', kcal: 650 },
            { name: 'Sałatka caprese z awokado', type: 'Podwieczorek', kcal: 250 },
            { name: 'Krem z pomidorów z grzankami', type: 'Kolacja', kcal: 350 },
        ],
    },
    {
        day: 'Wtorek',
        meals: [
            { name: 'Jajecznica na parze ze szczypiorkiem', type: 'Śniadanie', kcal: 400 },
            { name: 'Jogurt naturalny z granolą', type: 'II Śniadanie', kcal: 250 },
            { name: 'Kurczak w sosie curry z ryżem jaśminowym', type: 'Obiad', kcal: 700 },
            { name: 'Hummus z warzywami', type: 'Podwieczorek', kcal: 300 },
            { name: 'Sałatka cezar z indykiem', type: 'Kolacja', kcal: 350 },
        ],
    },
    {
        day: 'Środa',
        meals: [
            { name: 'Placuszki twarogowe z musem malinowym', type: 'Śniadanie', kcal: 450 },
            { name: 'Koktajl białkowy z masłem orzechowym', type: 'II Śniadanie', kcal: 250 },
            { name: 'Makaron pełnoziarnisty z pesto i tofu', type: 'Obiad', kcal: 600 },
            { name: 'Kefir i garść orzechów', type: 'Podwieczorek', kcal: 200 },
            { name: 'Szakszuka z warzywami', type: 'Kolacja', kcal: 400 },
        ],
    },
];
