import { VOICE_LANG_MAP } from '@/constants/language';
import * as Speech from 'expo-speech';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';

// Định nghĩa interface dựa trên dữ liệu tour của bạn
interface TourStop {
    place: string;
    dish: string;
    desc: string;
}

interface TourData {
    title: string;
    description: string;
    stops: TourStop[];
}

export const useTourSpeech = (tour: TourData) => {
    const { t, i18n } = useTranslation();
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const currentLang = i18n.language.split('-')[0];
    const voiceLanguage = VOICE_LANG_MAP[currentLang] || 'vi-VN';

    useEffect(() => {
        return () => {
            Speech.stop();
        };
    }, []);

    const handleStart = () => {
        Speech.stop();

        // 1. Lời mở đầu
        const introText = `${t('tour_speech.tour_welcome', { title: tour.title })}. ${tour.description}`;

        // 2. Danh sách các điểm dừng
        const stopsIntro = t('tour_speech.stops_intro', { count: tour.stops.length });
        const stopsText = tour.stops
            .map((stop, index) =>
                t('tour_speech.stop_item', {
                    index: index + 1,
                    place: stop.place,
                    dish: stop.dish,
                    desc: stop.desc
                })
            )
            .join('. ');

        // Kết hợp toàn bộ văn bản
        const fullText = `${introText}. ${stopsIntro}. ${stopsText}`;

        setIsSpeaking(true);
        setIsPaused(false);

        Speech.speak(fullText, {
            language: voiceLanguage,
            pitch: 1.0,
            rate: 0.9, // Tốc độ nói vừa phải để khách du lịch kịp nghe
            onDone: () => {
                setIsSpeaking(false);
                setIsPaused(false);
            },
            onStopped: () => {
                setIsSpeaking(false);
                setIsPaused(false);
            },
            onPause: () => setIsPaused(true),
            onResume: () => setIsPaused(false),
            onError: (error) => {
                console.error('Speech error:', error);
                handleStop();
            }
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
        } catch (error) {
            handleStop();
            Alert.alert(t('tour_speech.error_title'), t('tour_speech.pause_unsupported'));
        }
    };

    const handleStop = async () => {
        await Speech.stop();
        setIsSpeaking(false);
        setIsPaused(false);
    };

    return { isSpeaking, isPaused, handleStart, handlePauseResume, handleStop };
};