import { Diet } from './diets';

export const calculatePrice = (
    diet: Diet,
    kcal: number,
    days: number
): number => {
    // Base price from diet definition
    let dailyPrice = diet.priceFrom;

    // Adjust for calories
    if (kcal > 2000) dailyPrice += 5;
    if (kcal > 2500) dailyPrice += 8;
    if (kcal <= 1500) dailyPrice -= 2;

    // Discount for longer periods
    if (days >= 20) dailyPrice *= 0.9;
    else if (days >= 10) dailyPrice *= 0.95;

    return Math.round(dailyPrice * days);
};

export const pricing = {
    promotions: [
        { code: 'START20', discountPercent: 20, description: '-20% na pierwsze zamówienie' },
    ]
};
