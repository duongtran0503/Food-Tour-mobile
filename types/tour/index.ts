
export interface RestaurantType {
  id: string;
  name: string;
  address: string;
  images: string[];
}

export interface TourType {
  id: string;
  name: string;          // Khớp với API (Thay cho title)
  description: string;
  price: number;         // Khớp với API (Dạng số thay vì string)
  duration: string;      // Ví dụ: "3 hours"
  images: string[];      // Mảng ảnh thay vì một ảnh đơn
  restaurants: RestaurantType[]; // Dùng để tính số địa điểm (places)
  createdAt: string;
  updatedAt: string;
}