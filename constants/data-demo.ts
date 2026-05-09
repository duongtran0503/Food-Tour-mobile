import { RestaurantDetailType, RestaurantType } from "@/types/restaurant";
import { TourType } from "@/types/tour";
export const IMAGE_TEMPLATE = 'https://dulichhalong.com.vn/UserFiles/image/C%E1%BA%A9m%20nang/%C4%91i%E1%BB%83m%20du%20l%E1%BB%8Bch/foodtour%201.jpg';


export const getVinkTours = (lang: string = 'vi'): TourType[] => {
    const data: Record<string, TourType[]> = {
        vi: [
            {
                id: 'vink-1',
                name: 'Thiên Đường Ốc Đêm Vĩnh Khánh',
                description: 'Khám phá thiên đường các món ốc đặc sắc tại Sài Gòn.',
                images: [IMAGE_TEMPLATE],
                duration: '3 tiếng',
                price: 250000,
                restaurants: Array(4).fill({}), // Giả lập 4 địa điểm
                createdAt: "2026-05-05T08:11:31.011Z",
                updatedAt: "2026-05-05T08:11:31.011Z"
            },
            {
                id: 'vink-2',
                name: 'Tour Ăn Vặt & Trà Sữa Gen Z',
                description: 'Những món ăn hot trend nhất dành cho giới trẻ.',
                images: [IMAGE_TEMPLATE],
                duration: '2 tiếng',
                price: 120000,
                restaurants: Array(5).fill({}),
                createdAt: "2026-05-05T08:11:31.011Z",
                updatedAt: "2026-05-05T08:11:31.011Z"
            },
            {
                id: 'vink-3',
                name: 'Ẩm Thực Đường Phố Sài Gòn Gốc',
                description: 'Hương vị truyền thống qua nhiều thế hệ.',
                images: [IMAGE_TEMPLATE],
                duration: '4 tiếng',
                price: 300000,
                restaurants: Array(6).fill({}),
                createdAt: "2026-05-05T08:11:31.011Z",
                updatedAt: "2026-05-05T08:11:31.011Z"
            }
        ],
        en: [
            {
                id: 'vink-1',
                name: 'Vinh Khanh Night Snail Paradise',
                description: 'Discover the paradise of unique snail dishes in Saigon.',
                images: [IMAGE_TEMPLATE],
                duration: '3 hours',
                price: 250000, // Để số nguyên để component tự format theo i18n
                restaurants: Array(4).fill({}),
                createdAt: "2026-05-05T08:11:31.011Z",
                updatedAt: "2026-05-05T08:11:31.011Z"
            },
            {
                id: 'vink-2',
                name: 'Gen Z Snacks & Milk Tea Tour',
                description: 'Most hot-trending dishes for youngsters.',
                images: [IMAGE_TEMPLATE],
                duration: '2 hours',
                price: 120000,
                restaurants: Array(5).fill({}),
                createdAt: "2026-05-05T08:11:31.011Z",
                updatedAt: "2026-05-05T08:11:31.011Z"
            },
            {
                id: 'vink-3',
                name: 'Authentic Saigon Street Food',
                description: 'Traditional flavors through generations.',
                images: [IMAGE_TEMPLATE],
                duration: '4 hours',
                price: 300000,
                restaurants: Array(6).fill({}),
                createdAt: "2026-05-05T08:11:31.011Z",
                updatedAt: "2026-05-05T08:11:31.011Z"
            }
        ],
        // Các ngôn ngữ zh, ja, ru bạn cập nhật tương tự: 
        // Đổi title -> name, image -> images: [IMAGE_TEMPLATE], price -> số nguyên
    };

    const shortLang = lang.split('-')[0];
    return data[shortLang] || data['vi'];
};

