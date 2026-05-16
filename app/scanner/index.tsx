import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function QRScannerScreen() {
    const router = useRouter();
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    // 1. Kiểm tra quyền truy cập Camera
    if (!permission) {
        return <View className="flex-1 justify-center items-center bg-black" />;
    }

    if (!permission.granted) {
        return (
            <View className="flex-1 justify-center items-center bg-slate-50 p-6">
                <Text className="text-center font-medium text-slate-600 mb-4">
                    Ứng dụng cần quyền truy cập Camera để quét mã QR Tour & Nhà hàng.
                </Text>
                <Button onPress={requestPermission} title="Cấp quyền Camera" color="#930004" />
            </View>
        );
    }

    // 2. Hàm xử lý khi quét trúng mã QR thành công
    const handleBarcodeScanned = ({ type, data }: { type: string; data: string }) => {
        setScanned(true);
        console.log(`[🔍 QR Scanned] Type: ${type} | Data: ${data}`);

        try {
            // Trường hợp 1: QR chứa một Deep Link hoàn chỉnh (Ví dụ: foodietour://tour/detail/123)
            if (data.startsWith("foodietour://") || data.startsWith("exp://")) {
                const parsed = Linking.parse(data);
                const internalPath = parsed.path; // Sẽ lấy được dạng: "tour/detail/123"

                if (internalPath) {
                    router.push(`/${internalPath}` as any);
                    return;
                }
            }

            // Trường hợp 2: QR chỉ chứa đường dẫn tương đối (Ví dụ khách quét mã cấu hình sẵn: "tour/detail/69fc559ff18421b4ef963c91")
            if (data.includes("tour/detail/") || data.includes("food/detail/")) {
                router.push(`/${data}` as any);
                return;
            }

            // Nếu mã QR không đúng định dạng của App
            alert(`Mã QR không hợp lệ hoặc không thuộc hệ thống Foodie Tour: ${data}`);
        } catch (error) {
            alert("Có lỗi xảy ra khi xử lý mã QR!");
        }
    };

    return (
        <View className="flex-1 bg-black">
            {/* Khung View Camera */}
            <CameraView
                style={StyleSheet.absoluteFillObject}
                facing="back"
                barcodeScannerSettings={{
                    barcodeTypes: ["qr"], // Chỉ tập trung quét mã QR, bỏ qua mã vạch sản phẩm thông thường
                }}
                onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
            />

            {/* Giao diện lớp phủ (Overlay) giả lập khung quét vuông */}
            <View className="flex-1 justify-center items-center bg-black/40">
                <View className="w-64 h-64 border-4 border-white rounded-3xl justify-center items-center">
                    {/* Đèn báo nhấp nháy hoặc góc bo thiết kế tùy ý */}
                    <View className="w-full h-0.5 bg-red-600 absolute animate-pulse" />
                </View>
                <Text className="text-white font-semibold mt-6 tracking-wide bg-black/60 px-4 py-2 rounded-full">
                    Di chuyển khung vuông trùng với mã QR
                </Text>
            </View>

            {/* Nút quay lại góc trên */}
            <TouchableOpacity
                onPress={() => router.back()}
                className="absolute top-12 left-5 bg-black/50 p-3 rounded-full"
            >
                <Ionicons name="arrow-back" size={24} color="#ffffff" />
            </TouchableOpacity>

            {/* Nếu đã quét xong, hiển thị nút quét lại */}
            {scanned && (
                <View className="absolute bottom-10 left-10 right-10">
                    <TouchableOpacity
                        onPress={() => setScanned(false)}
                        className="bg-primary h-14 rounded-2xl justify-center items-center shadow-lg"
                        style={{ backgroundColor: '#930004' }}
                    >
                        <Text className="text-white font-bold text-base">Chạm để quét lại</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}