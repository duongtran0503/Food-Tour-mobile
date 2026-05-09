import apiClient from "@/config/axios-config"; // Đảm bảo bạn đã có axios config
import { useDebounce } from "@/hooks/useDebounce"; // Hook để trì hoãn gọi API
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchBar() {
  const { t } = useTranslation();
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const router = useRouter()
  
  // Debounce text: Chỉ trigger API sau khi người dùng ngừng gõ 500ms
  const debouncedSearchTerm = useDebounce(searchText, 500);

  // Gọi API tìm kiếm
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['searchRestaurants', debouncedSearchTerm],
    queryFn: async () => {
      if (!debouncedSearchTerm) return null;
      const response = await apiClient.get(
        `/restaurants?page=1&limit=10&search=${debouncedSearchTerm}`
      );
      return response.data;
    },
    enabled: debouncedSearchTerm.length > 0,
  });

  const restaurants = data?.items || [];
  console.log("Search results:", data); // Debug log để kiểm tra dữ liệu nhận được

  return (
    <View>
      {/* 1. Thanh Search hiển thị ban đầu */}
      <TouchableOpacity 
        activeOpacity={1}
        onPress={() => setIsSearching(true)}
        className="flex-row items-center bg-white rounded-2xl px-4 h-14 shadow-lg"
      >
        <Ionicons name="search" size={20} color="#94a3b8" />
        <Text className="flex-1 ml-3 font-medium text-slate-400">
          {t('components.searchBar.placeholder_main')}
        </Text>
        <View className="bg-primary/10 p-2 rounded-lg">
          <Ionicons name="options-outline" size={20} color="#930004" />
        </View>
      </TouchableOpacity>

      {/* 2. Giao diện Tìm kiếm thực tế */}
      <Modal 
        visible={isSearching} 
        animationType="slide" 
        onRequestClose={() => setIsSearching(false)}
      >
        <SafeAreaView className="flex-1 bg-white">
          <View className="flex-row items-center px-4 py-3 border-b border-slate-100">
            <TouchableOpacity onPress={() => setIsSearching(false)} className="pr-3">
              <Ionicons name="arrow-back" size={24} color="#930004" />
            </TouchableOpacity>
            
            <View className="flex-1 flex-row items-center bg-slate-100 rounded-xl px-3 h-11">
              <Ionicons name="search" size={18} color="#64748b" />
              <TextInput 
                autoFocus
                placeholder={t('components.searchBar.placeholder_input')}
                className="flex-1 ml-2 font-medium text-slate-800"
                value={searchText}
                onChangeText={setSearchText}
              />
              {(isLoading || isFetching) && <ActivityIndicator size="small" color="#930004" className="mr-2" />}
              {searchText.length > 0 && !isLoading && (
                <TouchableOpacity onPress={() => setSearchText("")}>
                  <Ionicons name="close-circle" size={18} color="#94a3b8" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View className="flex-1">
            <FlatList
              data={restaurants}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingBottom: 20 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                onPress={()=> router.push({ pathname: "/restaurant/detail/[id]", params: { id: item.id } })}
                className="flex-row items-center px-5 py-4 border-b border-slate-50 active:bg-slate-50">
                  <Image 
                    source={{ uri: item.images[0] }} 
                    className="w-12 h-12 rounded-lg bg-slate-200"
                    
                  />
                  <View className="ml-4 flex-1">
                    <View className="flex-row justify-between items-center">
                      <Text className="text-slate-800 font-bold text-base">{item.name}</Text>
                      <View className="flex-row items-center">
                        <Ionicons name="star" size={12} color="#fbbf24" />
                        <Text className="text-xs ml-1 text-slate-600 font-bold">{item.rating}</Text>
                      </View>
                    </View>
                    <Text numberOfLines={1} className="text-slate-500 text-xs mt-1">
                      {item.address}
                    </Text>
                    <Text className="text-[10px] text-primary font-bold mt-1 uppercase italic">
                      {item.openingTime}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              ListHeaderComponent={() => (
                 <Text className="px-5 pt-4 pb-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  {debouncedSearchTerm ? t('components.searchBar.results_title') : t('components.searchBar.suggestions_title')}
                </Text>
              )}
              ListEmptyComponent={() => (
                <View className="items-center mt-10 px-10">
                  <Ionicons name="search-outline" size={48} color="#cbd5e1" />
                  <Text className="text-slate-400 italic text-center mt-4">
                    {debouncedSearchTerm 
                      ? t('components.searchBar.no_results') 
                      : t('components.searchBar.start_typing')}
                  </Text>
                </View>
              )}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}