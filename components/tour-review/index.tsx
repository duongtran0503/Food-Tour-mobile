import userAvatar from "@/assets/images/user-avatar.png";
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, View } from 'react-native';
// Kiểu dữ liệu cho một bình luận
interface ReviewItem {
  id: string;
  user: string;
  avatar: string | null;
  rating: number;
  date: string;
  comment: string;
}

const reviewsData: ReviewItem[] = [
  {
    id: '1',
    user: 'Ân Nguyễn',
    avatar: '',
    rating: 5,
    date: '20/03/2026',
    comment: 'Tour rất tuyệt vời! Ốc Oanh ăn rất tươi, nước sốt trứng muối ở đây là đỉnh nhất Vĩnh Khánh.',
  },
  {
    id: '2',
    user: 'Minh Thư',
    avatar: '',
    rating: 4,
    date: '15/03/2026',
    comment: 'Lộ trình hợp lý, không phải chờ đợi lâu. Tuy nhiên quán hơi đông vào cuối tuần.',
  },
];

// Component con hiển thị sao
const StarRating = ({ rating, size = 14 }: { rating: number; size?: number }) => (
  <View className="flex-row">
    {[1, 2, 3, 4, 5].map((s) => (
      <Ionicons 
        key={s} 
        name={s <= rating ? "star" : "star-outline"} 
        size={size} 
        color="#fbbf24" 
      />
    ))}
  </View>
);

export default function TourReviews() {
  return (
    <View className="mt-8 px-4">
      {/* Tóm tắt đánh giá */}
      <View className="flex-row items-center justify-between mb-6">
        <View>
          <Text className="text-4xl font-black text-slate-900">4.9</Text>
          <StarRating rating={5} size={18} />
          <Text className="text-slate-400 text-xs mt-1">Dựa trên 120 đánh giá</Text>
        </View>
        
        {/* Biểu đồ cột mini */}
        <View className="flex-1 ml-10">
          {[5, 4, 3, 2, 1].map((num) => (
            <View key={num} className="flex-row items-center mb-1">
              <Text className="text-[10px] text-slate-400 w-3">{num}</Text>
              <View className="flex-1 h-1.5 bg-slate-100 rounded-full mx-2 overflow-hidden">
                <View 
                  className="h-full bg-[#930004]" 
                  style={{ width: `${num === 5 ? 85 : num === 4 ? 10 : 5}%` }} 
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Danh sách bình luận */}
      {reviewsData.map((item) => (
        <View key={item.id} className="mb-6 pb-6 border-b border-slate-50">
          <View className="flex-row justify-between items-center mb-3">
            <View className="flex-row items-center">
 {item.avatar ? (
                <Image 
                  source={{ uri: item.avatar }}
                  className="w-10 h-10 rounded-full bg-slate-100"
                />
              ) : (
                <Image 
                  source={userAvatar}
                  className="w-10 h-10 rounded-full bg-slate-100"
                />
              )}
              <View className="ml-3">
                <Text className="font-bold text-slate-900">{item.user}</Text>
                <Text className="text-[10px] text-slate-400">{item.date}</Text>
              </View>
            </View>
            <StarRating rating={item.rating} />
          </View>
          <Text className="text-slate-600 leading-5 text-sm">
            {item.comment}
          </Text>
        </View>
      ))}
    </View>
  );
}