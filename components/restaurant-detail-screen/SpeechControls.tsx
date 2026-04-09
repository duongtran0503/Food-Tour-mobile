import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next'; // 1. Import hook
import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
  isSpeaking: boolean;
  isPaused: boolean;
  onStart: () => void;
  onPauseResume: () => void;
  onStop: () => void;
}

export const SpeechControls = ({ isSpeaking, isPaused, onStart, onPauseResume, onStop }: Props) => {
  const { t } = useTranslation(); // 2. Khởi tạo hàm t()

  if (!isSpeaking) {
    return (
      <TouchableOpacity onPress={onStart} className="flex-row items-center px-6 py-3 rounded-2xl bg-[#930004] self-start shadow-sm">
        <Ionicons name="play-circle" size={24} color="white" />
        {/* 3. Dịch chữ Nghe thuyết trình */}
        <Text className="text-white font-extrabold ml-2">
          {t('components.speech.start')}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View className="flex-row items-center bg-slate-100 p-2 rounded-2xl self-start border border-slate-200">
      <TouchableOpacity 
        onPress={onPauseResume} 
        className={`w-12 h-12 rounded-xl items-center justify-center ${isPaused ? 'bg-green-500' : 'bg-orange-500'}`}
      >
        <Ionicons name={isPaused ? "play" : "pause"} size={24} color="white" />
      </TouchableOpacity>
      
      <View className="px-4">
        {/* 4. Dịch các trạng thái Đang phát/Tạm dừng */}
        <Text className="text-[10px] font-bold text-slate-400 uppercase italic">
          {t('components.speech.status_playing')}
        </Text>
        <Text className="text-slate-900 font-bold">
          {isPaused ? t('components.speech.status_paused') : t('components.speech.playing')}
        </Text>
      </View>

      <TouchableOpacity onPress={onStop} className="w-12 h-12 bg-red-600 rounded-xl items-center justify-center ml-2">
        <Ionicons name="stop" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};