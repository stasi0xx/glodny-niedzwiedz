import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

export const useTranslation = () => {
    const { language } = useLanguage();
    return translations[language];
};
