import { z } from "zod";

export const profileSchema = z.object({
    fullName: z.string().min(1, "Họ tên không được để trống"),
    phoneNumber: z.string().regex(/^[0-9]{10}$/, "Số điện thoại phải có 10 chữ số"),
    avatar: z.string().url("Link ảnh không hợp lệ").optional().or(z.string().nullable()),
    email: z.string().email().optional(), // Chỉ dùng để hiển thị, không gửi lên API update
});

export type ProfileFormData = z.infer<typeof profileSchema>;
export interface UserProfileType {
    id: string;
    email: string;
    fullName: string;
    phoneNumber: string;
    avatar: string;
    role: string;
}