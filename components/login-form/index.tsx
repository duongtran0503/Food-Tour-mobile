import { useFormLogin } from '@/components/login-form/use-form-login';
import { Ionicons } from '@expo/vector-icons';
import { Controller } from 'react-hook-form';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';


export default function LoginForm() {
  const {control, handleSubmit, errors, onSubmit, showPassword, setShowPassword} = useFormLogin()
  return (
    <View className="gap-y-5">
      {/* Email Field */}
      <View>
        <Text className="text-slate-500 font-bold ml-1 mb-2">Email</Text>
        <View className={`flex-row items-center bg-slate-50 border ${errors.email ? 'border-red-500' : 'border-slate-100'} rounded-2xl px-4 h-16`}>
          <Ionicons name="mail-outline" size={20} color="#94a3b8" />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput 
                placeholder="duong@foodvk.com"
                className="flex-1 ml-3 text-slate-800 font-medium"
                keyboardType="email-address"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
            
              />
            )}
          />
        </View>
        {errors.email && <Text className="text-red-500 text-sm ml-2 mt-1">{errors.email.message}</Text>}
      </View>

      {/* Password Field */}
      <View>
        <Text className="text-slate-500 font-bold ml-1 mb-2">Mật khẩu</Text>
        <View className={`flex-row items-center bg-slate-50 border ${errors.password ? 'border-red-500' : 'border-slate-100'} rounded-2xl px-4 h-16`}>
          <Ionicons name="lock-closed-outline" size={20} color="#94a3b8" />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput 
                placeholder="••••••••"
                secureTextEntry={!showPassword}
                className="flex-1 ml-3 text-slate-800 font-medium"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#94a3b8" />
          </TouchableOpacity>
        </View>
        {errors.password && <Text className="text-red-500 text-sm ml-2 mt-1">{errors.password.message}</Text>}
      </View>

      <TouchableOpacity className="self-end">
        <Text className="text-primary font-bold">Quên mật khẩu?</Text>
      </TouchableOpacity>

      {/* Button Đăng nhập */}
      <TouchableOpacity 
        onPress={handleSubmit(onSubmit)}
        className="w-full h-16 bg-primary rounded-2xl justify-center items-center shadow-lg shadow-primary/40 mt-2 active:opacity-90"
      >
        <Text className="text-xl font-extrabold text-white">
          Đăng nhập
        </Text>
      </TouchableOpacity>
    </View>
  );
}