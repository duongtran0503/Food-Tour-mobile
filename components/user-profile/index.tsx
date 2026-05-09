import { ProfileFormData } from "@/types/user";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";
// Import type từ file schema bạn đã tạo

interface ProfileFormProps {
  control: Control<ProfileFormData>;      // Type cho control của react-hook-form
  errors: FieldErrors<ProfileFormData>;   // Type cho object lỗi
  onSubmit: () => void;                   // Hàm xử lý khi nhấn nút
  isLoading: boolean;                     // Trạng thái đang call API
  isDirty: boolean;                       // Trạng thái form có sự thay đổi
}

export function ProfileForm({ 
  control, 
  errors, 
  onSubmit, 
  isLoading, 
  isDirty 
}: ProfileFormProps) {
  return (
    <View className="p-4 w-full">
      {/* Full Name */}
      <Text className="mb-2 font-bold text-slate-700">Họ và tên</Text>
      <Controller
        control={control}
        name="fullName"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className={`p-4 bg-slate-100 rounded-2xl mb-1 ${
              errors.fullName ? 'border border-red-500' : 'border border-transparent'
            }`}
            placeholder="Nhập họ tên"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.fullName && (
        <Text className="text-red-500 text-sm mb-2">{errors.fullName.message}</Text>
      )}

      {/* Phone Number */}
      <Text className="mb-2 mt-4 font-bold text-slate-700">Số điện thoại</Text>
      <Controller
        control={control}
        name="phoneNumber"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className={`p-4 bg-slate-100 rounded-2xl mb-1 ${
              errors.phoneNumber ? 'border border-red-500' : 'border border-transparent'
            }`}
            placeholder="Nhập số điện thoại"
            keyboardType="phone-pad"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.phoneNumber && (
        <Text className="text-red-500 text-sm mb-2">{errors.phoneNumber.message}</Text>
      )}

      {/* Email (Read Only) */}
      <Text className="mb-2 mt-4 font-bold text-slate-700">Email</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { value } }) => (
          <View className="p-4 bg-slate-200 rounded-2xl">
            <Text className="text-slate-500">{value || "Chưa có email"}</Text>
          </View>
        )}
      />
      <Text className="text-slate-400 text-xs mt-1 italic">
        * Email không thể thay đổi
      </Text>

      {/* Submit Button */}
      <TouchableOpacity
        onPress={onSubmit}
        disabled={isLoading || !isDirty}
        activeOpacity={0.7}
        className={`mt-10 p-4 rounded-2xl items-center shadow-sm ${
          isDirty && !isLoading ? 'bg-red-700' : 'bg-slate-400'
        }`}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-bold text-lg">Cập nhật thông tin</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}