export const MOCK_RESTAURANTS: RestaurantType[] = [
    {
        id: '69d752c5bedfdcce7bf3eea8',
        name: 'Ốc Oanh - Vĩnh Khánh',
        description: 'Quán ốc nổi tiếng nhất phố Vĩnh Khánh với các món hải sản tươi sống chế biến đậm đà.',
        address: '534 Vĩnh Khánh, Q.4',
        location: {
            lat: 10.7585,
            lng: 106.7051,
        },
        phone: '0901234567',
        openTime: '16:00 - 23:00',
        images: [IMAGE_TEMPLATE],
        foods: [],
        rating: '4.8',
        reviews: '500+'
    },
    {
        id: '2',
        name: 'Ốc Đào 2',
        description: 'Chi nhánh 2 của ốc Đào nổi tiếng, không gian rộng rãi, phù hợp đi nhóm đông.',
        address: '212B Nguyễn Trãi, Q.1',
        location: {
            lat: 10.7681,
            lng: 106.6901,
        },
        phone: '0908888888',
        openTime: '10:00 - 22:00',
        images: [IMAGE_TEMPLATE],
        foods: [],
        rating: '4.5',
        reviews: '300+'
    },
    {
        id: '3',
        name: 'Chè Hà Trâm',
        description: 'Thiên đường đồ ngọt và các loại chè truyền thống, phục vụ đến tận khuya.',
        address: 'Vĩnh Khánh, Q.4',
        location: {
            lat: 10.7592,
            lng: 106.7045,
        },
        phone: '0933445566',
        openTime: '17:00 - 00:00',
        images: [IMAGE_TEMPLATE],
        foods: [],
        rating: '4.9',
        reviews: '150+'
    },
    {
        id: '4',
        name: 'Ốc Vũ',
        description: 'Chuyên các món ốc bình dân, giá cả phải chăng, vị trí ngay mặt tiền dễ tìm.',
        address: 'Số 37 Vĩnh Khánh, Q.4',
        location: {
            lat: 10.7578,
            lng: 106.7058,

        },
        phone: '0911223344',
        openTime: '15:00 - 23:00',
        images: [IMAGE_TEMPLATE],
        foods: [],
        rating: '4.2',
        reviews: '80+'
    },
    {
        id: '5',
        name: 'Phá Lấu Cô Lài',
        description: 'Hương vị phá lấu gia truyền, nước dùng béo ngậy ăn kèm bánh mì giòn tan.',
        address: 'Tôn Đản, Q.4',
        location: {
            lat: 10.7565,
            lng: 106.7032,

        },
        phone: '0944556677',
        openTime: '14:00 - 21:00',
        images: [IMAGE_TEMPLATE],
        foods: [],
        rating: '4.7',
        reviews: '200+'
    },
];
export const restaurantDemo: RestaurantDetailType = {
    id: "69d752c5bedfdcce7bf3eea8",
    name: "Ốc Oanh - Vĩnh Khánh",
    description: "Quán ốc nổi tiếng nhất phố ẩm thực Vĩnh Khánh với không gian rộng rãi và các món hải sản tươi sống được chế biến đậm đà.",
    address: "534 Vĩnh Khánh, Phường 10, Quận 4, TP.HCM",
    location: {
        lat: 10.7585,
        lng: 106.7058,
        // _id đã được loại bỏ theo yêu cầu của Dương
    },
    phone: "090 123 4567",
    reviews: "1,652",
    rating: "4.8",
    openTime: "16:00 - 23:30",
    images: [
        'https://vcdn1-dulich.vnecdn.net/2022/06/03/quan-oc-vinh-khanh-1-1654245050.jpg',
        'https://images2.thanhnien.vn/528068263637045248/2023/5/12/oc-oanh-vinh-khanh-16838814757271813958046.jpg',
        'https://dulichhalong.com.vn/UserFiles/image/C%E1%BA%A9m%20nang/%C4%91i%E1%BB%83m%20du%20l%E1%BB%8Bch/foodtour%201.jpg'
    ],
    menu: [
        {
            id: '1',
            name: 'Ốc hương trứng muối',
            description: 'Béo ngậy vị trứng muối, ốc tươi giòn sần sật.',
            slug: 'oc-huong-trung-muoi',
            categoryId: 'cat_01',
            images: ['https://vcdn1-dulich.vnecdn.net/2022/06/03/quan-oc-vinh-khanh-1-1654245050.jpg'],
            priceRange: { min: 150000, max: 180000 },
            status: "AVAILABLE"
        },
        {
            id: '2',
            name: 'Càng ghẹ rang muối',
            description: 'Cay nồng, đậm đà vị muối ớt đặc trưng.',
            slug: 'cang-ghe-rang-muoi',
            categoryId: 'cat_01',
            images: ['https://dulichhalong.com.vn/UserFiles/image/C%E1%BA%A9m%20nang/%C4%91i%E1%BB%83m%20du%20l%E1%BB%8Bch/foodtour%201.jpg'],
            priceRange: { min: 120000, max: 150000 },
            status: "AVAILABLE"
        },
        {
            id: '3',
            name: 'Sò lông nướng mỡ hành',
            description: 'Thơm mùi mỡ hành, đậu phộng rang giòn.',
            slug: 'so-long-nuong-mo-hanh',
            categoryId: 'cat_01',
            images: ['https://vcdn1-dulich.vnecdn.net/2022/06/03/quan-oc-vinh-khanh-1-1654245050.jpg'],
            priceRange: { min: 80000, max: 100000 },
            status: "AVAILABLE"
        },
        {
            id: '4',
            name: 'Nghêu hấp thái',
            description: 'Chua cay chuẩn vị, nghêu mập và ngọt nước.',
            slug: 'ngheu-hap-thai',
            categoryId: 'cat_01',
            images: ['https://images2.thanhnien.vn/528068263637045248/2023/5/12/oc-oanh-vinh-khanh-16838814757271813958046.jpg'],
            priceRange: { min: 90000, max: 110000 },
            status: "AVAILABLE"
        },
    ]
};