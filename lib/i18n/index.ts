import en from "@/lib/i18n/locales/en.json";
import jp from "@/lib/i18n/locales/jp.json";
import ru from "@/lib/i18n/locales/ru.json";
import vi from "@/lib/i18n/locales/vi.json";
import zh from "@/lib/i18n/locales/zh.json";
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
const resources = {
    vi: { translation: vi },
    en: { translation: en },
    jp: { translation: jp },
    zh: { translation: zh },
    ru: { translation: ru },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'vi',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        compatibilityJSON: 'v4'

    });

export default i18n;