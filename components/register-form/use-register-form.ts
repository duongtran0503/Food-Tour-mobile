import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const registerSchema = z.object({
  fullName: z.string().min(2, "Họ tên quá ngắn"),
  email: z.string().min(1, "Vui lòng nhập email").email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải từ 6 ký tự"),
  confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu không khớp",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export function useFormRegister() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: '', email: '', password: '', confirmPassword: '' }
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log("Dữ liệu đăng ký FoodVK:", data);
  };

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    showPass,
    setShowPass,
    showConfirmPass,
    setShowConfirmPass
  };
}