import { MenuItemType, RestaurantDetailType } from '@/types/restaurant';
import * as Speech from 'expo-speech';
import { useState } from 'react';
import { Alert } from 'react-native';

export const useRestaurantSpeech = (restaurant: RestaurantDetailType) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const handleStart = () => {
        Speech.stop();
        const introText = `Chào mừng bạn đến với ${restaurant.name}. ${restaurant.description}`;
        const menuText = restaurant.menu.map((item: MenuItemType) => `Món ${item.name} giá ${item.price}`).join('. ');
        const fullText = `${introText}. Thực đơn gồm có: ${menuText}`;

        setIsSpeaking(true);
        setIsPaused(false);

        Speech.speak(fullText, {
            language: 'vi-VN',
            pitch: 1.0,
            rate: 1.0,
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
            Alert.alert("Thông báo", "Thiết bị Android hiện chưa hỗ trợ Tạm dừng.");
        }
    };

    const handleStop = async () => {
        await Speech.stop();
        setIsSpeaking(false);
        setIsPaused(false);
    };

    return { isSpeaking, isPaused, handleStart, handlePauseResume, handleStop };
};