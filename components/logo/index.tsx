import logo from "@/assets/images/logo_food_app.png";
import { Image } from 'expo-image';
import { View } from "react-native";
export default function Logo() {

    return  <View>
             <Image
              source={logo}
              style={{ width: 80, height: 80 }}
              contentFit="contain"
             />   
    </View>
}