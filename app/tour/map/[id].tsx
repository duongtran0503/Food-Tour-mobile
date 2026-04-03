import ButtonBack from '@/components/button-back';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

export default function TourMap() {
  // 1. Tọa độ các quán ăn (Dương thay bằng tọa độ thật của bạn)
  const locations = [
    { name: "Oc Oanh", lat: 10.7555, lng: 106.7110 },
    { name: "Oc Dao", lat: 10.7580, lng: 106.7080 }
  ];

  // 2. Tạo chuỗi danh sách các điểm dừng cho Google Maps
  const markers = locations.map(loc => `${loc.lat},${loc.lng}`).join('|');
  
  // 3. URL này sẽ mở Google Maps bản web:
  // - showuser=1: Hiện chấm xanh vị trí người dùng
  // - views=traffic: Hiện tình trạng giao thông
  const mapUrl = `https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=${locations[1].lat},${locations[1].lng}&waypoints=${locations[0].lat},${locations[0].lng}&travelmode=walking`;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ButtonBack />
      </View>
      
      <WebView 
        source={{ uri: mapUrl }} 
        style={styles.map}
        // Cho phép WebView truy cập vị trí GPS của điện thoại
        geolocationEnabled={true}
        javaScriptEnabled={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  map: {
    flex: 1,
    marginTop: 0,
  },
});