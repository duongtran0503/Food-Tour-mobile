import ButtonBack from '@/components/button-back';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard'; // npx expo install expo-clipboard
import * as Linking from 'expo-linking';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function ShareTourScreen() {
  const { id } = useLocalSearchParams();
const shareUrl = Linking.createURL(`/tour/detail/${id}`);
 console.log("URL chia sẻ được tạo:", shareUrl); // Debug: Kiểm tra URL được tạo ra
  const copyToClipboard = async (text: string, label: string) => {
    await Clipboard.setStringAsync(text);
    Alert.alert("Thành công", `Đã sao chép ${label} vào bộ nhớ tạm!`);
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50 px-6">
      <View className="flex-row items-center mt-4">
        <ButtonBack />
        <Text className="text-xl font-black ml-4 text-slate-800">Chia sẻ hành trình</Text>
      </View>

      <View className="flex-1 items-center justify-center">
        {/* PHẦN MÃ QR */}
        <View className="bg-white p-8 rounded-[40px] shadow-2xl items-center border border-slate-100">
          <Text className="text-slate-400 font-bold mb-6 uppercase tracking-widest text-[10px]">
            Quét mã để xem tour
          </Text>
          <View className="p-4 bg-white border border-slate-50 rounded-3xl">
            <QRCode
              value={shareUrl}
              size={200}
              color="#930004"
              backgroundColor="white"
            />
          </View>
          <TouchableOpacity 
             onPress={() => copyToClipboard(shareUrl, "mã QR (Link)")}
             className="mt-6 bg-red-50 px-6 py-3 rounded-2xl flex-row items-center"
          >
            <Ionicons name="download-outline" size={18} color="#930004" />
            <Text className="text-[#930004] font-bold ml-2">Lưu mã QR</Text>
          </TouchableOpacity>
        </View>

        {/* PHẦN LINK CHIA SẺ */}
        <View className="w-full mt-10 bg-white p-6 rounded-[30px] border border-slate-100 shadow-sm">
          <Text className="text-slate-800 font-bold mb-3">Link chia sẻ</Text>
          <View className="flex-row items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <Text numberOfLines={1} className="flex-1 text-slate-500 mr-2 italic">
              {shareUrl}
            </Text>
            <TouchableOpacity 
              onPress={() => copyToClipboard(shareUrl, "đường dẫn")}
              className="bg-slate-900 p-2 rounded-xl"
            >
              <Ionicons name="copy-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View className="mb-10">
        <Text className="text-center text-slate-400 text-xs italic">
          Gửi link này cho bạn bè để cùng khám phá các địa điểm cực hot!
        </Text>
      </View>
    </SafeAreaView>
  );
}