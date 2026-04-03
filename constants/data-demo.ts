import { RestaurantDetailType, RestaurantType } from "@/types/restaurant";
import { TourType } from "@/types/tour";
import generateRandomId from "@/utils/generate-random-id";
export const IMAGE_TEMPLATE = 'https://dulichhalong.com.vn/UserFiles/image/C%E1%BA%A9m%20nang/%C4%91i%E1%BB%83m%20du%20l%E1%BB%8Bch/foodtour%201.jpg';
export const VINK_TOURS: TourType[] = [
    {
        id: generateRandomId(),
        title: 'Thiên Đường Ốc Đêm Vĩnh Khánh',
        image: IMAGE_TEMPLATE,
        duration: '3 tiếng',
        price: '250.000đ',
        rating: '4.9',
        places: 4,
    },
    {
        id: generateRandomId(),
        title: 'Tour Ăn Vặt & Trà Sữa Gen Z',
        image: IMAGE_TEMPLATE,
        duration: '2 tiếng',
        price: '120.000đ',
        rating: '4.7',
        places: 5,
    },
    {
        id: generateRandomId(),
        title: 'Ẩm Thực Đường Phố Sài Gòn Gốc',
        image: IMAGE_TEMPLATE,
        duration: '4 tiếng',
        price: '300.000đ',
        rating: '4.8',
        places: 6,
    }
];


export const MOCK_RESTAURANTS: RestaurantType[] = [
    { id: '1', name: 'Ốc Oanh - Vĩnh Khánh', rating: '4.8', address: '534 Vĩnh Khánh, Q.4', openTime: '16:00 - 23:00', image: IMAGE_TEMPLATE },

    { id: '2', name: 'Ốc Đào 2', rating: '4.5', address: '212B Nguyễn Trãi, Q.1', openTime: '10:00 - 22:00', image: IMAGE_TEMPLATE },
    { id: '3', name: 'Chè Hà Trâm', rating: '4.9', address: 'Vĩnh Khánh, Q.4', openTime: '17:00 - 00:00', image: IMAGE_TEMPLATE },
    { id: '4', name: 'Ốc Vũ', rating: '4.2', address: 'Số 37 Vĩnh Khánh, Q.4', openTime: '15:00 - 23:00', image: IMAGE_TEMPLATE },
    { id: '5', name: 'Phá Lấu Cô Lài', rating: '4.7', address: 'Tôn Đản, Q.4', openTime: '14:00 - 21:00', image: IMAGE_TEMPLATE },
];

export const restaurant: RestaurantDetailType = {
    name: "Ốc Oanh - Vĩnh Khánh",
    rating: "4.8",
    reviews: "1,652",
    openTime: "16:00 - 23:30",
    address: "534 Vĩnh Khánh, Phường 10, Quận 4, TP.HCM",
    phone: "090 123 4567",
    description: "Quán ốc nổi tiếng nhất phố ẩm thực Vĩnh Khánh với không gian rộng rãi và các món hải sản tươi sống được chế biến đậm đà.",
    images: [
        'https://vcdn1-dulich.vnecdn.net/2022/06/03/quan-oc-vinh-khanh-1-1654245050.jpg',
        'https://images2.thanhnien.vn/528068263637045248/2023/5/12/oc-oanh-vinh-khanh-16838814757271813958046.jpg',
        'https://dulichhalong.com.vn/UserFiles/image/C%E1%BA%A9m%20nang/%C4%91i%E1%BB%83m%20du%20l%E1%BB%8Bch/foodtour%201.jpg'
    ],
    menu: [
        { id: '1', name: 'Ốc hương trứng muối', price: '150.000đ', image: 'https://vcdn1-dulich.vnecdn.net/2022/06/03/quan-oc-vinh-khanh-1-1654245050.jpg', rating: '5.0', desc: 'Béo ngậy vị trứng muối' },
        { id: '2', name: 'Càng ghẹ rang muối', price: '120.000đ', image: 'https://dulichhalong.com.vn/UserFiles/image/C%E1%BA%A9m%20nang/%C4%91i%E1%BB%83m%20du%20l%E1%BB%8Bch/foodtour%201.jpg', rating: '4.8', desc: 'Cay nồng, đậm đà' },
        { id: '3', name: 'Sò lông nướng mỡ hành', price: '80.000đ', image: 'https://vcdn1-dulich.vnecdn.net/2022/06/03/quan-oc-vinh-khanh-1-1654245050.jpg', rating: '4.7', desc: 'Thơm mùi mỡ hành' },
        { id: '4', name: 'Nghêu hấp thái', price: '90.000đ', image: 'https://images2.thanhnien.vn/528068263637045248/2023/5/12/oc-oanh-vinh-khanh-16838814757271813958046.jpg', rating: '4.9', desc: 'Chua cay chuẩn vị' },
    ]
};