import { BigFoodCard, SmallFoodCard } from '@/components/home-component';
import SearchBar from '@/components/search-bar';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="default" />
      
      {/* --- PHẦN ĐỎ (HEADER) --- */}
      <View className="bg-primary pb-20"> {/* Tăng padding bottom để làm nền cho Search Bar */}
        <SafeAreaView edges={['top']}>
          {/* Logo & Cart */}
          <View className="flex-row items-center justify-between px-6 py-4">
            <View>
              <Text className="text-white/70 text-xs font-bold uppercase tracking-widest">Welcome to</Text>
              <Text className="text-3xl font-black text-white italic">FoodVK</Text>
            </View>
            <TouchableOpacity className="w-12 h-12 bg-white/20 rounded-2xl justify-center items-center backdrop-blur-md">
              <Ionicons name="cart-outline" size={24} color="white" />
              <View className="absolute -top-1 -right-1 bg-white w-5 h-5 rounded-full justify-center items-center">
                <Text className="text-primary text-[10px] font-black">3</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Search Bar nằm CHÍNH XÁC ở phần đỏ */}
          <View className="px-6 mt-2 pb-4">
            <SearchBar/>
          </View>
        </SafeAreaView>
      </View>

      {/* --- PHẦN TRẮNG (NỘI DUNG) --- */}
      {/* Dùng margin-top âm để đẩy phần trắng đè lên phần đỏ */}
      <View className="flex-1 bg-white rounded-t-[40px] -mt-10 shadow-2xl overflow-hidden">
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={{ paddingBottom: 100, paddingTop: 30 }} // Tăng paddingTop để tạo khoảng cách giữa phần trắng và phần đỏ
        >
          {/* 3. Categories (Vòng tròn) */}
          <View className="mb-8">
             <Text className="px-4 text-xl font-extrabold text-slate-800 mb-5">Danh mục</Text>
             <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-2">
              {[
                { name: 'Burgers', img: '🍔' },
                { name: 'Vegan', img: '🥗' },
                { name: 'Deals', img: '🏷️', promo: true },
                { name: 'Ice Cream', img: '🍦' },
                { name: 'Pizza', img: '🍕' },
                  { name: 'Ice Cream', img: '🍦' },
                { name: 'Pizza', img: '🍕' },
                { name: 'Ice Cream', img: '🍦' },
                { name: 'Pizza', img: '🍕' },
                  { name: 'Ice Cream', img: '🍦' },
                { name: 'Pizza', img: '🍕' }

              ].map((item, index) => (
                <View key={index} className="items-center mr-6">
                  <TouchableOpacity className={`w-16 h-16 rounded-2xl justify-center items-center border ${item.promo ? 'border-primary bg-red-50' : 'border-slate-100 bg-slate-50'}`}>
                    {item.promo ? <Ionicons name="pricetag" size={26} color="#930004" /> : <Text className="text-3xl">{item.img}</Text>}
                  </TouchableOpacity>
                  <Text className="text-[11px] font-bold text-slate-500 mt-2">{item.name}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* 4. Đang khuyến mãi */}
          <View className="px-4 mb-4 flex-row justify-between items-end">
            <Text className="text-xl font-extrabold text-slate-800">🔥 Đang khuyến mãi</Text>
            <TouchableOpacity><Text className="text-primary font-bold text-sm">Tất cả</Text></TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-4 mb-8">
             <SmallFoodCard name="Ốc Đào Q4" rate="4.8" time="15 min" price="15k" promo />
             <SmallFoodCard name="Phở Lệ" rate="4.5" time="20 min" price="20k" />
             <SmallFoodCard name="Bánh Mì Huỳnh Hoa" rate="4.7" time="25 min" price="25k" promo />
          </ScrollView>

          {/* 5. Dành riêng cho bạn */}
          <View className="px-4 mb-4">
            <Text className="text-xl font-extrabold text-slate-800">✨ Dành riêng cho bạn</Text>
          </View>
          <View className="px-4 flex-row justify-between flex-wrap">
             <BigFoodCard name="Pizza Fabriccia" rate="4.7" time="15 min" price="49k" tag="Pizza" />
             <BigFoodCard name="Sweet & Pepper" rate="4.3" time="25 min" price="29k" tag="Vegan" discount="20%" />
             <BigFoodCard name="Pizza Fabriccia" rate="4.7" time="15 min" price="49k" tag="Pizza" />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

