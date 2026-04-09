import { languages } from '@/constants/language';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';


export default function LanguageSettings() {
  const { i18n, t } = useTranslation();
  const router = useRouter();

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 p-6">
        {/* Tích hợp i18n cho tiêu đề */}
        <Text className="text-2xl font-black mb-6 mt-10">
          {t('screens.language.title')}
        </Text>
        
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            onPress={() => changeLanguage(lang.code)}
            className={`flex-row items-center p-4 mb-3 rounded-2xl border ${
              i18n.language === lang.code ? 'border-[#930004] bg-red-50' : 'border-slate-100'
            }`}
          >
            <Text className="text-2xl">{lang.flag}</Text>
            <Text className={`ml-4 flex-1 font-bold ${
              i18n.language === lang.code ? 'text-[#930004]' : 'text-slate-700'
            }`}>
              {lang.name}
            </Text>
            {i18n.language === lang.code && (
              <View className="w-3 h-3 bg-[#930004] rounded-full" />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View className="p-6 border-t border-slate-100">
        <TouchableOpacity 
          onPress={() => router.push('/home')}
          className="bg-[#930004] h-14 rounded-2xl flex-row items-center justify-center active:bg-red-900"
        >
          <Ionicons name="home-outline" size={20} color="white" />
          <Text className="text-white font-bold ml-2">
            {t('common.back_to_home')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}