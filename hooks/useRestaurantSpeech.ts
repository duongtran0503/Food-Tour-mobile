import { VOICE_LANG_MAP } from '@/constants/language';
import { MenuItemType, RestaurantDetailType } from '@/types/restaurant';
import * as Speech from 'expo-speech';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';


export const useRestaurantSpeech = (restaurant: RestaurantDetailType) => {
    const { t, i18n } = useTranslation();
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const currentLang = i18n.language.split('-')[0];
    const voiceLanguage = VOICE_LANG_MAP[currentLang] || 'en-US';


    useEffect(() => {
        return () => {

            Speech.stop();
        };
    }, []);
    const handleStart = () => {
        Speech.stop();

        const introText = t('speech.welcome', {
            name: restaurant.name,
            description: restaurant.description
        });

        const menuText = restaurant.menu.map((item: MenuItemType) =>
            t('speech.menu_item', {
                name: item.name,
                min: item.priceRange.min.toLocaleString(i18n.language),
                max: item.priceRange.max.toLocaleString(i18n.language)
            })
        ).join('. ');

        const fullText = `${introText}. ${t('speech.menu_intro')} ${menuText}`;

        setIsSpeaking(true);
        setIsPaused(false);

        Speech.speak(fullText, {
            language: voiceLanguage,
            pitch: 1,
            rate: 0.875,
            onDone: () => { setIsSpeaking(false); setIsPaused(false); },
            onStopped: () => { setIsSpeaking(false); setIsPaused(false); },
            onPause: () => setIsPaused(true),
            onResume: () => setIsPaused(false),
        });
    };

    const handlePauseResume = async () => {
        try {
            if (isPaused) {
                await Speech.resume();
                setIsPaused(false);
            } else {
                await Speech.pause();
                setIsPaused(true);
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error: unknown) {
            handleStop();
            Alert.alert(
                t('speech.android_error'),
                t('speech.android_pause_unsupported')
            );
        }
    };

    const handleStop = async () => {
        await Speech.stop();
        setIsSpeaking(false);
        setIsPaused(false);
    };

    return { isSpeaking, isPaused, handleStart, handlePauseResume, handleStop };
};