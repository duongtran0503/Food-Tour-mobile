import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
const ONBOARDING_DATA = [
  {
    id: '1',
    title: 'Khám Phá Đặc Sản',
    description: 'Tìm kiếm những món ăn đường phố ngon nhất Sài Gòn chỉ với một chạm.',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=500', // Bạn thay bằng ảnh local sau nhé
  },
  {
    id: '2',
    title: 'Lên Kế Hoạch Tour',
    description: 'Tạo lịch trình tham quan các địa điểm ẩm thực tối ưu nhất cho bạn và bạn bè.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=500',
  },
  {
    id: '3',
    title: 'Thưởng Thức & Chia Sẻ',
    description: 'Lưu lại những kỉ niệm ăn uống và chia sẻ đánh giá với cộng đồng ẩm thực.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=500',
  },
];
export default function OnboardingScreen() {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // Xử lý khi người dùng vuốt ngang
  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  // Bấm nút Tiếp tục hoặc Bắt đầu
  const handleNext = () => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* 1. Nút Bỏ qua (Skip) */}
      <View className="absolute top-12 right-6 z-10">
        <TouchableOpacity>
          <Text className="text-slate-400 font-semibold text-base">Bỏ qua</Text>
        </TouchableOpacity>
      </View>

      {/* 2. Danh sách Slide vuốt ngang */}
      <FlatList
        ref={flatListRef}
        data={ONBOARDING_DATA}
        horizontal
        pagingEnabled // Ép vuốt từng trang khít màn hình
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ width }} className="flex-1 justify-center items-center p-6">
            <Image 
              source={{ uri: item.image }} 
              className="w-72 h-72 rounded-3xl mb-12"
              resizeMode="cover"
              style={{ width: 300, height: 300, borderRadius: 24, marginBottom: 48 }}
            />
            <Text className="text-2xl font-extrabold text-slate-800 text-center mb-4">
              {item.title}
            </Text>
            <Text className="text-base text-slate-500 text-center px-4 leading-6">
              {item.description}
            </Text>
          </View>
        )}
      />

      {/* 3. Đáy màn hình: Dấu chấm trang (Indicators) + Nút bấm */}
      <View className="p-6 mb-8 flex-row justify-between items-center">
        
        {/* Các dấu chấm trang */}
        <View className="flex-row space-x-2">
          {ONBOARDING_DATA.map((_, index) => (
            <View 
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-8 bg-orange-500' : 'w-2 bg-slate-300'
              }`}
            />
          ))}
        </View>

        {/* Nút bấm chuyển trang */}
        <TouchableOpacity 
          onPress={handleNext}
          className="bg-orange-500 py-3 px-8 rounded-full shadow-lg shadow-orange-300"
        >
          <Text className="text-white font-bold text-base">
            {currentIndex === ONBOARDING_DATA.length - 1 ? 'Bắt đầu' : 'Tiếp tục'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}