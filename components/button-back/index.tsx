import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from 'expo-router'; // Thêm useNavigation
import { TouchableOpacity } from "react-native";

export default function ButtonBack() {  
    const router = useRouter();
    const navigation = useNavigation();

    const handleBack = () => {
        if (navigation.canGoBack()) {
            router.back();
        } else {
            router.replace('/'); 
        }
    };

    return (
        <TouchableOpacity 
            onPress={handleBack} 
            className="w-10 h-10 bg-black/30 rounded-full items-center justify-center"
        >
            <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
    );
}