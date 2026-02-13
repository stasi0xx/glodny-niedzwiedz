export const deliveryZones = {
    allowedCities: [
        'Warszawa', 'Kraków', 'Wrocław', 'Poznań', 'Gdańsk', 'Gdynia', 'Sopot', 'Łódź', 'Katowice'
    ],
    allowedZipPrefixes: [
        '00', '01', '02', '03', '04', '05', '30', '31', '50', '51', '60', '61', '80', '81', '90', '40'
    ],
    checkDelivery: (input: string): 'served' | 'not-served' | 'unknown' => {
        const cleanInput = input.trim();

        // Check if input looks like a zip code (XX-XXX)
        if (/^\d{2}-\d{3}$/.test(cleanInput)) {
            const prefix = cleanInput.substring(0, 2);
            return deliveryZones.allowedZipPrefixes.includes(prefix) ? 'served' : 'not-served';
        }

        // Check if input is a city name
        const city = deliveryZones.allowedCities.find(c => c.toLowerCase() === cleanInput.toLowerCase());
        if (city) return 'served';

        // If it's a valid looking city string but not in list
        if (cleanInput.length > 2) return 'not-served';

        return 'unknown';
    }
};
