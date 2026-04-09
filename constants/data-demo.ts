import { RestaurantDetailType, RestaurantType } from "@/types/restaurant";
import { TourType } from "@/types/tour";
export const IMAGE_TEMPLATE = 'https://dulichhalong.com.vn/UserFiles/image/C%E1%BA%A9m%20nang/%C4%91i%E1%BB%83m%20du%20l%E1%BB%8Bch/foodtour%201.jpg';
export const getVinkTours = (lang: string = 'vi'): TourType[] => {
    const data: Record<string, TourType[]> = {
        vi: [
            {
                id: 'vink-1',
                title: 'Thiên Đường Ốc Đêm Vĩnh Khánh',
                image: IMAGE_TEMPLATE,
                duration: '3 tiếng',
                price: '250.000đ',
                rating: '4.9',
                places: 4,
            },
            {
                id: 'vink-2',
                title: 'Tour Ăn Vặt & Trà Sữa Gen Z',
                image: IMAGE_TEMPLATE,
                duration: '2 tiếng',
                price: '120.000đ',
                rating: '4.7',
                places: 5,
            },
            {
                id: 'vink-3',
                title: 'Ẩm Thực Đường Phố Sài Gòn Gốc',
                image: IMAGE_TEMPLATE,
                duration: '4 tiếng',
                price: '300.000đ',
                rating: '4.8',
                places: 6,
            }
        ],
        en: [
            {
                id: 'vink-1',
                title: 'Vinh Khanh Night Snail Paradise',
                image: IMAGE_TEMPLATE,
                duration: '3 hours',
                price: '$10.00',
                rating: '4.9',
                places: 4,
            },
            {
                id: 'vink-2',
                title: 'Gen Z Snacks & Milk Tea Tour',
                image: IMAGE_TEMPLATE,
                duration: '2 hours',
                price: '$5.00',
                rating: '4.7',
                places: 5,
            },
            {
                id: 'vink-3',
                title: 'Authentic Saigon Street Food',
                image: IMAGE_TEMPLATE,
                duration: '4 hours',
                price: '$12.00',
                rating: '4.8',
                places: 6,
            }
        ],
        zh: [ // Tiếng Trung
            {
                id: 'vink-1',
                title: '永庆夜间螺蛳天堂',
                image: IMAGE_TEMPLATE,
                duration: '3 小时',
                price: '¥70.00',
                rating: '4.9',
                places: 4,
            },
            {
                id: 'vink-2',
                title: 'Z世代小吃与奶茶之旅',
                image: IMAGE_TEMPLATE,
                duration: '2 小时',
                price: '¥35.00',
                rating: '4.7',
                places: 5,
            },
            {
                id: 'vink-3',
                title: '正宗西贡地道美食',
                image: IMAGE_TEMPLATE,
                duration: '4 小时',
                price: '¥85.00',
                rating: '4.8',
                places: 6,
            }
        ],
        ja: [ // Tiếng Nhật
            {
                id: 'vink-1',
                title: 'ビンカイン夜の貝料理パラダイス',
                image: IMAGE_TEMPLATE,
                duration: '3 時間',
                price: '¥1,500',
                rating: '4.9',
                places: 4,
            },
            {
                id: 'vink-2',
                title: 'Z世代のスナックとミルクティー巡り',
                image: IMAGE_TEMPLATE,
                duration: '2 時間',
                price: '¥750',
                rating: '4.7',
                places: 5,
            },
            {
                id: 'vink-3',
                title: '本格的なサイゴン屋台料理',
                image: IMAGE_TEMPLATE,
                duration: '4 時間',
                price: '¥1,800',
                rating: '4.8',
                places: 6,
            }
        ],
        ru: [ // Tiếng Nga
            {
                id: 'vink-1',
                title: 'Рай ночных улиток Винь Кхань',
                image: IMAGE_TEMPLATE,
                duration: '3 часа',
                price: '1000 ₽',
                rating: '4.9',
                places: 4,
            },
            {
                id: 'vink-2',
                title: 'Тур по закускам и бабл-ти для зумеров',
                image: IMAGE_TEMPLATE,
                duration: '2 часа',
                price: '500 ₽',
                rating: '4.7',
                places: 5,
            },
            {
                id: 'vink-3',
                title: 'Настоящая уличная еда Сайгона',
                image: IMAGE_TEMPLATE,
                duration: '4 часа',
                price: '1200 ₽',
                rating: '4.8',
                places: 6,
            }
        ]
    };

    // Logic: Lấy mã ngôn ngữ rút gọn (ví dụ 'en-US' -> 'en')
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