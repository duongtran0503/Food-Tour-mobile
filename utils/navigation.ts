import { Alert, Linking } from 'react-native';

export interface Location {
    latitude: number;
    longitude: number;
    name?: string;
}

export const openGoogleMapsTour = (
    origin: Location,
    destination: Location,
    stops: Location[]
) => {
    // 1. Định dạng tọa độ cho Origin và Destination
    const originCoord = `${origin.latitude},${origin.longitude}`;
    const destCoord = `${destination.latitude},${destination.longitude}`;

    // 2. Định dạng Waypoints (Các quán ăn dọc đường) nối với nhau bằng dấu '|'
    const waypointsCoord = stops
        .map(stop => `${stop.latitude},${stop.longitude}`)
        .join('|');

    // 3. Tạo URL theo chuẩn Google Maps
    // Chế độ di chuyển: 'w' (đi bộ), 'd' (ô tô)
    const url = `https://www.google.com/maps/dir/?api=1&origin=${originCoord}&destination=${destCoord}&waypoints=${waypointsCoord}&travelmode=walking`;

    // 4. Kiểm tra và mở ứng dụng
    Linking.canOpenURL(url)
        .then((supported) => {
            if (supported) {
                Linking.openURL(url);
            } else {
                Alert.alert("Lỗi", "Điện thoại của bạn chưa cài đặt Google Maps");
            }
        })
        .catch((err) => console.error("An error occurred", err));
};