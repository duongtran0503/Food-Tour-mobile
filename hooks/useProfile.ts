import { userService } from '@/services/user-service';
import { ProfileFormData, profileSchema } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';

export function useProfile() {
    const queryClient = useQueryClient();


    // 1. Fetch dữ liệu profile
    const { data: response, isLoading: isFetching } = useQuery({
        queryKey: ['userProfile'],
        queryFn: userService.getProfile,

    });
    console.log("Data fetched in useProfile:", response); // Debug log  



    // 2. Khởi tạo Form
    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isDirty },
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            fullName: '',
            phoneNumber: '',
            avatar: '',
            email: '',
        },
    });

    // 3. Đổ dữ liệu từ API vào form khi fetch thành công
    useEffect(() => {
        if (response) {
            reset({
                fullName: response.fullName,
                phoneNumber: response.phoneNumber,
                avatar: response.avatar,
                email: response.email,
            });
        }
    }, [response, reset]);

    // 4. Mutation cập nhật profile
    const { mutate: updateMutation, isPending: isUpdating } = useMutation({
        mutationFn: userService.updateProfile,
        onSuccess: () => {
            // Refresh lại cache để UI cập nhật thông tin mới nhất
            queryClient.invalidateQueries({ queryKey: ['userProfile'] });
            Alert.alert("Thành công", "Thông tin đã được cập nhật!");
        },
        onError: (error: any) => {
            Alert.alert("Lỗi", error?.response?.data?.message || "Không thể cập nhật");
        },
    });

    const onSubmit = (formData: ProfileFormData) => {
        if (response?.id) {
            updateMutation({
                id: response.id,
                data: {
                    fullName: formData.fullName,
                    phoneNumber: formData.phoneNumber,
                    avatar: formData.avatar,
                },
            });
        }
    };

    return {
        control,
        handleSubmit: handleSubmit(onSubmit),
        errors,
        isLoading: isFetching || isUpdating,
        userData: response || null,
        isDirty,
        setValue,
    };
}