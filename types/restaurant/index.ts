export interface RestaurantType {
  id: string;
  name: string;
  image: string;
  rating: string;
  address: string;
  openTime: string;
}


export interface MenuItemType {
  id: string;
  name: string;
  price: string;
  image: string;
  rating: string;
  desc: string;
}

export interface RestaurantDetailType {
  name: string;
  rating: string;
  reviews: string;
  openTime: string;
  address: string;
  phone: string;
  description: string;
  images: string[];
  menu: MenuItemType[];
}