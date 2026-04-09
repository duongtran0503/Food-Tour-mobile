import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useTranslation } from 'react-i18next'; // 1. Import hook
import {
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchBar() {
  const { t } = useTranslation(); // 2. Khởi tạo hàm t()
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");

  const suggestions = [
    { id: '1', title: 'Ốc Đào', area: 'Vĩnh Khánh' },
    { id: '2', title: 'Ốc Oanh', area: 'Vĩnh Khánh' },
    { id: '3', title: 'Phở Lệ', area: 'Vĩnh Khánh' },
    { id: '4', title: 'Bánh mì Huỳnh Hoa', area: 'Quận 1' },
  ];

  const filteredData = suggestions.filter(item => 
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

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

      {/* 2. Giao diện Tìm kiếm khi Focus (Modal) */}
      <Modal 
        visible={isSearching} 
        animationType="fade" 
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
              {searchText.length > 0 && (
                <TouchableOpacity onPress={() => setSearchText("")}>
                  <Ionicons name="close-circle" size={18} color="#94a3b8" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View className="flex-1">
            <TouchableOpacity className="flex-row items-center px-5 py-4 border-b border-slate-50">
              <Ionicons name="location-outline" size={20} color="#64748b" />
              <Text className="ml-3 text-slate-700 font-bold">
                {t('components.searchBar.use_location')}
              </Text>
            </TouchableOpacity>

            <Text className="px-5 pt-4 pb-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              {t('components.searchBar.suggestions_title')}
            </Text>

            <FlatList
              data={filteredData}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity className="flex-row items-center px-5 py-4 border-b border-slate-50 active:bg-slate-50">
                  <Ionicons name="restaurant-outline" size={20} color="#cbd5e1" />
                  <View className="ml-4">
                    <Text className="text-slate-800 font-semibold text-base">{item.title}</Text>
                    <Text className="text-slate-500 text-xs">
                      {item.area}, {t('components.searchBar.suffix_country')}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              ListEmptyComponent={() => (
                <View className="items-center mt-10">
                  <Text className="text-slate-400 italic">
                    {t('components.searchBar.no_results')}
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