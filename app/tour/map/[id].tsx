import ButtonBack from '@/components/button-back';
import { SpeechControls } from '@/components/restaurant-detail-screen/SpeechControls';
import apiClient from '@/config/axios-config';
import { useTourSpeech } from '@/hooks/useTourSpeech';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';

const { height: screenHeight } = Dimensions.get('window');

export default function TourMapScreen() {
  const mapRef = useRef<MapView>(null);
  const { id } = useLocalSearchParams();
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const [footerHeight, setFooterHeight] = useState(screenHeight * 0.4);

  // 1. Sửa lỗi fetch: Đảm bảo lấy đúng object tour từ response
  const { data: tourData, isLoading, isError, error } = useQuery({
    queryKey: ['tourDetail', id],
    queryFn: async () => {
      const response = await apiClient.get(`/tours/details/${id}`);
      const finalData = response.data?.data || response.data;
      
      if (!finalData) {
        throw new Error("Không tìm thấy dữ liệu tour");
      }
      return finalData;
    },
    enabled: !!id,
    retry: 1,
  });
const { isSpeaking, isPaused, handleStart, handlePauseResume, handleStop } = useTourSpeech(tourData);
  

  // 2. Chuyển đổi dữ liệu stops thành tọa độ an toàn cho Polyline và Map
  const coordinates = useMemo(() => {
    if (!tourData?.stops || !Array.isArray(tourData.stops)) return [];
    return tourData.stops
      .map((s: any) => ({
        latitude: Number(s.location?.latitude),
        longitude: Number(s.location?.longitude),
      }))
      .filter((c: any) => !isNaN(c.latitude) && !isNaN(c.longitude));
  }, [tourData]);

  // 3. Tự động căn chỉnh bản đồ
  useEffect(() => {
    if (coordinates.length > 0 && mapRef.current) {
      const timer = setTimeout(() => {
        mapRef.current?.fitToCoordinates(coordinates, {
          edgePadding: { top: 80, right: 50, bottom: footerHeight + 20, left: 50 },
          animated: true,
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [coordinates, footerHeight]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#930004" />
        <Text style={styles.loadingText}>{t("screens.tour_map_screen.loading")}</Text>
      </View>
    );
  }

  if (isError || !tourData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: 'red' }}>{error instanceof Error ? error.message : "Unable to load tour details."}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* BẢN ĐỒ */}
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: coordinates[0]?.latitude || 10.762622,
          longitude: coordinates[0]?.longitude || 106.706053,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {/* MARKERS */}
        {tourData.stops?.map((loc: any, index: number) => {
          const lat = Number(loc.location?.latitude);
          const lng = Number(loc.location?.longitude);
          if (isNaN(lat) || isNaN(lng)) return null;

          return (
            <Marker
              key={`marker-${loc.id || index}`}
              coordinate={{ latitude: lat, longitude: lng }}
              tracksViewChanges={false}
            >
              <View style={styles.markerContainer}>
                <View style={styles.markerCard}>
                  <Image
                    source={{ uri: loc.image || 'https://via.placeholder.com/150' }}
                    style={styles.markerImage}
                  />
                  <View style={styles.markerInfo}>
                    <Text numberOfLines={1} style={styles.markerPlaceName}>{loc.place}</Text>
                    <Text numberOfLines={1} style={styles.markerDishName}>{loc.dish}</Text>
                    <View style={styles.pointBadge}>
                      <Text style={styles.pointText}>ĐIỂM {index + 1}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.arrowDown} />
              </View>
            </Marker>
          );
        })}

        {/* POLYLINE */}
        {coordinates.length > 1 && (
          <Polyline
            coordinates={coordinates}
            strokeColor="#930004"
            strokeWidth={3}
          />
        )}
      </MapView>

      {/* HEADER */}
      <View style={styles.header}>
        <ButtonBack />
        <View style={styles.headerTitleContainer}>
          <Text numberOfLines={1} style={styles.headerTitle}>
            {tourData.title || "CHI TIẾT HÀNH TRÌNH"}
          </Text>
        </View>
      </View>

      {/* FOOTER - CÓ THỂ KÉO LÊN XUỐNG */}
      <View 
        style={[styles.footer, { maxHeight: screenHeight * 0.5 }]}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setFooterHeight(height);
        }}
      >
        <View style={styles.dragHandle}>
          <View style={styles.dragHandleBar} />
        </View>
        
        <ScrollView 
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.footerContent}
          bounces={true}
        >
          <View className="my-4 px-4">
     <SpeechControls 
        isSpeaking={isSpeaking}
        isPaused={isPaused}
        onStart={handleStart}
        onPauseResume={handlePauseResume}
        onStop={handleStop}
      />
  </View>
          {/* Header Info */}
          <View style={styles.footerRow}>
            <Image 
              source={{ uri: tourData.image || 'https://via.placeholder.com/150' }} 
              style={styles.footerImage} 
            />
            <View style={styles.footerTextContainer}>
              <View style={styles.ratingRow}>
                <View style={styles.ratingBadge}>
                  <Text style={styles.ratingText}>⭐ {tourData.rating || "5.0"}</Text>
                </View>
                <Text style={styles.categoryText}>FOOD TOUR</Text>
              </View>
              <Text style={styles.footerTitle}>{tourData.title}</Text>
              <Text 
                numberOfLines={expanded ? undefined : 3}
                style={styles.footerDesc}
              >
                {tourData.description}
              </Text>
              <TouchableOpacity onPress={() => setExpanded(!expanded)}>
                <Text style={styles.readMoreText}>
                  {expanded ? "Thu gọn" : "Xem thêm"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Tour Stats */}
          <View style={styles.footerStats}>
            <View style={styles.stopBadge}>
              <Text style={styles.stopText}>📍 {tourData.stops?.length || 0} {t("screens.tour_map_screen.stops")}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>GIÁ TOUR</Text>
              <Text style={styles.priceValue}>
                {tourData.price || "Miễn phí"}
              </Text>
            </View>
          </View>

          {/* HIỂN THỊ TOÀN BỘ STOPS */}
          <View style={styles.stopsSection}>
            <Text style={styles.stopsSectionTitle}>📋 {t("screens.tour_map_screen.detail_tour")}</Text>
            {tourData.stops?.map((stop: any, index: number) => (
              <View key={stop.id || index} style={styles.stopCard}>
                <View style={styles.stopNumberContainer}>
                  <Text style={styles.stopNumber}>ĐIỂM {index + 1}</Text>
                </View>
                <Image 
                  source={{ uri: stop.image || 'https://via.placeholder.com/150' }} 
                  style={styles.stopImage} 
                />
                <View style={styles.stopInfo}>
                  <Text style={styles.stopPlace}>{stop.place}</Text>
                  <View style={styles.dishContainer}>
                    <Text style={styles.dishIcon}>🍽️{t("screens.tour_map_screen.price")}</Text>
                    <Text style={styles.stopDish}>{stop.dish}</Text>
                  </View>
                  <Text style={styles.stopDesc}>{stop.desc}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={{ height: 30 }} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  loadingText: { marginTop: 10, color: '#64748b', fontWeight: 'bold' },
  
  header: { 
    position: 'absolute', 
    top: Platform.OS === 'ios' ? 50 : 30, 
    left: 20, 
    right: 20, 
    flexDirection: 'row', 
    alignItems: 'center', 
    zIndex: 10 
  },
  headerTitleContainer: { 
    flex: 1, 
    marginLeft: 12, 
    backgroundColor: 'white', 
    padding: 12, 
    borderRadius: 15, 
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4
  },
  headerTitle: { 
    fontWeight: '900', 
    color: '#1e293b', 
    fontSize: 11, 
    textTransform: 'uppercase' 
  },
  
  markerContainer: { width: 160, alignItems: 'center' },
  markerCard: { 
    flexDirection: 'row', 
    backgroundColor: 'white', 
    borderRadius: 15, 
    padding: 5, 
    borderWidth: 1, 
    borderColor: '#f1f5f9', 
    elevation: 4,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2
  },
  markerImage: { width: 45, height: 45, borderRadius: 10, backgroundColor: '#f1f5f9' },
  markerInfo: { flex: 1, marginLeft: 8, justifyContent: 'center' },
  markerPlaceName: { fontSize: 10, fontWeight: 'bold', color: '#1e293b' },
  markerDishName: { fontSize: 8, color: '#930004', fontWeight: '600' },
  pointBadge: { backgroundColor: '#fef2f2', alignSelf: 'flex-start', paddingHorizontal: 5, paddingVertical: 2, borderRadius: 10, marginTop: 2 },
  pointText: { fontSize: 7, fontWeight: 'bold', color: '#930004' },
  arrowDown: {
    width: 0, 
    height: 0, 
    borderLeftWidth: 8, 
    borderRightWidth: 8,
    borderTopWidth: 10, 
    borderStyle: 'solid', 
    borderTopColor: 'white',
    borderLeftColor: 'transparent', 
    borderRightColor: 'transparent', 
    marginTop: -1
  },
  
  footer: { 
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0, 
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 10,
  },
  dragHandle: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 8,
  },
  dragHandleBar: {
    width: 50,
    height: 5,
    backgroundColor: '#cbd5e1',
    borderRadius: 3,
  },
  footerContent: { 
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  
  footerRow: { flexDirection: 'row', marginBottom: 15 },
  footerImage: { width: 80, height: 80, borderRadius: 20, backgroundColor: '#f1f5f9' },
  footerTextContainer: { flex: 1, marginLeft: 15 },
  ratingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  ratingBadge: { backgroundColor: '#fffbeb', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  ratingText: { color: '#b45309', fontWeight: 'bold', fontSize: 11 },
  categoryText: { fontSize: 10, color: '#94a3b8', fontWeight: 'bold' },
  footerTitle: { fontSize: 18, fontWeight: '900', color: '#0f172a', marginBottom: 8, lineHeight: 24 },
  footerDesc: { fontSize: 13, color: '#64748b', lineHeight: 20, marginBottom: 4 },
  readMoreText: { color: '#930004', fontWeight: '600', fontSize: 13, marginTop: 4 },
  
  footerStats: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 20, 
    paddingTop: 15, 
    paddingBottom: 15,
    borderTopWidth: 1, 
    borderTopColor: '#f1f5f9',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9'
  },
  stopBadge: { backgroundColor: '#f0fdf4', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  stopText: { color: '#15803d', fontWeight: 'bold', fontSize: 12 },
  priceContainer: { alignItems: 'flex-end' },
  priceLabel: { fontSize: 10, color: '#94a3b8', fontWeight: 'bold' },
  priceValue: { color: '#930004', fontSize: 22, fontWeight: '900' },
  
  stopsSection: {
    marginTop: 10,
  },
  stopsSectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0f172a',
    marginBottom: 15,
    letterSpacing: 1,
  },
  stopCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 15,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    position: 'relative',
  },
  stopNumberContainer: {
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: '#930004',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  stopNumber: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  stopImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 12,
    marginTop: 8,
  },
  stopInfo: {
    flex: 1,
    marginTop: 8,
  },
  stopPlace: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  dishContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  dishIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  stopDish: {
    fontSize: 12,
    color: '#930004',
    fontWeight: '600',
  },
  stopDesc: {
    fontSize: 12,
    color: '#64748b',
    lineHeight: 18,
  },
});