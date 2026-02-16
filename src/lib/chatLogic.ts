
import { diets, Diet } from '../data/diets';
import { deliveryZones } from '../data/deliveryZones';

// --- TOOLS FOR OPENAI ---

export const tools = [
    {
        type: "function",
        function: {
            name: "check_delivery",
            description: "Checks if we deliver to a specific postal code or city.",
            parameters: {
                type: "object",
                properties: {
                    location: {
                        type: "string",
                        description: "The postal code (XX-XXX) or city name to check.",
                    },
                },
                required: ["location"],
            },
        },
    },
    {
        type: "function",
        function: {
            name: "recommend_diet",
            description: "Recommends a diet plan based on user preferences. Call this when you have gathered enough info (Goal, Activity, Restrictions, etc.).",
            parameters: {
                type: "object",
                properties: {
                    goal: {
                        type: "string",
                        enum: ["lose-weight", "build-muscle", "health", "energy"],
                        description: "User's primary goal."
                    },
                    activity: {
                        type: "string",
                        enum: ["low", "medium", "high"],
                        description: "User's activity level."
                    },
                    restrictions: {
                        type: "string",
                        description: "Any dietary restrictions (e.g. 'wege', 'lactose-free'). can be empty."
                    },
                    calories: {
                        type: "number",
                        description: "Specific calorie target if known."
                    },
                    meals: {
                        type: "number",
                        description: "Preferred number of meals (3 or 5)."
                    }
                },
                required: ["goal"],
            },
        },
    },
    {
        type: "function",
        function: {
            name: "get_diet_list",
            description: "Returns a list of all available diets with their basic info.",
            parameters: {
                type: "object",
                properties: {},
                required: [],
            },
        },
    }
];

// --- TOOL IMPLEMENTATIONS ---

export function checkDelivery(location: string) {
    const status = deliveryZones.checkDelivery(location);
    if (status === 'served') return { deliverable: true, message: `Tak, dowozimy do ${location}!` };
    if (status === 'not-served') return { deliverable: false, message: `Niestety, ${location} jest poza naszą strefą.` };
    return { deliverable: false, message: "Nie rozpoznałem lokalizacji. Podaj kod pocztowy (00-000)." };
}

export function getAllDiets() {
    return diets.map(d => ({ name: d.name, slug: d.slug, goals: d.goals }));
}

export function recommendDiet(prefs: { goal: string, activity?: string, restrictions?: string, calories?: number, meals?: number }) {
    // Reuse similar logic from before but adapter for tool args
    let bestDiet = diets[0];
    let reason = "Standardowa opcja.";
    let calories = 2000;

    // Logic
    let base = 2000;
    if (prefs.goal === 'lose-weight') base = 1500;
    if (prefs.goal === 'build-muscle') base = 2500;
    if (prefs.activity === 'low') base -= 100;
    if (prefs.activity === 'high') base += 500;

    const tiers = [1200, 1500, 1800, 2000, 2500, 3000, 3500];
    calories = tiers.reduce((prev, curr) => Math.abs(curr - base) < Math.abs(prev - base) ? curr : prev);
    if (prefs.calories) calories = prefs.calories;

    if (prefs.restrictions?.toLowerCase().includes('wege')) {
        bestDiet = diets.find(d => d.slug === 'wege') || diets[0];
        reason = "Dieta Wege (bez mięsa).";
    } else if (prefs.restrictions?.toLowerCase().includes('lakt')) {
        bestDiet = diets.find(d => d.slug === 'no-lactose') || diets[0];
        reason = "Dieta Bez Laktozy.";
    } else if (prefs.goal === 'build-muscle' || prefs.activity === 'high') {
        bestDiet = diets.find(d => d.slug === 'sport') || diets[0];
        reason = "Dieta Sport (wysokie białko).";
    } else if (prefs.goal === 'lose-weight') {
        bestDiet = diets.find(d => d.slug === 'klasyczna') || diets[0];
        reason = "Dieta Klasyczna (zbilansowana redukcja).";
    }

    return {
        dietName: bestDiet.name,
        slug: bestDiet.slug,
        dailyPrice: bestDiet.priceFrom,
        reason,
        recommendedKcal: calories,
        checkoutLink: `/zamowienie/checkout?diet=${bestDiet.slug}&kcal=${calories}`,
        productCard: {
            title: bestDiet.name,
            description: reason,
            price: bestDiet.priceFrom,
            image: bestDiet.image,
            slug: bestDiet.slug,
            matches: [prefs.goal || 'Zdrowie', `${calories} kcal`]
        }
    };
}
