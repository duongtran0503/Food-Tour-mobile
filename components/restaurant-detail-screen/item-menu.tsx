import { MenuItemType } from "@/types/restaurant";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
 export default function MenuItemRestaurant({ item }: { item: MenuItemType}) {
    const router = useRouter()
    return  (
    <View className="flex-1 p-2">
     <TouchableOpacity onPress={()=>router.push({ pathname:"/food/detail/[id]",params:{id:item.id} })}>
         <View className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <View className="relative">
          <Image source={{ uri: item.images[0] }} className="w-full h-40" />
          <View className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded-lg flex-row items-center">
            <Ionicons name="star" size={10} color="#fbbf24" />
            <Text className="text-white text-[10px] font-bold ml-1">{5}</Text>
          </View>
        </View>
        <View className="p-3">
          <Text className="font-bold text-slate-900 text-sm mb-1" numberOfLines={1}>{item.name}</Text>
          <Text className="text-slate-400 text-[10px] mb-2" numberOfLines={1}>{item.description}</Text>
          <View className="flex-row justify-between items-center">
            <Text className="text-[#930004] font-black text-sm">{item.priceRange.min.toLocaleString()} - {item.priceRange.max.toLocaleString()}₫</Text>
            <TouchableOpacity className="bg-[#930004] w-7 h-7 rounded-full items-center justify-center">
              <Ionicons name="add" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
     </TouchableOpacity>
    </View>
  );
 }