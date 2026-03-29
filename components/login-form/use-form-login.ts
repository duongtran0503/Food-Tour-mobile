import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
const loginSchema = z.object({
  email: z.string().min(1, "Vui lòng nhập email").email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});
type LoginFormData = z.infer<typeof loginSchema>;
export function useFormLogin() { 
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);
    
      const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '' }
      });
    
      const onSubmit = (data: LoginFormData) => {
        console.log("Dữ liệu đăng nhập:", data);
         router.push('/(tabs)/home')
      };
 return {
      control,
      handleSubmit,
      errors,
      onSubmit,
      showPassword,
        setShowPassword

 }
    }
