export type DietGoal = 'lose-weight' | 'build-muscle' | 'health' | 'energy';

export interface DietReview {
    author: string;
    rating: number;
    text: string;
    date: string;
}

export interface DietFaq {
    question: string;
    answer: string;
}

export interface DietMacro {
    protein: { min: number; max: number }; // Percentage or grams, let's say percentage range for simplicity in display "20-25%"
    fat: { min: number; max: number };
    carbs: { min: number; max: number };
}

export interface DietDayMenu {
    day: number;
    meals: { type: string; name: string; kcal: number; allergens?: string[] }[];
}

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
    extendedDescription: string; // New
    targetAudience: string[]; // New: Who is it for
    notFor: string[]; // New: Who is it NOT for
    macros: DietMacro; // New
    sampleMenu: DietDayMenu[]; // New
    detailedExclusions: string[]; // New
    reviews: DietReview[]; // New
    faq: DietFaq[]; // New
    allergens: string[];
    highlights: string[];
    image: string; // placeholder path or specific color/pattern
    rating: number;
    popularity: number; // 0-100
}

const commonReviews: DietReview[] = [
    { author: 'Anna K.', rating: 5, text: 'Najlepsza dieta jaką miałam. Posiłki są różnorodne i bardzo smaczne.', date: '2023-10-15' },
    { author: 'Piotr M.', rating: 4, text: 'Wszystko super, ale dostawa mogłaby być wcześniej.', date: '2023-11-02' },
    { author: 'Kasia W.', rating: 5, text: 'Schudłam 3kg w miesiąc bez głodowania. Polecam!', date: '2023-09-20' },
];

