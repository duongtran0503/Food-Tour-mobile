import { authService } from '@/services/auth-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().min(1, "Vui lòng nhập email").email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function useFormLogin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Thêm state để UI hiển thị loading nếu cần

  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  });

  const { mutate: loginMutation } = useMutation({
    mutationFn: authService.login,
    onSuccess: async (data) => {
      try {
        console.log(data)
        // Lấy token từ response (Cấu trúc theo data bạn cung cấp)
        const jwtToken = data.data.tokens.accessToken;


        // 1. Lưu token vào SecureStore (Bắt buộc phải await để chắc chắn đã lưu xong)
        await SecureStore.setItemAsync('userToken', jwtToken);

        // 2. Chuyển hướng ngay lập tức vào Home
        // Dùng replace để người dùng không thể nhấn Back quay lại trang Login
        router.replace('/home');
      } catch (storageError) {
        console.error("Lỗi khi lưu token:", storageError);
      }
    },
    onError: (error: any) => {
      // Bạn nên có thông báo lỗi (Alert hoặc Toast) cho người dùng ở đây
      console.error("Đăng nhập thất bại:", error?.response?.data?.message || error.message);
    },
    onSettled: () => {
      setIsLoading(false);
    }
  });

  const onSubmit = (data: LoginFormData) => {
    setIsLoading(true);
    loginMutation(data);
  };

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    showPassword,
    setShowPassword,
    isLoading // Trả về để button login có thể hiển thị trạng thái loading
  };
}