import { useFormRegister } from '@/components/register-form/use-register-form';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next'; // 1. Import hook
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RegisterForm() {
  const { 
    control, handleSubmit, errors, onSubmit, 
    showPass, setShowPass, 
    showConfirmPass, setShowConfirmPass 
  } = useFormRegister();
  const { t } = useTranslation(); // 2. Khởi tạo hàm t()

  return (
    <View className="gap-y-4">
      {/* Full Name Field */}
      <View>
        <Text className="text-slate-500 font-bold ml-1 mb-2">
          {t('screens.register.full_name_label')}
        </Text>
        <View className={`flex-row items-center bg-slate-50 border ${errors.fullName ? 'border-red-500' : 'border-slate-100'} rounded-2xl px-4 h-16`}>
          <Ionicons name="person-outline" size={20} color="#94a3b8" />
          <Controller
            control={control}
            name="fullName"
            render={({ field: { onChange, value } }) => (
              <TextInput 
                placeholder={t('screens.register.full_name_placeholder')}
                className="flex-1 ml-3 text-slate-800 font-medium" 
                onChangeText={onChange} 
                value={value} 
              />
            )}
          />
        </View>
        {errors.fullName && <Text className="text-red-500 text-sm ml-2 mt-1">{errors.fullName.message}</Text>}
      </View>

      {/* Email Field */}
      <View>
        <Text className="text-slate-500 font-bold ml-1 mb-2">
          {t('screens.register.email_label')}
        </Text>
        <View className={`flex-row items-center bg-slate-50 border ${errors.email ? 'border-red-500' : 'border-slate-100'} rounded-2xl px-4 h-16`}>
          <Ionicons name="mail-outline" size={20} color="#94a3b8" />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput 
                placeholder="duong@foodvk.com" 
                className="flex-1 ml-3 text-slate-800 font-medium" 
                keyboardType="email-address" 
                autoCapitalize="none" 
                onChangeText={onChange} 
                value={value} 
              />
            )}
          />
        </View>
        {errors.email && <Text className="text-red-500 text-sm ml-2 mt-1">{errors.email.message}</Text>}
      </View>

      {/* Password Field */}
      <View>
        <Text className="text-slate-500 font-bold ml-1 mb-2">
          {t('screens.register.password_label')}
        </Text>
        <View className={`flex-row items-center bg-slate-50 border ${errors.password ? 'border-red-500' : 'border-slate-100'} rounded-2xl px-4 h-16`}>
          <Ionicons name="lock-closed-outline" size={20} color="#94a3b8" />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <TextInput 
                placeholder="••••••••" 
                secureTextEntry={!showPass} 
                className="flex-1 ml-3 text-slate-800 font-medium" 
                onChangeText={onChange} 
                value={value} 
              />
            )}
          />
          <TouchableOpacity onPress={() => setShowPass(!showPass)}>
            <Ionicons name={showPass ? "eye-off-outline" : "eye-outline"} size={20} color="#94a3b8" />
          </TouchableOpacity>
        </View>
        {errors.password && <Text className="text-red-500 text-sm ml-2 mt-1">{errors.password.message}</Text>}
      </View>

      {/* Confirm Password Field */}
      <View>
        <Text className="text-slate-500 font-bold ml-1 mb-2">
          {t('screens.register.confirm_password_label')}
        </Text>
        <View className={`flex-row items-center bg-slate-50 border ${errors.confirmPassword ? 'border-red-500' : 'border-slate-100'} rounded-2xl px-4 h-16`}>
          <Ionicons name="shield-checkmark-outline" size={20} color="#94a3b8" />
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <TextInput 
                placeholder="••••••••" 
                secureTextEntry={!showConfirmPass} 
                className="flex-1 ml-3 text-slate-800 font-medium" 
                onChangeText={onChange} 
                value={value} 
              />
            )}
          />
          <TouchableOpacity onPress={() => setShowConfirmPass(!showConfirmPass)}>
            <Ionicons name={showConfirmPass ? "eye-off-outline" : "eye-outline"} size={20} color="#94a3b8" />
          </TouchableOpacity>
        </View>
        {errors.confirmPassword && <Text className="text-red-500 text-sm ml-2 mt-1">{errors.confirmPassword.message}</Text>}
      </View>

      {/* Button Đăng ký */}
      <TouchableOpacity 
        onPress={handleSubmit(onSubmit)}
        className="w-full h-16 bg-primary rounded-2xl justify-center items-center shadow-lg shadow-primary/40 mt-4 active:opacity-90"
      >
        <Text className="text-xl font-extrabold text-white">
          {t('screens.register.register_button')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}