const commonFaq: DietFaq[] = [
    { question: 'Czy mogę wymieniać posiłki?', answer: 'Tak, w panelu klienta masz możliwość wymiany posiłków na inne dostępne w danym dniu.' },
    { question: 'Jak pakowane są posiłki?', answer: 'Stosujemy tacki z certyfikowanych materiałów, zgrzewane folią, co gwarantuje 100% higieny i świeżości.' },
];

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
        description: 'Idealnie zbilansowana dieta dla osób ceniących różnorodność i tradycyjne smaki.',
        extendedDescription: 'Nasza Dieta Klasyczna to kwintesencja zdrowego odżywiania w najlepszym wydaniu. To rozwiązanie dla osób, które nie chcą rezygnować z ulubionych smaków, a jednocześnie pragną zadbać o swoje zdrowie i sylwetkę. Każde pudełko to kompozycja pełna świeżych warzyw, chudego mięsa, ryb, kasz i pełnoziarnistego pieczywa.',
        targetAudience: [
            'Dla osób, które chcą zdrowo się odżywiać bez restrykcyjnych wykluczeń.',
            'Dla zapracowanych, którzy cenią domowe smaki.',
            'Dla każdego, kto chce utrzymać stałą wagę lub bezpiecznie schudnąć.'
        ],
        notFor: [
            'Dla osób z nietolerancją glutenu lub laktozy (wybierz warianty eliminacyjne).',
            'Dla wegan (wybierz dietę Wege).'
        ],
        macros: {
            protein: { min: 20, max: 25 },
            fat: { min: 30, max: 35 },
            carbs: { min: 45, max: 50 },
        },
        sampleMenu: [
            {
                day: 1,
                meals: [
                    { type: 'Śniadanie', name: 'Jajecznica na parze ze szczypiorkiem i pomidorami', kcal: 450, allergens: ['jaja'] },
                    { type: 'II Śniadanie', name: 'Koktajl bananowo-szpinakowy', kcal: 250 },
                    { type: 'Obiad', name: 'Kurczak pieczony w ziołach z kaszą bulgur', kcal: 600, allergens: ['gluten'] },
                    { type: 'Podwieczorek', name: 'Sałatka owocowa z orzechami', kcal: 200, allergens: ['orzechy'] },
                    { type: 'Kolacja', name: 'Krem z dyni z grzankami', kcal: 350, allergens: ['gluten', 'mleko'] },
                ]
            }
        ],
        detailedExclusions: [],
        reviews: commonReviews,
        faq: [
            ...commonFaq,
            { question: 'Czy dieta klasyczna zawiera ryby?', answer: 'Tak, w diecie klasycznej ryby pojawiają się 1-2 razy w tygodniu.' }
        ],
        allergens: ['gluten', 'mleko', 'jaja', 'seler'],
        highlights: ['Brak monotonii', 'Sezonowe produkty', 'Domowe smaki'],
        image: '/images/diets/classic.jpg',
        rating: 4.8,
        popularity: 95
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
        description: 'Dieta dla aktywnych. Zwiększona podaż białka wspiera budowę mięśni.',
        extendedDescription: 'Dieta Sport to paliwo dla Twoich mięśni. Opracowana z myślą o profesjonalnych sportowcach i amatorach, którzy intensywnie trenują. Zwiększona ilość pełnowartościowego białka oraz węglowodanów złożonych zapewnia energię na trening i szybką regenerację po wysiłku.',
        targetAudience: [
            'Dla osób trenujących siłowo i wytrzymałościowo.',
            'Dla chcących zbudować beztłuszczową masę mięśniową.',
            'Dla prowadzących bardzo aktywny tryb życia.'
        ],
        notFor: [
            'Dla osób z chorobami nerek (wymagana konsultacja lekarska).',
            'Dla osób o niskiej aktywności fizycznej (może powodować przyrost wagi).'
        ],
        macros: {
            protein: { min: 30, max: 35 },
            fat: { min: 25, max: 30 },
            carbs: { min: 40, max: 45 },
        },
        sampleMenu: [
            {
                day: 1,
                meals: [
                    { type: 'Śniadanie', name: 'Owsianka proteinowa z masłem orzechowym', kcal: 600, allergens: ['gluten', 'orzechy'] },
                    { type: 'II Śniadanie', name: 'Twarożek z rzodkiewką i pieczywem żytnim', kcal: 400, allergens: ['mleko', 'gluten'] },
                    { type: 'Obiad', name: 'Wołowina duszona z ryżem jaśminowym', kcal: 800 },
                    { type: 'Podwieczorek', name: 'Szejk białkowy czekoladowy', kcal: 300, allergens: ['mleko'] },
                    { type: 'Kolacja', name: 'Sałatka z tuńczykiem i jajkiem', kcal: 500, allergens: ['jaja', 'ryby'] },
                ]
            }
        ],
        detailedExclusions: [],
        reviews: [
            { author: 'Marcin T.', rating: 5, text: 'Świetna regeneracja, czuję różnicę na treningach!', date: '2023-11-10' },
            ...commonReviews.slice(0, 2)
        ],
        faq: commonFaq,
        allergens: ['gluten', 'mleko', 'jaja', 'ryby'],
        highlights: ['Więcej białka', 'Wsparcie treningu', 'Solidne porcje'],
        image: '/images/diets/sport.jpg',
        rating: 4.9,
        popularity: 90
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
        description: 'Zbilansowana dieta wegetariańska. Bogata w roślinne źródła białka.',
        extendedDescription: 'Wege to nie tylko eliminacja mięsa, to odkrywanie bogactwa smaków roślinnych. Nasza dieta wegetariańska jest w pełni zbilansowana, dostarczając wszystkich niezbędnych witamin i minerałów. Korzystamy z roślin strączkowych, tofu, orzechów i ogromnej ilości świeżych warzyw.',
        targetAudience: [
            'Dla wegetarian.',
            'Dla osób chcących ograniczyć spożycie mięsa.',
            'Dla szukających lekkostrawnej diety.'
        ],
        notFor: [
            'Dla osób, które nie wyobrażają sobie dnia bez mięsa.',
            'Dla wegan (dieta zawiera nabiał i jaja).'
        ],
        macros: {
            protein: { min: 15, max: 20 },
            fat: { min: 30, max: 35 },
            carbs: { min: 50, max: 55 },
        },
        sampleMenu: [
            {
                day: 1,
                meals: [
                    { type: 'Śniadanie', name: 'Szakszuka z pomidorami i papryką', kcal: 400, allergens: ['jaja'] },
                    { type: 'II Śniadanie', name: 'Hummus z warzywami', kcal: 250, allergens: ['sezam'] },
                    { type: 'Obiad', name: 'Curry z ciecierzycą i mleczkiem kokosowym', kcal: 500 },
                    { type: 'Podwieczorek', name: 'Ciasto marchewkowe', kcal: 250, allergens: ['gluten', 'jaja'] },
                    { type: 'Kolacja', name: 'Sałatka grecka', kcal: 300, allergens: ['mleko'] },
                ]
            }
        ],
        detailedExclusions: ['Mięso', 'Ryby', 'Owoce morza'],
        reviews: commonReviews,
        faq: commonFaq,
        allergens: ['gluten', 'mleko', 'jaja', 'soja', 'orzechy'],
        highlights: ['Wege', 'Dużo warzyw', 'Lekkostrawna'],
        image: '/images/diets/wege.jpg',
        rating: 4.7,
        popularity: 85
    },
    // Adding extended info for other diets as placeholders or similar structure
    {
        id: 'd4',
        name: 'Keto',
        slug: 'keto',
        goals: ['lose-weight', 'energy'],
        tags: ['Niskie węgle', 'Tłuszczowa'],
        kcalOptions: [1500, 2000, 2500],
        mealsOptions: [3, 4],
        priceFrom: 70,
        description: 'Dieta ketogeniczna o wysokiej zawartości tłuszczów.',
        extendedDescription: 'Keto to dieta, która zmienia metabolizm Twojego organizmu, przestawiając go na spalanie tłuszczu. Wysoka zawartość zdrowych tłuszczów i minimalna ilość węglowodanów (poniżej 10%) pozwala wejść w stan ketozy, co sprzyja szybkiej utracie wagi i stabilizacji poziomu energii.',
        targetAudience: ['Chcących szybko schudnąć.', 'Szukających stabilizacji poziomu cukru.', 'Lubiących tłuste potrawy.'],
        notFor: ['Dla osób z problemami wątrobowymi.', 'Dla kobiet w ciąży (bez konsultacji).'],
        macros: { protein: { min: 20, max: 25 }, fat: { min: 70, max: 75 }, carbs: { min: 5, max: 10 } },
        sampleMenu: [{ day: 1, meals: [] }], // Placeholder
        detailedExclusions: ['Cukier', 'Zboża', 'Owoce (większość)', 'Warzywa skrobiowe'],
        reviews: commonReviews,
        faq: commonFaq,
        allergens: ['mleko', 'jaja', 'orzechy', 'ryby'],
        highlights: ['Spalanie tłuszczu', 'Stabilna energia', 'Low carb'],
        image: '/images/diets/keto.jpg',
        rating: 4.6,
        popularity: 70
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
        description: 'Pełnowartościowa dieta eliminująca laktozę.',
        extendedDescription: 'Wariant eliminuje produkty zawierające laktozę, zastępując je odpowiednikami bezlaktozowymi lub roślinnymi. Idealna dla osób, które odczuwają dyskomfort po spożyciu mleka krowiego.',
        targetAudience: ['Z nietolerancją laktozy.', 'Z wrażliwym jelitem.'],
        notFor: ['Dla osób bez problemów trawiennych (nie ma potrzeby eliminacji).'],
        macros: { protein: { min: 20, max: 25 }, fat: { min: 30, max: 35 }, carbs: { min: 45, max: 50 } },
        sampleMenu: [{ day: 1, meals: [] }],
        detailedExclusions: ['Mleko krowie (z laktozą)', 'Śmietana (z laktozą)', 'Twaróg (z laktozą)'],
        reviews: commonReviews,
        faq: commonFaq,
        allergens: ['gluten', 'jaja'],
        highlights: ['Komfort trawienia', 'Bez nabiału', 'Różnorodna'],
        image: '/images/diets/nolactose.jpg',
        rating: 4.8,
        popularity: 80
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
        description: 'Dieta o niskim indeksie glikemicznym. Stabilizuje cukier.',
        extendedDescription: 'Low IG to wsparcie w walce z insulinoopornością i cukrzycą typu 2. Produkty są dobierane tak, aby nie powodować gwałtownych wyrzutów insuliny. Posiłki są sycące na dłużej.',
        targetAudience: ['Z insulinoopornością.', 'Z cukrzycą typu 2.', 'Chcących uniknąć napadów głodu.'],
        notFor: ['Brak przeciwwskazań.'],
        macros: { protein: { min: 20, max: 25 }, fat: { min: 30, max: 35 }, carbs: { min: 40, max: 45 } },
        sampleMenu: [{ day: 1, meals: [] }],
        detailedExclusions: ['Cukier', 'Biała mąka', 'Przetworzone produkty'],
        reviews: commonReviews,
        faq: commonFaq,
        allergens: ['gluten', 'mleko', 'jaja', 'orzechy'],
        highlights: ['Stabilny cukier', 'Bez skoków', 'Syta'],
        image: '/images/diets/lowig.jpg',
        rating: 4.7,
        popularity: 60
    }
];
