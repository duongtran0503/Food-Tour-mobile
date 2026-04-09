import { LocationType, PriceRangeType } from "@/types/common";


export interface RestaurantType {
  id: string;
  name: string;
  description: string;
  address: string;
  location: {
    lat: number;
    lng: number;

  };
  phone: string;
  openTime: string;
  images: string[];
  foods: string[];

  rating: string;
  reviews: string
}


export interface MenuItemType {
  id: string;
  name: string;
  description: string;
  slug: string;
  categoryId: string;
  images: string[];
  priceRange: PriceRangeType;
  status: string
}

export interface RestaurantDetailType {
  id: string;
  name: string;
  description: string;
  address: string;
  location: LocationType;
  phone: string;
  reviews: string;
  rating: string;
  openTime: string;
  images: string[];
  menu: MenuItemType[];
}

